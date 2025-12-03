import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDoodle, StarDoodle } from "@/components/Doodles";
import { Linkedin } from "lucide-react";

const Mentors = () => {
  const mentors = [
    {
      name: "Ana Popescu",
      role: "CEO @ TechStartup",
      city: "București",
      expertise: "Product & Strategy",
    },
    {
      name: "Mihai Ionescu",
      role: "CTO @ InnovateLab",
      city: "Cluj-Napoca",
      expertise: "Technology & Development",
    },
    {
      name: "Elena Dumitrescu",
      role: "Marketing Director",
      city: "Timișoara",
      expertise: "Marketing & Growth",
    },
    {
      name: "Andrei Georgescu",
      role: "Investor & Mentor",
      city: "Iași",
      expertise: "Business & Funding",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <CircleDoodle className="top-32 right-10 opacity-20" />
      <StarDoodle className="top-40 left-10 opacity-20" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16 text-center relative">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Mentorii <span className="text-gradient">noștri</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Oameni cu experiență reală care te ajută să transformi ideea în realitate
        </p>
      </section>

      {/* Mentors Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, idx) => (
            <Card key={idx} className="group hover-lift hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-background px-6 text-center">
                      {mentor.expertise}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{mentor.name}</h3>
                  <p className="text-muted-foreground mb-2">{mentor.role}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-semibold">{mentor.city}</span>
                    <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Mentors Matter */}
      <section className="py-16 mb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            De ce sunt importanți mentorii?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">100+</div>
              <p className="text-lg">Mentori în toată țara</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-4">500+</div>
              <p className="text-lg">Ore de mentorat oferite</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">50+</div>
              <p className="text-lg">Startup-uri lansate cu ajutorul lor</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
          <CardContent className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vrei să devii mentor?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Împărtășește-ți experiența și ajută următoarea generație de antreprenori
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-12">
              Aplică ca mentor
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Mentors;
