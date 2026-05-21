import { setRequestLocale } from 'next-intl/server';
import { CenteredContainer } from '@/features/dashboard/CenteredContainer';

// CenteredLayout provides a vertically and horizontally centered container for auth screens.
export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <CenteredContainer>
      {props.children}
    </CenteredContainer>
  );
}
