import Link from "next/link";

type BackNavProps = {
  href?: string;
  label?: string;
  /** Variante no hero escuro */
  tone?: "light" | "dark";
  className?: string;
};

export function BackNav({
  href = "/",
  label = "Voltar para o início",
  tone = "light",
  className = "",
}: BackNavProps) {
  const styles =
    tone === "dark"
      ? "border-cream/40 bg-cream/10 text-cream hover:bg-cream/20"
      : "border-primary/20 bg-white text-primary hover:border-primary/40 hover:bg-cream-muted";

  return (
    <nav aria-label="Voltar" className={className}>
      <Link
        href={href}
        className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 py-3 text-base font-semibold shadow-sm transition duration-200 ${styles}`}
      >
        <span aria-hidden className="text-xl leading-none">
          ←
        </span>
        <span>{label}</span>
      </Link>
    </nav>
  );
}
