"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const pages = [
  { slug: "home", label: "Accueil" },
  { slug: "creation", label: "Création site" },
  { slug: "seo", label: "SEO" },
  { slug: "realisations", label: "Réalisations" },
  { slug: "blog", label: "Blog (page)" },
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
  const isContentRoute =
    pathname?.startsWith("/admin/content") || pathname?.startsWith("/admin/blog");

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  if (!isContentRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Valerian digital
              </p>
              <h2 className="text-lg font-semibold text-slate-900">Admin</h2>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Pages
              </p>
              <nav className="mt-4 space-y-1 text-sm">
                {pages.map((page) => {
                  const href = `/admin/content/${page.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={page.slug}
                      href={href}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                        isActive
                          ? "bg-neutral-900 text-white shadow"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{page.label}</span>
                      {isActive && (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                          Actif
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="mt-6 border-t border-slate-200/70 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Blog
              </p>
              <Link
                href="/admin/blog"
                className={`mt-3 flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                  pathname === "/admin/blog"
                    ? "bg-neutral-900 text-white shadow"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Articles</span>
                {pathname === "/admin/blog" && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Actif
                  </span>
                )}
              </Link>
            </div>
          </aside>
          <div className="self-start space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
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
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                {loading ? "Déconnexion..." : "Se déconnecter"}
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
