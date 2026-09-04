import Link from "next/link";
import { BackNav } from "@/components/BackNav";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: { href: string; label: string };
  backHref?: string;
  backLabel?: string;
  showBack?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
  backHref = "/",
  backLabel = "Voltar para o início",
  showBack = true,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 text-cream">
      <div className="absolute inset-0 mesh-hero" aria-hidden />
      <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full border border-cream/15 float-soft"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full border border-accent/25 pulse-ring"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {showBack ? (
          <div className="fade-up mb-8">
            <BackNav href={backHref} label={backLabel} tone="dark" />
          </div>
        ) : null}

        {eyebrow ? (
          <p className="fade-up text-sm font-semibold uppercase tracking-[0.18em] text-accent-soft">
            {eyebrow}
          </p>
        ) : null}
        <div className="fade-up-delay-1 mt-4 h-1 w-14 origin-left rounded-full bg-accent accent-bar" />
        <h1 className="fade-up-delay-1 mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-balance md:text-5xl">
          {title}
        </h1>
        <p className="fade-up-delay-2 mt-4 max-w-2xl text-lg leading-relaxed text-cream/90 md:text-xl">
          {description}
        </p>
        {cta ? (
          <Link
            href={cta.href}
            className="btn-glow fade-up-delay-3 mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-white"
          >
            {cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
