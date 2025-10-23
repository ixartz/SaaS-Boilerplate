import { auth } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';

import { DashboardHeader } from '@/features/dashboard/DashboardHeader';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function DashboardLayout(props: { children: React.ReactNode }) {
  const t = await getTranslations('DashboardLayout');
  const { orgId } = await auth();

  // Base menu items that are always shown
  const baseMenu = [
    {
      href: '/dashboard',
      label: t('home'),
    },
  ];

  // Organization-specific menu items (only show if user is in an organization)
  const organizationMenu = orgId
    ? [
        {
          href: '/dashboard/organization-profile/organization-members',
          label: t('members'),
        },
        {
          href: '/dashboard/organization-profile',
          label: t('settings'),
        },
      ]
    : [];

  // Combine menus
  const menu = [...baseMenu, ...organizationMenu];

  return (
    <>
      <div className="shadow-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-4">
          <DashboardHeader menu={menu} />
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

export const dynamic = 'force-dynamic';
