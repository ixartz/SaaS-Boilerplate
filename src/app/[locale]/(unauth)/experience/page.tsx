import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ExperiencePage } from '@/components/pages/ExperiencePage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'ExperiencePage',
  });

  return {
    title: t('title'),
    description: 'My professional experience and career journey',
  };
}

const ExperienceRoute = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <ExperiencePage />;
};

export default ExperienceRoute;
