import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/app/legal/LegalPage";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return <LegalPage title="Accessibility" lead="CPSAR wants this website to be useful and welcoming to everyone. We are working to improve access across devices and assistive technologies.">
    <LegalSection title="Our approach">
      <p>We aim to follow the principles of the Web Content Accessibility Guidelines (WCAG) 2.2: content should be perceivable, operable, understandable, and robust. This is an ongoing effort; we do not claim that every page or feature currently conforms to every WCAG success criterion.</p>
    </LegalSection>
    <LegalSection title="Helpful features">
      <ul className="list-disc space-y-2 pl-6">
        <li>Pages are designed to adapt to mobile, tablet, and desktop screens.</li>
        <li>Interactive controls are being built with keyboard use, visible focus, and clear labels in mind.</li>
        <li>Images use text alternatives where they convey information.</li>
        <li>Screening questionnaires provide selectable answers and show progress and calculated results.</li>
      </ul>
    </LegalSection>
    <LegalSection title="Report an access barrier">
      <p>If you have difficulty using a page or need information in another format, please let us know. Include the page address, what you were trying to do, and any assistive technology or device details you are comfortable sharing. Contact us through the <Link href="/contact" className="font-semibold text-[#1c6795] underline underline-offset-4">contact page</Link>.</p>
      <p>We will review your feedback and use it to guide improvements.</p>
    </LegalSection>
    <LegalSection title="Accessibility guidance">
      <p>Read the <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer" className="font-semibold text-[#1c6795] underline underline-offset-4">W3C Web Content Accessibility Guidelines (WCAG) 2.2</a>.</p>
    </LegalSection>
  </LegalPage>;
}
