import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logPath = path.join(root, "dev-crash-trace.log");
const log = createWriteStream(logPath, { flags: "w" });
const line = (msg) => {
  const s = `[${new Date().toISOString()}] ${msg}`;
  console.log(s);
  log.write(s + "\n");
};

line(`cwd=${root}`);
line(`node=${process.version}`);

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, ["--trace-uncaught", "--trace-warnings", nextBin, "dev", "-H", "127.0.0.1", "-p", "3000"], {
  cwd: root,
  env: {
    ...process.env,
    CI: "1",
    FORCE_COLOR: "0",
    __NEXT_DISABLE_MEMORY_WATCHER: "1",
  },
  stdio: ["pipe", "pipe", "pipe"], // keep stdin open (pipe, never ended)
});

line(`spawned pid=${child.pid}`);

child.stdout.on("data", (b) => {
  const t = b.toString();
  process.stdout.write(t);
  log.write(t);
});
child.stderr.on("data", (b) => {
  const t = b.toString();
  process.stderr.write(t);
  log.write(t);
});

child.on("exit", (code, signal) => {
  line(`PARENT_EXIT code=${code} signal=${signal}`);
  log.end();
});

// Wait for ready, then hit homepage twice
await sleep(8000);
line("requesting / ...");
for (let i = 1; i <= 3; i++) {
  try {
    const res = await fetch("http://127.0.0.1:3000/", { redirect: "manual" });
    const text = await res.text();
    line(`fetch#${i} status=${res.status} len=${text.length} hasError=${/Runtime Error|encoding-lite|Application error/i.test(text)}`);
  } catch (e) {
    line(`fetch#${i} FAIL ${e.message}`);
  }
  await sleep(2000);
}

await sleep(5000);
if (child.exitCode === null && child.signalCode === null) {
  line("STILL_ALIVE after requests — killing for cleanup");
  child.kill("SIGTERM");
} else {
  line(`already dead exit=${child.exitCode} signal=${child.signalCode}`);
}
