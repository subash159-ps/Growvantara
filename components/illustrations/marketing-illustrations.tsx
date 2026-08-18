import { useId } from "react";

/** Abstract analytics-dashboard graphic — bars trending up plus a highlight line. */
export function AnalyticsDashboardIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 220" className={className} role="img" aria-label="Campaign performance dashboard">
      <circle cx="20" cy="20" r="5" fill="var(--brand-accent)" opacity="0.8" />
      <circle cx="36" cy="20" r="5" fill="var(--primary)" opacity="0.8" />
      <circle cx="52" cy="20" r="5" fill="white" opacity="0.25" />

      <line x1="40" y1="190" x2="440" y2="190" stroke="white" strokeOpacity="0.12" />

      <rect x="60" y="120" width="44" height="70" rx="6" fill="var(--primary)" opacity="0.25" />
      <rect x="140" y="80" width="44" height="110" rx="6" fill="var(--primary)" opacity="0.25" />
      <rect x="220" y="100" width="44" height="90" rx="6" fill="var(--primary)" opacity="0.25" />
      <rect x="300" y="40" width="44" height="150" rx="6" fill="var(--primary)" opacity="0.25" />
      <rect x="380" y="60" width="44" height="130" rx="6" fill="var(--brand-accent)" />

      <polyline
        points="82,110 162,70 242,90 322,30 402,50"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [82, 110],
        [162, 70],
        [242, 90],
        [322, 30],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="4" fill="var(--navy)" stroke="var(--primary)" strokeWidth="2" />
      ))}
      <circle cx="402" cy="50" r="5" fill="var(--brand-accent)" />

      <text x="402" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--brand-accent)">
        +128%
      </text>
    </svg>
  );
}

/** Rising trend chart with a soft gradient fill, used as a small companion card graphic. */
export function GrowthChartIllustration({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 320 180" className={className} role="img" aria-label="Growth trend chart">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[40, 90, 140].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="var(--border)" strokeDasharray="4 4" />
      ))}

      <path
        d="M0,150 L60,120 L120,130 L180,80 L240,60 L300,20 L300,180 L0,180 Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M0,150 L60,120 L120,130 L180,80 L240,60 L300,20"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [0, 150],
        [60, 120],
        [120, 130],
        [180, 80],
        [240, 60],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="4" fill="var(--background)" stroke="var(--primary)" strokeWidth="2" />
      ))}
      <circle cx="300" cy="20" r="5" fill="var(--brand-accent)" />
    </svg>
  );
}
