import { useRef, useState, MouseEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Import sponsor images
import adobe from "@/assets/sponsors/adobe.png";
import amplifyong from "@/assets/sponsors/amplifyong.png";
import bosRomania from "@/assets/sponsors/bos-romania.png";
import brewtifi from "@/assets/sponsors/brewtifi.png";
import brightLabs from "@/assets/sponsors/bright-labs.png";
import businessClub from "@/assets/sponsors/business_club.png";
import codeCup from "@/assets/sponsors/code-cup.png";
import founderInstitute from "@/assets/sponsors/founder-institute.png";
import how2web from "@/assets/sponsors/how2web.webp";
import launchRo from "@/assets/sponsors/launch-ro.webp";
import makeItOradea from "@/assets/sponsors/make-it-oradea.png";
import prow from "@/assets/sponsors/prow.png";
import stripe from "@/assets/sponsors/stripe.webp";
import techstars from "@/assets/sponsors/techstars.webp";
import thirdPlace from "@/assets/sponsors/third-place.png";
import v7Capital from "@/assets/sponsors/v7-capital.png";
import veridion from "@/assets/sponsors/veridion.png";
import vipRomania from "@/assets/sponsors/vip-romania.webp";
import vsfa from "@/assets/sponsors/vsfa.png";

// Image mapping
const sponsorImages: { [key: string]: string } = {
  'adobe': adobe,
  'amplifyong': amplifyong,
  'bos-romania': bosRomania,
  'brewtifi': brewtifi,
  'bright-labs': brightLabs,
  'business-club': businessClub,
  'code-cup': codeCup,
  'founder-institute': founderInstitute,
  'how2web': how2web,
  'launch-ro': launchRo,
  'make-it-oradea': makeItOradea,
  'prow': prow,
  'stripe': stripe,
  'techstars': techstars,
  'third-place': thirdPlace,
  'v7-capital': v7Capital,
  'veridion': veridion,
  'vip-romania': vipRomania,
  'vsfa': vsfa,
};

const sponsors = [
  { name: "Stripe", slug: "stripe", image: sponsorImages['stripe'] },
  { name: "Veridion", slug: "veridion", image: sponsorImages['veridion'] },
  { name: "Adobe", slug: "adobe", image: sponsorImages['adobe'] },
  { name: "Techstars", slug: "techstars", image: sponsorImages['techstars'] },
  { name: "VSFA", slug: "vsfa", image: sponsorImages['vsfa'] },
  { name: "BOS Romania", slug: "bos-romania", image: sponsorImages['bos-romania'] },
  { name: "PROW", slug: "prow", image: sponsorImages['prow'] },
  { name: "AmplifyONG", slug: "amplifyong", image: sponsorImages['amplifyong'] },
  { name: "Brewtifi", slug: "brewtifi", image: sponsorImages['brewtifi'] },
  { name: "VIP Romania", slug: "vip-romania", image: sponsorImages['vip-romania'] },
  { name: "V7 Capital", slug: "v7-capital", image: sponsorImages['v7-capital'] },
  { name: "Launch.ro", slug: "launch-ro", image: sponsorImages['launch-ro'] },
  { name: "How2Web", slug: "how2web", image: sponsorImages['how2web'] },
  { name: "Make It Oradea", slug: "make-it-oradea", image: sponsorImages['make-it-oradea'] },
  { name: "Bright Labs", slug: "bright-labs", image: sponsorImages['bright-labs'] },
  { name: "Founder Institute", slug: "founder-institute", image: sponsorImages['founder-institute'] },
  { name: "Business Club", slug: "business-club", image: sponsorImages['business-club'] },
  { name: "Third Place", slug: "third-place", image: sponsorImages['third-place'] },
  { name: "Code Cup", slug: "code-cup", image: sponsorImages['code-cup'] },
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
    
    // Infinite loop logic
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
    
    // Infinite loop logic during momentum
    const maxScroll = scrollRef.current.scrollWidth / 3;
    if (scrollRef.current.scrollLeft >= maxScroll * 2) {
      scrollRef.current.scrollLeft = maxScroll;
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft = maxScroll;
    }
    
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
                {sponsor.image ? (
                  <img 
                    src={sponsor.image} 
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground font-semibold">
                    {sponsor.name}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
