import { getDb } from "@/lib/db";
import { withBasePath } from "@/lib/paths";

export const SATISFACTION_ITEMS = [
  { key: "atendimento", label: "Atendimento recebido" },
  { key: "cordialidade", label: "Cordialidade e respeito" },
  { key: "clareza", label: "Clareza e confiança das informações" },
  { key: "solucao", label: "Solução durante o atendimento" },
  { key: "tempo", label: "Tempo de atendimento" },
] as const;

export const SATISFACTION_SCALE = [
  { value: 5, label: "Muito Satisfeito" },
  { value: 4, label: "Satisfeito" },
  { value: 3, label: "Regular" },
  { value: 2, label: "Insatisfeito" },
  { value: 1, label: "Muito Insatisfeito" },
] as const;

export const NECESSIDADE_OPTIONS = [
  { value: "sim_totalmente", label: "Sim, totalmente" },
  { value: "sim_parcialmente", label: "Sim, parcialmente" },
  { value: "nao", label: "Não" },
  { value: "aguardando", label: "Ainda estou aguardando solução" },
] as const;

export type SatisfactionInput = {
  is_anonymous: boolean;
  nome: string;
  email: string;
  telefone: string;
  rating_atendimento: number;
  rating_cordialidade: number;
  rating_clareza: number;
  rating_solucao: number;
  rating_tempo: number;
  necessidade_atendida: string;
  texto_necessidade: string;
  texto_sugestao: string;
  source?: string;
};

export type SatisfactionRow = SatisfactionInput & {
  id: number;
  created_at: string;
  source: string;
  is_anonymous: boolean;
};

export function sitePublicOrigin(): string {
  const fromEnv = (process.env.SITE_URL || "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

export function satisfactionFormPath(): string {
  return withBasePath("/pesquisa-satisfacao");
}

export function satisfactionFormAbsoluteUrl(): string {
  return `${sitePublicOrigin()}${satisfactionFormPath()}`;
}

export function saveSatisfactionResponse(input: SatisfactionInput): number {
  const db = getDb();
  const anonymous = input.is_anonymous;
  const info = db
    .prepare(
      `INSERT INTO satisfaction_responses (
        is_anonymous, nome, email, telefone,
        rating_atendimento, rating_cordialidade, rating_clareza, rating_solucao, rating_tempo,
        necessidade_atendida, texto_necessidade, texto_sugestao, source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      anonymous ? 1 : 0,
      anonymous ? "" : input.nome.trim(),
      anonymous ? "" : input.email.trim(),
      anonymous ? "" : input.telefone.trim(),
      input.rating_atendimento,
      input.rating_cordialidade,
      input.rating_clareza,
      input.rating_solucao,
      input.rating_tempo,
      input.necessidade_atendida,
      input.texto_necessidade.trim(),
      input.texto_sugestao.trim(),
      input.source?.trim() || "web",
    );
  return Number(info.lastInsertRowid);
}

export function listSatisfactionResponses(opts?: {
  from?: string;
  to?: string;
  limit?: number;
}): SatisfactionRow[] {
  const db = getDb();
  const limit = opts?.limit ?? 500;
  const clauses: string[] = [];
  const params: string[] = [];

  if (opts?.from) {
    clauses.push(`date(created_at) >= date(?)`);
    params.push(opts.from);
  }
  if (opts?.to) {
    clauses.push(`date(created_at) <= date(?)`);
    params.push(opts.to);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = db
    .prepare(
      `SELECT id, is_anonymous, nome, email, telefone,
              rating_atendimento, rating_cordialidade, rating_clareza, rating_solucao, rating_tempo,
              necessidade_atendida, texto_necessidade, texto_sugestao, source, created_at
       FROM satisfaction_responses
       ${where}
       ORDER BY created_at DESC
       LIMIT ?`,
    )
    .all(...params, limit) as Array<
    Omit<SatisfactionRow, "is_anonymous"> & { is_anonymous: number }
  >;

  return rows.map((row) => ({
    ...row,
    is_anonymous: Boolean(row.is_anonymous),
  }));
}

export function countSatisfactionResponses(): number {
  const db = getDb();
  return (db.prepare(`SELECT COUNT(*) AS c FROM satisfaction_responses`).get() as { c: number }).c;
}

export function formatSatisfactionEmail(input: SatisfactionInput & { id: number }): string {
  const necessidade =
    NECESSIDADE_OPTIONS.find((o) => o.value === input.necessidade_atendida)?.label ||
    input.necessidade_atendida;

  const ident = input.is_anonymous
    ? ["Identificação: anônima"]
    : [
        "Identificação:",
        `- Nome: ${input.nome || "(não informado)"}`,
        `- E-mail: ${input.email || "(não informado)"}`,
        `- Telefone: ${input.telefone || "(não informado)"}`,
      ];

  return [
    "Nova resposta — Pesquisa de Satisfação IPREVICON",
    "",
    `ID: ${input.id}`,
    `Origem: ${input.source || "web"}`,
    "",
    ...ident,
    "",
    "Avaliações (1–5):",
    `- Atendimento recebido: ${input.rating_atendimento}`,
    `- Cordialidade e respeito: ${input.rating_cordialidade}`,
    `- Clareza e confiança das informações: ${input.rating_clareza}`,
    `- Solução durante o atendimento: ${input.rating_solucao}`,
    `- Tempo de atendimento: ${input.rating_tempo}`,
    "",
    `Necessidade atendida: ${necessidade}`,
    "",
    "Dúvida / necessidade pendente:",
    input.texto_necessidade || "(não informado)",
    "",
    "Sugestão / elogio / melhoria:",
    input.texto_sugestao || "(não informado)",
    "",
    "— Ouvidoria da Previdência · IPREVICON",
  ].join("\n");
}
