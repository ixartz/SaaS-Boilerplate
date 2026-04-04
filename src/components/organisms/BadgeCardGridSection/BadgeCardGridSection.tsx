'use client';
import { Container, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { BadgeCardGrid } from '@/components/molecules/BadgeCardGrid/BadgeCardGrid';

import classes from './BadgeCardGridSection.module.scss';

export function BadgeCardGridSection() {
  const t = useTranslations('BadgeCardGridSection');

  const cards = t.raw('cards');

  return (
    <Container size="lg" py="xl">
      <Title ta="center" className={classes.title}>
        {t('title')}
      </Title>
      <Text c="dimmed" ta="center" mt="md" mb="xl">
        {t('subtitle')}
      </Text>
      <BadgeCardGrid cards={cards} cols={3} spacing="xl" />
    </Container>
  );
}
