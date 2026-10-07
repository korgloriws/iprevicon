import Link from "next/link";
import { adminListNews } from "@/lib/admin";
import { formatDate } from "@/lib/content";
import { deleteNewsAction } from "@/app/admin/actions";

export default function AdminNewsListPage() {
  const items = adminListNews();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-primary">Notícias</h2>
          <p className="mt-1 text-muted">Conteúdo exibido na home e em /noticias.</p>
        </div>
        <Link
          href="/admin/noticias/nova"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white"
        >
          Nova notícia
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {items.length === 0 ? (
          <p className="text-muted">Nenhuma notícia cadastrada.</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {item.category} · {formatDate(item.published_at)}
                  {item.is_published ? "" : " · rascunho"}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-primary">{item.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/noticias/${item.id}`}
                  className="rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary"
                >
                  Editar
                </Link>
                <form action={deleteNewsAction}>
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
          ))
        )}
      </div>
    </div>
  );
}
