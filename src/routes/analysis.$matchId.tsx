import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { ChevronLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { SiteShell } from "@/components/site-shell";
import { StatComparison } from "@/components/match-card";
import { MatchTimeline } from "@/components/match-timeline";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { getMatch, leagueToken } from "@/lib/mock-data";

export const Route = createFileRoute("/analysis/$matchId")({
  loader: ({ params }) => {
    const match = getMatch(params.matchId);
    if (!match) throw notFound();
    return { matchId: match.id, title: `Match Analysis: ${match.home.short} vs ${match.away.short}` };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Match Analysis"} | Sportcast` },
      {
        name: "description",
        content: `Deep statistical analysis, charts and insights for ${loaderData?.title ?? "this fixture"} on Sportcast.`,
      },
      { property: "og:title", content: `${loaderData?.title ?? "Match Analysis"} | Sportcast` },
      {
        property: "og:description",
        content: "Radar charts, stat breakdowns and tactical insight for this matchup.",
      },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Analysis not found</h1>
        <Link to="/live" className="mt-4 inline-block text-primary hover:underline">
          Browse live matches
        </Link>
      </div>
    </SiteShell>
  ),
  component: MatchAnalysisPage,
});

function MatchAnalysisPage() {
  const { matchId } = Route.useLoaderData();
  const match = getMatch(matchId)!;
  const accent = leagueToken[match.league];

  const radarData = useMemo(
    () =>
      match.stats.map((s) => ({
        stat: s.label,
        home: s.home,
        away: s.away,
        fullMark: Math.max(s.home, s.away, 100),
      })),
    [match.stats],
  );

  const barData = useMemo(
    () =>
      match.stats.map((s) => ({
        label: s.label,
        Home: s.home,
        Away: s.away,
      })),
    [match.stats],
  );

  const chartConfig = {
    home: { label: match.home.short, color: accent },
    away: { label: match.away.short, color: "var(--live)" },
  } as const;

  const insights = useMemo(() => {
    const out: string[] = [];
    const possession = match.stats.find((s) => s.label.toLowerCase().includes("possession"));
    if (possession) {
      const dom = possession.home > possession.away ? match.home.short : match.away.short;
      out.push(`${dom} are controlling possession at ${Math.max(possession.home, possession.away)}%.`);
    }
    const shots = match.stats.find((s) => s.label.toLowerCase().includes("shots on target"));
    if (shots) {
      const dom = shots.home > shots.away ? match.home.short : match.away.short;
      out.push(`${dom} have been more clinical, leading ${shots.home}:${shots.away} in shots on target.`);
    }
    if (match.timeline.length > 0) {
      const goals = match.timeline.filter((e) => e.type === "goal");
      if (goals.length > 0) {
        out.push(`${goals.length} goal${goals.length > 1 ? "s" : ""} recorded in the timeline so far.`);
      }
    }
    if (out.length === 0) out.push("Analysis will update as more data becomes available.");
    return out;
  }, [match]);

  return (
    <SiteShell ticker={false}>
      <div className="border-b border-border bg-surface/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs font-bold tracking-[0.2em] text-live">
          <span className="size-2 animate-pulse-live rounded-full bg-live" />
          {match.status === "live" ? "LIVE MATCH" : match.status.toUpperCase()}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link
          to="/matches/$matchId" params={{ matchId }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" /> Back to Match
        </Link>
        <button
          onClick={() => toast.success("Analysis link copied to clipboard")}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <Share2 className="size-4" /> Share Analysis
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
                <span className="rounded-full bg-live/15 px-2.5 py-0.5 text-[10px] font-bold text-live">
                  LIVE
                </span>
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
                  <h2 className="mt-4 font-display text-2xl font-bold group-hover:underline">
                    {team.name}
                  </h2>
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
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Statistical Overview</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Side-by-side comparison with proportional breakdown.
            </p>
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
            <h3 className="font-display text-xl font-bold">Stat Comparison</h3>
            <p className="mt-1 text-sm text-muted-foreground">Grouped bar chart across key metrics.</p>
            <div className="mt-6 h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer>
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <Tooltip cursor={{ fill: "var(--surface)" }} content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="Home" fill={accent} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Away" fill="var(--live)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Team Profile</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Relative strengths across tracked metrics.
            </p>
            <div className="mt-6 h-96 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer>
                  <RadarChart data={radarData}>
                    <PolarGrid className="stroke-border/70" />
                    <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <PolarRadiusAxis angle={30} domain={[0, "dataMax"]} tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Radar
                      name={match.home.short}
                      dataKey="home"
                      stroke={accent}
                      fill={accent}
                      fillOpacity={0.25}
                    />
                    <Radar
                      name={match.away.short}
                      dataKey="away"
                      stroke="var(--live)"
                      fill="var(--live)"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
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
            <h3 className="font-display text-xl font-bold">Key Insights</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {insights.map((text) => (
                <li key={text} className="leading-relaxed">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold">Momentum</h3>
            <div className="mt-5 space-y-4">
              {[match.home, match.away].map((t) => (
                <div key={t.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{t.short}</span>
                    <span className="text-xs text-muted-foreground">Last 5</span>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {t.form.map((f, i) => (
                      <span
                        key={i}
                        className={`grid size-7 place-items-center rounded-full text-[11px] font-bold ${
                          f === "W"
                            ? "bg-live/20 text-live"
                            : f === "L"
                              ? "bg-destructive/20 text-destructive"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
        </aside>
      </section>
    </SiteShell>
  );
}
