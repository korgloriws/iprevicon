import Link from "next/link";
import { AdminFileField } from "@/components/admin/AdminFileField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initial?: {
    id: number;
    code: string;
    title: string;
    category: string;
    description: string;
    file_url: string | null;
    updated_at: string;
    sort_order: number;
    is_published: boolean;
  };
};

export function TransparencyForm({ action, initial }: Props) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-primary">
          Código (único)
          <input
            name="code"
            required
            defaultValue={initial?.code}
            placeholder="ex.: dair"
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
          />
        </label>
        <label className="block text-sm font-semibold text-primary">
          Categoria
          <input
            name="category"
            required
            defaultValue={initial?.category}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
          />
        </label>
      </div>

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
        name="description"
        label="Descrição"
        hint="Pode colar texto formatado, HTML ou usar a aba Markdown."
        initialHtml={initial?.description || ""}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-primary">
          Data de atualização
          <input
            type="date"
            name="updated_at"
            required
            defaultValue={initial?.updated_at || today}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
          />
        </label>
        <label className="block text-sm font-semibold text-primary">
          Ordem de exibição
          <input
            type="number"
            name="sort_order"
            defaultValue={initial?.sort_order ?? 0}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 outline-none focus:border-secondary"
          />
        </label>
      </div>

      <AdminFileField currentFileUrl={initial?.file_url} />

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
          href="/admin/transparencia"
          className="inline-flex min-h-11 items-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
