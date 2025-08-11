import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { OrganizationAPI } from "../services/organization";
import { UserConfigAPI, UserConfigResponse } from "../services/userConfig";

type Organization = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  memberCount: number;
  createdAt: string;
};

type CreateOrgData = { name: string; domain?: string };

type OrgContextType = {
  organizations: Organization[];
  currentOrganization: Organization | null;
  hasOrganization: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  createOrganization: (org: CreateOrgData) => Promise<void>;
  switchOrganization: (orgId: string) => void;
};

const OrganizationContext = createContext<OrgContextType | undefined>(undefined);

const mapOrg = (o: { Id: string; Name: string }): Organization => ({
  id: o.Id,
  name: o.Name,
  slug: o.Name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
  plan: "free",
  memberCount: 1,
  createdAt: new Date().toISOString(),
});

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isReady: authReady, isAuthenticated } = useAuth();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  const bootstrapped = useRef(false);

  // Fast boot from cache (optional)
  useEffect(() => {
    const storedOrgs = localStorage.getItem("user_organizations");
    const storedCurrent = localStorage.getItem("current_organization");
    if (storedOrgs) {
      const orgs: Organization[] = JSON.parse(storedOrgs);
      setOrganizations(orgs);
      const cur = storedCurrent ? orgs.find(o => o.id === storedCurrent) ?? orgs[0] ?? null : orgs[0] ?? null;
      setCurrentOrganization(cur);
    }
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const cfg = await UserConfigAPI.get(); // 200 with orgs OR throws (e.g., 404 when none)
      const mapped = (cfg.organizations ?? []).map(mapOrg);
      setOrganizations(mapped);

      const storedCurrent = localStorage.getItem("current_organization");
      const nextCur =
        (storedCurrent && mapped.find(o => o.id === storedCurrent)) || mapped[0] || null;

      setCurrentOrganization(nextCur);
      localStorage.setItem("user_organizations", JSON.stringify(mapped));
      if (nextCur) localStorage.setItem("current_organization", nextCur.id);
    } catch (e: any) {
      // If API returns 404 when user has no orgs, normalize to empty state
      if (e?.status === 404) {
        setOrganizations([]);
        setCurrentOrganization(null);
        localStorage.removeItem("user_organizations");
        localStorage.removeItem("current_organization");
      } else {
        throw e;
      }
    } finally {
      setLoading(false);
    }
  };

  // Single fetch after auth is ready and user is logged in
  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) {
      // logged out
      setOrganizations([]);
      setCurrentOrganization(null);
      setLoading(false);
      bootstrapped.current = false;
      return;
    }

    if (bootstrapped.current) {
      setLoading(false);
      return;
    }

    (async () => {
      await refresh();
      bootstrapped.current = true;
    })();
  }, [authReady, isAuthenticated]);

  const createOrganization = async (data: CreateOrgData): Promise<void> => {
    setLoading(true);
    try {
      await OrganizationAPI.create({ name: data.name });
      // after creation, always re-sync authoritative view
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem("current_organization", orgId);
    }
  };

  const value = useMemo<OrgContextType>(() => ({
    organizations,
    currentOrganization,
    hasOrganization: organizations.length > 0,
    loading,
    refresh,
    createOrganization,
    switchOrganization,
  }), [organizations, currentOrganization, loading]);

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
};

export const useOrganization = () => {
  const ctx = useContext(OrganizationContext);
  if (!ctx) throw new Error("useOrganization must be used within OrganizationProvider");
  return ctx;
};
