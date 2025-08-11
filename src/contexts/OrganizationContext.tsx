// src/contexts/OrganizationContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Organization } from "../types";
import { OrganizationAPI } from "../services/organization"; // <-- uses API helper

interface OrganizationContextType {
  organizations: Organization[];
  currentOrganization: Organization | null;
  hasOrganization: boolean;
  createOrganization: (orgData: CreateOrgData) => Promise<void>;
  switchOrganization: (orgId: string) => void;
  loading: boolean;
}

interface CreateOrgData {
  name: string;
  domain: string; // kept for your UI; not sent if your API doesn't need it
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage for now (you can swap to GET /organization later)
    const storedOrgs = localStorage.getItem("user_organizations");
    const storedCurrentOrg = localStorage.getItem("current_organization");

    if (storedOrgs) {
      const orgs: Organization[] = JSON.parse(storedOrgs);
      setOrganizations(orgs);

      if (storedCurrentOrg) {
        const currentOrg = orgs.find((org) => org.id === storedCurrentOrg);
        setCurrentOrganization(currentOrg || orgs[0] || null);
      } else if (orgs.length > 0) {
        setCurrentOrganization(orgs[0]);
      }
    }
    setLoading(false);
  }, []);

  const createOrganization = async (orgData: CreateOrgData): Promise<void> => {
    setLoading(true);
    try {
      // ✅ Call your API. Your curl showed only "name" is required.
      const created = await OrganizationAPI.create({ name: orgData.name });

      // If API doesn't return slug/domain, fall back to UI-entered domain
      const newOrg: Organization = {
        ...created,
        slug: (created as any).slug ?? orgData.domain,
        plan: "free",
        memberCount: 0
      };

      const updatedOrgs = [...organizations, newOrg];
      setOrganizations(updatedOrgs);
      setCurrentOrganization(newOrg);

      localStorage.setItem("user_organizations", JSON.stringify(updatedOrgs));
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
        createOrganization,
        switchOrganization,
        loading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
