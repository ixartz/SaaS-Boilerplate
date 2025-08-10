// src/utils/authGuards.ts
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './sessionHelper';


export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?redirect=${redirect}`} replace />;
  }
  return <>{children}</>;
};

export const RedirectIfAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '/dashboard';
  if (isAuthenticated()) return <Navigate to={redirect} replace />;
  return <>{children}</>;
};
