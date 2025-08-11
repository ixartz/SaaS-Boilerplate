import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { OrganizationAPI } from "../services/organization";
import { UserConfigAPI, UserConfigResponse } from "../services/userConfig";
import { InviteAPI, InviteResponse } from "../services/invite";

type Organization = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  memberCount: number;
  createdAt: string;
};

type CreateOrgData = { name: string; domain?: string };
type SimpleRole = { id: string; name: string };

type OrgContextType = {
  organizations: Organization[];
  currentOrganization: Organization | null;
  hasOrganization: boolean;
  loading: boolean;
  tenantRoles: SimpleRole[]; // <— NEW
  refresh: () => Promise<void>;
  createOrganization: (org: CreateOrgData) => Promise<any>;
  switchOrganization: (orgId: string) => void;
  inviteMember: (args: { email: string; roleId: string; organizationId?: string }) => Promise<any>; // <— NEW

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
  const [tenantRoles, setTenantRoles] = useState<SimpleRole[]>([]); // <— NEW

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

  // change refresh to support a quiet mode
  const refresh = async (opts?: { quiet?: boolean }) => {
    if (!opts?.quiet) setLoading(true);
    try {
      const cfg = await UserConfigAPI.get();
      const mapped = (cfg.organizations ?? []).map(mapOrg);
      setOrganizations(mapped);


      // map roles from userconfig
      const mappedRoles: SimpleRole[] = (cfg.tenantRoles ?? []).map(r => ({ id: r.Id, name: r.Name }));
      setTenantRoles(mappedRoles);

      const storedCurrent = localStorage.getItem("current_organization");
      const nextCur =
        (storedCurrent && mapped.find(o => o.id === storedCurrent)) || mapped[0] || null;

      setCurrentOrganization(nextCur);
      localStorage.setItem("user_organizations", JSON.stringify(mapped));
      if (nextCur) localStorage.setItem("current_organization", nextCur.id);
    } catch (e: any) {
      if (e?.status === 404) {
        setOrganizations([]);
        setCurrentOrganization(null);
        setTenantRoles([]); // <— clear roles as well
        localStorage.removeItem("user_organizations");
        localStorage.removeItem("current_organization");
      } else {
        throw e;
      }
    } finally {
      if (!opts?.quiet) setLoading(false);
    }
  };

  // Single fetch after auth is ready and user is logged in
  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) {
      // logged out
      setOrganizations([]);
      setCurrentOrganization(null);
      setTenantRoles([]);
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

  type CreateOrgResponse = { success?: boolean; ErrorCode?: number; Message?: string };

  const createOrganization = async (data: CreateOrgData): Promise<CreateOrgResponse | null> => {
    try {
      const res = await OrganizationAPI.create({
        name: data.name,
        domain: data.domain?.toString() ?? "",
      });
      await refresh({ quiet: true }); // don't flash the global loader
      return res as CreateOrgResponse;
    } catch (e) {
      console.error("OrganizationAPI.create failed", e);
      // log and let caller show error toast
      console.error("OrganizationAPI.create failed", e);
      return e as CreateOrgResponse;
    }
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem("current_organization", orgId);
    }
  };


  // NEW: invite helper using current org by default
  const inviteMember = async (args: { email: string; roleId: string; organizationId?: string }): Promise<InviteResponse | null>  => {
    const orgId = args.organizationId || currentOrganization?.id;
    if (!orgId) throw new Error("No current organization selected.");
    try {
      const res = await InviteAPI.send(orgId, {
        email: args.email,
        roleId: args.roleId,          // backend expects snake_case

      });
      return res as InviteResponse;

    } catch (error) {
      console.error("Failed to send invitation", error);
      return error as InviteResponse; // normalize error
    }
  };

  const value = useMemo<OrgContextType>(() => ({
    organizations,
    currentOrganization,
    hasOrganization: organizations.length > 0,
    loading,
    tenantRoles,
    refresh,
    createOrganization,
    switchOrganization,
    inviteMember, // <— NEW
  }), [organizations, currentOrganization, loading, tenantRoles]);

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
};

export const useOrganization = () => {
  const ctx = useContext(OrganizationContext);
  if (!ctx) throw new Error("useOrganization must be used within OrganizationProvider");
  return ctx;
};



