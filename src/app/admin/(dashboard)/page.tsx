import Link from "next/link";
import { adminCounts } from "@/lib/admin";

export default function AdminHomePage() {
  const counts = adminCounts();

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Publicação do portal</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Gerencie notícias e documentos. Arquivos enviados ficam no servidor e aparecem nas páginas
        públicas de Transparência e Legislação.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/noticias"
          className="rounded-2xl border border-primary/10 bg-white p-5 transition hover:border-primary/25"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Notícias</p>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">{counts.news}</p>
          <p className="mt-1 text-sm text-muted">Criar, editar e publicar</p>
        </Link>
        <Link
          href="/admin/transparencia"
          className="rounded-2xl border border-primary/10 bg-white p-5 transition hover:border-primary/25"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Transparência</p>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">{counts.docs}</p>
          <p className="mt-1 text-sm text-muted">Documentos com PDF</p>
        </Link>
        <Link
          href="/admin/legislacao"
          className="rounded-2xl border border-primary/10 bg-white p-5 transition hover:border-primary/25"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Legislação</p>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">{counts.laws}</p>
          <p className="mt-1 text-sm text-muted">Normas com PDF</p>
        </Link>
      </div>
    </div>
  );
}
