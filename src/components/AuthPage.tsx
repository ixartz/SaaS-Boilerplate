import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { useLRAuth } from '../hooks/useLRAuth';
import { LoginRadiusProvider } from '../lib/loginradius-react-sdk';

const loginRadiusOptions = {
  apiKey: '56064a30-784d-40c2-81b4-d653388c1518',
  sott: 'pNC/XINvERtlz8R4w+qjug/llFKDdZ7VTXIxkM71nDNP/GmCXItMyyl2TS8x7qXFSKz3RNvdIrqNsiR/T5MhpindePfYlqxIFDsDxcxX1tk=*ad476480097c85cf2f0013efcfbc8380',
  brandName: 'saasdemo'
};

export const AuthPage: React.FC = () => {
  const { isAuthenticated } = useLRAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LoginRadiusProvider options={loginRadiusOptions}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </LoginRadiusProvider>
  );
};
