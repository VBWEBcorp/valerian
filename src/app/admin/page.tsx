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
    <Section className="min-h-screen bg-[#f7f6f2]">
      <Container>
        <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:grid-cols-[1.1fr_1fr] md:p-10">
          <div className="space-y-4">
            <p className="text-xs font-medium text-slate-400">Valerian digital</p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Espace admin
            </h1>
            <p className="text-sm text-slate-600">
              Connecte-toi pour gérer les pages, les images et les articles du
              blog.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
              Astuce : utilise des mots de passe forts et change-les
              régulièrement.
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">Connexion</h2>
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
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
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
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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
