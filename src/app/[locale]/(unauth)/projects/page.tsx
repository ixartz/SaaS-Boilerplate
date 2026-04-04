import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ProjectsPage } from '@/components/pages/ProjectsPage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Projects',
  });

  return {
    title: t('title'),
    description: 'A showcase of my frontend development projects',
  };
}

const ProjectsRoute = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <ProjectsPage />;
};

export default ProjectsRoute;
