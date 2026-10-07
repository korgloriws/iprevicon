import { TransparencyForm } from "@/components/admin/TransparencyForm";
import { saveTransparencyAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminTransparencyCreatePage() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Novo documento</h2>
      <div className="mt-6">
        <TransparencyForm action={saveTransparencyAction} />
      </div>
    </div>
  );
}
