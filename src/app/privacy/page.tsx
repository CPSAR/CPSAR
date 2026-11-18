import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/app/legal/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" lead="How CPSAR handles information when you visit this website, contact us, subscribe, or use a self-check questionnaire.">
    <LegalSection title="Information you choose to share">
      <p><strong>Contact messages:</strong> If you use the contact form, we receive your name, email address, subject, and message so we can respond.</p>
      <p><strong>Newsletter:</strong> If you subscribe, we receive your email address to send CPSAR updates. You can ask us to remove it using the contact page.</p>
      <p><strong>Self-check questionnaires:</strong> Answers to the GAD-7, PHQ-9, and AUDIT tools are calculated in your browser. The questionnaire answers and score are not sent to CPSAR or saved by this website. If you choose to share a result in a message, that information becomes part of the message you submit.</p>
    </LegalSection>
    <LegalSection title="How information is used">
      <p>We use contact details to reply to enquiries and manage newsletter subscriptions. We do not sell personal information. Contact and subscription records are available only to authorized CPSAR administrators and service providers needed to operate the website.</p>
    </LegalSection>
    <LegalSection title="Storage and service providers">
      <p>Contact messages and newsletter subscriptions are stored using the website’s database provider. Website hosting and security providers may process technical information necessary to deliver and protect the site. Those providers handle information under their own terms and privacy notices.</p>
      <p>We retain submitted information for as long as it is needed to respond, administer subscriptions, maintain records, or meet applicable obligations. We apply access controls intended to limit access to authorized administrators.</p>
    </LegalSection>
    <LegalSection title="Your choices and requests">
      <p>You may ask CPSAR to access, correct, or delete information you submitted, or to stop newsletter emails. Use the <Link href="/contact" className="font-semibold text-[#1c6795] underline underline-offset-4">contact page</Link> and tell us how to reach you. We may need to verify a request before acting on it.</p>
    </LegalSection>
    <LegalSection title="Cookies and external links">
      <p>This website may use essential browser storage or similar technology to operate features such as secure administrator sessions. Links to external websites are governed by those websites’ own privacy practices. Do not include sensitive health details in a message unless you are comfortable sharing them with CPSAR.</p>
    </LegalSection>
    <LegalSection title="Updates and contact">
      <p>We may update this notice when website features or information practices change. The date above shows when this page was last updated. For privacy questions or requests, contact CPSAR through the <Link href="/contact" className="font-semibold text-[#1c6795] underline underline-offset-4">contact page</Link>.</p>
    </LegalSection>
  </LegalPage>;
}
