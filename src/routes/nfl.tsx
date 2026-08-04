import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Trophy } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { MatchCard } from "@/components/match-card";
import { matches, type League } from "@/lib/mock-data";

export const Route = createFileRoute("/nfl")({
  head: () => ({
    meta: [
      { title: "NFL Scores, Stats & Standings | Sportcast" },
      {
        name: "description",
        content: "Follow every NFL game with live scores, player stats and match analysis from Sportcast.",
      },
      { property: "og:title", content: "NFL Scores & Stats | Sportcast" },
      {
        property: "og:description",
        content: "Real-time NFL scores, box scores and matchup previews.",
      },
    ],
  }),
  component: NFLPage,
});

function NFLPage() {
  const nflMatches = useMemo(
    () => matches.filter((m) => m.league === "NFL"),
    [],
  );

  const live = nflMatches.filter((m) => m.status === "live");
  const upcoming = nflMatches.filter((m) => m.status === "upcoming");
  const finished = nflMatches.filter((m) => m.status === "final");

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <span className="flex w-fit animate-fade-up items-center gap-2 rounded-full bg-nfl/15 px-3 py-1 text-xs font-bold text-nfl">
            <Trophy className="size-3.5" />
            LEAGUE
          </span>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold sm:text-5xl">NFL</h1>
          <p className="mt-3 max-w-xl animate-fade-up text-muted-foreground">
            Live scores, player stats and match analysis from the National Football League.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full border border-border bg-surface px-4 py-2 text-muted-foreground">
              {live.length} Live
            </span>
            <span className="rounded-full border border-border bg-surface px-4 py-2 text-muted-foreground">
              {upcoming.length} Upcoming
            </span>
            <span className="rounded-full border border-border bg-surface px-4 py-2 text-muted-foreground">
              {finished.length} Finished
            </span>
          </div>
        </div>
      </section>

      {live.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="size-2 animate-pulse-live rounded-full bg-live" />
            Live Now
          </h2>
          <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {live.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="font-display text-2xl font-bold">Upcoming</h2>
          <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="font-display text-2xl font-bold">Results</h2>
          <div className="stagger-children mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {finished.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {nflMatches.length === 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-sm text-muted-foreground">No NFL matches available right now.</p>
        </section>
      )}
    </SiteShell>
  );
}
