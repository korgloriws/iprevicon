import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { formatDate, listProGestaoDocs } from "@/lib/content";
import { getProGestaoTopic } from "@/lib/pro-gestao";
import { withBasePath } from "@/lib/paths";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getProGestaoTopic(slug);
  if (!topic) return { title: "Pro Gestão" };
  return {
    title: `${topic.title} · Pro Gestão`,
    description: topic.description,
  };
}

export default async function ProGestaoTopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getProGestaoTopic(slug);
  if (!topic) notFound();

  const docs = listProGestaoDocs(slug);

  return (
    <>
      <PageHero
        eyebrow="Pro Gestão"
        title={topic.title}
        description={topic.description}
        backHref="/pro-gestao"
        backLabel="Voltar para Pro Gestão"
      />

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6">
        {docs.length === 0 ? (
          <div className="rounded-3xl bg-cream-muted px-6 py-10">
            <p className="text-lg text-muted">
              Ainda não há arquivos publicados neste tópico. Assim que forem enviados pelo painel,
              aparecerão aqui para download.
            </p>
            <Link
              href="/pro-gestao"
              className="mt-6 inline-flex min-h-11 items-center rounded-full border-2 border-primary/20 bg-white px-5 text-sm font-bold text-primary"
            >
              Ver outros tópicos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {docs.map((doc) => (
              <article
                key={doc.id}
                className="flex flex-col gap-4 border-b border-primary/10 py-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h2 className="font-display text-xl font-semibold text-primary md:text-2xl">
                    {doc.title}
                  </h2>
                  {doc.descriptionHtml ? (
                    <div
                      className="rich-content mt-2 max-w-2xl text-base text-muted"
                      dangerouslySetInnerHTML={{ __html: doc.descriptionHtml }}
                    />
                  ) : null}
                  <p className="mt-2 text-sm text-muted">Atualizado em {formatDate(doc.updated_at)}</p>
                </div>
                {doc.file_url ? (
                  <a
                    href={withBasePath(doc.file_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 shrink-0 items-center rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-base font-bold text-primary transition hover:bg-cream-muted"
                  >
                    Abrir arquivo
                  </a>
                ) : (
                  <span className="inline-flex min-h-12 shrink-0 items-center rounded-full border-2 border-primary/10 px-5 py-2.5 text-base font-medium text-muted">
                    Sem arquivo
                  </span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
      <PageEndNav extra={{ href: "/pro-gestao", label: "Voltar para Pro Gestão" }} />
    </>
  );
}
