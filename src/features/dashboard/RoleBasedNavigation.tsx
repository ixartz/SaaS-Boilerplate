'use client';

import { useAuth } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { ORG_ROLE } from '@/types/Auth';

interface NavigationItem {
  href: string;
  label: string;
  requiresAdmin?: boolean;
}

interface RoleBasedNavigationProps {
  items: NavigationItem[];
  children: (filteredItems: NavigationItem[]) => React.ReactNode;
}

export const RoleBasedNavigation = ({ items, children }: RoleBasedNavigationProps) => {
  const { orgRole } = useAuth();
  const isAdmin = orgRole === ORG_ROLE.ADMIN;

  const filteredItems = items.filter(item => {
    if (item.requiresAdmin) {
      return isAdmin;
    }
    return true;
  });

  return <>{children(filteredItems)}</>;
};
