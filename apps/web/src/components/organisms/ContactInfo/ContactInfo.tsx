'use client';
import { ActionIcon, Container, CopyButton, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandLinkedin, IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import classes from './ContactInfo.module.scss';

const iconMap: Record<string, React.ComponentType<any>> = {
  mail: IconMail,
  whatsapp: IconBrandWhatsapp,
  linkedin: IconBrandLinkedin,
};

export function ContactInfo() {
  const t = useTranslations('ContactInfo');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const email = t('email');
  const phone = t('phone');
  const linkedin = t('linkedin');
  const icons = t.raw('icons') as { email: string; phone: string; linkedin: string };

  const EmailIcon
    = iconMap[icons.email]
    ?? IconMail;
  const PhoneIcon
    = iconMap[icons.phone]
    ?? IconBrandWhatsapp;
  const LinkedinIcon
    = iconMap[icons.linkedin]
    ?? IconBrandLinkedin;

  return (
    <Container size="lg" py="xl" id="contact">
      <Title ta="center" className={classes.title} mb="md">
        {t('title')}
      </Title>
      <Text c="dimmed" ta="center" mt="md" mb="xl" size="lg" maw={600} mx="auto">
        {t('subtitle')}
      </Text>

      {isMobile
        ? (
            <Stack align="center" gap="md">
              <Flex align="center" gap="xs">
                <ActionIcon component="a" href={`mailto:${email}`} variant="light" size="lg" radius="xl">
                  <EmailIcon size={20} />
                </ActionIcon>
                <CopyButton value={email}>
                  {({ copied, copy }) => (
                    <Text
                      onClick={copy}
                      className={classes.copyText}
                      fw={500}
                    >
                      {copied ? t('copied') : email}
                    </Text>
                  )}
                </CopyButton>
              </Flex>

              <Flex align="center" gap="xs">
                <ActionIcon component="a" href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" variant="light" size="lg" radius="xl">
                  <PhoneIcon size={20} />
                </ActionIcon>
                <Text fw={500}>{phone}</Text>
              </Flex>

              <Flex align="center" gap="xs">
                <ActionIcon component="a" href={linkedin} target="_blank" variant="light" size="lg" radius="xl">
                  <LinkedinIcon size={20} />
                </ActionIcon>
                <Text fw={500}>{linkedin}</Text>
              </Flex>
            </Stack>
          )
        : (
            <Group justify="center" gap="xl">
              <Flex align="center" gap="xs">
                <ActionIcon component="a" href={`mailto:${email}`} variant="light" size="lg" radius="xl">
                  <EmailIcon size={20} />
                </ActionIcon>
                <CopyButton value={email}>
                  {({ copied, copy }) => (
                    <Text
                      onClick={copy}
                      className={classes.copyText}
                      fw={500}
                    >
                      {copied ? t('copied') : email}
                    </Text>
                  )}
                </CopyButton>
              </Flex>

              <Flex align="center" gap="xs">
                <ActionIcon component="a" href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" variant="light" size="lg" radius="xl">
                  <PhoneIcon size={20} />
                </ActionIcon>
                <Text fw={500}>{phone}</Text>
              </Flex>

              <Flex align="center" gap="xs">
                <ActionIcon component="a" href={linkedin} target="_blank" variant="light" size="lg" radius="xl">
                  <LinkedinIcon size={20} />
                </ActionIcon>
                <Text fw={500}>{linkedin}</Text>
              </Flex>
            </Group>
          )}
    </Container>
  );
}
