import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Import jury images - only import files that exist
import eduardBurghelia from "@/assets/jury/eduard-burghelia.jpg";

// Image mapping - add imports here as images are added
const juryImages: { [key: string]: string | null } = {
  'aleodor-tabarcea': null, // Missing - will use placeholder
  'eduard-burghelia': eduardBurghelia,
  'florin-visa': null, // Missing - will use placeholder
};

const juryMembers = [
  { 
    name: "Aleodor Tabarcea", 
    role: "Engineering Manager", 
    company: "Stripe",
    bio: "Passionate about building high-performance teams and scalable systems.",
    image: juryImages['aleodor-tabarcea']
  },
  { 
    name: "Eduard Burghelia", 
    role: "Venture Partner", 
    company: "V7 Capital",
    bio: "Investing in early-stage startups across CEE with a focus on deep tech.",
    image: juryImages['eduard-burghelia']
  },
  { 
    name: "Florin Visa", 
    role: "Partner", 
    company: "Early Game Ventures",
    bio: "Supporting founders from idea to Series A with hands-on guidance.",
    image: juryImages['florin-visa']
  },
];

export const InteractiveJuryGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto items-start">
      {juryMembers.map((jury, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              relative overflow-hidden cursor-pointer
              transition-all duration-500 ease-out w-[220px]
              ${isHovered ? 'scale-110 shadow-xl z-10 !border-primary' : ''}
              ${isOtherHovered ? 'scale-90 opacity-70' : ''}
            `}
          >
            <CardContent className="p-0">
              {/* Photo */}
              <div className="relative w-full h-[180px] overflow-hidden">
                {jury.image ? (
                  <img 
                    src={jury.image} 
                    alt={jury.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-fade-in" />
                )}
              </div>
              
              {/* Content area */}
              <div className="border-t border-[#000000] p-4">
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
