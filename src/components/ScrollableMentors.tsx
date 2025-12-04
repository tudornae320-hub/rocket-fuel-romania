import { useRef, useState, MouseEvent, useCallback, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const mentors = [
  { name: "Nicolae Gudumac", role: "Founder & CTO", company: "Planable", bio: "Building the collaboration platform for marketing teams." },
  { name: "Bogdan Iordache", role: "GP", company: "Underline VC", bio: "Investing in ambitious founders across Europe." },
  { name: "Anca Bercă", role: "Product Manager", company: "Bitdefender", bio: "Crafting security products that protect millions." },
  { name: "Alex Gavril", role: "CEO", company: "▲ promocrat", bio: "Helping brands grow through innovative marketing." },
  { name: "Alex Dascalu", role: "Lead Director", company: "Founder Institute CEE", bio: "Empowering entrepreneurs across Central and Eastern Europe." },
  { name: "Alexandru Anghel", role: "Co-founder", company: "Solo", bio: "Building tools for the future of work." },
  { name: "Anca Marcu", role: "CFO", company: "AMSIMCEL", bio: "Strategic financial leadership for growth companies." },
  { name: "AnaMaria Onică", role: "CEO", company: "VOXivers", bio: "Revolutionizing voice technology solutions." },
  { name: "Auras Tanase", role: "Growth Marketeer", company: "Veridion", bio: "Driving sustainable growth through data-driven strategies." },
  { name: "Ioana Serban", role: "Fractional CMO", company: "TechMarketers", bio: "Scaling tech companies through strategic marketing." },
  { name: "Tudor Petracovici", role: "Full Stack Engineer", company: "Veridion", bio: "Building scalable systems and mentoring developers." },
  { name: "Alex Nicoară", role: "Co-founder", company: "Soulmag.ai", bio: "Creating AI-powered content experiences." },
  { name: "Daniel Deaconu", role: "Founder", company: "The Simplifier", bio: "Making complex things simple for businesses." },
];

const HOVER_ENTER_DELAY = 80; // ms before hover animation starts
const HOVER_EXIT_DELAY = 160; // ms before hover animation ends

export const ScrollableMentors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [pendingHoverKey, setPendingHoverKey] = useState<string | null>(null);
  const [isStopped, setIsStopped] = useState(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRef = useRef<number>();
  const hoverEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverExitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slowDownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle smooth scroll pause when hovering
  useEffect(() => {
    if (hoveredKey) {
      // Pause after a short delay for smoother transition
      slowDownTimeoutRef.current = setTimeout(() => {
        setIsStopped(true);
      }, 300);
    } else {
      // Clear any pending stop
      if (slowDownTimeoutRef.current) {
        clearTimeout(slowDownTimeoutRef.current);
      }
      // Resume
      setIsStopped(false);
    }
    
    return () => {
      if (slowDownTimeoutRef.current) {
        clearTimeout(slowDownTimeoutRef.current);
      }
    };
  }, [hoveredKey]);

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
    // Clear any pending hover enter
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
      hoverEnterTimeoutRef.current = null;
    }
    setPendingHoverKey(null);
    
    // Delayed hover exit
    hoverExitTimeoutRef.current = setTimeout(() => {
      setHoveredKey(null);
    }, HOVER_EXIT_DELAY);
  };

  const handleCardMouseEnter = useCallback((cardKey: string) => {
    // Clear any pending exit timeout - we're still in a card
    if (hoverExitTimeoutRef.current) {
      clearTimeout(hoverExitTimeoutRef.current);
      hoverExitTimeoutRef.current = null;
    }
    
    // If already hovering a card, switch immediately to avoid jumpiness
    if (hoveredKey !== null) {
      // Clear any pending enter timeout
      if (hoverEnterTimeoutRef.current) {
        clearTimeout(hoverEnterTimeoutRef.current);
        hoverEnterTimeoutRef.current = null;
      }
      setPendingHoverKey(cardKey);
      setHoveredKey(cardKey);
      return;
    }
    
    // Clear any existing enter timeout
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
    }
    
    setPendingHoverKey(cardKey);
    
    // Delayed hover enter only for first card
    hoverEnterTimeoutRef.current = setTimeout(() => {
      setHoveredKey(cardKey);
    }, HOVER_ENTER_DELAY);
  }, [hoveredKey]);

  const handleCardMouseLeave = useCallback((cardKey: string) => {
    // Only process if this is the currently hovered or pending card
    if (hoveredKey !== cardKey && pendingHoverKey !== cardKey) {
      return;
    }
    
    // Clear any pending enter timeout
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
      hoverEnterTimeoutRef.current = null;
    }
    
    if (pendingHoverKey === cardKey) {
      setPendingHoverKey(null);
    }
    
    // Delayed hover exit - give time to move to another card
    if (hoverExitTimeoutRef.current) {
      clearTimeout(hoverExitTimeoutRef.current);
    }
    hoverExitTimeoutRef.current = setTimeout(() => {
      // Only clear if still on the same card (not moved to a new one)
      setHoveredKey((current) => current === cardKey ? null : current);
    }, HOVER_EXIT_DELAY);
  }, [hoveredKey, pendingHoverKey]);

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
        <div 
          className="flex gap-6 items-start animate-scroll-left"
          style={{ 
            width: 'max-content',
            animationPlayState: isStopped ? 'paused' : 'running',
          }}
        >
          {/* Duplicate the array 3 times for truly seamless infinite loop */}
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-6 shrink-0 items-start">
              {mentors.map((mentor, index) => {
                const cardKey = `${groupIndex}-${index}`;
                const isHovered = hoveredKey === cardKey;
                const isOtherHovered = hoveredKey !== null && hoveredKey !== cardKey;

                return (
                  <Card 
                    key={cardKey} 
                    onMouseEnter={() => handleCardMouseEnter(cardKey)}
                    onMouseLeave={() => handleCardMouseLeave(cardKey)}
                    className={`
                      shrink-0 w-[220px] rounded-2xl border-2 overflow-hidden bg-card border-border
                      transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                      ${isHovered ? 'scale-110 shadow-xl z-20 border-primary mx-8 my-12' : 'mx-0 my-0'}
                      ${isOtherHovered ? 'scale-90 opacity-70' : 'scale-100 opacity-100'}
                    `}
                    style={{
                      transitionProperty: 'transform, opacity, margin, box-shadow, border-color',
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Photo placeholder */}
                      <div className="relative w-full h-[180px] overflow-hidden">
                        <div className="w-full h-full bg-muted" />
                        {isHovered && (
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-fade-in" />
                        )}
                      </div>
                      {/* Name and company */}
                      <div className="p-4 border-t border-border">
                        <h3 className="font-bold text-base text-foreground">{mentor.name}</h3>
                        <p className="text-sm text-secondary font-medium">{mentor.company}</p>
                        
                        {/* Expandable content on hover only */}
                        <div 
                          className="overflow-hidden"
                          style={{
                            maxHeight: isHovered ? '128px' : '0px',
                            opacity: isHovered ? 1 : 0,
                            marginTop: isHovered ? '8px' : '0px',
                            transition: 'max-height 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms ease-out, margin-top 500ms ease-out',
                          }}
                        >
                          <p className="text-sm text-muted-foreground mb-1">{mentor.role}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {mentor.bio}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
