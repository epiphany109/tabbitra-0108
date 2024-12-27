import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      particlesRef.current.innerHTML = "";
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "floating-particle";
        particle.style.width = Math.random() * 4 + 2 + "px";
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();
    window.addEventListener("resize", createParticles);
    return () => window.removeEventListener("resize", createParticles);
  }, []);

  return (
    <div className="relative min-h-[150vh] flex flex-col">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Forest Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/50669ba8-6959-4298-8f05-c84fe20017bb.png')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" /> {/* Enhanced overlay for better text readability */}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-6 animate-fade-up">
            FOLLOW THE BERA TRAX
          </h1>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            The best way to interact with the chain DeFi
          </p>
          <Button
            className="bg-accent hover:bg-accent-dark text-white font-medium px-8 py-6 text-lg animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            ENTER BETA
          </Button>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="glass p-8 rounded-xl max-w-4xl w-full">
          <h2 className="text-4xl font-bold mb-6">Discover BERA TRAX</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4">Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>Advanced DeFi tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>Real-time chain monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>Secure transactions</span>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>Enhanced portfolio management</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>Intuitive user interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>24/7 market insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-white/50">Scroll to explore</span>
      </div>
    </div>
  );
};

export default Hero;