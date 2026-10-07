"use client";

import { useMemo, useState } from "react";

type Props = {
  formUrl: string;
  qrDataUrl: string;
};

export function OuvidoriaFormTools({ formUrl, qrDataUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const waFormUrl = useMemo(() => {
    const u = new URL(
      formUrl,
      typeof window !== "undefined" ? window.location.origin : "http://localhost",
    );
    u.searchParams.set("src", "whatsapp");
    return u.toString();
  }, [formUrl]);

  const emailFormUrl = useMemo(() => {
    const u = new URL(
      formUrl,
      typeof window !== "undefined" ? window.location.origin : "http://localhost",
    );
    u.searchParams.set("src", "email");
    return u.toString();
  }, [formUrl]);

  const waExportText = useMemo(
    () =>
      [
        "PESQUISA DE SATISFAÇÃO – IPREVICON",
        "",
        "Olá! Para avaliar o atendimento do IPREVICON, responda a pesquisa de satisfação no link abaixo:",
        waFormUrl,
        "",
        "É rápido, voluntário e você pode se identificar ou responder de forma anônima.",
      ].join("\n"),
    [waFormUrl],
  );

  const emailExportText = useMemo(
    () =>
      [
        "PESQUISA DE SATISFAÇÃO – IPREVICON",
        "",
        "Olá! Para avaliar o atendimento do IPREVICON, responda a pesquisa de satisfação no link abaixo:",
        emailFormUrl,
        "",
        "É rápido, voluntário e você pode se identificar ou responder de forma anônima.",
      ].join("\n"),
    [emailFormUrl],
  );

  const waExport = useMemo(
    () => `https://wa.me/?text=${encodeURIComponent(waExportText)}`,
    [waExportText],
  );

  const mailExport = useMemo(() => {
    const subject = encodeURIComponent("Pesquisa de Satisfação – IPREVICON");
    const body = encodeURIComponent(emailExportText);
    return `mailto:?subject=${subject}&body=${body}`;
  }, [emailExportText]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copie o link da pesquisa:", formUrl);
    }
  }

  return (
    <div className="rounded-3xl border border-primary/10 bg-white px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold text-primary">Enviar ao usuário</h3>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-white transition hover:bg-accent-soft sm:w-fit"
            >
              Abrir formulário
            </a>
            <div className="grid gap-2 sm:grid-cols-3 sm:max-w-xl">
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary/20 bg-cream px-4 text-sm font-semibold text-primary transition hover:bg-white"
              >
                {copied ? "Link copiado!" : "Copiar link"}
              </button>
              <a
                href={waExport}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:brightness-95"
              >
                WhatsApp
              </a>
              <a
                href={mailExport}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary/20 bg-cream px-4 text-sm font-semibold text-primary transition hover:bg-white"
              >
                E-mail
              </a>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center self-center rounded-2xl border border-primary/10 bg-cream-muted/60 p-5 lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt="QR Code da Pesquisa de Satisfação IPREVICON"
            width={168}
            height={168}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
