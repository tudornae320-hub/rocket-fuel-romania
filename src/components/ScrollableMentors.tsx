import { useRef, useState, MouseEvent, useCallback, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Linkedin } from "lucide-react";

import andreiFredy from "@/assets/mentors/andrei-fredy-craciun.jpg.asset.json";
import davidWebster from "@/assets/mentors/david-webster.jpg.asset.json";
import antonioHus from "@/assets/mentors/antonio-hus.jpg.asset.json";
import cosminPosteuca from "@/assets/mentors/cosmin-posteuca.jpg.asset.json";
import bogdanDeac from "@/assets/mentors/bogdan-deac-oct26.jpg.asset.json";
import cristianGeorge from "@/assets/mentors/cristian-george-farauanu.jpg.asset.json";
import ionutMunteanu from "@/assets/mentors/ionut-radu-munteanu.jpg.asset.json";
import constantinPestrea from "@/assets/mentors/constantin-daniel-pestrea.jpg.asset.json";
import stelianaMoraru from "@/assets/mentors/steliana-moraru.jpg.asset.json";
import adinaSaniuta from "@/assets/mentors/adina-saniuta.jpg.asset.json";
import ancaPopan from "@/assets/mentors/anca-popan.jpg.asset.json";
import cristiDragan from "@/assets/mentors/cristi-dragan.jpg.asset.json";
import { Button } from "@/components/ui/button";

type Mentor = {
  name: string;
  role: string;
  company: string;
  image: string;
  linkedin: string;
  objectPosition?: string;
};

const mentors: Mentor[] = [
  {
    name: "Andrei-Fredy Craciun",
    role: "Co-Founder",
    company: "Estera AI",
    image: andreiFredy.url,
    linkedin: "https://www.linkedin.com/in/fredyandrei/",
    objectPosition: "center top",
  },
  {
    name: "David Webster",
    role: "Founder",
    company: "UK/Romania Business",
    image: davidWebster.url,
    linkedin: "https://www.linkedin.com/in/david-w-2b98742/",
    objectPosition: "center top",
  },
  {
    name: "Antonio Hus",
    role: "Software Engineer",
    company: "Stripe",
    image: antonioHus.url,
    linkedin: "https://www.linkedin.com/in/antonio-hus",
    objectPosition: "center top",
  },
  {
    name: "Cosmin Posteuca",
    role: "Big Data Engineer",
    company: "Veridion",
    image: cosminPosteuca.url,
    linkedin: "https://www.linkedin.com/in/cosminposteuca",
    objectPosition: "center top",
  },
  {
    name: "Bogdan Deac",
    role: "Software Engineer",
    company: "Stripe",
    image: bogdanDeac.url,
    linkedin: "https://www.linkedin.com/in/bogdantdeac/",
    objectPosition: "center top",
  },
  {
    name: "Cristian-George Farauanu",
    role: "Business Development",
    company: "Featherless.ai",
    image: cristianGeorge.url,
    linkedin: "https://www.linkedin.com/in/george-farauanu/",
    objectPosition: "center top",
  },
  {
    name: "Ionuț Radu Munteanu",
    role: "Founder",
    company: "Pan Development Ltd",
    image: ionutMunteanu.url,
    linkedin: "https://www.linkedin.com/in/imunteanu/",
    objectPosition: "center top",
  },
  {
    name: "Constantin-Daniel Pestrea",
    role: "Associate Lecturer",
    company: "ASE Bucharest",
    image: constantinPestrea.url,
    linkedin: "https://www.linkedin.com/in/constantin-daniel-pestrea-b34a27214/",
    objectPosition: "center top",
  },
  {
    name: "Steliana Moraru",
    role: "CEO",
    company: "Vettoria",
    image: stelianaMoraru.url,
    linkedin: "https://www.linkedin.com/in/stelianamoraru/",
    objectPosition: "center top",
  },
  {
    name: "Adina Saniuta",
    role: "Doctor în Marketing și Lector Universitar",
    company: "SNSPA",
    image: adinaSaniuta.url,
    linkedin: "https://www.linkedin.com/in/adina-saniuta/",
    objectPosition: "center top",
  },
  {
    name: "Anca Popan",
    role: "Associate",
    company: "Lexters",
    image: ancaPopan.url,
    linkedin: "https://www.linkedin.com/in/anca-popan/",
    objectPosition: "center top",
  },
  {
    name: "Cristi Dragan",
    role: "Growth Marketing Manager",
    company: "Weekend",
    image: cristiDragan.url,
    linkedin: "https://www.linkedin.com/in/cristi-dragan",
    objectPosition: "center top",
  },
];

const HOVER_ENTER_DELAY = 80;
const HOVER_EXIT_DELAY = 160;

