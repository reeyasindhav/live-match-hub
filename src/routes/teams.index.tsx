import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { FormRow } from "@/components/match-card";
import { teams, leagues, leagueToken, type League } from "@/lib/mock-data";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Team Hubs & Standings | Sportcast" },
      {
        name: "description",
        content: "Browse every tracked club — records, standings, recent form and season statistics in one hub.",
      },
      { property: "og:title", content: "Team Hubs & Standings | Sportcast" },
      { property: "og:description", content: "Records, form and season stats for every tracked team." },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const [league, setLeague] = useState<League | "All">("All");
  const list = teams.filter((t) => league === "All" || t.league === league);

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Teams</h1>
          <p className="mt-3 animate-fade-up text-muted-foreground">
            Every club we track, with live standings and season form.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
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
                {l === "PREMIER LEAGUE" ? "Premier League" : l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <Link
              key={t.id}
              to="/teams/$teamId"
              params={{ teamId: t.id }}
              className="glass-card group rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl transition-transform group-hover:scale-110">
                  {t.emoji}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: leagueToken[t.league] }}
                >
                  {t.league}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold">{t.name}</h2>
              <p className="text-sm text-muted-foreground">
                #{t.standing} · {t.record}
              </p>
              <div className="mt-4">
                <FormRow form={t.form} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
