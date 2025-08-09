import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface CTAProps {
  onGetStarted: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-10 transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-10 transform -translate-x-32 translate-y-32"></div>
      
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to transform your team collaboration?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using our platform to streamline their operations 
          and boost productivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="group bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
          >
            Schedule Demo
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            14-day free trial
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            No setup fees
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};