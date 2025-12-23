'use client';

import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <SignIn 
        fallbackRedirectUrl="/dashboard"
        forceRedirectUrl="/dashboard"
        redirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
