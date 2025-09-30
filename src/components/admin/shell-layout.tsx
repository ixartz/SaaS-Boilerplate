'use client';

import { useState } from 'react';

import { AdminHeader } from './header';
import { useProject } from './project-context';
import { AdminSidebar } from './sidebar';

type ShellLayoutProps = {
  children: React.ReactNode;
  onCreateProject?: () => void;
};

export function ShellLayout({ children }: ShellLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { openCreateModal } = useProject();

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        className="hidden md:flex"
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
            <AdminHeader
              onToggleSidebar={handleToggleSidebar}
              onCreateProject={openCreateModal}
            />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
