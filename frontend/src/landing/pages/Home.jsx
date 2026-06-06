import { useEffect, useState } from "react";
import api from "../../api/axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BenefitsSection from "../components/BenefitsSection";
import DemoSection from "../components/DemoSection";
import AIBotDemo from "../components/AIBotDemo";
import PricingSection from "../components/PricingSection";
import WebsiteSection from "../components/WebsiteSection";
import GrowthConsultingSection from "../components/GrowthConsultingSection";
import Footer from "../components/Footer";

function Home() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    api
      .get("/public/test")
      .then((res) => {
        setBackendMessage(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        setBackendMessage("No se pudo conectar con el backend");
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero backendMessage={backendMessage} />
      {/* <BenefitsSection /> */}
      <DemoSection />
      <AIBotDemo />
      <PricingSection />
      <WebsiteSection />
      <GrowthConsultingSection />
      <Footer />
    </main>
  );
}

export default Home;