import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Blog",
  description: `Marketing insights and updates from ${brand.name}.`,
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          eyebrow="Blog"
          title="Marketing insights"
          description="Guides and updates on SEO, paid ads, content, and growing your business online."
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  {post.excerpt ? (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                  ) : null}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
