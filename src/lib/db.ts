import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "iprevicon.db");

declare global {
  // eslint-disable-next-line no-var
  var __ipreviconDb: Database.Database | undefined;
}

function ensureSchema(db: Database.Database) {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      category TEXT NOT NULL,
      body TEXT NOT NULL,
      published_at TEXT NOT NULL,
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS transparency_docs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      file_url TEXT,
      updated_at TEXT NOT NULL,
      is_published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS legislation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      detail TEXT NOT NULL,
      file_url TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_published INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      href TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_published INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pro_gestao_docs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_slug TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      file_url TEXT,
      updated_at TEXT NOT NULL,
      is_published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_pro_gestao_topic
      ON pro_gestao_docs (topic_slug, is_published, sort_order);

    CREATE TABLE IF NOT EXISTS satisfaction_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      is_anonymous INTEGER NOT NULL DEFAULT 0,
      nome TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      telefone TEXT NOT NULL DEFAULT '',
      rating_atendimento INTEGER NOT NULL,
      rating_cordialidade INTEGER NOT NULL,
      rating_clareza INTEGER NOT NULL,
      rating_solucao INTEGER NOT NULL,
      rating_tempo INTEGER NOT NULL,
      necessidade_atendida TEXT NOT NULL,
      texto_necessidade TEXT NOT NULL DEFAULT '',
      texto_sugestao TEXT NOT NULL DEFAULT '',
      source TEXT NOT NULL DEFAULT 'web',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_satisfaction_created
      ON satisfaction_responses (created_at);
  `);

  // Migração leve: anexo em notícias
  const newsCols = db.prepare(`PRAGMA table_info(news)`).all() as Array<{ name: string }>;
  if (!newsCols.some((c) => c.name === "file_url")) {
    db.exec(`ALTER TABLE news ADD COLUMN file_url TEXT`);
  }

  // Migração: identificação na pesquisa de satisfação
  const satCols = db.prepare(`PRAGMA table_info(satisfaction_responses)`).all() as Array<{
    name: string;
  }>;
  const satNames = new Set(satCols.map((c) => c.name));
  if (!satNames.has("is_anonymous")) {
    db.exec(`ALTER TABLE satisfaction_responses ADD COLUMN is_anonymous INTEGER NOT NULL DEFAULT 0`);
  }
  if (!satNames.has("nome")) {
    db.exec(`ALTER TABLE satisfaction_responses ADD COLUMN nome TEXT NOT NULL DEFAULT ''`);
  }
  if (!satNames.has("email")) {
    db.exec(`ALTER TABLE satisfaction_responses ADD COLUMN email TEXT NOT NULL DEFAULT ''`);
  }
  if (!satNames.has("telefone")) {
    db.exec(`ALTER TABLE satisfaction_responses ADD COLUMN telefone TEXT NOT NULL DEFAULT ''`);
  }
}

function seedIfEmpty(db: Database.Database) {
  const newsCount = db.prepare("SELECT COUNT(*) AS c FROM news").get() as { c: number };
  if (newsCount.c > 0) return;

  const insertNews = db.prepare(`
    INSERT INTO news (slug, title, excerpt, category, body, published_at)
    VALUES (@slug, @title, @excerpt, @category, @body, @published_at)
  `);

  const newsItems = [
    {
      slug: "prova-de-vida-2026",
      title: "Prova de Vida 2026: período e orientações aos beneficiários",
      excerpt:
        "Aposentados e pensionistas devem realizar a prova de vida no prazo informado para manter o pagamento regular dos benefícios.",
      category: "Comunicado",
      published_at: "2026-04-10",
      body: JSON.stringify([
        "O Iprevicon informa que o período da Prova de Vida 2026 está aberto para aposentados e pensionistas vinculados ao Regime Próprio de Previdência Social de Contagem.",
        "O procedimento é obrigatório para a manutenção do benefício e pode ser realizado presencialmente na sede do Instituto, mediante apresentação de documento oficial com foto.",
        "Recomendamos agendar o atendimento com antecedência e acompanhar os canais oficiais para eventuais atualizações de prazo e locais.",
      ]),
    },
    {
      slug: "crp-vigente",
      title: "Certificado de Regularidade Previdenciária permanece vigente",
      excerpt:
        "O Instituto reforça o compromisso com a conformidade perante o Ministério da Previdência Social e a transparência da gestão.",
      category: "Institucional",
      published_at: "2026-03-18",
      body: JSON.stringify([
        "O Iprevicon comunica que o Certificado de Regularidade Previdenciária (CRP) do município permanece vigente, atestando o cumprimento das obrigações do RPPS.",
        "A manutenção do CRP depende do envio periódico dos demonstrativos legais, como DAIR, DPIN, DRAA e DIPR, disponíveis na seção de Transparência deste portal.",
      ]),
    },
    {
      slug: "novo-portal",
      title: "Novo portal do Iprevicon amplia acesso a serviços e transparência",
      excerpt:
        "A plataforma reúne informações institucionais, carta de serviços e documentos públicos em um ambiente acessível e responsivo.",
      category: "Novidade",
      published_at: "2026-03-05",
      body: JSON.stringify([
        "Com o lançamento do novo portal, o Iprevicon busca aproximar servidores ativos, aposentados, pensionistas e a sociedade das informações previdenciárias do município.",
        "Além de notícias e legislação, o site concentra atalhos para serviços digitais e para o Portal da Transparência, em linha com as boas práticas de gestão de RPPS.",
      ]),
    },
  ];

  const insertDoc = db.prepare(`
    INSERT INTO transparency_docs (code, title, category, description, file_url, updated_at, sort_order)
    VALUES (@code, @title, @category, @description, @file_url, @updated_at, @sort_order)
  `);

  const docs = [
    {
      code: "receita",
      title: "Receita",
      category: "Financeiro",
      description: "Demonstrativos de receitas do Instituto.",
      file_url: null,
      updated_at: "2026-10-07",
      sort_order: 1,
    },
    {
      code: "despesa",
      title: "Despesa",
      category: "Financeiro",
      description: "Demonstrativos de despesas do Instituto.",
      file_url: null,
      updated_at: "2026-10-07",
      sort_order: 2,
    },
    {
      code: "execucao",
      title: "Execução",
      category: "Financeiro",
      description: "Execução orçamentária e financeira.",
      file_url: null,
      updated_at: "2026-10-07",
      sort_order: 3,
    },
    {
      code: "prestacao-contas",
      title: "Prestação de contas",
      category: "Prestação de contas",
      description: "Documentos de prestação de contas do RPPS.",
      file_url: null,
      updated_at: "2026-10-07",
      sort_order: 4,
    },
  ];

  const insertLaw = db.prepare(`
    INSERT INTO legislation (title, detail, file_url, sort_order)
    VALUES (@title, @detail, @file_url, @sort_order)
  `);

  const laws = [
    {
      title: "Lei municipal de instituição do RPPS",
      detail: "Norma local que cria o Regime Próprio e define competências do Instituto.",
      file_url: null,
      sort_order: 1,
    },
    {
      title: "Portaria MTP nº 1.467/2022",
      detail: "Normas gerais dos RPPS e obrigações de escrituração e demonstrativos.",
      file_url: null,
      sort_order: 2,
    },
    {
      title: "Lei nº 9.717/1998",
      detail: "Regras gerais para organização e funcionamento dos regimes próprios.",
      file_url: null,
      sort_order: 3,
    },
    {
      title: "Emenda Constitucional nº 103/2019",
      detail: "Reforma da Previdência e regras de transição aplicáveis aos RPPS.",
      file_url: null,
      sort_order: 4,
    },
    {
      title: "Regimento interno e resoluções",
      detail: "Normas internas de conselhos, comitê de investimentos e procedimentos.",
      file_url: null,
      sort_order: 5,
    },
  ];

  const insertService = db.prepare(`
    INSERT INTO services (title, description, href, sort_order)
    VALUES (@title, @description, @href, @sort_order)
  `);

  const services = [
    {
      title: "Contracheque",
      description: "Consulta ao contracheque — serviço em construção.",
      href: "/servicos#contracheque",
      sort_order: 1,
    },
    {
      title: "Prova de vida",
      description: "Comprovação anual de vida — serviço em construção.",
      href: "/servicos#prova-de-vida",
      sort_order: 2,
    },
  ];

  const insertSetting = db.prepare(`
    INSERT INTO site_settings (key, value) VALUES (@key, @value)
  `);

  const tx = db.transaction(() => {
    for (const item of newsItems) insertNews.run(item);
    for (const doc of docs) insertDoc.run(doc);
    for (const law of laws) insertLaw.run(law);
    for (const service of services) insertService.run(service);
    insertSetting.run({
      key: "segurado_system_url",
      value: process.env.SEGURADO_SYSTEM_URL || "",
    });
    insertSetting.run({
      key: "segurado_system_name",
      value: process.env.SEGURADO_SYSTEM_NAME || "Sistema do Segurado",
    });
  });

  tx();
}

export function getDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!global.__ipreviconDb) {
    const db = new Database(dbPath);
    ensureSchema(db);
    seedIfEmpty(db);
    global.__ipreviconDb = db;
  }

  return global.__ipreviconDb;
}
