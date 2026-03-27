import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SquiggleDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";
import heroBackground from "@/assets/video_hero_2.gif";
import gif2025_may from "@/2025_may_movie2.gif";
import gif2025_oct from "@/2025_oct_movi.gif";
import gif2023 from "@/2023_movie.gif";

const tvGifs = [heroBackground, gif2025_may, gif2025_oct, gif2023];

// 2025 May images for polaroids
const allImages2025May = [
  "/2025/may/Copy_of_Copy_of_DSC_0028.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0049.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0066.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0104.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0134.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0170.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0248.jpg",
  "/2025/may/Copy_of_Copy_of_DSC_0277.jpg",
];

// 2025 October images for polaroids
const allImages2025Oct = [
  "/2025/october/IMG_3362.jpg",
  "/2025/october/IMG_3553.jpg",
  "/2025/october/IMG_3735.jpg",
  "/2025/october/IMG_3957.jpg",
  "/2025/october/IMG_4251.jpg",
  "/2025/october/IMG_4478.jpg",
  "/2025/october/IMG_4600.jpg",
  "/2025/october/IMG_4746.jpg",
];

const allImages2025 = [...allImages2025May, ...allImages2025Oct];

// 2024 images for polaroids
const allImages2024 = [
  "/2024/Copy_of_DSC00002.jpg",
  "/2024/Copy_of_DSC00003.jpg",
  "/2024/Copy_of_DSC00015.jpg",
  "/2024/Copy_of_DSC00030.jpg",
  "/2024/Copy_of_DSC00037.jpg",
  "/2024/Copy_of_DSC00127.jpg",
  "/2024/Copy_of_DSC00133.jpg",
  "/2024/Copy_of_DSC00136.jpg",
];

