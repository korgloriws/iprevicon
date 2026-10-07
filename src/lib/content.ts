import { getDb } from "@/lib/db";
import { bodyToEditableHtml, sanitizeHtml } from "@/lib/html";

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** HTML sanitizado para exibição */
  bodyHtml: string;
  /** Compatível com listagens antigas (parágrafos em texto) */
  body: string[];
  published_at: string;
  file_url: string | null;
};

export type TransparencyDoc = {
  id: number;
  code: string;
  title: string;
  category: string;
  description: string;
  descriptionHtml: string;
  file_url: string | null;
  updated_at: string;
};

export type LegislationItem = {
  id: number;
  title: string;
  detail: string;
  detailHtml: string;
  file_url: string | null;
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  href: string;
};

export type ProGestaoDoc = {
  id: number;
  topic_slug: string;
  title: string;
  description: string;
  descriptionHtml: string;
  file_url: string | null;
  updated_at: string;
};

type NewsRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string;
  published_at: string;
  file_url?: string | null;
};

function htmlToPlainParagraphs(html: string): string[] {
  const plain = sanitizeHtml(html)
    .replace(/<\/(p|h[1-6]|li|div|blockquote)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return plain.length ? plain : [""];
}

function mapNews(row: NewsRow): NewsItem {
  const bodyHtml = bodyToEditableHtml(row.body);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    bodyHtml,
    body: htmlToPlainParagraphs(bodyHtml),
    published_at: row.published_at,
    file_url: row.file_url ?? null,
  };
}

export function listNews(limit?: number): NewsItem[] {
  const db = getDb();
  const base = `SELECT id, slug, title, excerpt, category, body, published_at, file_url
     FROM news
     WHERE is_published = 1
     ORDER BY published_at DESC`;
  const rows = (
    limit ? db.prepare(`${base} LIMIT ?`).all(limit) : db.prepare(base).all()
  ) as NewsRow[];
  return rows.map(mapNews);
}

export function getNewsBySlug(slug: string): NewsItem | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT id, slug, title, excerpt, category, body, published_at, file_url
       FROM news WHERE slug = ? AND is_published = 1`,
    )
    .get(slug) as NewsRow | undefined;
  return row ? mapNews(row) : null;
}

export function listTransparencyDocs(): TransparencyDoc[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, code, title, category, description, file_url, updated_at
       FROM transparency_docs
       WHERE is_published = 1
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
  }>;

  return rows.map((row) => {
    const descriptionHtml = bodyToEditableHtml(row.description);
    return {
      ...row,
      descriptionHtml,
      description: htmlToPlainParagraphs(descriptionHtml).join(" "),
    };
  });
}

export function listLegislation(): LegislationItem[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, title, detail, file_url
       FROM legislation
       WHERE is_published = 1
       ORDER BY sort_order ASC`,
    )
    .all() as Array<{
    id: number;
    title: string;
    detail: string;
    file_url: string | null;
  }>;

  return rows.map((row) => {
    const detailHtml = bodyToEditableHtml(row.detail);
    return {
      ...row,
      detailHtml,
      detail: htmlToPlainParagraphs(detailHtml).join(" "),
    };
  });
}

export function listServices(): ServiceItem[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, title, description, href
       FROM services
       WHERE is_published = 1
       ORDER BY sort_order ASC`,
    )
    .all() as ServiceItem[];
}

export function getSetting(key: string, fallback = ""): string {
  const db = getDb();
  const row = db.prepare(`SELECT value FROM site_settings WHERE key = ?`).get(key) as
    | { value: string }
    | undefined;
  return row?.value || fallback;
}

export function listProGestaoDocs(topicSlug?: string): ProGestaoDoc[] {
  const db = getDb();
  const rows = (
    topicSlug
      ? db
          .prepare(
            `SELECT id, topic_slug, title, description, file_url, updated_at
             FROM pro_gestao_docs
             WHERE is_published = 1 AND topic_slug = ?
             ORDER BY sort_order ASC, updated_at DESC`,
          )
          .all(topicSlug)
      : db
          .prepare(
            `SELECT id, topic_slug, title, description, file_url, updated_at
             FROM pro_gestao_docs
             WHERE is_published = 1
             ORDER BY sort_order ASC, updated_at DESC`,
          )
          .all()
  ) as Array<{
    id: number;
    topic_slug: string;
    title: string;
    description: string;
    file_url: string | null;
    updated_at: string;
  }>;

  return rows.map((row) => {
    const descriptionHtml = bodyToEditableHtml(row.description || "");
    return {
      ...row,
      descriptionHtml,
      description: htmlToPlainParagraphs(descriptionHtml).join(" ") || row.description,
    };
  });
}

export function countProGestaoDocsByTopic(): Record<string, number> {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT topic_slug, COUNT(*) AS c
       FROM pro_gestao_docs
       WHERE is_published = 1
       GROUP BY topic_slug`,
    )
    .all() as Array<{ topic_slug: string; c: number }>;
  return Object.fromEntries(rows.map((r) => [r.topic_slug, r.c]));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}
