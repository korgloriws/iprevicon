/** Prefixo público (ex.: /iprevicon). Vazio = raiz. */
export function basePath(): string {
  return (process.env.BASE_PATH || "").replace(/\/$/, "");
}

/** Monta URL pública respeitando BASE_PATH. */
export function withBasePath(path: string): string {
  const base = basePath();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
