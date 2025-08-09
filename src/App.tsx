import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = React.useState(false);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  if (showAuth) {
    return <AuthPage />;
  }

  return (
    <LandingPage 
      onGetStarted={() => setShowAuth(true)}
      onSignIn={() => setShowAuth(true)}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;