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

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
