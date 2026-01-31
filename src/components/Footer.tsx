import Link from "next/link";
import { navigation, site, ctas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/50 bg-white/70 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-slate-900">{site.name}</p>
            <p className="text-sm text-slate-600">{site.description}</p>
            <div className="space-y-1 text-sm text-slate-600">
              <p>{site.address.street}</p>
              <p>
                {site.address.postalCode} {site.address.city}
              </p>
              <p>{site.email}</p>
              <p>{site.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  {ctas.primary.label}
                </Link>
              </li>
              <li>
                <Link href={ctas.secondary.href} className="hover:text-slate-900">
                  {ctas.secondary.label}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-slate-900">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="hover:text-slate-900"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {site.legalName}. Tous droits réservés.</p>
          <p>Sites rapides, SEO durable, leads qualifiés.</p>
        </div>
      </div>
    </footer>
  );
}
