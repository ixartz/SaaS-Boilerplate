import { Carousel } from '@mantine/carousel';
import { Badge, Button, Card, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { HtmlContent } from '@/components/atoms/HtmlContent/HtmlContent';

import classes from './BadgeCard.module.scss';

export type BadgeCardProps = {
  id: string;
  images: string[];
  title: string;
  country: string;
  description: string;
  badges: Array<{
    emoji: string;
    label: string;
  }> ;
};

export function BadgeCard({ id, images, title, description, country, badges }: BadgeCardProps) {
  const t = useTranslations('BadgeCard');

  const features = badges.map(badge => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Carousel
          withIndicators={false}
          withControls={false}
          height={180}
          slideSize="100%"
          slideGap="md"
          emblaOptions={{ loop: true }}
        >
          {images.map((img, index) => (
            <Carousel.Slide key={index}>
              <Image
                src={img}
                alt={`${title} - Image ${index + 1}`}
                width={400}
                height={180}
                className={classes.carouselImage}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group justify="apart">
          <Text component="div" fz="lg" fw={500}><HtmlContent content={title} /></Text>
          <Badge size="sm" variant="light">
            {country}
          </Badge>
        </Group>
        <Text component="div" fz="sm" mt="xs"><HtmlContent content={description} /></Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text component="div" className={classes.label} c="dimmed">
          <HtmlContent content={t('technologies_skills')} />
        </Text>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="auto" pt="md">
        <Button radius="md" className={classes.viewButton} component={Link} href={`/projects#${id}`}>
          {t('view_project')}
        </Button>
      </Group>
    </Card>
  );
}
