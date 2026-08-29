import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

const faqs = [
  {
    question: "What services does your agency offer?",
    answer:
      "We offer a full range of digital marketing services including SEO, PPC advertising, social media management, content marketing, email marketing, web design, and branding — tailored to your specific business goals.",
  },
  {
    question: "How do I get started working with your agency?",
    answer:
      "Simply reach out for a free consultation. We'll discuss your goals, audience, and challenges, then create a customized strategy and proposal for your business.",
  },
  {
    question: "Will I have a dedicated account manager?",
    answer:
      "Yes, every client is assigned a dedicated account manager who serves as your main point of contact and coordinates with our specialists on your campaigns.",
  },
  {
    question: "How often will I receive updates or reports?",
    answer:
      "We provide regular performance reports (typically monthly, with some services updated weekly) that include key metrics, insights, and next steps.",
  },
  {
    question: "Can I request changes to my campaign or strategy?",
    answer:
      "Absolutely — we welcome feedback and collaborate closely with clients. Strategies are adjusted based on performance data and your evolving business needs.",
  },
  {
    question: "Do you work with businesses in my industry?",
    answer:
      "We've worked across a wide range of industries. During your consultation, we'll assess your niche and share relevant experience or case studies.",
  },
  {
    question: "What's the typical contract length or commitment?",
    answer:
      "This varies by service — some engagements are month-to-month, while others (like SEO) work best with a minimum 3–6 month commitment to show measurable results.",
  },
  {
    question: "How do you communicate with clients?",
    answer:
      "We stay in touch through email, scheduled calls, and a shared reporting dashboard, with the frequency tailored to your preference and campaign needs.",
  },
  {
    question: "What happens if I'm not satisfied with the results?",
    answer:
      "We prioritize transparency and open communication. If results aren't meeting expectations, we review the strategy together and make data-driven adjustments.",
  },
  {
    question: "Can I cancel or pause services if needed?",
    answer:
      "Yes, our contracts are designed to be flexible. Terms for pausing or canceling are outlined clearly upfront so there are no surprises.",
  },
];

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

      <Accordion className="mt-10">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
