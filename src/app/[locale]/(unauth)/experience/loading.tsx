'use client';
import { Container, Skeleton, Stack, Timeline } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const expT = useTranslations('Experience');
  const jobs = expT.raw('jobs') as Array<unknown>;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Skeleton height={50} width={200} radius="md" mx="auto" />
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
        <Timeline active={0} bulletSize={40} lineWidth={2}>
          {jobs.map((_, i) => (
            <Timeline.Item key={i} bullet={<Skeleton height={40} circle className="skeleton-shimmer" />}>
              <Skeleton height={24} width="60%" className="skeleton-shimmer" />
              <Skeleton height={16} width="40%" mt="sm" className="skeleton-shimmer" />
              <Skeleton height={16} width="80%" mt="sm" className="skeleton-shimmer" />
            </Timeline.Item>
          ))}
        </Timeline>
      </Stack>
    </Container>
  );
}
