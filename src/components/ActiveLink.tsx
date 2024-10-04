'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/Helpers';

export const ActiveLink = (props: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Link
      href={props.href}
      className={cn(
        'px-3 py-2',
        pathname.endsWith(props.href)
        && 'rounded-md bg-primary text-primary-foreground',
      )}
    >
      {props.children}
    </Link>
  );
};
