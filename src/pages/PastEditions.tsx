import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SquiggleDoodle, ArrowDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";
import heroBackground from "@/assets/video_hero_2.gif";

// 2024 images for polaroids
import img2024_1 from "@/assets/2024/Copy of DSC00002.jpg";
import img2024_2 from "@/assets/2024/Copy of DSC00003.jpg";
import img2024_3 from "@/assets/2024/Copy of DSC00015.jpg";
import img2024_4 from "@/assets/2024/Copy of DSC00030.jpg";
import img2024_5 from "@/assets/2024/Copy of DSC00037.jpg";
import img2024_6 from "@/assets/2024/Copy of DSC00127.jpg";
import img2024_7 from "@/assets/2024/Copy of DSC00133.jpg";
import img2024_8 from "@/assets/2024/Copy of DSC00136.jpg";

const allImages2024 = [img2024_1, img2024_2, img2024_3, img2024_4, img2024_5, img2024_6, img2024_7, img2024_8];

// Shuffle array utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PastEditions = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Random images state for 2024 section
  const [hoverImages2024, setHoverImages2024] = useState(() => shuffleArray(allImages2024).slice(0, 2));
  const [mainImage2024, setMainImage2024] = useState(() => allImages2024[Math.floor(Math.random() * allImages2024.length)]);
  const [is2024Visible, setIs2024Visible] = useState(true);
  const polaroid2024SectionRef = useRef<HTMLDivElement>(null);
  
  // Track visibility of 2024 section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIs2024Visible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (polaroid2024SectionRef.current) {
      observer.observe(polaroid2024SectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  
  // Shuffle hover images when hovering on 2024
  const handle2024HoverStart = useCallback(() => {
    setHoverImages2024(shuffleArray(allImages2024).slice(0, 2));
    setHoveredIndex(1);
  }, []);
  
  // Shuffle main polaroid only when section is not visible
  useEffect(() => {
    if (!is2024Visible) {
      const interval = setInterval(() => {
        setMainImage2024(allImages2024[Math.floor(Math.random() * allImages2024.length)]);
        setHoverImages2024(shuffleArray(allImages2024).slice(0, 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [is2024Visible]);
  
  // Ticket button animation state
  const ticketButtonRef = useRef<HTMLButtonElement>(null);
  const ticketButtonContainerRef = useRef<HTMLDivElement>(null);
  const [emojiProgress, setEmojiProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Confetti animation state
  const [confettiParticles, setConfettiParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    size: number;
    shape: 'rect' | 'circle';
  }>>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      return isMobileDevice;
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile: Track button distance from center of screen for smooth emoji animation
  useEffect(() => {
    if (!isMobile || !ticketButtonRef.current) return;

    let ticking = false;
    const calculateProgress = () => {
      if (!ticketButtonRef.current) return;
      
      const buttonRect = ticketButtonRef.current.getBoundingClientRect();
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      const distance = Math.abs(buttonCenterY - viewportCenterY);
      const maxDistance = 300;
      const rawProgress = Math.max(0, Math.min(1, 1 - distance / maxDistance));
      const progress = rawProgress < 1 ? 1 - Math.pow(1 - rawProgress, 3) : rawProgress;
      
      setEmojiProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  // Desktop: Mouse tracking for emoji animation
  useEffect(() => {
    if (isMobile || !ticketButtonRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticketButtonRef.current) return;
      
      const buttonRect = ticketButtonRef.current.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
      );
      
      const maxDistance = 200;
      const progress = Math.max(0, Math.min(1, 1 - distance / maxDistance));
      setEmojiProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Confetti animation effect
  useEffect(() => {
    if (confettiParticles.length === 0) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const animate = () => {
      setConfettiParticles(prev => {
        if (prev.length === 0) {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          return prev;
        }
        
        const updated = prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.3,
          rotation: particle.rotation + particle.rotationSpeed,
        })).filter(particle => {
          return particle.y < window.innerHeight + 200 && particle.x > -100 && particle.x < window.innerWidth + 100;
        });
        
        if (updated.length > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          animationFrameRef.current = null;
        }
        
        return updated;
      });
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [confettiParticles.length]);

  // Confetti creation function
  const createConfetti = () => {
    if (!ticketButtonRef.current) return;
    
    const buttonRect = ticketButtonRef.current.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    
    const colors = ['#5ad1fc', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ffd93d', '#6c5ce7', '#fd79a8'];
    const particleCount = 60;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.6;
      const speed = 4 + Math.random() * 6;
      particles.push({
        id: Date.now() + i,
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 10,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }
    
    setConfettiParticles(particles);
    
    setTimeout(() => {
      setConfettiParticles([]);
    }, 3000);
  };

  const handleButtonClick = () => {
    createConfetti();
  };
  return (
    <div className="min-h-screen">
      {/* Animated Rocket Follower */}
      <RocketFollower />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 no-pattern">
        {/* Background Image with Dark Gradient */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="Startup Weekend" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
        </div>
        
        {/* Gradient Blend at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex items-center justify-between gap-12">
          {/* Left Side - Title and Info */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in text-white uppercase tracking-tight">
              Past <br/>
              Editions
            </h1>
            
            {/* Z-shaped Line */}
            <div className="mb-6 w-[320px] md:w-[400px] lg:w-[480px]">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 857.78 120.97"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <style>{`.cls-1{fill:#5ad1fc;}`}</style>
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="objects">
                    <path 
                      className="cls-1 animate-draw-path" 
                      d="M546.94,2.11q-91.62,2.84-183.06,9.51L198,14.56l-182,3.23c-5.87.1-15,4.4-15.85,10.92C-.91,35.89,8,37.09,13,37l118.29-2.09Q106.64,38,82.07,41.44c-5.68.78-13.61,3.44-15.43,9.66-1.62,5.54,3.44,9.47,8.81,9.56l273.19,4.69,58.14,1Q365,70.93,323.3,76.89,258,86.24,193.27,99c-4.66.91-11.27,5-12,10.22-.68,5,4.82,8.27,9.24,8.31l310.69,2.71,87.58.77c6.69,0,15.27-1.86,18.64-8.42,3-5.88-2.63-10.78-8.38-10.83L300,99.11l8.33-1.26q56.51-8.37,113.35-14.18,113.7-11.61,228.13-12.9L660,70.7l115.85,2c6.68.12,15.28-1.88,18.63-8.41,3.08-6-2.68-10.6-8.37-10.83q-59.12-2.37-118.31-2L512.88,48.75,239.69,44.07l-22-.38q71.52-7.61,143.26-12.85L660,25.54l182-3.23c5.57-.1,13.75-3.92,15.42-9.66S854,3.28,848.65,3.08Q697.87-2.54,546.94,2.11Z"
                      stroke="hsl(196, 96%, 67%)"
                      strokeWidth="2"
                      fill="hsl(196, 96%, 67%)"
                      strokeDasharray="2000"
                      strokeDashoffset="2000"
                      style={{ 
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Past Editions Grid */}
      <section className="container mx-auto px-4 mb-20 pt-16">
        {/* Top Row - Two Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div 
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
              <div 
                className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0 
                    ? 'opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Right tilted polaroid */}
              <div 
                className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0 
                    ? 'opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Main polaroid - raises on hover */}
              <Link 
                to="/past-editions/2025"
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out cursor-pointer ${
                  hoveredIndex === 0 
                    ? 'translate-y-[-40px] z-30' 
                    : 'translate-y-0 z-10'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <div className="bg-gray-200 aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </Link>
            </div>
            <Card className="hover-lift w-full max-w-md mx-auto mt-[120px] md:mt-[140px]">
              <CardContent className="p-6">
                <p className="text-center font-bold text-black text-2xl">
                  2025
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div ref={polaroid2024SectionRef} className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div 
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
              onMouseEnter={handle2024HoverStart}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
              <div 
                className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1 
                    ? 'opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <img src={hoverImages2024[0]} alt="2024 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Right tilted polaroid */}
              <div 
                className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1 
                    ? 'opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10' 
                    : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <img src={hoverImages2024[1]} alt="2024 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </div>
              
              {/* Main polaroid - raises on hover */}
              <Link 
                to="/past-editions/2024"
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out cursor-pointer ${
                  hoveredIndex === 1 
                    ? 'translate-y-[-40px] z-30' 
                    : 'translate-y-0 z-10'
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <img src={mainImage2024} alt="2024 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </Link>
            </div>
            <Card className="hover-lift w-full max-w-md mx-auto mt-[120px] md:mt-[140px]">
              <CardContent className="p-6">
                <p className="text-center font-bold text-black text-2xl">
                  2024
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row - One Card */}
        <div className="flex flex-col items-center max-w-md mx-auto">
          {/* Polaroid group with hover animation */}
          <div 
            className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Left tilted polaroid */}
            <div 
              className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                hoveredIndex === 2 
                  ? 'opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10' 
                  : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
              }`}
            >
              <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                <div className="h-8 bg-white"></div>
              </div>
            </div>
            
            {/* Right tilted polaroid */}
            <div 
              className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                hoveredIndex === 2 
                  ? 'opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10' 
                  : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
              }`}
            >
              <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                <div className="h-8 bg-white"></div>
              </div>
            </div>
            
            {/* Main polaroid - raises on hover */}
            <Link 
              to="/past-editions/2023"
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out cursor-pointer ${
                hoveredIndex === 2 
                  ? 'translate-y-[-40px] z-30' 
                  : 'translate-y-0 z-10'
              }`}
            >
              <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                <div className="h-8 bg-white"></div>
              </div>
            </Link>
          </div>
          <Card className="hover-lift w-full mt-[120px] md:mt-[140px]">
            <CardContent className="p-6">
              <p className="text-center font-bold text-black text-2xl">
                2023
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <ArrowDoodle className="top-10 left-10 opacity-20" />
        <ArrowDoodle className="bottom-10 right-10 opacity-20 rotate-180" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fii parte din următoarea ediție!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Alătură-te comunității noastre și construiește viitorul startup-urilor din România
          </p>
          <div ref={ticketButtonContainerRef} className="relative pb-24 md:pb-32">
            <button 
              ref={ticketButtonRef}
              onClick={handleButtonClick}
              className="rounded-2xl border-2 border-[#000000] bg-card px-6 py-3 shadow-[4px_4px_0px_0px_#000000] text-primary hover:text-primary/80 hover:bg-primary/10 font-semibold transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#000000] active:scale-[0.98] relative z-10"
            >
              Get your ticket now
            </button>
            
            {/* Confetti particles */}
            {confettiParticles.length > 0 && (
              <div className="fixed inset-0 pointer-events-none z-50">
                {confettiParticles.map(particle => (
                  <div
                    key={particle.id}
                    style={{
                      position: 'absolute',
                      left: `${particle.x}px`,
                      top: `${particle.y}px`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      backgroundColor: particle.color,
                      borderRadius: particle.shape === 'circle' ? '50%' : '2px',
                      transform: `rotate(${particle.rotation}deg)`,
                      pointerEvents: 'none',
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Animated party emojis - positioned below the button */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0"
              style={{
                top: `calc(100% + ${isMobile ? 60 : 20}px - ${emojiProgress * (isMobile ? 100 : 120)}px)`,
                transition: isMobile ? 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              }}
            >
              {/* Left emoji */}
              <span
                className="absolute text-6xl md:text-7xl"
                style={{
                  left: '-80px',
                  transform: `translateX(${-emojiProgress * 15}px) scale(${0.5 + emojiProgress * 0.5})`,
                  opacity: emojiProgress * 0.9,
                  transition: isMobile ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                }}
              >
                🎉
              </span>
              
              {/* Right emoji (mirrored) */}
              <span
                className="absolute text-6xl md:text-7xl"
                style={{
                  right: '-80px',
                  transform: `translateX(${emojiProgress * 15}px) scaleX(-1) scale(${0.5 + emojiProgress * 0.5})`,
                  opacity: emojiProgress * 0.9,
                  transition: isMobile ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                }}
              >
                🎉
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastEditions;
