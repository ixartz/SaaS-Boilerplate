// C:\Users\Indrasen Kumar\Documents\GitHub\saas-starter-loginradius\src\main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { LoginRadiusProvider } from './lib/loginradius-react-sdk';

const loginRadiusOptions = {
  apiKey: '56064a30-784d-40c2-81b4-d653388c1518',
  sott: 'pNC/XINvERtlz8R4w+qjug/llFKDdZ7VTXIxkM71nDNP/GmCXItMyyl2TS8x7qXFSKz3RNvdIrqNsiR/T5MhpindePfYlqxIFDsDxcxX1tk=*ad476480097c85cf2f0013efcfbc8380',
  brandName: 'saasdemo'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginRadiusProvider options={loginRadiusOptions}>
      <App />
    </LoginRadiusProvider>
  </StrictMode>
);
