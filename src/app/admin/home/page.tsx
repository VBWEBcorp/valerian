"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

type ValueProp = { title: string; text: string };
type MethodStep = { title: string; text: string };

type HomeContent = {
  hero_title: string;
  hero_subtitle: string;
  hero_bullets: string[];
  value_props: ValueProp[];
  method_steps: MethodStep[];
};

const emptyContent: HomeContent = {
  hero_title: "",
  hero_subtitle: "",
  hero_bullets: [],
  value_props: [],
  method_steps: [],
};

export default function AdminHomePage() {
  const router = useRouter();
  const [content, setContent] = useState<HomeContent>(emptyContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/content/home");
      if (response.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await response.json();
      setContent(data.data ?? emptyContent);
      setLoading(false);
    }
    load();
  }, [router]);

  function handleValuePropChange(index: number, field: keyof ValueProp, value: string) {
    const updated = [...(content.value_props ?? [])];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, value_props: updated });
  }

  function handleMethodStepChange(index: number, field: keyof MethodStep, value: string) {
    const updated = [...(content.method_steps ?? [])];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, method_steps: updated });
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/content/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      setMessage("Erreur lors de l’enregistrement.");
    } else {
      setMessage("Contenu mis à jour.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <Section className="bg-white/60">
        <Container>
          <p className="text-sm text-slate-600">Chargement...</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-white/60">
      <Container>
        <form onSubmit={handleSave} className="card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Modifier l’accueil
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Mettez à jour les contenus principaux de la page d’accueil.
          </p>

          <div className="mt-8 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold">Titre principal</label>
              <input
                value={content.hero_title}
                onChange={(event) =>
                  setContent({ ...content, hero_title: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold">Sous-titre</label>
              <textarea
                value={content.hero_subtitle}
                onChange={(event) =>
                  setContent({ ...content, hero_subtitle: event.target.value })
                }
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold">
                Bullet points (1 par ligne)
              </label>
              <textarea
                value={(content.hero_bullets ?? []).join("\n")}
                onChange={(event) =>
                  setContent({
                    ...content,
                    hero_bullets: event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold">Cartes “Ce que vous obtenez”</p>
              <div className="grid gap-4 md:grid-cols-3">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                    <input
                      placeholder="Titre"
                      value={content.value_props?.[index]?.title ?? ""}
                      onChange={(event) =>
                        handleValuePropChange(index, "title", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                    <textarea
                      placeholder="Texte"
                      value={content.value_props?.[index]?.text ?? ""}
                      onChange={(event) =>
                        handleValuePropChange(index, "text", event.target.value)
                      }
                      rows={3}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold">Méthode en 4 étapes</p>
              <div className="grid gap-4 md:grid-cols-2">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                    <input
                      placeholder="Titre"
                      value={content.method_steps?.[index]?.title ?? ""}
                      onChange={(event) =>
                        handleMethodStepChange(index, "title", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                    <textarea
                      placeholder="Texte"
                      value={content.method_steps?.[index]?.text ?? ""}
                      onChange={(event) =>
                        handleMethodStepChange(index, "text", event.target.value)
                      }
                      rows={3}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white"
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
