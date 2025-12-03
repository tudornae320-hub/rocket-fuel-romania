import { useRef, useState, MouseEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const mentors = [
  { name: "Nicolae Gudumac", role: "Founder & CTO", company: "Planable" },
  { name: "Bogdan Iordache", role: "GP", company: "Underline VC" },
  { name: "Anca Bercă", role: "Product Manager", company: "Bitdefender" },
  { name: "Alex Gavril", role: "CEO", company: "▲ promocrat" },
  { name: "Alex Dascalu", role: "Lead Director", company: "Founder Institute CEE" },
  { name: "Alexandru Anghel", role: "Co-founder", company: "Solo" },
  { name: "Anca Marcu", role: "CFO", company: "AMSIMCEL" },
  { name: "AnaMaria Onică", role: "CEO", company: "VOXivers" },
  { name: "Auras Tanase", role: "Growth Marketeer", company: "Veridion" },
  { name: "Ioana Serban", role: "Fractional CMO", company: "TechMarketers" },
  { name: "Tudor Petracovici", role: "Full Stack Engineer", company: "Veridion" },
  { name: "Alex Nicoară", role: "Co-founder", company: "Soulmag.ai" },
  { name: "Daniel Deaconu", role: "Founder", company: "The Simplifier" },
];

export const ScrollableMentors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
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
    
    // Cancel any ongoing momentum
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
    
    // Calculate velocity
    const now = Date.now();
    const timeDiff = now - lastTimeRef.current;
    if (timeDiff > 0) {
      const distance = e.pageX - lastXRef.current;
      velocityRef.current = distance / timeDiff * 16; // Scale to 60fps
    }
    
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;
  };

  const applyMomentum = () => {
    if (!scrollRef.current) return;
    
    // Apply velocity to scroll position
    scrollRef.current.scrollLeft -= velocityRef.current;
    
    // Apply friction (deceleration)
    velocityRef.current *= 0.95;
    
    // Continue momentum if velocity is significant
    if (Math.abs(velocityRef.current) > 0.5) {
      momentumRef.current = requestAnimationFrame(applyMomentum);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Start momentum animation if there's significant velocity
    if (Math.abs(velocityRef.current) > 1) {
      applyMomentum();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Start momentum animation if there's significant velocity
      if (Math.abs(velocityRef.current) > 1) {
        applyMomentum();
      }
    }
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
        className="overflow-x-auto scrollbar-hide mb-16 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-6 animate-scroll-left" style={{ width: 'max-content' }}>
          {/* Duplicate the array 3 times for truly seamless infinite loop */}
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-6 shrink-0">
              {mentors.map((mentor, index) => (
                <Card key={`${groupIndex}-${index}`} className="shrink-0 w-[220px] rounded-2xl border-2 border-border overflow-hidden bg-card">
                  <CardContent className="p-0">
                    {/* Photo placeholder */}
                    <div className="w-full h-[180px] bg-muted" />
                    {/* Name and company */}
                    <div className="p-4 border-t border-border">
                      <h3 className="font-bold text-base text-foreground">{mentor.name}</h3>
                      <p className="text-sm text-secondary font-medium">{mentor.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
