import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-primary/10 bg-primary text-cream">
      <div className="pointer-events-none absolute inset-0 surface-noise" aria-hidden />
      <div className="relative mx-auto grid max-w-[56rem] gap-8 px-4 py-10 md:grid-cols-3 sm:px-6 lg:py-12 lg:gap-8">
        <div>
          <LogoMark variant="inverse" size="md" />
          <p className="mt-4 font-display text-xl font-semibold lg:text-lg">Instituto de Previdência de Contagem</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-accent-soft">
            Iprevicon
          </p>
          <p className="mt-3 max-w-xs text-base leading-relaxed text-cream/90">
            Gestão segura, transparente e acolhedora do Regime Próprio de Previdência Social.
          </p>
        </div>

        <div>
          <p className="font-display text-xl font-semibold">Acesso rápido</p>
          <ul className="mt-4 space-y-3 text-base text-cream/90">
            <li>
              <Link href="/transparencia" className="link-underline hover:text-white">
                Portal da Transparência
              </Link>
            </li>
            <li>
              <Link href="/servicos" className="link-underline hover:text-white">
                Carta de Serviços
              </Link>
            </li>
            <li>
              <Link href="/area-do-segurado" className="link-underline hover:text-white">
                Área do Segurado
              </Link>
            </li>
            <li>
              <Link href="/contato" className="link-underline hover:text-white">
                Ouvidoria e SIC
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-xl font-semibold">Atendimento</p>
          <ul className="mt-4 space-y-3 text-base text-cream/90">
            <li>Contagem — Minas Gerais</li>
            <li>Segunda a sexta, 8h às 17h</li>
            <li>
              <a href="mailto:atendimento@iprevicon.contagem.mg.gov.br" className="hover:text-white">
                atendimento@iprevicon.contagem.mg.gov.br
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.br/previdencia/pt-br/assuntos/rpps"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Ministério da Previdência — RPPS
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-2 px-4 py-4 text-sm text-cream/75 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} Iprevicon. Todos os direitos reservados.</p>
          <p>Portal institucional do RPPS de Contagem-MG</p>
        </div>
      </div>
    </footer>
  );
}
