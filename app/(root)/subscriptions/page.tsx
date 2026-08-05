"use client";

import { PricingTable, Show } from "@clerk/nextjs";
import { Crown } from "lucide-react";
import PlanComparison from "@/components/pricing/PlanComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import { useSubscription } from "@/hooks/useSubscription";
import { PLANS, type PlanType } from "@/lib/subscription-constants";

const planLabels: Record<PlanType, string> = {
  [PLANS.FREE]: "Free",
  [PLANS.STANDARD]: "Standard",
  [PLANS.PRO]: "Pro",
};

export default function SubscriptionsPage() {
  const { plan, isLoaded } = useSubscription();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-5 pb-24 pt-[calc(var(--navbar-height)+3rem)]">
      <header className="mb-16 max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-5">
          <Crown className="size-3.5" strokeWidth={1.5} />
          Pricing
        </p>

        <h1 className="font-serif text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
          Choose the plan that fits your reading
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Unlock more books, longer sessions, and full history with a plan that
          matches how you read.
        </p>

        <Show when="signed-in">
          {isLoaded && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper-soft px-5 py-2.5 text-sm font-medium text-ink shadow-[inset_0_0_0_1px_var(--hairline)]">
              <span className="size-2 rounded-full bg-brand" />
              You&apos;re on the {planLabels[plan]} plan
            </p>
          )}
        </Show>
      </header>

      <div className="clerk-pricing-table-wrapper">
        <PricingTable
          highlightedPlan={PLANS.STANDARD}
          newSubscriptionRedirectUrl="/library"
        />
      </div>

      <PlanComparison />
      <PricingFAQ />
    </main>
  );
}
