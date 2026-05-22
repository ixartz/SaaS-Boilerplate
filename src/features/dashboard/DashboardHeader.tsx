import { UserButton } from '@clerk/nextjs';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ActiveLink } from '@/components/ActiveLink';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

import { Separator } from '@/components/ui/separator';
import { Logo } from '@/templates/Logo';
import { getI18nPath } from '@/utils/Helpers';
import { MobileNavigation } from './MobileNavigation';
import { OrganizationMenu } from './OrganizationMenu';
import { SlashIcon } from './SlashIcon';

export const DashboardHeader = (props: {
  menu: {
    href: string;
    label: string;
  }[];
}) => {
  const locale = useLocale();

  return (
    <>
      <div className="flex items-center">
        <Link href="/dashboard" className="max-sm:hidden">
          <Logo />
        </Link>

        <SlashIcon />

        <OrganizationMenu />

        <nav className="
          ml-3
          max-lg:hidden
        "
        >
          <ul className="
            flex flex-row items-center gap-x-3 text-lg font-medium
            [&_a]:opacity-75
            [&_a:hover]:opacity-100
          "
          >
            {props.menu.map(item => (
              <li key={item.href}>
                <ActiveLink href={item.href}>{item.label}</ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <ul className="flex items-center gap-x-1.5">
          <li className="lg:hidden">
            <MobileNavigation menu={props.menu} />
          </li>

          <li>
            <LocaleSwitcher />
          </li>

          <li>
            <Separator orientation="vertical" className="h-4" />
          </li>

          <li>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl={getI18nPath('/dashboard/user-profile', locale)}
              afterSwitchSessionUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: 'px-2 py-1.5',
                },
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
};
