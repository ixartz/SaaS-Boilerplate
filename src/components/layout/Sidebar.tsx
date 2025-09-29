'use client';

import { LayoutDashboard, ListChecks, PiggyBank, Settings, SquareKanban } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: SquareKanban },
  { label: 'Daily Logs', href: '/daily-logs', icon: ListChecks },
  { label: 'Finance', href: '/finance', icon: PiggyBank },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 flex-col border-r bg-background/80 p-3 md:flex">
      <nav className="space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (pathname?.startsWith(href) ?? false);

          return (
            <Button
              key={href}
              asChild
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-3"
            >
              <Link href={href}>
                <Icon className="size-5" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
