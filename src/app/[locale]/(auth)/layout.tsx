'use client';

import type { ReactNode } from 'react';

import { ProjectProvider } from '@/components/admin/project-context';
import { ShellLayout } from '@/components/admin/shell-layout';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthShellLayout({ children }: AuthLayoutProps) {
  return (
    <ProjectProvider>
      <ShellLayout>
        {children}
      </ShellLayout>
    </ProjectProvider>
  );
}
