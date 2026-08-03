import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { SiteShell } from "@/components/site-shell";
import { getPlayer, getTeam, leagueToken, playersByTeam } from "@/lib/mock-data";

export const Route = createFileRoute("/players/$playerId")({
  loader: ({ params }) => {
    const player = getPlayer(params.playerId);
    if (!player) throw notFound();
    return { playerId: player.id, name: player.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Player"} — Profile & Season Stats | Sportcast` },
      {
        name: "description",
        content: `Season numbers, attribute radar and recent performances for ${loaderData?.name ?? "this player"}.`,
      },
      { property: "og:title", content: `${loaderData?.name ?? "Player"} — Profile & Season Stats | Sportcast` },
      { property: "og:description", content: "Deep player analytics with attribute radar and recent form." },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Player not found</h1>
        <Link to="/teams" className="mt-4 inline-block text-primary hover:underline">
          Browse teams
        </Link>
      </div>
    </SiteShell>
  ),
  component: PlayerPage,
});

function PlayerPage() {
  const { playerId } = Route.useLoaderData();
  const player = getPlayer(playerId)!;
  const team = getTeam(player.teamId);
  const accent = leagueToken[player.league];
  const teammates = playersByTeam(player.teamId).filter((p) => p.id !== player.id);

  return (
    <SiteShell>
      <section
        className="border-b border-border"
        style={{ backgroundImage: `radial-gradient(90% 120% at 80% -20%, ${accent}33, transparent 70%)` }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12">
          {team && (
            <Link
              to="/teams/$teamId"
              params={{ teamId: team.id }}
              className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="size-4" /> {team.name}
            </Link>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div
              className="grid size-24 animate-fade-up place-items-center rounded-3xl text-5xl"
              style={{ backgroundColor: `${accent}22` }}
            >
              {player.emoji}
            </div>
            <div className="animate-fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                {player.position} · #{player.number}
              </span>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">{player.name}</h1>
              <p className="mt-2 max-w-xl text-muted-foreground">{player.headline}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {player.country} · {player.age} yrs · {player.height}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {player.season.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-3xl font-bold" style={{ color: accent }}>
                {s.value}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full origin-left animate-grow-x rounded-full"
                  style={{ width: `${s.pct}%`, backgroundColor: accent }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">{s.pct}th percentile</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <h2 className="font-display text-xl font-bold">Attribute profile</h2>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={player.radar} outerRadius="72%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke={accent}
                    fill={accent}
                    fillOpacity={0.35}
                    animationDuration={900}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold">Recent performances</h2>
            <ul className="mt-4 space-y-3">
              {player.recent.map((r) => (
                <li
                  key={r.opponent}
                  className="flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{r.opponent}</p>
                    <p className="text-xs text-muted-foreground">{r.line}</p>
                  </div>
                  <span
                    className="rounded-lg px-2.5 py-1 text-sm font-bold"
                    style={{ backgroundColor: `${accent}22`, color: accent }}
                  >
                    {r.rating}
                  </span>
                </li>
              ))}
            </ul>

            {teammates.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-semibold">Teammates</h3>
                <ul className="mt-2 space-y-1">
                  {teammates.map((t) => (
                    <li key={t.id}>
                      <Link
                        to="/players/$playerId"
                        params={{ playerId: t.id }}
                        className="block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
