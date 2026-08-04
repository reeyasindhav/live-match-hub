import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { Clock, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { getNews, leagueToken } from "@/lib/mock-data";

export const Route = createFileRoute("/news/$newsId")({
  loader: ({ params }) => {
    const article = getNews(params.newsId);
    if (!article) throw notFound();
    return { newsId: article.id, title: article.title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Article"} | Sportcast News` },
      {
        name: "description",
        content: `Read ${loaderData?.title ?? "this article"} on Sportcast.`,
      },
      { property: "og:title", content: `${loaderData?.title ?? "Article"} | Sportcast News` },
      {
        property: "og:description",
        content: "In-depth analysis, recaps and insights from the Sportcast newsroom.",
      },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <Link to="/news" className="mt-4 inline-block text-primary hover:underline">
          Back to Newsroom
        </Link>
      </div>
    </SiteShell>
  ),
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const { newsId } = Route.useLoaderData();
  const article = getNews(newsId)!;
  const accent = leagueToken[article.league];

  const related = useMemo(() => {
    return article
      .body.split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);
  }, [article.body]);

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link
            to="/news"
            className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Newsroom
          </Link>
          <div className="mt-6 animate-fade-up">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {article.league} · {article.category}
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{article.author}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {article.readTime}
              </span>
              <span>{article.time}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 sm:p-10">
              <div className="prose prose-invert max-w-none">
                {related.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between rounded-2xl border border-border bg-surface/40 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Written by {article.author}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {article.league} · {article.category}
                  </p>
                </div>
                <button
                  onClick={() => {
                    toast.success("Article link copied to clipboard");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  <Share2 className="size-4" /> Share
                </button>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold">Article details</h3>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ["Category", article.category],
                  ["League", article.league],
                  ["Author", article.author],
                  ["Read time", article.readTime],
                  ["Published", article.time],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold">More from the newsroom</h3>
              <div className="mt-4">
                <Link
                  to="/news"
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Browse all articles →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
