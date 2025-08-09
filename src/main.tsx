import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginRadiusProvider } from './dist/index';
const loginRadiusOptions = {
  apiKey: "56064a30-784d-40c2-81b4-d653388c1518"
};

createRoot(document.getElementById('root')!).render(
  <LoginRadiusProvider options={loginRadiusOptions}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </LoginRadiusProvider>
);
