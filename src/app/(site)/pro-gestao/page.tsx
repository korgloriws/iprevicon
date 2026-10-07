import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { countProGestaoDocsByTopic } from "@/lib/content";
import { PRO_GESTAO_TOPICS } from "@/lib/pro-gestao";

export const metadata: Metadata = {
  title: "Pro Gestão",
  description:
    "Documentos de governança do Iprevicon — conselhos, comitês, regularidade, educação previdenciária e código de ética.",
};

export const revalidate = 300;

export default function ProGestaoPage() {
  const counts = countProGestaoDocsByTopic();

  return (
    <>
      <PageHero
        eyebrow="Governança"
        title="Pro Gestão"
        description="Acesse os documentos por tópico: conselhos, comitês, calendário, regularidade, governança, educação previdenciária e código de ética."
      />

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6">
        <p className="max-w-3xl text-lg text-muted">
          Selecione um tópico para ver os arquivos publicados. Os documentos são enviados pelo painel
          administrativo, no mesmo modelo de Transparência e Notícias.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRO_GESTAO_TOPICS.map((topic) => {
            const count = counts[topic.slug] ?? 0;
            return (
              <Link
                key={topic.slug}
                href={`/pro-gestao/${topic.slug}`}
                className="group flex min-h-[7.5rem] flex-col justify-between border-t border-primary/15 pt-5 transition duration-300 hover:-translate-y-0.5"
              >
                <div>
                  <h2 className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-accent md:text-2xl">
                    {topic.title}
                  </h2>
                  <p className="mt-2 text-base text-muted">{topic.description}</p>
                </div>
                <p className="mt-4 text-sm font-semibold text-secondary">
                  {count === 0
                    ? "Nenhum arquivo ainda →"
                    : count === 1
                      ? "1 arquivo →"
                      : `${count} arquivos →`}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
