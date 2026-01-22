import { useState, useRef, useEffect, startTransition } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SquiggleDoodle, ArrowDoodle } from "@/components/Doodles";
import { RocketFollower } from "@/components/RocketFollower";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import polaroidSvg from "@/assets/polaroid.svg";

// Import 2023 photos
import photo2023_1 from "@/assets/2023/Copy of 03fb9a56-800a-439b-97aa-fc2285bc6f57.jpg";
import photo2023_2 from "@/assets/2023/Copy of 0e4dd94b-b81a-4f68-95e6-4f866dc76079.jpg";
import photo2023_3 from "@/assets/2023/Copy of 20230319_154001.jpg";
import photo2023_4 from "@/assets/2023/Copy of 20230319_193424.jpg";
import photo2023_5 from "@/assets/2023/Copy of 20230319_193426.jpg";
import photo2023_6 from "@/assets/2023/Copy of 2e38732f-eea7-4375-8a66-649a201cdffb.jpg";
import photo2023_7 from "@/assets/2023/Copy of 3eafa8d1-3cf9-4d7f-a53f-f0e7e836b83d.jpg";
import photo2023_8 from "@/assets/2023/Copy of 4d634022-33a2-4fb6-b9a8-31e7c7b229e1.jpg";
import photo2023_9 from "@/assets/2023/Copy of 59e6570e-2113-4564-8dff-4fc1fc547e9b.jpg";
import photo2023_10 from "@/assets/2023/Copy of 59f672f2-72d8-4bc8-9326-10fd6dec0ccd.jpg";
import photo2023_11 from "@/assets/2023/Copy of 919ae593-57a3-4fb2-b3a1-78e69f197d66.jpg";
import photo2023_12 from "@/assets/2023/Copy of 96b3e5fe-b8de-4fb0-87ad-3f1c8b1b2359.jpg";
import photo2023_13 from "@/assets/2023/Copy of a5cf15f2-5811-4432-829b-009e31dec16e.jpg";
import photo2023_14 from "@/assets/2023/Copy of cf63c410-fc3d-4949-a837-932cc1aaf1b4.jpg";
import photo2023_15 from "@/assets/2023/Copy of e2962422-1a25-45cf-8564-db0b658c1e42.jpg";
import photo2023_16 from "@/assets/2023/Copy of WhatsApp Image 2023-03-17 at 21.24.18.jpeg";
import photo2023_17 from "@/assets/2023/Copy of WhatsApp Image 2023-03-17 at 21.25.12.jpeg";

// Import 2024 photos
import photo2024_1 from "@/assets/2024/Copy of D6E72737-42FB-4AAF-B19D-25CE6080279B.JPG";
import photo2024_2 from "@/assets/2024/Copy of DSC00002.jpg";
import photo2024_3 from "@/assets/2024/Copy of DSC00003.jpg";
import photo2024_4 from "@/assets/2024/Copy of DSC00015.jpg";
import photo2024_5 from "@/assets/2024/Copy of DSC00030.jpg";
import photo2024_6 from "@/assets/2024/Copy of DSC00037.jpg";
import photo2024_7 from "@/assets/2024/Copy of DSC00038.jpg";
import photo2024_8 from "@/assets/2024/Copy of DSC00043.jpg";
import photo2024_9 from "@/assets/2024/Copy of DSC00046.jpg";
import photo2024_10 from "@/assets/2024/Copy of DSC00068.jpg";
import photo2024_11 from "@/assets/2024/Copy of DSC00080.JPG";
import photo2024_12 from "@/assets/2024/Copy of DSC00083.jpg";
import photo2024_13 from "@/assets/2024/Copy of DSC00084.JPG";
import photo2024_14 from "@/assets/2024/Copy of DSC00085.JPG";
import photo2024_15 from "@/assets/2024/Copy of DSC00093.JPG";
import photo2024_16 from "@/assets/2024/Copy of DSC00094.JPG";
import photo2024_17 from "@/assets/2024/Copy of DSC00108.jpg";
import photo2024_18 from "@/assets/2024/Copy of DSC00120.jpg";
import photo2024_19 from "@/assets/2024/Copy of DSC00121.JPG";
import photo2024_20 from "@/assets/2024/Copy of DSC00123.JPG";
import photo2024_21 from "@/assets/2024/Copy of DSC00127.jpg";
import photo2024_22 from "@/assets/2024/Copy of DSC00133.jpg";
import photo2024_23 from "@/assets/2024/Copy of DSC00134.JPG";
import photo2024_24 from "@/assets/2024/Copy of DSC00136.jpg";
import photo2024_25 from "@/assets/2024/Copy of DSC00137.jpg";
import photo2024_26 from "@/assets/2024/Copy of DSC00160.JPG";
import photo2024_27 from "@/assets/2024/Copy of DSC00163.JPG";
import photo2024_28 from "@/assets/2024/Copy of DSC00167.jpg";
import photo2024_29 from "@/assets/2024/Copy of DSC00168.JPG";
import photo2024_30 from "@/assets/2024/Copy of DSC00171.JPG";
import photo2024_31 from "@/assets/2024/Copy of DSC00181.jpg";
import photo2024_32 from "@/assets/2024/Copy of DSC00188.JPG";
import photo2024_33 from "@/assets/2024/Copy of DSC00192.jpg";
import photo2024_34 from "@/assets/2024/Copy of DSC00194.jpg";
import photo2024_35 from "@/assets/2024/Copy of DSC00212.JPG";
import photo2024_36 from "@/assets/2024/Copy of DSC00218.JPG";
import photo2024_37 from "@/assets/2024/Copy of DSC00230.JPG";
import photo2024_38 from "@/assets/2024/Copy of DSC00241.JPG";
import photo2024_39 from "@/assets/2024/Copy of DSC00242.jpg";
import photo2024_40 from "@/assets/2024/Copy of DSC00248.JPG";
import photo2024_41 from "@/assets/2024/Copy of DSC00249.jpg";
import photo2024_42 from "@/assets/2024/Copy of DSC00258.jpg";
import photo2024_43 from "@/assets/2024/Copy of DSC00265.jpg";
import photo2024_44 from "@/assets/2024/Copy of DSC00266.JPG";
import photo2024_45 from "@/assets/2024/Copy of DSC00270.jpg";
import photo2024_46 from "@/assets/2024/Copy of DSC00285.JPG";
import photo2024_47 from "@/assets/2024/Copy of DSC00287.JPG";
import photo2024_48 from "@/assets/2024/Copy of DSC00289.jpg";
import photo2024_49 from "@/assets/2024/Copy of DSC00291.JPG";

