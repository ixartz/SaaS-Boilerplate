'use client';

import {
  LayoutDashboard,
  ListChecks,
  Menu,
  PiggyBank,
  Settings,
  SquareKanban,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: SquareKanban },
  { label: 'Daily Logs', href: '/daily-logs', icon: ListChecks },
  { label: 'Finance', href: '/finance', icon: PiggyBank },
  { label: 'Settings', href: '/settings', icon: Settings },
];

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export function Sidebar({ isCollapsed, isMobileOpen, onMobileOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isMobileOpen ?? internalOpen;

  const handleOpenChange = (value: boolean) => {
    setInternalOpen(value);
    onMobileOpenChange(value);
  };

  return (
    <>
      <aside
        className="hidden border-r bg-background/80 p-3 transition-all md:flex"
        style={{ width: isCollapsed ? '4.5rem' : '15rem' }}
      >
        <Navigation pathname={pathname} collapsed={isCollapsed} />
      </aside>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="ghost" aria-label="Open navigation">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-background p-4 md:hidden">
          <Navigation pathname={pathname} collapsed={false} />
        </SheetContent>
      </Sheet>
    </>
  );
}

type NavigationProps = {
  pathname: string | null;
  collapsed: boolean;
};

function Navigation({ pathname, collapsed }: NavigationProps) {
  return (
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
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
