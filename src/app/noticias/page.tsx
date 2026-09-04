import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { formatDate, listNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notícias",
};

export const revalidate = 300;

export default function NoticiasPage() {
  const news = listNews();

  return (
    <>
      <PageHero
        eyebrow="Comunicados"
        title="Notícias e avisos"
        description="Acompanhe comunicados oficiais, prazos de prova de vida e atualizações da gestão previdenciária."
      />

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6">
        <div className="space-y-10">
          {news.map((item) => (
            <article key={item.slug} className="border-t border-primary/10 pt-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {item.category} · {formatDate(item.published_at)}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-primary lg:text-xl">
                {item.title}
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-muted">{item.excerpt}</p>
              <Link
                href={`/noticias/${item.slug}`}
                className="mt-4 inline-flex min-h-12 items-center rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-base font-bold text-primary transition hover:border-primary/40 hover:bg-cream-muted"
              >
                Ler notícia completa →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
