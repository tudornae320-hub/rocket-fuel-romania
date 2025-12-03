import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const juryMembers = [
  { 
    name: "Aleodor Tabarcea", 
    role: "Engineering Manager", 
    company: "Stripe",
    bio: "Passionate about building high-performance teams and scalable systems."
  },
  { 
    name: "Eduard Burghelia", 
    role: "Venture Partner", 
    company: "V7 Capital",
    bio: "Investing in early-stage startups across CEE with a focus on deep tech."
  },
  { 
    name: "Florin Visa", 
    role: "Partner", 
    company: "Early Game Ventures",
    bio: "Supporting founders from idea to Series A with hands-on guidance."
  },
];

export const InteractiveJuryGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
      {juryMembers.map((jury, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              relative rounded-2xl border-2 overflow-hidden bg-card cursor-pointer
              transition-all duration-500 ease-out
              ${isHovered 
                ? 'w-[280px] scale-105 border-primary shadow-xl z-10' 
                : isOtherHovered 
                  ? 'w-[200px] scale-95 opacity-60 border-border' 
                  : 'w-[220px] scale-100 border-border'
              }
            `}
          >
            <CardContent className="p-0">
              {/* Photo placeholder with overlay on hover */}
              <div className={`
                relative w-full overflow-hidden transition-all duration-500
                ${isHovered ? 'h-[200px]' : 'h-[180px]'}
              `}>
                <div className="w-full h-full bg-muted" />
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent
                  transition-opacity duration-500
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                `} />
              </div>
              
              {/* Content area */}
              <div className={`
                border-t border-border transition-all duration-500
                ${isHovered ? 'p-5' : 'p-4'}
              `}>
                <h3 className={`
                  font-bold text-foreground transition-all duration-300
                  ${isHovered ? 'text-lg mb-1' : 'text-base'}
                `}>
                  {jury.name}
                </h3>
                <p className={`
                  text-secondary font-medium transition-all duration-300
                  ${isHovered ? 'text-base' : 'text-sm'}
                `}>
                  {jury.company}
                </p>
                <p className={`
                  text-muted-foreground text-sm transition-all duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-0 h-0'}
                `}>
                  {jury.role}
                </p>
                
                {/* Expandable bio */}
                <div className={`
                  overflow-hidden transition-all duration-500 ease-out
                  ${isHovered ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}
                `}>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {jury.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
