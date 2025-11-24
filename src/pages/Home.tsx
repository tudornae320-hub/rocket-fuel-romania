import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { DictionaryTooltip } from "@/components/Tooltip";
import { ArrowDoodle, CircleDoodle, StarDoodle, SquiggleDoodle } from "@/components/Doodles";
import { Rocket, Lightbulb, Users, TrendingUp } from "lucide-react";

const Home = () => {
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rocketRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        
        const xPos = scrollPercent * 80;
        const yPos = Math.sin(scrollPercent * Math.PI * 2) * 30;
        
        rocketRef.current.style.transform = `translate(${xPos}vw, ${yPos}vh) rotate(${scrollPercent * 360}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Animated Rocket */}
      <div
        ref={rocketRef}
        className="fixed top-20 left-0 z-40 pointer-events-none transition-transform duration-100 ease-out"
      >
        <Rocket className="w-12 h-12 text-primary animate-rocket-float" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
        
        <ArrowDoodle className="top-1/4 right-10 animate-float" />
        <CircleDoodle className="bottom-1/4 left-10 animate-wiggle" />
        <StarDoodle className="top-1/3 left-1/4 animate-float" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="block mb-2">Startup Weekend</span>
            <span className="text-gradient">Romania</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-muted-foreground max-w-2xl mx-auto">
            powered by Stripe
          </p>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Un weekend, o idee, o echipă. Hai să construim împreună.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8">
              Înscrie-te acum
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8">
              Vezi orașele
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 relative">
        <SquiggleDoodle className="top-10 right-20 opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Evenimente viitoare
            </h2>
            <p className="text-lg text-muted-foreground">
              Alege orașul tău și salvează-ți locul! Locurile sunt limitate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <EventCard 
              city="Cluj-Napoca"
              dates="14-16 Nov 2024"
              location="Impact Hub"
              spotsLeft={15}
            />
            <EventCard 
              city="București"
              dates="21-23 Nov 2024"
              location="TechHub"
              spotsLeft={8}
            />
            <EventCard 
              city="Iași"
              dates="28-30 Nov 2024"
              location="Innovation Lab"
              spotsLeft={12}
            />
            <EventCard 
              city="Timișoara"
              dates="5-7 Dec 2024"
              location="Startup Center"
              spotsLeft={20}
            />
          </div>
        </div>
      </section>

      {/* What is Startup Weekend */}
      <section className="py-20 bg-muted/50 relative">
        <CircleDoodle className="top-20 left-10 opacity-20" />
        <StarDoodle className="bottom-20 right-10 opacity-20" />
        
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Ce este Startup Weekend?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Ideile tale contează</h3>
              <p className="text-muted-foreground">
                Dacă n-ai o idee, nu-i nimic — au alții. Lucrăm împreună și construim ceva real.
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Networking real</h3>
              <p className="text-muted-foreground">
                Cunoști <DictionaryTooltip word="Mentori" definition="Oameni super deștepți și cu experiență care îți dau feedback.">mentori</DictionaryTooltip>, juriu, sponsori și participanți din toate domeniile.
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Testează-ți ideea</h3>
              <p className="text-muted-foreground">
                Construiești un <DictionaryTooltip word="MVP" definition="Versiunea cea mai simplă și rapidă a produsului tău.">MVP</DictionaryTooltip> real în 54 de ore și primești feedback instant.
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Rocket className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Start pentru business-ul tău</h3>
              <p className="text-muted-foreground">
                Multe proiecte din Startup Weekend continuă și devin afaceri reale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <ArrowDoodle className="top-10 left-20 animate-float" />
        <ArrowDoodle className="bottom-10 right-20 animate-float" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Aim for the stars
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Your startup is the stage; it's your time to be the star.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-12">
            Începe aventura
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
