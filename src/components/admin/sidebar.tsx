'use client';

import {
  BarChart3,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  LayoutDashboard,
  ListChecks,
  Settings,
  SquareKanban,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: SquareKanban,
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: ListChecks,
  },
  {
    name: 'Daily Logs',
    href: '/daily-logs',
    icon: Calendar,
  },
  {
    name: 'Finance',
    href: '/finance',
    icon: DollarSign,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

type AdminSidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
};

export function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  className,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="size-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-semibold">SiteFlow</span>
              <p className="text-xs text-muted-foreground">Construction</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="size-8"
        >
          {isCollapsed
? (
            <ChevronRight className="size-4" />
          )
: (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                isCollapsed && 'justify-center',
              )}
            >
              <Icon className={cn(
                'h-4 w-4 transition-colors',
                !isCollapsed && 'mr-3',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground',
              )}
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
            <div className="text-xs text-muted-foreground">
              SiteFlow v1.0.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
