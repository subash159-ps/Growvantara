# Global Hood — Real-Time AI Voice Agent Proposal

Yes. You can add a real-time AI voice agent to your Global Hood website. I
would recommend a speech-to-speech agent rather than building separate
speech-to-text → LLM → text-to-speech steps.

I tried opening your deployed site, but it currently returns a 500 server
error, so I can't inspect its actual frontend structure yet.

For a Vercel-based Global Hood site, a good architecture is:

```
Website → Voice button → Realtime Voice Agent → AI → Tools → PostgreSQL
```

Vercel currently documents realtime voice agents using models such as
GPT-Realtime-2.1, which support speech-to-speech interaction, tool use, and
realtime conversations.

## What your Global Hood voice agent could do

For example, a visitor clicks:

> 🎙️ Talk to Global Hood

Then says:

> "I need a website for my digital marketing agency. How much will it cost?"

The agent could respond naturally:

> "Absolutely. Global Hood can help with that. We offer website
> development, SEO, social media marketing and advertising. May I know
> what type of business you have?"

It could also:

- Answer questions about Global Hood services
- Explain website-development packages
- Explain SEO and digital-marketing services
- Collect name, phone, email and requirements
- Qualify leads
- Schedule a consultation
- Store leads in PostgreSQL
- Send lead information to your admin dashboard
- Transfer/contact a human
- Remember the conversation during the session
- Support English and potentially Telugu/Hindi
- Show a text transcript alongside the voice conversation

## Recommended architecture

Since your website is already deployed on Vercel, I recommend:

```
                   GLOBAL HOOD WEBSITE
                           │
                           ▼
                  ┌─────────────────┐
                  │  🎙️ Voice Agent │
                  │     Button      │
                  └────────┬────────┘
                           │
                           ▼
                 Realtime Voice Model
                           │
                    Speech ↔ Speech
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
        AI Conversation             Agent Tools
                                      │
                    ┌─────────────────┼───────────────┐
                    │                 │               │
                    ▼                 ▼               ▼
                Services          Lead Form       Appointment
                    │                 │               │
                    └─────────────────┼───────────────┘
                                      ▼
                                PostgreSQL
                                      │
                                      ▼
                              Admin Dashboard
```

Vercel's AI SDK is designed for AI applications deployed on Vercel and
supports streaming, agents and multiple model providers.

## Step 1 — Add the voice button

I would put a floating button in the bottom-right corner:

```
                         Global Hood
                  Digital Marketing Agency


                         [ Website ]






                                      ┌─────────────┐
                                      │ 🎙️ Talk to  │
                                      │ Global Hood  │
                                      └─────────────┘
```

When clicked:

```
┌───────────────────────────────────┐
│       🎙️ Global Hood AI           │
│                                   │
│        ● Listening...             │
│                                   │
│     "How can we help you?"        │
│                                   │
│        🔴 End Conversation        │
│                                   │
│  ─────────────────────────────    │
│  Transcript                       │
│                                   │
│  You: I need SEO services         │
│  AI: Sure! Tell me about...       │
└───────────────────────────────────┘
```

## Step 2 — Create the realtime API endpoint

For your Vercel application, you can create something like:

```
app/
 ├── api/
 │    └── voice/
 │         └── route.ts
 ├── components/
 │    └── VoiceAgent.tsx
 └── page.tsx
```

The backend should generate a short-lived realtime session/token.

Vercel's current realtime example uses a server endpoint that obtains a
realtime token and URL rather than exposing your permanent API credentials
to the browser.

Conceptually:

```
Browser
   │
   │ request voice session
   ▼
/api/voice
   │
   │ server-side credentials
   ▼
Realtime API
   │
   │ temporary session
   ▼
Browser
```

Do not put your permanent OpenAI API key inside React/Next.js client code.

## Step 3 — Create the Voice Agent

The agent should have a strong system instruction.

For Global Hood, something like:

```
You are the AI voice assistant for Global Hood,
a digital marketing agency.

Your responsibilities:

1. Answer questions about Global Hood.
2. Explain our digital marketing services.
3. Explain website development services.
4. Explain SEO services.
5. Explain social media marketing.
6. Help visitors understand our packages.
7. Ask questions to understand the customer's requirements.
8. Qualify potential leads.
9. Collect name, email, phone number and requirements.
10. Never invent prices or services.
11. If you do not know something, say so.
12. Be professional, friendly and concise.
13. Speak naturally and avoid long answers.
14. Ask one question at a time.

When a visitor wants to contact Global Hood,
collect:

- Name
- Email
- Phone
- Company
- Service required
- Budget
- Project description
- Preferred contact time

After collecting the information,
confirm it with the visitor before saving it.
```

This makes it an actual business agent, rather than simply a voice chatbot.

## Step 4 — Give the agent tools

This is where the project becomes much more powerful.

Your voice agent can have tools such as:

```
get_services()
get_service_details()
get_pricing()
create_lead()
book_consultation()
send_contact_request()
```

For example:

```
Visitor
   ↓
"I want SEO"
   ↓
AI
   ↓
get_service_details("SEO")
   ↓
PostgreSQL / CMS
   ↓
AI
   ↓
Voice response
```

## Step 5 — Connect it to your PostgreSQL database

Since your Global Hood project already uses PostgreSQL, don't create a
second database.

You can use your existing database.

For example:

```
Voice Agent
     │
     ▼
createLead()
     │
     ▼
PostgreSQL
     │
     ▼
leads
```

A `leads` table could contain:

