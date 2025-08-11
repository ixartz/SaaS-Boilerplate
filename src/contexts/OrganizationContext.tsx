import React, { createContext, useContext, useEffect, useState } from "react";
import { Organization } from "../types";
import { OrganizationAPI } from "../services/organization";
import { API } from "../services/http"; // we'll call /users/config via API here

interface OrganizationContextType {
  organizations: Organization[];
  currentOrganization: Organization | null;
  hasOrganization: boolean;
  loading: boolean;

  createOrganization: (orgData: CreateOrgData) => Promise<void>;
  switchOrganization: (orgId: string) => void;

  /** Fetches /users/config, updates org state, and returns hasOrganization */
  refreshFromServer: () => Promise<boolean>;
}

interface CreateOrgData {
  name: string;
  domain: string; // UI-only; not required by backend create
}

type UserConfigResponse = {
  organizations: { Id: string; Name: string }[];
  tenantRoles: { Id: string; Name: string }[];
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  // map API org → app Organization type
  const mapOrg = (o: { Id: string; Name: string }): Organization => ({
    id: o.Id,
    name: o.Name,
    slug: o.Name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    plan: "free",
    memberCount: 1,
    createdAt: new Date().toISOString(),
  });

  // Initial load from localStorage (so UI can render quickly on refresh)
  useEffect(() => {
    const storedOrgs = localStorage.getItem("user_organizations");
    const storedCurrentOrg = localStorage.getItem("current_organization");

    if (storedOrgs) {
      const orgs: Organization[] = JSON.parse(storedOrgs);
      setOrganizations(orgs);

      if (storedCurrentOrg) {
        const current = orgs.find((o) => o.id === storedCurrentOrg) ?? orgs[0] ?? null;
        setCurrentOrganization(current);
      } else if (orgs.length > 0) {
        setCurrentOrganization(orgs[0]);
      }
    }
    setLoading(false);
  }, []);

  const refreshFromServer = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const cfg = await API.get<UserConfigResponse>("/users/config");
      const mapped = (cfg.organizations ?? []).map(mapOrg);

      setOrganizations(mapped);

      const storedCurrentOrg = localStorage.getItem("current_organization");
      if (storedCurrentOrg) {
        const found = mapped.find((o) => o.id === storedCurrentOrg) ?? mapped[0] ?? null;
        setCurrentOrganization(found);
        if (found) localStorage.setItem("current_organization", found.id);
      } else {
        const first = mapped[0] ?? null;
        setCurrentOrganization(first);
        if (first) localStorage.setItem("current_organization", first.id);
      }

      localStorage.setItem("user_organizations", JSON.stringify(mapped));
      return mapped.length > 0;
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (orgData: CreateOrgData): Promise<void> => {
    setLoading(true);
    try {
      const created = await OrganizationAPI.create({ name: orgData.name });
      const newOrg: Organization = {
        ...(created as any),
        id: (created as any).id ?? (created as any).Id ?? crypto.randomUUID(),
        name: (created as any).name ?? (created as any).Name ?? orgData.name,
        slug:
          (created as any).slug ??
          orgData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        plan: (created as any).plan ?? "free",
        memberCount: (created as any).memberCount ?? 1,
        createdAt: (created as any).createdAt ?? new Date().toISOString(),
      };

      const updated = [...organizations, newOrg];
      setOrganizations(updated);
      setCurrentOrganization(newOrg);

      localStorage.setItem("user_organizations", JSON.stringify(updated));
      localStorage.setItem("current_organization", newOrg.id);
    } finally {
      setLoading(false);
    }
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem("current_organization", orgId);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        currentOrganization,
        hasOrganization: organizations.length > 0,
        loading,
        createOrganization,
        switchOrganization,
        refreshFromServer,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const ctx = useContext(OrganizationContext);
  if (!ctx) throw new Error("useOrganization must be used within an OrganizationProvider");
  return ctx;
};
