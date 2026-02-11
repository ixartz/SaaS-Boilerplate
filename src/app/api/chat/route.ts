import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import * as z from "zod";
import { NextResponse } from 'next/server';
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// Define the shape of your video context for TypeScript
interface VideoContext {
  duration: number;
  currentTime: number;
  width: number;
  height: number;
  playbackSpeed: number;
  volume: number;
  rotation: number;
}

export const maxDuration = 60;

// Set up memory
const checkpointer = new MemorySaver();

export async function POST(req: Request) {
  const { messages, videoContext }: { messages: any[], videoContext: VideoContext } = await req.json();

  // Define tools
  const trimVideo = tool(
    async ({ start, end }) => `Proposed trim from ${start}s to ${end}s`,
    {
      name: "trimVideo",
      description: 'Trim the video to a specific start and end time',
      schema: z.object({
        start: z.number().describe('Start time in seconds'),
        end: z.number().describe('End time in seconds'),
      }),
    }
  );

  const cropVideo = tool(
    async ({ aspectRatio }) => `Proposed crop to ${aspectRatio}`,
    {
      name: "cropVideo",
      description: 'Crop the video to a specific aspect ratio',
      schema: z.object({
        aspectRatio: z.string().describe('Aspect ratio (e.g., "16:9", "1:1", "9:16")'),
      }),
    }
  );

  const rotateVideo = tool(
    async ({ degrees }) => `Proposed rotation by ${degrees} degrees`,
    {
      name: "rotateVideo",
      description: 'Rotate the video',
      schema: z.object({
        degrees: z.number().describe('Rotation angle in degrees (90, 180, 270)'),
      }),
    }
  );

  const changeSpeed = tool(
    async ({ multiplier }) => `Proposed speed change to ${multiplier}x`,
    {
      name: "changeSpeed",
      description: 'Change video playback speed',
      schema: z.object({
        multiplier: z.number().describe('Speed multiplier (e.g., 0.5 for slow motion, 2.0 for fast forward)'),
      }),
    }
  );

  const adjustVolume = tool(
    async ({ level }) => `Proposed volume adjustment to ${level}`,
    {
      name: "adjustVolume",
      description: 'Adjust video volume',
      schema: z.object({
        level: z.number().min(0).max(1).describe('Volume level from 0 to 1.0'),
      }),
    }
  );

  const addFadeIn = tool(
    async ({ duration }) => `Proposed fade-in for ${duration}s`,
    {
      name: "addFadeIn",
      description: 'Add fade in effect',
      schema: z.object({
        duration: z.number().describe('Duration of the fade in seconds'),
      }),
    }
  );

  const addFadeOut = tool(
    async ({ duration }) => `Proposed fade-out for ${duration}s`,
    {
      name: "addFadeOut",
      description: 'Add fade out effect',
      schema: z.object({
        duration: z.number().describe('Duration of the fade in seconds'),
      }),
    }
  );

  const seekTo = tool(
    async ({ time }) => `Seeked to ${time}s`,
    {
      name: "seekTo",
      description: 'Seek to a specific time in the video',
      schema: z.object({
        time: z.number().describe('Time in seconds to seek to'),
      }),
    }
  );

  const undo = tool(
    async () => `Last edit undone`,
    {
      name: "undo",
      description: 'Undo the last edit operation',
      schema: z.object({}),
    }
  );

  const tools = [trimVideo, cropVideo, rotateVideo, changeSpeed, adjustVolume, addFadeIn, addFadeOut, seekTo, undo];

  // Configure model
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const systemPrompt = `
    You are the "Cursor" for video editing. Your goal is to help the user edit their video.
    
    CURRENT VIDEO STATE:
    - Duration: ${videoContext.duration.toFixed(2)}s
    - Playhead Position: ${videoContext.currentTime.toFixed(2)}s
    - Dimensions: ${videoContext.width}x${videoContext.height}
    
    TOOLS AVAILABLE:
    Use these tools to perform actions on the video.
    - trimVideo({ start, end }): Use this for trimming.
    - cropVideo({ aspectRatio }): aspectRatio can be "16:9", "1:1", "9:16".
    - rotateVideo({ degrees }): degrees can be 90, 180, 270.
    - changeSpeed({ multiplier }): multiplier can be 0.5, 2.0, etc.
    - adjustVolume({ level }): level from 0 to 1.0.
    - seekTo({ time }): jump to a time in the video.
    - undo(): undo last edit.

    RULES:
    1. If you need to perform an action, CALL THE APPROPRIATE TOOL.
    2. Always respond with a JSON object in this format:
       { "punny_response": "Your playful response here", "tool_action": { "name": "toolName", "args": { ... } } }
    3. If no tool is needed, set tool_action to null.
    4. Be playful and punny in your responses!
  `;

  // Create agent
  const agent = createReactAgent({
    llm: model,
    tools,
    checkpointSaver: checkpointer,
    messageModifier: systemPrompt,
  });

  const config = {
    configurable: { thread_id: "default-thread" }, 
  };

  const formattedMessages = messages.map(m => {
    if (m.role === 'user') return new HumanMessage(m.content);
    if (m.role === 'assistant') return new AIMessage(m.content);
    return m;
  });

  const result = await agent.invoke(
    { messages: formattedMessages },
    config
  );

  // Extract the last AI message
  const lastMessage = result.messages[result.messages.length - 1];
  let content = (lastMessage?.content as string) || "";

  // Helper to extract JSON from strings
  const extractJson = (text: string) => {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  let finalResponse = {
    punny_response: "",
    tool_action: null as any
  };

  const parsed = extractJson(content);
  if (parsed) {
    finalResponse.punny_response = parsed.punny_response || content;
    finalResponse.tool_action = parsed.tool_action || null;
  } else {
    finalResponse.punny_response = content;
  }

  // Fallback: If agent called a tool but it's not in our explicit JSON response
  if (!finalResponse.tool_action && (lastMessage as any).tool_calls?.length > 0) {
    const toolCall = (lastMessage as any).tool_calls[0];
    finalResponse.tool_action = {
      name: toolCall.name,
      args: toolCall.args
    };
  }

  return NextResponse.json(finalResponse);
}