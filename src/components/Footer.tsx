import { NavLink } from "./NavLink";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-dark-grey text-off-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">SW</span>
              <span className="text-secondary">Romania</span>
            </h3>
            <p className="text-sm text-gray-400">
              Un weekend, o idee, o echipă. Hai să construim împreună.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navigare</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Acasă
                </NavLink>
              </li>
              <li>
                <NavLink to="/cities" className="text-gray-400 hover:text-primary transition-colors">
                  Orașe
                </NavLink>
              </li>
              <li>
                <NavLink to="/mentors" className="text-gray-400 hover:text-primary transition-colors">
                  Mentori
                </NavLink>
              </li>
              <li>
                <NavLink to="/partners" className="text-gray-400 hover:text-primary transition-colors">
                  Parteneri
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@swromania.ro" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@swromania.ro
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Social Media</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2024 Startup Weekend Romania. Powered by Stripe. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};
