'use client';

import Link from 'next/link';

import { ActiveLink } from '@/components/ActiveLink';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { ToggleMenuButton } from '@/components/ToggleMenuButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/templates/Logo';

const DashboardHeader = (props: {
  menu: {
    href: string;
    label: string;
  }[];
}) => {
  return (
    <>
      <div className="flex items-center">
        <Link href="/dashboard" className="max-sm:hidden">
          <Logo />
        </Link>

        <svg
          className="ml-1 size-8 stroke-muted-foreground max-sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M17 5 7 19" />
        </svg>
        <div>OrganizationSwitcher</div>

        <nav className="ml-3 max-lg:hidden">
          <ul className="flex flex-row items-center gap-x-3 text-lg font-medium [&_a:hover]:opacity-100 [&_a]:opacity-75">
            {props.menu.map((item) => (
              <li key={item.href}>
                <ActiveLink href={item.href}>{item.label}</ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <ul className="flex items-center gap-x-1 [&_li:not(:last-child):hover]:opacity-100 [&_li:not(:last-child)]:opacity-60">
          <li>
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ToggleMenuButton />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {props.menu.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>

          <li>
            <LocaleSwitcher />
          </li>

          <li>
            UserButton
            {/* <UserButton
							userProfileMode='navigation'
							userProfileUrl='/dashboard/user-profile'
							afterSignOutUrl='/'
							appearance={{
								elements: {
									rootBox: 'px-2 py-1.5',
								},
							}}
						/> */}
          </li>
        </ul>
      </div>
    </>
  );
};

export { DashboardHeader };
