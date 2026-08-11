import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { TERMS } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of atalnt.ai, operated by ATALNT LLC.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern your use of this website. Use of the ATALNT AI platform is governed by your organization's subscription agreement."
      sections={TERMS}
    />
  );
}
