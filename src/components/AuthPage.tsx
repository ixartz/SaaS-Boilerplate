import React, { useEffect, useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';

/** IMPORTANT:
 * If you import LR styles, do it ONLY here so they don't influence other pages.
 * Uncomment if needed.
 */
// import '@loginradius/lr-core-js/styles/index.css';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Allow LR UI rules only on this page (pairs with CSS below)
  useEffect(() => {
    document.body.classList.add('show-lr-ui');
    return () => document.body.classList.remove('show-lr-ui');
  }, []);

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

export default AuthPage;
