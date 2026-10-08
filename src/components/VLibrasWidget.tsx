"use client";

import { useEffect } from "react";

const SCRIPT_ID = "vlibras-plugin-script";
const APP_ROOT = "https://vlibras.gov.br/app";

/**
 * Widget oficial VLibras (v7+) — https://vlibras.gov.br
 * O script cria o botão flutuante sozinho (shadow DOM).
 */
export function VLibrasWidget() {
  useEffect(() => {
    if (
      document.getElementById("vlibras-access-wrapper") ||
      document.getElementById(SCRIPT_ID)
    ) {
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `${APP_ROOT}/vlibras-plugin.js`;
    script.async = true;
    script.onerror = () => {
      console.error("[VLibras] Falha ao carregar o script oficial.");
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
