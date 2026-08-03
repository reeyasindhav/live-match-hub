import { Link } from "@tanstack/react-router";
import { ChevronRight, TrendingUp } from "lucide-react";
import { leagueToken, type Match } from "@/lib/mock-data";

export function MatchCard({ match }: { match: Match }) {
  const accent = leagueToken[match.league];
  const winner =
    match.status === "final" ? (match.home.score > match.away.score ? "home" : "away") : null;

  return (
    <Link
      to="/matches/$matchId"
      params={{ matchId: match.id }}
      className="glass-card group block rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>
            {match.league}
          </span>
          {match.status === "live" && (
            <span className="flex items-center gap-1.5 rounded-full bg-live/15 px-2 py-0.5 text-[10px] font-bold text-live">
              <span className="size-1.5 animate-pulse-live rounded-full bg-live" />
              LIVE
            </span>
          )}
          {match.status === "final" && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              FINAL
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{match.clock}</span>
      </div>

      <div className="mt-4 space-y-1">
        {[match.home, match.away].map((team, i) => (
          <div key={team.id} className="flex items-center gap-3 rounded-xl px-1 py-2">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-lg">
              {team.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold leading-tight">{team.short}</p>
              <p className="text-xs text-muted-foreground">{i === 0 ? "Home" : "Away"}</p>
            </div>
            <span
              className="font-display text-3xl font-bold tabular-nums transition-transform group-hover:scale-105"
              style={{
                color: match.status === "upcoming" ? "var(--muted-foreground)" : accent,
                opacity: winner && ((winner === "home" && i === 1) || (winner === "away" && i === 0)) ? 0.55 : 1,
              }}
            >
              {team.score}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="truncate">
          {match.venue} · {match.city}
        </span>
        <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function StatComparison({
  stats,
  accent,
  homeLabel,
  awayLabel,
}: {
  stats: { label: string; home: number; away: number }[];
  accent: string;
  homeLabel: string;
  awayLabel: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>{homeLabel}</span>
        <span className="flex items-center gap-1 text-live">
          <TrendingUp className="size-3.5" /> Head to head
        </span>
        <span>{awayLabel}</span>
      </div>
      {stats.map((s, i) => {
        const total = s.home + s.away || 1;
        const homePct = (s.home / total) * 100;
        return (
          <div key={s.label} style={{ animationDelay: `${i * 70}ms` }} className="animate-fade-up">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold tabular-nums">{s.home}</span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{s.label}</span>
              <span className="font-semibold tabular-nums">{s.away}</span>
            </div>
            <div className="mt-2 flex h-1.5 gap-1 overflow-hidden rounded-full">
              <div className="flex flex-1 justify-end rounded-full bg-muted">
                <div
                  className="h-full origin-right animate-grow-x rounded-full"
                  style={{ width: `${homePct}%`, backgroundColor: accent }}
                />
              </div>
              <div className="flex-1 rounded-full bg-muted">
                <div
                  className="h-full origin-left animate-grow-x rounded-full bg-live"
                  style={{ width: `${100 - homePct}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FormRow({ form }: { form: ("W" | "L" | "D")[] }) {
  return (
    <div className="flex gap-1.5">
      {form.map((f, i) => (
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
  );
}
