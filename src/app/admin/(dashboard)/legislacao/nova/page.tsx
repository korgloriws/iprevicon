import { LegislationForm } from "@/components/admin/LegislationForm";
import { saveLegislationAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminLegislationCreatePage() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Nova norma</h2>
      <div className="mt-6">
        <LegislationForm action={saveLegislationAction} />
      </div>
    </div>
  );
}
