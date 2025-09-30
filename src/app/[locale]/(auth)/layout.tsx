'use client';

import type { ReactNode } from 'react';

import { ShellLayout } from '@/components/admin/shell-layout';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthShellLayout({ children }: AuthLayoutProps) {
  return (
    <ShellLayout>
      {children}
    </ShellLayout>
  );
}
