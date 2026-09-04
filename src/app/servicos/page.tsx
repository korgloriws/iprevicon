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

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="border-t border-primary/15 pt-5">
              <h2 className="font-display text-2xl font-semibold text-primary">{service.title}</h2>
              <p className="mt-3 text-lg text-muted">{service.description}</p>
              <Link
                href={service.href}
                className="mt-4 inline-flex min-h-12 items-center rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-base font-bold text-primary transition hover:border-primary/40 hover:bg-cream-muted"
              >
                Acessar →
              </Link>
            </article>
          ))}
        </div>

        <div
          id="prova-de-vida"
          className="mt-20 scroll-mt-28 rounded-3xl bg-cream-muted px-6 py-10 md:px-10"
        >
          <h2 className="font-display text-3xl font-semibold text-primary">Prova de vida</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            Aposentados e pensionistas devem realizar a comprovação anual de vida para manter o
            pagamento do benefício. Leve documento oficial com foto e acompanhe os prazos
            publicados nas notícias do Instituto.
          </p>
        </div>

        <div
          id="ctc"
          className="mt-8 scroll-mt-28 rounded-3xl bg-primary px-6 py-10 text-cream md:px-10"
        >
          <h2 className="font-display text-3xl font-semibold">Certidão de Tempo de Contribuição</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-cream/90">
            A CTC municipal reúne períodos de contribuição ao RPPS de Contagem. O pedido é feito no
            sistema da Área do Segurado, com anexação dos documentos exigidos.
          </p>
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
