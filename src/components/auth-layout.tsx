import { Link, useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) navigate({ to: "/dashboard", replace: true });
  }, [ready, user, navigate]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hero-glow relative hidden flex-col justify-between border-r border-border p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Zap className="size-5" />
          </span>
          <span className="font-display text-xl font-bold">Sportcast</span>
        </Link>
        <div className="animate-fade-up">
          <h2 className="max-w-md font-display text-4xl font-bold leading-tight">
            Every score, stat and storyline. One dashboard.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Follow your teams, get live timelines and personalised insight the moment the whistle goes.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["1.2M", "Fans"],
              ["50K+", "Matches"],
              ["150+", "Leagues"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-surface/60 p-4">
                <p className="font-display text-2xl font-bold text-primary">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Demo experience · no real credentials required</p>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm animate-fade-up">
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Zap className="size-5" />
            </span>
            <span className="font-display text-xl font-bold">Sportcast</span>
          </Link>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
