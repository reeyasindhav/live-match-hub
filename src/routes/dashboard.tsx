import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bell, Settings, Star, TrendingUp, Trophy } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { FormRow, MatchCard } from "@/components/match-card";
import { useAuth } from "@/lib/auth";
import { getTeam, matches, matchesByTeam, news, players, leagueToken } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Dashboard | Sportcast" },
      {
        name: "description",
        content: "Your personalised Sportcast feed: followed teams, live fixtures, alerts and tailored analysis.",
      },
      { property: "og:title", content: "My Dashboard | Sportcast" },
      { property: "og:description", content: "A live feed built around the teams you follow." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, ready, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <SiteShell ticker={false} footer={false}>
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-muted-foreground">
          Loading your dashboard...
        </div>
      </SiteShell>
    );
  }

  const followed = user.favorites.map(getTeam).filter(Boolean) as NonNullable<ReturnType<typeof getTeam>>[];
  const followedMatches = Array.from(
    new Map(followed.flatMap((t) => matchesByTeam(t.id)).map((m) => [m.id, m])).values(),
  );
  const feed = news.filter((n) => followed.some((t) => t.league === n.league)).slice(0, 4);
  const watchlist = players.filter((p) => user.favorites.includes(p.teamId)).slice(0, 5);

  return (
    <SiteShell ticker={false} footer={false}>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-12">
          <div>
            <p className="animate-fade-up text-sm text-muted-foreground">Welcome back</p>
            <h1 className="animate-fade-up font-display text-4xl font-bold capitalize sm:text-5xl">{user.name}</h1>
          </div>
          <Link
            to="/settings"
            className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <Settings className="size-4" />
            Settings
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-8">
          <div className="stagger-children mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Star, label: "Teams followed", value: followed.length, color: "var(--epl)" },
              { icon: TrendingUp, label: "Live now", value: matches.filter((m) => m.status === "live").length, color: "var(--live)" },
              { icon: Trophy, label: "Fixtures tracked", value: followedMatches.length, color: "var(--nba)" },
              { icon: Bell, label: "Alerts today", value: 7, color: "var(--nfl)" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5">
                <s.icon className="size-5" style={{ color: s.color }} />
                <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Your matches</h2>
            <div className="stagger-children mt-5 grid gap-5 sm:grid-cols-2">
              {followedMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
              {followedMatches.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Follow a team to see its fixtures here.{" "}
                  <Link to="/teams" className="text-primary hover:underline">
                    Browse teams
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold">Tailored for you</h2>
            <div className="stagger-children mt-5 grid gap-5 sm:grid-cols-2">
              {feed.map((n) => (
                <article key={n.id} className="glass-card rounded-2xl p-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: leagueToken[n.league] }}
                  >
                    {n.league} · {n.category}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                </article>
              ))}
              {feed.length === 0 && <p className="text-sm text-muted-foreground">No stories for your leagues yet.</p>}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold">Following</h2>
            <ul className="mt-4 space-y-3">
              {followed.map((t) => (
                <li key={t.id} className="flex items-center gap-3">
                  <Link
                    to="/teams/$teamId"
                    params={{ teamId: t.id }}
                    className="flex flex-1 items-center gap-3 hover:text-primary"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-secondary text-lg">{t.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">#{t.standing} · {t.record}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      toggleFavorite(t.id);
                      toast(`Unfollowed ${t.name}`);
                    }}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </li>
              ))}
              {followed.length === 0 && <li className="text-sm text-muted-foreground">Nothing followed yet.</li>}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold">Player watchlist</h2>
            <ul className="mt-4 space-y-2">
              {watchlist.map((p) => (
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
              {watchlist.length === 0 && <li className="text-sm text-muted-foreground">Follow teams to build this.</li>}
            </ul>
          </div>

          {followed[0] && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold">{followed[0].name} form</h2>
              <div className="mt-4">
                <FormRow form={followed[0].form} />
              </div>
            </div>
          )}
        </aside>
      </section>
    </SiteShell>
  );
}
