"use client";

import { useEffect, useRef, useState } from "react";

type RichTextEditorProps = {
  name: string;
  label: string;
  hint?: string;
  initialHtml?: string;
  required?: boolean;
};

function ToolbarButton({
  onClick,
  children,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="rounded-lg bg-white px-2.5 py-1.5 text-sm font-semibold text-primary transition hover:bg-cream-muted"
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  label,
  hint,
  initialHtml = "",
  required = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"visual" | "html" | "markdown">("visual");
  const [htmlSource, setHtmlSource] = useState(initialHtml || "<p></p>");
  const [markdownSource, setMarkdownSource] = useState("");

  useEffect(() => {
    if (mode !== "visual" || !editorRef.current) return;
    editorRef.current.innerHTML = htmlSource || "<p></p>";
    // seed / re-enter visual only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function syncFromEditor() {
    if (!editorRef.current) return;
    setHtmlSource(editorRef.current.innerHTML || "<p></p>");
  }

  function runCommand(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncFromEditor();
  }

  function setLink() {
    const previous =
      window.getSelection()?.anchorNode?.parentElement?.closest("a")?.getAttribute("href") ||
      "https://";
    const url = window.prompt("URL do link", previous);
    if (url === null) return;
    if (url === "") {
      runCommand("unlink");
      return;
    }
    runCommand("createLink", url);
  }

  function applyMarkdown() {
    // O servidor (normalizeRichContent) converte Markdown → HTML na hora de salvar
    setHtmlSource(markdownSource.trim() || "");
    setMode("html");
  }

  function switchMode(next: "visual" | "html" | "markdown") {
    if (mode === "visual") syncFromEditor();
    if (next === "markdown") setMarkdownSource("");
    setMode(next);
  }

  return (
    <div className="block">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <label className="text-sm font-semibold text-primary">
          {label}
          {hint ? <span className="mt-1 block text-xs font-normal text-muted">{hint}</span> : null}
        </label>
        <div className="flex flex-wrap gap-1">
          {(
            [
              ["visual", "Visual"],
              ["html", "HTML"],
              ["markdown", "Markdown"],
            ] as const
          ).map(([key, text]) => (
            <button
              key={key}
              type="button"
              onClick={() => switchMode(key)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                mode === key ? "bg-accent text-white" : "bg-cream-muted text-primary"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <input type="hidden" name={name} value={htmlSource} required={required} readOnly />

      {mode === "visual" ? (
        <div className="mt-1.5 overflow-hidden rounded-xl border border-primary/15 bg-cream">
          <div className="flex flex-wrap gap-1 border-b border-primary/10 bg-white p-2">
            <ToolbarButton title="Negrito" onClick={() => runCommand("bold")}>
              N
            </ToolbarButton>
            <ToolbarButton title="Itálico" onClick={() => runCommand("italic")}>
              I
            </ToolbarButton>
            <ToolbarButton title="Sublinhado" onClick={() => runCommand("underline")}>
              S
            </ToolbarButton>
            <ToolbarButton title="Título" onClick={() => runCommand("formatBlock", "h2")}>
              H2
            </ToolbarButton>
            <ToolbarButton title="Subtítulo" onClick={() => runCommand("formatBlock", "h3")}>
              H3
            </ToolbarButton>
            <ToolbarButton title="Lista" onClick={() => runCommand("insertUnorderedList")}>
              • Lista
            </ToolbarButton>
            <ToolbarButton title="Lista numerada" onClick={() => runCommand("insertOrderedList")}>
              1. Lista
            </ToolbarButton>
            <ToolbarButton title="Link" onClick={setLink}>
              Link
            </ToolbarButton>
            <ToolbarButton title="Citação" onClick={() => runCommand("formatBlock", "blockquote")}>
              “”
            </ToolbarButton>
            <ToolbarButton title="Parágrafo" onClick={() => runCommand("formatBlock", "p")}>
              P
            </ToolbarButton>
          </div>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncFromEditor}
            onBlur={syncFromEditor}
            className="prose-admin min-h-[220px] max-w-none px-4 py-3 outline-none"
          />
        </div>
      ) : null}

      {mode === "html" ? (
        <textarea
          value={htmlSource}
          onChange={(e) => setHtmlSource(e.target.value)}
          rows={14}
          className="mt-1.5 w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 font-mono text-sm outline-none focus:border-secondary"
          placeholder="<p>Cole ou edite HTML aqui…</p>"
        />
      ) : null}

      {mode === "markdown" ? (
        <div className="mt-1.5 space-y-2">
          <textarea
            value={markdownSource}
            onChange={(e) => setMarkdownSource(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-primary/15 bg-cream px-4 py-3 font-mono text-sm outline-none focus:border-secondary"
            placeholder={"# Título\n\nTexto em **negrito** e lista:\n\n- item 1\n- item 2"}
          />
          <button
            type="button"
            onClick={applyMarkdown}
            className="inline-flex min-h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-cream"
          >
            Usar Markdown (convertido ao salvar)
          </button>
        </div>
      ) : null}
    </div>
  );
}
