type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="card card-hover group rounded-2xl px-6 py-4"
        >
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
            {item.question}
          </summary>
          <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
