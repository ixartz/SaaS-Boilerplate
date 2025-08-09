import React, { useState } from 'react';
import { ChevronDown, Plus, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const OrganizationSwitcher: React.FC = () => {
  const { organizations, currentOrganization, switchOrganization } = useAuth();
  const [showSwitcher, setShowSwitcher] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowSwitcher(!showSwitcher)}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Building2 className="w-4 h-4 text-gray-600" />
        <span className="text-gray-700">Switch Organization</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {showSwitcher && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Organizations
          </div>
          
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                switchOrganization(org.id);
                setShowSwitcher(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 ${
                currentOrganization?.id === org.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center mr-3">
                <span className="text-xs font-medium">
                  {org.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{org.name}</p>
                <p className="text-xs text-gray-500 capitalize">{org.plan} plan</p>
              </div>
              {currentOrganization?.id === org.id && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
          
          <hr className="my-2" />
          <button className="w-full flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-3" />
            Create Organization
          </button>
        </div>
      )}
    </div>
  );
};