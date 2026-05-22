import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const MobileNavigation = (props: {
  menu: {
    href: string;
    label: string;
  }[];
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        className="
          p-2
          focus-visible:ring-offset-0
        "
        variant="ghost"
      >
        <svg
          className="size-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {props.menu.map(item => (
        <DropdownMenuItem key={item.href} asChild>
          <Link href={item.href}>{item.label}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
