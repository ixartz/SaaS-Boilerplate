'use client';
import { Badge, Card, Container, Group, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconActivity, IconCode, IconFileText, IconServer, IconUsers } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import classes from './SkillsSection.module.scss';

const iconMap: Record<string, React.ComponentType<any>> = {
  'code': IconCode,
  'server': IconServer,
  'file-text': IconFileText,
  'activity': IconActivity,
  'users': IconUsers,
};

const categoryColors: Record<string, string> = {
  'code': 'blue',
  'server': 'orange',
  'file-text': 'cyan',
  'activity': 'indigo',
  'users': 'indigo',
};

export function SkillsSection() {
  const t = useTranslations('Skills');
  const categories = t.raw('categories') as Array<{ title: string; icon: string; skills: Array<{ emoji: string; label: string }> }>;

  return (
    <Container size="lg" py="xl">
      <Title ta="center" className={classes.title}>
        {t('title')}
      </Title>
      <Text c="dimmed" ta="center" mt="md" mb="xl" size="lg">
        {t('subtitle')}
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon] || IconCode;
          return (
            <Card key={index} shadow="sm" p="lg" radius="md" withBorder className={classes.card}>
              <Group mb="md">
                <ThemeIcon size={40} variant="light" radius="xl">
                  <IconComponent size={20} />
                </ThemeIcon>
                <Text fw={600} size="lg">
                  {category.title}
                </Text>
              </Group>
              <Group gap="xs" wrap="wrap">
                {category.skills.map(skill => (
                  <Badge key={skill.label} variant="light" size="lg" color={categoryColors[category.icon] || 'blue'} leftSection={skill.emoji}>
                    {skill.label}
                  </Badge>
                ))}
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
