import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { getI18nPath } from '@/utils/Helpers';

export default async function CenteredLayout(
  props: { children: React.ReactNode; params: { locale: string } },
) {
  const { userId } = await auth();

  if (userId) {
    redirect(getI18nPath('/dashboard', props.params.locale));
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {props.children}
    </div>
  );
}
