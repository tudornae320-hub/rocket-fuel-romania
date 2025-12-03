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
    <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto items-start">
      {juryMembers.map((jury, index) => {
        const isHovered = hoveredIndex === index;

        return (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              relative rounded-2xl border-2 overflow-hidden bg-card cursor-pointer
              transition-all duration-500 ease-out w-[220px] border-border
              ${isHovered ? 'shadow-xl z-10 border-primary' : ''}
            `}
          >
            <CardContent className="p-0">
              {/* Photo placeholder */}
              <div className="relative w-full h-[180px] overflow-hidden">
                <div className="w-full h-full bg-muted" />
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-fade-in" />
                )}
              </div>
              
              {/* Content area */}
              <div className="border-t border-border p-4">
                <h3 className="font-bold text-base text-foreground">
                  {jury.name}
                </h3>
                <p className="text-sm text-secondary font-medium">
                  {jury.company}
                </p>
                
                {/* Expandable content on hover only */}
                <div className={`
                  overflow-hidden transition-all duration-500 ease-out
                  ${isHovered ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                `}>
                  <p className="text-sm text-muted-foreground mb-1">{jury.role}</p>
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
