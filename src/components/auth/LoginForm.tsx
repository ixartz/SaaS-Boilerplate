import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLRAuth } from '../../hooks/useLRAuth';
import { AuthFlow } from '../../lib/loginradius-react-sdk';

interface LoginFormProps {
  onToggleMode: () => void;
}

interface ApiError {
  error: string;
}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useLRAuth();
  console.log("is auth tyririr ",isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      const searchParams = new URLSearchParams(location.search);
      navigate({
        pathname: '/dashboard',
        search: searchParams.toString(),
      });
    } else {
      const searchParams = new URLSearchParams(location.search);
      navigate({
        pathname: '/auth',
        search: searchParams.toString(),
      });
    }
  }, [isAuthenticated, location.search, navigate]);
  

const handleLoginSuccess = (response: any) => {
  if (response?.access_token) {
    console.log('Login successful:', response);
  }
};


  const handleError = (error: ApiError) => {
    console.error('Error:', error.error);
  };


  return (
    <AuthFlow onSuccess={handleLoginSuccess} onError={handleError} />
  );
};