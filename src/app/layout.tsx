import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Anek_Devanagari, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: true,
  loading: () => (
    <header
      className="sticky top-0 z-50 h-16 border-b border-primary/10"
      style={{ backgroundColor: "#fffbf7" }}
      aria-hidden
    />
  ),
});

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
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="page-enter flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
