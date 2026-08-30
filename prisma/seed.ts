import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@globalhood.example";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "changeme123";

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Growvantra Admin",
      role: "ADMIN",
    },
  });
  console.log(`Seeded admin user: ${adminEmail} (password: ${adminPassword})`);

  const services = [
    {
      title: "Web Design & Development",
      slug: "web-design-development",
      description:
        "Fast, modern, conversion-focused websites built to represent your brand and turn visitors into leads.",
      order: 1,
    },
    {
      title: "SEO",
      slug: "seo",
      description:
        "Search engine optimization to help your business rank higher and get found by the customers already looking for you.",
      order: 2,
    },
    {
      title: "Social Media Marketing",
      slug: "social-media-marketing",
      description:
        "Content, strategy, and community management across the platforms where your customers spend their time.",
      order: 3,
    },
    {
      title: "Google Ads",
      slug: "google-ads",
      description:
        "Targeted search and display campaigns that put your business in front of high-intent customers.",
      order: 4,
    },
    {
      title: "Meta Ads",
      slug: "meta-ads",
      description:
        "Facebook and Instagram ad campaigns built to grow reach, engagement, and qualified leads.",
      order: 5,
    },
    {
      title: "Content Marketing",
      slug: "content-marketing",
      description:
        "Blog posts, guides, and on-site content that builds authority and feeds your SEO and social strategy.",
      order: 6,
    },
    {
      title: "Branding & Graphic Design",
      slug: "branding-graphic-design",
      description:
        "Logos, visual identity, and marketing collateral that make your business instantly recognizable.",
      order: 7,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`Seeded ${services.length} services.`);

  const managerEmail = process.env.SEED_MANAGER_EMAIL ?? "manager@globalhood.example";
  const managerPasswordHash = await bcrypt.hash(
    process.env.SEED_MANAGER_PASSWORD ?? "changeme123",
    12,
  );
  await prisma.user.upsert({
    where: { email: managerEmail },
    update: {},
    create: {
      email: managerEmail,
      passwordHash: managerPasswordHash,
      name: "Sample Campaign Manager",
      role: "CAMPAIGN_MANAGER",
    },
  });
  console.log(`Seeded campaign manager user: ${managerEmail}`);

  const client = await prisma.client.upsert({
    where: { id: "seed-sample-client" },
    update: {},
    create: {
      id: "seed-sample-client",
      name: "Sample Client Co.",
      contactName: "Jordan Lee",
      email: "jordan@sampleclient.example",
    },
  });
  console.log(`Seeded sample client: ${client.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
