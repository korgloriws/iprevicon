import Link from "next/link";
import { NewsCarousel } from "@/components/NewsCarousel";
import { Reveal } from "@/components/Reveal";
import { listNews, listServices, type NewsItem, type ServiceItem } from "@/lib/content";

export function HomeHero() {
  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden text-cream lg:min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 mesh-hero" aria-hidden />
      <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />

      <div
        className="pointer-events-none absolute -right-16 top-8 h-[26rem] w-[26rem] rounded-full border border-cream/20 float-soft lg:h-[20rem] lg:w-[20rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-16 h-[26rem] w-[26rem] rounded-full border border-accent/30 pulse-ring lg:h-[20rem] lg:w-[20rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-24 top-40 h-[14rem] w-[14rem] rounded-full border border-cream/15 float-slower lg:h-40 lg:w-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-16 left-[8%] h-24 w-24 rounded-full bg-accent/20 blur-2xl float-soft"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-[56rem] flex-col justify-center px-4 py-14 sm:px-6 lg:min-h-[calc(100vh-4rem)] lg:py-12">
        <div className="fade-up h-1 w-14 origin-left rounded-full bg-accent accent-bar lg:w-12" />

        <p className="fade-up-delay-1 mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-soft lg:mt-4">
          Iprevicon
        </p>
        <h1 className="fade-up-delay-2 mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-4xl lg:text-[2.125rem] lg:leading-snug">
          Instituto de Previdência de Contagem
        </h1>
        <p className="fade-up-delay-3 mt-4 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg lg:mt-3 lg:text-base">
          Previdência municipal com solidez, transparência e acolhimento — para servidores,
          aposentados, pensionistas e cidadãos.
        </p>

        <div className="fade-up-delay-4 mt-8 flex flex-wrap gap-3 lg:mt-7">
          <Link
            href="/area-do-segurado"
            className="btn-glow inline-flex min-h-12 items-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white lg:min-h-10 lg:px-5 lg:py-2.5 lg:text-sm"
          >
            Acessar Área do Segurado
          </Link>
          <Link
            href="/transparencia"
            className="inline-flex min-h-12 items-center rounded-full border border-cream/40 bg-cream/10 px-6 py-3 text-base font-semibold text-cream backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-cream/20 active:-translate-y-0.5 active:bg-cream/20 lg:min-h-10 lg:px-5 lg:py-2.5 lg:text-sm"
          >
            Portal da Transparência
          </Link>
        </div>

        <div className="fade-up-delay-4 mt-12 hidden items-center gap-3 text-sm text-cream/70 lg:mt-10 lg:flex">
          <span className="h-px w-10 bg-cream/40 shimmer-line origin-left" />
          Role para conhecer os serviços
        </div>
      </div>
    </section>
  );
}

export function QuickAccess() {
  const items = [
    { href: "/area-do-segurado", label: "Meu holerite", detail: "Contracheque no sistema do segurado" },
    { href: "/servicos#prova-de-vida", label: "Prova de vida", detail: "Prazos e o que levar" },
    { href: "/transparencia", label: "Transparência", detail: "Documentos públicos do RPPS" },
    { href: "/contato", label: "Fale conosco", detail: "Ouvidoria e SIC" },
  ];

  return (
    <section className="border-b border-primary/10 bg-cream" aria-label="Acesso rápido">
      <div className="stagger mx-auto grid max-w-[56rem] gap-px bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.href} className="h-full">
            <Link
              href={item.href}
              className="group relative flex h-full min-h-[8.5rem] flex-col justify-center overflow-hidden bg-cream px-5 py-7 transition duration-300 hover:bg-cream-muted active:bg-cream-muted lg:min-h-[6.75rem] lg:px-4 lg:py-5"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="absolute inset-x-0 bottom-0 h-0 bg-accent/10 transition-all duration-300 group-hover:h-full group-active:h-full" />
              <span className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-1 group-active:w-1" />
              <p className="relative font-display text-2xl font-semibold text-primary transition-colors group-hover:text-secondary group-active:text-secondary lg:text-xl">
                {item.label}
              </p>
              <p className="relative mt-2 min-h-[2.75rem] text-base leading-snug text-muted lg:min-h-0 lg:text-sm">
                {item.detail}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview({ services }: { services: ServiceItem[] }) {
  return (
    <section className="relative overflow-hidden bg-cream py-14 lg:py-12">
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[56rem] px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Serviços</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
            O que você encontra no portal
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg lg:text-base">
            Informações públicas e caminhos claros para os serviços do Instituto.
          </p>
        </Reveal>

        <div className="stagger mt-10 grid gap-7 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          {services.slice(0, 6).map((service) => (
            <Reveal key={service.id}>
              <Link
                href={service.href}
                className="group touch-lift block border-t border-primary/15 pt-4 transition duration-300 hover:-translate-y-1 active:-translate-y-1"
              >
                <h3 className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-accent group-active:text-accent lg:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted lg:text-sm">{service.description}</p>
                <span className="hover-reveal mt-3 text-sm font-semibold text-secondary">
                  Acessar →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsPreview({ news }: { news: NewsItem[] }) {
  return (
    <section className="relative border-y border-primary/10 bg-cream-muted/70 py-14 lg:py-12" aria-label="Últimas notícias">
      <div className="mx-auto max-w-[56rem] px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Notícias</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              Últimas atualizações
            </h2>
          </div>
          <Link
            href="/noticias"
            className="link-underline text-base font-semibold text-secondary hover:text-primary lg:text-sm"
          >
            Ver todas
          </Link>
        </Reveal>

        <NewsCarousel news={news} />
      </div>
    </section>
  );
}

export function AboutStrip() {
  return (
    <section className="relative overflow-hidden bg-primary py-14 text-cream lg:py-12">
      <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl float-soft"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[56rem] gap-8 px-4 md:grid-cols-[1.2fr_0.8fr] sm:px-6 lg:gap-8">
        <Reveal variant="left">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">
            Institucional
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold lg:text-[1.75rem]">
            Segurança previdenciária para quem constrói Contagem
          </h2>
          <p className="mt-4 max-w-xl text-base text-cream/90 sm:text-lg lg:text-base">
            O Iprevicon é a unidade gestora do RPPS municipal. Conheça missão, valores, governança
            e o público atendido pelo Instituto.
          </p>
          <Link
            href="/institucional"
            className="mt-6 inline-flex min-h-12 items-center rounded-full border border-cream/30 px-5 py-2.5 text-base font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-cream/10 active:-translate-y-0.5 active:bg-cream/10 lg:min-h-10 lg:text-sm"
          >
            Conhecer o Instituto
          </Link>
        </Reveal>
        <div className="stagger grid gap-4 self-center">
          {[
            ["Contribuição", "Servidores e ente alimentam o fundo"],
            ["Gestão", "Investimentos e governança com controle"],
            ["Benefícios", "Aposentadorias e pensões com regularidade"],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <div className="border-l-[3px] border-accent pl-4 transition duration-300 hover:border-accent-soft hover:pl-5 active:border-accent-soft active:pl-5">
                <p className="font-display text-xl font-semibold lg:text-lg">{title}</p>
                <p className="mt-1 text-base text-cream/85 lg:text-sm">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function loadHomeData() {
  return {
    news: listNews(6),
    services: listServices(),
  };
}
