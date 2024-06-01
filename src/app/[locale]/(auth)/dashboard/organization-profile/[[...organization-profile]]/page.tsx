import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';

const OrganizationProfilePage = () =>
  // props: { params: { locale: string } }
  {
    const t = useTranslations('OrganizationProfile');

    return (
      <>
        <TitleBar
          title={t('title_bar')}
          description={t('title_bar_description')}
        />
        <div>OrganizationProfile</div>
      </>
    );
  };

export default OrganizationProfilePage;
