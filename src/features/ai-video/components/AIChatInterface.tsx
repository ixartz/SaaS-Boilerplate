'use client';

import { Send, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type {
  EditorState,
} from '@/features/video-editor/types/editor.types';

type ToolInvocation = {
  toolName: string;
  args: any;
  status: 'proposed' | 'accepted' | 'rejected';
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolInvocation[];
};

type AIChatInterfaceProps = {
  videoState: EditorState;
  actions: {
    trim: (start: number, end: number) => Promise<void>;
    crop: (aspectRatio: '16:9' | '1:1' | '9:16' | 'custom') => Promise<void>;
    rotate: (degrees: 90 | 180 | 270) => Promise<void>;
    changeSpeed: (multiplier: number) => Promise<void>;
    setVolume: (level: number) => Promise<void>;
    seek: (time: number) => void;
    undo: () => void;
  };
};

export const AIChatInterface = ({ actions, videoState }: AIChatInterfaceProps) => {
  const {
    trim,
    crop,
    rotate,
    changeSpeed,
    setVolume,
    seek,
    undo,
  } = actions;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToolAction = async (toolName: string, args: any, messageId: string) => {
    // Aliasing and Arg Normalization for model resilience
    const normalizedName = toolName.toLowerCase().startsWith('trim') ? 'trimVideo' 
                        : toolName.toLowerCase().startsWith('crop') ? 'cropVideo'
                        : toolName.toLowerCase().startsWith('rotate') ? 'rotateVideo'
                        : toolName;

    try {
      switch (normalizedName) {
        case 'trimVideo': {
          const start = typeof args.start === 'number' ? args.start : 0;
          const end = typeof args.end === 'number' ? args.end 
                    : typeof args.to === 'number' ? args.to 
                    : videoState.duration;
          await trim(start, end);
          break;
        }
        case 'cropVideo':
          await crop((args as unknown as { aspectRatio: any }).aspectRatio);
          break;
        case 'rotateVideo':
          await rotate((args as unknown as { degrees: any }).degrees);
          break;
        case 'changeSpeed':
          await changeSpeed((args as unknown as { multiplier: number }).multiplier);
          break;
        case 'adjustVolume':
          await setVolume((args as unknown as { level: number }).level);
          break;
        case 'seekTo':
          seek((args as unknown as { time: number }).time);
          break;
        case 'undo':
          undo();
          break;
        default:
          console.warn('Unknown tool action:', toolName);
      }

      // Update message status to accepted
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              toolInvocations: msg.toolInvocations?.map(ti => 
                ti.toolName === toolName ? { ...ti, status: 'accepted' } : ti
              ) 
            } 
          : msg
      ));

    } catch (error) {
      console.error('Error executing tool action:', error);
    }
  };

  const handleRejectAction = (toolName: string, messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            toolInvocations: msg.toolInvocations?.map(ti => 
              ti.toolName === toolName ? { ...ti, status: 'rejected' } : ti
            ) 
          } 
        : msg
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessageContent = input;
    setInput('');
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageContent,
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessageContent }],
          videoContext: {
            duration: videoState.duration,
            currentTime: videoState.currentTime,
            width: videoState.width,
            height: videoState.height,
            playbackSpeed: videoState.playbackSpeed,
            volume: videoState.volume,
            rotation: videoState.rotation,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from chat API');
      }

      const data = await response.json();
      const { punny_response, tool_action } = data;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: punny_response,
        toolInvocations: tool_action ? [{ 
          toolName: tool_action.name, 
          args: tool_action.args,
          status: 'proposed'
        }] : undefined,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If it's just a seekTo or undo, we can execute it automatically
      if (tool_action && (tool_action.name === 'seekTo' || tool_action.name === 'undo')) {
        await handleToolAction(tool_action.name, tool_action.args, assistantMessage.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="flex h-full flex-col border-none shadow-none">
      <CardHeader className="border-b px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="size-5 text-purple-500" />
          AI Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <p>Hi! I can help you edit your video.</p>
                <p className="mt-2 text-sm">Try asking:</p>
                <ul className="mt-1 text-sm italic">
                  <li>"Trim the first 5 seconds"</li>
                  <li>"Speed up the video by 2x"</li>
                  <li>"Make the video black and white"</li>
                </ul>
              </div>
            )}

            {messages.map(m => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                   }`}
                >
                  <div className="mb-1 text-xs font-semibold opacity-70">
                    {m.role === 'user' ? 'You' : 'AI'}
                  </div>
                  <div>{m.content}</div>

                  {m.toolInvocations?.map((toolInvocation, i) => (
                    <div key={`${m.id}-tool-${i}`} className="mt-2 rounded border bg-background/50 p-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold">
                        🛠️ {toolInvocation.toolName}
                      </div>
                      <div className="mt-1 font-mono text-[10px] opacity-70">
                        {JSON.stringify(toolInvocation.args)}
                      </div>

                      {toolInvocation.status === 'proposed' && (
                        <div className="mt-3 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="h-7 px-3 text-xs"
                            onClick={() => handleToolAction(toolInvocation.toolName, toolInvocation.args, m.id)}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 px-3 text-xs"
                            onClick={() => handleRejectAction(toolInvocation.toolName, m.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}

                      {toolInvocation.status === 'accepted' && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-green-600">
                          ✓ Applied
                        </div>
                      )}

                      {toolInvocation.status === 'rejected' && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                          ✕ Discarded
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe how to edit..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
