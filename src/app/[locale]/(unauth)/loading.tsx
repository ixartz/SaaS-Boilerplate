'use client';
import { Box, Card, Container, Group, Paper, SimpleGrid, Skeleton, Stack } from '@mantine/core';

const staggerDelay = (index: number) => ({
  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
});

const DEFAULT_STYLE = {} as const;

const PulseSkeleton = ({ height, width, radius = 'sm', style = DEFAULT_STYLE }: { height: number; width?: string | number; radius?: string; style?: React.CSSProperties }) => (
  <Skeleton
    height={height}
    width={width}
    radius={radius}
    style={{
      background: 'linear-gradient(135deg, var(--mantine-color-gray-2) 0%, var(--mantine-color-gray-1) 50%, var(--mantine-color-gray-2) 100%)',
      backgroundSize: '200% 200%',
      animation: 'pulseGlow 2s ease-in-out infinite',
      ...style,
    }}
  />
);

export default function Loading() {
  return (
    <Container size="lg" py="xl">
      <style>
        {`
        @keyframes pulseGlow {
          0%, 100% { 
            background-position: 0% 50%;
            opacity: 0.6;
          }
          50% { 
            background-position: 100% 50%;
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}
      </style>

      <Stack gap="xl">
        {/* HeroBullets Skeleton */}
        <Box py="xl" style={staggerDelay(0)}>
          <Container size="md">
            <Stack gap="lg">
              <PulseSkeleton height={80} width="90%" radius="md" />
              <PulseSkeleton height={24} width="70%" radius="sm" />
              <PulseSkeleton height={16} width="100%" radius="sm" />
              <PulseSkeleton height={16} width="85%" radius="sm" />
              <Group gap="md" mt="lg">
                <PulseSkeleton height={44} width={140} radius="xl" />
                <PulseSkeleton height={44} width={140} radius="xl" />
              </Group>
            </Stack>
          </Container>
        </Box>

        {/* ChatBot Skeleton */}
        <Box py="xl" style={staggerDelay(1)}>
          <Container size="md">
            <Paper p="lg" radius="md" withBorder>
              <Stack gap="md" align="center">
                <PulseSkeleton height={32} width={200} radius="md" />
                <PulseSkeleton height={16} width="60%" radius="sm" />
                <Box w="100%" mt="md">
                  <Paper p="md" radius="md" bg="gray.0">
                    <Stack gap="sm">
                      <Group justify="flex-end" gap="sm">
                        <PulseSkeleton height={36} width="60%" radius="md" />
                        <PulseSkeleton height={32} width={32} radius="xl" />
                      </Group>
                      <Group justify="flex-start" gap="sm">
                        <PulseSkeleton height={32} width={32} radius="xl" />
                        <PulseSkeleton height={36} width="70%" radius="md" />
                      </Group>
                    </Stack>
                  </Paper>
                  <Group gap="sm" mt="md">
                    <PulseSkeleton height={40} style={{ flex: 1 }} radius="md" />
                    <PulseSkeleton height={40} width={40} radius="md" />
                  </Group>
                </Box>
              </Stack>
            </Paper>
          </Container>
        </Box>

        {/* PortfolioHeroSection Skeleton */}
        <Box py="xl" style={staggerDelay(2)}>
          <Container size="lg">
            <Stack gap="xl">
              <Box ta="center">
                <PulseSkeleton height={48} width="70%" radius="md" style={{ margin: '0 auto' }} />
                <PulseSkeleton height={20} width="50%" radius="sm" style={{ margin: '1rem auto 0' }} />
              </Box>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {[1, 2, 3].map(i => (
                  <Card key={i} shadow="sm" p="lg" radius="md" withBorder>
                    <PulseSkeleton height={180} radius="md" />
                    <PulseSkeleton height={24} width="80%" style={{ marginTop: '1rem' }} />
                    <PulseSkeleton height={14} width="100%" style={{ marginTop: '0.5rem' }} />
                    <PulseSkeleton height={14} width="90%" style={{ marginTop: '0.25rem' }} />
                    <Group mt="md" gap="xs">
                      <PulseSkeleton height={28} width={70} radius="xl" />
                      <PulseSkeleton height={28} width={70} radius="xl" />
                    </Group>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* SkillsSection Skeleton */}
        <Box py="xl" style={staggerDelay(3)}>
          <Container size="lg">
            <Stack gap="lg">
              <Box ta="center">
                <PulseSkeleton height={40} width={250} radius="md" style={{ margin: '0 auto' }} />
                <PulseSkeleton height={16} width="60%" radius="sm" style={{ margin: '0.75rem auto 0' }} />
              </Box>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" mt="xl">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <Paper key={i} p="md" radius="md" withBorder ta="center">
                    <PulseSkeleton height={48} width={48} radius="md" style={{ margin: '0 auto' }} />
                    <PulseSkeleton height={16} width="80%" radius="sm" style={{ margin: '0.75rem auto 0' }} />
                  </Paper>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* ExperienceSection Skeleton */}
        <Box py="xl" style={staggerDelay(4)}>
          <Container size="lg">
            <Stack gap="lg">
              <Box ta="center">
                <PulseSkeleton height={40} width={200} radius="md" style={{ margin: '0 auto' }} />
                <PulseSkeleton height={16} width="50%" radius="sm" style={{ margin: '0.75rem auto 0' }} />
              </Box>
              <Stack gap="md" mt="xl">
                {[1, 2, 3].map(i => (
                  <Paper key={i} p="lg" radius="md" withBorder>
                    <Group align="flex-start" gap="md">
                      <PulseSkeleton height={48} width={48} radius="xl" />
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <PulseSkeleton height={22} width="50%" radius="sm" />
                        <PulseSkeleton height={14} width="35%" radius="sm" />
                        <PulseSkeleton height={14} width="80%" radius="sm" style={{ marginTop: '0.5rem' }} />
                        <PulseSkeleton height={14} width="90%" radius="sm" />
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* ContactInfo Skeleton */}
        <Box py="xl" style={staggerDelay(5)}>
          <Container size="md">
            <Paper p="xl" radius="md" withBorder>
              <Stack gap="lg" align="center">
                <PulseSkeleton height={40} width={220} radius="md" />
                <PulseSkeleton height={16} width="65%" radius="sm" />
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="md" w="100%">
                  {[1, 2, 3].map(i => (
                    <Stack key={i} align="center" gap="sm">
                      <PulseSkeleton height={48} width={48} radius="xl" />
                      <PulseSkeleton height={16} width={100} radius="sm" />
                      <PulseSkeleton height={14} width={120} radius="sm" />
                    </Stack>
                  ))}
                </SimpleGrid>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Stack>
    </Container>
  );
}
