"use client";

import { useId, useState } from "react";
import { withBasePath } from "@/lib/paths";

type Props = {
  label?: string;
  name?: string;
  currentFileUrl?: string | null;
  accept?: string;
  hint?: string;
};

export function AdminFileField({
  label = "Arquivo (PDF ou imagem, até 20 MB)",
  name = "file",
  currentFileUrl,
  accept = ".pdf,application/pdf,image/*",
  hint = "PDF ou imagem · máximo 20 MB",
}: Props) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-primary">{label}</p>

      <div className="rounded-2xl border border-dashed border-primary/25 bg-cream px-4 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary">
              {fileName ? "Arquivo selecionado" : "Nenhum arquivo selecionado"}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted">
              {fileName || hint}
            </p>
          </div>

          <label
            htmlFor={inputId}
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-white transition hover:brightness-110 focus-within:ring-2 focus-within:ring-secondary/40"
          >
            {fileName ? "Trocar arquivo" : "Escolher arquivo"}
            <input
              id={inputId}
              type="file"
              name={name}
              accept={accept}
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setFileName(file?.name ?? null);
              }}
            />
          </label>
        </div>
      </div>

      {currentFileUrl ? (
        <div className="rounded-xl bg-cream-muted px-4 py-3 text-sm">
          <p className="font-semibold text-primary">Arquivo atual</p>
          <a
            href={withBasePath(currentFileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline"
          >
            Abrir arquivo
          </a>
          <label className="mt-2 flex items-center gap-2 font-semibold text-primary">
            <input type="checkbox" name="remove_file" className="size-4" />
            Remover arquivo ao salvar
          </label>
        </div>
      ) : null}
    </div>
  );
}
