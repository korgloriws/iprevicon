import { NewsForm } from "@/components/admin/NewsForm";
import { saveNewsAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminNewsCreatePage() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Nova notícia</h2>
      <div className="mt-6">
        <NewsForm action={saveNewsAction} />
      </div>
    </div>
  );
}
