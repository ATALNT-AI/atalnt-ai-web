import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { SMS_TERMS } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "SMS Terms",
  description:
    "Consent, frequency, cost, and opt-out terms for text messages from ATALNT.",
  alternates: { canonical: "/sms-terms" },
};

export default function SmsTermsPage() {
  return (
    <LegalPage
      title="SMS Terms"
      intro="These terms apply if you opt in to receive text messages from ATALNT. Reply STOP at any time to opt out, or HELP for assistance."
      sections={SMS_TERMS}
    />
  );
}
