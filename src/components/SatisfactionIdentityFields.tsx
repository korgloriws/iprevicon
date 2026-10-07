"use client";

import { useState } from "react";

export function SatisfactionIdentityFields() {
  const [anonymous, setAnonymous] = useState(false);

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Identificação</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-primary lg:text-xl">
        Seus dados
      </h2>
      <p className="mt-3 max-w-2xl text-base text-muted">
        Informe seus dados para eventual retorno da Ouvidoria, ou marque a opção anônima.
      </p>

      <label className="mt-6 flex max-w-xl cursor-pointer items-center gap-3 rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-sm font-semibold text-primary transition hover:border-primary/30">
        <input
          type="checkbox"
          name="is_anonymous"
          value="1"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="size-4 accent-accent"
        />
        Responder de forma anônima
      </label>

      {!anonymous ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-primary sm:col-span-2">
            Nome completo
            <input
              type="text"
              name="nome"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-base font-normal text-ink outline-none transition focus:border-secondary"
              placeholder="Seu nome"
            />
          </label>
          <label className="block text-sm font-semibold text-primary">
            E-mail
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-base font-normal text-ink outline-none transition focus:border-secondary"
              placeholder="voce@email.com"
            />
          </label>
          <label className="block text-sm font-semibold text-primary">
            Telefone
            <input
              type="tel"
              name="telefone"
              required
              autoComplete="tel"
              className="mt-2 w-full rounded-2xl border border-primary/15 bg-cream px-4 py-3.5 text-base font-normal text-ink outline-none transition focus:border-secondary"
              placeholder="(31) 90000-0000"
            />
          </label>
        </div>
      ) : (
        <>
          <input type="hidden" name="nome" value="" />
          <input type="hidden" name="email" value="" />
          <input type="hidden" name="telefone" value="" />
          <p className="mt-5 text-sm text-muted">
            Modo anônimo ativo — nome, e-mail e telefone não serão solicitados nem gravados.
          </p>
        </>
      )}
    </section>
  );
}
