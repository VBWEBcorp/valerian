import Link from "next/link";
import { navigation, ctas, site } from "@/lib/site";
import { ButtonLink } from "@/components/ButtonLink";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {navigation.slice(1, 6).map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={ctas.secondary.href} variant="outline">
            {ctas.secondary.label}
          </ButtonLink>
          <ButtonLink href={ctas.primary.href} className="hidden md:inline-flex">
            {ctas.primary.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
