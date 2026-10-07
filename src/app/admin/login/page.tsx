import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { withBasePath } from "@/lib/paths";
import { loginAction } from "@/app/admin/actions";

type Props = { searchParams: Promise<{ erro?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const user = await getAdminSession();
  if (user) redirect(withBasePath("/admin"));

  const params = await searchParams;
  const erro = params.erro === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-3xl border border-primary/10 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Iprevicon</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-primary">Acesso ao painel</h1>
        <p className="mt-2 text-base text-muted">
          Área restrita para publicação de notícias, transparência e legislação.
        </p>

        {erro ? (
          <p className="mt-4 rounded-xl bg-[#fff4e8] px-3 py-2 text-sm font-semibold text-[#8a4b00]">
            Usuário ou senha incorretos.
          </p>
        ) : null}

        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-primary">
            Usuário
            <input
              name="user"
              required
              autoComplete="username"
              className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-base outline-none focus:border-secondary"
            />
          </label>
          <label className="block text-sm font-semibold text-primary">
            Senha
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 text-base outline-none focus:border-secondary"
            />
          </label>
          <button
            type="submit"
            className="btn-glow inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 text-base font-semibold text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
