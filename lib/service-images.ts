// Photo shown on each service card in the "What we do" section.
// Keyed by service slug — mirrors the icon map in `service-icons.ts`.
const serviceImages: Record<string, string> = {
  "web-design-development": "/services/web-design-development.jpg",
  seo: "/services/seo.jpg",
  "social-media-marketing": "/services/social-media-marketing.jpg",
  "google-ads": "/services/google-ads.jpg",
  "meta-ads": "/services/meta-ads.jpg",
  "content-marketing": "/services/content-marketing.jpg",
  "branding-graphic-design": "/services/branding-graphic-design.jpg",
};

export function getServiceImage(slug: string): string | null {
  return serviceImages[slug] ?? null;
}
