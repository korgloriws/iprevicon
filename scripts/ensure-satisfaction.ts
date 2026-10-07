import { getDb } from "../src/lib/db";
import { countSatisfactionResponses } from "../src/lib/satisfaction";

const db = getDb();
const table = db
  .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='satisfaction_responses'`)
  .get() as { name: string } | undefined;
console.log(table ? `OK ${table.name}` : "MISSING");
console.log(`responses=${countSatisfactionResponses()}`);
