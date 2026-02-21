import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ProtectFallback = (props: { trigger: React.ReactNode }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.trigger}</TooltipTrigger>
        <TooltipContent align="center">
          <p>You don't have enough permission to perform this action.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
