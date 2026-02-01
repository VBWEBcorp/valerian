"use client";

import { useMemo, useRef, useState } from "react";
import { renderMarkdown } from "@/lib/markdown";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  rows?: number;
};

function normalizeSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string
) {
  const start = textarea.selectionStart ?? 0;
  const end = textarea.selectionEnd ?? 0;
  const selected = textarea.value.slice(start, end);
  const nextValue =
    textarea.value.slice(0, start) +
    before +
    selected +
    after +
    textarea.value.slice(end);
  const nextStart = start + before.length;
  const nextEnd = nextStart + selected.length;

  return { nextValue, nextStart, nextEnd };
}

function prefixLines(
  textarea: HTMLTextAreaElement,
  prefix: string,
  insertIfEmpty = true
) {
  const start = textarea.selectionStart ?? 0;
  const end = textarea.selectionEnd ?? 0;
  const value = textarea.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const lineEnd = value.indexOf("\n", end);
  const safeLineEnd = lineEnd === -1 ? value.length : lineEnd;
  const block = value.slice(lineStart, safeLineEnd);
  const lines = block.split("\n");
  const nextBlock = lines
    .map((line) => (line || insertIfEmpty ? `${prefix}${line}` : line))
    .join("\n");
  const nextValue =
    value.slice(0, lineStart) + nextBlock + value.slice(safeLineEnd);
  const delta = nextBlock.length - block.length;
  const nextStart = start + prefix.length;
  const nextEnd = end + delta;

  return { nextValue, nextStart, nextEnd };
}

export function MarkdownEditor({
  value,
  onChange,
  label = "Contenu (Markdown)",
  rows = 12,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const preview = useMemo(() => renderMarkdown(value ?? ""), [value]);

  function apply(action: () => {
    nextValue: string;
    nextStart: number;
    nextEnd: number;
  }) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const result = action();
    onChange(result.nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = result.nextStart;
      textarea.selectionEnd = result.nextEnd;
    });
  }

  function handleWrap(before: string, after = before) {
    apply(() => normalizeSelection(textareaRef.current!, before, after));
  }

  function handlePrefix(prefix: string) {
    apply(() => prefixLines(textareaRef.current!, prefix));
  }

  function handleLink() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const selected = textarea.value.slice(start, end) || "texte du lien";
    const url = window.prompt("URL du lien (interne / externe)", "/contact");
    if (!url) return;
    const before = "[";
    const after = `](${url})`;
    apply(() => normalizeSelection(textarea, before, after));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm font-semibold">{label}</label>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`rounded-xl px-3 py-1 ${
              mode === "edit"
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Editeur
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`rounded-xl px-3 py-1 ${
              mode === "preview"
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Apercu
          </button>
        </div>
      </div>
      {mode === "edit" ? (
        <>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => handlePrefix("# ")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => handlePrefix("## ")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => handlePrefix("### ")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              H3
            </button>
            <button
              type="button"
              onClick={() => handleWrap("**")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              Gras
            </button>
            <button
              type="button"
              onClick={() => handleWrap("*")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              Italique
            </button>
            <button
              type="button"
              onClick={handleLink}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              Lien
            </button>
            <button
              type="button"
              onClick={() => handlePrefix("- ")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              Liste
            </button>
            <button
              type="button"
              onClick={() => handlePrefix("> ")}
              className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50"
            >
              Citation
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={rows}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <p className="text-xs text-slate-500">
            Astuce: utilise des liens internes comme /contact ou
            /services/creation-site-internet.
          </p>
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          {preview ? (
            <article
              className="prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          ) : (
            <p className="text-sm text-slate-500">Aucun contenu a previsualiser.</p>
          )}
        </div>
      )}
    </div>
  );
}
