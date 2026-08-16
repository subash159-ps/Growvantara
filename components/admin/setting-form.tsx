"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertSiteSetting } from "@/lib/actions/settings";

export function SettingForm() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await upsertSiteSetting({
        key: formData.get("key"),
        value: formData.get("value"),
      });
      toast.success("Setting saved.");
      form.reset();
    } catch {
      toast.error("Failed to save setting.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-2">
        <Label htmlFor="key">Key</Label>
        <Input id="key" name="key" placeholder="e.g. business_hours" required maxLength={100} />
      </div>
      <div className="flex-1 space-y-2">
        <Label htmlFor="value">Value</Label>
        <Input id="value" name="value" placeholder="e.g. Mon-Fri 9am-5pm" maxLength={2000} />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save setting"}
      </Button>
    </form>
  );
}
