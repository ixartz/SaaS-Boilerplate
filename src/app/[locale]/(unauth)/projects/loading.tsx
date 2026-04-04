'use client';
import { Card, Container, Group, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const projectsT = useTranslations('Projects');
  const projects = projectsT.raw('items') as Array<unknown>;

  return (
    <Container size="lg" py="xl">
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .skeleton-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>
      <Stack gap="xl">
        <Skeleton height={50} width={200} radius="md" mx="auto" className="skeleton-shimmer" />
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {projects.map((_, i) => (
            <Card key={i} shadow="sm" p="lg" radius="md" withBorder>
              <Skeleton height={180} radius="md" className="skeleton-shimmer" />
              <Skeleton height={24} width="80%" mt="md" className="skeleton-shimmer" />
              <Skeleton height={14} width="100%" mt="sm" className="skeleton-shimmer" />
              <Skeleton height={14} width="90%" mt="xs" className="skeleton-shimmer" />
              <Group mt="xs" gap="xs">
                <Skeleton height={24} width={60} radius="xl" className="skeleton-shimmer" />
                <Skeleton height={24} width={60} radius="xl" className="skeleton-shimmer" />
                <Skeleton height={24} width={60} radius="xl" className="skeleton-shimmer" />
              </Group>
              <Skeleton height={12} width="70%" mt="xs" className="skeleton-shimmer" />
              <Group mt="md" justify="space-between">
                <Skeleton height={36} width="48%" radius="md" className="skeleton-shimmer" />
                <Skeleton height={36} width="48%" radius="md" className="skeleton-shimmer" />
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
