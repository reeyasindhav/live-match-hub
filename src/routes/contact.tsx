import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sportcast" },
      {
        name: "description",
        content: "Get in touch with Sportcast for support, partnerships or general enquiries.",
      },
      { property: "og:title", content: "Contact Sportcast" },
      {
        property: "og:description",
        content: "We would love to hear from you.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Contact</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            Have a question, partnership idea or feedback? Reach out and we will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-6">
            <Mail className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold">Email</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <a className="text-primary hover:underline" href="mailto:hello@sportcast.app">
                hello@sportcast.app
              </a>
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <Phone className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold">Phone</h3>
            <p className="mt-2 text-sm text-muted-foreground">+1 (555) 012-3456</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <MapPin className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold">Office</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              123 Sports Lane, Suite 400
              <br />
              San Francisco, CA 94105
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl font-bold">Send a Message</h2>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
