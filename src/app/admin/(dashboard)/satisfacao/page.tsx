import Link from "next/link";
import {
  NECESSIDADE_OPTIONS,
  countSatisfactionResponses,
  listSatisfactionResponses,
} from "@/lib/satisfaction";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ from?: string; to?: string }> };

export default async function AdminSatisfacaoPage({ searchParams }: Props) {
  const { from, to } = await searchParams;
  const total = countSatisfactionResponses();
  const rows = listSatisfactionResponses({ from, to, limit: 200 });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-primary">
            Pesquisa de Satisfação
          </h2>
          <p className="mt-1 text-muted">
            Respostas anônimas armazenadas no SQLite — base para relatórios por período.
          </p>
        </div>
        <p className="rounded-full bg-cream-muted px-4 py-2 text-sm font-semibold text-primary">
          Total: {total}
        </p>
      </div>

      <form className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-primary/10 bg-white p-4">
        <label className="text-sm font-semibold text-primary">
          De
          <input
            type="date"
            name="from"
            defaultValue={from || ""}
            className="mt-1 block rounded-xl border border-primary/15 bg-cream px-3 py-2"
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          Até
          <input
            type="date"
            name="to"
            defaultValue={to || ""}
            className="mt-1 block rounded-xl border border-primary/15 bg-cream px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="min-h-10 rounded-full bg-accent px-5 text-sm font-semibold text-white"
        >
          Filtrar período
        </button>
        <Link
          href="/admin/satisfacao"
          className="min-h-10 inline-flex items-center rounded-full border border-primary/20 px-4 text-sm font-semibold text-primary"
        >
          Limpar
        </Link>
      </form>

      <div className="mt-8 space-y-3">
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-primary/20 bg-white p-6 text-muted">
            Nenhuma resposta neste período.
          </p>
        ) : null}

        {rows.map((row) => {
          const necessidade =
            NECESSIDADE_OPTIONS.find((o) => o.value === row.necessidade_atendida)?.label ||
            row.necessidade_atendida;
          return (
            <article
              key={row.id}
              className="rounded-2xl border border-primary/10 bg-white p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  #{row.id} · {row.source} · {row.created_at}
                  {row.is_anonymous ? " · anônimo" : ""}
                </p>
                <p className="text-sm font-semibold text-primary">{necessidade}</p>
              </div>
              {!row.is_anonymous ? (
                <p className="mt-2 text-sm text-ink">
                  <span className="font-semibold">{row.nome || "—"}</span>
                  {row.email ? ` · ${row.email}` : ""}
                  {row.telefone ? ` · ${row.telefone}` : ""}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-muted">
                Notas: atendimento {row.rating_atendimento} · cordialidade {row.rating_cordialidade}{" "}
                · clareza {row.rating_clareza} · solução {row.rating_solucao} · tempo{" "}
                {row.rating_tempo}
              </p>
              {row.texto_necessidade ? (
                <p className="mt-2 text-sm text-ink">
                  <span className="font-semibold">Necessidade: </span>
                  {row.texto_necessidade}
                </p>
              ) : null}
              {row.texto_sugestao ? (
                <p className="mt-1 text-sm text-ink">
                  <span className="font-semibold">Sugestão: </span>
                  {row.texto_sugestao}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
