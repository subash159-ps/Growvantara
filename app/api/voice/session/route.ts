import { NextResponse } from "next/server";
import { buildVoiceSystemPrompt } from "@/lib/voice/build-system-prompt";
import { getClientIp, isRateLimited } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`voice:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("[voice] OPENAI_API_KEY not set — voice agent unavailable.");
    return NextResponse.json({ error: "Voice agent is not configured." }, { status: 503 });
  }

  const instructions = await buildVoiceSystemPrompt();

  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expires_after: { anchor: "created_at", seconds: 600 },
      session: {
        type: "realtime",
        model: "gpt-realtime",
        instructions,
        audio: {
          output: { voice: "marin" },
          input: {
            transcription: { model: "gpt-4o-mini-transcribe" },
            turn_detection: { type: "server_vad" },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    console.error("[voice] Failed to mint realtime session:", response.status, await response.text());
    return NextResponse.json({ error: "Voice agent is temporarily unavailable." }, { status: 502 });
  }

  const data = await response.json();
  return NextResponse.json({ value: data.value, expiresAt: data.expires_at });
}
