import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DemoSection from "../components/DemoSection";
import AIBotDemo from "../components/AIBotDemo";
import PricingSection from "../components/PricingSection";
import WebsiteSection from "../components/WebsiteSection";
import GrowthConsultingSection from "../components/GrowthConsultingSection";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";

function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <DemoSection />
      <AIBotDemo />
      <PricingSection />
      <WebsiteSection />
      <GrowthConsultingSection />
      <Footer />
      <FloatingSocials />
    </main>
  );
}

export default Home;
