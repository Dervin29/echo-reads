import About from "@/components/landing/About";
import CTA from "@/components/landing/CTA";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <HowItWorks />
      <About />
      <CTA />
    </main>
  );
};

export default LandingPage;
