import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_COOKIE, getAdminSession, sessionCookieOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getAdminSession();
  if (!user) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    const jar = await cookies();
    jar.set({ ...sessionCookieOptions(""), maxAge: 0, value: "" });
    jar.delete(ADMIN_COOKIE);
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-primary/10 bg-[#fffbf7]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Iprevicon</p>
            <h1 className="font-display text-xl font-semibold text-primary">Painel de publicação</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            <Link href="/admin" className="rounded-full px-3 py-2 text-primary hover:bg-cream-muted">
              Início
            </Link>
            <Link
              href="/admin/noticias"
              className="rounded-full px-3 py-2 text-primary hover:bg-cream-muted"
            >
              Notícias
            </Link>
            <Link
              href="/admin/transparencia"
              className="rounded-full px-3 py-2 text-primary hover:bg-cream-muted"
            >
              Transparência
            </Link>
            <Link
              href="/admin/legislacao"
              className="rounded-full px-3 py-2 text-primary hover:bg-cream-muted"
            >
              Legislação
            </Link>
            <Link
              href="/"
              className="rounded-full border border-primary/20 px-3 py-2 text-secondary hover:bg-white"
              target="_blank"
            >
              Ver site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full bg-primary px-3 py-2 text-cream hover:bg-secondary"
              >
                Sair ({user})
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
