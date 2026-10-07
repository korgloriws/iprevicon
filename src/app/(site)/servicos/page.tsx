import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Serviços",
};

const services = [
  {
    id: "contracheque",
    title: "Contracheque",
    description:
      "Consulta ao contracheque de aposentadoria ou pensão na Área do Segurado.",
  },
  {
    id: "prova-de-vida",
    title: "Prova de vida",
    description:
      "Comprovação anual de vida para manutenção do pagamento do benefício.",
  },
];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Carta de Serviços"
        title="Serviços ao segurado"
        description="Por enquanto disponibilizamos os canais de Contracheque e Prova de vida. Ambos estão em construção nesta versão do portal."
        cta={{ href: "/area-do-segurado", label: "Ir para Área do Segurado" }}
      />

      <section className="mx-auto max-w-[56rem] px-4 py-12 sm:px-6 lg:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-7">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-28 border-t border-primary/15 pt-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-semibold text-primary lg:text-xl">
                  {service.title}
                </h2>
                <span className="rounded-full border border-primary/15 bg-cream-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                  Em construção
                </span>
              </div>
              <p className="mt-2 text-base text-muted sm:text-lg lg:text-sm">{service.description}</p>
              <span className="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-primary/10 px-4 py-2 text-sm font-medium text-muted lg:min-h-10">
                Disponível em breve
              </span>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-base text-muted">
          Outros serviços do Instituto serão publicados nesta página conforme liberação. Enquanto
          isso, acompanhe comunicados em{" "}
          <Link href="/noticias" className="font-semibold text-secondary hover:text-primary">
            Notícias
          </Link>{" "}
          ou fale com a{" "}
          <Link href="/ouvidoria" className="font-semibold text-secondary hover:text-primary">
            Ouvidoria
          </Link>
          .
        </p>
      </section>
      <PageEndNav />
    </>
  );
}
