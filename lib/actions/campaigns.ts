"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { campaignSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";
import { requireSession, requireRole, isCampaignAdmin, canManageCampaign } from "@/lib/auth/permissions";

export async function createCampaign(input: unknown) {
  const session = await requireRole("SUPER_ADMIN", "ADMIN");
  const data = campaignSchema.parse(input);
  const campaign = await prisma.campaign.create({ data });
  logAdminAction(session.user.id, "campaign.create", campaign.id);
  revalidatePath("/admin/campaigns");
}

export async function updateCampaign(id: string, input: unknown) {
  const session = await requireSession();
  const existing = await prisma.campaign.findUnique({
    where: { id },
    select: { clientId: true, managerId: true },
  });
  if (!existing) throw new Error("Campaign not found");
  if (!canManageCampaign(session, existing)) {
    throw new Error("Forbidden: cannot manage this campaign");
  }

  const data = campaignSchema.parse(input);
  if (!isCampaignAdmin(session)) {
    // Defense in depth: a non-admin's UI never shows editable client/manager
    // controls, but a crafted request could still include different values.
    data.clientId = existing.clientId;
    data.managerId = existing.managerId ?? undefined;
  }

  await prisma.campaign.update({ where: { id }, data });
  logAdminAction(session.user.id, "campaign.update", id);
  revalidatePath("/admin/campaigns");
}

export async function deleteCampaign(id: string) {
  const session = await requireRole("SUPER_ADMIN", "ADMIN");
  await prisma.campaign.delete({ where: { id } });
  logAdminAction(session.user.id, "campaign.delete", id);
  revalidatePath("/admin/campaigns");
}
