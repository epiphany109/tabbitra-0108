import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Twitter, MessageSquare } from "lucide-react";

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
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f8ecf25d-f7b6-43c7-af89-5a9f7f2a640c.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">TABBITRA VOYAGE</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-accent transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-accent transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              className="bg-accent hover:bg-accent-dark text-forest font-medium transition-colors"
            >
              ENTER BETA
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;