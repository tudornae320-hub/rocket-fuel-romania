import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SquiggleDoodle, ArrowDoodle } from "@/components/Doodles";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import polaroidSvg from "@/assets/polaroid.svg";

const PastEditions = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 no-pattern">
        {/* Background Image with Dark Gradient */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="Startup Weekend" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
        </div>
        
        {/* Gradient Blend at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex items-center justify-between gap-12">
          {/* Left Side - Title and Info */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in text-white uppercase tracking-tight">
              Past <br/>
              Editions
            </h1>
            
            {/* Z-shaped Line */}
            <div className="mb-6 w-[320px] md:w-[400px] lg:w-[480px]">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 857.78 120.97"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <style>{`.cls-1{fill:#5ad1fc;}`}</style>
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="objects">
                    <path 
                      className="cls-1 animate-draw-path" 
                      d="M546.94,2.11q-91.62,2.84-183.06,9.51L198,14.56l-182,3.23c-5.87.1-15,4.4-15.85,10.92C-.91,35.89,8,37.09,13,37l118.29-2.09Q106.64,38,82.07,41.44c-5.68.78-13.61,3.44-15.43,9.66-1.62,5.54,3.44,9.47,8.81,9.56l273.19,4.69,58.14,1Q365,70.93,323.3,76.89,258,86.24,193.27,99c-4.66.91-11.27,5-12,10.22-.68,5,4.82,8.27,9.24,8.31l310.69,2.71,87.58.77c6.69,0,15.27-1.86,18.64-8.42,3-5.88-2.63-10.78-8.38-10.83L300,99.11l8.33-1.26q56.51-8.37,113.35-14.18,113.7-11.61,228.13-12.9L660,70.7l115.85,2c6.68.12,15.28-1.88,18.63-8.41,3.08-6-2.68-10.6-8.37-10.83q-59.12-2.37-118.31-2L512.88,48.75,239.69,44.07l-22-.38q71.52-7.61,143.26-12.85L660,25.54l182-3.23c5.57-.1,13.75-3.92,15.42-9.66S854,3.28,848.65,3.08Q697.87-2.54,546.94,2.11Z"
                      stroke="hsl(196, 96%, 67%)"
                      strokeWidth="2"
                      fill="hsl(196, 96%, 67%)"
                      strokeDasharray="2000"
                      strokeDashoffset="2000"
                      style={{ 
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Past Editions Grid */}
      <section className="container mx-auto px-4 mb-20 pt-16">
        {/* Top Row - Two Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div 
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
              <div 
                className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0 
                    ? 'opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Right tilted polaroid */}
              <div 
                className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0 
                    ? 'opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Main polaroid - raises on hover */}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0 
                    ? 'translate-y-[-40px] z-30' 
                    : 'translate-y-0 z-10'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
            </div>
            <Card className="hover-lift w-full max-w-md mx-auto mt-[120px] md:mt-[140px]">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Placeholder text for past edition card
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div 
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
              <div 
                className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1 
                    ? 'opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Right tilted polaroid */}
              <div 
                className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1 
                    ? 'opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Main polaroid - raises on hover */}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1 
                    ? 'translate-y-[-40px] z-10' 
                    : 'translate-y-0 z-10'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
            </div>
            <Card className="hover-lift w-full max-w-md mx-auto mt-[120px] md:mt-[140px]">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Placeholder text for past edition card
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row - One Card */}
        <div className="flex flex-col items-center max-w-md mx-auto">
          {/* Polaroid group with hover animation */}
          <div 
            className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Left tilted polaroid */}
            <div 
              className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                hoveredIndex === 2 
                  ? 'opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10' 
                  : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
              }`}
            >
              <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                <div className="h-8 bg-white"></div>
              </div>
            </div>
            
            {/* Right tilted polaroid */}
            <div 
              className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                hoveredIndex === 2 
                  ? 'opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10' 
                  : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
              }`}
            >
              <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                <div className="h-8 bg-white"></div>
              </div>
            </div>
            
            {/* Main polaroid - raises on hover */}
            <div 
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                hoveredIndex === 2 
                  ? 'translate-y-[-40px] z-10' 
                  : 'translate-y-0 z-10'
              }`}
            >
              <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                <div className="h-8 bg-white"></div>
              </div>
            </div>
          </div>
          <Card className="hover-lift w-full mt-[120px] md:mt-[140px]">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Placeholder text for past edition card
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Impactul nostru în numere
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground">Ediții</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">370+</div>
              <div className="text-muted-foreground">Participanți</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Proiecte</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">15+</div>
              <div className="text-muted-foreground">Orașe</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <ArrowDoodle className="top-10 left-10 opacity-20" />
        <ArrowDoodle className="bottom-10 right-10 opacity-20 rotate-180" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fii parte din următoarea ediție!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Alătură-te comunității noastre și construiește viitorul startup-urilor din România
          </p>
        </div>
      </section>
    </div>
  );
};

export default PastEditions;
