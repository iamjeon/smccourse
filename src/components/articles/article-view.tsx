import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, GraduationCap } from "lucide-react";
import type { Article } from "@/content/articles";
import { getArticle } from "@/content/articles";
import { getLesson } from "@/content/course";
import { getGlossaryTerm, plainTermName } from "@/content/glossary";

export function ArticleView({ article }: { article: Article }) {
  const lesson = article.lessonSlug ? getLesson(article.lessonSlug) : undefined;
  const glossary = (article.glossarySlugs ?? [])
    .map((s) => ({ slug: s, term: getGlossaryTerm(s) }))
    .filter((x) => x.term);
  const guides = (article.relatedGuides ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is Article => Boolean(a));

  const updated = new Date(article.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All guides
      </Link>

      <header className="mt-3 border-b border-border pb-5">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" />
            {article.readMinutes} min read
          </span>
          <span>Updated {updated}</span>
        </div>
      </header>

      <div className="mt-6 space-y-5">
        {article.body.map((block, i) => {
          switch (block.type) {
            case "h2":
              return (
                <h2 key={i} className="mt-8 font-display text-xl font-semibold tracking-tight">
                  {block.text}
                </h2>
              );
            case "list":
              return (
                <ul key={i} className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {block.items.map((it, j) => (
                    <li key={j} className="leading-relaxed">
                      {it}
                    </li>
                  ))}
                </ul>
              );
            case "callout":
              return (
                <p
                  key={i}
                  className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-base font-medium leading-relaxed"
                >
                  {block.text}
                </p>
              );
            default:
              return (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
              );
          }
        })}
      </div>

      {/* Free-course CTA */}
      {lesson && (
        <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-sm font-medium text-muted-foreground">
            Learn this in full, free, with interactive charts:
          </p>
          <Link
            href={`/learn/${article.lessonSlug}`}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <GraduationCap className="size-4" />
            {lesson.title.en}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}

      {/* Related glossary terms */}
      {glossary.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Key terms
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {glossary.map(({ slug, term }) => (
              <Link
                key={slug}
                href={`/tools/glossary/${slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {plainTermName(term!.term)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related guides */}
      {guides.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Keep reading
          </h2>
          <ul className="mt-3 space-y-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {g.title}
                  <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
