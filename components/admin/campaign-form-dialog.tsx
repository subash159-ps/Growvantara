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
import { createCampaign, updateCampaign } from "@/lib/actions/campaigns";
import type { Campaign, Client, User } from "@/app/generated/prisma/client";

const UNASSIGNED = "__unassigned__";

const channelOptions = [
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "META_ADS", label: "Meta Ads" },
  { value: "SEO", label: "SEO" },
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "EMAIL", label: "Email" },
  { value: "CONTENT", label: "Content" },
  { value: "OTHER", label: "Other" },
];

const statusOptions = [
  { value: "PLANNED", label: "Planned" },
  { value: "ACTIVE", label: "Active" },
  { value: "PAUSED", label: "Paused" },
  { value: "COMPLETED", label: "Completed" },
];

const channelItems = Object.fromEntries(channelOptions.map((o) => [o.value, o.label]));
const statusItems = Object.fromEntries(statusOptions.map((o) => [o.value, o.label]));

function toDateInputValue(date?: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function CampaignFormDialog({
  campaign,
  clients,
  managers,
  canReassign,
  trigger,
}: {
  campaign?: Campaign & {
    client?: { id: string; name: string };
    manager?: { id: string; name: string } | null;
  };
  clients: Pick<Client, "id" | "name">[];
  managers: Pick<User, "id" | "name">[];
  canReassign: boolean;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<string>(campaign?.channel ?? "GOOGLE_ADS");
  const [status, setStatus] = useState<string>(campaign?.status ?? "PLANNED");
  const [clientId, setClientId] = useState<string>(campaign?.client?.id ?? clients[0]?.id ?? "");
  const [managerId, setManagerId] = useState<string>(campaign?.manager?.id ?? UNASSIGNED);
  const [submitting, setSubmitting] = useState(false);

  const clientItems = Object.fromEntries(clients.map((c) => [c.id, c.name]));
  const managerItems: Record<string, string> = { [UNASSIGNED]: "Unassigned" };
  for (const m of managers) managerItems[m.id] = m.name;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const input = {
      name: formData.get("name"),
      channel,
      status,
      budget: formData.get("budget"),
      spend: formData.get("spend"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      impressions: formData.get("impressions"),
      clicks: formData.get("clicks"),
      leadsGenerated: formData.get("leadsGenerated"),
      conversions: formData.get("conversions"),
      notes: formData.get("notes"),
      clientId,
      managerId: managerId === UNASSIGNED ? "" : managerId,
    };

    try {
      if (campaign) {
        await updateCampaign(campaign.id, input);
      } else {
        await createCampaign(input);
      }
      toast.success(campaign ? "Campaign updated." : "Campaign created.");
      setOpen(false);
    } catch {
      toast.error("Failed to save campaign. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{campaign ? "Edit campaign" : "New campaign"}</DialogTitle>
          <DialogDescription>
            Track spend and performance for a marketing campaign.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={campaign?.name} required maxLength={150} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Client</Label>
              {canReassign ? (
                <Select items={clientItems} value={clientId} onValueChange={(v) => setClientId(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="rounded-md border border-input px-3 py-2 text-sm text-muted-foreground">
                  {campaign?.client?.name ?? "—"}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Campaign manager</Label>
              {canReassign ? (
                <Select items={managerItems} value={managerId} onValueChange={(v) => setManagerId(v ?? UNASSIGNED)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="rounded-md border border-input px-3 py-2 text-sm text-muted-foreground">
                  {campaign?.manager?.name ?? "Unassigned"}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <Select items={channelItems} value={channel} onValueChange={(v) => setChannel(v ?? "GOOGLE_ADS")}>
                <SelectTrigger id="channel" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select items={statusItems} value={status} onValueChange={(v) => setStatus(v ?? "PLANNED")}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={toDateInputValue(campaign?.startDate)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={toDateInputValue(campaign?.endDate)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                min={0}
                step="0.01"
                defaultValue={campaign?.budget ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spend">Spend</Label>
              <Input
                id="spend"
                name="spend"
                type="number"
                min={0}
                step="0.01"
                defaultValue={campaign?.spend ?? 0}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="impressions">Impressions</Label>
              <Input
                id="impressions"
                name="impressions"
                type="number"
                min={0}
                defaultValue={campaign?.impressions ?? 0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clicks">Clicks</Label>
              <Input id="clicks" name="clicks" type="number" min={0} defaultValue={campaign?.clicks ?? 0} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="leadsGenerated">Leads generated</Label>
              <Input
                id="leadsGenerated"
                name="leadsGenerated"
                type="number"
                min={0}
                defaultValue={campaign?.leadsGenerated ?? 0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conversions">Conversions</Label>
              <Input
                id="conversions"
                name="conversions"
                type="number"
                min={0}
                defaultValue={campaign?.conversions ?? 0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={campaign?.notes ?? ""}
              rows={3}
              maxLength={2000}
            />
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
