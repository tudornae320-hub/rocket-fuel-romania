import { useRef, useState, MouseEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Import sponsor images

import brewtifi from "@/assets/sponsors/brewtifi.png";
import featherlessAi from "@/assets/sponsors/featherless-ai.png";
import lsac from "@/assets/sponsors/lsac.png";
import founderInstitute from "@/assets/sponsors/founder-institute.png";
import qaDna from "@/assets/sponsors/qa-dna.png";
import kickstartRomania from "@/assets/sponsors/kickstart-romania.png";
import oportune from "@/assets/sponsors/oportune.png";
import romanianBusinessClub from "@/assets/sponsors/romanian-business-club.png";
import bos from "@/assets/sponsors/bos.png";
import vip from "@/assets/sponsors/vip.png";
import sisc from "@/assets/sponsors/sisc.png";
import vsfa from "@/assets/sponsors/vsfa.png";
import best from "@/assets/sponsors/best.png";

const sponsors: { name: string; image: string; small?: boolean }[] = [
  
  { name: "Brewtifi", image: brewtifi },
  { name: "Featherless.ai", image: featherlessAi },
  { name: "LSAC", image: lsac },
  { name: "Founder Institute", image: founderInstitute },
  { name: "QA DNA", image: qaDna },
  { name: "Kickstart Romania", image: kickstartRomania },
  { name: "Oportune", image: oportune },
  { name: "Romanian Business Club", image: romanianBusinessClub },
  { name: "BOS", image: bos, small: true },
  { name: "VIP", image: vip, small: true },
  { name: "SISC", image: sisc },
  { name: "VSFA", image: vsfa },
  { name: "BEST", image: best },
];

export const ScrollableSponsors = () => {
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
    
    const maxScroll = scrollRef.current.scrollWidth / 3;
    if (scrollRef.current.scrollLeft >= maxScroll * 2) {
      scrollRef.current.scrollLeft = maxScroll;
      setScrollLeft(scrollRef.current.scrollLeft);
      setStartX(x);
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft = maxScroll;
      setScrollLeft(scrollRef.current.scrollLeft);
      setStartX(x);
    }
    
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
    
    const maxScroll = scrollRef.current.scrollWidth / 3;
    if (scrollRef.current.scrollLeft >= maxScroll * 2) {
      scrollRef.current.scrollLeft = maxScroll;
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft = maxScroll;
    }
    
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
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
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
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <Card 
              key={index} 
              className="shrink-0 w-[240px] h-[140px] rounded-2xl border-0 overflow-hidden bg-transparent shadow-none"
            >
              <CardContent className="p-4 flex items-center justify-center h-full">
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name}
                  className={`max-w-full object-contain select-none pointer-events-none ${sponsor.small ? 'max-h-[60px]' : 'max-h-full'}`}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
