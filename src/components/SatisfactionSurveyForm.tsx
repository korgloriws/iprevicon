import { submitSatisfactionAction } from "@/app/ouvidoria-actions";
import { SatisfactionIdentityFields } from "@/components/SatisfactionIdentityFields";
import { LogoMark } from "@/components/LogoMark";
import {
  NECESSIDADE_OPTIONS,
  SATISFACTION_ITEMS,
  SATISFACTION_SCALE,
} from "@/lib/satisfaction";

type Props = {
  source?: string;
};

/** Formulário isolado — usado em /pesquisa-satisfacao */
export function SatisfactionSurveyForm({ source = "web" }: Props) {
  return (
    <form
      action={submitSatisfactionAction}
      className="overflow-hidden border border-primary/10 bg-white lg:rounded-3xl"
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="standalone" value="1" />

      <header className="border-b border-primary/10 bg-cream-muted/50 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Unidade gestora do RPPS
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-primary sm:text-base">
              Instituto de Previdência dos Servidores Públicos do Município de Contagem — IPREVICON
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LogoMark size="md" />
            <div className="hidden sm:block">
              <p className="font-display text-sm font-semibold text-primary">Prefeitura de Contagem</p>
              <p className="text-xs text-muted">Minas Gerais</p>
            </div>
          </div>
        </div>

        <div className="mt-8 h-1 w-12 origin-left rounded-full bg-accent" />
        <h1 className="mt-5 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
          Pesquisa de Satisfação – IPREVICON
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted lg:text-base">
          Sua opinião é importante para nós! Esta pesquisa é rápida e tem como objetivo conhecer sua
          percepção sobre o atendimento e os serviços prestados pelo IPREVICON. Participação
          voluntária — você pode se identificar ou responder de forma anônima. As respostas serão
          utilizadas para avaliação e melhoria dos serviços.
        </p>
      </header>

      <div className="space-y-12 px-5 py-10 sm:px-8 lg:space-y-14 lg:px-10 lg:py-12">
        <SatisfactionIdentityFields />

        <section className="border-t border-primary/10 pt-10 lg:pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Avaliação</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-primary lg:text-xl">
            Avalie cada item
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SATISFACTION_SCALE.map((col) => (
              <span
                key={col.value}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-cream-muted px-3 py-1 text-xs font-medium text-muted"
              >
                <span className="font-bold text-primary">{col.value}</span>
                {col.label}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {SATISFACTION_ITEMS.map((item) => (
              <fieldset
                key={item.key}
                className="rounded-2xl border border-primary/10 bg-cream/60 px-4 py-5 sm:px-5"
              >
                <legend className="px-1 font-display text-lg font-semibold text-primary lg:text-base">
                  {item.label}
                </legend>
                <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
                  {SATISFACTION_SCALE.map((col) => (
                    <label
                      key={col.value}
                      className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-transparent px-1 py-2 text-center transition hover:border-primary/15 hover:bg-white has-[:checked]:border-accent/40 has-[:checked]:bg-white"
                    >
                      <input
                        type="radio"
                        name={`rating_${item.key}`}
                        value={col.value}
                        required
                        className="size-5 accent-accent"
                      />
                      <span className="text-sm font-bold text-primary">{col.value}</span>
                      <span className="hidden text-[0.65rem] leading-tight text-muted sm:block">
                        {col.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>

        <section className="border-t border-primary/10 pt-10 lg:pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Atendimento</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-primary lg:text-xl">
            Sobre o atendimento
          </h2>
          <p className="mt-3 text-base text-muted">
            Sua necessidade foi atendida neste momento?
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {NECESSIDADE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-sm font-medium text-primary transition hover:border-primary/30 hover:bg-white has-[:checked]:border-accent/50 has-[:checked]:bg-white"
              >
                <input
                  type="radio"
                  name="necessidade_atendida"
                  value={opt.value}
                  required
                  className="size-4 shrink-0 accent-accent"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </section>

        <section className="border-t border-primary/10 pt-10 lg:pt-12">
          <h2 className="font-display text-2xl font-semibold text-primary lg:text-xl">
            Atendimento e necessidade pendente
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            Considerando o atendimento realizado pelo IPREVICON, a Ouvidoria gostaria de saber se
            sua dúvida, solicitação ou necessidade foi atendida, resolvida ou encaminhada de forma
            satisfatória. Caso ainda tenha alguma dúvida ou necessidade pendente, informe-nos, para
            que eu possa te auxiliar.
          </p>
          <textarea
            name="texto_necessidade"
            rows={4}
            className="mt-5 w-full rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-base outline-none transition focus:border-secondary"
            placeholder="Escreva aqui, se desejar"
          />
        </section>

        <section className="border-t border-primary/10 pt-10 lg:pt-12">
          <h2 className="font-display text-2xl font-semibold text-primary lg:text-xl">
            Sugestão, elogio ou melhoria
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            Se desejar, registre sua sugestão, elogio, ponto de melhoria ou comentário. As
            informações serão avaliadas pela Ouvidoria, que poderá acompanhar a situação e, quando
            necessário, prestar as orientações e os encaminhamentos cabíveis.
          </p>
          <textarea
            name="texto_sugestao"
            rows={5}
            className="mt-5 w-full rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-base outline-none transition focus:border-secondary"
            placeholder="Escreva aqui, se desejar"
          />
        </section>

        <footer className="flex flex-col gap-6 border-t border-primary/10 pt-8 sm:flex-row sm:items-end sm:justify-between lg:pt-10">
          <div>
            <p className="font-display text-lg font-semibold text-primary">
              Dáliton Ribeiro de Araujo
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-muted">
              Ouvidor da Previdência – IPREVICON
            </p>
            <p className="mt-4 font-display text-sm font-semibold italic text-accent">
              Ouvir. Acolher. Orientar. Melhorar.
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-semibold text-white transition hover:bg-accent-soft sm:w-auto"
          >
            Enviar pesquisa
          </button>
        </footer>
      </div>
    </form>
  );
}
