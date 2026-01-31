type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Camille R.",
    role: "Dirigeante, cabinet RH",
    quote:
      "Un site clair, rapide et orienté conversion. Les prises de contact sont beaucoup plus qualifiées.",
  },
  {
    name: "Julien M.",
    role: "Co-fondateur, SaaS B2B",
    quote:
      "L’accompagnement SEO est structuré. On sait quoi faire chaque mois et pourquoi.",
  },
  {
    name: "Nadia A.",
    role: "Responsable marketing, PME industrielle",
    quote:
      "Positionnement premium et messages précis. On a enfin un site à la hauteur de notre offre.",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item) => (
        <div
          key={item.name}
          className="card card-hover rounded-2xl p-6"
        >
          <p className="text-sm text-slate-600">"{item.quote}"</p>
          <p className="mt-4 text-sm font-semibold text-slate-900">
            {item.name}
          </p>
          <p className="text-xs text-slate-500">{item.role}</p>
        </div>
      ))}
    </div>
  );
}
