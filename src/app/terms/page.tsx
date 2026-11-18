import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/app/legal/LegalPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return <LegalPage title="Terms of Service" lead="These terms explain the basic conditions for using the CPSAR website and its information and self-check tools.">
    <LegalSection title="Using this website">
      <p>You may use this website for lawful, personal, educational, and informational purposes. Please use the site respectfully, do not interfere with its security or operation, and do not submit information that you are not authorized to share.</p>
    </LegalSection>
    <LegalSection title="Health information and self-check tools">
      <p>Website materials and the GAD-7, PHQ-9, and AUDIT self-check tools are provided for general information and reflection. A score is not a diagnosis, medical advice, or a substitute for an assessment by a qualified health professional. Do not use a screening score alone to make decisions about treatment or emergencies.</p>
      <p>If you may be in immediate danger or cannot keep yourself safe, contact local emergency services or go to the nearest emergency department. The self-check tools do not send answers or alerts to CPSAR.</p>
    </LegalSection>
    <LegalSection title="Website content and availability">
      <p>CPSAR aims to keep information useful and current, but materials may change and may contain omissions. The site and its features may occasionally be unavailable or updated. Links to third-party websites are provided for convenience; CPSAR does not control those sites or their content.</p>
    </LegalSection>
    <LegalSection title="Messages and submissions">
      <p>When you submit a contact message or newsletter subscription, you confirm that the information is accurate and that you are entitled to provide it. Please avoid sending passwords, payment details, or unnecessary sensitive health information through the contact form.</p>
    </LegalSection>
    <LegalSection title="Questions">
      <p>For questions about these terms or the website, contact us through the <Link href="/contact" className="font-semibold text-[#1c6795] underline underline-offset-4">CPSAR contact page</Link>.</p>
    </LegalSection>
  </LegalPage>;
}
