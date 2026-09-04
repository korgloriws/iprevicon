import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { listServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Serviços",
};

export const revalidate = 300;

export default function ServicosPage() {
  const services = listServices();

  return (
    <>
      <PageHero
        eyebrow="Carta de Serviços"
        title="Serviços ao segurado e ao cidadão"
        description="Consulte benefícios, abra requerimentos e encontre orientações para prova de vida, certidões e simulações."
        cta={{ href: "/area-do-segurado", label: "Ir para Área do Segurado" }}
      />

      <section className="mx-auto max-w-[56rem] px-4 py-12 sm:px-6 lg:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-7">
          {services.map((service) => (
            <article key={service.id} className="border-t border-primary/15 pt-4">
              <h2 className="font-display text-2xl font-semibold text-primary lg:text-xl">{service.title}</h2>
              <p className="mt-2 text-base text-muted sm:text-lg lg:text-sm">{service.description}</p>
              <Link
                href={service.href}
                className="mt-3 inline-flex min-h-11 items-center rounded-full border-2 border-primary/20 bg-white px-4 py-2 text-sm font-bold text-primary transition hover:border-primary/40 hover:bg-cream-muted lg:min-h-10"
              >
                Acessar →
              </Link>
            </article>
          ))}
        </div>

        <div
          id="prova-de-vida"
          className="mt-14 scroll-mt-28 rounded-3xl bg-cream-muted px-5 py-8 sm:px-8 lg:mt-12 lg:py-8"
        >
          <h2 className="font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">Prova de vida</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg lg:text-base">
            Aposentados e pensionistas devem realizar a comprovação anual de vida para manter o
            pagamento do benefício. Leve documento oficial com foto e acompanhe os prazos
            publicados nas notícias do Instituto.
          </p>
        </div>

        <div
          id="ctc"
          className="mt-6 scroll-mt-28 rounded-3xl bg-primary px-5 py-8 text-cream sm:px-8 lg:py-8"
        >
          <h2 className="font-display text-3xl font-semibold lg:text-[1.75rem]">Certidão de Tempo de Contribuição</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/90 sm:text-lg lg:text-base">
            A CTC municipal reúne períodos de contribuição ao RPPS de Contagem. O pedido é feito no
            sistema da Área do Segurado, com anexação dos documentos exigidos.
          </p>
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
