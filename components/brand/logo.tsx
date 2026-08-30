import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/icon.png"
      alt={`${brand.name} logo`}
      width={512}
      height={512}
      priority
      className={cn("size-9 object-contain", className)}
    />
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
          <span className="text-[0.65rem] font-bold tracking-[0.15em] text-current/90 uppercase">
            DIGITAL TECHNOLOGIES
          </span>
        ) : null}
      </span>
    </span>
  );
}
