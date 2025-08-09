import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { TeamManagement } from './team/TeamManagement';
import { ProfileSettings } from './profile/ProfileSettings';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'team':
        return <TeamManagement />;
      case 'settings':
        return <ProfileSettings />;
      case 'invitations':
        return (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-medium">Invitations</h3>
            <p>Invitation management coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-medium">Analytics</h3>
            <p>Analytics dashboard coming soon...</p>
          </div>
        );
      case 'documents':
        return (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-medium">Documents</h3>
            <p>Document management coming soon...</p>
          </div>
        );
      case 'organization':
        return (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-medium">Organization Settings</h3>
            <p>Organization management coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};