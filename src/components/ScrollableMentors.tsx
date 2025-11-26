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

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
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
          {/* Duplicate the array twice for seamless loop */}
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-6 shrink-0">
              {mentors.map((mentor, index) => (
                <Card key={`${groupIndex}-${index}`} className="text-center shrink-0 w-[280px]">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-1">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground">{mentor.role}</p>
                    <p className="text-sm font-medium text-primary">{mentor.company}</p>
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
