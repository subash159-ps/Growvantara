"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useVoiceSession } from "@/components/voice-agent/use-voice-session";

const statusLabel: Record<string, string> = {
  idle: "Ready",
  connecting: "Connecting…",
  connected: "Connected",
  error: "Error",
};

export function VoiceAgentWidget() {
  const [open, setOpen] = useState(false);
  const { status, error, transcript, listening, speaking, start, stop, audioElRef } = useVoiceSession();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  function handleClose() {
    stop();
    setOpen(false);
  }

  return (
    <>
      <audio ref={audioElRef} autoPlay hidden />

      {!open && (
        <Button
          className="fixed bottom-6 right-6 z-[60] rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Mic /> Talk to Global Hood
        </Button>
      )}

      {open && (
        <Card className="fixed bottom-6 right-6 z-[60] w-[calc(100%-2rem)] max-w-sm">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              🎙️ Global Hood AI
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-normal",
                  status === "error"
                    ? "bg-destructive/10 text-destructive"
                    : status === "connected"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {speaking ? "Speaking…" : listening ? "Listening…" : statusLabel[status]}
              </span>
            </CardTitle>
            <Button variant="ghost" size="icon-sm" onClick={handleClose} aria-label="Close voice agent">
              <X />
            </Button>
          </CardHeader>

          <CardContent className="max-h-64 space-y-2 overflow-y-auto">
            {transcript.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {status === "connected" ? "Say hello to get started." : "Start a conversation to talk with our AI receptionist."}
              </p>
            ) : (
              transcript.map((entry) => (
                <div
                  key={`${entry.role}-${entry.id}`}
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-1.5 text-sm",
                    entry.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "ml-auto bg-primary/10 text-foreground",
                  )}
                >
                  {entry.text}
                </div>
              ))
            )}
          </CardContent>

          <CardFooter>
            {status === "connected" || status === "connecting" ? (
              <Button variant="outline" className="w-full" onClick={stop} disabled={status === "connecting"}>
                {status === "connecting" ? "Connecting…" : "End conversation"}
              </Button>
            ) : (
              <Button className="w-full" onClick={start}>
                {status === "error" ? "Try again" : "Start conversation"}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
