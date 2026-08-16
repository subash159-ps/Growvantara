"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonials";
import type { Testimonial } from "@/app/generated/prisma/client";

export function TestimonialFormDialog({
  testimonial,
  trigger,
}: {
  testimonial?: Testimonial;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const input = {
      clientName: formData.get("clientName"),
      clientTitle: formData.get("clientTitle"),
      company: formData.get("company"),
      quote: formData.get("quote"),
      avatarUrl: formData.get("avatarUrl"),
      published: formData.get("published") === "on",
    };

    try {
      if (testimonial) {
        await updateTestimonial(testimonial.id, input);
      } else {
        await createTestimonial(input);
      }
      toast.success(testimonial ? "Testimonial updated." : "Testimonial created.");
      setOpen(false);
    } catch {
      toast.error("Failed to save testimonial. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit testimonial" : "New testimonial"}</DialogTitle>
          <DialogDescription>
            Only publish testimonials from real clients who agreed to be featured.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client name</Label>
            <Input
              id="clientName"
              name="clientName"
              defaultValue={testimonial?.clientName}
              required
              maxLength={150}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clientTitle">Title</Label>
              <Input
                id="clientTitle"
                name="clientTitle"
                defaultValue={testimonial?.clientTitle ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" defaultValue={testimonial?.company ?? ""} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Textarea
              id="quote"
              name="quote"
              defaultValue={testimonial?.quote}
              required
              rows={3}
              maxLength={1000}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input id="avatarUrl" name="avatarUrl" defaultValue={testimonial?.avatarUrl ?? ""} />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={testimonial?.published ?? true}
              className="size-4 rounded border-input"
            />
            <Label htmlFor="published" className="font-normal">
              Published
            </Label>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
