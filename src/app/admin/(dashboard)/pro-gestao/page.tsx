import Link from "next/link";
import { deleteProGestaoAction } from "@/app/admin/actions";
import { adminListProGestao } from "@/lib/admin";
import { formatDate } from "@/lib/content";
import { getProGestaoTopic } from "@/lib/pro-gestao";
import { withBasePath } from "@/lib/paths";

export default function AdminProGestaoListPage() {
  const items = adminListProGestao();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-primary">Pro Gestão</h2>
          <p className="mt-1 text-muted">
            Envie PDFs e imagens para cada tópico (conselhos, comitês, regularidade etc.).
          </p>
        </div>
        <Link
          href="/admin/pro-gestao/novo"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white"
        >
          Novo arquivo
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-primary/20 bg-white p-6 text-muted">
            Nenhum arquivo ainda. Clique em &quot;Novo arquivo&quot; para enviar o primeiro documento.
          </p>
        ) : null}

        {items.map((item) => {
          const topic = getProGestaoTopic(item.topic_slug);
          return (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {topic?.title || item.topic_slug}
                  {item.is_published ? "" : " · oculto"}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">Atualizado em {formatDate(item.updated_at)}</p>
                {item.file_url ? (
                  <a
                    href={withBasePath(item.file_url)}
                    className="mt-1 inline-block text-sm font-semibold text-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver arquivo
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-muted">Sem arquivo</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/pro-gestao/${item.id}`}
                  className="rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary"
                >
                  Editar
                </Link>
                <form action={deleteProGestaoAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
