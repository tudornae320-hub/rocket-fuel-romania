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
    const walk = (x - startX) * 4;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative overflow-hidden">
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
          className="flex gap-6 items-center animate-scroll-right"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate sponsors 3 times for seamless infinite loop */}
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <Card 
              key={index} 
              className="shrink-0 w-[180px] h-[100px] rounded-2xl border-2 overflow-hidden bg-card border-border"
            >
              <CardContent className="p-6 flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground font-semibold">
                  {sponsor.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
