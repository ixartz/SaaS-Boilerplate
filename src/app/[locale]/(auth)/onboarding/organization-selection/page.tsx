import type { Metadata } from 'next';
import { OrganizationList } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type OrganizationSelectionProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: OrganizationSelectionProps): Promise<Metadata> {
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

export default async function OrganizationSelectionPage(props: OrganizationSelectionProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <OrganizationList
        afterSelectOrganizationUrl="/dashboard"
        afterCreateOrganizationUrl="/dashboard"
        hidePersonal
        skipInvitationScreen
      />
    </div>
  );
}
