import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Sportcast" },
      {
        name: "description",
        content: "How Sportcast collects, uses and protects your personal data.",
      },
      { property: "og:title", content: "Privacy Policy | Sportcast" },
      {
        property: "og:description",
        content: "Learn how Sportcast handles your data and your rights.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            We take your privacy seriously. This policy explains what data we collect, why we collect it and how we keep it safe.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Last updated: Aug 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {[
              {
                title: "1. What we collect",
                body: "We collect information you provide directly, such as your name, email address and favourite teams. We also store local preferences like notification settings in your browser storage.",
              },
              {
                title: "2. How we use it",
                body: "Your data is used only to personalise your Sportcast experience. We do not sell or share personal data with third-party advertisers. Analytics are aggregated and anonymised.",
              },
              {
                title: "3. Data security",
                body: "We use reasonable technical measures to protect your data, including encrypted storage where applicable. You can request deletion of local account data from Settings at any time.",
              },
              {
                title: "4. Cookies and local storage",
                body: "We use local storage to keep you signed in and remember your preferences. You can clear this data from your browser settings or through the app settings.",
              },
              {
                title: "5. Your rights",
                body: "You can request access, correction or deletion of your personal data by contacting hello@sportcast.app. You can also withdraw consent for notifications at any time in Settings.",
              },
              {
                title: "6. Contact",
                body: "For privacy-related questions, email privacy@sportcast.app or use the Contact page.",
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
              <Shield className="size-6 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">Our commitment</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>No sale of personal data</li>
                <li>Minimal data collection</li>
                <li>Transparent policies</li>
                <li>Easy data deletion</li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold">Related</h3>
              <div className="mt-4 space-y-2">
                <Link to="/contact" className="block text-sm text-primary hover:underline">
                  Contact us
                </Link>
                <Link to="/about" className="block text-sm text-primary hover:underline">
                  About Sportcast
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
