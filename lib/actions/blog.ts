"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { blogPostSchema } from "@/lib/validation/admin";
import { logAdminAction } from "@/lib/security/audit-log";

function revalidatePublic(slug?: string) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPost(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = blogPostSchema.parse(input);
  const post = await prisma.blogPost.create({
    data: { ...data, publishedAt: data.published ? new Date() : null },
  });
  logAdminAction(session.user.id, "blog.create", post.id);
  revalidatePath("/admin/blog");
  revalidatePublic(data.slug);
}

export async function updateBlogPost(id: string, input: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = blogPostSchema.parse(input);
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published ? (existing?.publishedAt ?? new Date()) : null,
    },
  });
  logAdminAction(session.user.id, "blog.update", id);
  revalidatePath("/admin/blog");
  revalidatePublic(data.slug);
}

export async function deleteBlogPost(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const post = await prisma.blogPost.delete({ where: { id } });
  logAdminAction(session.user.id, "blog.delete", id);
  revalidatePath("/admin/blog");
  revalidatePublic(post.slug);
}
