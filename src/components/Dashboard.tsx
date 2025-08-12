import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { TeamManagement } from './team/TeamManagement';
import { ProfileSettings } from './profile/ProfileSettings';
import { OrganizationManagement } from './organization/OrganizationManagement';
import { TeamMembers } from './team/TeamMembers';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
              <Route path="/overview" element={<DashboardOverview />} />
              <Route path="/invitations" element={<TeamManagement />} />
              <Route path="/members" element={<TeamMembers />} />
              <Route path="/settings" element={<ProfileSettings />} />
              
              <Route path="/analytics" element={
                <div className="text-center text-gray-500">
                  <h3 className="text-lg font-medium">Analytics</h3>
                  <p>Analytics dashboard coming soon...</p>
                </div>
              } />
              <Route path="/documents" element={
                <div className="text-center text-gray-500">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <p>Document management coming soon...</p>
                </div>
              } />
              <Route path="/organization" element={<OrganizationManagement/>}/>
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};