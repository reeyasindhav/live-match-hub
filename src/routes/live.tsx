import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Radio } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { MatchCard } from "@/components/match-card";
import { matches, leagues, type League } from "@/lib/mock-data";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Scores & In-Play Matches | Sportcast" },
      {
        name: "description",
        content: "Follow every in-play match with live scores, clocks and venue detail across five major leagues.",
      },
      { property: "og:title", content: "Live Scores & In-Play Matches | Sportcast" },
      { property: "og:description", content: "Every live match, updating in one place on Sportcast." },
    ],
  }),
  component: LivePage,
});

function LivePage() {
  const [query, setQuery] = useState("");
  const [league, setLeague] = useState<League | "All">("All");

  const results = useMemo(
    () =>
      matches.filter((m) => {
        const inLeague = league === "All" || m.league === league;
        const q = query.trim().toLowerCase();
        const hit =
          !q ||
          m.home.name.toLowerCase().includes(q) ||
          m.away.name.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q);
        return inLeague && hit;
      }),
    [query, league],
  );

  const live = results.filter((m) => m.status === "live");
  const rest = results.filter((m) => m.status !== "live");

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <span className="flex w-fit animate-fade-up items-center gap-2 rounded-full bg-live/15 px-3 py-1 text-xs font-bold text-live">
            <span className="size-2 animate-pulse-live rounded-full bg-live" />
            {live.length} MATCHES IN PLAY
          </span>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold sm:text-5xl">Live Center</h1>
          <p className="mt-3 max-w-xl animate-fade-up text-muted-foreground">
            Search any fixture, filter by league, and jump straight into the timeline.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teams or venues..."
                className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", ...leagues] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLeague(l)}
                  className={`rounded-xl px-4 py-2.5 text-sm transition-all ${
                    league === l
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "PREMIER LEAGUE" ? "EPL" : l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
          <Radio className="size-5 text-live" /> In play
        </h2>
        <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {live.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
          {live.length === 0 && <p className="text-sm text-muted-foreground">No live matches match your filters.</p>}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold">Scheduled & finished</h2>
        <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
          {rest.length === 0 && <p className="text-sm text-muted-foreground">Nothing else to show.</p>}
        </div>
      </section>
    </SiteShell>
  );
}
