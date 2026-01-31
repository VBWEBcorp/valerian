"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("/api/content/page?slug=home");
      if (response.status === 200) {
        router.replace("/admin/content/home");
        return;
      }
      setChecking(false);
    }
    checkSession();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }

    router.push("/admin/content/home");
  }

  if (checking) {
    return (
      <Section>
        <Container>
          <p className="text-sm text-slate-600">Vérification de session...</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Admin
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Gestion simple du contenu
            </h1>
            <p className="text-sm text-slate-600">
              Connecte-toi pour modifier les textes, images et boutons des pages
              du site.
            </p>
          </div>
          <div className="card rounded-3xl p-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Connexion
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
