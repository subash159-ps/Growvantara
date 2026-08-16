"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { testimonialSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";

function revalidatePublic() {
  revalidatePath("/");
}

export async function createTestimonial(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = testimonialSchema.parse(input);
  const testimonial = await prisma.testimonial.create({ data });
  logAdminAction(session.user.id, "testimonial.create", testimonial.id);
  revalidatePath("/admin/testimonials");
  revalidatePublic();
}

export async function updateTestimonial(id: string, input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = testimonialSchema.parse(input);
  await prisma.testimonial.update({ where: { id }, data });
  logAdminAction(session.user.id, "testimonial.update", id);
  revalidatePath("/admin/testimonials");
  revalidatePublic();
}

export async function deleteTestimonial(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.testimonial.delete({ where: { id } });
  logAdminAction(session.user.id, "testimonial.delete", id);
  revalidatePath("/admin/testimonials");
  revalidatePublic();
}
