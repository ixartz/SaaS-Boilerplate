import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ProjectsPage } from '@/components/pages/ProjectsPage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Projects',
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

const ProjectsRoute = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <ProjectsPage />;
};

export default ProjectsRoute;
