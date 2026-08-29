"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateLead, type LeadFieldErrors } from "@/lib/validation/lead";
import type { Service } from "@/app/generated/prisma/client";

const budgets = [
  "Under ₹25,000/mo",
  "₹25,000 - ₹75,000/mo",
  "₹75,000 - ₹2,00,000/mo",
  "₹2,00,000+/mo",
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactForm({ services }: { services: Service[] }) {
  const searchParams = useSearchParams();
  const [serviceInterest, setServiceInterest] = useState(searchParams.get("service") ?? "");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<LeadFieldErrors>({});

  function buildPayload(form: HTMLFormElement) {
    const formData = new FormData(form);
    return {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      website: String(formData.get("website") ?? ""),
      serviceInterest,
      budget,
      message: String(formData.get("message") ?? ""),
      company_website: String(formData.get("company_website") ?? ""),
    };
  }

  function clearError(field: keyof LeadFieldErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = buildPayload(form);

    const result = validateLead(payload);
    if (!result.success) {
      setErrors(result.errors);
      const firstField = Object.keys(result.errors)[0];
      if (firstField) {
        form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      }
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      form.reset();
      setServiceInterest("");
      setBudget("");
      toast.success("Thanks! We'll be in touch shortly.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
        <p className="text-lg font-semibold">Thanks for reaching out!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We received your request and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real users, catches simple bots. */}
      <div className="hidden" aria-hidden>
        <Label htmlFor="company_website">Website</Label>
        <Input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            maxLength={120}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            maxLength={200}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearError("email")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onChange={() => clearError("phone")}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            maxLength={150}
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            onChange={() => clearError("company")}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          placeholder="https://"
          maxLength={200}
          autoComplete="url"
          aria-invalid={!!errors.website}
          aria-describedby={errors.website ? "website-error" : undefined}
          onChange={() => clearError("website")}
        />
        <FieldError id="website-error" message={errors.website} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="service">What service do you need?</Label>
          <Select
            value={serviceInterest}
            onValueChange={(value) => {
              setServiceInterest(value ?? "");
              clearError("serviceInterest");
            }}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.title}>
                  {service.title}
                </SelectItem>
              ))}
              <SelectItem value="Something else">Something else</SelectItem>
            </SelectContent>
          </Select>
          <FieldError id="service-error" message={errors.serviceInterest} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <Select
            value={budget}
            onValueChange={(value) => {
              setBudget(value ?? "");
              clearError("budget");
            }}
          >
            <SelectTrigger id="budget" className="w-full">
              <SelectValue placeholder="Select a budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="budget-error" message={errors.budget} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          maxLength={4000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() => clearError("message")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
