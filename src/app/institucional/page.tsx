import type { Metadata } from "next";
import Link from "next/link";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Institucional",
  description:
    "Conheça o Iprevicon — missão, governança, público atendido e o papel do Instituto na previdência municipal de Contagem.",
};

const valores = [
  {
    title: "Transparência",
    text: "Demonstrativos, normas e canais abertos para o controle social da gestão previdenciária.",
  },
  {
    title: "Acolhimento",
    text: "Linguagem clara e caminhos simples — especialmente para quem precisa de atendimento presencial ou digital.",
  },
  {
    title: "Solidez",
    text: "Gestão técnica das contribuições e dos benefícios, com foco no equilíbrio do RPPS no longo prazo.",
  },
  {
    title: "Responsabilidade",
    text: "Prestação de contas perante servidores, conselhos, Tribunal de Contas e a sociedade.",
  },
];

const publico = [
  {
    title: "Servidores ativos",
    text: "Quem contribui hoje e consulta informações, simulações e orientações sobre o RPPS.",
  },
  {
    title: "Aposentados",
    text: "Quem recebe benefício e acompanha prazos como prova de vida, holerite e comunicados oficiais.",
  },
  {
    title: "Pensionistas",
    text: "Dependentes com direito a pensão, com acesso a orientações e atendimento institucional.",
  },
  {
    title: "Cidadãos e controle social",
    text: "Qualquer pessoa pode consultar transparência, legislação e canais da Ouvidoria e do SIC.",
  },
];

const governanca = [
  {
    title: "Diretoria executiva",
    text: "Conduz a operação do Instituto: benefícios, arrecadação, finanças e atendimento ao segurado.",
  },
  {
    title: "Conselho Deliberativo",
    text: "Órgão de deliberação superior, com participação na definição de diretrizes da gestão.",
  },
  {
    title: "Conselho Fiscal",
    text: "Acompanha a regularidade contábil e financeira do Regime Próprio.",
  },
  {
    title: "Comitê de Investimentos",
    text: "Orienta e acompanha a aplicação dos recursos do fundo previdenciário.",
  },
];

const caminhos = [
  {
    href: "/transparencia",
    label: "Portal da Transparência",
    detail: "Demonstrativos e documentos públicos do RPPS",
  },
  {
    href: "/servicos",
    label: "Carta de Serviços",
    detail: "O que o Instituto oferece e como solicitar",
  },
  {
    href: "/legislacao",
    label: "Legislação",
    detail: "Normas que regem a previdência municipal",
  },
  {
    href: "/contato",
    label: "Contato e Ouvidoria",
    detail: "Fale conosco, SIC e atendimento",
  },
];

export default function InstitucionalPage() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Quem somos"
        description="O Iprevicon é a unidade gestora do Regime Próprio de Previdência Social de Contagem. Aqui você conhece a identidade do Instituto e o papel da previdência municipal na vida de servidores, aposentados, pensionistas e da sociedade."
        cta={{ href: "/transparencia", label: "Ver transparência" }}
      />

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6 lg:py-12">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">O Instituto</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
            Por que o Iprevicon existe
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Todo município com Regime Próprio precisa de uma unidade gestora para administrar
            contribuições, conceder e manter benefícios, investir com responsabilidade e prestar
            contas à sociedade. O Iprevicon cumpre esse papel em Contagem — e este portal é a face
            pública dessa gestão.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Nesta página você encontra o contexto institucional do Instituto: missão, valores,
            governança e os caminhos oficiais para serviços e documentos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-primary/10 pt-12 md:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold text-primary lg:text-xl">Missão</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Assegurar a proteção previdenciária dos servidores públicos municipais e de seus
              dependentes, com gestão técnica, ética e transparente dos recursos do RPPS.
            </p>
          </Reveal>
          <Reveal>
            <h3 className="font-display text-2xl font-semibold text-primary lg:text-xl">Visão</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Ser referência em acolhimento e solidez institucional, aproximando a previdência
              municipal de quem depende dela no dia a dia — com informação clara e canais acessíveis.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-cream-muted/60 py-16 lg:py-12">
        <div className="mx-auto max-w-[56rem] px-4 md:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Valores</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              O que orienta a nossa atuação
            </h2>
          </Reveal>
          <div className="stagger mt-12 grid gap-8 sm:grid-cols-2">
            {valores.map((item) => (
              <Reveal key={item.title}>
                <article className="border-t-[3px] border-accent pt-5">
                  <h3 className="font-display text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6 lg:py-12">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Público</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
            Para quem o Instituto trabalha
          </h2>
          <p className="mt-4 text-lg text-muted">
            O portal atende perfis diferentes — cada um encontra um caminho adequado no menu.
          </p>
        </Reveal>
        <div className="stagger mt-12 grid gap-8 md:grid-cols-2">
          {publico.map((item) => (
            <Reveal key={item.title}>
              <article className="border-t border-primary/15 pt-5">
                <h3 className="font-display text-xl font-semibold text-secondary">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-16 text-cream lg:py-12">
        <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />
        <div className="relative mx-auto max-w-[56rem] px-4 md:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">
              Governança
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold lg:text-[1.75rem]">
              Estrutura que sustenta o RPPS
            </h2>
            <p className="mt-4 text-lg text-cream/90">
              A boa gestão previdenciária combina execução diária com conselhos e comitês de
              acompanhamento — modelo alinhado às práticas de governança dos RPPS.
            </p>
          </Reveal>
          <div className="stagger mt-12 grid gap-6 sm:grid-cols-2">
            {governanca.map((item) => (
              <Reveal key={item.title}>
                <article className="border-l-[3px] border-accent pl-5">
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm text-cream/70">
            Organograma, composição dos conselhos e atas oficiais serão publicados nesta seção
            conforme disponibilização pelo Instituto.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[56rem] px-4 py-16 md:px-6 lg:py-12">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Acesso rápido</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
            Serviços e informações públicas
          </h2>
          <p className="mt-4 text-lg text-muted">
            Explore os canais oficiais do Iprevicon para documentos, serviços e atendimento.
          </p>
        </Reveal>
        <div className="stagger mt-12 grid gap-4 sm:grid-cols-2">
          {caminhos.map((item) => (
            <Reveal key={item.href}>
              <Link
                href={item.href}
                className="group touch-lift flex min-h-[5.5rem] flex-col justify-center border-t border-primary/15 pt-5 transition duration-300 hover:-translate-y-0.5 active:-translate-y-0.5"
              >
                <span className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-accent group-active:text-accent">
                  {item.label}
                </span>
                <span className="mt-1 text-base text-muted">{item.detail}</span>
                <span className="hover-reveal mt-3 text-sm font-semibold text-secondary">
                  Acessar →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <PageEndNav extra={{ href: "/servicos", label: "Ir para Serviços" }} />
    </>
  );
}
