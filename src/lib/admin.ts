import { getDb } from "@/lib/db";
import type { LegislationItem, NewsItem, TransparencyDoc } from "@/lib/content";
import { bodyToEditableHtml, isRichHtmlEmpty, normalizeRichContent } from "@/lib/html";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function uniqueNewsSlug(base: string, excludeId?: number): string {
  const db = getDb();
  let slug = slugify(base) || "noticia";
  let n = 0;
  while (true) {
    const candidate = n === 0 ? slug : `${slug}-${n}`;
    const row = db
      .prepare(`SELECT id FROM news WHERE slug = ?`)
      .get(candidate) as { id: number } | undefined;
    if (!row || (excludeId && row.id === excludeId)) return candidate;
    n += 1;
  }
}

export type AdminNews = NewsItem & {
  is_published: number;
  body_raw: string;
};

export type AdminTransparencyDoc = TransparencyDoc & {
  is_published: number;
  sort_order: number;
  description_raw: string;
};

export type AdminLegislation = LegislationItem & {
  is_published: number;
  sort_order: number;
  detail_raw: string;
};

export function adminListNews(): AdminNews[] {
  const rows = getDb()
    .prepare(
      `SELECT id, slug, title, excerpt, category, body, published_at, is_published, file_url
       FROM news ORDER BY published_at DESC, id DESC`,
    )
    .all() as Array<{
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    body: string;
    published_at: string;
    is_published: number;
    file_url: string | null;
  }>;

  return rows.map((row) => {
    const bodyHtml = bodyToEditableHtml(row.body);
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      bodyHtml,
      body: [],
      published_at: row.published_at,
      file_url: row.file_url,
      is_published: row.is_published,
      body_raw: bodyHtml,
    };
  });
}

export function adminGetNews(id: number): AdminNews | null {
  return adminListNews().find((n) => n.id === id) ?? null;
}

