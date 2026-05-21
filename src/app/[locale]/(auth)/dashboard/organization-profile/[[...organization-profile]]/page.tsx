import { OrganizationProfile } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { getI18nPath } from '@/utils/Helpers';

export default async function OrganizationProfilePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'OrganizationProfilePage',
  });

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <OrganizationProfile
        routing="path"
        path={getI18nPath('/dashboard/organization-profile', locale)}
        afterLeaveOrganizationUrl="/onboarding/organization-selection"
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full flex', // `flex` is needed when the component has a large width
          },
        }}
      />
    </>
  );
};
