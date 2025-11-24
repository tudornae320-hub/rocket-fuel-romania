import { useState } from "react";
import { NavLink } from "./NavLink";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Acasă", path: "/" },
    { name: "Orașe", path: "/cities" },
    { name: "Mentori", path: "/mentors" },
    { name: "Parteneri", path: "/partners" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-primary">SW</span>
              <span className="text-secondary">Romania</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="text-foreground hover:text-primary transition-colors font-medium"
                activeClassName="text-primary"
              >
                {item.name}
              </NavLink>
            ))}
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Înscrie-te acum
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
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  activeClassName="text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Înscrie-te acum
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
