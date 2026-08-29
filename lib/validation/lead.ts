import { z } from "zod";

// Indian mobile number: exactly 10 digits, starting 6-9.
// Any spaces/dashes and a leading +91 / 0 are stripped before checking.
const phoneField = z
  .string()
  .trim()
  .max(20)
  .refine((val) => {
    if (val === "") return true;
    const digits = val.replace(/[\s()-]/g, "").replace(/^(\+91|0)/, "");
    return /^[6-9]\d{9}$/.test(digits);
  }, "Enter a valid 10-digit mobile number")
  .optional()
  .or(z.literal(""));

// Accept URLs with or without a protocol (example.com or https://example.com).
const websiteField = z
  .string()
  .trim()
  .max(200)
  .refine((val) => {
    if (val === "") return true;
    try {
      new URL(/^https?:\/\//i.test(val) ? val : `https://${val}`);
      return /\.[a-z]{2,}$/i.test(val.replace(/\/.*$/, ""));
    } catch {
      return false;
    }
  }, "Enter a valid website URL")
  .optional()
  .or(z.literal(""));

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email").max(200),
  phone: phoneField,
  company: z.string().trim().max(150, "Company name is too long").optional().or(z.literal("")),
  website: websiteField,
  serviceInterest: z.string().trim().max(150).optional().or(z.literal("")),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details (at least 10 characters)")
    .max(4000, "Message is too long"),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;

/** Validate a raw payload and return flattened, first-message-per-field errors. */
export function validateLead(payload: unknown):
  | { success: true; data: LeadInput }
  | { success: false; errors: LeadFieldErrors } {
  const parsed = leadSchema.safeParse(payload);
  if (parsed.success) return { success: true, data: parsed.data };

  const flattened = z.flattenError(parsed.error).fieldErrors;
  const errors: LeadFieldErrors = {};
  for (const [key, messages] of Object.entries(flattened)) {
    if (messages && messages.length > 0) {
      errors[key as keyof LeadInput] = messages[0];
    }
  }
  return { success: false, errors };
}
