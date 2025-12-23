import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import sageterSvg from "@/assets/sageter.svg";
import linieSvg from "@/assets/linie.svg";

// Import jury images
import aleodorTabarcea from "@/assets/jury/aleodor-tabarcea.jpeg";
import eduardBurghelia from "@/assets/jury/eduard-burghelia.jpg";
import florinVisa from "@/assets/jury/florin-visa.jpeg";

// Image mapping
const juryImages: { [key: string]: string | null } = {
  'aleodor-tabarcea': aleodorTabarcea,
  'eduard-burghelia': eduardBurghelia,
  'florin-visa': florinVisa,
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

  const renderJuryCard = (jury: typeof juryMembers[0], index: number, isLarge: boolean = false) => {
    const isHovered = hoveredIndex === index;
    const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

    return (
      <Card
        key={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`
          relative overflow-hidden cursor-pointer
          transition-all duration-500 ease-out
          ${isLarge ? 'w-[280px]' : 'w-[220px]'}
          ${isHovered ? 'scale-110 shadow-xl z-10 !border-primary' : ''}
          ${isOtherHovered ? 'scale-90 opacity-70' : ''}
        `}
      >
        <CardContent className="p-0">
          {/* Photo */}
          <div className={`relative w-full overflow-hidden ${isLarge ? 'h-[220px]' : 'h-[180px]'}`}>
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
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto px-4 pt-20 md:pt-24">
      {/* Left side: Text, placeholder, and arrow */}
      <div className="flex flex-col items-center justify-center flex-shrink-0 order-1 md:order-1 gap-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Meet the jury
        </h2>
        <div className="w-full max-w-xs">
          <img 
            src={linieSvg} 
            alt="Line decoration" 
            className="w-full h-auto object-contain"
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1352%) hue-rotate(170deg) brightness(98%) contrast(98%)'
            }}
          />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Placeholder text
        </p>
        {/* Arrow below placeholder text */}
        <div className="flex items-center justify-center flex-shrink-0 hidden md:block">
          <div className="w-16 h-24 md:w-20 md:h-32">
            <img 
              src={sageterSvg} 
              alt="Arrow" 
              className="w-full h-full object-contain"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1352%) hue-rotate(170deg) brightness(98%) contrast(98%)',
                transform: 'rotate(80deg) translateY(-100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right side: Triangle layout with cards */}
      <div className="flex items-center gap-4 flex-shrink-0 order-2 md:order-2 flex-wrap md:flex-nowrap justify-center md:ml-8">
        {/* Larger card on the left */}
        {renderJuryCard(juryMembers[0], 0, true)}
        
        {/* Stacked cards on the right */}
        <div className="flex flex-col gap-4">
          {renderJuryCard(juryMembers[1], 1, false)}
          {renderJuryCard(juryMembers[2], 2, false)}
        </div>
      </div>
    </div>
  );
};
