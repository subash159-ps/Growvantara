import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-8", className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="url(#logo-gradient)" />
      <path
        d="M9 20.5V11.5L16 16L23 11.5V20.5"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--brand-accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showTagline = false,
}: {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight">{brand.name}</span>
        {showTagline ? (
          <span className="text-[0.65rem] font-medium tracking-[0.15em] text-current/70 uppercase">
            Digital Marketing
          </span>
        ) : null}
      </span>
    </span>
  );
}
