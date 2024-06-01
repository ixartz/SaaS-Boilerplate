import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';

const UserProfilePage = () =>
  // props: { params: { locale: string } }
  {
    const t = useTranslations('UserProfile');

    return (
      <>
        <TitleBar
          title={t('title_bar')}
          description={t('title_bar_description')}
        />
        <div>UserProfile</div>
      </>
    );
  };

export default UserProfilePage;