const allPhotos2023 = [
  photo2023_1, photo2023_2, photo2023_3, photo2023_4, photo2023_5,
  photo2023_6, photo2023_7, photo2023_8, photo2023_9, photo2023_10,
  photo2023_11, photo2023_12, photo2023_13, photo2023_14, photo2023_15,
  photo2023_16, photo2023_17
];

const allPhotos2024 = [
  photo2024_1, photo2024_2, photo2024_3, photo2024_4, photo2024_5,
  photo2024_6, photo2024_7, photo2024_8, photo2024_9, photo2024_10,
  photo2024_11, photo2024_12, photo2024_13, photo2024_14, photo2024_15,
  photo2024_16, photo2024_17, photo2024_18, photo2024_19, photo2024_20,
  photo2024_21, photo2024_22, photo2024_23, photo2024_24, photo2024_25,
  photo2024_26, photo2024_27, photo2024_28, photo2024_29, photo2024_30,
  photo2024_31, photo2024_32, photo2024_33, photo2024_34, photo2024_35,
  photo2024_36, photo2024_37, photo2024_38, photo2024_39, photo2024_40,
  photo2024_41, photo2024_42, photo2024_43, photo2024_44, photo2024_45,
  photo2024_46, photo2024_47, photo2024_48, photo2024_49
];

