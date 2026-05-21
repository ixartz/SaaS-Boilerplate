import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';

type DashboardLayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata(props: DashboardLayoutProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });

  return (
    <>
      <div className="shadow-md">
        <div className="
          mx-auto flex max-w-7xl items-center justify-between px-3 py-4
        "
        >
          <DashboardHeader
            menu={[
              {
                href: '/dashboard',
                label: t('home'),
              },
              {
                href: '/dashboard/organization-profile/organization-members',
                label: t('members'),
              },
              {
                href: '/dashboard/organization-profile',
                label: t('settings'),
              },
            ]}
          />
        </div>
      </div>

      <div className="min-h-[calc(100vh-72px)] bg-muted">
        <div className="mx-auto max-w-7xl px-3 pt-6 pb-16">
          {props.children}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
