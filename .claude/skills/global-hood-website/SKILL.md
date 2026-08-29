---
name: global-hood-website
description: Build and maintain the Global Hood website — a Next.js/TypeScript/Tailwind/Prisma/PostgreSQL digital marketing agency site with public marketing pages and a lightweight admin CMS for leads/services/portfolio/blog. Use whenever working on Global Hood's project setup, database schema, contact-form lead pipeline, admin dashboard, public pages (Home/About/Services/Portfolio/Case Studies/Blog/Contact), SEO, security hardening, or deployment. Invoke with an argument naming the step ("step 1"/"brand", "step 2"/"ui", "step 3"/"database", "step 4"/"contact form", "step 5"/"admin", "step 6"/"seo", "step 7"/"security", "step 8"/"deploy") or no argument for a status check.
user-invocable: true
---

# Global Hood Website

Arguments passed: `$ARGUMENTS`

Global Hood is a digital marketing agency. Version 1 of its website exists to
get clients: attract visitors, build trust, show services and results,
generate leads, and convert those leads into clients. It is new — it has no
real client work yet, so the portfolio must never contain fake case studies;
everything shown is labeled as a demo or concept project until real client
results exist. This skill is the single source of truth for the stack,
schema, and conventions — every step below must stay consistent with it so
the eight phases compose into one coherent app instead of eight unrelated
ones.

## Tech stack (fixed — do not substitute)

- **Framework**: Next.js, App Router, TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Next.js API routes
- **ORM / DB**: Prisma + PostgreSQL
- **Auth**: Auth.js (NextAuth) / secure server-side sessions
- **Validation**: zod schemas shared between client forms and API routes
- **Email**: Resend or SMTP, for lead-notification emails to the Global Hood team
- **Images/media**: Cloudflare R2 or AWS S3
- **Hosting**: Vercel, with managed PostgreSQL; source on GitHub

## Local database connection

For local development, assume:

```
DATABASE_URL="postgresql://postgres:1585@localhost:5432/global_hood"
```

This is the confirmed local default (standard `postgres` user, default host/
port, database `global_hood`, password `1585`). Put it in `.env` (never
commit `.env`; confirm it's in `.gitignore`). If the user's actual local
setup differs, ask rather than assuming further.

## Directory conventions

```
app/
  page.tsx                # Home
  about/
  services/
  portfolio/
  case-studies/
  blog/
  contact/
  admin/
    login/
    dashboard/
    leads/
    services/
    portfolio/
    blog/
    settings/
  api/
    leads/
    contact/
    newsletter/
components/
  ui/                      # shadcn/ui primitives
  navbar/
  footer/
  hero/
  sections/
lib/
  db/                      # Prisma client singleton
  auth/
  validation/              # zod schemas
  email/
prisma/
  schema.prisma
public/
```

## Dispatch on arguments

Match `$ARGUMENTS` (case-insensitive) against the step name or number below
and execute only that section. If it matches none of them, treat it as a
free-form request and use the relevant sections as reference. If `$ARGUMENTS`
is empty, do the **Status check** first, then ask the user which step to run
next.

### Status check (no arguments)

1. Check whether `package.json`, `prisma/schema.prisma`, `app/admin/`, and
   the nine public pages/routes exist.
2. Report which of the eight steps below appear done, partially done, or not
   started, based on what's actually on disk (don't trust prior
   conversation — verify against the filesystem).
3. Recommend the next step.

### Step 1 / "brand" — Brand

Define, and record in `lib/` or a shared constants file for reuse across the
site:

- Agency name: **Global Hood**
- Logo
- Tagline
- Colors (wire into `tailwind.config`)
- Typography (wire into `tailwind.config`)
- Brand style / voice

### Step 2 / "ui" — Website UI

Build the nine v1 public pages: **Home, About, Services, Portfolio, Case
Studies, Blog, Contact, Privacy Policy, Terms & Conditions**. No other public
pages yet — resist adding more until v1 is solid.

Home page sections, in order: **Hero, Services, Why Global Hood, Our
Process, Portfolio, Case Studies, Testimonials, FAQ, Contact CTA**.

Hero copy to use as the starting point:

> **Grow Your Business With Smarter Digital Marketing**
> Global Hood helps businesses build their online presence, attract
> customers, and grow through digital marketing strategies.
>
> Buttons: `[Get Free Consultation]` `[Explore Services]`

Services page: start with exactly these 7 — **Web Design & Development,
SEO, Social Media Marketing, Google Ads, Meta Ads, Content Marketing,
Branding & Graphic Design**. Do not add specialized services yet; that's
explicitly a later phase.

