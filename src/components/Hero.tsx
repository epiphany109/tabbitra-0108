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
      features.forEach((feature, index) => {
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
          className="parallax-bg-1 absolute inset-0 bg-[url('/lovable-uploads/9dc68e5604fae3df930b2ce3f0ecc0d2.jpg')] bg-no-repeat"
          style={{ 
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
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
        <div className="text-center mb-12 pt-20 w-full px-4 py-24 bg-gradient-to-br from-accent/20 via-wood/30 to-accent-dark/20 backdrop-blur-sm">
          <h2 className="text-6xl font-semibold mb-12 mt-15 bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
            START EARNING
          </h2>
          <div className="relative">
            <img 
              src="/lovable-uploads/TabbitLogo.png" 
              alt="Tabbit Logo" 
              className="w-25% h-25% mx-auto animate-spin-slow" 
            />
            <Button 
              className="bg-accent hover:bg-accent-dark text-forest font-medium px-8 py-6 text-xl ease-in-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:-translate-y-1 hover:scale-110 outline-none focus:outline-none active:outline-none"
            >
              ENTER APP
            </Button>
          </div>
        </div>
      </div>

      {/* Information Columns Section */}
      <div className="relative z-10 bg-wood/20 backdrop-blur-sm py-18.5 mt-auto pb-4.5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="col-span-1">
              <img 
                src="/lovable-uploads/TabbitLogo.png" 
                alt="Logo" 
                className="w-32 mb-4" 
              />
              <p className="text-white/60 text-sm">
                Proof of Liquidity in one click
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-white/60 hover:text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Products Column */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white">iBGT</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">Vaults</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white">Brand</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">Docs</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">Security</a></li>
              </ul>
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
      </div>
    </div>
  );
};

export default Hero;