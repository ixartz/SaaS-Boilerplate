import { getTranslations } from 'next-intl/server';

import { AIVideoEditor } from '@/features/ai-video/components/AIVideoEditor';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'AIVideoEditor',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function AIVideoEditorPage() {
  return <AIVideoEditor />;
}
