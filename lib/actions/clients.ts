"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { clientSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";
import { requireRole } from "@/lib/auth/permissions";

export async function createClient(input: unknown) {
  const session = await requireRole("SUPER_ADMIN", "ADMIN");
  const data = clientSchema.parse(input);
  const client = await prisma.client.create({ data });
  logAdminAction(session.user.id, "client.create", client.id);
  revalidatePath("/admin/clients");
}

export async function updateClient(id: string, input: unknown) {
  const session = await requireRole("SUPER_ADMIN", "ADMIN");
  const data = clientSchema.parse(input);
  await prisma.client.update({ where: { id }, data });
  logAdminAction(session.user.id, "client.update", id);
  revalidatePath("/admin/clients");
}

export async function deleteClient(id: string) {
  const session = await requireRole("SUPER_ADMIN", "ADMIN");
  const campaignCount = await prisma.campaign.count({ where: { clientId: id } });
  if (campaignCount > 0) {
    throw new Error(`Cannot delete client with ${campaignCount} linked campaign(s).`);
  }
  await prisma.client.delete({ where: { id } });
  logAdminAction(session.user.id, "client.delete", id);
  revalidatePath("/admin/clients");
}
