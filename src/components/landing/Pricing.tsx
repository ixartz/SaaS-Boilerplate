import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/Card';

interface PricingProps {
  onGetStarted: () => void;
}

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 team members',
      'Basic team management',
      '1 organization',
      'Email support',
      'Basic analytics',
      'Mobile app access'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power',
    features: [
      'Up to 50 team members',
      'Advanced team management',
      'Unlimited organizations',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
      'API access',
      'Advanced security'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited team members',
      'Enterprise team management',
      'Unlimited organizations',
      '24/7 dedicated support',
      'Custom analytics',
      'White-label solution',
      'On-premise deployment',
      'Custom integrations',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export const Pricing: React.FC<PricingProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your team. Start free and scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 shadow-2xl scale-105' 
                  : 'hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Custom' && plan.price !== 'Free' && (
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    )}
                    {plan.price === 'Free' && (
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={onGetStarted}
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full py-3 font-semibold"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};