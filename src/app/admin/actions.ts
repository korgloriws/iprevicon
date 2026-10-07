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
  adminCreateProGestao,
  adminCreateTransparency,
  adminDeleteLegislation,
  adminDeleteNews,
  adminDeleteProGestao,
  adminDeleteTransparency,
  adminGetLegislation,
  adminGetNews,
  adminGetProGestao,
  adminGetTransparency,
  adminUpdateLegislation,
  adminUpdateNews,
  adminUpdateProGestao,
  adminUpdateTransparency,
} from "@/lib/admin";
import { isRichHtmlEmpty, normalizeRichContent } from "@/lib/html";
import { isProGestaoTopicSlug } from "@/lib/pro-gestao";
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
  revalidatePath("/pro-gestao");
}

export async function loginAction(formData: FormData) {
  const user = String(formData.get("user") || "");
  const password = String(formData.get("password") || "");
  if (!verifyAdminCredentials(user, password)) {
    redirect("/admin/login?erro=1");
  }
  const token = createSessionToken(user);
  const jar = await cookies();
  jar.set(sessionCookieOptions(token));
  // next.config basePath já prefixa o redirect — não usar withBasePath aqui
  redirect("/admin");
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
  redirect("/admin/noticias");
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetNews(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteNews(id);
  revalidatePublic();
  revalidatePath("/admin/noticias");
  redirect("/admin/noticias");
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
  redirect("/admin/transparencia");
}

export async function deleteTransparencyAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetTransparency(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteTransparency(id);
  revalidatePublic();
  revalidatePath("/admin/transparencia");
  redirect("/admin/transparencia");
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
  redirect("/admin/legislacao");
}

export async function deleteLegislationAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetLegislation(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteLegislation(id);
  revalidatePublic();
  revalidatePath("/admin/legislacao");
  redirect("/admin/legislacao");
}

export async function saveProGestaoAction(formData: FormData) {
  await requireAdminSession();
  const idRaw = String(formData.get("id") || "");
  const id = idRaw ? Number(idRaw) : null;
  const existing = id ? adminGetProGestao(id) : null;
  const removeFile = boolFromForm(formData.get("remove_file"));

  let fileUrl = existing?.file_url ?? null;
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    if (fileUrl) deleteUploadByUrl(fileUrl);
    const saved = await saveUploadedFile(file, "pro-gestao");
    fileUrl = saved.relativeUrl;
  } else if (removeFile) {
    deleteUploadByUrl(fileUrl);
    fileUrl = null;
  }

  const topicSlug = String(formData.get("topic_slug") || "");
  const payload = {
    topic_slug: topicSlug,
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    file_url: fileUrl,
    updated_at: String(formData.get("updated_at") || todayISO()),
    sort_order: Number(formData.get("sort_order") || 0),
    is_published: boolFromForm(formData.get("is_published")),
  };

  if (!isProGestaoTopicSlug(payload.topic_slug) || !payload.title.trim()) {
    throw new Error("Tópico e título são obrigatórios.");
  }

  if (id) adminUpdateProGestao(id, payload);
  else adminCreateProGestao(payload);

  revalidatePublic();
  revalidatePath(`/pro-gestao/${payload.topic_slug}`);
  revalidatePath("/admin/pro-gestao");
  redirect("/admin/pro-gestao");
}

export async function deleteProGestaoAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const existing = adminGetProGestao(id);
  deleteUploadByUrl(existing?.file_url);
  adminDeleteProGestao(id);
  revalidatePublic();
  if (existing?.topic_slug) revalidatePath(`/pro-gestao/${existing.topic_slug}`);
  revalidatePath("/admin/pro-gestao");
  redirect("/admin/pro-gestao");
}
