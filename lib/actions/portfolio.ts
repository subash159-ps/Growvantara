"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { portfolioSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function createPortfolioItem(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = portfolioSchema.parse(input);
  const item = await prisma.portfolio.create({ data });
  logAdminAction(session.user.id, "portfolio.create", item.id);
  revalidatePath("/admin/portfolio");
  revalidatePublic();
}

export async function updatePortfolioItem(id: string, input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = portfolioSchema.parse(input);
  await prisma.portfolio.update({ where: { id }, data });
  logAdminAction(session.user.id, "portfolio.update", id);
  revalidatePath("/admin/portfolio");
  revalidatePublic();
}

export async function deletePortfolioItem(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.portfolio.delete({ where: { id } });
  logAdminAction(session.user.id, "portfolio.delete", id);
  revalidatePath("/admin/portfolio");
  revalidatePublic();
}
