import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

const faqs = [
  {
    question: "How much does digital marketing cost?",
    answer:
      "It depends on the services and scope. After a free consultation, we put together a proposal tailored to your goals and budget.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Paid ads can generate leads within days. SEO and content typically take a few months to show meaningful, compounding results.",
  },
  {
    question: "Do you work with businesses in my industry?",
    answer:
      "We work across many industries. Tell us about your business in the consultation form and we'll let you know how we can help.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Terms vary by service. We'll walk through timelines and commitment options for your specific project during the consultation.",
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
