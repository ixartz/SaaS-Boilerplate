import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { OrganizationAPI } from "../services/organization";
import { UserConfigAPI } from "../services/userConfig";
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
  loading: boolean;              // keep for non-quiet ops / other screens
  hydrating: boolean;            // first-load page skeleton trigger
  tenantRoles: SimpleRole[];
  refresh: (opts?: { quiet?: boolean }) => Promise<void>; // supports quiet mode
  createOrganization: (org: CreateOrgData) => Promise<any>;
  switchOrganization: (orgId: string) => void;
  inviteMember: (args: { email: string; roleId: string; organizationId?: string }) => Promise<any>;

  // NEW: current viewer info from UserConfigAPI
  viewerUid: string | null;
  viewerEmail: string | null;
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
  const [tenantRoles, setTenantRoles] = useState<SimpleRole[]>([]);
  const [loading, setLoading] = useState(false);   // start false so no overlay on first paint
  const [hydrating, setHydrating] = useState(true); // show skeleton on first load

  // NEW: viewer info
  const [viewerUid, setViewerUid] = useState<string | null>(null);
  const [viewerEmail, setViewerEmail] = useState<string | null>(null);

  const bootstrapped = useRef(false);

  // Fast boot from cache (optional)
  useEffect(() => {
    const storedOrgs = localStorage.getItem("user_organizations");
    const storedCurrent = localStorage.getItem("current_organization");
    if (storedOrgs) {
      const orgs: Organization[] = JSON.parse(storedOrgs);
      setOrganizations(orgs);
      const cur =
        storedCurrent ? orgs.find((o) => o.id === storedCurrent) ?? orgs[0] ?? null : orgs[0] ?? null;
      setCurrentOrganization(cur);
    }
  }, []);

  // Supports quiet mode to avoid global overlay when you want skeletons instead
  const refresh = async (opts?: { quiet?: boolean }) => {
    if (!opts?.quiet) setLoading(true);
    try {
      const cfg = await UserConfigAPI.get();

      console.log(cfg)

      const mapped = (cfg.organizations ?? []).map(mapOrg);
      setOrganizations(mapped);

      const mappedRoles: SimpleRole[] = (cfg.tenantRoles ?? []).map((r) => ({
        id: r.Id,
        name: r.Name,
      }));
      setTenantRoles(mappedRoles);
      console.log(cfg)
      // NEW: set current viewer info (uid/email)
      setViewerUid(cfg.userInfo?.Uid ?? null);
      setViewerEmail(cfg.userInfo?.Email ?? null);

      const storedCurrent = localStorage.getItem("current_organization");
      const nextCur =
        (storedCurrent && mapped.find((o) => o.id === storedCurrent)) || mapped[0] || null;

      setCurrentOrganization(nextCur);
      localStorage.setItem("user_organizations", JSON.stringify(mapped));
      if (nextCur) localStorage.setItem("current_organization", nextCur.id);
    } catch (e: any) {
      if (e?.status === 404) {
        setOrganizations([]);
        setCurrentOrganization(null);
        setTenantRoles([]);
        setViewerUid(null);
        setViewerEmail(null);
        localStorage.removeItem("user_organizations");
        localStorage.removeItem("current_organization");
      } else {
        throw e;
      }
    } finally {
      if (!opts?.quiet) setLoading(false);
    }
  };

  // First load: fetch quietly so pages show skeleton instead of overlay
  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) {
      setOrganizations([]);
      setCurrentOrganization(null);
      setTenantRoles([]);
      setViewerUid(null);
      setViewerEmail(null);
      setLoading(false);
      setHydrating(false);
      bootstrapped.current = false;
      return;
    }

    if (bootstrapped.current) {
      setLoading(false);
      setHydrating(false);
      return;
    }

    (async () => {
      setHydrating(true);
      await refresh({ quiet: true }); // do not flip global overlay on first load
      setHydrating(false);
      setLoading(false);              // ensure any overlay is off
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
      // Re-sync quietly so the page just updates (no overlay)
      await refresh({ quiet: true });
      return res as CreateOrgResponse;
    } catch (e) {
      console.error("OrganizationAPI.create failed", e);
      return e as CreateOrgResponse;
    }
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem("current_organization", orgId);
    }
  };

  const inviteMember = async (args: {
    email: string;
    roleId: string;
    organizationId?: string;
  }): Promise<InviteResponse | null> => {
    const orgId = args.organizationId || currentOrganization?.id;
    if (!orgId) throw new Error("No current organization selected.");
    try {
      const res = await InviteAPI.send(orgId, {
        email: args.email,
        roleId: args.roleId,
      });
      return res as InviteResponse;
    } catch (error) {
      console.error("Failed to send invitation", error);
      return error as InviteResponse;
    }
  };

  const value = useMemo<OrgContextType>(
    () => ({
      organizations,
      currentOrganization,
      hasOrganization: organizations.length > 0,
      loading,
      hydrating, // expose for skeletons
      tenantRoles,
      refresh,
      createOrganization,
      switchOrganization,
      inviteMember,

      // NEW
      viewerUid,
      viewerEmail,
    }),
    [
      organizations,
      currentOrganization,
      loading,
      hydrating,
      tenantRoles,
      viewerUid,
      viewerEmail,
    ]
  );

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
};

export const useOrganization = () => {
  const ctx = useContext(OrganizationContext);
  if (!ctx) throw new Error("useOrganization must be used within OrganizationProvider");
  return ctx;
};
