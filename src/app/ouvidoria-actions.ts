"use server";

import { redirect } from "next/navigation";
import {
  formatSatisfactionEmail,
  saveSatisfactionResponse,
  type SatisfactionInput,
} from "@/lib/satisfaction";
import { sendOuvidoriaEmail } from "@/lib/mail";
import { withBasePath } from "@/lib/paths";

function rating(formData: FormData, key: string): number {
  const n = Number(formData.get(key));
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    throw new Error(`Avaliação inválida: ${key}`);
  }
  return n;
}

export async function submitSatisfactionAction(formData: FormData) {
  const necessidade = String(formData.get("necessidade_atendida") || "");
  const allowed = new Set(["sim_totalmente", "sim_parcialmente", "nao", "aguardando"]);
  if (!allowed.has(necessidade)) {
    throw new Error("Informe se a necessidade foi atendida.");
  }

  const isAnonymous =
    formData.get("is_anonymous") === "1" ||
    formData.get("is_anonymous") === "on" ||
    formData.get("is_anonymous") === "true";

  const nome = String(formData.get("nome") || "").trim().slice(0, 200);
  const email = String(formData.get("email") || "").trim().slice(0, 200);
  const telefone = String(formData.get("telefone") || "").trim().slice(0, 40);

  if (!isAnonymous) {
    if (!nome || !email || !telefone) {
      throw new Error("Informe nome, e-mail e telefone, ou marque a opção anônima.");
    }
  }

  const payload: SatisfactionInput = {
    is_anonymous: isAnonymous,
    nome: isAnonymous ? "" : nome,
    email: isAnonymous ? "" : email,
    telefone: isAnonymous ? "" : telefone,
    rating_atendimento: rating(formData, "rating_atendimento"),
    rating_cordialidade: rating(formData, "rating_cordialidade"),
    rating_clareza: rating(formData, "rating_clareza"),
    rating_solucao: rating(formData, "rating_solucao"),
    rating_tempo: rating(formData, "rating_tempo"),
    necessidade_atendida: necessidade,
    texto_necessidade: String(formData.get("texto_necessidade") || "").slice(0, 4000),
    texto_sugestao: String(formData.get("texto_sugestao") || "").slice(0, 4000),
    source: String(formData.get("source") || "web").slice(0, 40),
  };

  const id = saveSatisfactionResponse(payload);

  await sendOuvidoriaEmail({
    subject: `[IPREVICON] Pesquisa de satisfação #${id}`,
    text: formatSatisfactionEmail({ ...payload, id }),
  });

  redirect(withBasePath("/pesquisa-satisfacao/obrigado"));
}