const PastEditions = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Random photos for 2023 polaroids
  // Main polaroid photo (static)
  const [mainPhoto2023, setMainPhoto2023] = useState<string>(photo2023_1);
  // Side polaroid photos (random on each hover)
  const [sidePhotos2023, setSidePhotos2023] = useState<[string, string]>([photo2023_2, photo2023_3]);
  const polaroid2023Ref = useRef<HTMLDivElement>(null);
  
  // Random photos for 2024 polaroids
  // Main polaroid photo (static)
  const [mainPhoto2024, setMainPhoto2024] = useState<string>(photo2024_1);
  // Side polaroid photos (random on each hover)
  const [sidePhotos2024, setSidePhotos2024] = useState<[string, string]>([photo2024_2, photo2024_3]);
  const polaroid2024Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Randomly select main photo on mount for 2023
    const shuffled2023 = [...allPhotos2023].sort(() => Math.random() - 0.5);
    setMainPhoto2023(shuffled2023[0]);
    
    // Randomly select main photo on mount for 2024
    const shuffled2024 = [...allPhotos2024].sort(() => Math.random() - 0.5);
    setMainPhoto2024(shuffled2024[0]);
  }, []);
  
  // Handler for 2024 polaroid hover - updates photos instantly
  const handle2024Hover = () => {
    setHoveredIndex(1);
    // Immediately calculate and set new photos
    const availablePhotos = allPhotos2024.filter(photo => photo !== mainPhoto2024);
    const shuffled = [...availablePhotos].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2) as [string, string];
    setSidePhotos2024(selected);
  };
  
  // Handler for 2023 polaroid hover - updates photos instantly
  const handle2023Hover = () => {
    setHoveredIndex(2);
    // Immediately calculate and set new photos
    const availablePhotos = allPhotos2023.filter(photo => photo !== mainPhoto2023);
    const shuffled = [...availablePhotos].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2) as [string, string];
    setSidePhotos2023(selected);
  };
  
  // Randomize photos when 2023 polaroid is not visible on screen
  useEffect(() => {
    if (!polaroid2023Ref.current) return;
    
    let wasVisible = false;
    let timeoutId: NodeJS.Timeout | null = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          
          // Only randomize when transitioning from visible to not visible
          if (wasVisible && !isVisible) {
            // Clear any pending timeout
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            
            // Debounce the randomization
            timeoutId = setTimeout(() => {
              // Randomize main photo
              const shuffled = [...allPhotos2023].sort(() => Math.random() - 0.5);
              setMainPhoto2023(shuffled[0]);
              
              // Randomize side photos
              const availablePhotos = allPhotos2023.filter(photo => photo !== shuffled[0]);
              const sideShuffled = [...availablePhotos].sort(() => Math.random() - 0.5);
              const selected = sideShuffled.slice(0, 2) as [string, string];
              setSidePhotos2023(selected);
            }, 300); // 300ms debounce
          }
          
          wasVisible = isVisible;
        });
      },
      { threshold: 0 }
    );
    
    observer.observe(polaroid2023Ref.current);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, []);
  
  // Randomize photos when 2024 polaroid is not visible on screen
  useEffect(() => {
    if (!polaroid2024Ref.current) return;
    
    let wasVisible = false;
    let timeoutId: NodeJS.Timeout | null = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          
          // Only randomize when transitioning from visible to not visible
          if (wasVisible && !isVisible) {
            // Clear any pending timeout
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            
            // Debounce the randomization
            timeoutId = setTimeout(() => {
              // Randomize main photo
              const shuffled = [...allPhotos2024].sort(() => Math.random() - 0.5);
              setMainPhoto2024(shuffled[0]);
              
              // Randomize side photos
              const availablePhotos = allPhotos2024.filter(photo => photo !== shuffled[0]);
              const sideShuffled = [...availablePhotos].sort(() => Math.random() - 0.5);
              const selected = sideShuffled.slice(0, 2) as [string, string];
              setSidePhotos2024(selected);
            }, 300); // 300ms debounce
          }
          
          wasVisible = isVisible;
        });
      },
      { threshold: 0 }
    );
    
    observer.observe(polaroid2024Ref.current);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, []);
  
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
          
          <div className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div 
              ref={polaroid2024Ref}
              className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
              onMouseEnter={handle2024Hover}
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                    <img 
                      src={sidePhotos2024[0]} 
                      alt="2024 Event" 
                      className="w-full h-full object-cover"
                      style={{
                        imageRendering: 'optimizeSpeed',
                        transform: 'scale(1.5)',
                        transformOrigin: 'top left',
                        width: '66.67%',
                        height: '66.67%',
                        filter: 'blur(0.5px)',
                        willChange: 'transform'
                      }}
                    />
                  </div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                    <img 
                      src={sidePhotos2024[1]} 
                      alt="2024 Event" 
                      className="w-full h-full object-cover"
                      style={{
                        imageRendering: 'optimizeSpeed',
                        transform: 'scale(1.5)',
                        transformOrigin: 'top left',
                        width: '66.67%',
                        height: '66.67%',
                        filter: 'blur(0.5px)',
                        willChange: 'transform'
                      }}
                    />
                  </div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                    <img 
                      src={mainPhoto2024} 
                      alt="2024 Event" 
                      className="w-full h-full object-cover"
                    />
                  </div>
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
            ref={polaroid2023Ref}
            className="relative w-64 md:w-80 mb-0 h-[280px] md:h-[320px]"
            onMouseEnter={handle2023Hover}
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
                <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                  <img 
                    src={sidePhotos2023[0]} 
                    alt="2023 Edition" 
                    className="w-full h-full object-cover"
                    style={{
                      imageRendering: 'optimizeSpeed',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left',
                      width: '66.67%',
                      height: '66.67%',
                      filter: 'blur(0.5px)',
                      willChange: 'transform'
                    }}
                  />
                </div>
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
                <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                  <img 
                    src={sidePhotos2023[1]} 
                    alt="2023 Edition" 
                    className="w-full h-full object-cover"
                    style={{
                      imageRendering: 'optimizeSpeed',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left',
                      width: '66.67%',
                      height: '66.67%',
                      filter: 'blur(0.5px)',
                      willChange: 'transform'
                    }}
                  />
                </div>
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
                <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                  <img 
                    src={mainPhoto2023} 
                    alt="2023 Edition" 
                    className="w-full h-full object-cover"
                  />
                </div>
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
