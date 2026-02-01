"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

type BlogRow = {
  id: number;
  slug: string;
  title: string;
  published: boolean;
  updated_at: string;
};

export default function AdminBlogListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/blog");
      if (response.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await response.json();
      setPosts(data.data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

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
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Blog
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Articles
              </h2>
              <p className="text-sm text-slate-600">
                Crée, modifie ou supprime des articles.
              </p>
            </div>
            <Link
              href="/admin/blog/new"
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Nouvel article
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            {posts.length === 0 && (
              <p className="text-sm text-slate-600">
                Aucun article pour le moment.
              </p>
            )}
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-500">/{post.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      post.published
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
