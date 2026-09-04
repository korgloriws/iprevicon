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
  `);
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
      code: "crp",
      title: "Certificado de Regularidade Previdenciária – CRP",
      category: "Regularidade",
      description:
        "Documento que atesta a regularidade do RPPS perante o Ministério da Previdência Social.",
      file_url: null,
      updated_at: "2026-02-20",
      sort_order: 1,
    },
    {
      code: "dair",
      title: "Demonstrativo das Aplicações e Investimentos – DAIR",
      category: "Investimentos",
      description: "Relatório periódico das aplicações e investimentos dos recursos previdenciários.",
      file_url: null,
      updated_at: "2026-02-15",
      sort_order: 2,
    },
    {
      code: "dpin",
      title: "Demonstrativo da Política de Investimentos – DPIN",
      category: "Investimentos",
      description: "Política anual de investimentos do Regime Próprio de Previdência Social.",
      file_url: null,
      updated_at: "2026-01-30",
      sort_order: 3,
    },
    {
      code: "draa",
      title: "Demonstrativo de Resultados da Avaliação Atuarial – DRAA",
      category: "Atuarial",
      description: "Resultados da avaliação atuarial anual do plano previdenciário.",
      file_url: null,
      updated_at: "2026-01-20",
      sort_order: 4,
    },
    {
      code: "dipr",
      title: "Demonstrativo de Informações Previdenciárias e Repasses – DIPR",
      category: "Arrecadação",
      description: "Informações sobre contribuições, repasses e obrigações previdenciárias do ente.",
      file_url: null,
      updated_at: "2026-02-10",
      sort_order: 5,
    },
    {
      code: "receitas",
      title: "Receitas arrecadadas",
      category: "Finanças",
      description: "Demonstrativo das receitas do Instituto no exercício corrente.",
      file_url: null,
      updated_at: "2026-02-28",
      sort_order: 6,
    },
    {
      code: "despesas",
      title: "Despesas e execução orçamentária",
      category: "Finanças",
      description: "Empenhos, liquidações e pagamentos realizados pelo Iprevicon.",
      file_url: null,
      updated_at: "2026-02-28",
      sort_order: 7,
    },
    {
      code: "licitacoes",
      title: "Licitações, contratos e dispensas",
      category: "Contratações",
      description: "Processos de compras, contratos administrativos e dispensas de licitação.",
      file_url: null,
      updated_at: "2026-02-12",
      sort_order: 8,
    },
    {
      code: "atas",
      title: "Atas de conselhos e comitê de investimentos",
      category: "Governança",
      description: "Atas das reuniões dos órgãos colegiados e do comitê de investimentos.",
      file_url: null,
      updated_at: "2026-02-05",
      sort_order: 9,
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
      title: "Consulta de holerite",
      description: "Acesse o contracheque de aposentadoria ou pensão no sistema do segurado.",
      href: "/area-do-segurado",
      sort_order: 1,
    },
    {
      title: "Prova de vida",
      description: "Confira prazos, documentos e canais para a comprovação anual de vida.",
      href: "/servicos#prova-de-vida",
      sort_order: 2,
    },
    {
      title: "Simulação de aposentadoria",
      description: "Projete cenários de aposentadoria conforme as regras do RPPS.",
      href: "/area-do-segurado",
      sort_order: 3,
    },
    {
      title: "Certidão de Tempo de Contribuição",
      description: "Solicite a CTC municipal para averbações e contagem de tempo.",
      href: "/servicos#ctc",
      sort_order: 4,
    },
    {
      title: "Protocolo e requerimentos",
      description: "Abra solicitações previdenciárias e acompanhe o andamento.",
      href: "/area-do-segurado",
      sort_order: 5,
    },
    {
      title: "Carta de serviços",
      description: "Conheça os serviços oferecidos pelo Instituto e seus requisitos.",
      href: "/servicos",
      sort_order: 6,
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
