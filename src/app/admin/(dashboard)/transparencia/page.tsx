import Link from "next/link";
import { adminListTransparency } from "@/lib/admin";
import { formatDate } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import { deleteTransparencyAction } from "@/app/admin/actions";

export default function AdminTransparencyListPage() {
  const items = adminListTransparency();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-primary">Transparência</h2>
          <p className="mt-1 text-muted">Documentos públicos com upload de PDF.</p>
        </div>
        <Link
          href="/admin/transparencia/novo"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white"
        >
          Novo documento
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {item.category} · {item.code}
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
                href={`/admin/transparencia/${item.id}`}
                className="rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary"
              >
                Editar
              </Link>
              <form action={deleteTransparencyAction}>
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
        ))}
      </div>
    </div>
  );
}
