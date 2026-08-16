"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/security/audit-log";

const settingSchema = z.object({
  key: z.string().trim().min(1).max(100),
  value: z.string().trim().max(2000),
});

export async function upsertSiteSetting(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { key, value } = settingSchema.parse(input);
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  logAdminAction(session.user.id, "setting.upsert", key);
  revalidatePath("/admin/settings");
}

export async function deleteSiteSetting(key: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.siteSetting.delete({ where: { key } });
  logAdminAction(session.user.id, "setting.delete", key);
  revalidatePath("/admin/settings");
}
