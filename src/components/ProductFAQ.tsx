interface FAQItem {
    question: string;
    answer: string;
}

interface ProductFAQProps {
    faq?: FAQItem[];
    label?: string;
}

export default function ProductFAQ({ faq, label = "Perguntas Frequentes" }: ProductFAQProps) {
    if (!faq || faq.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <div className="container mx-auto px-6">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <div className="max-w-3xl mx-auto pb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                    {label}
                </p>
                <div className="divide-y divide-slate-200 border-t border-slate-200">
                    {faq.map((item, i) => (
                        <details key={i} className="group py-2.5">
                            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 list-none flex items-center justify-between gap-4">
                                <span>{item.question}</span>
                                <span className="text-slate-300 group-open:rotate-45 transition-transform shrink-0">+</span>
                            </summary>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
