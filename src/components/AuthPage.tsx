// C:\Users\Indrasen Kumar\Documents\GitHub\saas-starter-loginradius\src\components\AuthPage.tsx
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { useLRAuth } from '../lib/loginradius-react-sdk';

export const AuthPage: React.FC = () => {
  const { isAuthenticated } = useLRAuth();
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '/dashboard';


  if (isAuthenticated) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};
