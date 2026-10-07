export type ProGestaoTopic = {
  slug: string;
  title: string;
  description: string;
};

/** Tópicos fixos da aba Pro Gestão — cada um recebe arquivos no admin */
export const PRO_GESTAO_TOPICS: ProGestaoTopic[] = [
  {
    slug: "conselho-municipal-de-previdencia",
    title: "Conselho municipal de previdência",
    description: "Documentos e atas do Conselho Municipal de Previdência.",
  },
  {
    slug: "comite-de-investimento",
    title: "Comitê de investimento",
    description: "Documentos e registros do Comitê de Investimentos.",
  },
  {
    slug: "conselho-fiscal",
    title: "Conselho fiscal",
    description: "Documentos e atas do Conselho Fiscal.",
  },
  {
    slug: "calendario-de-reunioes",
    title: "Calendário de reuniões",
    description: "Calendários e convocações de reuniões.",
  },
  {
    slug: "certidao-de-regularidade",
    title: "Certidão de regularidade",
    description: "Certidões e comprovantes de regularidade.",
  },
  {
    slug: "governanca-corporativa",
    title: "Governança corporativa",
    description: "Políticas e documentos de governança corporativa.",
  },
  {
    slug: "educacao-previdenciaria",
    title: "Educação previdenciária",
    description: "Materiais de educação previdenciária.",
  },
  {
    slug: "codigo-de-etica",
    title: "Código de ética",
    description: "Código de ética e normas de conduta.",
  },
];

export function getProGestaoTopic(slug: string): ProGestaoTopic | undefined {
  return PRO_GESTAO_TOPICS.find((t) => t.slug === slug);
}

export function isProGestaoTopicSlug(slug: string): boolean {
  return PRO_GESTAO_TOPICS.some((t) => t.slug === slug);
}
