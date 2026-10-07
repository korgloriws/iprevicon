/**
 * Garante schema + seed do SQLite local.
 * Uso: npm run db:seed
 *
 * Se o arquivo estiver em uso (servidor rodando), apenas valida a conexão.
 */
import path from "path";
import { getDb } from "../src/lib/db";

const dbPath = path.join(process.cwd(), "data", "iprevicon.db");

try {
  getDb();
  console.log(`Banco pronto em ${dbPath}`);
} catch (error) {
  console.error("Não foi possível preparar o banco. Pare o servidor (npm run dev) e tente de novo.");
  console.error(error);
  process.exit(1);
}
