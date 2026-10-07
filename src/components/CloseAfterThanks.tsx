"use client";

import { useEffect, useState } from "react";

/** Tenta fechar a aba/janela após o envio da pesquisa. */
export function CloseAfterThanks() {
  const [closing, setClosing] = useState(false);
  const [canClose, setCanClose] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setClosing(true);
      window.close();
      // Se o navegador bloquear (aba não aberta por script), mantém a mensagem
      window.setTimeout(() => setCanClose(false), 400);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  function handleClose() {
    setClosing(true);
    window.close();
    window.setTimeout(() => setCanClose(false), 300);
  }

  return (
    <div className="mt-8 space-y-3">
      <button
        type="button"
        onClick={handleClose}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-white transition hover:bg-accent-soft"
      >
        Fechar
      </button>
      <p className="text-sm text-muted">
        {closing && canClose
          ? "Encerrando esta tela…"
          : !canClose
            ? "Pode fechar esta aba do navegador."
            : "Esta tela será encerrada automaticamente em instantes."}
      </p>
    </div>
  );
}
