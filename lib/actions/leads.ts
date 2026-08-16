"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { leadStatusSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";

export async function updateLeadStatus(id: string, input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { status } = leadStatusSchema.parse(input);
  await prisma.lead.update({ where: { id }, data: { status } });
  logAdminAction(session.user.id, `lead.status.${status}`, id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
}
