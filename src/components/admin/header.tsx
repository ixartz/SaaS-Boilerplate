'use client';

import {
  OrganizationSwitcher,
  UserButton,
} from '@clerk/nextjs';
import {
  Bell,
  Calendar,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type AdminHeaderProps = {
  onToggleSidebar: () => void;
  onCreateProject?: () => void;
  className?: string;
};

export function AdminHeader({
  onToggleSidebar,
  onCreateProject,
  className,
}: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`flex h-16 items-center justify-between border-b bg-background px-6 ${className}`}
    >
      {/* Left section - Mobile Menu */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </div>

      {/* Center section - Search and Actions */}
      <div className="mx-4 flex max-w-2xl flex-1 items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects, tasks, logs..."
            className="w-full pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 size-4" />
            View Calendar
          </Button>
              <Button size="sm" onClick={onCreateProject}>
                <Plus className="mr-2 size-4" />
                Create Project
              </Button>
        </div>
      </div>

      {/* Right section - Actions and User */}
      <div className="flex items-center justify-end gap-2">
        {/* Language Switcher */}
        <LocaleSwitcher />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="hidden sm:flex"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Organization Switcher */}
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: 'flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors',
              organizationSwitcherTriggerIcon: 'size-4',
              organizationSwitcherPopoverCard: 'w-64',
            },
          }}
        />

        {/* User Button */}
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: 'size-8',
              userButtonPopoverCard: 'w-64',
              userButtonPopoverActionButton: 'text-sm',
            },
          }}
        />
      </div>
    </header>
  );
}
