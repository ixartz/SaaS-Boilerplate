import { SimpleGrid } from '@mantine/core';

import { BadgeCard } from '../BadgeCard/BadgeCard';

export type BadgeCardData = {
  id: string;
  images: string[];
  title: string;
  country: string;
  description: string;
  badges: Array<{
    emoji: string;
    label: string;
  }>;
};

type BadgeCardGridProps = {
  readonly cards: BadgeCardData[];
  readonly cols?: number | { base: number; sm?: number; md?: number; lg?: number };
  readonly spacing?: string | number;
  readonly verticalSpacing?: string | number;
};

const defaultCols = { base: 1, sm: 2, md: 3 };

export function BadgeCardGrid({
  cards,
  cols = defaultCols,
  spacing = 'md',
  verticalSpacing = 'md',
}: BadgeCardGridProps) {
  return (
    <SimpleGrid
      cols={cols}
      spacing={spacing}
      verticalSpacing={verticalSpacing}
    >
      {cards.map((card, index) => (
        <BadgeCard
          key={`${card.title}-${index}`}
          id={card.id}
          images={card.images}
          title={card.title}
          country={card.country}
          description={card.description}
          badges={card.badges}
        />
      ))}
    </SimpleGrid>
  );
}
