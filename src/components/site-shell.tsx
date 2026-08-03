import { Link, useNavigate } from "@tanstack/react-router";
import { Activity, Home, LogOut, Menu, Newspaper, Search, Users, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { matches, leagueToken } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/live", label: "Live", icon: Zap },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/news", label: "News", icon: Newspaper },
];

function Ticker() {
  const items = matches.filter((m) => m.status !== "upcoming");
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface/60">
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-background/95 px-4 text-xs font-semibold tracking-[0.2em] text-live">
        <Activity className="size-4 animate-pulse-live rounded-full" />
        LIVE NOW
      </div>
      <div className="flex w-max animate-marquee gap-8 py-3 pl-40">
        {row.map((m, i) => (
          <Link
            key={`${m.id}-${i}`}
            to="/matches/$matchId"
            params={{ matchId: m.id }}
            className="flex shrink-0 items-center gap-3 text-sm transition-opacity hover:opacity-80"
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: leagueToken[m.league] }}
            >
              {m.league}
            </span>
            <span className="font-semibold">{m.home.short}</span>
            <span
              className="rounded-md px-2 py-0.5 text-xs font-bold text-primary-foreground"
              style={{ backgroundColor: leagueToken[m.league] }}
            >
              {m.home.score}
            </span>
            <span className="text-xs text-muted-foreground">vs</span>
            <span
              className="rounded-md px-2 py-0.5 text-xs font-bold text-primary-foreground"
              style={{ backgroundColor: leagueToken[m.league] }}
            >
              {m.away.score}
            </span>
            <span className="font-semibold">{m.away.short}</span>
            <span className="text-xs text-muted-foreground">{m.clock}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteShell({ children, ticker = true }: { children: ReactNode; ticker?: boolean }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)]">
              <Zap className="size-5" />
            </span>
            <span className="font-display text-xl font-bold">Sportcast</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ to: "/live" })}
              className="hidden items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:flex"
            >
              <Search className="size-4" />
              Search...
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/60"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden capitalize sm:inline">{user.name}</span>
                </Link>
                <button
                  aria-label="Sign out"
                  onClick={() => {
                    signOut();
                    navigate({ to: "/" });
                  }}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Sign up
                </Link>
              </div>
            )}
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg border border-border md:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
        {open && (
          <nav className="animate-fade-up border-t border-border bg-surface px-4 py-3 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {ticker && <Ticker />}

      <main>{children}</main>

      <footer className="mt-20 border-t border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" />
              </span>
              <span className="font-display text-lg font-bold">Sportcast</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Live scores, deep stats and match insight across every league — in one place.
            </p>
          </div>
          {[
            { title: "Product", links: ["Live scores", "Match analysis", "Team hubs", "Player profiles"] },
            { title: "Leagues", links: ["NBA", "Premier League", "MLB", "NFL"] },
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l} className="cursor-pointer transition-colors hover:text-foreground">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © 2026 Sportcast. All scores shown are demo data.
        </div>
      </footer>
    </div>
  );
}

export function LeaguePill({ league, className }: { league: keyof typeof leagueToken; className?: string }) {
  return (
    <span
      className={cn("text-[10px] font-bold uppercase tracking-[0.15em]", className)}
      style={{ color: leagueToken[league] }}
    >
      {league}
    </span>
  );
}
