"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { MarkdownEditor } from "@/components/MarkdownEditor";

type BlogPost = {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  intent: string;
  focus_keyword?: string | null;
  canonical_url?: string | null;
  og_image_url?: string | null;
  author_name?: string | null;
  cover_image_url: string | null;
  content_markdown: string;
  published: boolean;
};

export default function AdminBlogEditPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [form, setForm] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/blog/${slug}`);
      if (response.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await response.json();
      setForm(data.data);
    }
    load();
  }, [slug, router]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage("");
    const response = await fetch(`/api/blog/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMessage(response.ok ? "Article mis à jour." : "Erreur lors de la mise à jour.");
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/blog/${slug}`, { method: "DELETE" });
    router.push("/admin/blog");
  }

  if (!form) {
    return (
      <Section>
        <Container>
          <p className="text-sm text-slate-600">Chargement...</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-4 pb-12 md:pt-6 md:pb-14">
      <Container>
        <form
          onSubmit={handleSave}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-400">Blog</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Modifier l’article
              </h2>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300"
            >
              Supprimer
            </button>
          </div>
          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-semibold">Slug</label>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm({ ...form, slug: event.target.value })
                }
                placeholder="ex: site-vitrine-qui-convertit"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <p className="mt-1 text-xs text-slate-500">
                Utilise uniquement des lettres minuscules, chiffres et tirets.
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Titre</label>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Meta title</label>
              <input
                value={form.meta_title}
                onChange={(event) =>
                  setForm({ ...form, meta_title: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
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
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
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
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
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
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <p className="mt-1 text-xs text-slate-500">
                Cette catégorie s'affiche sur la carte de l'article.
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Mot-clé principal</label>
              <input
                value={form.focus_keyword ?? ""}
                onChange={(event) =>
                  setForm({ ...form, focus_keyword: event.target.value })
                }
                placeholder="ex: seo pour tpe pme"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <p className="mt-1 text-xs text-slate-500">
                Utilisé pour le SEO (RankMath).
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">URL canonique</label>
              <input
                value={form.canonical_url ?? ""}
                onChange={(event) =>
                  setForm({ ...form, canonical_url: event.target.value })
                }
                placeholder="/blog/slug ou https://..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <p className="mt-1 text-xs text-slate-500">
                Laisse vide pour utiliser l’URL automatique.
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Image OpenGraph (URL)</label>
              <input
                value={form.og_image_url ?? ""}
                onChange={(event) =>
                  setForm({ ...form, og_image_url: event.target.value })
                }
                placeholder="https://..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <p className="mt-1 text-xs text-slate-500">
                Utilisée pour le partage social (LinkedIn, WhatsApp, etc.).
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Auteur</label>
              <input
                value={form.author_name ?? ""}
                onChange={(event) =>
                  setForm({ ...form, author_name: event.target.value })
                }
                placeholder="Valérian Digital"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Image (URL)</label>
              <input
                value={form.cover_image_url ?? ""}
                onChange={(event) =>
                  setForm({ ...form, cover_image_url: event.target.value })
                }
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
            <label className="flex items-center gap-2 text-sm text-slate-600">
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
          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </Container>
    </Section>
  );
}
