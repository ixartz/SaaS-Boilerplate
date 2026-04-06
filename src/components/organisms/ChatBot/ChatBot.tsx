'use client';
import { Badge, Box, Button, Container, Flex, Group, Loader, Paper, ScrollArea, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconBrandOpenai, IconRobot, IconSend, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Turnstile from 'react-cloudflare-turnstile';
import useSWRMutation from 'swr/mutation';

import classes from './ChatBot.module.scss';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

async function sendChatMessage(url: string, { arg }: { arg: { messages: Message[]; turnstileToken: string | null; systemPromptExtra?: string } }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: arg.messages,
      turnstileToken: arg.turnstileToken,
      systemPromptExtra: arg.systemPromptExtra,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch response');
  }

  return response;
}

export function ChatBot() {
  const t = useTranslations('ChatBot');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingMessage, setStreamingMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const { trigger, isMutating } = useSWRMutation('/portfolio/api/chat', sendChatMessage);

  const suggestedQueries = t.raw('suggestedQueries') as string[];
  const systemPromptExtra = t('systemPromptExtra');

  const hasConversation = messages.length > 0 || streamingMessage;
  const scrollAreaHeight = hasConversation ? 400 : 200;

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, streamingMessage]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTurnstileToken('dev-mode-bypass');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isMutating) {
      return;
    }

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setStreamingMessage('');

    try {
      const response = await trigger({
        messages: newMessages,
        turnstileToken,
        systemPromptExtra,
      } as any);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Process complete lines from buffer
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
              continue;
            }

            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.slice(6);
              if (data === '[DONE]') {
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantMessage += content;
                  setStreamingMessage(assistantMessage);
                }
              } catch {
                // Skip invalid JSON
              }
            } else {
              // Try to parse as raw JSON (in case SSE prefix is missing)
              try {
                const parsed = JSON.parse(trimmedLine);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantMessage += content;
                  setStreamingMessage(assistantMessage);
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        // Process any remaining buffer content
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer.trim());
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setStreamingMessage(assistantMessage);
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }

      if (assistantMessage) {
        setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        setStreamingMessage('');
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: t('error') }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t('error') }]);
      setStreamingMessage('');
    }
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Stack gap="xs" ta="center">
          <Title order={2} className={classes.title}>
            {t('title')}
          </Title>
          <Text c="dimmed" size="lg">
            {t('subtitle')}
          </Text>
        </Stack>

        <Paper className={classes.chatContainer} p="md" radius="lg" shadow="xl" withBorder>
          <ScrollArea h={scrollAreaHeight} viewportRef={viewportRef} type="auto" className={classes.scrollArea}>
            <Stack gap="md" p="xs">
              {messages.length === 0 && (
                <Stack gap="md" py="xl">
                  <Group justify="center" gap="sm" align="flex-start">
                    <Box className={classes.avatar} bg="blue.6">
                      <IconRobot size={18} color="white" />
                    </Box>
                    <Paper className={classes.assistantMessage} p="sm" radius="md" bg="var(--mantine-color-gray-1)">
                      <Text size="sm" className={classes.messageText}>
                        {t('welcomeMessage')}
                      </Text>
                    </Paper>
                  </Group>

                  <Box>
                    <Text size="xs" fw={700} c="dimmed" mb="xs" ta="center" tt="uppercase" lts="1px">
                      Suggested Questions
                    </Text>
                    <Group justify="center" gap="xs">
                      {suggestedQueries.map((query, i) => (
                        <Button
                          key={i}
                          variant="light"
                          size="xs"
                          radius="xl"
                          onClick={() => {
                            setInput(query);
                          }}
                        >
                          {query}
                        </Button>
                      ))}
                    </Group>
                  </Box>
                </Stack>
              )}
              {messages.map((msg, index) => (
                <Group
                  key={index}
                  align="flex-start"
                  gap="sm"
                  justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                >
                  {msg.role === 'assistant' && (
                    <Box className={classes.avatar} bg="blue.6">
                      <IconRobot size={18} color="white" />
                    </Box>
                  )}
                  <Paper
                    className={`${classes.message} ${msg.role === 'user' ? classes.userMessage : classes.assistantMessage}`}
                    p="sm"
                    radius="md"
                    bg={msg.role === 'user' ? 'blue.6' : 'var(--mantine-color-gray-1)'}
                    c={msg.role === 'user' ? 'white' : 'var(--mantine-color-text)'}
                  >
                    <Text size="sm" className={classes.messageText}>
                      {msg.content}
                    </Text>
                  </Paper>
                  {msg.role === 'user' && (
                    <Box className={classes.avatar} bg="var(--mantine-color-gray-6)">
                      <IconUser size={18} color="white" />
                    </Box>
                  )}
                </Group>
              ))}
              {streamingMessage && (
                <Group gap="sm" align="flex-start">
                  <Box className={classes.avatar} bg="blue.6">
                    <IconRobot size={18} color="white" />
                  </Box>
                  <Paper className={classes.assistantMessage} p="sm" radius="md" bg="var(--mantine-color-gray-1)">
                    <Text size="sm" className={classes.messageText}>
                      {streamingMessage}
                    </Text>
                  </Paper>
                </Group>
              )}
              {isMutating && !streamingMessage && (
                <Group gap="sm" align="flex-start">
                  <Box className={classes.avatar} bg="blue.6">
                    <IconRobot size={18} color="white" />
                  </Box>
                  <Paper className={classes.assistantMessage} p="sm" radius="md" bg="var(--mantine-color-gray-1)">
                    <Loader size="sm" />
                  </Paper>
                </Group>
              )}
            </Stack>
          </ScrollArea>

          <form onSubmit={handleSubmit}>
            <Box mt="md">
              {process.env.NODE_ENV === 'production'
                ? (
                    <Flex justify="center">
                      <Turnstile
                        turnstileSiteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || ''}
                        callback={(token: string) => setTurnstileToken(token)}
                        theme="light"
                        size="normal"
                      />
                    </Flex>
                  )
                : (
                    <Text size="xs" c="dimmed" ta="center">
                      Dev mode: Captcha disabled
                    </Text>
                  )}
              <Group gap="sm" mt="sm">
                <TextInput
                  placeholder={t('inputPlaceholder')}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className={classes.inputField}
                  radius="md"
                  disabled={isMutating}
                />
                <Button type="submit" radius="md" loading={isMutating} disabled={!input.trim() || !turnstileToken}>
                  <IconSend size={18} />
                </Button>
              </Group>
            </Box>
          </form>

          <Stack gap="xs" align="center" mt="sm">
            <Badge variant="light" color="gray" leftSection={<IconBrandOpenai size={14} />}>
              {t('poweredBy')}
            </Badge>
            <Text c="dimmed" size="xs" ta="center">
              {t('gatewayInfo')}
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
