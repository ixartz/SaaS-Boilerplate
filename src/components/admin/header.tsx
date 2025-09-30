'use client';

import {
  Bell,
  Building2,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

type AdminHeaderProps = {
  onToggleSidebar: () => void;
  className?: string;
};

export function AdminHeader({
  onToggleSidebar,
  className,
}: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`flex h-16 items-center justify-between border-b bg-background px-6 ${className}`}
    >
      {/* Left section - Logo and Mobile Menu */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="size-5 text-primary-foreground" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">SiteFlow</h1>
            <p className="text-xs text-muted-foreground">Construction Management</p>
          </div>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="mx-4 max-w-md flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects, tasks, logs..."
            className="w-full pl-10"
          />
        </div>
      </div>

      {/* Right section - Actions and User */}
      <div className="flex items-center space-x-2">
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

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-sm font-medium text-white">AU</span>
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@siteflow.com</p>
              </div>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@siteflow.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center space-x-2">
              <UserCircle className="size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2">
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
