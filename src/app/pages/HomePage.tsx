import { HeroSection } from "../components/home/HeroSection";
import { AudiencePaths } from "../components/home/AudiencePaths";

export function HomePage() {
  return (
    <div>
      {/* Hero and community photo strip */}
      <HeroSection />

      {/* Keep the homepage concise and direct visitors to the detailed pages. */}
      <AudiencePaths />
    </div>
  );
}
