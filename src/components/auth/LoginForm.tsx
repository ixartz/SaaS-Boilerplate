import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setSession } from "../utils/sessionHelper";
import { AuthFlow } from "../../lib/loginradius-react-sdk";

interface LoginFormProps { onToggleMode: () => void }
interface ApiError { error: string }

export const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (response: any) => {
    console.log("Passkey Login successful:", response);
    if (!response?.access_token) return;
    setSession(response.access_token);

    // Prefer returning user to intended route
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    navigate(redirect || "/dashboard", { replace: true });
  };

  const handleError = (error: ApiError) => {
    console.error("Auth error:", error?.error || error);
  };

  return <AuthFlow onSuccess={handleLoginSuccess} onError={handleError} />;
};
