import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Institucional",
  description:
    "Conheça o Iprevicon — história, missão, valores e o papel do Instituto na previdência municipal de Contagem.",
};

const secoes = [
  {
    id: "historia-previcon",
    eyebrow: "Origem",
    title: "História do PREVICON",
  },
  {
    id: "mudanca-iprevicon",
    eyebrow: "Transição",
    title: "Mudança para IPREVICON",
  },
  {
    id: "para-que-existe",
    eyebrow: "Propósito",
    title: "Para que o Iprevicon existe",
  },
  {
    id: "para-quem-trabalha",
    eyebrow: "Público",
    title: "Para quem o Iprevicon trabalha",
  },
  {
    id: "codigo-de-etica",
    eyebrow: "Conduta",
    title: "Código de Ética",
  },
];

const identidade = [
  { id: "missao", title: "Missão" },
  { id: "valor", title: "Valor" },
  { id: "visao", title: "Visão" },
];

function EmConstrucao() {
  return (
    <p className="mt-4 inline-flex items-center rounded-full border border-primary/15 bg-cream-muted px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted">
      Conteúdo em construção
    </p>
  );
}

export default function InstitucionalPage() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Quem somos"
        description="Estrutura institucional do Iprevicon conforme a organização do Instituto. Os textos oficiais serão publicados nesta página conforme disponibilização."
        cta={{ href: "/transparencia", label: "Ver transparência" }}
      />

      {secoes.map((secao) => (
        <section
          key={secao.id}
          id={secao.id}
          className="scroll-mt-28 border-b border-primary/10"
        >
          <div className="mx-auto max-w-[56rem] px-4 py-14 md:px-6 lg:py-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {secao.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
                {secao.title}
              </h2>
              <EmConstrucao />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="border-b border-primary/10 bg-cream-muted/60 py-14 lg:py-12">
        <div className="mx-auto max-w-[56rem] px-4 md:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Identidade
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              Missão, valor e visão
            </h2>
          </Reveal>
          <div className="stagger mt-10 grid gap-8 md:grid-cols-3">
            {identidade.map((item) => (
              <Reveal key={item.id}>
                <article id={item.id} className="scroll-mt-28 border-t-[3px] border-accent pt-5">
                  <h3 className="font-display text-xl font-semibold text-primary">{item.title}</h3>
                  <EmConstrucao />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[56rem] px-4 py-14 md:px-6 lg:py-12">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Acesso rápido</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
            Outros canais do portal
          </h2>
        </Reveal>
        <div className="stagger mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/transparencia", label: "Transparência", detail: "Receitas, despesas e prestação de contas" },
            { href: "/servicos", label: "Serviços", detail: "Contracheque e prova de vida" },
            { href: "/legislacao", label: "Legislação", detail: "Normas do RPPS e do Instituto" },
            { href: "/ouvidoria", label: "Ouvidoria", detail: "WhatsApp e formulário de satisfação" },
          ].map((item) => (
            <Reveal key={item.href}>
              <Link
                href={item.href}
                className="group touch-lift flex min-h-[5.5rem] flex-col justify-center border-t border-primary/15 pt-5 transition duration-300 hover:-translate-y-0.5"
              >
                <span className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                  {item.label}
                </span>
                <span className="mt-1 text-base text-muted">{item.detail}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <PageEndNav extra={{ href: "/servicos", label: "Ir para Serviços" }} />
    </>
  );
}
