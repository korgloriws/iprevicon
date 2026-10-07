import { getDb } from "../src/lib/db";

const db = getDb();
const table = db
  .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='pro_gestao_docs'`)
  .get() as { name: string } | undefined;
console.log(table ? `OK table ${table.name}` : "MISSING table");
const count = (db.prepare(`SELECT COUNT(*) AS c FROM pro_gestao_docs`).get() as { c: number }).c;
console.log(`docs=${count}`);
