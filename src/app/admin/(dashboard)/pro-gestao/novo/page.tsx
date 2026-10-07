import { ProGestaoForm } from "@/components/admin/ProGestaoForm";
import { saveProGestaoAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminProGestaoCreatePage() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Novo arquivo · Pro Gestão</h2>
      <div className="mt-6">
        <ProGestaoForm action={saveProGestaoAction} />
      </div>
    </div>
  );
}
