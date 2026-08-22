import { z } from "zod";

const slug = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

export const serviceSchema = z.object({
  title: z.string().trim().min(1).max(150),
  slug,
  description: z.string().trim().min(1).max(2000),
  icon: z.string().trim().max(100).optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export const portfolioSchema = z.object({
  title: z.string().trim().min(1).max(150),
  slug,
  description: z.string().trim().min(1).max(2000),
  imageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  type: z.enum(["DEMO", "CONCEPT"]),
  category: z.string().trim().max(150).optional().or(z.literal("")),
  url: z.string().trim().max(500).optional().or(z.literal("")),
  published: z.coerce.boolean().default(true),
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug,
  content: z.string().trim().min(1).max(20000),
  excerpt: z.string().trim().max(500).optional().or(z.literal("")),
  coverImageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  published: z.coerce.boolean().default(false),
});

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(1).max(150),
  clientTitle: z.string().trim().max(150).optional().or(z.literal("")),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  quote: z.string().trim().min(1).max(1000),
  avatarUrl: z.string().trim().max(500).optional().or(z.literal("")),
  published: z.coerce.boolean().default(true),
});

export const leadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CONVERTED"]),
});

const emptyToUndefined = (val: unknown) => (val === "" || val == null ? undefined : val);

export const campaignSchema = z.object({
  name: z.string().trim().min(1).max(150),
  channel: z.enum(["GOOGLE_ADS", "META_ADS", "SEO", "SOCIAL_MEDIA", "EMAIL", "CONTENT", "OTHER"]),
  status: z.enum(["PLANNED", "ACTIVE", "PAUSED", "COMPLETED"]).default("PLANNED"),
  budget: z.preprocess(emptyToUndefined, z.coerce.number().nonnegative().optional()),
  spend: z.coerce.number().nonnegative().default(0),
  startDate: z.coerce.date(),
  endDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
  impressions: z.coerce.number().int().nonnegative().default(0),
  clicks: z.coerce.number().int().nonnegative().default(0),
  leadsGenerated: z.coerce.number().int().nonnegative().default(0),
  conversions: z.coerce.number().int().nonnegative().default(0),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  clientId: z.string().trim().min(1, "Client is required"),
  managerId: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
  published: z.coerce.boolean().default(false),
  publicSummary: z.string().trim().max(500).optional().or(z.literal("")),
});

export const clientSchema = z.object({
  name: z.string().trim().min(1).max(150),
  contactName: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  active: z.coerce.boolean().default(true),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
