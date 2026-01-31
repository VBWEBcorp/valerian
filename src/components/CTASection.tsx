import { ButtonLink } from "@/components/ButtonLink";
import { ctas } from "@/lib/site";

type CTASectionProps = {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl border border-white/40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-12 text-white shadow-2xl shadow-purple-500/20 md:px-12">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-white/90">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink
              href={primaryHref ?? ctas.primary.href}
              className="bg-white text-slate-900 hover:bg-white/90"
            >
              {primaryLabel ?? ctas.primary.label}
            </ButtonLink>
            <ButtonLink
              href={secondaryHref ?? ctas.secondary.href}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {secondaryLabel ?? ctas.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
