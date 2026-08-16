"use client";

import { useState, type FormEvent } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPortfolioItem, updatePortfolioItem } from "@/lib/actions/portfolio";
import type { Portfolio } from "@/app/generated/prisma/client";

export function PortfolioFormDialog({
  item,
  trigger,
}: {
  item?: Portfolio;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>(item?.type ?? "DEMO");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const input = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      category: formData.get("category"),
      url: formData.get("url"),
      type,
      published: formData.get("published") === "on",
    };

    try {
      if (item) {
        await updatePortfolioItem(item.id, input);
      } else {
        await createPortfolioItem(input);
      }
      toast.success(item ? "Project updated." : "Project created.");
      setOpen(false);
    } catch {
      toast.error("Failed to save project. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit project" : "New project"}</DialogTitle>
          <DialogDescription>
            Real client projects should be marked as neither type is a real
            case study — use Demo or Concept until a verified client result
            exists.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={item?.title} required maxLength={150} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={item?.slug} required maxLength={200} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={item?.description}
              required
              rows={3}
              maxLength={2000}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={item?.category ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v ?? "DEMO")}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEMO">Demo Project</SelectItem>
                  <SelectItem value="CONCEPT">Concept Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={item?.imageUrl ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Project URL</Label>
            <Input id="url" name="url" defaultValue={item?.url ?? ""} />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={item?.published ?? true}
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
