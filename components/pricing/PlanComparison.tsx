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
    <section className="mt-24 w-full max-w-5xl">
      <h2 className="section-title text-center">Compare plans</h2>
      <p className="subtitle mx-auto mt-3 max-w-2xl text-center">
        Every plan includes AI-powered voice chat, a live streaming transcript,
        and the ability to search inside your books.
      </p>

      <div className="mt-10 overflow-x-auto rounded-[14px] bg-white shadow-[var(--shadow-soft)]">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-[var(--border-subtle)]">
              <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wide text-[#3d485e]">
                Feature
              </th>
              {planOrder.map((plan) => {
                const isFeatured = plan === PLANS.STANDARD;
                return (
                  <th
                    key={plan}
                    className={cn(
                      "px-6 py-5 text-center",
                      isFeatured && "bg-[#fff6e5]",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isFeatured && (
                        <span className="mb-1 rounded-full bg-[var(--color-brand)] px-2.5 py-0.5 text-xs font-semibold text-white">
                          {planHints[plan]}
                        </span>
                      )}
                      <span className="font-serif text-lg font-bold text-[#212a3b]">
                        {planLabels[plan]}
                      </span>
                      <span className="text-xs text-[#3d485e]">
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
                className="border-b border-[var(--border-subtle)] last:border-0"
              >
                <td className="px-6 py-4 text-sm font-medium text-[#3d485e]">
                  {row.label}
                </td>
                {planOrder.map((plan) => {
                  const value = row.getValue(PLAN_LIMITS[plan]);
                  const isFeatured = plan === PLANS.STANDARD;
                  return (
                    <td
                      key={plan}
                      className={cn(
                        "px-6 py-4 text-center text-sm font-semibold text-[#212a3b]",
                        isFeatured && "bg-[#fff6e5]",
                      )}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="mx-auto size-5 text-[var(--success)]" />
                        ) : (
                          <Minus className="mx-auto size-5 text-[#c4b498]" />
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
