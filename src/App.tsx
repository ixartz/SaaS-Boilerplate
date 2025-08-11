import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { OrganizationProvider } from "./contexts/OrganizationContext";

import { LandingPage } from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import { CreateOrganization } from "./components/auth/CreateOrganization";
import { Dashboard } from "./components/Dashboard";
import { InvitationAccept } from "./components/auth/InvitationAccept";

import {
  RequireAuth,
  RequireOrg,
  RedirectIfAuthenticated,
  AllowCreateOrgOnlyWhenNeeded,
} from "./components/utils/authGuards";

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrganizationProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/auth"
              element={
                <RedirectIfAuthenticated>
                  <AuthPage />
                </RedirectIfAuthenticated>
              }
            />

            <Route
              path="/invitation"
              element={<InvitationAccept />}
            />

            <Route
              path="/create-organization"
              element={
                <AllowCreateOrgOnlyWhenNeeded>
                  <CreateOrganization />
                </AllowCreateOrgOnlyWhenNeeded>
              }
            />

            <Route
              path="/dashboard/*"
              element={
                <RequireAuth>
                  <RequireOrg>
                    <Dashboard />
                  </RequireOrg>
                </RequireAuth>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </OrganizationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
