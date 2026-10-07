import sanitizeHtmlLib from "sanitize-html";
import { marked } from "marked";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "pre",
  "code",
  "hr",
  "span",
  "div",
];

const ALLOWED_ATTR: Record<string, string[]> = {
  a: ["href", "target", "rel", "class"],
  span: ["class"],
  div: ["class"],
  p: ["class"],
  h1: ["class"],
  h2: ["class"],
  h3: ["class"],
  h4: ["class"],
  ul: ["class"],
  ol: ["class"],
  li: ["class"],
  blockquote: ["class"],
  pre: ["class"],
  code: ["class"],
};

/** Sanitiza HTML para armazenamento e exibição pública. */
export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html || "", {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTR,
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  }).trim();
}

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function looksLikeMarkdown(value: string): boolean {
  return /(^|\n)\s{0,3}(#{1,4}\s|[-*+]\s|\d+\.\s|>\s|```|\[.+\]\(.+\))/.test(value);
}

/**
 * Normaliza conteúdo colado/digitado: HTML, Markdown ou texto puro → HTML limpo.
 */
export function normalizeRichContent(input: string): string {
  const raw = (input || "").trim();
  if (!raw) return "";

  // Legacy: JSON array de parágrafos
  if (raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        return sanitizeHtml(
          parsed
            .map((p) => `<p>${String(p)}</p>`)
            .join(""),
        );
      }
    } catch {
      /* segue */
    }
  }

  if (looksLikeHtml(raw)) {
    return sanitizeHtml(raw);
  }

  if (looksLikeMarkdown(raw)) {
    const html = marked.parse(raw, { async: false, breaks: true }) as string;
    return sanitizeHtml(html);
  }

  // Texto puro → parágrafos
  const paragraphs = raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return sanitizeHtml(paragraphs || `<p>${raw}</p>`);
}

/** Converte body legado (JSON array ou HTML) para HTML editável. */
export function bodyToEditableHtml(body: string): string {
  return normalizeRichContent(body);
}

export function isRichHtmlEmpty(html: string): boolean {
  const text = sanitizeHtml(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text.length === 0;
}
