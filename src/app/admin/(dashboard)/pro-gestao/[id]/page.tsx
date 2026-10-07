import { notFound } from "next/navigation";
import { ProGestaoForm } from "@/components/admin/ProGestaoForm";
import { saveProGestaoAction } from "@/app/admin/actions";
import { adminGetProGestao } from "@/lib/admin";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminProGestaoEditPage({ params }: Props) {
  const { id } = await params;
  const item = adminGetProGestao(Number(id));
  if (!item) notFound();

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Editar arquivo · Pro Gestão</h2>
      <div className="mt-6">
        <ProGestaoForm
          action={saveProGestaoAction}
          initial={{
            id: item.id,
            topic_slug: item.topic_slug,
            title: item.title,
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
