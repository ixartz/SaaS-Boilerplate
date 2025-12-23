'use client';

import { useTranslations } from 'next-intl';
import { getI18nPath } from '@/utils/Helpers';

import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { RoleBasedNavigation } from '@/features/dashboard/RoleBasedNavigation';

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');

  const navigationItems = [
    {
      href: '/dashboard',
      label: t('home'),
    },
    {
      href: '/dashboard/admin',
      label: t('admin_panel'),
      requiresAdmin: true,
    },
    {
      href: '/dashboard/organization-profile/organization-members',
      label: t('members'),
    },
    {
      href: '/dashboard/google-business',
      label: t('google_business'),
    },
    {
      href: '/dashboard/organization-profile',
      label: t('settings'),
    }
  ];

  return (
    <>
      <div className="shadow-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-4">
          <RoleBasedNavigation items={navigationItems}>
            {(filteredItems) => (
              <DashboardHeader menu={filteredItems} />
            )}
          </RoleBasedNavigation>
        </div>
      </div>

      <div className="min-h-[calc(100vh-72px)] bg-muted">
        <div className="mx-auto max-w-screen-xl px-3 pb-16 pt-6">
          {props.children}
        </div>
      </div>
    </>
  );
}
