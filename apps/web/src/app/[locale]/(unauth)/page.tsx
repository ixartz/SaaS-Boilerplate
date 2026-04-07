import { getTranslations, setRequestLocale } from 'next-intl/server';

import { HomePage } from '@/components/pages/HomePage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const IndexPage = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <HomePage />
  );
};

export default IndexPage;
