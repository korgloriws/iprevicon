import { BackNav } from "@/components/BackNav";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 md:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">Página não encontrada</h1>
      <p className="mt-4 text-base text-muted">
        O endereço solicitado não existe ou foi movido. Use o botão abaixo para voltar com
        segurança.
      </p>
      <div className="mt-8">
        <BackNav href="/" label="Voltar para o início" />
      </div>
    </section>
  );
}
