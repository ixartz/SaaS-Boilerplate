import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoginForm } from "./auth/LoginForm";

export default function AuthPage() {
  const { isReady, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isReady) return;
    if (isAuthenticated) {
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect") || "/dashboard";
      navigate(redirect, { replace: true });
    }
  }, [isReady, isAuthenticated, location.search, navigate]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onToggleMode={() => {}} />
    </div>
  );
}
