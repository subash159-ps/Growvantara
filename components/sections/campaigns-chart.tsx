import { channelLabels } from "@/lib/campaigns";

type ChannelCount = { channel: string; count: number };

export function CampaignsChart({ counts }: { counts: ChannelCount[] }) {
  if (counts.length === 0) return null;

  // A single category is a headline number, not a bar chart — a one-bar
  // chart double-encodes the same value as both position and length.
  if (counts.length === 1) {
    const [only] = counts;
    return (
      <div className="mx-auto mb-10 max-w-md rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-3xl font-bold">{only.count}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          active {channelLabels[only.channel] ?? only.channel} campaign{only.count === 1 ? "" : "s"}
        </p>
      </div>
    );
  }

  const max = Math.max(...counts.map((c) => c.count));

  return (
    <div className="mx-auto mb-10 max-w-2xl rounded-xl border border-border bg-card p-6">
      <table className="sr-only">
        <caption>Published campaigns by channel</caption>
        <thead>
          <tr>
            <th scope="col">Channel</th>
            <th scope="col">Campaigns</th>
          </tr>
        </thead>
        <tbody>
          {counts.map((c) => (
            <tr key={c.channel}>
              <td>{channelLabels[c.channel] ?? c.channel}</td>
              <td>{c.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden className="space-y-3">
        {counts.map((c) => (
          <div
            key={c.channel}
            className="grid grid-cols-[7rem_1fr_2ch] items-center gap-3 rounded-md px-1 py-1 transition-colors hover:bg-muted/50 sm:grid-cols-[9rem_1fr_2ch]"
          >
            <span className="truncate text-sm text-muted-foreground">
              {channelLabels[c.channel] ?? c.channel}
            </span>
            <span className="h-4 rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-brand-accent"
                style={{ width: `${Math.max((c.count / max) * 100, 6)}%` }}
              />
            </span>
            <span className="text-right text-sm font-semibold tabular-nums">{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
