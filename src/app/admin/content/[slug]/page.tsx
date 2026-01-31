"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { pageDefaults, pageSchemas } from "@/lib/page-defaults";

type Card = { title: string; text: string };

type PageContent = Record<
  string,
  string | string[] | readonly string[] | Card[] | readonly Card[]
>;

const pageTitles: Record<string, string> = {
  home: "Accueil",
  creation: "Création de site",
  seo: "SEO",
  realisations: "Réalisations",
  blog: "Blog",
  about: "À propos",
  contact: "Contact",
  mentions: "Mentions légales",
  privacy: "Confidentialité",
  thanks: "Merci",
};

function parseCardList(value: unknown): Card[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: String((item as Card)?.title ?? ""),
      text: String((item as Card)?.text ?? ""),
    }))
    .filter((item) => item.title || item.text);
}

function parseImageList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "")).filter(Boolean);
}

export default function AdminContentPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const schema = pageSchemas[slug];
  const defaults = (pageDefaults as unknown as Record<string, PageContent>)[slug];
  const [content, setContent] = useState<PageContent>(defaults ?? {});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!schema || !defaults) return;
    async function load() {
      try {
        const response = await fetch(`/api/content/page?slug=${slug}`);
        if (response.status === 401) {
          router.push("/admin");
          return;
        }
        if (!response.ok) {
          setError(
            "Impossible de charger le contenu. Vérifie que la table page_content est créée dans Neon."
          );
          setLoading(false);
          return;
        }
        const data = await response.json();
        setContent({ ...defaults, ...(data.data ?? {}) });
        setLoading(false);
      } catch {
        setError("Erreur réseau. Réessaie dans quelques secondes.");
        setLoading(false);
      }
    }
    load();
  }, [slug, schema, defaults, router]);

  if (!schema || !defaults) {
    return (
      <Section>
        <Container>
          <p className="text-sm text-slate-600">Page non trouvée.</p>
        </Container>
      </Section>
    );
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/content/page", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, content }),
    });
    setMessage(response.ok ? "Contenu mis à jour." : "Erreur lors de l’enregistrement.");
    setSaving(false);
  }

  if (loading) {
    return (
      <Section>
        <Container>
          <p className="text-sm text-slate-600">Chargement...</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <form onSubmit={handleSave} className="card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            {pageTitles[slug] ?? slug}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Modifie les contenus de cette page. Les champs non remplis garderont la valeur
            par défaut.
          </p>
          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 space-y-6">
            {Object.entries(schema).map(([key, field]) => {
              const value = content[key];
              if (field.type === "text") {
                const isHrefField = key.endsWith("_href");
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-semibold">{field.label}</label>
                    <input
                      value={String(value ?? "")}
                      onChange={(event) =>
                        setContent({ ...content, [key]: event.target.value })
                      }
                      placeholder={isHrefField ? "/contact ou https://..." : ""}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm"
                    />
                    {isHrefField && (
                      <p className="text-xs text-slate-500">
                        Tu peux mettre un lien interne (ex: /contact), un
                        ancrage (#section) ou une URL complète.
                      </p>
                    )}
                  </div>
                );
              }
              if (field.type === "image") {
                const url = String(value ?? "");
                return (
                  <div key={key} className="space-y-3">
                    <label className="text-sm font-semibold">{field.label}</label>
                    <input
                      value={url}
                      onChange={(event) =>
                        setContent({ ...content, [key]: event.target.value })
                      }
                      placeholder="https://..."
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm"
                    />
                    <p className="text-xs text-slate-500">
                      Colle une URL d’image (https://...). Tu peux remplacer
                      l’image à tout moment.
                    </p>
                    {url && (
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <img
                          src={url}
                          alt=""
                          className="h-48 w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              }
              if (field.type === "textarea") {
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-semibold">{field.label}</label>
                    <textarea
                      value={String(value ?? "")}
                      onChange={(event) =>
                        setContent({ ...content, [key]: event.target.value })
                      }
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm"
                    />
                  </div>
                );
              }
              if (field.type === "stringList") {
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-semibold">{field.label}</label>
                    <textarea
                      value={(Array.isArray(value) ? value : [])
                        .map(String)
                        .join("\n")}
                      onChange={(event) =>
                        setContent({
                          ...content,
                          [key]: event.target.value
                            .split("\n")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        })
                      }
                      rows={4}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm"
                    />
                  </div>
                );
              }
              if (field.type === "cardList") {
                const cards = parseCardList(value);
                return (
                  <div key={key} className="space-y-3">
                    <label className="text-sm font-semibold">{field.label}</label>
                    <div className="grid gap-4 md:grid-cols-2">
                      {cards.map((card, index) => (
                        <div
                          key={`${key}-${index}`}
                          className="rounded-2xl border border-slate-200 bg-white/80 p-4"
                        >
                          <input
                            placeholder="Titre"
                            value={card.title}
                            onChange={(event) => {
                              const updated = [...cards];
                              updated[index] = { ...updated[index], title: event.target.value };
                              setContent({ ...content, [key]: updated });
                            }}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          />
                          <textarea
                            placeholder="Texte"
                            value={card.text}
                            onChange={(event) => {
                              const updated = [...cards];
                              updated[index] = { ...updated[index], text: event.target.value };
                              setContent({ ...content, [key]: updated });
                            }}
                            rows={3}
                            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      Le nombre de cartes est fixe. Modifie seulement le texte.
                    </p>
                  </div>
                );
              }
              if (field.type === "imageList") {
                const images = parseImageList(value);
                return (
                  <div key={key} className="space-y-3">
                    <label className="text-sm font-semibold">{field.label}</label>
                    <div className="space-y-3">
                      {images.map((url, index) => (
                        <div key={`${key}-${index}`} className="space-y-2">
                          <input
                            value={url}
                            onChange={(event) => {
                              const updated = [...images];
                              updated[index] = event.target.value;
                              setContent({ ...content, [key]: updated });
                            }}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm"
                          />
                          {url && (
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                              <img
                                src={url}
                                alt=""
                                className="h-40 w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      Le nombre d’images est fixe. Modifie seulement les URLs.
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            {message && <span className="text-sm text-slate-600">{message}</span>}
          </div>
        </form>
      </Container>
    </Section>
  );
}
