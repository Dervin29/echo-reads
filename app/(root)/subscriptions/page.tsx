"use client";

import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <main className="clerk-subscriptions">
      <div className="subscriptions-header">
        <h1 className="subscriptions-title">Choose Your Plan</h1>
        <p className="subscriptions-description">
          Unlock more books, longer sessions, and full history with a plan that
          fits your reading style.
        </p>
      </div>

      <div className="clerk-pricing-table-wrapper">
        <PricingTable newSubscriptionRedirectUrl="/" />
      </div>
    </main>
  );
}
