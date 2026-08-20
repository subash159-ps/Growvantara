import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { VoiceAgentWidget } from "@/components/voice-agent/voice-agent-widget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <VoiceAgentWidget />
    </div>
  );
}
