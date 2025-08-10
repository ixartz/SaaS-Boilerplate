import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuthenticated } from './sessionHelper';
import { useLoginRadiusSDK } from '../../lib/loginradius-react-sdk/';

// Fullscreen spinner used only when a protected page is loading auth
const SpinnerFull: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />
  </div>
);

// Protects routes that require authentication
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useLoginRadiusSDK();
  const location = useLocation();

  // Only block *protected* pages while SDK is initializing
  if (loading) return <SpinnerFull />;

  if (!isAuthenticated()) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?redirect=${redirect}`} replace />;
  }

  return <>{children}</>;
};
