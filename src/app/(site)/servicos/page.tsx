import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Serviços",
};

const PROVA_DE_VIDA_GOV_URL =
  "https://www.gov.br/governodigital/pt-br/identidade/conta-gov-br/prova-de-vida/";

const services = [
  {
    id: "contracheque",
    title: "Contracheque",
    description:
      "Consulta ao contracheque de aposentadoria ou pensão na Área do Segurado.",
    status: "building" as const,
  },
  {
    id: "prova-de-vida",
    title: "Prova de vida",
    description:
      "Realize a comprovação de vida pelo aplicativo ou pelos canais oficiais do GOV.BR, com reconhecimento facial.",
    status: "external" as const,
    href: PROVA_DE_VIDA_GOV_URL,
    cta: "Acessar Prova de Vida no GOV.BR",
  },
];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Carta de Serviços"
        title="Serviços ao segurado"
        description="Contracheque em construção nesta versão do portal. A Prova de vida já direciona para o canal oficial do GOV.BR."
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
                {service.status === "building" ? (
                  <span className="rounded-full border border-primary/15 bg-cream-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    Em construção
                  </span>
                ) : (
                  <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                    GOV.BR
                  </span>
                )}
              </div>
              <p className="mt-2 text-base text-muted sm:text-lg lg:text-sm">{service.description}</p>
              {service.status === "external" ? (
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 lg:min-h-10"
                >
                  {service.cta}
                </a>
              ) : (
                <span className="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-primary/10 px-4 py-2 text-sm font-medium text-muted lg:min-h-10">
                  Disponível em breve
                </span>
              )}
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