export function adminCreateNews(input: {
  title: string;
  excerpt: string;
  category: string;
  body: string;
  published_at: string;
  is_published: boolean;
  file_url: string | null;
}) {
  const html = normalizeRichContent(input.body);
  if (isRichHtmlEmpty(html)) throw new Error("Texto da notícia é obrigatório.");
  const slug = uniqueNewsSlug(input.title);
  const info = getDb()
    .prepare(
      `INSERT INTO news (slug, title, excerpt, category, body, published_at, is_published, file_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      slug,
      input.title.trim(),
      input.excerpt.trim(),
      input.category.trim() || "Comunicado",
      html,
      input.published_at,
      input.is_published ? 1 : 0,
      input.file_url,
    );
  return Number(info.lastInsertRowid);
}

export function adminUpdateNews(
  id: number,
  input: {
    title: string;
    excerpt: string;
    category: string;
    body: string;
    published_at: string;
    is_published: boolean;
    file_url: string | null;
  },
) {
  const current = adminGetNews(id);
  if (!current) throw new Error("Notícia não encontrada.");
  const html = normalizeRichContent(input.body);
  if (isRichHtmlEmpty(html)) throw new Error("Texto da notícia é obrigatório.");
  const slug = uniqueNewsSlug(input.title, id);
  getDb()
    .prepare(
      `UPDATE news
       SET slug = ?, title = ?, excerpt = ?, category = ?, body = ?, published_at = ?,
           is_published = ?, file_url = ?, updated_at = datetime('now')
       WHERE id = ?`,
    )
    .run(
      slug,
      input.title.trim(),
      input.excerpt.trim(),
      input.category.trim() || "Comunicado",
      html,
      input.published_at,
      input.is_published ? 1 : 0,
      input.file_url,
      id,
    );
}

export function adminDeleteNews(id: number) {
  getDb().prepare(`DELETE FROM news WHERE id = ?`).run(id);
}

export function adminListTransparency(): AdminTransparencyDoc[] {
  const rows = getDb()
    .prepare(
      `SELECT id, code, title, category, description, file_url, updated_at, is_published, sort_order
       FROM transparency_docs
       ORDER BY sort_order ASC, updated_at DESC`,
    )
    .all() as Array<{
    id: number;
    code: string;
    title: string;
    category: string;
    description: string;
    file_url: string | null;
    updated_at: string;
    is_published: number;
    sort_order: number;
  }>;

  return rows.map((row) => {
    const descriptionHtml = bodyToEditableHtml(row.description);
    return {
      ...row,
      descriptionHtml,
      description: row.description,
      description_raw: descriptionHtml,
    };
  });
}

export function adminGetTransparency(id: number): AdminTransparencyDoc | null {
  return adminListTransparency().find((d) => d.id === id) ?? null;
}

export function adminCreateTransparency(input: {
  code: string;
  title: string;
  category: string;
  description: string;
  file_url: string | null;
  updated_at: string;
  sort_order: number;
  is_published: boolean;
}) {
  const description = normalizeRichContent(input.description);
  const info = getDb()
    .prepare(
      `INSERT INTO transparency_docs
       (code, title, category, description, file_url, updated_at, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.code.trim().toLowerCase(),
      input.title.trim(),
      input.category.trim(),
      description,
      input.file_url,
      input.updated_at,
      input.sort_order,
      input.is_published ? 1 : 0,
    );
  return Number(info.lastInsertRowid);
}

export function adminUpdateTransparency(
  id: number,
  input: {
    code: string;
    title: string;
    category: string;
    description: string;
    file_url: string | null;
    updated_at: string;
    sort_order: number;
    is_published: boolean;
  },
) {
  const description = normalizeRichContent(input.description);
  getDb()
    .prepare(
      `UPDATE transparency_docs
       SET code = ?, title = ?, category = ?, description = ?, file_url = ?,
           updated_at = ?, sort_order = ?, is_published = ?
       WHERE id = ?`,
    )
    .run(
      input.code.trim().toLowerCase(),
      input.title.trim(),
      input.category.trim(),
      description,
      input.file_url,
      input.updated_at,
      input.sort_order,
      input.is_published ? 1 : 0,
      id,
    );
}

export function adminDeleteTransparency(id: number) {
  getDb().prepare(`DELETE FROM transparency_docs WHERE id = ?`).run(id);
}

export function adminListLegislation(): AdminLegislation[] {
  const rows = getDb()
    .prepare(
      `SELECT id, title, detail, file_url, is_published, sort_order
       FROM legislation
       ORDER BY sort_order ASC, id DESC`,
    )
    .all() as Array<{
    id: number;
    title: string;
    detail: string;
    file_url: string | null;
    is_published: number;
    sort_order: number;
  }>;

  return rows.map((row) => {
    const detailHtml = bodyToEditableHtml(row.detail);
    return {
      ...row,
      detailHtml,
      detail: row.detail,
      detail_raw: detailHtml,
    };
  });
}

export function adminGetLegislation(id: number): AdminLegislation | null {
  return adminListLegislation().find((d) => d.id === id) ?? null;
}

export function adminCreateLegislation(input: {
  title: string;
  detail: string;
  file_url: string | null;
  sort_order: number;
  is_published: boolean;
}) {
  const detail = normalizeRichContent(input.detail);
  const info = getDb()
    .prepare(
      `INSERT INTO legislation (title, detail, file_url, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(
      input.title.trim(),
      detail,
      input.file_url,
      input.sort_order,
      input.is_published ? 1 : 0,
    );
  return Number(info.lastInsertRowid);
}

export function adminUpdateLegislation(
  id: number,
  input: {
    title: string;
    detail: string;
    file_url: string | null;
    sort_order: number;
    is_published: boolean;
  },
) {
  const detail = normalizeRichContent(input.detail);
  getDb()
    .prepare(
      `UPDATE legislation
       SET title = ?, detail = ?, file_url = ?, sort_order = ?, is_published = ?
       WHERE id = ?`,
    )
    .run(
      input.title.trim(),
      detail,
      input.file_url,
      input.sort_order,
      input.is_published ? 1 : 0,
      id,
    );
}

export function adminDeleteLegislation(id: number) {
  getDb().prepare(`DELETE FROM legislation WHERE id = ?`).run(id);
}

export function adminCounts() {
  const db = getDb();
  const news = (db.prepare(`SELECT COUNT(*) AS c FROM news`).get() as { c: number }).c;
  const docs = (
    db.prepare(`SELECT COUNT(*) AS c FROM transparency_docs`).get() as { c: number }
  ).c;
  const laws = (db.prepare(`SELECT COUNT(*) AS c FROM legislation`).get() as { c: number }).c;
  return { news, docs, laws };
}
