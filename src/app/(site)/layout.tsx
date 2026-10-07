import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

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

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
    </>
  );
}
