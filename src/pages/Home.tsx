import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DictionaryTooltip } from "@/components/Tooltip";
import { RocketFollower } from "@/components/RocketFollower";
import { ScrollableMentors } from "@/components/ScrollableMentors";
import { ScrollableSponsors } from "@/components/ScrollableSponsors";
import { InteractiveJuryGrid } from "@/components/InteractiveJuryGrid";
import { Lightbulb, MapPin, Calendar, Mic, Users, Hammer, Trophy } from "lucide-react";
import heroBackground from "@/assets/video_hero_2.gif";
import arrowRight from "@/assets/arrow-right.png";
import megaphoneSvg from "@/assets/megaphone.svg";
import vectorSvg from "@/assets/Vector.svg";
import linieSvg from "@/assets/linie.svg";
import cercMentoriSvg from "@/assets/cerc_mentori.svg";
import rotundSvg from "@/assets/rotund.svg";
import sageterSvg from "@/assets/sageter.svg";
import mentorsSectionPhoto from "@/assets/mentors-section-photo.webp";
import techstarsLogo from "@/assets/sponsors/techstars.webp";
import stripeLogo from "@/assets/sponsors/stripe.png";
import { AgendaPills } from "@/components/AgendaPills";

const Home = () => {
  const hoursSectionRef = useRef<HTMLElement>(null);
  const [isHoursHighlighted, setIsHoursHighlighted] = useState(false);
  const [isPolaroidHovered, setIsPolaroidHovered] = useState(false);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const mentorsHeaderRef = useRef<HTMLDivElement>(null);
  const circlePathRef = useRef<SVGPathElement>(null);
  const circlePathLength = useRef(1);
  const [circleProgress, setCircleProgress] = useState(0);

  const readyHeaderRef = useRef<HTMLSpanElement>(null);
  const readyPathRef = useRef<SVGPathElement>(null);
  const readyPathLength = useRef(1);
  const [readyProgress, setReadyProgress] = useState(0);
  const [isCtaHighlighted, setIsCtaHighlighted] = useState(false);

  // Arrows scroll animation state
  const arrowsSectionRef = useRef<HTMLDivElement>(null);
  const [arrowsProgress, setArrowsProgress] = useState(0);


  // Emoji animation state
  const ticketButtonRef = useRef<HTMLButtonElement>(null);
  const ticketButtonContainerRef = useRef<HTMLDivElement>(null);
  const [emojiProgress, setEmojiProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Confetti animation state
  const [confettiParticles, setConfettiParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      size: number;
      shape: "rect" | "circle";
    }>
  >([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const path = circlePathRef.current;
    if (path) {
      circlePathLength.current = path.getTotalLength ? path.getTotalLength() : 1;
    }

    const readyPath = readyPathRef.current;
    if (readyPath) {
      readyPathLength.current = readyPath.getTotalLength ? readyPath.getTotalLength() : 1;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewH = window.innerHeight || 1;

          if (mentorsHeaderRef.current) {
            const rect = mentorsHeaderRef.current.getBoundingClientRect();
            // progress 0 when top is at bottom of viewport, 1 when top reaches top
            const start = viewH;
            const end = 0;
            const raw = (start - rect.top) / (start - end || 1);
            const clamped = Math.min(1, Math.max(0, raw));
            setCircleProgress(clamped);
          }

          if (readyHeaderRef.current) {
            const rectReady = readyHeaderRef.current.getBoundingClientRect();
            // progress 0 when top of Ready is at bottom, 1 when it reaches top
            const startReady = viewH;
            const endReady = 0;
            const rawReady = (startReady - rectReady.top) / (startReady - endReady || 1);
            const clampedReady = Math.min(1, Math.max(0, rawReady));
            setReadyProgress(clampedReady);
          }

          if (arrowsSectionRef.current) {
            const rectArrows = arrowsSectionRef.current.getBoundingClientRect();
            const sectionHeight = arrowsSectionRef.current.offsetHeight;
            const rawArrows = (viewH - rectArrows.top) / (viewH * 0.8);
            setArrowsProgress(Math.min(1, Math.max(0, rawArrows)));
          }


          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    const hoursObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHoursHighlighted(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCtaHighlighted(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (hoursSectionRef.current) {
      hoursObserver.observe(hoursSectionRef.current);
    }

    if (ctaSectionRef.current) {
      ctaObserver.observe(ctaSectionRef.current);
    }

    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      return isMobileDevice;
    };

    const mobile = checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mobile: IntersectionObserver for scroll-based emoji animation
    // Set up in separate effect when ref is available

    // Desktop: Mouse tracking for emoji animation
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;
    if (!mobile) {
      handleMouseMove = (e: MouseEvent) => {
        if (!ticketButtonRef.current) return;

        const buttonRect = ticketButtonRef.current.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance from cursor to button center
        const distance = Math.sqrt(Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2));

        // Max distance for activation (smaller range for closer proximity)
        const maxDistance = 150;
        // Calculate progress: 1 when cursor is at button, 0 when far away
        const progress = Math.max(0, Math.min(1, 1 - distance / maxDistance));

        setEmojiProgress(progress);
      };

      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("resize", checkMobile);
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      hoursObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  // Mobile: No scroll-based emoji animation - emojis only show on button press

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
      setConfettiParticles((prev) => {
        if (prev.length === 0) {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          return prev;
        }

        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.3, // gravity
            rotation: particle.rotation + particle.rotationSpeed,
          }))
          .filter((particle) => {
            // Remove particles that are off screen or fallen too far
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

    const colors = ["#5ad1fc", "#ff6b6b", "#4ecdc4", "#ffe66d", "#a8e6cf", "#ffd93d", "#6c5ce7", "#fd79a8"];
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
        shape: Math.random() > 0.5 ? "rect" : "circle",
      });
    }

    setConfettiParticles(particles);

    // Clean up after animation
    setTimeout(() => {
      setConfettiParticles([]);
    }, 3000);
  };

  const handleButtonClick = () => {
    createConfetti();
    window.open("https://buy.stripe.com/4gMbJ1gEdaZJeHddqX1gs04", "_blank");
    if (isMobile) {
      setEmojiProgress(1);
      setTimeout(() => setEmojiProgress(0), 750);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Animated Rocket Follower */}
      <RocketFollower />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 no-pattern">
        {/* Background Image with Dark Gradient */}
        <div className="absolute inset-0">
          <img src={heroBackground} alt="Startup Weekend" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
        </div>

        {/* Gradient Blend at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex items-center justify-between gap-12">
          {/* Left Side - Title and Info */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in text-white uppercase tracking-tight">
              Startup Weekend Bucharest
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
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-white">
                <Calendar className="w-6 h-6 text-primary" />
                <span>24-26 April 2026 </span>
              </div>

              <p className="text-lg md:text-xl text-off-white/80 mt-4">
                powered by <span className="font-bold text-primary">Stripe</span>
              </p>
              <button
                onClick={handleButtonClick}
                className="rounded-2xl border-2 border-[#000000] bg-card px-6 py-3 shadow-[4px_4px_0px_0px_#000000] text-black font-semibold transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#000000] active:scale-[0.98] mt-6"
              >
                Get your ticket
              </button>
            </div>
          </div>

          {/* Right Side - Vertical Line with Arrow */}
          <div className="hidden md:flex flex-row items-center gap-4 min-w-[100px]">
            <a
              href="https://startupweekendromania.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold text-lg hover:text-primary transition-colors cursor-pointer uppercase tracking-wide"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Learn More
            </a>
            <a
              href="https://startupweekendromania.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[400px] w-1 bg-white/30 relative flex items-center justify-center cursor-pointer"
            >
              <div className="absolute left-1/2 translate-x-1 flex items-center justify-center animate-bob-horizontal">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="hover:fill-primary transition-colors"
                >
                  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* No talk. All Action! */}
      <section id="about" className="pt-20 pb-56 md:pt-28 md:pb-72 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column - Icon and Headlines */}
            <div className="flex-shrink-0 space-y-4 md:min-w-[260px]">
              {/* Megaphone Icon with Vector overlay */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto md:mx-0">
                <img src={megaphoneSvg} alt="Megaphone" className="w-full h-full" />
                <img
                  src={vectorSvg}
                  alt="X overlay"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ mixBlendMode: "normal" }}
                />
              </div>

              {/* NO TALK */}
              <div className="text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">NO TALK.</h3>
              </div>

              {/* ALL ACTION */}
              <div className="text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">ALL ACTION!</h3>
              </div>
            </div>

            {/* Right Column - All Text Sections */}
            <div className="flex-1 space-y-6">
              {/* Top Section - Startup Weekend */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Build a startup in a weekend</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Startup Weekend is the place where creatives, coders, hustlers, thinkers, and dreamers come together
                  to build real stuff in just 54 hours. Whether you have a wild idea or you just wanna join a team and
                  create something new — this weekend's for you.
                </p>
              </div>

              {/* Bottom Section */}
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Learn new <strong>skills</strong>, meet your future team and build something that matters.
                </p>
              </div>
            </div>
          </div>

          <div
            ref={arrowsSectionRef}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-40 md:mt-48"
          >
            {/* Arrow 1: Below Card 1 */}
            <div
              className="hidden md:block absolute top-[calc(50%+7rem)] w-[20%] h-[40%] pointer-events-none z-10"
              style={{ left: "5.5%" }}
            >
              <div
                style={{
                  transform: "rotate(80deg) translateX(-5%)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={sageterSvg}
                  alt="Arrow"
                  className="w-full h-full object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1352%) hue-rotate(170deg) brightness(98%) contrast(98%)",
                    maskImage: `linear-gradient(to top, black ${Math.min(1, Math.max(0, arrowsProgress * 2.5)) * 100}%, transparent ${Math.min(1, Math.max(0, arrowsProgress * 2.5)) * 100}%)`,
                    WebkitMaskImage: `linear-gradient(to top, black ${Math.min(1, Math.max(0, arrowsProgress * 2.5)) * 100}%, transparent ${Math.min(1, Math.max(0, arrowsProgress * 2.5)) * 100}%)`,
                  }}
                />
              </div>
            </div>

            {/* Arrow 2: Above Card 2 - Flipped */}
            <div
              className="hidden md:block absolute top-[calc(50%-9rem)] w-[20%] h-[40%] pointer-events-none z-10"
              style={{ left: "30%" }}
            >
              <div
                style={{
                  transform: "rotate(-80deg) scaleY(-1) translateX(+25%)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={sageterSvg}
                  alt="Arrow"
                  className="w-full h-full object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1352%) hue-rotate(170deg) brightness(98%) contrast(98%)",
                    maskImage: `linear-gradient(to bottom, black ${Math.min(1, Math.max(0, (arrowsProgress - 0.2) * 2.5)) * 100}%, transparent ${Math.min(1, Math.max(0, (arrowsProgress - 0.2) * 2.5)) * 100}%)`,
                    WebkitMaskImage: `linear-gradient(to bottom, black ${Math.min(1, Math.max(0, (arrowsProgress - 0.2) * 2.5)) * 100}%, transparent ${Math.min(1, Math.max(0, (arrowsProgress - 0.2) * 2.5)) * 100}%)`,
                  }}
                />
              </div>
            </div>

            {/* Arrow 3: Below Card 3 */}
            <div
              className="hidden md:block absolute top-[calc(50%+7rem)] w-[20%] h-[40%] pointer-events-none z-10"
              style={{ left: "57%" }}
            >
              <div
                style={{
                  transform: "rotate(80deg) translateX(-5%)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={sageterSvg}
                  alt="Arrow"
                  className="w-full h-full object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1352%) hue-rotate(170deg) brightness(98%) contrast(98%)",
                    maskImage: `linear-gradient(to top, black ${Math.min(1, Math.max(0, (arrowsProgress - 0.4) * 2.5)) * 100}%, transparent ${Math.min(1, Math.max(0, (arrowsProgress - 0.4) * 2.5)) * 100}%)`,
                    WebkitMaskImage: `linear-gradient(to top, black ${Math.min(1, Math.max(0, (arrowsProgress - 0.4) * 2.5)) * 100}%, transparent ${Math.min(1, Math.max(0, (arrowsProgress - 0.4) * 2.5)) * 100}%)`,
                  }}
                />
              </div>
            </div>

            <Card className="text-center space-y-4 md:-translate-y-24 relative z-10 w-full">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Meet & Pitch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kick things off by meeting participants, sharing ideas, and pitching your concept to the room. Anyone can pitch, and everyone gets to vote.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center space-y-4 md:translate-y-24 relative z-10 w-full">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Team Up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The top ideas form teams. Join a project that excites you, find the right mix of skills, and start building with people you just met.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center space-y-4 md:-translate-y-24 relative z-10 w-full">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Hammer className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Build & Validate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Turn your idea into something real. Build your MVP, test assumptions, talk to users, and improve fast with mentor feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center space-y-4 md:translate-y-24 relative z-10 w-full">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Demo Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Wrap up the weekend by pitching your startup to judges and the audience. Celebrate what you built and compete for prizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section ref={hoursSectionRef} className="py-20 relative no-pattern">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Header */}
            <div className="flex-shrink-0 md:w-2/5 lg:w-1/2">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">
                  <span className="relative inline-block px-2 py-1">
                    <span
                      className={`relative z-10 inline-block transition-colors duration-500 delay-200 ${
                        isHoursHighlighted ? "text-white" : ""
                      }`}
                    >
                      54 hours
                    </span>
                    <span
                      className={`absolute inset-0 bg-[#5ad1fc] rounded-sm transition-transform duration-700 ease-out ${
                        isHoursHighlighted ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{
                        transformOrigin: "left",
                        zIndex: 0,
                      }}
                    />
                  </span>{" "}
                  to build a startup
                </span>
              </h2>

              {/* Linie SVG */}
              <div className="mt-6">
                <img src={linieSvg} alt="Decorative line" className="w-full h-auto" />
              </div>
            </div>

            {/* Right Side - Content in Card Style */}
            <Card className="flex-1 md:w-3/5 lg:w-1/2 max-w-md md:ml-auto">
              <CardContent className="p-6">
                <p className="text-xl mb-4">
                  <strong>Learn how to think, work, and build like a startup in 54 thrilling hours.</strong>
                </p>
                <p className="text-lg text-muted-foreground">
                  <a
                    href="https://www.techstars.com/communities"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Techstars Startup Weekend
                  </a>{" "}
                  is an exciting and immersive foray into the world of startups. Over an action-packed three days,
                  you'll meet the very best mentors, investors, co-founders and sponsors to show you how to get more
                  done faster – and, maybe even <strong>start that business.</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentors & Speakers */}
      <section id="mentors" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
            {/* Left - Photo Card */}
            <Card className="w-full md:w-1/2 max-w-xl overflow-hidden">
              <CardContent className="p-4">
                <img
                  src={mentorsSectionPhoto}
                  alt="Mentors working with participants"
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              </CardContent>
            </Card>

            {/* Right - Header */}
            <div className="md:w-1/2 text-center md:text-left md:pl-8 lg:pl-16">
              <div
                ref={mentorsHeaderRef}
                className="relative inline-flex items-center justify-center text-center w-full max-w-lg mx-auto md:mx-0"
              >
                <svg
                  className="absolute inset-0 w-full h-full -z-10 scale-125 md:scale-150"
                  viewBox="0 0 622 197"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <mask id="mentorsCircleMask">
                      <path
                        ref={circlePathRef}
                        d="M1.45641 108.87C1.30641 130.15 13.5964 152 32.7864 164.56C49.4064 175.44 68.2864 178.96 87.7864 181.88C150.72 191.316 214.269 196.059 277.906 196.07C366.694 196.041 455.24 186.815 542.126 168.54C560.496 164.69 578.256 160.3 593.556 149.1C611.256 136.1 622.046 114.72 621.036 94.53C619.826 70.38 603.626 52.69 588.876 44.2C573.126 35.13 555.926 32.71 536.696 30.66C460.504 22.5668 383.937 18.5144 307.316 18.52H305.116C372.176 12.93 439.396 10.08 506.336 10C507.662 10 508.934 9.47322 509.872 8.53553C510.81 7.59785 511.336 6.32608 511.336 5C511.336 3.67392 510.81 2.40215 509.872 1.46447C508.934 0.526784 507.662 0 506.336 0C396.418 0.161824 286.632 7.63834 177.706 22.38C119.726 25.84 61.9231 31.6167 4.29641 39.71C2.98226 39.8956 1.79569 40.5957 0.99772 41.6563C0.199752 42.7168 -0.144243 44.0509 0.0414086 45.365C0.22706 46.6791 0.927151 47.8657 1.98767 48.6637C3.04819 49.4617 4.38226 49.8056 5.69641 49.62C22.7497 47.2067 39.8231 45 56.9164 43C48.3924 45.5586 40.2673 49.2946 32.7764 54.1C17.7564 64 1.64641 83.55 1.45641 108.87ZM88.5464 46.24C118.48 41.06 148.526 36.4267 178.686 32.34C297.711 25.2566 417.117 28.0193 535.686 40.6C553.766 42.53 569.876 44.78 583.926 52.86C599.596 61.86 610.256 78.44 611.086 95.03C611.936 111.95 602.746 130.03 587.686 141.03C573.996 151.03 557.376 155.12 540.106 158.74C453.898 176.881 366.042 186.036 277.946 186.06C214.795 186.059 151.731 181.36 89.2764 172C70.9164 169.25 53.1964 166 38.2764 156.2C21.8464 145.45 11.3264 126.91 11.4564 109C11.5964 91.33 22.1164 73.1 38.2664 62.5C53.8564 52.25 73.0964 48.92 88.5464 46.24Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={circlePathLength.current}
                        strokeDashoffset={circlePathLength.current * (1 - circleProgress)}
                        style={{ transition: "stroke-dashoffset 0s linear" }}
                      />
                    </mask>
                  </defs>
                  <path
                    d="M1.45641 108.87C1.30641 130.15 13.5964 152 32.7864 164.56C49.4064 175.44 68.2864 178.96 87.7864 181.88C150.72 191.316 214.269 196.059 277.906 196.07C366.694 196.041 455.24 186.815 542.126 168.54C560.496 164.69 578.256 160.3 593.556 149.1C611.256 136.1 622.046 114.72 621.036 94.53C619.826 70.38 603.626 52.69 588.876 44.2C573.126 35.13 555.926 32.71 536.696 30.66C460.504 22.5668 383.937 18.5144 307.316 18.52H305.116C372.176 12.93 439.396 10.08 506.336 10C507.662 10 508.934 9.47322 509.872 8.53553C510.81 7.59785 511.336 6.32608 511.336 5C511.336 3.67392 510.81 2.40215 509.872 1.46447C508.934 0.526784 507.662 0 506.336 0C396.418 0.161824 286.632 7.63834 177.706 22.38C119.726 25.84 61.9231 31.6167 4.29641 39.71C2.98226 39.8956 1.79569 40.5957 0.99772 41.6563C0.199752 42.7168 -0.144243 44.0509 0.0414086 45.365C0.22706 46.6791 0.927151 47.8657 1.98767 48.6637C3.04819 49.4617 4.38226 49.8056 5.69641 49.62C22.7497 47.2067 39.8231 45 56.9164 43C48.3924 45.5586 40.2673 49.2946 32.7764 54.1C17.7564 64 1.64641 83.55 1.45641 108.87ZM88.5464 46.24C118.48 41.06 148.526 36.4267 178.686 32.34C297.711 25.2566 417.117 28.0193 535.686 40.6C553.766 42.53 569.876 44.78 583.926 52.86C599.596 61.86 610.256 78.44 611.086 95.03C611.936 111.95 602.746 130.03 587.686 141.03C573.996 151.03 557.376 155.12 540.106 158.74C453.898 176.881 366.042 186.036 277.946 186.06C214.795 186.059 151.731 181.36 89.2764 172C70.9164 169.25 53.1964 166 38.2764 156.2C21.8464 145.45 11.3264 126.91 11.4564 109C11.5964 91.33 22.1164 73.1 38.2664 62.5C53.8564 52.25 73.0964 48.92 88.5464 46.24Z"
                    fill="#27A8E0"
                    mask="url(#mentorsCircleMask)"
                    style={{ transition: "none" }}
                  />
                </svg>
                <h2 className="relative text-4xl md:text-5xl font-bold leading-tight">
                  <span className="block">Speakers &</span>
                  <span className="block">Mentors</span>
                </h2>
              </div>

              {/* Centered text below header */}
              <div className="text-center w-full max-w-lg mx-auto md:mx-0 mt-6">
                <p className="text-lg text-muted-foreground">Previous editions speakers and mentors </p>
              </div>
            </div>
          </div>

          <ScrollableMentors />

          {/* <InteractiveJuryGrid /> */}
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-20 relative no-pattern">
        <div className="container mx-auto px-4">
          <AgendaPills />
        </div>
      </section>

      {/* Sponsors & Partners */}
      <section id="partners" className="py-20 relative">
        <div className="container mx-auto px-4">

          {/* Powered by */}
          <div className="text-center mb-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10">Powered by</p>
            <div className="flex items-center justify-center gap-16 md:gap-24">
              <img src={stripeLogo} alt="Stripe" className="h-20 md:h-28 w-auto object-contain" />
              <img src={techstarsLogo} alt="Techstars" className="h-20 md:h-28 w-auto object-contain" />
            </div>
          </div>

          {/* Supported by */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Supported by</p>
          </div>

          <ScrollableSponsors />

        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaSectionRef}
        className="pt-20 pb-32 md:pb-40 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 no-pattern"
      >
        <div className="absolute inset-0 opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Left: CTA content */}
          <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span ref={readyHeaderRef} className="relative inline-flex items-center justify-center">
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                viewBox="0 0 729.24 328.43"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "150%", height: "auto" }}
              >
                <defs>
                  <mask id="readyMask">
                    <path
                      ref={readyPathRef}
                      d="M470.08,314.64q17.35-.18,34.61-.76,40.71-1.41,80.5-5.1c6.76-.63,6.2-6.41,4.9-9.21-1.14-2.42-5.36-8.77-12.22-8.14q-12.68,1.19-25.47,2.11,14.86-4.65,29.07-9.75c38.76-13.93,73.68-30.94,100-51.46,26.52-20.66,43.15-45,46.92-70.87,3.91-26.76-5.88-55.26-32.17-80.22C674.47,60.58,642,43.07,603.93,30.48S524.14,9.79,481.58,5.15A896.4,896.4,0,0,0,350.76.67c-46,1.77-91.2,6.46-133.49,14.57s-81.66,19.4-114.62,34.89c-31.82,15-57,33.34-72,54.81q-2.48,3.56-4.57,7.22c-.57-2.68-1.12-5.35-1.63-8C21.83,90.41,20,76.69,18.48,63A12.73,12.73,0,0,0,8,52.68C.72,51.38-.23,57,0,59.4,3,86,7.1,112.6,15.84,139.14a82,82,0,0,0-.07,31.39c4.36,22.79,18,46,42.88,66.09a208.61,208.61,0,0,0,44.4,27.07c8.89,4.07,18.35,7.77,28.18,11.14a369.32,369.32,0,0,0,33.48,17.25C201.88,308.92,246.22,321.35,293,326c53.69,5.35,106.76,1.32,155.59-7.28Q459.41,316.81,470.08,314.64Zm238.1-188.22a.31.31,0,0,1,0-.08A.19.19,0,0,0,708.18,126.42Zm.18.61c.27.87.14.48,0,0Zm-58-60.59ZM51.23,112c.8-1,1.61-2,2.46-3q3-3.5,6.47-6.88A145,145,0,0,1,75.85,89q4.61-3.39,9.59-6.61c1.66-1.08,3.34-2.14,5.06-3.18l1-.62.23-.13,3-1.73Q105.5,70.54,117.57,65a402.76,402.76,0,0,1,52.48-19.29C207.73,34.61,248.6,27.28,292.3,22.68A948.85,948.85,0,0,1,421.39,17.8c21.65.69,40.7,2,62.22,4.31,20.7,2.24,41.26,5.29,61.32,9.3,9.91,2,19.7,4.18,29.3,6.64q7.23,1.85,14.3,3.9c2.14.61,4.25,1.25,6.36,1.89l.13,0,1.64.52,3.73,1.2A318.71,318.71,0,0,1,649.61,66c.38.2.76.4,1.13.61L653,67.91c1.87,1.06,3.72,2.13,5.52,3.22q5.13,3.09,9.86,6.35c3.23,2.22,6.26,4.49,9.22,6.8l.53.44,2.1,1.77q2.4,2.07,4.64,4.18t4.21,4.17c.59.61,1.17,1.22,1.74,1.84s3.29,3.32,1.09,1.16a54.27,54.27,0,0,1,6.62,8.63q1.49,2.19,2.82,4.38l.89,1.53.61,1.16a79.74,79.74,0,0,1,4.06,9.21c.47,1.29.89,2.58,1.3,3.87.07.28.16.57.23.85.22.85.42,1.7.6,2.54a70.45,70.45,0,0,1,1.42,9.35c.12,1.42.19,2.84.23,4.25v.27c0,.1,0,.24,0,.44,0,.85,0,1.7-.08,2.55a74,74,0,0,1-1,9,77.13,77.13,0,0,1-2.23,9.21c0,.09-.11.35-.17.56s-.11.3-.13.36c-.22.65-.45,1.29-.69,1.93q-.89,2.34-1.9,4.65a97.15,97.15,0,0,1-9.91,17.27c-.91,1.29-1.87,2.56-2.85,3.83-.22.26-1,1.18-1.09,1.34l-1.7,2q-3.55,4.11-7.63,8.06a182.15,182.15,0,0,1-18,15.3q-4.83,3.6-10,7.06-2.6,1.72-5.27,3.42l-2.7,1.68-1,.63-.89.54c-7.44,4.45-15.35,8.69-23.59,12.73-33.33,16.36-72.17,29.51-113.19,40.38-14.32,3.8-29,7.32-44.1,10.46q-24.76.26-49.69-.32a1465.93,1465.93,0,0,1-164.87-13.11c-39.39-5.41-78.79-12.65-113.53-24.32q-7.73-4.62-14.9-9.46-5.37-3.61-10.41-7.36c-1.69-1.24-3.34-2.5-5-3.76-.82-.64-1.63-1.27-2.43-1.91l-.21-.16-1-.8q-9.55-7.82-17.79-16-4-4-7.74-8.09c-.61-.68-1.22-1.35-1.82-2-.31-.34-.6-.68-.9-1a1.59,1.59,0,0,0-.49-.4c-.3-.41-.56-.85-.83-1.17-.68-.82-1.36-1.65-2-2.47a213.84,213.84,0,0,1-14.74-20.66q-1.5-2.37-2.89-4.75c-.5-.84-1-1.69-1.48-2.54a7,7,0,0,0-.54-.95l.31.38a6.69,6.69,0,0,1-.45-.64q-2.79-5.1-5.23-10.23a224.36,224.36,0,0,1-8.73-21L35,144.1c.06-.23.1-.46.16-.68.31-1.27.66-2.54,1.05-3.8,0-.2.11-.39.18-.59.23-.68.47-1.37.72-2.05q1.38-3.75,3.14-7.44A94.58,94.58,0,0,1,49,114.9l1.3-1.75ZM36.5,138.67a2.57,2.57,0,0,1-.09.28A2.29,2.29,0,0,0,36.5,138.67Zm-.16.5Zm16.23,71.46,0,.05ZM55,213.28c-.54-.58-1.08-1.17-1.61-1.76l-.49-.58c-1-1.15-1.91-2.3-2.81-3.46q-2.8-3.63-5.2-7.32c-.79-1.23-1.56-2.47-2.28-3.72a1.59,1.59,0,0,1-.13-.22c-.34-.65-.71-1.3-1-1.94-1-1.89-1.83-3.78-2.65-5.67a223.77,223.77,0,0,0,26.69,34.75c-1.2-1-2.38-2.08-3.52-3.13Q58.23,216.81,55,213.28Zm232.51,95.41a416.35,416.35,0,0,1-63.84-11.83q12.48,2,25.07,3.78c27.76,3.85,55.8,6.87,83.88,9.12q8.16.66,16.33,1.22A470,470,0,0,1,287.47,308.69Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="28"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={readyPathLength.current}
                      strokeDashoffset={readyPathLength.current * (1 - readyProgress)}
                      style={{ transition: "stroke-dashoffset 0s linear" }}
                    />
                  </mask>
                </defs>
                <path
                  d="M470.08,314.64q17.35-.18,34.61-.76,40.71-1.41,80.5-5.1c6.76-.63,6.2-6.41,4.9-9.21-1.14-2.42-5.36-8.77-12.22-8.14q-12.68,1.19-25.47,2.11,14.86-4.65,29.07-9.75c38.76-13.93,73.68-30.94,100-51.46,26.52-20.66,43.15-45,46.92-70.87,3.91-26.76-5.88-55.26-32.17-80.22C674.47,60.58,642,43.07,603.93,30.48S524.14,9.79,481.58,5.15A896.4,896.4,0,0,0,350.76.67c-46,1.77-91.2,6.46-133.49,14.57s-81.66,19.4-114.62,34.89c-31.82,15-57,33.34-72,54.81q-2.48,3.56-4.57,7.22c-.57-2.68-1.12-5.35-1.63-8C21.83,90.41,20,76.69,18.48,63A12.73,12.73,0,0,0,8,52.68C.72,51.38-.23,57,0,59.4,3,86,7.1,112.6,15.84,139.14a82,82,0,0,0-.07,31.39c4.36,22.79,18,46,42.88,66.09a208.61,208.61,0,0,0,44.4,27.07c8.89,4.07,18.35,7.77,28.18,11.14a369.32,369.32,0,0,0,33.48,17.25C201.88,308.92,246.22,321.35,293,326c53.69,5.35,106.76,1.32,155.59-7.28Q459.41,316.81,470.08,314.64Zm238.1-188.22a.31.31,0,0,1,0-.08A.19.19,0,0,0,708.18,126.42Zm.18.61c.27.87.14.48,0,0Zm-58-60.59ZM51.23,112c.8-1,1.61-2,2.46-3q3-3.5,6.47-6.88A145,145,0,0,1,75.85,89q4.61-3.39,9.59-6.61c1.66-1.08,3.34-2.14,5.06-3.18l1-.62.23-.13,3-1.73Q105.5,70.54,117.57,65a402.76,402.76,0,0,1,52.48-19.29C207.73,34.61,248.6,27.28,292.3,22.68A948.85,948.85,0,0,1,421.39,17.8c21.65.69,40.7,2,62.22,4.31,20.7,2.24,41.26,5.29,61.32,9.3,9.91,2,19.7,4.18,29.3,6.64q7.23,1.85,14.3,3.9c2.14.61,4.25,1.25,6.36,1.89l.13,0,1.64.52,3.73,1.2A318.71,318.71,0,0,1,649.61,66c.38.2.76.4,1.13.61L653,67.91c1.87,1.06,3.72,2.13,5.52,3.22q5.13,3.09,9.86,6.35c3.23,2.22,6.26,4.49,9.22,6.8l.53.44,2.1,1.77q2.4,2.07,4.64,4.18t4.21,4.17c.59.61,1.17,1.22,1.74,1.84s3.29,3.32,1.09,1.16a54.27,54.27,0,0,1,6.62,8.63q1.49,2.19,2.82,4.38l.89,1.53.61,1.16a79.74,79.74,0,0,1,4.06,9.21c.47,1.29.89,2.58,1.3,3.87.07.28.16.57.23.85.22.85.42,1.7.6,2.54a70.45,70.45,0,0,1,1.42,9.35c.12,1.42.19,2.84.23,4.25v.27c0,.1,0,.24,0,.44,0,.85,0,1.7-.08,2.55a74,74,0,0,1-1,9,77.13,77.13,0,0,1-2.23,9.21c0,.09-.11.35-.17.56s-.11.3-.13.36c-.22.65-.45,1.29-.69,1.93q-.89,2.34-1.9,4.65a97.15,97.15,0,0,1-9.91,17.27c-.91,1.29-1.87,2.56-2.85,3.83-.22.26-1,1.18-1.09,1.34l-1.7,2q-3.55,4.11-7.63,8.06a182.15,182.15,0,0,1-18,15.3q-4.83,3.6-10,7.06-2.6,1.72-5.27,3.42l-2.7,1.68-1,.63-.89.54c-7.44,4.45-15.35,8.69-23.59,12.73-33.33,16.36-72.17,29.51-113.19,40.38-14.32,3.8-29,7.32-44.1,10.46q-24.76.26-49.69-.32a1465.93,1465.93,0,0,1-164.87-13.11c-39.39-5.41-78.79-12.65-113.53-24.32q-7.73-4.62-14.9-9.46-5.37-3.61-10.41-7.36c-1.69-1.24-3.34-2.5-5-3.76-.82-.64-1.63-1.27-2.43-1.91l-.21-.16-1-.8q-9.55-7.82-17.79-16-4-4-7.74-8.09c-.61-.68-1.22-1.35-1.82-2-.31-.34-.6-.68-.9-1a1.59,1.59,0,0,0-.49-.4c-.3-.41-.56-.85-.83-1.17-.68-.82-1.36-1.65-2-2.47a213.84,213.84,0,0,1-14.74-20.66q-1.5-2.37-2.89-4.75c-.5-.84-1-1.69-1.48-2.54a7,7,0,0,0-.54-.95l.31.38a6.69,6.69,0,0,1-.45-.64q-2.79-5.1-5.23-10.23a224.36,224.36,0,0,1-8.73-21L35,144.1c.06-.23.1-.46.16-.68.31-1.27.66-2.54,1.05-3.8,0-.2.11-.39.18-.59.23-.68.47-1.37.72-2.05q1.38-3.75,3.14-7.44A94.58,94.58,0,0,1,49,114.9l1.3-1.75ZM36.5,138.67a2.57,2.57,0,0,1-.09.28A2.29,2.29,0,0,0,36.5,138.67Zm-.16.5Zm16.23,71.46,0,.05ZM55,213.28c-.54-.58-1.08-1.17-1.61-1.76l-.49-.58c-1-1.15-1.91-2.3-2.81-3.46q-2.8-3.63-5.2-7.32c-.79-1.23-1.56-2.47-2.28-3.72a1.59,1.59,0,0,1-.13-.22c-.34-.65-.71-1.3-1-1.94-1-1.89-1.83-3.78-2.65-5.67a223.77,223.77,0,0,0,26.69,34.75c-1.2-1-2.38-2.08-3.52-3.13Q58.23,216.81,55,213.28Zm232.51,95.41a416.35,416.35,0,0,1-63.84-11.83q12.48,2,25.07,3.78c27.76,3.85,55.8,6.87,83.88,9.12q8.16.66,16.33,1.22A470,470,0,0,1,287.47,308.69Z"
                  fill="#5ad1fc"
                  mask="url(#readyMask)"
                  style={{ transition: "none" }}
                />
              </svg>
              <span className="relative z-10">Ready</span>
            </span>{" "}
            to build<br />something{" "}
            <span className="relative inline-block pl-3 pr-2 py-1">
              <span
                className={`relative z-10 inline-block transition-colors duration-500 delay-200 ${
                  isCtaHighlighted ? "text-white" : ""
                }`}
              >
                great?
              </span>
              <span
                className={`absolute top-1 left-0 right-0 bottom-0 bg-[#5ad1fc] rounded-sm transition-transform duration-700 ease-out ${
                  isCtaHighlighted ? "scale-x-100" : "scale-x-0"
                }`}
                style={{
                  transformOrigin: "left",
                  zIndex: 0,
                }}
              />
            </span>
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl lg:mx-0 mx-auto">
            Join us for 54 hours of intense building, learning, and networking.<br />
            Limited spots available!
          </p>
          <div ref={ticketButtonContainerRef} className="relative pb-24 md:pb-32">
            <button
              ref={ticketButtonRef}
              onClick={handleButtonClick}
              className="rounded-2xl border-2 border-[#000000] bg-primary px-6 py-3 shadow-[4px_4px_0px_0px_#000000] text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#000000] active:scale-[0.98] relative z-10"
            >
              Get your ticket
            </button>

            {/* Confetti particles */}
            {confettiParticles.length > 0 && (
              <div className="fixed inset-0 pointer-events-none z-50">
                {confettiParticles.map((particle) => (
                  <div
                    key={particle.id}
                    style={{
                      position: "absolute",
                      left: `${particle.x}px`,
                      top: `${particle.y}px`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      backgroundColor: particle.color,
                      borderRadius: particle.shape === "circle" ? "50%" : "2px",
                      transform: `rotate(${particle.rotation}deg)`,
                      pointerEvents: "none",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Animated party emojis - positioned below the button */}
            <div
              className="absolute left-0 lg:left-[100px] pointer-events-none z-0"
              style={{
                top: `calc(100% + ${isMobile ? 60 : 20}px - ${emojiProgress * (isMobile ? 100 : 120)}px)`, // More space on mobile to avoid intersection
                transition: isMobile ? "top 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none", // Smooth transition on mobile
              }}
            >
              {/* Left emoji */}
              <span
                className="absolute text-6xl md:text-7xl"
                style={{
                  left: "-80px",
                  transform: `translateX(${-emojiProgress * 15}px) scale(${0.5 + emojiProgress * 0.5})`,
                  opacity: emojiProgress * 0.9,
                  transition: isMobile ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none", // Smooth transition on mobile
                }}
              >
                🎉
              </span>

              {/* Right emoji (mirrored) */}
              <span
                className="absolute text-6xl md:text-7xl"
                style={{
                  right: "-80px",
                  transform: `translateX(${emojiProgress * 15}px) scaleX(-1) scale(${0.5 + emojiProgress * 0.5})`,
                  opacity: emojiProgress * 0.9,
                  transition: isMobile ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none", // Smooth transition on mobile
                }}
              >
                🎉
              </span>
            </div>
          </div>
          </div>

          {/* Right: Polaroid Stack */}
          <div className="flex justify-center lg:justify-end lg:-mt-16">
            <div
              className="relative w-[280px] h-[340px] md:w-[340px] md:h-[420px] cursor-default"
              onMouseEnter={() => setIsPolaroidHovered(true)}
              onMouseLeave={() => setIsPolaroidHovered(false)}
            >
              {/* Left background polaroid */}
              <div
                className={`absolute inset-0 bg-white rounded-sm border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] p-2 pb-10 transition-all duration-500 ease-out ${
                  isPolaroidHovered
                    ? "opacity-100 -translate-x-16 md:-translate-x-24 -rotate-12 scale-95"
                    : "opacity-0 translate-x-0 rotate-0 scale-100"
                }`}
                style={{ zIndex: 1 }}
              >
                <img
                  src="/2025/may/Copy_of_Copy_of_DSC_0170.jpg"
                  alt="Startup Weekend 2025"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Right background polaroid */}
              <div
                className={`absolute inset-0 bg-white rounded-sm border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] p-2 pb-10 transition-all duration-500 ease-out ${
                  isPolaroidHovered
                    ? "opacity-100 translate-x-16 md:translate-x-24 rotate-12 scale-95"
                    : "opacity-0 translate-x-0 rotate-0 scale-100"
                }`}
                style={{ zIndex: 1 }}
              >
                <img
                  src="/2024/Copy_of_DSC00127.jpg"
                  alt="Startup Weekend 2024"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Main front polaroid with video */}
              <div
                className={`absolute inset-0 bg-white rounded-sm border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] p-2 pb-10 transition-all duration-500 ease-out ${
                  isPolaroidHovered ? "-translate-y-2" : ""
                }`}
                style={{ zIndex: 2 }}
              >
                <div className="w-full h-full rounded-sm overflow-hidden pointer-events-none relative">
                  <iframe
                    src="https://www.youtube.com/embed/Z_2TuPZcxQU?autoplay=1&mute=1&loop=1&playlist=Z_2TuPZcxQU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
                    allow="autoplay; encrypted-media"
                    className="w-full h-full rounded-sm border-0 scale-[1.2]"
                    title="Event highlight"
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
