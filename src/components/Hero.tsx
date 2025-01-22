import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createLeaves = () => {
      if (!particlesRef.current) return;
      
      particlesRef.current.innerHTML = "";
      const leafCount = 20;
      
      for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement("div");
        leaf.className = "falling-leaf";
        leaf.style.left = Math.random() * 100 + "%";
        leaf.style.animationDelay = Math.random() * 10 + "s";
        leaf.style.animationDuration = (Math.random() * 5 + 8) + "s";
        particlesRef.current.appendChild(leaf);
      }
    };

    createLeaves();
    const interval = setInterval(createLeaves, 10000);

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Get background elements
      const background1 = document.querySelector('.parallax-bg-1') as HTMLElement;
      const background2 = document.querySelector('.parallax-bg-2') as HTMLElement;
      
      // Calculate when second section should start
      const secondSectionStart = viewportHeight;
      
      // Smooth transition between backgrounds
      if (background1 && background2) {
        const transitionPoint = secondSectionStart;
        const transitionRange = viewportHeight / 2; // Transition over half a viewport
        
        if (scrolled < transitionPoint) {
          // First background fully visible
          background1.style.opacity = '1';
          background2.style.opacity = '0';
        } else if (scrolled >= transitionPoint && scrolled <= transitionPoint + transitionRange) {
          // Transition zone
          const progress = (scrolled - transitionPoint) / transitionRange;
          background1.style.opacity = `${1 - progress}`;
          background2.style.opacity = `${progress}`;
        } else {
          // Second background fully visible
          background1.style.opacity = '0';
          background2.style.opacity = '1';
        }

        // Parallax effect
        if (background1) {
          background1.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + (scrolled * 0.0005)})`;
        }
        if (background2) {
          background2.style.transform = `translateY(${(scrolled - secondSectionStart) * 0.3}px) scale(${1 + ((scrolled - secondSectionStart) * 0.0005)})`;
        }
      }

      // Footer visibility logic
      if (footerRef.current) {
        const bottomThreshold = 100; // pixels from bottom
        const isNearBottom = (window.innerHeight + window.scrollY) >= documentHeight - bottomThreshold;
        
        footerRef.current.style.position = isNearBottom ? 'fixed' : 'absolute';
        footerRef.current.style.opacity = isNearBottom ? '1' : '0';
        footerRef.current.style.transform = isNearBottom ? 'translateY(0)' : 'translateY(20px)';
      }

      // Features fade-in animation
      const features = document.querySelectorAll('.feature-box');
      features.forEach((feature) => {
        const featureTop = (feature as HTMLElement).offsetTop;
        const scrollPosition = scrolled + window.innerHeight * 0.8;
        
        if (scrollPosition > featureTop) {
          (feature as HTMLElement).style.opacity = '1';
          (feature as HTMLElement).style.transform = 'translateY(0) rotate(var(--rotate-angle))';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[500vh] flex flex-col">
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none overflow-hidden z-20" />
      
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="parallax-bg-1 absolute inset-0 bg-[url('/lovable-uploads/7cc4c3f46fe854fc6b4c962bb6b3862a1.jpg')] bg-cover bg-center"
          style={{ 
            height: '120%',
            width: '100%',
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            transition: 'opacity 0.5s ease-out'
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-0">
        <div className="text-center w-full">
          <h1 ref={titleRef} className="text-6xl font-semibold mb-6 animate-fade-up" style={{ willChange: 'transform' }}>
            Embark On Tabbitra Voyage
          </h1>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            The best way to interact with the chain DeFi
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button variant="outline" className="bg-accent hover:bg-accent-dark text-forest font-medium">
              TWITTER
            </Button>
            <Button variant="outline" className="bg-accent hover:bg-accent-dark text-forest font-medium">
              DISCORD
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-fit flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div 
              className="feature-box bg-wood p-8 rounded-lg transition-all duration-1000 opacity-0"
              style={{ 
                '--rotate-angle': '-2deg',
                transform: 'translateY(50px) rotate(-2deg)',
                transition: 'all 0.8s ease-out'
              } as React.CSSProperties}
            >
              <h3 className="text-2xl font-semibold mb-4">POWERFUL DECENTRALIZATION</h3>
              <p className="text-lg">Enjoy the benefits of DeFi with Tabbitra’s intuitive mobile-first approach</p>
            </div>
            
            <div 
              className="feature-box bg-wood p-8 rounded-lg transition-all duration-1000 opacity-0"
              style={{ 
                '--rotate-angle': '2deg',
                transform: 'translateY(50px) rotate(2deg)',
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.2s'
              } as React.CSSProperties}
            >
              <h3 className="text-2xl font-semibold mb-4">PROFIT-FOCUSED FEATURES</h3>
              <p className="text-lg">Handle all your DeFi needs—swaps, contracts, and gas—efficiently and profitably</p>
            </div>

            <div 
              className="feature-box bg-wood p-8 rounded-lg transition-all duration-1000 opacity-0"
              style={{ 
                '--rotate-angle': '-1deg',
                transform: 'translateY(50px) rotate(-1deg)',
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.4s'
              } as React.CSSProperties}
            >
              <h3 className="text-2xl font-semibold mb-4">EMPOWER DECISIONS</h3>
              <p className="text-lg">Simulate scenarios, gain insights, and stay in control of your DeFi journey</p>
            </div>
            
            <div 
              className="feature-box bg-wood p-8 rounded-lg transition-all duration-1000 opacity-0"
              style={{ 
                '--rotate-angle': '1deg',
                transform: 'translateY(50px) rotate(1deg)',
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.6s'
              } as React.CSSProperties}
            >
              <h3 className="text-2xl font-semibold mb-4">Built-in Exploit Defense</h3>
              <p className="text-lg">Tabbitra safeguards your assets with advanced zero-day exploit protection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center mb-12 pt-20">
          <div className="text-center mb-12 pt-20 w-full px-4 py-24 bg-gradient-to-br from-accent/20 via-wood/30 to-accent-dark/20 backdrop-blur-sm">
          </div>
        </div>
      </div>         

      {/* Bottom Footer */}
      <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-6 mb-0 md:mb-0">
          <a href="#" className="text-white/60 hover:text-white text-sm">Privacy policy</a>
          <a href="#" className="text-white/60 hover:text-white text-sm">Terms of use</a>
        </div>
        <div className="text-white/60 text-sm">
          © 2024 Tabbitra. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Hero;
