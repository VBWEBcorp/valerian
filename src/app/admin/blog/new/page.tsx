"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { MarkdownEditor } from "@/components/MarkdownEditor";

export default function AdminBlogNewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    title: "",
    meta_title: "",
    meta_description: "",
    excerpt: "",
    intent: "Article",
    focus_keyword: "",
    canonical_url: "",
    og_image_url: "",
    author_name: "",
    cover_image_url: "",
    content_markdown: "",
    published: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setError("Impossible de créer l’article. Vérifie les champs.");
      setSaving(false);
      return;
    }
    router.push("/admin/blog");
  }

  return (
    <Section>
      <Container>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Blog
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Nouvel article
          </h2>
          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-semibold">Slug</label>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm({ ...form, slug: event.target.value })
                }
                placeholder="ex: site-vitrine-qui-convertit"
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Titre</label>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Meta title</label>
              <input
                value={form.meta_title}
                onChange={(event) =>
                  setForm({ ...form, meta_title: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Meta description</label>
              <textarea
                value={form.meta_description}
                onChange={(event) =>
                  setForm({ ...form, meta_description: event.target.value })
                }
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(event) =>
                  setForm({ ...form, excerpt: event.target.value })
                }
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Catégorie / Intent</label>
              <input
                value={form.intent}
                onChange={(event) =>
                  setForm({ ...form, intent: event.target.value })
                }
                placeholder="ex: SEO stratégique, Conversion / UX"
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Cette catégorie s'affiche sur la carte de l'article (ex: "SEO stratégique", "Article").
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Mot-clé principal</label>
              <input
                value={form.focus_keyword}
                onChange={(event) =>
                  setForm({ ...form, focus_keyword: event.target.value })
                }
                placeholder="ex: seo pour tpe pme"
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
              <p className="mt-1 text-xs text-slate-500">
                Utilisé pour le SEO (RankMath).
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">URL canonique</label>
              <input
                value={form.canonical_url}
                onChange={(event) =>
                  setForm({ ...form, canonical_url: event.target.value })
                }
                placeholder="/blog/slug ou https://..."
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
              <p className="mt-1 text-xs text-slate-500">
                Laisse vide pour utiliser l’URL automatique.
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Image OpenGraph (URL)</label>
              <input
                value={form.og_image_url}
                onChange={(event) =>
                  setForm({ ...form, og_image_url: event.target.value })
                }
                placeholder="https://..."
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
              <p className="mt-1 text-xs text-slate-500">
                Utilisée pour le partage social (LinkedIn, WhatsApp, etc.).
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Auteur</label>
              <input
                value={form.author_name}
                onChange={(event) =>
                  setForm({ ...form, author_name: event.target.value })
                }
                placeholder="Valérian Digital"
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Image (URL)</label>
              <input
                value={form.cover_image_url}
                onChange={(event) =>
                  setForm({ ...form, cover_image_url: event.target.value })
                }
                placeholder="https://..."
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Image obligatoire pour l’affichage des articles.
              </p>
            </div>
            <MarkdownEditor
              value={form.content_markdown}
              onChange={(value) => setForm({ ...form, content_markdown: value })}
              label="Contenu"
              rows={14}
            />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) =>
                  setForm({ ...form, published: event.target.checked })
                }
              />
              Publier l’article
            </label>
          </div>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            {saving ? "Création..." : "Créer l’article"}
          </button>
        </form>
      </Container>
    </Section>
  );
}
