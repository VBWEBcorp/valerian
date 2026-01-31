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
    <section className="relative overflow-hidden pt-16 pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              Template site vitrine premium
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
            {bullets.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {bullets.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={primaryHref ?? ctas.primary.href}>
                {primaryLabel ?? ctas.primary.label}
              </ButtonLink>
              <ButtonLink href={secondaryHref ?? ctas.secondary.href} variant="outline">
                {secondaryLabel ?? ctas.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <div className="card card-hover overflow-hidden rounded-3xl p-3">
            {imageSrc.startsWith("http") ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-auto w-full rounded-2xl object-cover"
              />
            ) : (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={960}
                height={560}
                sizes="(min-width: 1024px) 960px, 100vw"
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
