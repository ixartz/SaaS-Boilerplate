import React from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  Building2, 
  UserPlus,
  BarChart3,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { name: 'Overview', icon: Home, id: 'overview' },
  { name: 'Invitations', icon: Users, id: 'invitations' },
  { name: 'Team Members', icon: Users, id: 'members' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
  { name: 'Documents', icon: FileText, id: 'documents' },
  { name: 'Organization', icon: Building2, id: 'organization' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
};