import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
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
      <div className="container mx-auto px-6 bg-background border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center">
            <img
              src={new URL("@/assets/logo-bucharest.png", import.meta.url).href}
              alt="Bucharest Startup Weekend"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.id === "home") {
                return (
                  <Link
                    key={item.id}
                    to="/"
                    onClick={scrollToTop}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
              );
            })}
            <Link
              to="/past-editions"
              onClick={scrollToTop}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Past Editions
            </Link>
            <a
              href="https://buy.stripe.com/4gMbJ1gEdaZJeHddqX1gs04"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full">
                Get your ticket
              </Button>
            </a>
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
          <div className="md:hidden py-4 animate-fade-in border-t border-[#000000]">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                if (item.id === "home") {
                  return (
                    <Link
                      key={item.id}
                      to="/"
                      onClick={scrollToTop}
                      className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
                );
              })}
              <Link
                to="/past-editions"
                onClick={scrollToTop}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Past Editions
              </Link>
              <a
                href="https://buy.stripe.com/4gMbJ1gEdaZJeHddqX1gs04"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full w-full">
                  Get your ticket
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
