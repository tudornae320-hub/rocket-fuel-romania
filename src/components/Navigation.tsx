import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "mentors", label: "Mentors" },
    { id: "agenda", label: "Agenda" },
    { id: "partners", label: "Partners" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="container mx-auto px-6 bg-background border border-border rounded-2xl shadow-sm">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="flex flex-col items-start">
            <span className="text-xs font-bold text-foreground leading-tight">techstars_</span>
            <span className="text-xs font-bold text-foreground leading-tight">Startup Weekend</span>
            <span className="text-xs font-bold text-primary leading-tight">Romania</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full">
              Get your ticket
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full w-full">
                Get your ticket
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
