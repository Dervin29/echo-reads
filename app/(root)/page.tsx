import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[#f5f1e8]">
      <Hero />
      <HowItWorks />
      <About />
    </main>
  );
};

export default LandingPage;
