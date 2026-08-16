import {
  Briefcase,
  Code2,
  type LucideIcon,
  Megaphone,
  MousePointerClick,
  Palette,
  PenTool,
  Search,
  Share2,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  "web-design-development": Code2,
  seo: Search,
  "social-media-marketing": Share2,
  "google-ads": MousePointerClick,
  "meta-ads": Megaphone,
  "content-marketing": PenTool,
  "branding-graphic-design": Palette,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Briefcase;
}
