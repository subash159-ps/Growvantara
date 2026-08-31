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
      className={cn("size-11 object-contain", className)}
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
    <span className={cn("inline-flex items-center gap-1", className)}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col justify-center gap-0.5 rounded-md bg-[#1d4ed8] px-2 py-1 leading-tight">
        <span className="text-sm font-bold tracking-tight text-white">{brand.name}</span>
        {showTagline ? (
          <span className="text-[0.5rem] font-bold tracking-[0.12em] text-white uppercase">
            DIGITAL TECHNOLOGIES
          </span>
        ) : null}
      </span>
    </span>
  );
}
