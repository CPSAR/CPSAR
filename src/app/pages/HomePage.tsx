import { HeroSection } from "../components/home/HeroSection";
import { AudiencePaths } from "../components/home/AudiencePaths";
import { HomePartnerLogos } from "../components/home/HomePartnerLogos";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <AudiencePaths />
      <HomePartnerLogos />
    </main>
  );
}
