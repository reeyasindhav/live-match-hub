import { ArrowRightLeft, CircleAlert, Goal, Info } from "lucide-react";
import type { TimelineEvent } from "@/lib/mock-data";

const iconFor = {
  goal: Goal,
  card: CircleAlert,
  sub: ArrowRightLeft,
  info: Info,
};

const colorFor: Record<TimelineEvent["type"], string> = {
  goal: "text-live bg-live/15",
  card: "text-chart-3 bg-chart-3/15",
  sub: "text-nfl bg-nfl/15",
  info: "text-primary bg-primary/15",
};

export function MatchTimeline({ events, accent }: { events: TimelineEvent[]; accent: string }) {
  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">Timeline will appear once the match kicks off.</p>;
  }
  return (
    <ol className="relative space-y-6">
      <span className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border" aria-hidden />
      {events.map((e, i) => {
        const Icon = iconFor[e.type];
        return (
          <li
            key={`${e.minute}-${e.player}`}
            className="relative flex animate-fade-up items-start gap-4"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className={`z-10 grid size-10 shrink-0 place-items-center rounded-full ${colorFor[e.type]}`}>
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{e.player}</p>
              <p className="text-sm text-muted-foreground">{e.detail}</p>
              <p className="mt-0.5 text-xs text-muted-foreground/70">{e.team}</p>
            </div>
            <span
              className="rounded-lg px-2.5 py-1 text-xs font-bold text-primary-foreground"
              style={{ backgroundColor: accent }}
            >
              {e.minute}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
