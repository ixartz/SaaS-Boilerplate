'use client';
import { Carousel } from '@mantine/carousel';
import { Badge, Button, Card, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { HtmlContent } from '@/components/atoms/HtmlContent/HtmlContent';

import classes from './ProjectsPage.module.scss';

export function ProjectsPage() {
  const t = useTranslations('Projects');

  const projects = t.raw('items').map((item: { id: string; title: string; desc: string; metrics: string[]; images: string[]; tech: Array<{ emoji: string; label: string }>; demo: string; github: string; year?: string; status?: string }) => ({
    id: item.id,
    title: item.title,
    images: item.images,
    desc: item.desc,
    tech: item.tech,
    metrics: item.metrics,
    demo: item.demo,
    github: item.github,
    year: item.year,
    status: item.status,
  }));

  type Project = typeof projects[number];

  return (
    <Container size="lg" py="xl">
      <Title ta="center" mb="xl">{t('title')}</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {projects.map((p: Project, i: number) => (
          <Card key={i} id={p.id} shadow="sm" p="xl" radius="md" withBorder className={classes.card}>
            <Card.Section>
              <Group p="xs" justify="space-between" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
                {p.year && <Badge variant="filled" color="blue">{p.year}</Badge>}
                {p.status && <Badge variant="filled" color={p.status === 'Live' ? 'green' : 'gray'}>{p.status}</Badge>}
              </Group>
              <Carousel
                withIndicators
                withControls={false}
                height={180}
                slideSize="100%"
                slideGap="md"
                emblaOptions={{ loop: true }}
                className={classes.carousel}
                styles={{
                  indicator: {
                    'width': 12,
                    'transition': 'width 250ms ease',
                    '&[data-active]': { width: 40 },
                  },
                }}
              >
                {p.images.map((img: string, idx: number) => (
                  <Carousel.Slide key={idx}>
                    <Image
                      src={img}
                      height={180}
                      alt={`${p.title} - Image ${idx + 1}`}
                      width={400}
                      className={classes.carouselImage}
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Card.Section>
            <Title order={3} mt="md"><HtmlContent content={p.title} /></Title>
            <Text component="div" fz="sm" mt="sm"><HtmlContent content={p.desc} /></Text>
            <Group mt="md" mb="md">
              {p.tech.map((tech: { emoji: string; label: string }) => <Badge key={tech.label} variant="light" leftSection={tech.emoji}>{tech.label}</Badge>)}
            </Group>
            <div className={classes.cardFooter}>
              <Group justify="space-between" align="center">
                <Text fz="xs" c="dimmed"><HtmlContent content={p.metrics.join(' • ')} /></Text>
                <Button component="a" href={p.demo} target="_blank" rel="noopener noreferrer" size="sm">
                  {t('view_production')}
                </Button>
              </Group>
            </div>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
