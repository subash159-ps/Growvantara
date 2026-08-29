import { Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/brand/social-icons";
import { brand } from "@/lib/brand";

const waNumber = brand.phone.replace(/\D/g, "");
const telNumber = brand.phone.replace(/\s/g, "");

/**
 * Fixed WhatsApp + phone quick-contact rail, pinned to the left edge on every
 * public page. Sits above the voice-agent button (z-50 vs z-60) and clears it
 * vertically by anchoring to the middle of the viewport.
 */
export function ContactFloat() {
  return (
    <div className="fixed left-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <WhatsappIcon className="size-6" />
        <span className="sr-only">WhatsApp</span>
      </a>
      <a
        href={`tel:${telNumber}`}
        aria-label={`Call ${brand.phone}`}
        title={`Call ${brand.phone}`}
        className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Phone className="size-5" />
        <span className="sr-only">Call us</span>
      </a>
    </div>
  );
}
