"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const pages = [
  { slug: "home", label: "Accueil" },
  { slug: "creation", label: "Création site" },
  { slug: "seo", label: "SEO" },
  { slug: "realisations", label: "Réalisations" },
  { slug: "blog", label: "Blog" },
  { slug: "about", label: "À propos" },
  { slug: "contact", label: "Contact" },
  { slug: "mentions", label: "Mentions légales" },
  { slug: "privacy", label: "Confidentialité" },
  { slug: "thanks", label: "Merci" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isContentRoute = pathname?.startsWith("/admin/content");

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  if (!isContentRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Espace admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">
              Gestion du contenu
            </h1>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
          >
            {loading ? "Déconnexion..." : "Se déconnecter"}
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <aside className="card rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Pages
            </p>
            <nav className="mt-4 space-y-2 text-sm">
              {pages.map((page) => {
                const href = `/admin/content/${page.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={page.slug}
                    href={href}
                    className={`block rounded-lg px-3 py-2 transition ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    {page.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
