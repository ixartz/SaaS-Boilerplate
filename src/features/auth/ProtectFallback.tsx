import { useTranslations } from 'next-intl';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ProtectFallback = (props: { trigger: React.ReactNode }) => {
  const t = useTranslations('ProtectFallback');

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.trigger}</TooltipTrigger>
        <TooltipContent align="center">
          <p>{t('not_enough_permission')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
