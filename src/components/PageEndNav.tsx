import { BackNav } from "@/components/BackNav";

type PageEndNavProps = {
  extra?: { href: string; label: string };
};

/** Botões de volta no final da página — reforço para quem rolou até o fim. */
export function PageEndNav({ extra }: PageEndNavProps) {
  return (
    <div className="mx-auto max-w-[56rem] px-4 pb-10 sm:px-6 lg:pb-12">
      <div className="flex flex-wrap gap-3 border-t border-primary/10 pt-8 lg:pt-8">
        {extra ? <BackNav href={extra.href} label={extra.label} /> : null}
        <BackNav href="/" label="Voltar para o início" />
      </div>
    </div>
  );
}
