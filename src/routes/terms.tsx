import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Sportcast" },
      {
        name: "description",
        content: "The terms and conditions for using Sportcast.",
      },
      { property: "og:title", content: "Terms of Service | Sportcast" },
      {
        property: "og:description",
        content: "Please review these terms before using Sportcast.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Terms of Service</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            By using Sportcast, you agree to the following terms. Please read them carefully.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Last updated: Aug 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {[
              {
                title: "1. Acceptance of terms",
                body: "By accessing or using Sportcast, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the app.",
              },
              {
                title: "2. Use of the service",
                body: "Sportcast is provided for personal, non-commercial use. You may not reproduce, distribute or create derivative works from our content without permission.",
              },
              {
                title: "3. Accuracy of data",
                body: "We strive to provide accurate scores and statistics, but data is provided for informational purposes only and may contain errors or delays.",
              },
              {
                title: "4. User accounts",
                body: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under it. Notify us immediately of any unauthorized use.",
              },
              {
                title: "5. Intellectual property",
                body: "All content, logos and trademarks on Sportcast are owned by Sportcast or our licensors. You may not use them without written permission.",
              },
              {
                title: "6. Limitation of liability",
                body: "Sportcast is provided as is, without warranties of any kind. We are not liable for any damages arising from use of the service.",
              },
              {
                title: "7. Changes to terms",
                body: "We may update these terms from time to time. Continued use of the service after changes means you accept the updated terms.",
              },
            ].map((section) => (
              <div key={section.title} className="glass-card rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold">{section.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <Scale className="size-6 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">Key points</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Personal, non-commercial use only</li>
                <li>Data is for informational purposes</li>
                <li>Keep your account secure</li>
                <li>No warranties; use at your own risk</li>
                <li>Terms may change with notice</li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold">Related</h3>
              <div className="mt-4 space-y-2">
                <Link to="/privacy" className="block text-sm text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link to="/contact" className="block text-sm text-primary hover:underline">
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
