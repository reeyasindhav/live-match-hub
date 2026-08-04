import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Users, Zap } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sportcast" },
      {
        name: "description",
        content: "Learn about Sportcast — our mission, team and the technology powering real-time sports insights.",
      },
      { property: "og:title", content: "About Sportcast" },
      {
        property: "og:description",
        content: "We make live sports data accessible, fast and beautifully presented.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">About Sportcast</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            We build tools that help fans, analysts and teams make sense of live sports — with real-time
            scores, deep statistics and actionable insights across every major league.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-6">
            <Globe className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold">Global Coverage</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              NBA, Premier League, MLB, NFL and NHL — all in one dashboard with live updates and match
              timelines.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <Zap className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold">Real-Time Data</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Scores, stats and play-by-play events stream in as they happen, so you never miss a key
              moment.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <Users className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold">Built for Fans</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Designed by sports fans, for sports fans — with clean UI, smart filters and personalisation
              that matters.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground">
            Sportcast was created to make live sports data more accessible. Too many fans and analysts
            bounce between apps, sites and spreadsheets to get the full picture. We believe the best
            experience is a single, fast, beautiful dashboard — updated in real time, with the depth you
            need when you need it.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
