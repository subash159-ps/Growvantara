import { SectionHeading } from "./section-heading";
import { CampaignCard } from "./campaign-card";
import { CampaignsChart } from "./campaigns-chart";
import type { Campaign } from "@/app/generated/prisma/client";

type PublicCampaign = Pick<Campaign, "id" | "name" | "channel" | "publicSummary">;

function countByChannel(campaigns: PublicCampaign[]) {
  const counts = new Map<string, number>();
  for (const campaign of campaigns) {
    counts.set(campaign.channel, (counts.get(campaign.channel) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([channel, count]) => ({ channel, count }))
    .sort((a, b) => b.count - a.count);
}

export function CampaignsSection({ campaigns }: { campaigns: PublicCampaign[] }) {
  if (campaigns.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Right now"
        title="What we're currently running"
        description="A look at active marketing campaigns we're driving for our clients."
      />

      <div className="mt-12">
        <CampaignsChart counts={countByChannel(campaigns)} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
