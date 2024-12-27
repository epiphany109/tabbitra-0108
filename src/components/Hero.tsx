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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Forest Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/50669ba8-6959-4298-8f05-c84fe20017bb.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text readability */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-white/50">Scroll to explore</span>
      </div>
    </div>
  );
};

export default Hero;