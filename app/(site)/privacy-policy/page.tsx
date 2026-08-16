import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${brand.name}'s privacy policy — how we collect, use, and protect your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Information We Collect</h2>
          <p className="mt-2">
            When you submit our contact/consultation form, we collect the
            information you provide: your name, email address, phone number,
            company, website, service interest, budget, and message. We do
            not collect payment information through this site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">How We Use Your Information</h2>
          <p className="mt-2">
            We use the information you submit to respond to your enquiry,
            follow up about our services, and improve our marketing. We do
            not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Data Storage</h2>
          <p className="mt-2">
            Enquiry data is stored securely in our database and accessible
            only to authorized {brand.name} staff.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
          <p className="mt-2">
            We may use essential cookies required for the site to function.
            We do not currently use third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact Us</h2>
          <p className="mt-2">
            If you have questions about this policy or want your data
            removed, contact us at{" "}
            <a href={`mailto:${brand.email}`} className="font-medium text-foreground hover:underline">
              {brand.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
