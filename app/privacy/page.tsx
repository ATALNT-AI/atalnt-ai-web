import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { PRIVACY } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ATALNT AI collects, uses, and protects personal and candidate information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy covers atalnt.ai and the ATALNT AI recruiting platform, operated by ATALNT LLC."
      sections={PRIVACY}
    />
  );
}
