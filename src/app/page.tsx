import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import BoxCalculator from "@/components/BoxCalculator";
import PortfolioSection from "@/components/PortfolioSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-[#FF6000] selection:text-white">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <HeroSection />
      <WhyUsSection />
      <BoxCalculator />
      <PortfolioSection />
      <HowToOrderSection />
      <FaqSection />
      <FooterSection />

      {/* Persistent Floating WhatsApp Trigger */}
      <FloatingWhatsApp />
    </main>
  );
}
