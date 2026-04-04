'use client';
import {
  Burger,
  Collapse,
  Container,
  Group,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import classes from './HeaderTabs.module.scss';

export function HeaderTabs() {
  const t = useTranslations('HeaderTabs');
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(false);

  const tabs = [
    { label: t('home'), href: '/' },
    { label: t('projects'), href: '/projects' },
    { label: t('experience'), href: '/experience' },
    { label: t('contact'), href: '/#contact' },
  ];

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === '/') {
      return t('home');
    }
    if (pathname === '/projects') {
      return t('projects');
    }
    if (pathname === '/experience') {
      return t('experience');
    }
    return t('home');
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      if (pathname !== '/') {
        router.push('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(href.slice(2));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(href.slice(2));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const items = tabs.map(tab => (
    <Tabs.Tab
      value={tab.label}
      key={tab.label}
      renderRoot={({ ref, ...others }) => (
        <Link ref={ref} href={tab.href} onClick={e => handleTabClick(e, tab.href)} {...others}>
          {tab.label}
        </Link>
      )}
    >
      {tab.label}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Link
            href={t('profile_link')}
            className={classes.profileLink}
          >
            <Group gap="xs">
              <Image
                src={t('avatar')}
                alt="Profile"
                width={40}
                height={40}
                className={classes.avatarImage}
              />
              <Text fw={700} size="lg">{t('name')}</Text>
            </Group>
          </Link>

          <Tabs
            value={getActiveTab()}
            variant="outline"
            visibleFrom="lg"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
            {tabs.map(tab => (
              <Tabs.Panel value={tab.label} key={tab.label}>
                {' '}
              </Tabs.Panel>
            ))}
          </Tabs>

          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="lg"
            size="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </Container>
      <Collapse in={opened}>
        <Container size="md" py="md">
          <Stack gap="sm">
            {tabs.map(tab => (
              <Link
                key={tab.label}
                href={tab.href}
                className={`${classes.mobileLink} ${getActiveTab() === tab.label ? classes.active : ''}`}
                onClick={() => {
                  if (tab.href.startsWith('/#')) {
                    const element = document.getElementById(tab.href.slice(2));
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                  toggle();
                }}
              >
                <Text fw={500}>{tab.label}</Text>
              </Link>
            ))}
          </Stack>
        </Container>
      </Collapse>
    </div>
  );
}
