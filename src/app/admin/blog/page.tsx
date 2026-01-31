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
        <div className="card rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Blog</h2>
              <p className="text-sm text-slate-600">
                Crée, modifie ou supprime des articles.
              </p>
            </div>
            <Link
              href="/admin/blog/new"
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Nouvel article
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {posts.length === 0 && (
              <p className="text-sm text-slate-600">
                Aucun article pour le moment.
              </p>
            )}
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-500">/{post.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="text-sm font-semibold text-slate-700"
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
