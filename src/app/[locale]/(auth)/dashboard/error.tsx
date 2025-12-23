'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex h-[600px] flex-col items-center justify-center rounded-md bg-card p-5">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          {t('something_went_wrong')}
        </h2>
        <p className="mb-4 text-muted-foreground">
          {t('error_occurred')}
        </p>
        <Button onClick={reset}>
          {t('try_again')}
        </Button>
      </div>
    </div>
  );
}
