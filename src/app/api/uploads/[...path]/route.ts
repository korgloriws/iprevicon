import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { resolveUploadPath } from "@/lib/uploads";

type Params = { params: Promise<{ path: string[] }> };

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export async function GET(_request: Request, { params }: Params) {
  const parts = (await params).path;
  if (!parts || parts.length !== 2) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  const [kind, filename] = parts;
  const full = resolveUploadPath(kind, filename);
  if (!full) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }

  const data = fs.readFileSync(full);
  const ext = path.extname(full).toLowerCase();
  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": String(data.length),
      "Cache-Control": "public, max-age=86400",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
