import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { withBasePath } from "@/lib/paths";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initial?: {
    id: number;
    title: string;
    detail: string;
    file_url: string | null;
    sort_order: number;
    is_published: boolean;
  };
};

export function LegislationForm({ action, initial }: Props) {
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}

      <label className="block text-sm font-semibold text-primary">
        Título
        <input
          name="title"
          required
          defaultValue={initial?.title}
          className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
        />
      </label>

      <RichTextEditor
        name="detail"
        label="Detalhe / texto da norma"
        hint="Editor completo: visual, HTML ou Markdown. Aceita colar conteúdo formatado."
        initialHtml={initial?.detail || ""}
        required
      />

      <label className="block text-sm font-semibold text-primary">
        Ordem de exibição
        <input
          type="number"
          name="sort_order"
          defaultValue={initial?.sort_order ?? 0}
          className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
        />
      </label>

      <label className="block text-sm font-semibold text-primary">
        Arquivo (PDF ou imagem, até 20 MB)
        <input
          type="file"
          name="file"
          accept=".pdf,application/pdf,image/*"
          className="mt-1.5 block w-full text-sm"
        />
      </label>

      {initial?.file_url ? (
        <div className="rounded-xl bg-cream-muted px-4 py-3 text-sm">
          <p className="font-semibold text-primary">Arquivo atual</p>
          <a
            href={withBasePath(initial.file_url)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline"
          >
            Abrir arquivo
          </a>
          <label className="mt-2 flex items-center gap-2 font-semibold text-primary">
            <input type="checkbox" name="remove_file" className="size-4" />
            Remover arquivo ao salvar
          </label>
        </div>
      ) : null}

      <label className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={initial?.is_published ?? true}
          className="size-4"
        />
        Publicado no site
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white"
        >
          Salvar
        </button>
        <Link
          href="/admin/legislacao"
          className="inline-flex min-h-11 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
