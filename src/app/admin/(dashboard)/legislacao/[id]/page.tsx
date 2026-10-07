import { notFound } from "next/navigation";
import { LegislationForm } from "@/components/admin/LegislationForm";
import { saveLegislationAction } from "@/app/admin/actions";
import { adminGetLegislation } from "@/lib/admin";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminLegislationEditPage({ params }: Props) {
  const { id } = await params;
  const item = adminGetLegislation(Number(id));
  if (!item) notFound();

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Editar norma</h2>
      <div className="mt-6">
        <LegislationForm
          action={saveLegislationAction}
          initial={{
            id: item.id,
            title: item.title,
            detail: item.detail_raw,
            file_url: item.file_url,
            sort_order: item.sort_order,
            is_published: Boolean(item.is_published),
          }}
        />
      </div>
    </div>
  );
}
