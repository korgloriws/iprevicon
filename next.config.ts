import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.join(__dirname);

/** Prefixo público atrás de reverse proxy (ex.: /iprevicon). Vazio = raiz. */
const basePath = (process.env.BASE_PATH || "").replace(/\/$/, "");

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  // Standalone só no build Docker (local continua com `next start`)
  ...(process.env.DOCKER_BUILD === "1" ? { output: "standalone" as const } : {}),
  // Força a raiz do projeto (evita conflitar com package-lock.json na pasta do usuário)
  outputFileTracingRoot: projectRoot,
  serverExternalPackages: ["better-sqlite3"],
  // Acesso via IP na rede local (dev) — evita CSS/JS de /_next bloqueados
  allowedDevOrigins: ["10.131.1.227", "127.0.0.1", "localhost"],
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    const security = [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vlibras.gov.br https://www.vlibras.gov.br",
              "script-src-elem 'self' 'unsafe-inline' https://vlibras.gov.br https://www.vlibras.gov.br",
              "style-src 'self' 'unsafe-inline' https://vlibras.gov.br https://www.vlibras.gov.br",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://vlibras.gov.br https://www.vlibras.gov.br",
              "connect-src 'self' https://vlibras.gov.br https://www.vlibras.gov.br wss://vlibras.gov.br",
              "media-src 'self' https://vlibras.gov.br https://www.vlibras.gov.br blob:",
              "worker-src 'self' blob: https://vlibras.gov.br",
              "child-src 'self' blob: https://vlibras.gov.br",
              "frame-src 'self' https://www.google.com https://maps.google.com https://www.openstreetmap.org https://vlibras.gov.br https://www.vlibras.gov.br",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          ...(isProd
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains",
                },
              ]
            : []),
        ],
      },
    ];

    if (!isProd) return security;

    return [
      ...security,
      {
        source: "/logo/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
