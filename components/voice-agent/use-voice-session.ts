"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceStatus = "idle" | "connecting" | "connected" | "error";

export type TranscriptEntry = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type RealtimeEvent = {
  type: string;
  item_id?: string;
  delta?: string;
  transcript?: string;
  error?: { message?: string };
};

export function useVoiceSession() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const appendTranscriptDelta = useCallback((id: string, role: "user" | "assistant", delta: string) => {
    setTranscript((prev) => {
      const existing = prev.find((entry) => entry.id === id && entry.role === role);
      if (existing) {
        return prev.map((entry) =>
          entry.id === id && entry.role === role ? { ...entry, text: entry.text + delta } : entry,
        );
      }
      return [...prev, { id, role, text: delta }];
    });
  }, []);

  const setTranscriptFinal = useCallback((id: string, role: "user" | "assistant", text: string) => {
    setTranscript((prev) => {
      const existing = prev.find((entry) => entry.id === id && entry.role === role);
      if (existing) {
        return prev.map((entry) => (entry.id === id && entry.role === role ? { ...entry, text } : entry));
      }
      return [...prev, { id, role, text }];
    });
  }, []);

  const handleRealtimeEvent = useCallback(
    (event: RealtimeEvent) => {
      switch (event.type) {
        case "input_audio_buffer.speech_started":
          setListening(true);
          break;
        case "input_audio_buffer.speech_stopped":
          setListening(false);
          break;
        case "conversation.item.input_audio_transcription.delta":
          if (event.item_id && event.delta) appendTranscriptDelta(event.item_id, "user", event.delta);
          break;
        case "conversation.item.input_audio_transcription.completed":
          if (event.item_id && event.transcript) setTranscriptFinal(event.item_id, "user", event.transcript);
          break;
        case "response.output_audio_transcript.delta":
        case "response.audio_transcript.delta":
          if (event.item_id && event.delta) appendTranscriptDelta(event.item_id, "assistant", event.delta);
          setSpeaking(true);
          break;
        case "response.done":
          setSpeaking(false);
          break;
        case "error":
          setStatus("error");
          setError(event.error?.message ?? "The voice agent hit an unexpected error.");
          break;
        default:
          console.debug("[voice] unhandled event", event.type);
      }
    },
    [appendTranscriptDelta, setTranscriptFinal],
  );

  const stop = useCallback(() => {
    dcRef.current?.close();
    dcRef.current = null;

    pcRef.current?.getSenders().forEach((sender) => sender.track?.stop());
    pcRef.current?.close();
    pcRef.current = null;

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (audioElRef.current) audioElRef.current.srcObject = null;

    setStatus("idle");
    setListening(false);
    setSpeaking(false);
  }, []);

  const start = useCallback(async () => {
    setStatus("connecting");
    setError(null);
    setTranscript([]);

    try {
      const sessionRes = await fetch("/api/voice/session", { method: "POST" });
      if (!sessionRes.ok) {
        const body = await sessionRes.json().catch(() => ({}));
        if (sessionRes.status === 429) {
          throw new Error("Too many requests — please try again in a few minutes.");
        }
        if (sessionRes.status === 503) {
          throw new Error("Voice agent is not configured right now.");
        }
        throw new Error(body.error ?? "Couldn't start the voice agent.");
      }
      const { value: ephemeralKey } = await sessionRes.json();

      let micStream: MediaStream;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        throw new Error("Microphone access was denied. Please allow microphone access and try again.");
      }
      streamRef.current = micStream;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      pc.ontrack = (event) => {
        if (audioElRef.current) audioElRef.current.srcObject = event.streams[0];
      };

      micStream.getTracks().forEach((track) => pc.addTrack(track, micStream));

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.addEventListener("message", (event) => {
        try {
          handleRealtimeEvent(JSON.parse(event.data));
        } catch {
          console.debug("[voice] failed to parse realtime event", event.data);
        }
      });
      dc.addEventListener("open", () => setStatus("connected"));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const callRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      });

      if (!callRes.ok) {
        const detail = await callRes.text().catch(() => "");
        console.error("[voice] SDP exchange failed:", callRes.status, detail);
        throw new Error(`Couldn't connect to the voice agent (${callRes.status}). ${detail}`.trim());
      }

      const answerSdp = await callRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (err) {
      console.error("[voice] start() failed:", err);
      stop();
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't start the voice agent.");
    }
  }, [handleRealtimeEvent, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { status, error, transcript, listening, speaking, start, stop, audioElRef };
}
