import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setSession } from "../utils/sessionHelper";
import { AuthFlow } from "../../lib/loginradius-react-sdk";
import { useOrganization } from "../../contexts/OrganizationContext";

interface LoginFormProps { onToggleMode: () => void }
interface ApiError { error: string }

export const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshFromServer } = useOrganization();

  const handleLoginSuccess = async (response: any) => {
    if (!response?.access_token) return;

    setSession(response.access_token);
    const params = new URLSearchParams(location.search);
    const fallback = params.get("redirect") || "/dashboard";

    try {
      const hasOrg = await refreshFromServer(); // <- context owns the fetch/state
      navigate(hasOrg ? fallback : "/create-organization", { replace: true });
    } catch {
      navigate(fallback, { replace: true });
    }
  };

  const handleError = (error: ApiError) => {
    console.error("Error:", error.error);
  };

  return <AuthFlow onSuccess={handleLoginSuccess} onError={handleError} />;
};
