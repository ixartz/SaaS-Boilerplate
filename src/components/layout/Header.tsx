'use client';

import {
  Bell,
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle,
} from 'lucide-react';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type HeaderProps = {
  isSidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMobileNav: () => void;
};

export function Header({ isSidebarCollapsed, onToggleCollapse, onToggleMobileNav }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/95 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="md:hidden"
          aria-label="Open navigation"
          onClick={onToggleMobileNav}
        >
          <Menu className="size-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="hidden md:inline-flex"
          aria-label={isSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          onClick={onToggleCollapse}
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
        </Button>
        <span className="text-lg font-semibold tracking-tight">SiteFlow</span>
      </div>

      <div className="flex items-center gap-2">
        <LocaleSwitcher />
        <Button size="icon" variant="ghost" aria-label="Notifications">
          <Bell className="size-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <UserCircle className="size-6" />
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
