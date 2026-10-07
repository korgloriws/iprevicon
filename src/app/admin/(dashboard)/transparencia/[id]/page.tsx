import { notFound } from "next/navigation";
import { TransparencyForm } from "@/components/admin/TransparencyForm";
import { saveTransparencyAction } from "@/app/admin/actions";
import { adminGetTransparency } from "@/lib/admin";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminTransparencyEditPage({ params }: Props) {
  const { id } = await params;
  const item = adminGetTransparency(Number(id));
  if (!item) notFound();

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Editar documento</h2>
      <div className="mt-6">
        <TransparencyForm
          action={saveTransparencyAction}
          initial={{
            id: item.id,
            code: item.code,
            title: item.title,
            category: item.category,
            description: item.description_raw,
            file_url: item.file_url,
            updated_at: item.updated_at,
            sort_order: item.sort_order,
            is_published: Boolean(item.is_published),
          }}
        />
      </div>
    </div>
  );
}
