'use client';
import { ActionIcon, Container, Group } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import classes from './FooterSocial.module.scss';

export function FooterSocial() {
  const t = useTranslations('FooterSocial');
  const logo = t('logo');
  const links = t.raw('links') as { email: string; whatsapp: string; linkedin: string; github: string };

  return (
    <div className={classes.footer}>
      <Container className={classes.inner} py="md">
        <Image
          src={logo}
          alt={t('alt_text')}
          width={28}
          height={28}
          className={classes.logoImage}
        />
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon component="a" href={`mailto:${links.email}`} size="lg" color="gray" variant="subtle" aria-label={t('aria_labels.email')}>
            <IconMail size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href={links.whatsapp} size="lg" color="gray" variant="subtle" aria-label={t('aria_labels.whatsapp')} target="_blank" rel="noopener noreferrer">
            <IconBrandWhatsapp size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href={links.linkedin} size="lg" color="gray" variant="subtle" aria-label={t('aria_labels.linkedin')} target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href={links.github} size="lg" color="gray" variant="subtle" aria-label={t('aria_labels.github')} target="_blank" rel="noopener noreferrer">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
