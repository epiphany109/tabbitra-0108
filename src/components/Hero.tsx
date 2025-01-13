import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Twitter } from "lucide-react";

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    <div className="relative min-h-[100vh] flex flex-col">
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 pt-32">
          {/* Built on Chain Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <img src="/lovable-uploads/TabbitLogo.png" alt="Chain Logo" className="h-5 w-5" />
            <span className="text-sm text-white/80">Built on Berachain</span>
          </div>

          {/* Hero Text */}
          <div className="max-w-2xl">
            <h1 className="text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 text-transparent bg-clip-text">
                Proof of Liquidity
              </span>
              <br />
              <span className="text-white">in one click</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Tabbitra simplifies interacting with Proof of Liquidity with our liquid staking products.
            </p>
            <Button className="bg-white/20 hover:bg-white/30 text-white px-8 py-6 text-lg rounded-lg">
              Stake
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img src="/lovable-uploads/TabbitLogo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-medium">TABBITRA</span>
              </div>
              <p className="text-white/60">Proof of Liquidity in one click</p>
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white">
                  <img 
                    src="/lovable-uploads/636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg"
                    alt="Discord"
                    className="h-6 w-6 invert opacity-60 hover:opacity-100"
                  />
                </a>
              </div>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="text-sm font-medium text-white/40 uppercase mb-6">Products</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/80 hover:text-white">iBGT</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Vaults</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-medium text-white/40 uppercase mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/80 hover:text-white">Brand</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-medium text-white/40 uppercase mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/80 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Docs</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/60">
              © 2024 Tabbitra Finance
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-white/60 hover:text-white">Privacy policy</a>
              <a href="#" className="text-sm text-white/60 hover:text-white">Terms of use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
