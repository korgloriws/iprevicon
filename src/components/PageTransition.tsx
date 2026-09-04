"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Suaviza a entrada do conteúdo a cada navegação (respeita reduced-motion). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const el = document.getElementById("conteudo");
    if (!el) return;
    el.classList.remove("page-enter");
    // force reflow
    void el.offsetWidth;
    el.classList.add("page-enter");
  }, [pathname]);

  return <>{children}</>;
}
