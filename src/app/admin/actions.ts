"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createSessionToken,
  requireAdminSession,
  sessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/auth";
import {
  adminCreateLegislation,
  adminCreateNews,
  adminCreateTransparency,
  adminDeleteLegislation,
  adminDeleteNews,
  adminDeleteTransparency,
  adminGetLegislation,
  adminGetNews,
  adminGetTransparency,
  adminUpdateLegislation,
  adminUpdateNews,
  adminUpdateTransparency,
} from "@/lib/admin";
import { isRichHtmlEmpty, normalizeRichContent } from "@/lib/html";
import { withBasePath } from "@/lib/paths";
import { deleteUploadByUrl, saveUploadedFile } from "@/lib/uploads";

function boolFromForm(value: FormDataEntryValue | null) {
  return value === "on" || value === "1" || value === "true";
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/noticias");
  revalidatePath("/transparencia");
  revalidatePath("/legislacao");
  revalidatePath("/servicos");
}

export async function loginAction(formData: FormData) {
  const user = String(formData.get("user") || "");
  const password = String(formData.get("password") || "");
  if (!verifyAdminCredentials(user, password)) {
    redirect(withBasePath("/admin/login?erro=1"));
  }
  const token = createSessionToken(user);
  const jar = await cookies();
  jar.set(sessionCookieOptions(token));
  redirect(withBasePath("/admin"));
}

export async function saveNewsAction(formData: FormData) {
  await requireAdminSession();
  const idRaw = String(formData.get("id") || "");
  const id = idRaw ? Number(idRaw) : null;
  const existing = id ? adminGetNews(id) : null;
  const removeFile = boolFromForm(formData.get("remove_file"));

  let fileUrl = existing?.file_url ?? null;
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    if (fileUrl) deleteUploadByUrl(fileUrl);
    const saved = await saveUploadedFile(file, "news");
    fileUrl = saved.relativeUrl;
  } else if (removeFile) {
    deleteUploadByUrl(fileUrl);
    fileUrl = null;
  }

  const body = normalizeRichContent(String(formData.get("body") || ""));
  const payload = {
    title: String(formData.get("title") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    category: String(formData.get("category") || "Comunicado"),
    body,
    published_at: String(formData.get("published_at") || todayISO()),
    is_published: boolFromForm(formData.get("is_published")),
    file_url: fileUrl,
  };
  if (!payload.title.trim() || !payload.excerpt.trim() || isRichHtmlEmpty(payload.body)) {
    throw new Error("Preencha título, resumo e texto.");
  }
  if (id) adminUpdateNews(id, payload);
  else adminCreateNews(payload);

  revalidatePublic();
  revalidatePath("/admin/noticias");
  redirect(withBasePath("/admin/noticias"));
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetNews(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteNews(id);
  revalidatePublic();
  revalidatePath("/admin/noticias");
  redirect(withBasePath("/admin/noticias"));
}

export async function saveTransparencyAction(formData: FormData) {
  await requireAdminSession();
  const idRaw = String(formData.get("id") || "");
  const id = idRaw ? Number(idRaw) : null;
  const existing = id ? adminGetTransparency(id) : null;
  const removeFile = boolFromForm(formData.get("remove_file"));

  let fileUrl = existing?.file_url ?? null;
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    if (fileUrl) deleteUploadByUrl(fileUrl);
    const saved = await saveUploadedFile(file, "transparency");
    fileUrl = saved.relativeUrl;
  } else if (removeFile) {
    deleteUploadByUrl(fileUrl);
    fileUrl = null;
  }

  const payload = {
    code: String(formData.get("code") || ""),
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
    file_url: fileUrl,
    updated_at: String(formData.get("updated_at") || todayISO()),
    sort_order: Number(formData.get("sort_order") || 0),
    is_published: boolFromForm(formData.get("is_published")),
  };
  if (!payload.code.trim() || !payload.title.trim() || isRichHtmlEmpty(normalizeRichContent(payload.description))) {
    throw new Error("Código, título e descrição são obrigatórios.");
  }

  if (id) adminUpdateTransparency(id, payload);
  else adminCreateTransparency(payload);

  revalidatePublic();
  revalidatePath("/admin/transparencia");
  redirect(withBasePath("/admin/transparencia"));
}

export async function deleteTransparencyAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetTransparency(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteTransparency(id);
  revalidatePublic();
  revalidatePath("/admin/transparencia");
  redirect(withBasePath("/admin/transparencia"));
}

export async function saveLegislationAction(formData: FormData) {
  await requireAdminSession();
  const idRaw = String(formData.get("id") || "");
  const id = idRaw ? Number(idRaw) : null;
  const existing = id ? adminGetLegislation(id) : null;
  const removeFile = boolFromForm(formData.get("remove_file"));

  let fileUrl = existing?.file_url ?? null;
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    if (fileUrl) deleteUploadByUrl(fileUrl);
    const saved = await saveUploadedFile(file, "legislation");
    fileUrl = saved.relativeUrl;
  } else if (removeFile) {
    deleteUploadByUrl(fileUrl);
    fileUrl = null;
  }

  const payload = {
    title: String(formData.get("title") || ""),
    detail: String(formData.get("detail") || ""),
    file_url: fileUrl,
    sort_order: Number(formData.get("sort_order") || 0),
    is_published: boolFromForm(formData.get("is_published")),
  };
  if (!payload.title.trim() || isRichHtmlEmpty(normalizeRichContent(payload.detail))) {
    throw new Error("Título e detalhe são obrigatórios.");
  }

  if (id) adminUpdateLegislation(id, payload);
  else adminCreateLegislation(payload);

  revalidatePublic();
  revalidatePath("/admin/legislacao");
  redirect(withBasePath("/admin/legislacao"));
}

export async function deleteLegislationAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetLegislation(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteLegislation(id);
  revalidatePublic();
  revalidatePath("/admin/legislacao");
  redirect(withBasePath("/admin/legislacao"));
}
