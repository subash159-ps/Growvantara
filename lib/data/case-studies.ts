// Global Hood has no real client case studies yet. These are clearly-labeled
// concept case studies that demonstrate our approach, not real client results.
// Replace with real, verified client outcomes as they become available.

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  challenge: string;
  approach: string;
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "local-service-business-seo",
    title: "Ranking a Local Service Business on Google",
    category: "SEO",
    challenge:
      "A local service business is invisible on Google search results for the terms its customers actually use.",
    approach:
      "Technical SEO audit, local listing optimization, on-page content targeting service + location keywords, and a review-generation process.",
    result:
      "Projected outcome: top-3 local pack rankings for core service terms within 3-4 months, based on our standard local SEO approach.",
  },
  {
    slug: "ecommerce-meta-ads-launch",
    title: "Launching a New E-Commerce Brand on Meta Ads",
    category: "Meta Ads",
    challenge:
      "A new e-commerce brand needs to generate its first sales and build a retargeting audience from zero.",
    approach:
      "Creative testing across a cold-audience funnel, pixel/event setup, and a retargeting sequence for cart abandoners and engaged visitors.",
    result:
      "Projected outcome: profitable cost-per-purchase within the first 60 days, based on our standard paid-social launch playbook.",
  },
  {
    slug: "b2b-content-lead-gen",
    title: "Building a B2B Lead Funnel With Content",
    category: "Content Marketing",
    challenge:
      "A B2B company relies entirely on referrals and has no inbound lead pipeline.",
    approach:
      "SEO-driven content calendar, gated resources, and a nurture sequence connected to a redesigned contact/consultation flow.",
    result:
      "Projected outcome: a steady stream of inbound consultation requests within 2 quarters, based on our standard content strategy.",
  },
];
