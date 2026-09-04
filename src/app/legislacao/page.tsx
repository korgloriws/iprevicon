import type { Metadata } from "next";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { listLegislation } from "@/lib/content";

export const metadata: Metadata = {
  title: "Legislação",
};

export const revalidate = 300;

export default function LegislacaoPage() {
  const laws = listLegislation();

  return (
    <>
      <PageHero
        eyebrow="Normas"
        title="Legislação previdenciária"
        description="Principais referências legais do Regime Próprio de Previdência Social e normas internas do Iprevicon."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="space-y-6">
          {laws.map((law) => (
            <article key={law.id} className="border-t border-primary/10 pt-6">
              <h2 className="font-display text-xl font-semibold text-primary md:text-2xl">
                {law.title}
              </h2>
              <p className="mt-2 max-w-3xl text-lg text-muted">{law.detail}</p>
              {law.file_url ? (
                <a
                  href={law.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-12 items-center rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-base font-bold text-primary"
                >
                  Abrir arquivo
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <PageEndNav />
    </>
  );
}
