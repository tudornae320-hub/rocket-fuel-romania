import { useRef, useState, MouseEvent, useCallback, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Linkedin } from "lucide-react";

import raresBanescu from "@/assets/mentors/rares-banescu.jpg";
import gianinaCraciun from "@/assets/mentors/gianina-craciun.jpg";
import valentinMaior from "@/assets/mentors/valentin-maior.jpg";
import cosminCosma from "@/assets/mentors/cosmin-cosma.jpg";
import raduCudalb from "@/assets/mentors/radu-cudalb.jpg";
import oanaCosman from "@/assets/mentors/oana-cosman.jpg";
import bogdanDeac from "@/assets/mentors/bogdan-deac.jpg";
import claudiuJojatu from "@/assets/mentors/claudiu-jojatu.jpg";
import mihneaCraciun from "@/assets/mentors/mihnea-craciun.jpg";
import lianaStoian from "@/assets/mentors/liana-stoian.jpg";
import peterStoica from "@/assets/mentors/peter-stoica.jpg";
import cosminBolocan from "@/assets/mentors/cosmin-bolocan.jpg";
import stefanDumitru from "@/assets/mentors/stefan-dumitru.jpg";

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
    name: "Rareș Bănescu",
    role: "Founder",
    company: "theMarketer",
    image: raresBanescu,
    linkedin: "https://www.linkedin.com/in/rares-banescu/",
  },
  {
    name: "Gianina Craciun",
    role: "Founder",
    company: "Supertree",
    image: gianinaCraciun,
    linkedin: "https://www.linkedin.com/in/gianinacraciun/",
    objectPosition: "center top",
  },
  {
    name: "Valentin Maior",
    role: "Cofounder",
    company: "SyndiFi Capital",
    image: valentinMaior,
    linkedin: "https://www.linkedin.com/in/valentinmaior/",
  },
  {
    name: "Cosmin Cosma",
    role: "Cofounder & CEO",
    company: "Finqware",
    image: cosminCosma,
    linkedin: "https://www.linkedin.com/in/ccosma/",
  },
  {
    name: "Radu Cudalb",
    role: "Software Engineer",
    company: "Veridion",
    image: raduCudalb,
    linkedin: "https://www.linkedin.com/in/radu-cudalb/",
    objectPosition: "center 20%",
  },
  {
    name: "Oana Cosman",
    role: "Startups & Investments Journalist",
    company: "",
    image: oanaCosman,
    linkedin: "https://www.linkedin.com/in/oanacosman/",
  },
  {
    name: "Bogdan Deac",
    role: "Software Engineer",
    company: "Stripe",
    image: bogdanDeac,
    linkedin: "https://www.linkedin.com/in/bogdantdeac/",
  },
  {
    name: "Claudiu Jojatu",
    role: "Cofounder",
    company: "Milk & Cookies",
    image: claudiuJojatu,
    linkedin: "https://www.linkedin.com/in/claudiujojatu/",
  },
  {
    name: "Mihnea Craciun",
    role: "Managing Director",
    company: "Endeavor Romania",
    image: mihneaCraciun,
    linkedin: "https://www.linkedin.com/in/mihnea-craciun-7038053/",
  },
  {
    name: "Liana Stoian",
    role: "CEO",
    company: "QA DNA",
    image: lianaStoian,
    linkedin: "https://www.linkedin.com/in/liana-st/",
    objectPosition: "center 20%",
  },
  {
    name: "Peter Stoica",
    role: "CTO",
    company: "QA DNA",
    image: peterStoica,
    linkedin: "https://www.linkedin.com/in/peter-stoica/",
  },
  {
    name: "Cosmin Bolocan",
    role: "Co-founder",
    company: "Brewtifi",
    image: cosminBolocan,
    linkedin: "https://www.linkedin.com/in/petre-cosmin-vlad-bolocan/",
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
        <div className="relative w-full h-[180px] overflow-hidden">
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
              <h3 className="font-bold text-base text-foreground truncate">{mentor.name}</h3>
              {mentor.company && <p className="text-sm text-secondary font-medium truncate">{mentor.company}</p>}
              <p className="text-sm text-muted-foreground truncate">{mentor.role}</p>
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
        <button
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
        </button>
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
                <div className="relative w-full h-[180px] overflow-hidden">
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
                      <h3 className="font-bold text-base text-foreground truncate">{mentor.name}</h3>
                      {mentor.company && <p className="text-sm text-secondary font-medium truncate">{mentor.company}</p>}
                      <p className="text-sm text-muted-foreground truncate">{mentor.role}</p>
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
