import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { news, leagueToken } from "@/lib/mock-data";

const categories = ["All", "Analysis", "Recap", "Transfer", "Injury"] as const;

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Sports News, Analysis & Match Recaps | Sportcast" },
      {
        name: "description",
        content: "Editorial analysis, recaps, transfer buzz and injury updates from across the leagues we track.",
      },
      { property: "og:title", content: "Sports News, Analysis & Match Recaps | Sportcast" },
      { property: "og:description", content: "Curated sports insight, updated through the day." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = news.filter((n) => cat === "All" || n.category === cat);
  const [lead, ...rest] = list;

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Newsroom</h1>
          <p className="mt-3 animate-fade-up text-muted-foreground">
            Analysis and reporting from the Sportcast desk.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-xl px-4 py-2.5 text-sm transition-all ${
                  cat === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {lead && (
          <Link to={`/news/${lead.id}`} className="block">
            <article className="glass-card animate-fade-up rounded-3xl p-8 sm:p-10 transition-colors hover:border-primary/40">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: leagueToken[lead.league] }}
              >
                {lead.league} · {lead.category}
              </span>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">{lead.excerpt}</p>
              <p className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{lead.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {lead.readTime}
                </span>
                <span>{lead.time}</span>
              </p>
            </article>
          </Link>
        )}

        <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <Link key={n.id} to={`/news/${n.id}`} className="block">
              <article className="glass-card h-full rounded-2xl p-6 transition-colors hover:border-primary/40">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: leagueToken[n.league] }}
                >
                  {n.league} · {n.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <p className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{n.author}</span>
                  <span>{n.readTime}</span>
                  <span>{n.time}</span>
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
