"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";

/** Um único conjunto de links — desktop e mobile usam a mesma lista */
const navItems = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "Institucional" },
  { href: "/servicos", label: "Serviços" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/noticias", label: "Notícias" },
  { href: "/legislacao", label: "Legislação" },
  { href: "/contato", label: "Contato" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(72);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scrolled, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /** Painel só abaixo do cabeçalho real — a barra não é recriada */
  const menu =
    open && mounted
      ? createPortal(
          <div
            className="site-menu-panel fixed inset-x-0 bottom-0 z-[40] flex flex-col bg-[#fffbf7] lg:hidden"
            style={{ top: headerHeight }}
            id="menu-principal"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-label="Principal">
              <ul className="mx-auto flex w-full max-w-lg flex-col gap-2.5 pb-4">
                {navItems.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li
                      key={item.href}
                      className="site-menu-item"
                      style={{ animationDelay: `${80 + index * 55}ms` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-14 w-full items-center justify-between rounded-full border-2 px-5 py-3.5 text-lg font-semibold transition duration-300 active:scale-[0.98] ${
                          active
                            ? "border-primary bg-primary text-cream"
                            : "border-primary/15 bg-white text-primary hover:border-primary/35 hover:bg-cream-muted active:border-primary/35 active:bg-cream-muted"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span aria-hidden>→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div
                className="site-menu-item mx-auto mt-2 w-full max-w-lg pb-[max(1rem,env(safe-area-inset-bottom))]"
                style={{ animationDelay: `${80 + navItems.length * 55}ms` }}
              >
                <Link
                  href="/area-do-segurado"
                  onClick={() => setOpen(false)}
                  className="btn-glow flex min-h-14 w-full items-center justify-center rounded-full bg-accent text-lg font-bold text-white active:scale-[0.98]"
                >
                  Área do Segurado
                </Link>
              </div>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header sticky top-0 z-50 border-b border-primary/10 transition-[box-shadow,padding] duration-300 ${
          scrolled ? "shadow-[0_10px_32px_rgba(9,68,94,0.12)]" : "shadow-none"
        }`}
        style={{ backgroundColor: "#fffbf7" }}
      >
        <div className="absolute inset-0 z-0 bg-[#fffbf7]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[2px] bg-gradient-to-r from-primary via-accent to-secondary"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-0 site-header-wash" aria-hidden />

        <div
          className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 transition-[padding] duration-300 sm:gap-3 md:px-6 ${
            scrolled ? "py-2 md:py-3" : "py-2.5 md:py-4"
          }`}
        >
          <Link
            href="/"
            className="group flex min-h-11 shrink-0 items-center rounded-2xl sm:min-h-12"
            aria-label="Iprevicon — ir para o início"
          >
            <LogoMark
              assemble
              size="header"
              className="transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-[1.04]"
            />
          </Link>

          <nav
            className="site-nav-island hidden min-w-0 items-center gap-1 overflow-x-auto rounded-full border border-primary/10 bg-white/90 p-1.5 shadow-[0_8px_28px_rgba(9,68,94,0.08)] lg:flex"
            aria-label="Principal"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link shrink-0 ${isActivePath(pathname, item.href) ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex min-h-11 min-w-[5rem] items-center justify-center rounded-full border-2 border-primary/25 bg-white px-4 text-base font-bold text-primary shadow-sm transition duration-300 hover:border-primary/40 hover:bg-cream-muted active:scale-[0.98] active:border-primary/40 active:bg-cream-muted lg:hidden"
              aria-expanded={open}
              aria-controls="menu-principal"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Fechar" : "Menu"}
            </button>

            <Link
              href="/area-do-segurado"
              className="btn-glow hidden min-h-11 items-center rounded-full bg-accent px-5 py-2.5 text-base font-semibold text-white shadow-sm lg:inline-flex"
            >
              Área do Segurado
            </Link>
          </div>
        </div>
      </header>
      {menu}
    </>
  );
}
