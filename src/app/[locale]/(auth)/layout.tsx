'use client';

import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthShellLayout({ children }: AuthLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleToggleCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const handleToggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const handleMobileNavChange = useCallback((open: boolean) => {
    setIsMobileNavOpen(open);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onToggleMobileNav={handleToggleMobileNav}
      />
      <div className="flex flex-1">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileNavOpen}
          onMobileOpenChange={handleMobileNavChange}
        />
        <main className="flex-1 overflow-auto bg-background/60 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
