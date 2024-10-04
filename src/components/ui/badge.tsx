import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/Helpers';

import { badgeVariants } from './badgeVariants';

export type BadgeProps = {} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
