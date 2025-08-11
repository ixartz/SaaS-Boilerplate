// C:\Users\Indrasen Kumar\Documents\GitHub\saas-starter-loginradius\src\components\auth\LoginForm.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSession } from '../utils/sessionHelper';
import { AuthFlow, CrossDeviceSSO, useLRAuth } from '../../lib/loginradius-react-sdk';

interface LoginFormProps {
  onToggleMode: () => void;
}

interface ApiError {
  error: string;
}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginSuccess = (response: any) => {
    if (response?.access_token) {
      setSession(response.access_token);
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect') || '/dashboard';
      navigate(redirect, { replace: true });
    }

  }
  const handleError = (error: ApiError) => {
    console.error('Error:', error.error);
  };

  return <AuthFlow onSuccess={handleLoginSuccess} onError={handleError} />;

};
