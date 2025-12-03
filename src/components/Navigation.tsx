import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "mentors", label: "Mentors" },
    { id: "agenda", label: "Agenda" },
    { id: "partners", label: "Partners" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="flex flex-col items-start">
            <span className="text-sm font-bold text-foreground leading-tight">techstars_</span>
            <span className="text-sm font-bold text-foreground leading-tight">Startup Weekend</span>
            <span className="text-sm font-bold text-primary leading-tight">Romania</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Cities Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCitiesOpen(!citiesOpen)}
                onBlur={() => setTimeout(() => setCitiesOpen(false), 150)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                Cities
                <ChevronDown size={16} className={`transition-transform ${citiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {citiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 transition-colors">
                      Bucharest
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 transition-colors">
                      Cluj-Napoca
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 transition-colors">
                      Timișoara
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Past Events */}
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Past Events
            </button>

            {/* Other Nav Items */}
            {navItems.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Contact */}
            <button
              onClick={() => scrollToSection("partners")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full">
              Join an event
            </Button>
            <Button variant="outline" className="border-2 border-foreground text-foreground hover:bg-foreground/5 font-semibold px-6 rounded-full">
              Host in your city
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
              <button
                onClick={() => {
                  setCitiesOpen(!citiesOpen);
                }}
                className="flex items-center justify-between text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Cities
                <ChevronDown size={16} className={`transition-transform ${citiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {citiesOpen && (
                <div className="pl-4 flex flex-col gap-2">
                  <button className="text-left text-foreground/70 hover:text-primary py-1">Bucharest</button>
                  <button className="text-left text-foreground/70 hover:text-primary py-1">Cluj-Napoca</button>
                  <button className="text-left text-foreground/70 hover:text-primary py-1">Timișoara</button>
                </div>
              )}
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Past Events
              </button>
              {navItems.slice(0, 2).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("partners")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Contact
              </button>
              <div className="flex flex-col gap-3 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full w-full">
                  Join an event
                </Button>
                <Button variant="outline" className="border-2 border-foreground text-foreground hover:bg-foreground/5 font-semibold rounded-full w-full">
                  Host in your city
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
