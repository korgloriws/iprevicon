import Link from "next/link";
import { adminCounts } from "@/lib/admin";
import { countSatisfactionResponses } from "@/lib/satisfaction";

export default function AdminHomePage() {
  const counts = adminCounts();
  const satisfacao = countSatisfactionResponses();

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Publicação do portal</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Gerencie notícias, documentos e respostas da Pesquisa de Satisfação da Ouvidoria.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
        <Link
          href="/admin/pro-gestao"
          className="rounded-2xl border border-primary/10 bg-white p-5 transition hover:border-primary/25"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Pro Gestão</p>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">{counts.proGestao}</p>
          <p className="mt-1 text-sm text-muted">Arquivos por tópico</p>
        </Link>
        <Link
          href="/admin/satisfacao"
          className="rounded-2xl border border-primary/10 bg-white p-5 transition hover:border-primary/25"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Satisfação</p>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">{satisfacao}</p>
          <p className="mt-1 text-sm text-muted">Respostas da pesquisa</p>
        </Link>
      </div>
    </div>
  );
}
