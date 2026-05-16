import Image from "next/image";
import { Plus } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="library-hero-card max-w-7xl mx-auto mb-10 md:mb-16">
      <div className="library-hero-content">
        <div className="library-hero-text">
          <h1 className="library-hero-title">Your Library</h1>

          <p className="library-hero-description">
            Convert your books into interactive AI conversations.
            <br />
            Listen, learn, and discuss your favorite reads.
          </p>

          <button className="library-cta-primary">
            <Plus size={20} />
            Add new book
          </button>
        </div>

        <div className="library-hero-illustration-desktop">
          <Image
            src="/assets/hero-illustration.png"
            alt="Vintage books illustration"
            width={420}
            height={300}
            className="object-contain"
            priority
          />
        </div>

        <div className="library-steps-card">
          <div className="library-step-item">
            <div className="library-step-number">1</div>
            <div>
              <h3 className="library-step-title">Upload PDF</h3>
              <p className="library-step-description">Add your book file</p>
            </div>
          </div>

          <div className="library-step-item pt-5">
            <div className="library-step-number">2</div>
            <div>
              <h3 className="library-step-title">AI Processing</h3>
              <p className="library-step-description">We analyze the content</p>
            </div>
          </div>

          <div className="library-step-item pt-5">
            <div className="library-step-number">3</div>
            <div>
              <h3 className="library-step-title">Voice Chat</h3>
              <p className="library-step-description">Discuss with AI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
