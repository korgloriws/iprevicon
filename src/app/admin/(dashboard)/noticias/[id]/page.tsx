import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";
import { saveNewsAction } from "@/app/admin/actions";
import { adminGetNews } from "@/lib/admin";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminNewsEditPage({ params }: Props) {
  const { id } = await params;
  const item = adminGetNews(Number(id));
  if (!item) notFound();

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-primary">Editar notícia</h2>
      <div className="mt-6">
        <NewsForm
          action={saveNewsAction}
          initial={{
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            category: item.category,
            body: item.body_raw,
            published_at: item.published_at,
            is_published: Boolean(item.is_published),
            file_url: item.file_url,
          }}
        />
      </div>
    </div>
  );
}
