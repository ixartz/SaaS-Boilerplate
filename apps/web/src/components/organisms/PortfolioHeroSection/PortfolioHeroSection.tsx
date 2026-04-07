'use client';
import { Badge, Container, Group, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import type { BadgeCardData } from '@/components/molecules/BadgeCardGrid/BadgeCardGrid';
import { BadgeCardGrid } from '@/components/molecules/BadgeCardGrid/BadgeCardGrid';

import classes from './PortfolioHeroSection.module.scss';

export type PortfolioHeroSectionProps = {
  readonly title?: string;
  readonly subtitle?: string;
  readonly cards?: BadgeCardData[];
  readonly cols?: number | { base: number; sm?: number; md?: number; lg?: number };
};

const DEFAULT_COLS = { base: 1, sm: 2, md: 3 } as const;

export function PortfolioHeroSection({
  title,
  subtitle,
  cards,
  cols = DEFAULT_COLS,
}: PortfolioHeroSectionProps) {
  const t = useTranslations('PortfolioHero');

  const defaultCards: BadgeCardData[] = t.raw('cards').map((card: { id: string; title: string; category: string; description: string; badges: string[]; images: string[]; emoji: string }, _index: number) => ({
    id: card.id,
    images: card.images,
    title: card.title,
    country: card.category,
    description: card.description,
    badges: card.badges.map((badge: string, badgeIndex: number) => ({
      emoji: badgeIndex === 0 ? card.emoji : ['▲', '📘', '🎯', '💅', '📱', '♿', '📊', '🔐', '💾'][badgeIndex - 1] || '•',
      label: badge,
    })),
  }));

  return (
    <Container size="lg" py="xl">
      <Group justify="center" mb="lg">
        <Badge size="lg" variant="light" radius="xl">
          {t('badge')}
        </Badge>
      </Group>
      <Title ta="center" className={classes.title} mb="md">
        {title || t('title')}
      </Title>
      <Text c="dimmed" ta="center" mt="md" mb="xl" size="sm" maw={600} mx="auto" lh={1.6}>
        {subtitle || t('subtitle')}
      </Text>
      <BadgeCardGrid cards={cards || defaultCards} cols={cols} spacing="md" />
    </Container>
  );
}
