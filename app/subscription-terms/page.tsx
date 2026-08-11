import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { SUBSCRIPTION_TERMS } from "@/lib/content/subscription-terms";

export const metadata: Metadata = {
  title: "Subscription Agreement",
  description:
    "The standard agreement ATALNT AI clients accept when they subscribe: service scope, fees, data handling, ownership, and liability.",
  alternates: { canonical: "/subscription-terms" },
};

export default function SubscriptionTermsPage() {
  return (
    <LegalPage
      title="Subscription Agreement"
      intro="This is the standard agreement every ATALNT AI client accepts at signup. If you have a signed order form with us, that document controls where the two differ."
      sections={SUBSCRIPTION_TERMS}
    />
  );
}
