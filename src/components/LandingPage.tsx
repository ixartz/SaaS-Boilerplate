import React from 'react';
import { Navigation } from './landing/Navigation';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { Testimonials } from './landing/Testimonials';
import { Pricing } from './landing/Pricing';
import { CTA } from './landing/CTA';
import { Footer } from './landing/Footer';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onGetStarted={onGetStarted} onSignIn={onSignIn} />
      <Hero onGetStarted={onGetStarted} />
      <Features />
      <Testimonials />
      <Pricing onGetStarted={onGetStarted} />
      <CTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
};