import { useRef, useState, MouseEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const sponsors = [
  { name: "Stripe" },
  { name: "Veridion" },
  { name: "Adobe" },
  { name: "Techstars" },
  { name: "VSFA" },
  { name: "BOS Romania" },
  { name: "PROW" },
  { name: "Entrepreneurship Academy" },
  { name: "AmplifyONG" },
  { name: "Brewtifi" },
  { name: "VIP Romania" },
  { name: "V7 Capital" },
  { name: "DevMind" },
  { name: "Best Bucharest" },
  { name: "RAU" },
  { name: "Launch.ro" },
];

export const ScrollableSponsors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRef = useRef<number>();

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    lastXRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 0.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    const now = Date.now();
    const timeDiff = now - lastTimeRef.current;
    if (timeDiff > 0) {
      const distance = e.pageX - lastXRef.current;
      velocityRef.current = distance / timeDiff * 16;
    }
    
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;
  };

  const applyMomentum = () => {
    if (!scrollRef.current) return;
    
    scrollRef.current.scrollLeft -= velocityRef.current;
    velocityRef.current *= 0.95;
    
    if (Math.abs(velocityRef.current) > 0.5) {
      momentumRef.current = requestAnimationFrame(applyMomentum);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(velocityRef.current) > 1) {
      applyMomentum();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (Math.abs(velocityRef.current) > 1) {
        applyMomentum();
      }
    }
    setHoveredKey(null);
  };

  return (
    <div className="relative">
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none py-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          className={`flex gap-6 items-center ${hoveredKey ? '' : 'animate-scroll-right'}`} 
          style={{ 
            width: 'max-content',
            animationPlayState: hoveredKey ? 'paused' : 'running'
          }}
        >
          {/* Duplicate sponsors 3 times for seamless infinite loop */}
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => {
            const isHovered = hoveredKey === String(index);
            const isOtherHovered = hoveredKey !== null && hoveredKey !== String(index);

            return (
              <Card 
                key={index} 
                onMouseEnter={() => setHoveredKey(String(index))}
                onMouseLeave={() => setHoveredKey(null)}
                className={`
                  shrink-0 w-[180px] h-[100px] rounded-2xl border-2 overflow-hidden bg-card
                  transition-all duration-500 ease-out border-border
                  ${isHovered ? 'scale-110 shadow-xl z-20 border-primary mx-4' : ''}
                  ${isOtherHovered ? 'scale-90 opacity-70' : ''}
                `}
              >
                <CardContent className="p-6 flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground font-semibold">
                    {sponsor.name}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
