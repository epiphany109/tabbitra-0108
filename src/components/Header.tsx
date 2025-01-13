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
        scrolled ? "py-2 glass" : "py-2"
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
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"/>
                </svg>
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