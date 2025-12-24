import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'AdminDashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
