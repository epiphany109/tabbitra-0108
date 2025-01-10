import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ParallaxHero = () => {
  const particlesRef = useRef(null);
  const titleRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);

  useEffect(() => {
    // 原有的落葉動畫保持不變
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

    // 增強的視差效果
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const layer1 = layer1Ref.current;
      const layer2 = layer2Ref.current;
      const title = titleRef.current;
      
      if (layer1) {
        // 第一層背景以較慢速度移動
        const scale1 = 1 + (scrolled * 0.0003);
        layer1.style.transform = `translateY(${scrolled * 0.3}px) scale(${scale1})`;
      }
      
      if (layer2) {
        // 第二層背景以較快速度移動
        const scale2 = 1 + (scrolled * 0.0005);
        layer2.style.transform = `translateY(${scrolled * 0.5}px) scale(${scale2})`;
      }
      
      if (title) {
        // 標題以中等速度移動
        title.style.transform = `translateY(${scrolled * 0.4}px)`;
        title.style.opacity = Math.max(0, 1 - scrolled * 0.002);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-[500vh] flex flex-col">
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none overflow-hidden z-30" />
      
      {/* 第一層背景 - 較遠的森林 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          ref={layer1Ref}
          className="absolute inset-0 bg-[url('/lovable-uploads/31509c9d-7aa4-4bb9-b783-2db4bb9388f3.png')] bg-no-repeat"
          style={{ 
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.85)',
            height: '120%',
            width: '100%',
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        />
      </div>

      {/* 第二層背景 - 較近的森林 */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        <div 
          ref={layer2Ref}
          className="absolute inset-0 bg-[url('lovable-uploads/6f2d46843e458a7915b8ea89f0e8a4e0.jpg')] bg-no-repeat"
          style={{ 
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.95)',
            height: '120%',
            width: '100%',
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-0">
        <div className="text-center w-full">
          <h1 ref={titleRef} 
              className="text-7xl font-bold mb-6 animate-fade-up" 
              style={{ 
                willChange: 'transform',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
            Embark On Tabbitra Voyage
          </h1>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto animate-fade-up" 
             style={{ 
               animationDelay: "0.2s",
               textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
             }}>
            The best way to interact with the chain DeFi
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button variant="outline" className="bg-accent/90 hover:bg-accent-dark backdrop-blur-sm text-forest font-medium transition-all duration-300">
              TWITTER
            </Button>
            <Button variant="outline" className="bg-accent/90 hover:bg-accent-dark backdrop-blur-sm text-forest font-medium transition-all duration-300">
              DISCORD
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section - 每個特性卡片都有視差效果 */}
      <div className="relative z-20 min-h-screen py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-24">
            {[
              {
                title: "DECENTRALIZED, YET INTUITIVE",
                description: "Experience the freedom of DeFi with an intuitive, mobile-first app",
                rotate: -2
              },
              {
                title: "EARNING OPTIMIZED",
                description: "Tabbitra handles everything - swaps, contract interactions, and gas payments",
                rotate: 2
              },
              {
                title: "DEFI WITH DATA",
                description: "Simulate deposit outcomes, track your transactions, and gain real-time insights",
                rotate: -1
              },
              {
                title: "EXPLOIT BLOCKING PROTECTION",
                description: "Leveraging Spherex's zero day exploit blocking for your security",
                rotate: 1
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-wood/90 backdrop-blur-sm p-8 rounded-lg transform transition-all duration-500 hover:scale-105"
                style={{
                  transform: `rotate(${feature.rotate}deg) translateY(${index * 20}px)`,
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Earning Section */}
      <div className="relative z-20 min-h-[70vh] bg-wood-dark/90 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="text-center mb-12 pt-20">
          <h2 className="text-8xl font-bold mb-12 mt-15">START   EARNING</h2>
          <div className="relative">
            <img 
              src="/lovable-uploads/f8ecf25d-f7b6-43c7-af89-5a9f7f2a640c.png" 
              alt="Bera Logo" 
              className="w-auto h-auto mx-auto animate-spin-slow" 
            />
            <Button 
              className="bg-accent/90 hover:bg-accent-dark backdrop-blur-sm text-forest font-medium px-8 py-6 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              ENTER   APP
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative z-20 text-sm text-white/60 text-center py-4 bg-black/20 backdrop-blur-sm">
        © 2024 Tabbitra. All rights reserved.
      </div>
    </div>
  );
};

export default ParallaxHero;
