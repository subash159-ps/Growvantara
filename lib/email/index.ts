import { Resend } from "resend";
import type { LeadInput } from "@/lib/validation/lead";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendLeadNotification(lead: LeadInput) {
  if (!resend) {
    console.log("[email] RESEND_API_KEY not set — skipping lead notification email.", {
      email: lead.email,
    });
    return;
  }

  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!to || !from) {
    console.warn("[email] LEAD_NOTIFICATION_EMAIL or EMAIL_FROM not set — skipping.");
    return;
  }

  try {
    await resend.emails.send({
      to,
      from,
      subject: `New consultation request from ${lead.name}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        lead.phone ? `Phone: ${lead.phone}` : null,
        lead.company ? `Company: ${lead.company}` : null,
        lead.website ? `Website: ${lead.website}` : null,
        lead.serviceInterest ? `Service: ${lead.serviceInterest}` : null,
        lead.budget ? `Budget: ${lead.budget}` : null,
        "",
        "Message:",
        lead.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (error) {
    // Never fail the lead submission because the notification email failed.
    console.error("[email] Failed to send lead notification:", error);
  }
}
