import Link from "next/link";
import { NewsCarousel } from "@/components/NewsCarousel";
import { Reveal } from "@/components/Reveal";
import { listNews, listServices, type NewsItem, type ServiceItem } from "@/lib/content";

export function HomeHero() {
  return (
    <section className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden text-cream">
      <div className="absolute inset-0 mesh-hero" aria-hidden />
      <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />

      <div
        className="pointer-events-none absolute -right-16 top-8 h-[26rem] w-[26rem] rounded-full border border-cream/20 float-soft"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-16 h-[26rem] w-[26rem] rounded-full border border-accent/30 pulse-ring"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-24 top-40 h-[14rem] w-[14rem] rounded-full border border-cream/15 float-slower"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-16 left-[8%] h-24 w-24 rounded-full bg-accent/20 blur-2xl float-soft"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-6xl flex-col justify-center px-4 py-16 md:px-6 md:py-20">
        <div className="fade-up h-1 w-16 origin-left rounded-full bg-accent accent-bar" />

        <p className="fade-up-delay-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-accent-soft">
          Iprevicon
        </p>
        <h1 className="fade-up-delay-2 mt-3 max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          Instituto de Previdência de Contagem
        </h1>
        <p className="fade-up-delay-3 mt-5 max-w-2xl text-lg leading-relaxed text-cream/90 md:text-xl">
          Previdência municipal com solidez, transparência e acolhimento — para servidores,
          aposentados, pensionistas e cidadãos.
        </p>

        <div className="fade-up-delay-4 mt-10 flex flex-wrap gap-3">
          <Link
            href="/area-do-segurado"
            className="btn-glow inline-flex min-h-12 items-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white"
          >
            Acessar Área do Segurado
          </Link>
          <Link
            href="/transparencia"
            className="inline-flex min-h-12 items-center rounded-full border border-cream/40 bg-cream/10 px-7 py-3.5 text-base font-semibold text-cream backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-cream/20 active:-translate-y-0.5 active:bg-cream/20"
          >
            Portal da Transparência
          </Link>
        </div>

        <div className="fade-up-delay-4 mt-14 hidden items-center gap-3 text-sm text-cream/70 md:flex">
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
      <div className="stagger mx-auto grid max-w-6xl gap-px bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.href} className="h-full">
            <Link
              href={item.href}
              className="group relative flex h-full min-h-[8.5rem] flex-col justify-center overflow-hidden bg-cream px-6 py-8 transition duration-300 hover:bg-cream-muted active:bg-cream-muted"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="absolute inset-x-0 bottom-0 h-0 bg-accent/10 transition-all duration-300 group-hover:h-full group-active:h-full" />
              <span className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-1 group-active:w-1" />
              <p className="relative font-display text-2xl font-semibold text-primary transition-colors group-hover:text-secondary group-active:text-secondary">
                {item.label}
              </p>
              <p className="relative mt-2 min-h-[3rem] text-base leading-snug text-muted">{item.detail}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview({ services }: { services: ServiceItem[] }) {
  return (
    <section className="relative overflow-hidden bg-cream py-20">
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Serviços</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary md:text-4xl">
            O que você encontra no portal
          </h2>
          <p className="mt-4 text-lg text-muted">
            Informações públicas e caminhos claros para os serviços do Instituto.
          </p>
        </Reveal>

        <div className="stagger mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <Reveal key={service.id}>
              <Link
                href={service.href}
                className="group touch-lift block border-t border-primary/15 pt-5 transition duration-300 hover:-translate-y-1 active:-translate-y-1"
              >
                <h3 className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-accent group-active:text-accent">
                  {service.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{service.description}</p>
                <span className="hover-reveal mt-4 text-sm font-semibold text-secondary">
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
    <section className="relative border-y border-primary/10 bg-cream-muted/70 py-20" aria-label="Últimas notícias">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Notícias</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary md:text-4xl">
              Últimas atualizações
            </h2>
          </div>
          <Link
            href="/noticias"
            className="link-underline text-base font-semibold text-secondary hover:text-primary"
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
    <section className="relative overflow-hidden bg-primary py-20 text-cream">
      <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl float-soft"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.2fr_0.8fr] md:px-6">
        <Reveal variant="left">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">
            Institucional
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
            Segurança previdenciária para quem constrói Contagem
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-cream/90">
            O Iprevicon é a unidade gestora do RPPS municipal. Conheça missão, valores, governança
            e o público atendido pelo Instituto.
          </p>
          <Link
            href="/institucional"
            className="mt-8 inline-flex min-h-12 items-center rounded-full border border-cream/30 px-6 py-3 text-base font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-cream/10 active:-translate-y-0.5 active:bg-cream/10"
          >
            Conhecer o Instituto
          </Link>
        </Reveal>
        <div className="stagger grid gap-5 self-center">
          {[
            ["Contribuição", "Servidores e ente alimentam o fundo"],
            ["Gestão", "Investimentos e governança com controle"],
            ["Benefícios", "Aposentadorias e pensões com regularidade"],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <div className="border-l-[3px] border-accent pl-4 transition duration-300 hover:border-accent-soft hover:pl-5 active:border-accent-soft active:pl-5">
                <p className="font-display text-xl font-semibold">{title}</p>
                <p className="mt-1 text-base text-cream/85">{text}</p>
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
