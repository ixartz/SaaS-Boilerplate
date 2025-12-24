import { useTranslations } from 'next-intl';

import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { RoleGuard } from '@/features/auth/RoleGuard';

export default function AdminLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('AdminDashboardLayout');

  return (
    <RoleGuard>
      <>
        <div className="shadow-md">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-4">
            <DashboardHeader
              menu={[
                {
                  href: '/dashboard',
                  label: t('home'),
                },
                {
                  href: '/dashboard/admin',
                  label: t('admin_panel'),
                },
                {
                  href: '/dashboard/admin/users',
                  label: t('users'),
                },
                {
                  href: '/dashboard/admin/organizations',
                  label: t('organizations'),
                },
                {
                  href: '/dashboard/admin/settings',
                  label: t('settings'),
                },
                {
                  href: '/dashboard/organization-profile',
                  label: t('org_settings'),
                },
              ]}
            />
          </div>
        </div>

        <div className="min-h-[calc(100vh-72px)] bg-muted">
          <div className="mx-auto max-w-screen-xl px-3 pb-16 pt-6">
            {props.children}
          </div>
        </div>
      </>
    </RoleGuard>
  );
}
