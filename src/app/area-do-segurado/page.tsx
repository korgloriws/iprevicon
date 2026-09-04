import type { Metadata } from "next";
import Link from "next/link";
import { BackNav } from "@/components/BackNav";
import { getSetting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Área do Segurado",
};

export const revalidate = 300;

export default function AreaDoSeguradoPage() {
  const systemUrl = process.env.SEGURADO_SYSTEM_URL || getSetting("segurado_system_url");
  const systemName =
    process.env.SEGURADO_SYSTEM_NAME || getSetting("segurado_system_name", "Sistema do Segurado");
  const hasIntegration = Boolean(systemUrl);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream to-cream-muted">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="fade-up mb-8">
          <BackNav href="/" label="Voltar para o início" />
        </div>

        <div className="fade-up max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Serviços autenticados
          </p>
          <div className="mt-4 h-1 w-14 origin-left rounded-full bg-accent accent-bar" />
          <h1 className="mt-5 font-display text-4xl font-semibold text-primary md:text-5xl">
            Área do Segurado
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Holerite, protocolos, simulações e demais funções pessoais ficam no{" "}
            <strong className="font-semibold text-ink">{systemName}</strong>, um sistema separado
            deste portal. Aqui você encontra o caminho seguro de acesso — sem enviar senha neste
            site.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="fade-up-delay-1 rounded-3xl border border-primary/10 bg-cream p-6 shadow-sm transition duration-300 hover:shadow-md md:p-8">
            <h2 className="font-display text-2xl font-semibold text-primary">Como acessar</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-base text-muted">
              <li>Clique no botão abaixo para abrir o sistema do segurado.</li>
              <li>Faça login somente na tela oficial desse sistema.</li>
              <li>Consulte holerite, abra protocolos e acompanhe seus pedidos.</li>
            </ol>

            {hasIntegration ? (
              <a
                href={systemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white"
              >
                Entrar no {systemName}
              </a>
            ) : (
              <div className="mt-8 rounded-2xl bg-cream-muted px-5 py-4">
                <p className="text-base font-semibold text-primary">Integração em configuração</p>
                <p className="mt-2 text-base text-muted">
                  Defina <code className="rounded bg-white px-1.5 py-0.5 text-sm">SEGURADO_SYSTEM_URL</code>{" "}
                  no ambiente para habilitar o botão de acesso ao sistema externo.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex min-h-12 cursor-not-allowed items-center rounded-full bg-primary/30 px-7 py-3.5 text-base font-semibold text-white"
                >
                  Entrar no sistema (em breve)
                </button>
              </div>
            )}
          </div>

          <div className="fade-up-delay-2 rounded-3xl bg-primary p-6 text-cream transition duration-300 hover:shadow-lg md:p-8">
            <h2 className="font-display text-2xl font-semibold">O que é público neste portal</h2>
            <p className="mt-4 text-base leading-relaxed text-cream/90">
              Notícias, legislação, transparência e carta de serviços são informações públicas do
              RPPS e <strong className="font-semibold">não exigem login</strong>.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                ["/transparencia", "Documentos de transparência"],
                ["/servicos", "Carta de serviços"],
                ["/contato", "Contato, Ouvidoria e SIC"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex min-h-12 items-center justify-between rounded-xl border border-cream/25 bg-cream/10 px-4 py-3 text-base font-semibold text-cream transition hover:bg-cream/20"
                  >
                    <span>{label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Holerite", "Contracheque digital no sistema autenticado"],
            ["Protocolos", "Requerimentos e acompanhamento de processos"],
            ["Simulações", "Projeções de aposentadoria conforme as regras do RPPS"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-primary/10 bg-cream px-6 py-7">
              <h3 className="font-display text-xl font-semibold text-primary">{title}</h3>
              <p className="mt-3 text-base text-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-primary/10 pt-8">
          <BackNav href="/" label="Voltar para o início" />
          <BackNav href="/servicos" label="Voltar para Serviços" />
        </div>
      </div>
    </section>
  );
}
