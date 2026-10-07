import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesquisa de Satisfação – IPREVICON",
  description:
    "Pesquisa voluntária e sem identificação sobre o atendimento e os serviços do Iprevicon.",
  robots: { index: false, follow: false },
};

/** Layout mínimo — só o formulário (QR / celular) */
export default function PesquisaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <main className="mx-auto max-w-[56rem] px-4 py-8 sm:px-6 sm:py-12">{children}</main>
    </div>
  );
}