Portfolio page ("Our Work"): since Global Hood has no client projects yet,
never invent client case studies. Populate it with demo websites, personal
projects, sample landing pages, sample social campaigns, sample SEO
projects, and concept branding projects — each one clearly labeled
**"Demo Project"** or **"Concept Project"** in the UI, not just in a CMS
field that might not render.

### Step 3 / "database" — Database schema

Design `prisma/schema.prisma` with these v1 models only (adjust field names
to fit but keep the relations and intent). Do **not** build the v2 models
listed below yet — they're deliberately deferred:

- **User** — `id, email (unique), passwordHash, name, role, createdAt` (admin/staff accounts)
- **Service** — `id, title, slug (unique), description, icon?, order, published (Boolean), createdAt`
- **Lead** — `id, name, email, phone?, company?, website?, serviceInterest?, budget?, message, status (enum: NEW/CONTACTED/QUALIFIED/CONVERTED), createdAt`
- **Portfolio** — `id, title, slug (unique), description, imageUrl?, type (enum: DEMO/CONCEPT), category?, url?, published (Boolean), createdAt`
- **BlogPost** — `id, title, slug (unique), content, excerpt?, coverImageUrl?, published (Boolean), publishedAt?, createdAt`
- **Testimonial** — `id, clientName, clientTitle?, company?, quote, avatarUrl?, published (Boolean), createdAt`
- **SiteSetting** — `id, key (unique), value` (simple key/value store for global site config)

Deferred to v2 — do not build until asked: `lead_notes, lead_activities,
media, case_studies, audit_logs, roles, permissions`.

Run `npx prisma migrate dev --name init` against the local database above.
Seed a first admin `User` via `prisma/seed.ts` (hash the password with
bcrypt — never store plaintext).

### Step 4 / "contact form" — Contact form → lead pipeline

Implement the flow: **Visitor → Contact Form → Next.js API → Validation →
PostgreSQL → Admin Dashboard**.

1. Build the "Get a Free Consultation" form (on `/contact` and as the Home
   page's Contact CTA) with fields: `Name*, Email*, Phone, Company, Website,
   What service do you need?, Budget, Message`, submit button `[Send
   Enquiry]`.
2. `app/api/contact/route.ts` (or `app/api/leads/route.ts`) validates the
   payload with a zod schema from `lib/validation/`, then inserts a `Lead`
   row via Prisma with `status: NEW`.
3. On successful insert, send an email notification to the Global Hood team
   via `lib/email/` (Resend or SMTP) — do not block the response on email
   delivery failing; log and continue.
4. Never trust client-side validation alone — the API route must re-validate
   everything server-side.

### Step 5 / "admin" — Admin dashboard

1. Configure Auth.js (`lib/auth/`) with a credentials/session-based provider:
   look up `User` by email, compare password with bcrypt, return the session
   user on success.
2. Protect every `/admin/*` route except `/admin/login` via middleware;
   redirect unauthenticated requests to `/admin/login`.
3. Build `app/admin/login/page.tsx` and an admin layout/nav shell covering:
   **Dashboard, Leads, Services, Portfolio, Blog, Testimonials, Settings**.
4. **Dashboard** shows lead counts by status: Total Leads, New, Contacted,
   Qualified, Converted — computed live from the `Lead` table, not
   hardcoded.
5. **Leads** page: list all leads with status, allow updating status
   (NEW → CONTACTED → QUALIFIED → CONVERTED).
6. **Services, Portfolio, Blog, Testimonials** pages: CRUD for each entity,
   using server actions or `app/api/admin/**` route handlers validated with
   the zod schemas from `lib/validation/`.
7. Never expose `passwordHash` or other sensitive fields in any response
   sent to the client.

### Step 6 / "seo" — SEO

Add: per-page metadata (title/description/OG tags), `sitemap.xml`,
`robots.txt`, JSON-LD schema markup (Organization/LocalBusiness on Home,
Article on blog posts), Open Graph images, Google Search Console
verification, and analytics (e.g. Google Analytics/Vercel Analytics).

### Step 7 / "security" — Security hardening

Add: secure Auth.js sessions, bcrypt password hashing, RBAC for admin roles,
rate limiting on `/api/contact` and `/api/admin/login`, zod input validation
on every API route (not just forms), CSRF protection, XSS protection
(sanitize any rendered rich text, e.g. blog content), secure/httpOnly
cookies, and audit logging for admin actions on leads/content.

### Step 8 / "deploy" — Deploy

1. Push to GitHub.
2. Connect the repo to Vercel; configure environment variables there
   (`DATABASE_URL` pointed at the managed Postgres instance, email provider
   keys, auth secret, storage credentials) — never hardcode production
   secrets.
3. Provision managed PostgreSQL and run `npx prisma migrate deploy` against
   it.
4. Point the production domain (growvantara.com) at the Vercel deployment.
