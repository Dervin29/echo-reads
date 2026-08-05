import { Check, Minus } from "lucide-react";
import {
  PLANS,
  PLAN_LIMITS,
  type PlanLimits,
  type PlanType,
} from "@/lib/subscription-constants";
import { cn } from "@/lib/utils";

const planOrder: PlanType[] = [PLANS.FREE, PLANS.STANDARD, PLANS.PRO];

const planLabels: Record<PlanType, string> = {
  [PLANS.FREE]: "Free",
  [PLANS.STANDARD]: "Standard",
  [PLANS.PRO]: "Pro",
};

const planHints: Record<PlanType, string> = {
  [PLANS.FREE]: "Get started",
  [PLANS.STANDARD]: "Most popular",
  [PLANS.PRO]: "Maximum power",
};

type Row = {
  label: string;
  getValue: (limits: PlanLimits) => string | boolean;
};

const rows: Row[] = [
  { label: "Books in library", getValue: (l) => String(l.maxBooks) },
  {
    label: "Voice sessions per month",
    getValue: (l) =>
      l.maxSessionsPerMonth === Infinity
        ? "Unlimited"
        : String(l.maxSessionsPerMonth),
  },
  {
    label: "Max session length",
    getValue: (l) => `${l.maxDurationPerSession} minutes`,
  },
  { label: "Session history", getValue: (l) => l.hasSessionHistory },
];

const PlanComparison = () => {
  return (
    <section className="mt-28 w-full max-w-5xl">
      <h2 className="section-title text-center">Compare plans</h2>
      <p className="subtitle mx-auto mt-3 max-w-2xl text-center">
        Every plan includes AI-powered voice chat, a live streaming transcript,
        and the ability to search inside your books.
      </p>

      <div className="mt-12 overflow-x-auto rounded-[2rem] bg-cream shadow-[inset_0_0_0_1px_var(--hairline),var(--shadow-soft)]">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-hairline">
              <th className="px-6 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
                Feature
              </th>
              {planOrder.map((plan) => {
                const isFeatured = plan === PLANS.STANDARD;
                return (
                  <th
                    key={plan}
                    className={cn(
                      "px-6 py-6 text-center",
                      isFeatured && "bg-paper-soft",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isFeatured && (
                        <span className="mb-1 rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-ink">
                          {planHints[plan]}
                        </span>
                      )}
                      <span className="font-serif text-lg font-semibold text-ink">
                        {planLabels[plan]}
                      </span>
                      <span className="text-xs text-ink-mute">
                        {isFeatured ? "\u00a0" : planHints[plan]}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-hairline last:border-0"
              >
                <td className="px-6 py-4 text-sm font-medium text-ink-soft">
                  {row.label}
                </td>
                {planOrder.map((plan) => {
                  const value = row.getValue(PLAN_LIMITS[plan]);
                  const isFeatured = plan === PLANS.STANDARD;
                  return (
                    <td
                      key={plan}
                      className={cn(
                        "px-6 py-4 text-center text-sm font-semibold text-ink",
                        isFeatured && "bg-paper-soft",
                      )}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check
                            className="mx-auto size-5 text-sage"
                            strokeWidth={1.75}
                          />
                        ) : (
                          <Minus
                            className="mx-auto size-5 text-ink-mute/50"
                            strokeWidth={1.5}
                          />
                        )
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PlanComparison;
