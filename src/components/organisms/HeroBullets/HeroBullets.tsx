'use client';
import { Button, Container, Group, List, ThemeIcon, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconCheck, IconMail } from '@tabler/icons-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { HtmlContent } from '@/components/atoms/HtmlContent';

import classes from './HeroBullets.module.scss';

export function HeroBullets() {
  const t = useTranslations('HeroBullets');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const image = t('image');
  const features = t.raw('features') as Array<{ title: string; description: string }>;

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title} mb="md">
            {t('title')}
          </Title>
          <HtmlContent
            content={t('description')}
            className="text-dimmed mt-md size-lg leading-relaxed"
          />

          <List
            mt="xl"
            spacing="md"
            size="md"
            maw={500}
            m="0 auto"
            icon={(
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            )}
          >
            {features.map((feature, index) => (
              <List.Item
                key={index}
                styles={{
                  itemIcon: {
                    alignSelf: 'flex-start',
                  },
                  itemLabel: {
                    textAlign: 'left',
                  },
                }}
              >
                <b>{feature.title}</b>
                {' '}
                <HtmlContent content={feature.description} />
              </List.Item>
            ))}
          </List>

          <Group maw={500} mt="lg" ml="auto" mr="auto" gap="sm" justify={isMobile ? 'center' : 'flex-start'}>
            <Button
              radius="xl"
              size="md"
              className={classes.control}
              fullWidth={isMobile}
              component="a"
              href={t('primary_button_link')}
              rightSection={<IconArrowRight size={18} />}
            >
              {t('primary_button')}
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
              fullWidth={isMobile}
              onClick={scrollToContact}
              leftSection={<IconMail size={18} />}
            >
              {t('secondary_button')}
            </Button>
          </Group>
        </div>
        <Image
          src={image}
          className={`${classes.image} ${classes.heroImage}`}
          alt=""
          width={400}
          height={300}
        />
      </div>
    </Container>
  );
}
