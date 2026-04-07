import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ExperiencePage } from '@/components/pages/ExperiencePage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'ExperiencePage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      type: 'website',
      locale,
    },
  };
}

const ExperienceRoute = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <ExperiencePage />;
};

export default ExperienceRoute;
