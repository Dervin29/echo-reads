import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How does billing work?",
    answer:
      "Start on the Free plan without a credit card. Upgrade to Standard or Pro at any time — billing is handled securely and your new limits apply immediately.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer:
      "Yes. You can switch between plans or cancel at any time from this page. When you cancel, you keep access until the end of your current billing period.",
  },
  {
    question: "What happens when I reach my limits?",
    answer:
      "You'll see a clear notice the moment you hit a limit, with a quick path to upgrade. Session limits reset at the start of each month.",
  },
  {
    question: "What kind of files can I upload?",
    answer:
      "Any PDF up to 50 MB. The AI indexes the content so you can search inside the book and discuss specific passages during conversations.",
  },
  {
    question: "Is my book content private?",
    answer:
      "Your library is only visible to you. Books are stored securely and only used to power your conversations.",
  },
];

const PricingFAQ = () => {
  return (
    <section className="mt-28 w-full max-w-3xl">
      <h2 className="section-title text-center">
        Frequently asked questions
      </h2>

      <div className="mt-12 flex flex-col gap-4">
        {faqs.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-[1.5rem] bg-cream p-6 shadow-[inset_0_0_0_1px_var(--hairline),var(--shadow-soft-sm)] transition-shadow duration-500 ease-premium open:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_30%,transparent),var(--shadow-soft)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
              {question}
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-paper-soft text-brand transition-transform duration-500 ease-premium group-open:rotate-45">
                <Plus className="size-4" strokeWidth={1.5} />
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default PricingFAQ;
