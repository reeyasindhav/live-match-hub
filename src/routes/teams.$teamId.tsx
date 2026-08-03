import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Star } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { FormRow, MatchCard } from "@/components/match-card";
import { useAuth } from "@/lib/auth";
import { getTeam, leagueToken, matchesByTeam, playersByTeam } from "@/lib/mock-data";

export const Route = createFileRoute("/teams/$teamId")({
  loader: ({ params }) => {
    const team = getTeam(params.teamId);
    if (!team) throw notFound();
    return { teamId: team.id, name: team.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Team"} — Squad, Form & Stats | Sportcast` },
      {
        name: "description",
        content: `Season statistics, recent form, fixtures and squad profiles for ${loaderData?.name ?? "this team"}.`,
      },
      { property: "og:title", content: `${loaderData?.name ?? "Team"} — Squad, Form & Stats | Sportcast` },
      { property: "og:description", content: "Full team hub with fixtures, form and player profiles." },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Team not found</h1>
        <Link to="/teams" className="mt-4 inline-block text-primary hover:underline">
          Browse all teams
        </Link>
      </div>
    </SiteShell>
  ),
  component: TeamPage,
});

function TeamPage() {
  const { teamId } = Route.useLoaderData();
  const team = getTeam(teamId)!;
  const accent = leagueToken[team.league];
  const squad = playersByTeam(team.id);
  const fixtures = matchesByTeam(team.id);
  const { user, toggleFavorite } = useAuth();
  const isFav = user?.favorites.includes(team.id) ?? false;

  return (
    <SiteShell>
      <section
        className="border-b border-border"
        style={{ backgroundImage: `radial-gradient(90% 120% at 20% -20%, ${accent}33, transparent 70%)` }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link to="/teams" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> All teams
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="animate-fade-up flex items-center gap-5">
              <span className="grid size-20 place-items-center rounded-3xl bg-secondary text-4xl">{team.emoji}</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                  {team.league}
                </span>
                <h1 className="font-display text-4xl font-bold">{team.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {team.stadium} · {team.city} · Founded {team.founded} · Coach {team.coach}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (!user) {
                  toast.error("Log in to follow teams");
                  return;
                }
                toggleFavorite(team.id);
                toast.success(isFav ? `Unfollowed ${team.name}` : `Following ${team.name}`);
              }}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                isFav ? "bg-live/20 text-live" : "bg-primary text-primary-foreground"
              }`}
            >
              <Star className={`size-4 ${isFav ? "fill-current" : ""}`} />
              {isFav ? "Following" : "Follow team"}
            </button>
          </div>

          <div className="stagger-children mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.seasonStats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-3xl font-bold" style={{ color: accent }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Fixtures & results</h2>
            <div className="stagger-children mt-5 grid gap-5 sm:grid-cols-2">
              {fixtures.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
              {fixtures.length === 0 && (
                <p className="text-sm text-muted-foreground">No fixtures scheduled right now.</p>
              )}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold">Squad</h2>
            <ul className="mt-4 divide-y divide-border">
              {squad.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/players/$playerId"
                    params={{ playerId: p.id }}
                    className="flex items-center gap-4 py-3 transition-colors hover:text-primary"
                  >
                    <span
                      className="grid size-9 place-items-center rounded-xl text-sm font-bold"
                      style={{ backgroundColor: `${accent}22`, color: accent }}
                    >
                      {p.number}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.position}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{p.country}</span>
                  </Link>
                </li>
              ))}
              {squad.length === 0 && <li className="py-3 text-sm text-muted-foreground">Squad list coming soon.</li>}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold">Standing</h2>
            <p className="mt-3 font-display text-5xl font-bold" style={{ color: accent }}>
              #{team.standing}
            </p>
            <p className="text-sm text-muted-foreground">{team.record}</p>
            <div className="mt-5">
              <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Last 5</p>
              <FormRow form={team.form} />
            </div>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
