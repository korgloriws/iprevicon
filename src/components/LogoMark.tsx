"use client";

import { useEffect, useState } from "react";
import { LogoSvg, LOGO_PART_COUNT } from "@/components/LogoSvg";

type LogoMarkProps = {
  size?: "sm" | "md" | "header" | "lg" | "xl";
  className?: string;
  /** Montagem animada das partes */
  assemble?: boolean;
  /** default = oficial; inverse = claro (rodapé escuro) */
  variant?: "default" | "inverse";
};

const sizes = {
  sm: "h-12 w-12",
  md: "h-14 w-14",
  /** Compacta no celular; cresce no tablet/desktop */
  header: "h-12 w-12 sm:h-[3.25rem] sm:w-[3.25rem] lg:h-14 lg:w-14",
  lg: "h-16 w-16 md:h-20 md:w-20",
  xl: "h-20 w-20 md:h-24 md:w-24",
};

/** Momento (ms) em que cada peça começa a aparecer */
const PART_START_MS = [200, 900, 1650, 2450, 3300];

export function LogoMark({
  size = "md",
  className = "",
  assemble = false,
  variant = "default",
}: LogoMarkProps) {
  const [visibleCount, setVisibleCount] = useState(
    assemble ? 0 : LOGO_PART_COUNT,
  );

  useEffect(() => {
    if (!assemble) {
      setVisibleCount(LOGO_PART_COUNT);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleCount(LOGO_PART_COUNT);
      return;
    }

    setVisibleCount(0);
    const timers = PART_START_MS.map((delay, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), delay),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [assemble]);

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${sizes[size]} ${className}`}>
      <LogoSvg
        variant={variant}
        visibleCount={visibleCount}
        className="h-full w-full"
      />
    </span>
  );
}