export const ScrollableMentors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [pendingHoverKey, setPendingHoverKey] = useState<string | null>(null);
  const [isStopped, setIsStopped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInCarousel, setIsInCarousel] = useState(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRef = useRef<number>();
  const hoverEnterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverExitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slowDownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hoveredKey) {
      slowDownTimeoutRef.current = setTimeout(() => {
        setIsStopped(true);
      }, 300);
    } else {
      if (slowDownTimeoutRef.current) {
        clearTimeout(slowDownTimeoutRef.current);
      }
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
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
      hoverEnterTimeoutRef.current = null;
    }
    setPendingHoverKey(null);

    hoverExitTimeoutRef.current = setTimeout(() => {
      setHoveredKey(null);
    }, HOVER_EXIT_DELAY);
  };

  const handleCardMouseEnter = useCallback((cardKey: string) => {
    if (hoverExitTimeoutRef.current) {
      clearTimeout(hoverExitTimeoutRef.current);
      hoverExitTimeoutRef.current = null;
    }

    if (hoveredKey !== null) {
      if (hoverEnterTimeoutRef.current) {
        clearTimeout(hoverEnterTimeoutRef.current);
        hoverEnterTimeoutRef.current = null;
      }
      setPendingHoverKey(cardKey);
      setHoveredKey(cardKey);
      return;
    }

    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
    }

    setPendingHoverKey(cardKey);

    hoverEnterTimeoutRef.current = setTimeout(() => {
      setHoveredKey(cardKey);
    }, HOVER_ENTER_DELAY);
  }, [hoveredKey]);

  const handleCardMouseLeave = useCallback((cardKey: string) => {
    if (hoveredKey !== cardKey && pendingHoverKey !== cardKey) {
      return;
    }

    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
      hoverEnterTimeoutRef.current = null;
    }

    if (pendingHoverKey === cardKey) {
      setPendingHoverKey(null);
    }

    if (hoverExitTimeoutRef.current) {
      clearTimeout(hoverExitTimeoutRef.current);
    }
    hoverExitTimeoutRef.current = setTimeout(() => {
      setHoveredKey((current) => current === cardKey ? null : current);
    }, HOVER_EXIT_DELAY);
  }, [hoveredKey, pendingHoverKey]);

  const renderMentorCard = (mentor: typeof mentors[0], cardKey: string, isHovered: boolean, isOtherHovered: boolean) => (
    <Card
      key={cardKey}
      onMouseEnter={() => handleCardMouseEnter(cardKey)}
      onMouseLeave={() => handleCardMouseLeave(cardKey)}
      className={`
        shrink-0 w-[220px] overflow-hidden
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isHovered ? 'scale-110 shadow-xl z-20 !border-primary mx-8 my-12' : 'mx-0 my-0'}
        ${isOtherHovered ? 'scale-90 opacity-70' : 'scale-100 opacity-100'}
      `}
      style={{ transitionProperty: 'transform, opacity, margin, box-shadow, border-color' }}
    >
      <CardContent className="p-0">
        <div className="relative w-full h-[240px] overflow-hidden">
          {mentor.image ? (
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: mentor.objectPosition ?? 'center' }}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
        <div className="p-4 border-t border-[#000000]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-base text-foreground break-words">{mentor.name}</h3>
              {mentor.company && <p className="text-sm text-secondary font-medium break-words">{mentor.company}</p>}
              <p className="text-sm text-muted-foreground break-words">{mentor.role}</p>
            </div>
            {mentor.linkedin && (
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${mentor.name} on LinkedIn`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative">
      <div className="flex flex-col items-center mb-8">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-2xl border-2 border-[#000000] bg-card px-6 py-3 shadow-[4px_4px_0px_0px_#000000] flex items-center gap-2 text-secondary hover:text-secondary/80 hover:bg-primary/10 font-semibold transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#000000] active:scale-[0.98]"
        >
          {isExpanded ? (
            <>
              Show Less
              <ChevronUp className="w-5 h-5" />
            </>
          ) : (
            <>
              View All Mentors
              <ChevronDown className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>

      {!isExpanded && (
        <div
          className="relative"
          style={{ minHeight: isInCarousel && hoveredKey ? '320px' : '240px', transition: isInCarousel ? 'min-height 700ms ease-out' : 'min-height 0ms' }}
          onMouseEnter={() => setIsInCarousel(true)}
          onMouseLeave={() => setIsInCarousel(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="overflow-hidden mb-8 cursor-grab active:cursor-grabbing select-none py-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div
              className="flex gap-6 items-start animate-scroll-left"
              style={{
                width: 'max-content',
                animationPlayState: isStopped ? 'paused' : 'running',
              }}
            >
              {[...Array(3)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex gap-6 shrink-0 items-start">
                  {mentors.map((mentor, index) => {
                    const cardKey = `${groupIndex}-${index}`;
                    const isHovered = hoveredKey === cardKey;
                    const isOtherHovered = hoveredKey !== null && hoveredKey !== cardKey;
                    return renderMentorCard(mentor, cardKey, isHovered, isOtherHovered);
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 animate-fade-in max-w-4xl mx-auto">
          {mentors.map((mentor, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:!border-primary hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative w-full h-[240px] overflow-hidden">
                  {mentor.image ? (
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: mentor.objectPosition ?? 'center' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div className="p-4 border-t border-[#000000]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-base text-foreground break-words">{mentor.name}</h3>
                      {mentor.company && <p className="text-sm text-secondary font-medium break-words">{mentor.company}</p>}
                      <p className="text-sm text-muted-foreground break-words">{mentor.role}</p>
                    </div>
                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${mentor.name} on LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
