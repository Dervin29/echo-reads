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
      <header className="mb-14 max-w-2xl text-center">
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-medium)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-brand)]">
          <Crown className="size-4" />
          Pricing
        </p>

        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#212a3b] md:text-4xl">
          Choose the plan that fits your reading
        </h1>

        <p className="mt-3 text-lg leading-relaxed text-[#3d485e]">
          Unlock more books, longer sessions, and full history with a plan that
          matches how you read.
        </p>

        <Show when="signed-in">
          {isLoaded && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f3e4c7] px-4 py-2 text-sm font-medium text-[#212a3b]">
              <span className="size-2 rounded-full bg-[var(--color-brand)]" />
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
