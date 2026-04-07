export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ChatRequestDto = {
  messages: Message[];
  turnstileToken: string;
};

export type ChatResponseStream = {
  choices?: Array<{
    delta: {
      content?: string;
    };
  }>;
  done?: boolean;
};
