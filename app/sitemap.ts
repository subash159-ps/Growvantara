import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/case-studies",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-conditions",
];

// Reads live, admin-editable content — render per-request rather than at
// build time, so the build never depends on database reachability.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, publishedAt: true },
  });

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ?? new Date(),
    })),
  ];
}
