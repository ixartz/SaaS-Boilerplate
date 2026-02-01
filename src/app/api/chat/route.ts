import { ChatOllama } from "@langchain/ollama";
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
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const systemPrompt = `
    You are the "Cursor" for video editing. Your goal is to help the user edit their video.
    
    CURRENT VIDEO STATE:
    - Duration: ${videoContext.duration.toFixed(2)}s
    - Playhead Position: ${videoContext.currentTime.toFixed(2)}s
    - Dimensions: ${videoContext.width}x${videoContext.height}
    
    TOOLS AVAILABLE:
    - trimVideo({ start, end }): Use this for trimming.
    - cropVideo({ aspectRatio }): aspectRatio can be "16:9", "1:1", "9:16".
    - rotateVideo({ degrees }): degrees can be 90, 180, 270.
    - changeSpeed({ multiplier }): multiplier can be 0.5, 2.0, etc.
    - adjustVolume({ level }): level from 0 to 1.0.
    - seekTo({ time }): jump to a time in the video.
    - undo(): undo last edit.

    RULES:
    1. If you need to perform an action, CALL THE APPROPRIATE TOOL immediately.
    2. After calling a tool (or if just chatting), you MUST respond with a JSON object in this EXACT format:
       { "punny_response": "Your playful response here", "tool_action": { "name": "trimVideo", "args": { "start": 0, "end": 5 } } }
    3. You MUST use the exact tool names listed above.
    4. You MUST ALWAYS RESPOND WITH VALID JSON. No extra text before or after the JSON.
  `;

  // Create agent
  const agent = createReactAgent({
    llm: model,
    tools,
    checkpointSaver: checkpointer,
    messageModifier: systemPrompt,
  });

  // Run agent
  const config = {
    configurable: { thread_id: "default-thread" }, 
  };

  // Convert input messages to LangChain format if they aren't already
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

  // Final Response Placeholder
  let finalResponse = {
    punny_response: "I'm ready to help you edit your video!",
    tool_action: null as any
  };

  /**
   * GREEDY JSON EXTRACTION
   * Llama 3.2 often outputs mixed text and JSON. 
   * A greedy approach (first { to last }) is more robust for nested structures.
   */
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');
  let parsedJson = null;

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonCandidate = content.substring(firstBrace, lastBrace + 1);
    try {
      parsedJson = JSON.parse(jsonCandidate);
    } catch (e) {
      // If full greedy fails, try the multi-block fallback
      const jsonBlocks = content.match(/\{[\s\S]*?\}/g) || [];
      for (const block of jsonBlocks) {
        try {
          const potentiallyValid = JSON.parse(block);
          if (potentiallyValid.punny_response || potentiallyValid.tool_action || (potentiallyValid.name && potentiallyValid.args)) {
            parsedJson = potentiallyValid;
            break;
          }
        } catch (innerE) {
          continue;
        }
      }
    }
  }

  if (parsedJson) {
    // Normalize format 2 (name/args) to format 1 (tool_action)
    if (parsedJson.name && parsedJson.args && !parsedJson.tool_action) {
      parsedJson = {
        punny_response: parsedJson.punny_response || "I've prepared that edit for you!",
        tool_action: { name: parsedJson.name, args: parsedJson.args }
      };
    }
    
    // Handle nested JSON inside punny_response (common quirk)
    if (typeof parsedJson.punny_response === 'string' && parsedJson.punny_response.includes('{')) {
       try {
         const nested = JSON.parse(parsedJson.punny_response.match(/\{[\s\S]*?\}/)?.[0] || '');
         if (nested.tool_action || (nested.name && nested.args)) {
            parsedJson.tool_action = nested.tool_action || { name: nested.name, args: nested.args };
            parsedJson.punny_response = "Got it! Let's get that edited.";
         }
       } catch (e) { /* ignore */ }
    }
    finalResponse = { ...finalResponse, ...parsedJson };
  } else {
    finalResponse.punny_response = content;
  }

  /**
   * ROBUST TOOL MAPPING
   * If the agent called a tool using the official LangGraph mechanism
   * but didn't include it in the JSON 'tool_action', we map it manually.
   */
  if (lastMessage && !finalResponse.tool_action && (lastMessage as any).tool_calls && (lastMessage as any).tool_calls.length > 0) {
    const toolCall = (lastMessage as any).tool_calls[0];
    finalResponse.tool_action = {
      name: toolCall.name,
      args: toolCall.args
    };
  }

  // Sanitize for JSON serializability (to avoid undefined or special types)
  const sanitized = JSON.parse(JSON.stringify(finalResponse));

  return NextResponse.json(sanitized);
}