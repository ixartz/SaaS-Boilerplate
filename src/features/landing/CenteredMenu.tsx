import Link from 'next/link';

const CenteredMenu = (props: {
  logo: React.ReactNode;
  children: React.ReactNode;
  rightMenu: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <Link href="/">{props.logo}</Link>

    <nav>
      <ul className="flex flex-row items-center gap-x-6 text-lg font-medium [&_li:hover]:opacity-100 [&_li]:opacity-60">
        {props.children}
      </ul>
    </nav>

    <div>
      <ul className="flex flex-row items-center gap-x-4 text-lg font-medium [&_li:not(:last-child):hover]:opacity-100 [&_li:not(:last-child)]:opacity-60">
        {props.rightMenu}
      </ul>
    </div>
  </div>
);

export { CenteredMenu };
