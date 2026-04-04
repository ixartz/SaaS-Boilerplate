'use client';
import { Box, Container, Group, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const heroT = useTranslations('PortfolioHero');
  const bulletsT = useTranslations('HeroBullets');
  const projectsT = useTranslations('Projects');
  const expT = useTranslations('Experience');
  const skillsT = useTranslations('Skills');

  const heroCards = heroT.raw('cards') as Array<unknown>;
  const features = bulletsT.raw('features') as Array<unknown>;
  const projects = projectsT.raw('items') as Array<unknown>;
  const jobs = expT.raw('jobs') as Array<unknown>;
  const skillsCategories = skillsT.raw('categories') as Array<unknown>;

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
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Hero Section Skeleton */}
      <Stack mb="xl" style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <Skeleton height={40} width="60%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Skeleton height={20} width="80%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Group justify="center" mt="md" gap="lg">
          {heroCards.map((_, i) => (
            <Skeleton key={i} height={200} width={280} radius="md" className="skeleton-shimmer" />
          ))}
        </Group>
      </Stack>

      {/* Skills Section Skeleton */}
      <Stack mb="xl" style={{ animation: 'fadeIn 0.5s ease-out 0.15s backwards' }}>
        <Skeleton height={36} width="40%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Skeleton height={16} width="60%" mx="auto" radius="md" className="skeleton-shimmer" />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
          {skillsCategories.map((_, i) => (
            <Box key={i} p="lg" style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}>
              <Group mb="md">
                <Skeleton height={40} width={40} radius="xl" className="skeleton-shimmer" />
                <Skeleton height={20} width="50%" radius="md" className="skeleton-shimmer" />
              </Group>
              <Group gap="xs">
                {[1, 2, 3, 4, 5, 6].map(j => (
                  <Skeleton key={j} height={28} width={80} radius="xl" className="skeleton-shimmer" />
                ))}
              </Group>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>

      {/* Features Section Skeleton */}
      <Stack mb="xl" style={{ animation: 'fadeIn 0.5s ease-out 0.1s backwards' }}>
        <Skeleton height={36} width="50%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Skeleton height={16} width="70%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Group justify="center" mt="md" gap="md">
          {features.map((_, i) => (
            <Stack key={i} gap="xs" style={{ maxWidth: 280 }}>
              <Skeleton height={24} width={24} radius="xl" className="skeleton-shimmer" />
              <Skeleton height={18} width="80%" radius="md" className="skeleton-shimmer" />
              <Skeleton height={14} width="100%" radius="md" className="skeleton-shimmer" />
              <Skeleton height={14} width="90%" radius="md" className="skeleton-shimmer" />
            </Stack>
          ))}
        </Group>
      </Stack>

      {/* Projects Section Skeleton */}
      <Stack mb="xl" style={{ animation: 'fadeIn 0.5s ease-out 0.2s backwards' }}>
        <Skeleton height={36} width="40%" mx="auto" radius="md" className="skeleton-shimmer" />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
          {projects.map((_, i) => (
            <Box key={i} p="lg" style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}>
              <Skeleton height={180} radius="md" className="skeleton-shimmer" />
              <Skeleton height={24} width="80%" mt="md" radius="md" className="skeleton-shimmer" />
              <Skeleton height={14} width="100%" mt="sm" radius="md" className="skeleton-shimmer" />
              <Skeleton height={14} width="90%" mt="xs" radius="md" className="skeleton-shimmer" />
              <Group mt="xs" gap="xs">
                {[1, 2, 3].map(j => (
                  <Skeleton key={j} height={24} width={60} radius="xl" className="skeleton-shimmer" />
                ))}
              </Group>
              <Group mt="md" justify="space-between">
                <Skeleton height={36} width="48%" radius="md" className="skeleton-shimmer" />
                <Skeleton height={36} width="48%" radius="md" className="skeleton-shimmer" />
              </Group>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>

      {/* Experience Section Skeleton */}
      <Stack style={{ animation: 'fadeIn 0.5s ease-out 0.3s backwards' }}>
        <Skeleton height={36} width="35%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Skeleton height={16} width="50%" mx="auto" radius="md" className="skeleton-shimmer" />
        <Stack mt="xl" gap="xl" pl="md">
          {jobs.map((_, i) => (
            <Group key={i} align="flex-start" gap="md">
              <Skeleton height={40} width={40} radius="xl" className="skeleton-shimmer" />
              <Stack gap="xs" style={{ flex: 1 }}>
                <Skeleton height={20} width="60%" radius="md" className="skeleton-shimmer" />
                <Skeleton height={14} width="40%" radius="md" className="skeleton-shimmer" />
                <Skeleton height={14} width="100%" radius="md" className="skeleton-shimmer" />
                <Skeleton height={14} width="85%" radius="md" className="skeleton-shimmer" />
              </Stack>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
