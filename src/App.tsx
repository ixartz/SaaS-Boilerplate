import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLRAuth } from './hooks/useLRAuth';
import { OrganizationProvider, useOrganization } from './contexts/OrganizationContext';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { CreateOrganization } from './components/auth/CreateOrganization';
import { InvitationAccept } from './components/auth/InvitationAccept';
import { Dashboard } from './components/Dashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useLRAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Organization Required Route
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
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/invitation" element={<InvitationAccept />} />
      
      {/* Protected Routes */}
      <Route 
        path="/create-organization" 
        element={
          <ProtectedRoute>
            <CreateOrganization />
          </ProtectedRoute>
        } 
      />
      
      {/* Dashboard Routes (require organization) */}
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <OrganizationRoute>
              <Dashboard />
            </OrganizationRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect unknown routes */}
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