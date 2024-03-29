import { OrganizationProfile } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { getI18nPath } from '@/utils/Helpers';

const OrganizationProfilePage = (props: { params: { locale: string } }) => {
  const t = useTranslations('OrganizationProfile');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="flex justify-center">
        <OrganizationProfile
          routing="path"
          path={getI18nPath(
            '/dashboard/organization-profile',
            props.params.locale,
          )}
          afterLeaveOrganizationUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'w-full',
            },
          }}
        />
      </div>
    </>
  );
};

export default OrganizationProfilePage;
