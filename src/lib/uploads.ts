import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export type UploadKind = "transparency" | "legislation" | "news" | "pro-gestao";

function uploadsRoot() {
  return path.join(process.cwd(), "data", "uploads");
}

function safeFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
    .toLowerCase();
}

export async function saveUploadedFile(
  file: File,
  kind: UploadKind,
): Promise<{ relativeUrl: string; absolutePath: string }> {
  if (!file || file.size === 0) {
    throw new Error("Arquivo vazio.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Arquivo maior que 20 MB.");
  }
  const type = file.type || "application/octet-stream";
  if (!ALLOWED.has(type) && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Tipo não permitido. Use PDF, PNG, JPG ou WebP.");
  }

  const dir = path.join(uploadsRoot(), kind);
  fs.mkdirSync(dir, { recursive: true });

  const id = randomBytes(8).toString("hex");
  const original = safeFileName(file.name) || "arquivo.pdf";
  const filename = `${id}-${original}`;
  const absolutePath = path.join(dir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(absolutePath, buffer);

  return {
    relativeUrl: `/api/uploads/${kind}/${filename}`,
    absolutePath,
  };
}

export function resolveUploadPath(kind: string, filename: string): string | null {
  if (!/^(transparency|legislation|news|pro-gestao)$/.test(kind)) return null;
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) return null;
  const full = path.join(uploadsRoot(), kind, filename);
  if (!full.startsWith(uploadsRoot())) return null;
  if (!fs.existsSync(full)) return null;
  return full;
}

export function deleteUploadByUrl(fileUrl: string | null | undefined) {
  if (!fileUrl) return;
  const match = fileUrl.match(
    /\/api\/uploads\/(transparency|legislation|news|pro-gestao)\/([^/?#]+)/,
  );
  if (!match) return;
  const full = resolveUploadPath(match[1], match[2]);
  if (full && fs.existsSync(full)) {
    try {
      fs.unlinkSync(full);
    } catch {
      /* ignore */
    }
  }
}
