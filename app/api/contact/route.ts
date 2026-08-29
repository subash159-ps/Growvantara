import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateLead } from "@/lib/validation/lead";
import { sendLeadNotification } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = validateLead(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", fieldErrors: parsed.errors },
      { status: 400 },
    );
  }

  // Honeypot: bots that fill in this hidden field are silently dropped.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, company, website, serviceInterest, budget, message } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      website: website || undefined,
      serviceInterest: serviceInterest || undefined,
      budget: budget || undefined,
      message,
    },
  });

  await sendLeadNotification(parsed.data);

  return NextResponse.json({ ok: true, id: lead.id });
}
