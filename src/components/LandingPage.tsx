import React from 'react';
import { Navigation } from './landing/Navigation';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { Testimonials } from './landing/Testimonials';
import { Pricing } from './landing/Pricing';
import { CTA } from './landing/CTA';
import { Footer } from './landing/Footer';

export const LandingPage: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = '/auth';
  };
  
  const handleSignIn = () => {
    window.location.href = '/auth';
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Testimonials />
      <Pricing onGetStarted={handleGetStarted} />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
};