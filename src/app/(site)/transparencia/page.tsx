import type { Metadata } from "next";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Transparência",
};

const itens = [
  {
    category: "Financeiro",
    title: "Receita",
    description: "Demonstrativos de receitas do Instituto.",
  },
  {
    category: "Financeiro",
    title: "Despesa",
    description: "Demonstrativos de despesas do Instituto.",
  },
  {
    category: "Financeiro",
    title: "Execução",
    description: "Execução orçamentária e financeira.",
  },
  {
    category: "Prestação de contas",
    title: "Prestação de contas",
    description: "Documentos de prestação de contas do RPPS.",
  },
];

export default function TransparenciaPage() {
  return (
    <>
      <PageHero
        eyebrow="Acesso à Informação"
        title="Portal da Transparência"
        description="Nesta etapa o portal apresenta os títulos financeiros e a prestação de contas. Os documentos serão publicados conforme disponibilização pelo Instituto."
      />

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6">
        <p className="max-w-3xl text-lg text-muted">
          Estrutura inicial de transparência focada em finanças e prestação de contas. Conteúdo e
          arquivos oficiais estão em construção.
        </p>

        <div className="mt-12 space-y-4">
          {itens.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-4 border-b border-primary/10 py-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {item.category}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-primary md:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted">{item.description}</p>
              </div>
              <span className="inline-flex min-h-12 shrink-0 items-center rounded-full border-2 border-primary/10 px-5 py-2.5 text-base font-medium text-muted">
                Em construção
              </span>
            </article>
          ))}
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
