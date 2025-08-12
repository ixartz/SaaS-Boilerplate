// C:\Users\Indrasen Kumar\Documents\GitHub\saas-starter-loginradius\src\main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { LoginRadiusProvider } from './lib/loginradius-react-sdk';
import { ToastProvider } from './components/ui/toastProvider.tsx';

const loginRadiusOptions = {
   apiKey: '8b95fe7e-6dd1-4157-8e5c-f49de4257930',
   sott: 'KFxRgAWck1rOYuxSu72meSEXU4LYOps2GtcTF+kqCf/113kEgmE5JnhFRqhXT1EM5kc55DbKX064PsD+fwxIEoQoCtzeSRIxCV7FLFxVdLU=*78bc2db2a7a04453e037d4b2a110b854',
   isCrossDeviceSSOEnabled: true,
   brandName:"dev-auth-ignite",
   verificationUrl: "https://saas-starter-loginradius.vercel.app/auth",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginRadiusProvider options={loginRadiusOptions}>
       <ToastProvider />
      <App />
    </LoginRadiusProvider>
  </StrictMode>
);
