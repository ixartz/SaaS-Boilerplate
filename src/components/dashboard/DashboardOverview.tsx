import React from 'react';
import { Users, Building2, UserPlus, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardOverview: React.FC = () => {
  const { currentOrganization } = useAuth();

  const stats = [
    {
      name: 'Total Members',
      value: currentOrganization?.memberCount || 0,
      icon: Users,
      color: 'blue',
      change: '+12%'
    },
    {
      name: 'Pending Invites',
      value: '3',
      icon: UserPlus,
      color: 'amber',
      change: '+5%'
    },
    {
      name: 'Active Projects',
      value: '8',
      icon: Building2,
      color: 'green',
      change: '+23%'
    },
    {
      name: 'Growth Rate',
      value: '24%',
      icon: TrendingUp,
      color: 'purple',
      change: '+3%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      amber: 'bg-amber-100 text-amber-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Sarah Johnson joined the team', time: '2 hours ago', type: 'join' },
                { action: 'New project "Website Redesign" created', time: '4 hours ago', type: 'project' },
                { action: 'Mike Wilson updated his profile', time: '1 day ago', type: 'update' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'join' ? 'bg-green-500' : 
                    activity.type === 'project' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Invite team member', description: 'Add new people to your organization' },
                { title: 'Create project', description: 'Start a new project for your team' },
                { title: 'View analytics', description: 'Check your organization metrics' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};