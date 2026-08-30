import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Blog",
  description: `Marketing insights and updates from ${brand.name}.`,
};

const topics = [
  {
    title: "SEO & Search Marketing",
    description:
      "Learn how to improve your search visibility, attract qualified visitors, and build long-term organic growth.",
  },
  {
    title: "Paid Advertising",
    description:
      "Discover practical strategies for Google Ads, Meta Ads, campaign optimization, audience targeting, and improving ROAS.",
  },
  {
    title: "Content Marketing",
    description:
      "Get ideas and strategies for creating valuable content that attracts customers and builds your brand.",
  },
  {
    title: "Social Media Marketing",
    description:
      "Learn how to create engaging social campaigns, grow your audience, and turn social media activity into business results.",
  },
  {
    title: "Business Growth",
    description:
      "Explore digital strategies, marketing trends, analytics, and practical ideas for growing your business online.",
  },
];

// Reads live, admin-editable content — render per-request rather than at
// build time, so the build never depends on database reachability.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionHeading eyebrow="Blog" title="Marketing Insights" />
        <p className="mt-4 text-pretty text-muted-foreground">
          Practical guides, marketing insights, and the latest updates to help your business grow
          online.
        </p>
        <p className="mt-4 text-pretty text-muted-foreground">
          Explore expert tips and actionable strategies across SEO, paid advertising, social media,
          content marketing, website optimization, and digital growth.
        </p>
        <Reveal className="mx-auto mt-10 max-w-md">
          <Image
            src="/blog-hero.jpg"
            alt="Growvantra blog"
            width={612}
            height={344}
            priority
            sizes="(min-width: 448px) 448px, 100vw"
            className="h-auto w-full rounded-xl ring-1 ring-foreground/10"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="text-balance text-2xl font-bold tracking-tight">Latest Articles</h2>
        <div className="mt-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet — check back soon.</p>
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-balance text-2xl font-bold tracking-tight">Browse by Topic</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Card key={topic.title} className="h-full">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 text-center sm:px-6">
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Stay Ahead in Digital Marketing
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          New marketing trends and platforms appear constantly. Our blog helps you understand what
          matters, what works, and how to turn digital marketing opportunities into measurable
          business growth.
        </p>
        <p className="mt-4 text-lg font-semibold text-primary">Learn. Apply. Grow.</p>
      </section>
    </>
  );
}
