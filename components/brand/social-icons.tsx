import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.53 4.78 5.83V21h-4v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V21H9z" />
    </svg>
  );
}

export function InstagramBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <radialGradient id="ig-badge" cx="0.3" cy="1.05" r="1.3">
          <stop offset="0" stopColor="#FED576" />
          <stop offset="0.25" stopColor="#F47133" />
          <stop offset="0.5" stopColor="#BC3081" />
          <stop offset="0.78" stopColor="#4C63D2" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-badge)" />
      <rect x="5" y="5" width="14" height="14" rx="4.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.2" cy="7.8" r="1.15" fill="#fff" />
    </svg>
  );
}

export function LinkedinBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M8.34 18.34V9.75H5.5v8.59h2.84zM6.92 8.58c.99 0 1.61-.66 1.61-1.48-.02-.84-.62-1.48-1.59-1.48-.97 0-1.61.64-1.61 1.48 0 .82.62 1.48 1.57 1.48h.02zM10 18.34h2.84v-4.8c0-.26.02-.51.1-.69.2-.51.67-1.04 1.46-1.04 1.03 0 1.44.78 1.44 1.93v4.6h2.84v-4.93c0-2.62-1.4-3.84-3.27-3.84-1.53 0-2.2.85-2.58 1.44h.02V9.75H10c.04.8 0 8.59 0 8.59z"
      />
    </svg>
  );
}

export function FacebookBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M15.12 12.75l.53-3.44h-3.3V7.08c0-.94.46-1.86 1.94-1.86h1.5V2.29S16.06 2 14.76 2c-2.71 0-4.48 1.64-4.48 4.62v2.69H7.26v3.44h3.02V21h3.72v-8.25z"
      />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-4.53 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.2 3.36 5.32 4.58.74.29 1.32.46 1.77.59.74.24 1.42.2 1.96.12.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.15-.21.31-.81 1.01-1 1.22-.18.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54-.18-.01-.39-.01-.6-.01Z" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.3C16.24 4.27 15.36 4.2 14.33 4.2c-2.15 0-3.63 1.31-3.63 3.72V10.5H8.2v3h2.5V21h2.8Z" />
    </svg>
  );
}
