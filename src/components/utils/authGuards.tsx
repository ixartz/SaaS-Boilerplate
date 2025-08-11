import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useOrganization } from "../../contexts/OrganizationContext";

// Gate 1: Must be authenticated
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    const qs = new URLSearchParams({ redirect: location.pathname + location.search });
    return <Navigate to={`/auth?${qs.toString()}`} replace />;
  }

  return <>{children}</>;
};

// Gate 2: Must have an organization
export const RequireOrg: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, hasOrganization } = useOrganization();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!hasOrganization) {
    return <Navigate to="/create-organization" replace />;
  }

  return <>{children}</>;
};

// Redirect away from /auth if already logged-in
// If has org -> /dashboard, else -> /create-organization
export const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isReady, isAuthenticated } = useAuth();
  const { loading, hasOrganization } = useOrganization();

  if (!isReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={hasOrganization ? "/dashboard" : "/create-organization"} replace />;
  }

  return <>{children}</>;
};

// Only allow /create-organization when logged-in AND no org
export const AllowCreateOrgOnlyWhenNeeded: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isReady, isAuthenticated } = useAuth();
  const { loading, hasOrganization } = useOrganization();

  if (!isReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (hasOrganization) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};
