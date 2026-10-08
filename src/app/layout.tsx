import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
// @ts-ignore - global CSS import is handled by Next.js
import "./globals.css";

const anek = localFont({
  src: [
    { path: "../fonts/anek-devanagari-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/anek-devanagari-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/anek-devanagari-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-anek",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Iprevicon | Instituto de Previdência de Contagem",
    template: "%s | Iprevicon",
  },
  description:
    "Portal institucional do Instituto de Previdência de Contagem — serviços, transparência e informações do RPPS municipal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${anek.variable} ${montserrat.variable} flex min-h-screen flex-col`}>
        {children}
        {/* VLibras v7 — inicializa sozinho ao carregar o script oficial */}
        <Script
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
