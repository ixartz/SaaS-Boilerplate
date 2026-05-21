import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/Helpers';
import { badgeVariants } from './badgeVariants';

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'>
  & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
