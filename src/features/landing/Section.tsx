import { cn } from '@/utils/Helpers';

export const Section = (props: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}) => (
  <div className={cn('px-3 py-16', props.className)}>
    {(props.title || props.subtitle || props.description) && (
      <div className="mx-auto mb-12 max-w-(--breakpoint-md) text-center">
        {props.subtitle && (
          <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-sm font-bold text-transparent">
            {props.subtitle}
          </div>
        )}

        {props.title && (
          <div className="mt-1 text-3xl font-bold">{props.title}</div>
        )}

        {props.description && (
          <div className="text-muted-foreground mt-2 text-lg">
            {props.description}
          </div>
        )}
      </div>
    )}

    <div className="mx-auto max-w-(--breakpoint-lg)">{props.children}</div>
  </div>
);
