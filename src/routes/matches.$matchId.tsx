import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { FormRow, StatComparison } from "@/components/match-card";
import { MatchTimeline } from "@/components/match-timeline";
import { getMatch, leagueToken, playersByTeam } from "@/lib/mock-data";

export const Route = createFileRoute("/matches/$matchId")({
  loader: ({ params }) => {
    const match = getMatch(params.matchId);
    if (!match) throw notFound();
    return { matchId: match.id, title: `${match.home.short} vs ${match.away.short}` };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Match"} — Live Stats | Sportcast` },
      {
        name: "description",
        content: `Live score, match statistics and full timeline for ${loaderData?.title ?? "this fixture"} on Sportcast.`,
      },
      { property: "og:title", content: `${loaderData?.title ?? "Match"} — Live Stats | Sportcast` },
      { property: "og:description", content: "Possession, shots, timeline and quick facts, updated live." },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Match not found</h1>
        <Link to="/live" className="mt-4 inline-block text-primary hover:underline">
          Back to Live Center
        </Link>
      </div>
    </SiteShell>
  ),
  component: MatchPage,
});

function MatchPage() {
  const { matchId } = Route.useLoaderData();
  const match = getMatch(matchId)!;
  const accent = leagueToken[match.league];
  const roster = [...playersByTeam(match.home.id), ...playersByTeam(match.away.id)];

  return (
    <SiteShell ticker={false}>
      <div className="border-b border-border bg-surface/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs font-bold tracking-[0.2em] text-live">
          <span className="size-2 animate-pulse-live rounded-full bg-live" />
          {match.status === "live" ? "LIVE MATCH" : match.status.toUpperCase()}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-4" /> Back to Home
        </Link>
        <button
          onClick={() => toast.success("Match link copied to clipboard")}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <Share2 className="size-4" /> Share
        </button>
      </div>

      <section className="mx-auto max-w-7xl px-4">
        <div
          className="animate-fade-up rounded-3xl border p-8 sm:p-12"
          style={{ borderColor: accent, boxShadow: `0 30px 80px -50px ${accent}` }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                {match.league}
              </span>
              {match.status === "live" && (
                <span className="rounded-full bg-live/15 px-2.5 py-0.5 text-[10px] font-bold text-live">LIVE</span>
              )}
            </div>
            <p className="mt-3 text-muted-foreground">{match.venue}</p>
          </div>

          <div className="mt-10 grid items-center gap-8 sm:grid-cols-3">
            {[match.home, match.away].map((team, i) => (
              <div key={team.id} className={`text-center ${i === 1 ? "sm:order-3" : ""}`}>
                <Link
                  to="/teams/$teamId"
                  params={{ teamId: team.id }}
                  className="group inline-flex flex-col items-center"
                >
                  <span className="grid size-16 place-items-center rounded-2xl bg-secondary text-3xl transition-transform group-hover:scale-110">
                    {team.emoji}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold group-hover:underline">{team.name}</h2>
                </Link>
                <p className="mt-2 font-display text-6xl font-bold tabular-nums" style={{ color: accent }}>
                  {team.score}
                </p>
              </div>
            ))}
            <div className="text-center sm:order-2">
              <span
                className="inline-block rounded-full px-7 py-2.5 font-display text-lg font-bold text-primary-foreground"
                style={{ backgroundColor: accent }}
              >
                {match.clock}
              </span>
              <p className="mt-3 text-muted-foreground">
                {match.status === "live"
                  ? "Match in Progress"
                  : match.status === "final"
                    ? "Full Time"
                    : "Kick-off soon"}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{match.stats[0]?.home}%</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {match.stats[0]?.label}
              </span>
              <span className="font-semibold">{match.stats[0]?.away}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full origin-left animate-grow-x rounded-full"
                style={{
                  width: `${((match.stats[0]?.home ?? 50) / ((match.stats[0]?.home ?? 50) + (match.stats[0]?.away ?? 50))) * 100}%`,
                  backgroundColor: accent,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Match Statistics</h3>
            <div className="mt-6">
              <StatComparison
                stats={match.stats}
                accent={accent}
                homeLabel={match.home.short}
                awayLabel={match.away.short}
              />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Match Timeline</h3>
            <div className="mt-6">
              <MatchTimeline events={match.timeline} accent={accent} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Quick Facts</h3>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ["Referee", match.facts.referee],
                ["Attendance", match.facts.attendance],
                ["Weather", match.facts.weather],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Recent Form</h3>
            <div className="mt-5 space-y-5">
              {[match.home, match.away].map((t) => (
                <div key={t.id}>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <div className="mt-2">
                    <FormRow form={t.form} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {roster.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold">Players to watch</h3>
              <ul className="mt-4 space-y-2">
                {roster.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/players/$playerId"
                      params={{ playerId: p.id }}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.position}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </SiteShell>
  );
}
