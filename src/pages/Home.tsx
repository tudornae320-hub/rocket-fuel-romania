import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DictionaryTooltip } from "@/components/Tooltip";
import { ArrowDoodle, CircleDoodle, StarDoodle, SquiggleDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { ScrollableMentors } from "@/components/ScrollableMentors";
import { ScrollableSponsors } from "@/components/ScrollableSponsors";
import { InteractiveJuryGrid } from "@/components/InteractiveJuryGrid";
import { Lightbulb, MapPin, Calendar, Coffee, Presentation, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import arrowRight from "@/assets/arrow-right.png";
import megaphoneSvg from "@/assets/megaphone.svg";
import vectorSvg from "@/assets/Vector.svg";
import linieSvg from "@/assets/linie.svg";
import cercMentoriSvg from "@/assets/cerc_mentori.svg";
import rotundSvg from "@/assets/rotund.svg";
import { AgendaPills } from "@/components/AgendaPills";

const Home = () => {
  const hoursSectionRef = useRef<HTMLElement>(null);
  const [isHoursHighlighted, setIsHoursHighlighted] = useState(false);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const mentorsHeaderRef = useRef<HTMLDivElement>(null);
  const circlePathRef = useRef<SVGPathElement>(null);
  const circlePathLength = useRef(1);
  const [circleProgress, setCircleProgress] = useState(0);
  const [isCtaHighlighted, setIsCtaHighlighted] = useState(false);

  useEffect(() => {
    const path = circlePathRef.current;
    if (path) {
      circlePathLength.current = path.getTotalLength ? path.getTotalLength() : 1;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!mentorsHeaderRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = mentorsHeaderRef.current!.getBoundingClientRect();
          const viewH = window.innerHeight || 1;
          // progress 0 when top is at bottom of viewport, 1 when top reaches top
          const start = viewH;
          const end = 0;
          const raw = (start - rect.top) / (start - end || 1);
          const clamped = Math.min(1, Math.max(0, raw));
          setCircleProgress(clamped);
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
      { threshold: 0.3 }
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCtaHighlighted(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (hoursSectionRef.current) {
      hoursObserver.observe(hoursSectionRef.current);
    }

    if (ctaSectionRef.current) {
      ctaObserver.observe(ctaSectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      hoursObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Animated Rocket Follower */}
      <RocketFollower />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 no-pattern">
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
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-white">
                <Calendar className="w-6 h-6 text-primary" />
                <span>10-12 October</span>
              </div>
              <div className="flex items-center gap-3 text-lg md:text-xl text-off-white/90">
                <MapPin className="w-5 h-5 text-primary" />
                <a href="https://maps.app.goo.gl/DWoupMfrzjf1dEh1A" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Builders House
                </a>
              </div>
              <p className="text-lg md:text-xl text-off-white/80 mt-4">
                powered by <span className="font-bold text-primary">Stripe</span>
              </p>
            </div>
          </div>
          
          {/* Right Side - Vertical Line with Arrow */}
          <div className="hidden md:flex flex-row items-center gap-4 min-w-[100px]">
            <a 
              href="#about" 
              className="text-white font-semibold text-lg hover:text-primary transition-colors cursor-pointer uppercase tracking-wide"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Learn More
            </a>
            <div className="h-[400px] w-1 bg-white/30 relative flex items-center justify-center">
              <div className="absolute left-1/2 translate-x-1 flex items-center justify-center animate-bob-horizontal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No talk. All Action! */}
      <section id="about" className="py-20 relative pb-32">
        <SquiggleDoodle className="top-10 right-20 opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Icon and Headlines */}
            <div className="flex-shrink-0 space-y-6">
              {/* Megaphone Icon with Vector overlay */}
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <img src={megaphoneSvg} alt="Megaphone" className="w-full h-full" />
                <img 
                  src={vectorSvg} 
                  alt="X overlay" 
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ mixBlendMode: 'normal' }}
                />
              </div>
              
              {/* NO TALK */}
              <div>
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                  NO TALK.
                </h3>
              </div>

              {/* ALL ACTION */}
              <div>
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
                  ALL ACTION!
                </h3>
              </div>
            </div>

            {/* Middle Column - All Text Sections */}
            <div className="flex-1 space-y-8">
              {/* Top Section - Startup Weekend */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Startup Weekend
                </h2>
                <p className="text-lg text-muted-foreground">
                  is a 54-hour event where developers, designers, marketers, and idea people come together to launch something real. Pitch on Friday, <strong>build all weekend</strong>, and demo your startup on Sunday.
                </p>
              </div>

              {/* Middle Section */}
              <div>
                <p className="text-lg text-muted-foreground">
                  Whether you have an <strong>idea</strong> or just want to <strong>join a team</strong>, you're welcome.
                </p>
              </div>

              {/* Bottom Section */}
              <div>
                <p className="text-lg text-muted-foreground">
                  Learn new <strong>skills</strong>. Meet your future team. Build something that matters.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Arrow 1: Below Card 1, facing Card 2 */}
            <svg
              className="absolute left-[12.5%] top-[calc(50%+8rem)] w-[25%] h-[40%] pointer-events-none z-0"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path
                d="M 50 50 C 100 80, 150 100, 200 120 C 250 140, 300 150, 350 180"
                stroke="#5ad1fc"
                strokeOpacity="0.9"
                strokeWidth="3"
                fill="none"
                strokeDasharray="16 32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Arrow 2: Above Card 2, facing Card 3 */}
            <svg
              className="absolute left-[37.5%] top-[calc(50%-8rem)] w-[25%] h-[40%] pointer-events-none z-0"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path
                d="M 50 250 C 100 220, 150 200, 200 180 C 250 160, 300 150, 350 120"
                stroke="#5ad1fc"
                strokeOpacity="0.9"
                strokeWidth="3"
                fill="none"
                strokeDasharray="16 32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Arrow 3: Below Card 3, facing Card 4 */}
            <svg
              className="absolute left-[62.5%] top-[calc(50%+8rem)] w-[25%] h-[40%] pointer-events-none z-0"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path
                d="M 50 50 C 100 80, 150 100, 200 120 C 250 140, 300 150, 350 180"
                stroke="#5ad1fc"
                strokeOpacity="0.9"
                strokeWidth="3"
                fill="none"
                strokeDasharray="16 32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Card className="text-center space-y-4 -translate-y-24 relative z-10">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Workshops & Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get feedback on your business idea, from launch strategy to pricing models and pitching skills from our Mentors and Experts during dedicated mentorship hours!
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center space-y-4 translate-y-24 relative z-10">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Presentation className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Pitch your concept</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have an idea for a startup, you can pitch it on Friday, and convince your peers to join the ride! Don't worry if you don't have an idea, you can join any of the ideas pitched!
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center space-y-4 -translate-y-24 relative z-10">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Build & win</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  During the weekend you will validate your idea, build an MVP, define the business model, train your pitch and present in front of our expert jury to win awesome prizes!
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center space-y-4 translate-y-24 relative z-10">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Fuel the journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We make sure that you have unlimited coffee, 7 meals, snacks and other goodies during the weekend, so you have the energy to build something great!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 54 Hours to Build */}
      <section ref={hoursSectionRef} className="py-20 relative no-pattern">
        <CircleDoodle className="top-20 left-10 opacity-20" />
        <StarDoodle className="bottom-20 right-10 opacity-20" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Header */}
            <div className="flex-shrink-0 md:w-2/5 lg:w-1/2">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">
                  <span className="relative inline-block px-2 py-1">
                    <span className={`relative z-10 inline-block transition-colors duration-500 delay-200 ${
                      isHoursHighlighted ? 'text-white' : ''
                    }`}>
                      54 hours
                    </span>
                    <span 
                      className={`absolute inset-0 bg-[#5ad1fc] rounded-sm transition-transform duration-700 ease-out ${
                        isHoursHighlighted ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      style={{ 
                        transformOrigin: 'left',
                        zIndex: 0
                      }}
                    />
                  </span>
                  {' '}to build a startup
                </span>
              </h2>
              
              {/* Linie SVG */}
              <div className="mt-6">
                <img 
                  src={linieSvg} 
                  alt="Decorative line" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Side - Content in Card Style */}
            <Card className="flex-1 md:w-3/5 lg:w-1/2 max-w-md md:ml-auto">
              <CardContent className="p-6">
                <p className="text-xl mb-4">
                  <strong>Learn how to think, work, and build like a startup in 54 thrilling hours.</strong>
                </p>
                <p className="text-lg text-muted-foreground">
                  <a href="https://www.techstars.com/communities" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Techstars Startup Weekend</a> is an exciting and immersive foray into the world of startups. 
                  Over an action-packed three days, you'll meet the very best mentors, investors, co-founders and sponsors 
                  to show you how to get more done faster – and, maybe even <strong>start that business.</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentors & Speakers */}
      <section id="mentors" className="py-20 relative">
        <ArrowDoodle className="top-10 left-20 opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
            {/* Left - Photo Card */}
            <Card className="w-full md:w-1/2 max-w-xl">
              <CardContent className="p-4">
                <div className="aspect-[4/3] w-full rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-muted-foreground">
                  Photo coming soon
                </div>
              </CardContent>
            </Card>

            {/* Right - Header & Copy */}
            <div className="md:w-1/2 text-center md:text-left space-y-4 md:pl-8 lg:pl-16">
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
              <p className="text-lg text-muted-foreground">
                Learn from the best in the industry
              </p>
            </div>
          </div>
          
          <ScrollableMentors />

          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-8">Jury</h3>
          </div>
          
          <InteractiveJuryGrid />
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-20 relative no-pattern">
        <SquiggleDoodle className="bottom-10 left-20 opacity-20" />
        
        <div className="container mx-auto px-4">
          <AgendaPills />
        </div>
      </section>

      {/* Sponsors & Partners */}
      <section id="partners" className="py-20 relative">
        <CircleDoodle className="top-10 right-20 opacity-20" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sponsors & Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              Supported by the best
            </p>
          </div>
          
          <ScrollableSponsors />
          
          <div className="text-center mt-12">
            <button className="rounded-2xl border-2 border-[#000000] bg-card px-6 py-3 shadow-[4px_4px_0px_0px_#000000] text-primary hover:text-primary/80 hover:bg-primary/10 font-semibold transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#000000] active:scale-[0.98]">
              Get involved!
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 no-pattern">
        <div className="absolute inset-0 opacity-10" />
        <ArrowDoodle className="top-10 left-20 animate-float" />
        <ArrowDoodle className="bottom-10 right-20 animate-float" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative inline-block">
              <img 
                src={rotundSvg} 
                alt="Decorative element" 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                style={{ height: '250%', width: 'auto', minWidth: '120%' }}
              />
              <span className="relative z-10">Ready</span>
            </span>
            {' '}to build something{' '}
            <span className="relative inline-block pl-3 pr-2 py-1">
              <span className={`relative z-10 inline-block transition-colors duration-500 delay-200 ${
                isCtaHighlighted ? 'text-white' : ''
              }`}>
                great?
              </span>
              <span 
                className={`absolute top-1 left-0 right-0 bottom-0 bg-[#5ad1fc] rounded-sm transition-transform duration-700 ease-out ${
                  isCtaHighlighted ? 'scale-x-100' : 'scale-x-0'
                }`}
                style={{ 
                  transformOrigin: 'left',
                  zIndex: 0
                }}
              />
            </span>
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Join us for 54 hours of intense building, learning, and networking. Limited spots available!
          </p>
          <button className="rounded-2xl border-2 border-[#000000] bg-card px-6 py-3 shadow-[4px_4px_0px_0px_#000000] text-primary hover:text-primary/80 hover:bg-primary/10 font-semibold transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#000000] active:scale-[0.98]">
            Get your ticket now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
