import type { Metadata } from "next";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { formatDate, listTransparencyDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Transparência",
};

export const revalidate = 300;

export default function TransparenciaPage() {
  const docs = listTransparencyDocs();

  return (
    <>
      <PageHero
        eyebrow="Acesso à Informação"
        title="Portal da Transparência"
        description="Demonstrativos obrigatórios do RPPS, finanças, governança e documentos públicos do Iprevicon. Dados públicos — sem necessidade de login."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <p className="max-w-3xl text-lg text-muted">
          Em conformidade com a legislação dos Regimes Próprios e com a Lei de Acesso à Informação,
          disponibilizamos os principais instrumentos de prestação de contas. Os registros vêm do
          banco local do portal e aceitam URL de arquivo quando o documento estiver publicado.
        </p>

        <div className="mt-12 space-y-4">
          {docs.map((doc) => (
            <article
              key={doc.id}
              className="flex flex-col gap-4 border-b border-primary/10 py-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {doc.category}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-primary md:text-2xl">
                  {doc.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted">{doc.description}</p>
                <p className="mt-2 text-sm text-muted">Atualizado em {formatDate(doc.updated_at)}</p>
              </div>
              {doc.file_url ? (
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 shrink-0 items-center rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-base font-bold text-primary transition hover:bg-cream-muted"
                >
                  Abrir documento
                </a>
              ) : (
                <span className="inline-flex min-h-12 shrink-0 items-center rounded-full border-2 border-primary/10 px-5 py-2.5 text-base font-medium text-muted">
                  Documento em breve
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
