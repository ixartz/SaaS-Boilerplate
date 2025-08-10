import React from 'react';
import { 
  Users, 
  Building2, 
  Shield, 
  Zap, 
  BarChart3, 
  Globe,
  UserPlus,
  Settings,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const features = [
  {
    icon: Users,
    title: 'Team Management',
    description: 'Invite, manage, and organize your team members with role-based permissions and access controls.',
    color: 'blue'
  },
  {
    icon: Building2,
    title: 'Multi-Organization',
    description: 'Switch seamlessly between multiple organizations and manage different teams from one dashboard.',
    color: 'indigo'
  },
  {
    icon: UserPlus,
    title: 'Smart Invitations',
    description: 'Send team invitations with custom roles and track acceptance status in real-time.',
    color: 'green'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with 2FA, SSO integration, and comprehensive audit logs.',
    color: 'red'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get insights into team performance, usage patterns, and organizational metrics.',
    color: 'purple'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with modern architecture and optimized performance across all devices.',
    color: 'yellow'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy worldwide with CDN support and multi-region infrastructure for optimal performance.',
    color: 'cyan'
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'Tailor the platform to your needs with extensive customization options and integrations.',
    color: 'gray'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'GDPR compliant with end-to-end encryption and complete data ownership control.',
    color: 'emerald'
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200',
    indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200',
    green: 'bg-green-100 text-green-600 group-hover:bg-green-200',
    red: 'bg-red-100 text-red-600 group-hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-200',
    yellow: 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200',
    cyan: 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-200',
    gray: 'bg-gray-100 text-gray-600 group-hover:bg-gray-200',
    emerald: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
  };
  return colors[color as keyof typeof colors];
};

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to scale your team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed for modern B2B teams. From small startups to enterprise organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};