import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { ctas } from "@/lib/site";

type HeroProps = {
  title: string;
  subtitle: string;
  bullets?: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Hero({
  title,
  subtitle,
  bullets = [],
  imageSrc = "/hero.svg",
  imageAlt = "Aperçu de site moderne",
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="float-slower absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-200/50 blur-3xl" />
        <div className="float-slow absolute -right-16 top-10 h-72 w-72 rounded-full bg-fuchsia-200/50 blur-3xl" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 px-8 py-12 text-white shadow-2xl shadow-purple-500/30 md:px-12 md:py-14">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            <span className="rounded-full bg-white/15 px-3 py-1">
              Sites & SEO
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1">
              TPE/PME
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>
          {bullets.length > 0 && (
            <ul className="mt-6 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={primaryHref ?? ctas.primary.href}
              className="bg-white text-slate-900"
            >
              {primaryLabel ?? ctas.primary.label}
            </ButtonLink>
            <ButtonLink href={secondaryHref ?? ctas.secondary.href} variant="outline">
              {secondaryLabel ?? ctas.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative -mt-10">
          <div className="card card-hover mx-auto max-w-4xl overflow-hidden rounded-3xl p-3">
            <div className="relative overflow-hidden rounded-2xl bg-white/70">
              {imageSrc.startsWith("http") ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={960}
                  height={560}
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="h-auto w-full object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-xl">
                  ▶
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
