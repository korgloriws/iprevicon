import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { withBasePath } from "@/lib/paths";

type NewsFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  initial?: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    body: string;
    published_at: string;
    is_published: boolean;
    file_url: string | null;
  };
};

export function NewsForm({ action, initial }: NewsFormProps) {
  const today = new Date().toISOString().slice(0, 10);

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

      <label className="block text-sm font-semibold text-primary">
        Resumo (aparece na listagem)
        <textarea
          name="excerpt"
          required
          rows={3}
          defaultValue={initial?.excerpt}
          className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-primary">
          Categoria
          <input
            name="category"
            defaultValue={initial?.category || "Comunicado"}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
          />
        </label>
        <label className="block text-sm font-semibold text-primary">
          Data de publicação
          <input
            type="date"
            name="published_at"
            required
            defaultValue={initial?.published_at || today}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
          />
        </label>
      </div>

      <RichTextEditor
        name="body"
        label="Texto completo"
        hint="Editor visual com negrito, listas e links. Aceita colar do Word, HTML ou Markdown (aba Markdown)."
        initialHtml={initial?.body || ""}
        required
      />

      <label className="block text-sm font-semibold text-primary">
        Arquivo anexo (PDF ou imagem, até 20 MB)
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
        Publicada no site
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white"
        >
          Salvar
        </button>
        <Link
          href="/admin/noticias"
          className="inline-flex min-h-11 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
