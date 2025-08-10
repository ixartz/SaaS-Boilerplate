// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OrganizationProvider, useOrganization } from './contexts/OrganizationContext';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { CreateOrganization } from './components/auth/CreateOrganization';
import { InvitationAccept } from './components/auth/InvitationAccept';
import { Dashboard } from './components/Dashboard';
import { RequireAuth } from './components/utils/authGuards';
const OrganizationRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasOrganization, loading } = useOrganization();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return hasOrganization ? <>{children}</> : <Navigate to="/create-organization" replace />;
};

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/invitation" element={<InvitationAccept />} />

      <Route
        path="/create-organization"
        element={
          <RequireAuth>
            <CreateOrganization />
          </RequireAuth>
        }
      />

      <Route
        path="/dashboard/*"
        element={
          <RequireAuth>
            <OrganizationRoute>
              <Dashboard />
            </OrganizationRoute>
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <OrganizationProvider>
        <AppContent />
      </OrganizationProvider>
    </Router>
  );
}

export default App;
