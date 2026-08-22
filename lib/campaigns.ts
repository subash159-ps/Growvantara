export const channelOptions = [
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "META_ADS", label: "Meta Ads" },
  { value: "SEO", label: "SEO" },
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "EMAIL", label: "Email" },
  { value: "CONTENT", label: "Content" },
  { value: "OTHER", label: "Other" },
] as const;

export const statusOptions = [
  { value: "PLANNED", label: "Planned" },
  { value: "ACTIVE", label: "Active" },
  { value: "PAUSED", label: "Paused" },
  { value: "COMPLETED", label: "Completed" },
] as const;

export const channelLabels: Record<string, string> = Object.fromEntries(
  channelOptions.map((o) => [o.value, o.label]),
);

export const statusLabels: Record<string, string> = Object.fromEntries(
  statusOptions.map((o) => [o.value, o.label]),
);
