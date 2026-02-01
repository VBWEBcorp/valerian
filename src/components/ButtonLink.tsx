import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-neutral-900 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] hover:bg-neutral-800 hover:-translate-y-0.5 focus-visible:ring-neutral-900",
  secondary:
    "bg-white text-slate-900 border border-slate-200 shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:-translate-y-0.5 focus-visible:ring-slate-300",
  outline:
    "border border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-white hover:-translate-y-0.5 focus-visible:ring-slate-300",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
