"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type NewsCarouselItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
};

type NewsCarouselProps = {
  news: NewsCarouselItem[];
};

const AUTO_MS = 5500;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchX = useRef<number | null>(null);

  const count = news.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
      setProgressKey((k) => k + 1);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mesmo com reduced motion, avança o conteúdo (sem animação CSS)
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
      setProgressKey((k) => k + 1);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [count, paused]);

  if (count === 0) {
    return (
      <p className="mt-10 text-lg text-muted">Nenhuma notícia publicada no momento.</p>
    );
  }

  const item = news[index];

  return (
    <div className="relative mt-10">
      <div
        className="overflow-hidden"
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) < 48) return;
          go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <article
          key={item.slug}
          className="news-slide relative border-t-[3px] border-accent bg-cream px-5 py-7 sm:px-8 lg:px-8 lg:py-8"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {item.category} · {formatDate(item.published_at)}
          </p>
          <h3 className="mt-3 max-w-3xl font-display text-2xl font-semibold text-primary lg:text-[1.65rem]">
            <Link
              href={`/noticias/${item.slug}`}
              className="transition-colors hover:text-secondary"
            >
              {item.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:text-base">
            {item.excerpt}
          </p>
          <Link
            href={`/noticias/${item.slug}`}
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-cream transition hover:bg-secondary lg:min-h-10 lg:text-sm"
          >
            Ler notícia completa
          </Link>

          {count > 1 && !paused ? (
            <div
              key={progressKey}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left bg-accent/80 news-progress"
              aria-hidden
            />
          ) : null}
        </article>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Notícias do carrossel">
          {news.map((n, i) => (
            <button
              key={n.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Notícia ${i + 1} de ${count}: ${n.title}`}
              onClick={() => go(i)}
              className={`h-3.5 min-w-3.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-10 bg-accent"
                  : "w-3.5 bg-primary/25 hover:bg-primary/45"
              }`}
            />
          ))}
        </div>

        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-cream text-lg font-bold text-primary transition hover:border-primary/40 hover:bg-white"
            aria-label="Notícia anterior"
          >
            ←
          </button>
          <p className="min-w-[4.5rem] text-center text-base font-semibold text-muted" aria-hidden>
            {index + 1} / {count}
          </p>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-cream text-lg font-bold text-primary transition hover:border-primary/40 hover:bg-white"
            aria-label="Próxima notícia"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
