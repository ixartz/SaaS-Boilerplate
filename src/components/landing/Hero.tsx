import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            New: Advanced team collaboration features
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Build Better Teams,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}Faster Together
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            The complete B2B SaaS platform for modern teams. Streamline collaboration, 
            manage organizations, and scale your business with our powerful suite of tools.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up delay-400">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="group px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500 animate-fade-in delay-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Hero image/dashboard preview */}
        <div className="mt-16 animate-slide-up delay-800">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};