import type { Metadata } from "next";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contato",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Atendimento"
        title="Contato, Ouvidoria e SIC"
        description="Fale com o Iprevicon, registre manifestações na Ouvidoria ou solicite informações pelo Serviço de Informação ao Cidadão."
      />

      <section className="mx-auto grid max-w-[56rem] gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Sede</h2>
            <p className="mt-3 text-lg text-muted">
              Contagem — Minas Gerais
              <br />
              Segunda a sexta, das 8h às 17h
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Canais</h2>
            <ul className="mt-3 space-y-2 text-lg text-muted">
              <li>Telefone: (31) 0000-0000</li>
              <li>
                E-mail:{" "}
                <a
                  className="font-medium text-secondary hover:text-primary"
                  href="mailto:atendimento@iprevicon.contagem.mg.gov.br"
                >
                  atendimento@iprevicon.contagem.mg.gov.br
                </a>
              </li>
              <li>Ouvidoria: ouvidoria@iprevicon.contagem.mg.gov.br</li>
              <li>SIC: sic@iprevicon.contagem.mg.gov.br</li>
            </ul>
          </div>
        </div>

        <form className="rounded-3xl bg-cream-muted p-6 md:p-8" action="#" method="post">
          <h2 className="font-display text-2xl font-semibold text-primary">Envie uma mensagem</h2>
          <p className="mt-2 text-base text-muted">
            Formulário demonstrativo — sem envio real nesta versão do portal.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block text-base font-medium text-ink">
              Nome completo
              <input
                type="text"
                name="nome"
                className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-base outline-none transition focus:border-secondary"
                placeholder="Seu nome"
              />
            </label>
            <label className="block text-base font-medium text-ink">
              E-mail
              <input
                type="email"
                name="email"
                className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-base outline-none transition focus:border-secondary"
                placeholder="voce@email.com"
              />
            </label>
            <label className="block text-base font-medium text-ink">
              Assunto
              <select
                name="assunto"
                className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-base outline-none transition focus:border-secondary"
                defaultValue="atendimento"
              >
                <option value="atendimento">Atendimento</option>
                <option value="ouvidoria">Ouvidoria</option>
                <option value="sic">Pedido de informação (SIC)</option>
              </select>
            </label>
            <label className="block text-base font-medium text-ink">
              Mensagem
              <textarea
                name="mensagem"
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-base outline-none transition focus:border-secondary"
                placeholder="Descreva sua solicitação"
              />
            </label>
            <button
              type="button"
              className="min-h-12 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition hover:bg-accent-soft"
            >
              Enviar (demonstração)
            </button>
          </div>
        </form>
      </section>
      <PageEndNav />
    </>
  );
}
