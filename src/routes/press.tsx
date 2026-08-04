import { createFileRoute, Link } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & News | Sportcast" },
      {
        name: "description",
        content: "Press releases, media assets and company news from Sportcast.",
      },
      { property: "og:title", content: "Press & News | Sportcast" },
      {
        property: "og:description",
        content: "Stay up to date with the latest from Sportcast.",
      },
    ],
  }),
  component: PressPage,
});

function PressPage() {
  const releases = [
    {
      title: "Sportcast raises Series A to expand live sports coverage",
      date: "June 12, 2026",
      category: "Funding",
    },
    {
      title: "New NHL partnership brings real-time stats to the dashboard",
      date: "May 3, 2026",
      category: "Partnership",
    },
    {
      title: "Sportcast named best sports app by SportsTech Awards",
      date: "April 18, 2026",
      category: "Awards",
    },
  ];

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Press</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            The latest company news, press releases and media resources.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="space-y-4">
          {releases.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-primary/40"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                {item.category}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug">{item.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <Newspaper className="size-6 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold">Media Resources</h2>
          <p className="mt-3 text-muted-foreground">
            For press enquiries, logos, brand assets or interview requests, please email{" "}
            <a className="text-primary underline" href="mailto:press@sportcast.app">
              press@sportcast.app
            </a>
            .
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
