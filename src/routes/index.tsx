import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Filter, TrendingUp, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { MatchCard } from "@/components/match-card";
import { matches, leagues, news, type League } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sportcast — Live Sports Dashboard" },
      {
        name: "description",
        content:
          "Real-time scores, stat comparisons and match insight across NBA, Premier League, MLB, NFL and NHL in one dashboard.",
      },
      { property: "og:title", content: "Sportcast — Live Sports Dashboard" },
      {
        property: "og:description",
        content: "Stay updated with real-time scores, stats and insights across every major league.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [filter, setFilter] = useState<League | "All">("All");
  const visible = matches.filter((m) => filter === "All" || m.league === filter);
  const nowPlaying = visible.filter((m) => m.status !== "upcoming");
  const upcoming = visible.filter((m) => m.status === "upcoming");
  const liveCount = matches.filter((m) => m.status === "live").length;

  return (
    <SiteShell>
      <section className="hero-glow">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="animate-fade-up">
              <h1 className="font-display text-4xl font-bold sm:text-5xl">Live Sports Dashboard</h1>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Stay updated with real-time scores, stats, and insights — every league, one screen.
              </p>
            </div>
            <button
              onClick={() => setFilter("All")}
              className="flex animate-fade-up items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Filter className="size-4" />
              Filter Leagues
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(["All", ...leagues] as const).map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                  filter === l
                    ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)]"
                    : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "PREMIER LEAGUE" ? "Premier League" : l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
            <TrendingUp className="size-6 text-live" />
            Now Playing
          </h2>
          <span className="text-xs font-bold tracking-widest text-live">{liveCount} LIVE</span>
        </div>
        <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {nowPlaying.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
          {nowPlaying.length === 0 && (
            <p className="text-sm text-muted-foreground">No live matches for this league right now.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6">
        <h2 className="font-display text-2xl font-bold">Upcoming Matches</h2>
        <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2">
          {upcoming.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
          {upcoming.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing scheduled for this league today.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Latest Insight</h2>
          <Link to="/news" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
            All news <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="stagger-children mt-6 grid gap-5 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link key={n.id} to="/news" className="glass-card rounded-2xl p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                {n.category}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug">{n.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {n.author} · {n.readTime}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="stagger-children grid gap-5 sm:grid-cols-3">
          {[
            { value: "1.2M", label: "Daily Active Users", color: "var(--mlb)" },
            { value: "50K+", label: "Matches Tracked", color: "var(--epl)" },
            { value: "150+", label: "Leagues & Tournaments", color: "var(--nfl)" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-8 text-center">
              <p className="font-display text-4xl font-bold" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
