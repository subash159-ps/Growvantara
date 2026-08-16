"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serviceSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/contact");
}

export async function createService(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = serviceSchema.parse(input);
  const service = await prisma.service.create({ data });
  logAdminAction(session.user.id, "service.create", service.id);
  revalidatePath("/admin/services");
  revalidatePublic();
}

export async function updateService(id: string, input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = serviceSchema.parse(input);
  await prisma.service.update({ where: { id }, data });
  logAdminAction(session.user.id, "service.update", id);
  revalidatePath("/admin/services");
  revalidatePublic();
}

export async function deleteService(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.service.delete({ where: { id } });
  logAdminAction(session.user.id, "service.delete", id);
  revalidatePath("/admin/services");
  revalidatePublic();
}
