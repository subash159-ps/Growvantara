import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getServiceIcon } from "@/lib/service-icons";
import type { Portfolio } from "@/app/generated/prisma/client";

export function PortfolioCard({ item }: { item: Portfolio }) {
  const CategoryIcon = item.category ? getServiceIcon(item.category) : ImageIcon;

  return (
    <div className="group overflow-hidden rounded-xl border border-border transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 via-muted to-brand-accent/10">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <CategoryIcon className="size-9 text-foreground/20" />
          </div>
        )}
        <Badge
          variant={item.type === "DEMO" ? "default" : "secondary"}
          className="absolute left-3 top-3"
        >
          {item.type === "DEMO" ? "Demo Project" : "Concept Project"}
        </Badge>
      </div>
      <div className="p-5">
        <p className="font-semibold">{item.title}</p>
        {item.category ? (
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {item.category}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            View project
          </a>
        ) : null}
      </div>
    </div>
  );
}
