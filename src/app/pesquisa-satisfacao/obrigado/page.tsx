import { CloseAfterThanks } from "@/components/CloseAfterThanks";
import { LogoMark } from "@/components/LogoMark";

export default function PesquisaObrigadoPage() {
  return (
    <div className="rounded-3xl border border-primary/10 bg-white px-6 py-12 text-center sm:px-10">
      <div className="mx-auto flex justify-center">
        <LogoMark size="lg" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold text-primary">Obrigado!</h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
        Sua resposta foi registrada pela Ouvidoria da Previdência. Ela ajuda a melhorar o
        atendimento do IPREVICON.
      </p>
      <p className="mt-6 font-display text-sm font-semibold italic text-accent">
        Ouvir. Acolher. Orientar. Melhorar.
      </p>
      <CloseAfterThanks />
    </div>
  );
}
