import { getDb } from "@/lib/db";

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string[];
  published_at: string;
};

export type TransparencyDoc = {
  id: number;
  code: string;
  title: string;
  category: string;
  description: string;
  file_url: string | null;
  updated_at: string;
};

export type LegislationItem = {
  id: number;
  title: string;
  detail: string;
  file_url: string | null;
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  href: string;
};

type NewsRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string;
  published_at: string;
};

function mapNews(row: NewsRow): NewsItem {
  let body: string[] = [];
  try {
    body = JSON.parse(row.body) as string[];
  } catch {
    body = [row.body];
  }
  return { ...row, body };
}

export function listNews(limit?: number): NewsItem[] {
  const db = getDb();
  const base = `SELECT id, slug, title, excerpt, category, body, published_at
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
      `SELECT id, slug, title, excerpt, category, body, published_at
       FROM news WHERE slug = ? AND is_published = 1`,
    )
    .get(slug) as NewsRow | undefined;
  return row ? mapNews(row) : null;
}

export function listTransparencyDocs(): TransparencyDoc[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, code, title, category, description, file_url, updated_at
       FROM transparency_docs
       WHERE is_published = 1
       ORDER BY sort_order ASC, updated_at DESC`,
    )
    .all() as TransparencyDoc[];
}

export function listLegislation(): LegislationItem[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, title, detail, file_url
       FROM legislation
       WHERE is_published = 1
       ORDER BY sort_order ASC`,
    )
    .all() as LegislationItem[];
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

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}
