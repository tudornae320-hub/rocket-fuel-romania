import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

// TikTok icon (not in lucide-react)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="mx-4 mb-4">
      <div className="bg-background border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000]">
        {/* Main Footer Content */}
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-start mb-4">
                <span className="text-sm font-bold text-foreground leading-tight">techstars_</span>
                <span className="text-sm font-bold text-foreground leading-tight">Startup Weekend</span>
                <span className="text-sm font-bold text-primary leading-tight">Romania</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Transform your ideas into reality in just 54 hours. Join Romania's most exciting startup community.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground/5 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground/5 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground/5 transition-colors">
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Past Events</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mentors</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Our Cities */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Our Cities</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bucharest</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Constanta</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cluj</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Oradea</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Targu Jiu</a></li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Get in Touch</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:hello@startupweekend.ro" className="text-sm text-muted-foreground hover:text-primary transition-colors">hello@startupweekend.ro</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <a href="tel:+40123456789" className="text-sm text-muted-foreground hover:text-primary transition-colors">+40 123 456 789</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Bucharest, Romania</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Host in Your City</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Startup Weekend</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#000000]">
          <div className="container mx-auto px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Copyright © 2025 <span className="text-foreground">Startup Weekend Romania</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