// 2023 images for polaroids
const allImages2023 = [
  "/2023/Copy_of_03fb9a56-800a-439b-97aa-fc2285bc6f57.jpg",
  "/2023/Copy_of_0e4dd94b-b81a-4f68-95e6-4f866dc76079.jpg",
  "/2023/Copy_of_20230319_154001.jpg",
  "/2023/Copy_of_20230319_193424.jpg",
  "/2023/Copy_of_2e38732f-eea7-4375-8a66-649a201cdffb.jpg",
  "/2023/Copy_of_3eafa8d1-3cf9-4d7f-a53f-f0e7e836b83d.jpg",
  "/2023/Copy_of_4d634022-33a2-4fb6-b9a8-31e7c7b229e1.jpg",
  "/2023/Copy_of_59e6570e-2113-4564-8dff-4fc1fc547e9b.jpg",
];

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
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isStatic, setIsStatic] = useState(false);
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const staticAnimRef = useRef<number | null>(null);

  const drawStatic = useCallback(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    staticAnimRef.current = requestAnimationFrame(drawStatic);
  }, []);

  useEffect(() => {
    if (isStatic) {
      drawStatic();
    } else {
      if (staticAnimRef.current) {
        cancelAnimationFrame(staticAnimRef.current);
        staticAnimRef.current = null;
      }
    }
    return () => {
      if (staticAnimRef.current) {
        cancelAnimationFrame(staticAnimRef.current);
        staticAnimRef.current = null;
      }
    };
  }, [isStatic, drawStatic]);

  const switchChannel = () => {
    if (isStatic) return;
    setIsStatic(true);
    setTimeout(() => {
      setCurrentGifIndex((prev) => (prev + 1) % tvGifs.length);
    }, 400);
    setTimeout(() => {
      setIsStatic(false);
    }, 700);
  };
  
  // Random images state for 2025 section (both May and October)
  const [hoverImages2025, setHoverImages2025] = useState(() => shuffleArray(allImages2025).slice(0, 2));
  const [mainImage2025, setMainImage2025] = useState(() => allImages2025[Math.floor(Math.random() * allImages2025.length)]);
  const [is2025Visible, setIs2025Visible] = useState(true);
  const polaroid2025SectionRef = useRef<HTMLDivElement>(null);

  // Random images state for 2024 section
  const [hoverImages2024, setHoverImages2024] = useState(() => shuffleArray(allImages2024).slice(0, 2));
  const [mainImage2024, setMainImage2024] = useState(() => allImages2024[Math.floor(Math.random() * allImages2024.length)]);
  const [is2024Visible, setIs2024Visible] = useState(true);
  const polaroid2024SectionRef = useRef<HTMLDivElement>(null);
  
  // Random images state for 2023 section
  const [hoverImages2023, setHoverImages2023] = useState(() => shuffleArray(allImages2023).slice(0, 2));
  const [mainImage2023, setMainImage2023] = useState(() => allImages2023[Math.floor(Math.random() * allImages2023.length)]);
  const [is2023Visible, setIs2023Visible] = useState(true);
  const polaroid2023SectionRef = useRef<HTMLDivElement>(null);
  
  // Track visibility of 2025 section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIs2025Visible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (polaroid2025SectionRef.current) {
      observer.observe(polaroid2025SectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

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
  
  // Track visibility of 2023 section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIs2023Visible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (polaroid2023SectionRef.current) {
      observer.observe(polaroid2023SectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  
  // Shuffle hover images when hovering on 2025
  const handle2025HoverStart = useCallback(() => {
    setHoverImages2025(shuffleArray(allImages2025).slice(0, 2));
    setHoveredIndex(0);
  }, []);

  // Shuffle hover images when hovering on 2024
  const handle2024HoverStart = useCallback(() => {
    setHoverImages2024(shuffleArray(allImages2024).slice(0, 2));
    setHoveredIndex(1);
  }, []);
  
  // Shuffle hover images when hovering on 2023
  const handle2023HoverStart = useCallback(() => {
    setHoverImages2023(shuffleArray(allImages2023).slice(0, 2));
    setHoveredIndex(2);
  }, []);
  
  // Shuffle main 2025 polaroid only when section is not visible
  useEffect(() => {
    if (!is2025Visible) {
      const interval = setInterval(() => {
        setMainImage2025(allImages2025[Math.floor(Math.random() * allImages2025.length)]);
        setHoverImages2025(shuffleArray(allImages2025).slice(0, 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [is2025Visible]);

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
  
  // Shuffle main 2023 polaroid only when section is not visible
  useEffect(() => {
    if (!is2023Visible) {
      const interval = setInterval(() => {
        setMainImage2023(allImages2023[Math.floor(Math.random() * allImages2023.length)]);
        setHoverImages2023(shuffleArray(allImages2023).slice(0, 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [is2023Visible]);
  
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

  // Mobile: No scroll-based emoji animation - emojis only show on button press

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
    window.open("https://buy.stripe.com/4gMbJ1gEdaZJeHddqX1gs04", "_blank");
    if (isMobile) {
      setEmojiProgress(1);
      setTimeout(() => setEmojiProgress(0), 750);
    }
  };
  return (
    <div className="min-h-screen">
      {/* Animated Rocket Follower */}
      <RocketFollower />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24 md:pt-16 no-pattern">
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Side - Title and Line */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in uppercase tracking-tight">
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
                      d="M546.94,2.11q-91.62,2.84-183.06,9.51L198,14.56l-182,3.23c-5.87.1-15,4.4-15.85,10.92C-.91,35.89,8,37.09,13,37l118.29-2.09Q106.64,38,82.07,41.44c-5.68.78-13.61,3.44-15.43,9.66-1.62,5.54,3.44,9.47,8.81,9.56l273.19,4.69,58.14,1Q365,70.93,323.3,76.89,258,86.24,193.27,99c-4.66.91-11.27,5-12,10.22-.68,5,4.82,8.27,9.24,8.31l310.69,2.71,87.58.77c6.69,0,15.27-1.86,18.64-8.42,3-5.88-2.63-10.78-8.38-10.83L300,99.11l8.33-1.26q56.51-8.37,113.35-14.18,113.7-11.61,228.13-12.9L660,70.7l115.85,2c6.68.12,15.28-1.88,18.63-8.41,3.08-6-2.68-10.6-8.37-10.83q-59.12-2.37-118.31-2L512.88,48.75,239.69,44.07l-22-.38q71.52-7.61,143.26-12.85L660,25.54l182-3.23c5.57-.1,13.75-3.92,15.42-9.66S854,3.28,848.65,3.08Q697.87-2.54,546.94,2.11Z"
                      fill="hsl(196, 96%, 67%)"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Side - Sketched Old TV with GIF */}
          <div className="flex-shrink-0 relative w-[380px] h-[290px] md:w-[520px] md:h-[390px] lg:w-[620px] lg:h-[460px] mt-8 md:mt-12 -ml-4 md:-ml-8">
            <svg
              viewBox="0 0 620 460"
              className="absolute inset-0 w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shadow behind TV body - offset 5px right & down, solid black */}
              <path
                d="M 23 27 C 20 25, 17 27, 16 33 C 14 65, 13 155, 13 255 C 13 335, 14 395, 15 430 C 15 437, 19 442, 25 443 C 85 446, 355 449, 505 449 C 565 449, 600 448, 609 447 C 615 446, 618 442, 618 436 C 619 400, 620 315, 619 215 C 618 135, 617 65, 616 35 C 615 28, 612 25, 606 24 C 545 22, 305 20, 125 22 C 65 23, 30 25, 23 27"
                fill="#000000" stroke="none"
              />

              {/* TV outer body - wide landscape box, wobbly sketch */}
              <path
                d="M 18 22 C 15 20, 12 22, 11 28 C 9 60, 8 150, 8 250 C 8 330, 9 390, 10 425 C 10 432, 14 437, 20 438 C 80 441, 350 444, 500 444 C 560 444, 595 443, 604 442 C 610 441, 613 437, 613 431 C 614 395, 615 310, 614 210 C 613 130, 612 60, 611 30 C 610 23, 607 20, 601 19 C 540 17, 300 15, 120 17 C 60 18, 25 20, 18 22"
                stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--background))" className="text-foreground"
              />
              {/* Screen bezel - single wobbly frame */}
              <path
                d="M 48 50 C 42 50, 36 55, 35 64 C 33 120, 32 220, 33 320 C 34 370, 35 400, 36 415 C 37 422, 41 427, 48 428 C 110 431, 330 433, 430 432 C 438 431, 442 427, 443 419 C 444 400, 445 340, 445 260 C 445 180, 444 100, 443 66 C 442 56, 438 51, 430 50 C 340 48, 130 48, 48 50"
                stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-foreground"
              />

              {/* Right panel divider */}
              <path
                d="M 460 38 C 461 40, 459 42, 460 45 L 459 420 C 459 425, 461 428, 460 430"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground/40"
              />

              {/* Channel knob - wobbly (clickable) */}
              <g onClick={switchChannel} className="cursor-pointer group/knob" role="button" aria-label="Switch channel">
                <path
                  d="M 560 155 C 561 135, 550 122, 533 120 C 516 118, 505 130, 504 150 C 503 170, 514 182, 531 184 C 548 186, 559 175, 560 155"
                  strokeWidth="2.5" strokeLinecap="round" className="stroke-foreground fill-[hsl(var(--background))] group-hover/knob:stroke-[#5ad1fc] group-hover/knob:fill-[#5ad1fc] transition-colors"
                />
                <path d="M 532 151 C 530 149, 528 152, 531 154 C 534 155, 535 152, 532 151" className="fill-[#5ad1fc] group-hover/knob:fill-white transition-colors" />
                <path d="M 531 151 L 530 128" strokeWidth="2" strokeLinecap="round" className="stroke-[#5ad1fc] group-hover/knob:stroke-white transition-colors" />
              </g>

              {/* Volume knob - smaller */}
              <path
                d="M 552 240 C 553 225, 544 215, 531 214 C 518 213, 510 222, 509 237 C 508 252, 517 262, 530 263 C 543 264, 551 255, 552 240"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" className="text-foreground"
              />
              <path d="M 530 238 C 528 236, 527 239, 530 241 C 533 242, 533 239, 530 238" fill="#5ad1fc" />
              <path d="M 530 238 L 542 228" stroke="#5ad1fc" strokeWidth="1.8" strokeLinecap="round" />

              {/* Power button - small wobbly rectangle */}
              <path
                d="M 518 300 C 516 299, 514 300, 514 304 L 514 318 C 514 322, 516 324, 520 324 L 544 325 C 548 325, 550 323, 550 319 L 550 305 C 550 301, 548 299, 544 299 L 518 300"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" className="text-foreground/60"
              />
              {/* Power dot inside */}
              <path d="M 532 311 C 529 309, 527 312, 530 315 C 533 317, 535 313, 532 311" fill="currentColor" className="text-foreground/50" />

              {/* Simple horizontal lines for speaker at bottom */}
              <path d="M 478 370 C 500 369, 555 371, 590 370" stroke="#5ad1fc" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 479 382 C 505 383, 560 381, 589 382" stroke="#5ad1fc" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 478 394 C 510 395, 548 393, 590 394" stroke="#5ad1fc" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 479 406 C 502 405, 562 407, 589 406" stroke="#5ad1fc" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 478 418 C 515 419, 550 417, 590 418" stroke="#5ad1fc" strokeWidth="1.3" strokeLinecap="round" />

              {/* Scratchy shading on wood body */}
              <g className="text-foreground/10">
                <path d="M 16 55 L 22 62" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 14 58 L 20 65" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M 15 120 L 21 127" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M 16 380 L 22 387" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 14 383 L 20 390" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M 598 55 L 604 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M 600 120 L 606 127" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 598 380 L 604 387" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M 200 435 L 208 438" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M 350 436 L 358 439" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
              </g>
            </svg>

            {/* GIF positioned inside the TV screen area */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: '7.2%',
                top: '13%',
                width: '62%',
                height: '79%',
                borderRadius: '6px',
              }}
            >
              <img
                src={tvGifs[currentGifIndex]}
                alt="Past editions highlight"
                className="w-full h-full object-cover"
                style={{
                  opacity: isStatic ? 0 : 1,
                  transition: isStatic ? 'opacity 0.1s ease-out' : 'opacity 0.3s ease-in 0.1s',
                }}
              />
              {/* Animated TV static canvas */}
              <canvas
                ref={staticCanvasRef}
                width={200}
                height={150}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: isStatic ? 1 : 0,
                  transition: isStatic ? 'opacity 0.05s ease-out' : 'opacity 0.2s ease-in',
                  imageRendering: 'pixelated',
                }}
              />
              {/* CRT scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
                }}
              />
              {/* Screen edge vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
                  borderRadius: '8px',
                }}
              />
            </div>

            {/* "switch the channel!" scribble with arrow */}
            <div
              className="absolute z-30 hidden md:block cursor-pointer"
              style={{
                right: '-28%',
                top: '10%',
                animation: 'noteWiggle 3s ease-in-out infinite',
              }}
              onClick={switchChannel}
            >
              <svg width="160" height="130" viewBox="0 0 160 130" fill="none" overflow="visible">
                {/* "switch" */}
                <text x="20" y="22" fill="#333" fontSize="15" fontWeight="700" fontFamily="'Comic Sans MS', 'Marker Felt', cursive" transform="rotate(-3, 20, 22)">switch</text>
                {/* "the" */}
                <text x="35" y="40" fill="#333" fontSize="14" fontWeight="600" fontFamily="'Comic Sans MS', 'Marker Felt', cursive" transform="rotate(1, 35, 40)">the</text>
                {/* "channel!" */}
                <text x="12" y="62" fill="#5ad1fc" fontSize="17" fontWeight="900" fontFamily="'Comic Sans MS', 'Marker Felt', cursive" transform="rotate(-1, 12, 62)">channel!</text>
                {/* Wobbly underline - fits "channel!" width only */}
                <path d="M14 66 C25 64, 40 68, 55 65 C65 63, 75 67, 85 65" stroke="#5ad1fc" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
                <path d="M16 65 C28 63, 42 67, 57 64 C67 62, 77 66, 87 64" stroke="#5ad1fc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Arrow curving down-left toward TV knob */}
                <path d="M45 72 C42 85, 30 100, 10 110 C-5 118, -25 122, -45 125" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Arrowhead pointing left */}
                <path d="M-39 119 L-48 125 L-39 131" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M47 73 C44 86, 32 101, 12 111 C-3 119, -23 123, -43 126" stroke="#333" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
              </svg>
            </div>

            {/* Mobile: scribble text above the TV */}
            <div
              className="absolute md:hidden z-30 cursor-pointer"
              style={{
                right: '-5%',
                top: '-18%',
                animation: 'noteWiggle 3s ease-in-out infinite',
              }}
              onClick={switchChannel}
            >
              <svg width="130" height="110" viewBox="0 0 130 110" fill="none" overflow="visible">
                <text x="15" y="18" fill="#333" fontSize="13" fontWeight="700" fontFamily="'Comic Sans MS', 'Marker Felt', cursive" transform="rotate(-3, 15, 18)">switch</text>
                <text x="28" y="34" fill="#333" fontSize="12" fontWeight="600" fontFamily="'Comic Sans MS', 'Marker Felt', cursive" transform="rotate(1, 28, 34)">the</text>
                <text x="8" y="52" fill="#5ad1fc" fontSize="15" fontWeight="900" fontFamily="'Comic Sans MS', 'Marker Felt', cursive" transform="rotate(-1, 8, 52)">channel!</text>
                {/* Underline matching "channel!" */}
                <path d="M10 56 C22 54, 35 58, 48 55 C58 53, 65 57, 75 55" stroke="#5ad1fc" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45" />
                <path d="M12 55 C24 53, 37 57, 50 54 C60 52, 67 56, 77 54" stroke="#5ad1fc" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Arrow curving down toward TV knob */}
                <path d="M65 62 C68 72, 66 85, 62 95 C59 102, 58 108, 58 118" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Arrowhead pointing down */}
                <path d="M52 112 L58 122 L64 112" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M67 63 C70 73, 68 86, 64 96 C61 103, 60 109, 60 119" stroke="#333" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Delimiter line */}
      <div className="container mx-auto px-4">
        <div className="border-t-2 border-foreground/10" />
      </div>

      {/* Past Editions Grid */}
      <section className="container mx-auto px-4 mb-20 pt-16 relative">
        {/* Curved dotted path connecting 2023 → 2024 → 2025 (desktop S-curve) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 500 720
               C 700 720, 900 600, 800 400
               C 730 260, 600 350, 500 420
               C 400 490, 270 380, 250 250"
            stroke="#5ad1fc"
            strokeWidth="4"
            strokeDasharray="16 10"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Vertical wavy dotted path connecting cards (mobile only) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none block md:hidden z-0"
          viewBox="0 0 100 1000"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 200
               C 70 280, 30 340, 50 420
               C 70 500, 30 560, 50 640
               C 70 720, 30 790, 50 870"
            stroke="#5ad1fc"
            strokeWidth="2.5"
            strokeDasharray="12 8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Top Row - Two Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
          <div
            ref={polaroid2025SectionRef}
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={handle2025HoverStart}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Polaroid group with hover animation */}
            <div
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
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
                  <img src={hoverImages2025[0]} alt="2025 May event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
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
                  <img src={hoverImages2025[1]} alt="2025 May event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
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
                  <img src={mainImage2025} alt="2025 May event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </Link>
            </div>
            <Link to="/past-editions/2025" className="w-full max-w-md mx-auto mt-[120px] md:mt-[140px]">
              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <p className="text-center font-bold text-black text-2xl">
                    2025
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div
            ref={polaroid2024SectionRef}
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={handle2024HoverStart}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Polaroid group with hover animation */}
            <div 
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
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
            <Link to="/past-editions/2024" className="w-full max-w-md mx-auto mt-[120px] md:mt-[140px]">
              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <p className="text-center font-bold text-black text-2xl">
                    2024
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Bottom Row - One Card */}
        <div
          ref={polaroid2023SectionRef}
          className="flex flex-col items-center max-w-md mx-auto relative z-10 cursor-pointer"
          onMouseEnter={handle2023HoverStart}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Polaroid group with hover animation */}
          <div 
            className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
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
                <img src={hoverImages2023[0]} alt="2023 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
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
                <img src={hoverImages2023[1]} alt="2023 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
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
                <img src={mainImage2023} alt="2023 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                <div className="h-8 bg-white"></div>
              </div>
            </Link>
          </div>
          <Link to="/past-editions/2023" className="w-full mt-[120px] md:mt-[140px]">
            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6">
                <p className="text-center font-bold text-black text-2xl">
                  2023
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be part of the next edition!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community and build the future of startups in Romania
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
