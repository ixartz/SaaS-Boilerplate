import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CenteredLayout(props: { children: React.ReactNode }) {
  if (process.env.CLERK_E2E === 'true') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {props.children}
      </div>
    );
  }

  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {props.children}
    </div>
  );
}
