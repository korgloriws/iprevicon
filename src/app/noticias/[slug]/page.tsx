import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackNav } from "@/components/BackNav";
import { formatDate, getNewsBySlug, listNews } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export function generateStaticParams() {
  return listNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  return { title: item?.title ?? "Notícia" };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = listNews(4).filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <div className="flex flex-wrap gap-3">
        <BackNav href="/noticias" label="Voltar para as notícias" />
        <BackNav href="/" label="Voltar para o início" />
      </div>

      <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-accent">
        {item.category} · {formatDate(item.published_at)}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary text-balance">
        {item.title}
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 ? (
        <aside className="mt-14 border-t border-primary/10 pt-8">
          <h2 className="font-display text-2xl font-semibold text-primary">Outras notícias</h2>
          <ul className="mt-4 space-y-3">
            {related.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/noticias/${n.slug}`}
                  className="inline-flex min-h-12 w-full items-center rounded-2xl border-2 border-primary/10 bg-white px-4 py-3 text-base font-semibold text-primary transition hover:border-primary/30 hover:bg-cream-muted"
                >
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="mt-12 flex flex-wrap gap-3 border-t border-primary/10 pt-8">
        <BackNav href="/noticias" label="Voltar para as notícias" />
        <BackNav href="/" label="Voltar para o início" />
      </div>
    </article>
  );
}
