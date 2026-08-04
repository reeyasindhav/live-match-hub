import { createFileRoute, Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { players, teams, playersByTeam, leagueToken } from "@/lib/mock-data";

export const Route = createFileRoute("/players/")({
  head: () => ({
    meta: [
      { title: "All Players — Team Rosters & Profiles | Sportcast" },
      {
        name: "description",
        content: "Browse every tracked player, organised by team. View profiles, season stats and attribute breakdowns.",
      },
      { property: "og:title", content: "All Players — Team Rosters | Sportcast" },
      {
        property: "og:description",
        content: "Complete player directory across NBA, Premier League, MLB, NFL and NHL.",
      },
    ],
  }),
  component: PlayersPage,
});

function PlayersPage() {
  const grouped = teams
    .map((team) => ({ team, players: playersByTeam(team.id) }))
    .filter((group) => group.players.length > 0);

  const leagueOrder = ["PREMIER LEAGUE", "NBA", "MLB", "NFL", "NHL"] as const;

  const sorted = grouped.sort((a, b) => {
    const ai = leagueOrder.indexOf(a.team.league);
    const bi = leagueOrder.indexOf(b.team.league);
    if (ai !== bi) return ai - bi;
    return a.team.name.localeCompare(b.team.name);
  });

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">Players</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            Every tracked player, organised by team. Jump into any profile for season stats, attribute
            breakdowns and recent performances.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="space-y-12">
          {sorted.map(({ team, players: roster }) => {
            const accent = leagueToken[team.league];
            return (
              <div key={team.id}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-secondary text-2xl">
                    {team.emoji}
                  </span>
                  <div>
                    <Link
                      to="/teams/$teamId"
                      params={{ teamId: team.id }}
                      className="font-display text-xl font-bold hover:underline"
                    >
                      {team.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {team.league} · {roster.length} player{roster.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {roster.map((player) => (
                    <Link
                      key={player.id}
                      to="/players/$playerId"
                      params={{ playerId: player.id }}
                      className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/40"
                    >
                      <div
                        className="grid size-12 shrink-0 place-items-center rounded-xl text-2xl"
                        style={{ backgroundColor: `${accent}22` }}
                      >
                        {player.emoji}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-semibold">{player.name}</h3>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-bold text-primary-foreground"
                            style={{ backgroundColor: accent }}
                          >
                            #{player.number}
                          </span>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">
                          {player.position} · {player.country}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{player.headline}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
