import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

// Using Node.js runtime instead of Edge to fix streaming issues
// export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google(process.env.GEMINI_MODEL ?? "gemini-1.5-pro"),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("[RefactorBuddy API Error]", error.message || error);
    if (error.stack) console.error(error.stack);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process code review.", 
        details: error.message || "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
