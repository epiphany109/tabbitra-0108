import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Twitter } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/TabbitLogo.png" alt="Logo" className="h-8 w-8 rounded" />
              <span className="text-lg font-medium">TABBITRA</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors">iBGT</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Vaults</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Blog</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Docs</a>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white transition-colors"
              >
                <img 
                  src="/lovable-uploads/636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg"
                  alt="Discord"
                  className="h-5 w-5 invert"
                />           
              </Button>
            </div>
            
            <Button
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2 rounded-full transition-all"
            >
              ENTER APP
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;