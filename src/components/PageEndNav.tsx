import { BackNav } from "@/components/BackNav";

type PageEndNavProps = {
  extra?: { href: string; label: string };
};

/** Botões de volta no final da página — reforço para quem rolou até o fim. */
export function PageEndNav({ extra }: PageEndNavProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-16">
      <div className="flex flex-wrap gap-3 border-t border-primary/10 pt-8 md:pt-10">
        {extra ? <BackNav href={extra.href} label={extra.label} /> : null}
        <BackNav href="/" label="Voltar para o início" />
      </div>
    </div>
  );
}
