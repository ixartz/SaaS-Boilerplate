'use client';
import { Badge, Box, Container, Stack, Text, ThemeIcon, Timeline, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { HtmlContent } from '@/components/atoms/HtmlContent';

import classes from './ExperiencePage.module.scss';

// Dynamic imports for icons to improve initial load performance
const IconBriefcase = dynamic(() => import('@tabler/icons-react').then(mod => ({ default: mod.IconBriefcase })), {
  ssr: false,
});
const IconSchool = dynamic(() => import('@tabler/icons-react').then(mod => ({ default: mod.IconSchool })), {
  ssr: false,
});

export function ExperiencePage() {
  const t = useTranslations('ExperiencePage');
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const jobs = t.raw('jobs') as Array<{ id: string; title: string; company: string; badge: string; description: string }>;
  const educationTitle = t('education_title');
  const educationInstitution = t('education_institution');
  const educationDetails = t('education_details');
  const workExperienceTitle = t('work_experience_title');
  const educationSectionTitle = t('education_section_title');

  return (
    <Container size="lg" py="xl">
      <Title ta="center" mb="lg">
        {t('title')}
      </Title>

      <Stack gap="xl">
        {/* Work Experience Timeline */}
        <div>
          <Title order={2} size={isMobile ? 'h3' : 'h2'} mb="md">
            {workExperienceTitle}
          </Title>
          <Timeline
            active={Infinity}
            lineWidth={isMobile ? 2 : 4}
            bulletSize={isMobile ? 40 : 48}
            className={classes.timeline}
          >
            {jobs.map((job, index) => {
              const IconComponent = IconBriefcase;

              return (
                <Timeline.Item
                  key={index}
                  bullet={<ThemeIcon size={isMobile ? 40 : 48} radius="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}><IconComponent size={isMobile ? 20 : 24} /></ThemeIcon>}
                  title={<Text size={isMobile ? 'sm' : 'md'} fw={700}>{job.title}</Text>}
                  id={job.id}
                >
                  <Text size={isMobile ? 'sm' : 'md'}>{job.company}</Text>
                  <Badge size={isMobile ? 'sm' : 'md'} mt={4}>{job.badge}</Badge>
                  <Box>
                    <HtmlContent
                      content={job.description}
                      className={`mt-sm pl-md ${isMobile ? 'text-xs' : 'text-sm'}`}
                    />
                  </Box>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>

        {/* Education Section */}
        <div>
          <Title order={2} size={isMobile ? 'h3' : 'h2'} mb="md">
            {educationSectionTitle}
          </Title>
          <Timeline
            active={Infinity}
            lineWidth={isMobile ? 2 : 4}
            bulletSize={isMobile ? 40 : 48}
          >
            <Timeline.Item
              bullet={<ThemeIcon size={isMobile ? 40 : 48} radius="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}><IconSchool size={isMobile ? 20 : 24} /></ThemeIcon>}
              title={<Text size={isMobile ? 'sm' : 'md'} fw={700}>{educationTitle}</Text>}
            >
              <Text size={isMobile ? 'sm' : 'md'}>{educationInstitution}</Text>
              <HtmlContent
                content={educationDetails}
                className={`mt-sm pl-md ${isMobile ? 'text-xs' : 'text-sm'}`}
              />
            </Timeline.Item>
          </Timeline>
        </div>
      </Stack>
    </Container>
  );
}
