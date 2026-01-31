"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default function AdminBlogNewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    title: "",
    meta_title: "",
    meta_description: "",
    excerpt: "",
    intent: "Article",
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
        <form onSubmit={handleSubmit} className="card rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Cette catégorie s'affiche sur la carte de l'article (ex: "SEO stratégique", "Article").
              </p>
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
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Contenu (Markdown)</label>
              <textarea
                value={form.content_markdown}
                onChange={(event) =>
                  setForm({ ...form, content_markdown: event.target.value })
                }
                rows={12}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono"
              />
              <p className="mt-2 text-xs text-slate-500">
                Tu peux ajouter des liens internes (/contact) ou externes
                (https://...).
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
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
            className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
          >
            {saving ? "Création..." : "Créer l’article"}
          </button>
        </form>
      </Container>
    </Section>
  );
}
