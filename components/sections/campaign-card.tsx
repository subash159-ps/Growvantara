import { Badge } from "@/components/ui/badge";
import { channelLabels } from "@/lib/campaigns";
import type { Campaign } from "@/app/generated/prisma/client";

export function CampaignCard({ campaign }: { campaign: Pick<Campaign, "id" | "name" | "channel" | "publicSummary"> }) {
  return (
    <div className="rounded-xl border border-border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <Badge variant="outline">{channelLabels[campaign.channel]}</Badge>
      <p className="mt-3 font-semibold">{campaign.name}</p>
      {campaign.publicSummary ? (
        <p className="mt-2 text-sm text-muted-foreground">{campaign.publicSummary}</p>
      ) : null}
    </div>
  );
}