```
id
name
email
phone
company
service
budget
requirements
source
conversation_id
status
created_at
```

Then your admin dashboard can show:

```
Leads
────────────────────────────────────────

Name          Service          Status
------------------------------------------------
Ravi          SEO              New
Anil          Website          Contacted
Priya         Social Media     Qualified
```

## Step 6 — Give the agent your actual website knowledge

This is very important.

Don't let the AI make up information.

Create a knowledge structure such as:

```
knowledge/
 ├── company.md
 ├── services.md
 ├── seo.md
 ├── website-development.md
 ├── social-media.md
 ├── google-ads.md
 ├── meta-ads.md
 ├── pricing.md
 └── faq.md
```

For example:

```
Global Hood Services

1. Website Development
2. SEO
3. Social Media Marketing
4. Google Ads
5. Meta Ads
6. Content Marketing
7. Branding
8. Website Maintenance
```

The agent uses this information when answering questions.

## Step 7 — Add lead qualification

This is especially useful for a new digital marketing agency.

Instead of simply answering questions, the AI should turn conversations
into leads.

Example:

Visitor:

> "I need a website for my restaurant."

AI:

> "Great. I'd be happy to help. Is this a new website or are you looking
> to redesign an existing website?"

Visitor:

> "New website."

AI:

> "How many pages do you expect the website to have?"

Then:

```
Business: Restaurant
Project: New website
Pages: 8
E-commerce: No
Budget: ₹50,000
Timeline: 1 month
```

Then the agent asks:

> "Would you like me to send your requirements to the Global Hood team?"

Visitor:

> "Yes."

Then:

```
createLead()
       ↓
PostgreSQL
       ↓
Admin Dashboard
```

## Step 8 — Add appointment booking

You can give the agent another tool:

```
check_available_slots()
book_appointment()
```

Conversation:

> "I'd like to speak with someone."

AI:

> "Sure. Would tomorrow morning or afternoon work better for you?"

Then it can check availability and create the appointment.

If you later connect a calendar service, the agent can actually book the
meeting.

## Step 9 — Add multilingual voice

For your target audience, I'd consider:

- English
- Telugu
- Hindi

Example:

Visitor:

> "నాకు ఒక వెబ్‌సైట్ కావాలి."

Agent:

> "తప్పకుండా. మీ బిజినెస్ ఏ రకమైనది?"

This could make the website much more useful for local Indian customers.

## Step 10 — Security

This part is critical.

Never do:

```
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxxx
```

Don't expose the permanent API key to the browser.

Instead:

```
Browser
   ↓
/api/voice
   ↓
Server
   ↓
Realtime API
```

Your environment variables should be server-side.

For example:

```
OPENAI_API_KEY=...
DATABASE_URL=...
```

And not:

```
NEXT_PUBLIC_OPENAI_API_KEY
```

Vercel's own AI examples emphasize keeping API authentication on the
server side rather than making the browser responsible for secret
credentials.

## Recommended Global Hood project structure

I'd eventually structure your project approximately like this:

```
global-hood/
│
├── app/
│   ├── page.tsx
│   │
│   ├── services/
│   │
│   ├── contact/
│   │
│   ├── admin/
│   │
│   └── api/
│       ├── voice/
│       │   └── route.ts
│       │
│       ├── leads/
│       │   └── route.ts
│       │
│       └── appointments/
│           └── route.ts
│
├── components/
│   ├── VoiceAgent.tsx
│   ├── VoiceButton.tsx
│   ├── Transcript.tsx
│   └── LeadForm.tsx
│
├── lib/
│   ├── db.ts
│   ├── voice.ts
│   └── agent.ts
│
├── prisma/
│   └── schema.prisma
│
├── knowledge/
│   ├── company.md
│   ├── services.md
│   ├── pricing.md
│   └── faq.md
│
└── .env
```

## Technology stack I recommend

| Component | Technology |
|---|---|
| Website | Next.js |
| Hosting | Vercel |
| Voice | GPT Realtime |
| AI framework | Vercel AI SDK |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth/Auth.js or equivalent |
| Admin | Existing Global Hood dashboard |
| Voice transport | WebRTC/WebSocket depending on implementation |
| Knowledge | Database/files/vector search |
| Calendar | Calendar API |
| Email | Resend/SMTP |
| Analytics | Vercel Analytics |

Vercel's current realtime model documentation specifically demonstrates
voice agents that listen and respond with audio, making this architecture
suitable for your use case.

## Best version for Global Hood

I wouldn't build only a simple:

> 🎙️ "Talk to AI"

Instead, I'd build a Global Hood AI Sales & Support Agent:

```
                 GLOBAL HOOD AI
                       │
        ┌──────────────┼───────────────┐
        │              │               │
        ▼              ▼               ▼
      Voice          Website          Chat
        │              │               │
        └──────────────┼───────────────┘
                       ▼
                 AI Agent
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Services          Leads          Appointments
       │               │                │
       └───────────────┼────────────────┘
                       ▼
                  PostgreSQL
                       │
                       ▼
                Admin Dashboard
```

That gives your website an actual AI employee that can talk to visitors,
answer questions, qualify prospects and create leads.

## One important point

Because your deployed URL is currently returning 500, I would fix that
first before adding the voice agent.

If you provide/upload the Global Hood project ZIP/source code (or connect
the GitHub repository), I can walk you through the implementation file by
file, including the exact `VoiceAgent.tsx`, `/api/voice` route,
PostgreSQL/Prisma schema, environment variables, and Vercel deployment
configuration.
