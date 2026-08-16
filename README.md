# Global Hood

Digital marketing agency website — public marketing pages plus a lightweight
admin CMS for leads, services, portfolio, blog, and testimonials. Built with
Next.js, TypeScript, Tailwind, Prisma, and PostgreSQL. See
[`.claude/skills/global-hood-website/SKILL.md`](.claude/skills/global-hood-website/SKILL.md)
for the full build roadmap and conventions.

## Local development

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (a local
   PostgreSQL instance) and `AUTH_SECRET` (`openssl rand -base64 32`).
2. Install dependencies and set up the database:

   ```bash
   npm install
   npx prisma migrate dev
   npx tsx prisma/seed.ts
   ```

   The seed script creates an admin user (`admin@globalhood.example` /
   `changeme123` by default — override with `SEED_ADMIN_EMAIL` /
   `SEED_ADMIN_PASSWORD`) and the 7 starter services.
3. Run the dev server:

   ```bash
   npm run dev
   ```

   Runs on port 3010 (fixed in `package.json`, to avoid clashing with other
   projects on 3000).

   Public site: [http://localhost:3010](http://localhost:3010)
   Admin: [http://localhost:3010/admin/login](http://localhost:3010/admin/login)

## Email

Lead notification emails use [Resend](https://resend.com). Without
`RESEND_API_KEY` set, the app logs to the console instead of sending —
useful for local development.

## Deploying

1. Push this repository to GitHub.
2. Import it into [Vercel](https://vercel.com/new) and set the environment
   variables from `.env.example` (pointing `DATABASE_URL` at a managed
   Postgres instance).
3. Run `npx prisma migrate deploy` against the production database (either
   locally with the production `DATABASE_URL`, or as a Vercel build/release
   step).
4. Point your production domain at the Vercel deployment.
