import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${brand.name}'s website and services.`,
};

export default function TermsConditionsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Terms & Conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Use of This Site</h2>
          <p className="mt-2">
            This website is provided for informational purposes about{" "}
            {brand.name}&apos;s services. By using this site, you agree not to
            misuse it, attempt to disrupt its operation, or submit false
            information through our forms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Portfolio & Case Studies</h2>
          <p className="mt-2">
            Items in our Portfolio and Case Studies sections are clearly
            labeled as &quot;Demo Project&quot; or &quot;Concept
            Project/Case Study&quot; unless identified as a real, completed
            client engagement. Concept content illustrates our approach and
            capability and does not represent guaranteed or actual client
            results.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">No Guaranteed Results</h2>
          <p className="mt-2">
            Digital marketing results depend on many factors outside our
            control. Nothing on this site is a guarantee of specific traffic,
            rankings, leads, or revenue outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Service Agreements</h2>
          <p className="mt-2">
            Any engagement for paid services is governed by a separate,
            signed agreement between {brand.name} and the client, which takes
            precedence over this general site policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact Us</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
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
