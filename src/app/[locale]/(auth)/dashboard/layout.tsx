import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ActiveLink } from '@/components/ActiveLink';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Logo } from '@/templates/Logo';
import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function DashboardLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations('DashboardLayout');

  return (
    <>
      <div className="shadow-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-5">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Logo />
            </Link>

            <div className="ml-5 h-8">
              <OrganizationSwitcher
                organizationProfileMode="navigation"
                organizationProfileUrl={getI18nPath(
                  '/dashboard/organization-profile',
                  props.params.locale,
                )}
                afterCreateOrganizationUrl="/dashboard"
                hidePersonal
                skipInvitationScreen
              />
            </div>

            <nav className="ml-3">
              <ul className="flex flex-row items-center gap-x-3 text-lg font-medium [&_li:hover]:opacity-100 [&_li]:opacity-75">
                <li>
                  <ActiveLink href="/dashboard">{t('home')}</ActiveLink>
                </li>

                <li>
                  <ActiveLink href="/dashboard/organization-profile">
                    {t('members')}
                  </ActiveLink>
                </li>

                <li>
                  <ActiveLink href="/dashboard/organization-profile/organization-settings">
                    {t('settings')}
                  </ActiveLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-x-4">
            <LocaleSwitcher />

            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/dashboard/user-profile"
              afterSignOutUrl="/sign-in"
            />
          </div>
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
