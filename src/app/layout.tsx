import type { Metadata } from "next";
import { Anek_Devanagari, Montserrat } from "next/font/google";
// @ts-ignore - global CSS import is handled by Next.js
import "./globals.css";

const anek = Anek_Devanagari({
  subsets: ["latin"],
  variable: "--font-anek",
  display: "swap",
  weight: ["500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
      </body>
    </html>
  );
}
