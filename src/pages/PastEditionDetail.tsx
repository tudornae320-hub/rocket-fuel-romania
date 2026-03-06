import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { RocketFollower } from "@/components/RocketFollower";
import heroBackground from "@/assets/hero-background.jpg";
import heroGif from "@/assets/video_hero_2.gif";
import hero2023Gif from "@/2023_movie.gif";
import hero2025May from "@/2025_may_movie2.gif";
import hero2025Oct from "@/2025_oct_movi.gif";

const hero2025Gifs = [hero2025May, hero2025Oct];

// 2025 May images
import img2025m_1 from "@/assets/2025/may/Copy of Copy of DSC_0028.jpg";
import img2025m_2 from "@/assets/2025/may/Copy of Copy of DSC_0039.jpg";
import img2025m_3 from "@/assets/2025/may/Copy of Copy of DSC_0049.jpg";
import img2025m_4 from "@/assets/2025/may/Copy of Copy of DSC_0066.jpg";
import img2025m_5 from "@/assets/2025/may/Copy of Copy of DSC_0071.jpg";
import img2025m_6 from "@/assets/2025/may/Copy of Copy of DSC_0092.jpg";
import img2025m_7 from "@/assets/2025/may/Copy of Copy of DSC_0104.jpg";
import img2025m_8 from "@/assets/2025/may/Copy of Copy of DSC_0116.jpg";
import img2025m_9 from "@/assets/2025/may/Copy of Copy of DSC_0124.jpg";
import img2025m_10 from "@/assets/2025/may/Copy of Copy of DSC_0134.jpg";
import img2025m_11 from "@/assets/2025/may/Copy of Copy of DSC_0149.jpg";
import img2025m_12 from "@/assets/2025/may/Copy of Copy of DSC_0158.jpg";
import img2025m_13 from "@/assets/2025/may/Copy of Copy of DSC_0170.jpg";
import img2025m_14 from "@/assets/2025/may/Copy of Copy of DSC_0191.jpg";
import img2025m_15 from "@/assets/2025/may/Copy of Copy of DSC_0204.jpg";
import img2025m_16 from "@/assets/2025/may/Copy of Copy of DSC_0248.jpg";
import img2025m_17 from "@/assets/2025/may/Copy of Copy of DSC_0263.jpg";
import img2025m_18 from "@/assets/2025/may/Copy of Copy of DSC_0270.jpg";
import img2025m_19 from "@/assets/2025/may/Copy of Copy of DSC_0277.jpg";
import img2025m_20 from "@/assets/2025/may/Copy of Copy of DSC_0286.jpg";

// 2025 October images
import img2025o_1 from "@/assets/2025/october/IMG_3287.jpg";
import img2025o_2 from "@/assets/2025/october/IMG_3362.jpg";
import img2025o_3 from "@/assets/2025/october/IMG_3472.jpg";
import img2025o_4 from "@/assets/2025/october/IMG_3553.jpg";
import img2025o_5 from "@/assets/2025/october/IMG_3617.jpg";
import img2025o_6 from "@/assets/2025/october/IMG_3735.jpg";
import img2025o_7 from "@/assets/2025/october/IMG_3876.jpg";
import img2025o_8 from "@/assets/2025/october/IMG_3957.jpg";
import img2025o_9 from "@/assets/2025/october/IMG_4070.jpg";
import img2025o_10 from "@/assets/2025/october/IMG_4141.jpg";
import img2025o_11 from "@/assets/2025/october/IMG_4251.jpg";
import img2025o_12 from "@/assets/2025/october/IMG_4329.jpg";
import img2025o_13 from "@/assets/2025/october/IMG_4405.jpg";
import img2025o_14 from "@/assets/2025/october/IMG_4478.jpg";
import img2025o_15 from "@/assets/2025/october/IMG_4559.jpg";
import img2025o_16 from "@/assets/2025/october/IMG_4600.jpg";
import img2025o_17 from "@/assets/2025/october/IMG_4660.jpg";
import img2025o_18 from "@/assets/2025/october/IMG_4703.jpg";
import img2025o_19 from "@/assets/2025/october/IMG_4746.jpg";
import img2025o_20 from "@/assets/2025/october/IMG_4763.jpg";

// 2024 images
import img2024_1 from "@/assets/2024/Copy of DSC00002.jpg";
import img2024_2 from "@/assets/2024/Copy of DSC00003.jpg";
import img2024_3 from "@/assets/2024/Copy of DSC00015.jpg";
import img2024_4 from "@/assets/2024/Copy of DSC00030.jpg";
import img2024_5 from "@/assets/2024/Copy of DSC00037.jpg";
import img2024_6 from "@/assets/2024/Copy of DSC00038.jpg";
import img2024_7 from "@/assets/2024/Copy of DSC00043.jpg";
import img2024_8 from "@/assets/2024/Copy of DSC00046.jpg";
import img2024_9 from "@/assets/2024/Copy of DSC00068.jpg";
import img2024_10 from "@/assets/2024/Copy of DSC00083.jpg";
import img2024_11 from "@/assets/2024/Copy of DSC00108.jpg";
import img2024_12 from "@/assets/2024/Copy of DSC00120.jpg";
import img2024_13 from "@/assets/2024/Copy of DSC00127.jpg";
import img2024_14 from "@/assets/2024/Copy of DSC00133.jpg";
import img2024_15 from "@/assets/2024/Copy of DSC00136.jpg";
import img2024_16 from "@/assets/2024/Copy of DSC00137.jpg";
import img2024_17 from "@/assets/2024/Copy of DSC00167.jpg";
import img2024_18 from "@/assets/2024/Copy of DSC00181.jpg";
import img2024_19 from "@/assets/2024/Copy of DSC00192.jpg";
import img2024_20 from "@/assets/2024/Copy of DSC00194.jpg";
import img2024_21 from "@/assets/2024/Copy of DSC00242.jpg";

// 2023 images
import img2023_1 from "@/assets/2023/Copy of 03fb9a56-800a-439b-97aa-fc2285bc6f57.jpg";
import img2023_2 from "@/assets/2023/Copy of 0e4dd94b-b81a-4f68-95e6-4f866dc76079.jpg";
import img2023_3 from "@/assets/2023/Copy of 20230319_154001.jpg";
import img2023_4 from "@/assets/2023/Copy of 20230319_193424.jpg";
import img2023_5 from "@/assets/2023/Copy of 2e38732f-eea7-4375-8a66-649a201cdffb.jpg";
import img2023_6 from "@/assets/2023/Copy of 3eafa8d1-3cf9-4d7f-a53f-f0e7e836b83d.jpg";
import img2023_7 from "@/assets/2023/Copy of 4d634022-33a2-4fb6-b9a8-31e7c7b229e1.jpg";
import img2023_8 from "@/assets/2023/Copy of 59e6570e-2113-4564-8dff-4fc1fc547e9b.jpg";
import img2023_9 from "@/assets/2023/Copy of 59f672f2-72d8-4bc8-9326-10fd6dec0ccd.jpg";
import img2023_10 from "@/assets/2023/Copy of 919ae593-57a3-4fb2-b3a1-78e69f197d66.jpg";
import img2023_11 from "@/assets/2023/Copy of 96b3e5fe-b8de-4fb0-87ad-3f1c8b1b2359.jpg";
import img2023_12 from "@/assets/2023/Copy of a5cf15f2-5811-4432-829b-009e31dec16e.jpg";
import img2023_13 from "@/assets/2023/Copy of cf63c410-fc3d-4949-a837-932cc1aaf1b4.jpg";
import img2023_14 from "@/assets/2023/Copy of e2962422-1a25-45cf-8564-db0b658c1e42.jpg";
import img2023_15 from "@/assets/2023/Copy of WhatsApp Image 2023-03-17 at 21.24.18.jpeg";
import img2023_16 from "@/assets/2023/Copy of WhatsApp Image 2023-03-17 at 21.25.12.jpeg";

const allImages2025May = [
  img2025m_1, img2025m_2, img2025m_3, img2025m_4, img2025m_5, img2025m_6,
  img2025m_7, img2025m_8, img2025m_9, img2025m_10, img2025m_11, img2025m_12,
  img2025m_13, img2025m_14, img2025m_15, img2025m_16, img2025m_17, img2025m_18,
  img2025m_19, img2025m_20
];

const allImages2025Oct = [
  img2025o_1, img2025o_2, img2025o_3, img2025o_4, img2025o_5, img2025o_6,
  img2025o_7, img2025o_8, img2025o_9, img2025o_10, img2025o_11, img2025o_12,
  img2025o_13, img2025o_14, img2025o_15, img2025o_16, img2025o_17, img2025o_18,
  img2025o_19, img2025o_20
];

const allImages2024 = [
  img2024_1, img2024_2, img2024_3, img2024_4, img2024_5, img2024_6, 
  img2024_7, img2024_8, img2024_9, img2024_10, img2024_11, img2024_12,
  img2024_13, img2024_14, img2024_15, img2024_16, img2024_17, img2024_18,
  img2024_19, img2024_20, img2024_21
];

const allImages2023 = [
  img2023_1, img2023_2, img2023_3, img2023_4, img2023_5, img2023_6,
  img2023_7, img2023_8, img2023_9, img2023_10, img2023_11, img2023_12,
  img2023_13, img2023_14, img2023_15, img2023_16
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

const CountUp = ({ end, duration = 1500, trigger }: { end: number; duration?: number; trigger: boolean }) => {
  const [count, setCount] = useState(0);
  const prevTrigger = useRef(false);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      prevTrigger.current = false;
      return;
    }
    if (prevTrigger.current) return;
    prevTrigger.current = true;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, end, duration]);

  return <>{count}</>;
};

const PastEditionDetail = () => {
  const { year } = useParams<{ year: string }>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<"may" | "october" | null>(null);
  const photoSectionRef = useRef<HTMLDivElement>(null);

  const [is2024Open, setIs2024Open] = useState(false);
  const [is2023Open, setIs2023Open] = useState(false);
  
  // Random images state for 2024
  const [galleryImages, setGalleryImages] = useState(() => shuffleArray(allImages2024).slice(0, 12));
  const [hoverImages, setHoverImages] = useState(() => shuffleArray(allImages2024).slice(0, 2));
  const [sideImages, setSideImages] = useState(() => shuffleArray(allImages2024).slice(0, 6));
  const [mainImage, setMainImage] = useState(() => allImages2024[Math.floor(Math.random() * allImages2024.length)]);
  const [isPolaroidVisible, setIsPolaroidVisible] = useState(true);
  const polaroidSectionRef = useRef<HTMLDivElement>(null);

  // 2023 random images state
  const [galleryImages2023, setGalleryImages2023] = useState(() => shuffleArray(allImages2023).slice(0, 12));
  const [hoverImages2023, setHoverImages2023] = useState(() => shuffleArray(allImages2023).slice(0, 2));
  const [sideImages2023, setSideImages2023] = useState(() => shuffleArray(allImages2023).slice(0, 6));
  const [mainImage2023, setMainImage2023] = useState(() => allImages2023[Math.floor(Math.random() * allImages2023.length)]);
  const [isPolaroidVisible2023, setIsPolaroidVisible2023] = useState(true);
  const polaroidSectionRef2023 = useRef<HTMLDivElement>(null);

  // Track visibility of 2024 polaroid section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsPolaroidVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (polaroidSectionRef.current) {
      observer.observe(polaroidSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Track visibility of 2023 polaroid section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsPolaroidVisible2023(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (polaroidSectionRef2023.current) {
      observer.observe(polaroidSectionRef2023.current);
    }
    return () => observer.disconnect();
  }, []);

  // Shuffle images when 2024 gallery opens
  useEffect(() => {
    if (is2024Open) {
      setGalleryImages(shuffleArray(allImages2024).slice(0, 12));
      setSideImages(shuffleArray(allImages2024).slice(0, 6));
    }
  }, [is2024Open]);

  // Shuffle images when 2023 gallery opens
  useEffect(() => {
    if (is2023Open) {
      setGalleryImages2023(shuffleArray(allImages2023).slice(0, 12));
      setSideImages2023(shuffleArray(allImages2023).slice(0, 6));
    }
  }, [is2023Open]);

  // Shuffle hover images when hovering on 2024
  const handleHoverStart = useCallback(() => {
    setHoverImages(shuffleArray(allImages2024).slice(0, 2));
    setHoveredIndex(0);
  }, []);

  // Shuffle hover images when hovering on 2023
  const handleHoverStart2023 = useCallback(() => {
    setHoverImages2023(shuffleArray(allImages2023).slice(0, 2));
    setHoveredIndex(2);
  }, []);

  // Shuffle main 2024 polaroid only when section is not visible
  useEffect(() => {
    if (!isPolaroidVisible && !is2024Open) {
      const interval = setInterval(() => {
        setMainImage(allImages2024[Math.floor(Math.random() * allImages2024.length)]);
        setHoverImages(shuffleArray(allImages2024).slice(0, 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPolaroidVisible, is2024Open]);

  // Shuffle main 2023 polaroid only when section is not visible
  useEffect(() => {
    if (!isPolaroidVisible2023 && !is2023Open) {
      const interval = setInterval(() => {
        setMainImage2023(allImages2023[Math.floor(Math.random() * allImages2023.length)]);
        setHoverImages2023(shuffleArray(allImages2023).slice(0, 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPolaroidVisible2023, is2023Open]);

  const polaroid2024Ref = useRef<HTMLDivElement>(null);
  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const photoGalleryRef = useRef<HTMLDivElement>(null);

  // Handler for first polaroid hover
  const handlePolaroid1Hover = () => {
    setHoveredIndex(0);
  };

  // Handler for second polaroid hover
  const handlePolaroid2Hover = () => {
    setHoveredIndex(1);
  };

  // Handler for polaroid click
  const handlePolaroidClick = (event: "may" | "october") => {
    if (selectedEvent === event) {
      // If clicking on the already selected event, close it
      setSelectedEvent(null);
    } else {
      // If switching from one event to another, scroll to top first
      if (selectedEvent !== null) {
        photoSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          setSelectedEvent(event);
          // After switching, scroll back to the polaroid section
          setTimeout(() => {
            photoSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }, 500);
      } else {
        // Open the clicked event without auto-scrolling
        setSelectedEvent(event);
      }
    }
  };

  // Render polaroid component
  const renderPolaroid = (
    event: "may" | "october",
    polaroidRef: React.RefObject<HTMLDivElement>,
    handleHover: () => void,
    index: number,
    isExpanded: boolean = false,
  ) => {
    const isSelected = selectedEvent === event;
    const eventName = event === "may" ? "May" : "October";

    return (
      <div className={`flex flex-col items-center transition-all duration-700 ${isExpanded ? "w-full max-w-4xl" : ""}`}>
        <div
          ref={polaroidRef}
          className={`relative mb-0 transition-all duration-700 ${
            isExpanded ? "w-full max-w-2xl h-[400px] md:h-[500px]" : "w-64 md:w-80 h-[280px] md:h-[320px]"
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handlePolaroidClick(event)}
        >
          {/* Left tilted polaroid */}
          <div
            className={`absolute top-1/2 transition-all duration-500 ease-out ${isExpanded ? "left-[10%]" : "left-0"} ${
              hoveredIndex === index
                ? `opacity-100 -translate-y-1/2 -rotate-[25deg] scale-100 z-10 ${isExpanded ? "translate-x-[-30px]" : "translate-x-[-60px]"}`
                : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
            }`}
          >
            <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
              <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
              <div className="h-8 bg-white"></div>
            </div>
          </div>

          {/* Right tilted polaroid */}
          <div
            className={`absolute top-1/2 transition-all duration-500 ease-out ${
              isExpanded ? "right-[10%]" : "right-0"
            } ${
              hoveredIndex === index
                ? `opacity-100 -translate-y-1/2 rotate-[25deg] scale-100 z-10 ${isExpanded ? "translate-x-[30px]" : "translate-x-[60px]"}`
                : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
            }`}
          >
            <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
              <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
              <div className="h-8 bg-white"></div>
            </div>
          </div>

          {/* Main polaroid - raises on hover */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out cursor-pointer ${
              hoveredIndex === index ? "translate-y-[-40px] z-30" : "translate-y-0 z-10"
            }`}
          >
            <div
              className={`bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm transition-all duration-700 ${
                isExpanded ? "w-full max-w-2xl" : "w-64 md:w-80"
              }`}
            >
              <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
              <div className="h-8 bg-white"></div>
            </div>
          </div>
        </div>

        <Card
          className={`hover-lift w-full mx-auto transition-all duration-700 ${
            isExpanded ? "max-w-6xl mt-[60px] md:mt-[80px]" : "max-w-md mt-[120px] md:mt-[140px]"
          }`}
        >
          <CardContent className={`transition-all duration-700 ${isExpanded ? "p-8" : "p-6"}`}>
            <p
              className={`text-center font-bold text-black transition-all duration-700 ${
                isExpanded ? "text-3xl md:text-4xl mb-8" : "text-2xl"
              }`}
            >
              {eventName}
            </p>

            {/* Photo Gallery - only shown when expanded */}
            <div
              ref={isExpanded ? photoGalleryRef : null}
              className={`overflow-hidden transition-all duration-700 ${
                isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 ${
                  isExpanded ? "translate-y-0 scale-100" : "translate-y-[-20px] scale-95"
                }`}
              >
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500`}
                    style={{
                      transitionDelay: isExpanded ? `${idx * 30}ms` : "0ms",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Photo {idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (year === "2024") {
    return (
      <div className="min-h-screen bg-white relative">
        <RocketFollower />

        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroGif} alt="2024 edition highlight" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center justify-center">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">2024</h1>
            </div>
          </div>
        </section>

        {/* Single Polaroid Section */}
        <section className="container mx-auto px-4 mb-20 pt-16 relative overflow-hidden">
          <div ref={polaroidSectionRef} className="flex flex-col items-center pb-3 px-1">
            {/* Polaroid group with hover animation */}
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={handleHoverStart}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
                <div
                  className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 0
                      ? "opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <img src={hoverImages[0]} alt="2024 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                    <div className="h-8 bg-white"></div>
                  </div>
                </div>

                {/* Right tilted polaroid */}
                <div
                  className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 0
                      ? "opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <img src={hoverImages[1]} alt="2024 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                    <div className="h-8 bg-white"></div>
                  </div>
                </div>

                {/* Main polaroid - raises on hover */}
                <div
                  ref={polaroid2024Ref}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                    hoveredIndex === 0 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                  }`}
                  onClick={() => setIs2024Open((v) => !v)}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                    <img src={mainImage} alt="2024 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                    <div className="h-8 bg-white" />
                  </div>
                </div>
              </div>

            {/* Floating side polaroids - only visible when opened */}
            <div
              className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${is2024Open ? "opacity-100" : "opacity-0"}`}
            >
              {/* Left side polaroids */}
              <div
                className={`absolute top-[100px] left-0 w-32 md:w-40 transition-all duration-700 ease-out ${
                  is2024Open ? "translate-x-[-20%] opacity-70" : "translate-x-[-100%] opacity-0"
                }`}
                style={{
                  transform: is2024Open ? "translateX(-20%) rotate(-15deg)" : "translateX(-100%) rotate(-15deg)",
                  transitionDelay: "100ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages[0]} alt="2024 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[350px] left-0 w-28 md:w-36 transition-all duration-700 ease-out ${
                  is2024Open ? "translate-x-[10%] opacity-60" : "translate-x-[-100%] opacity-0"
                }`}
                style={{
                  transform: is2024Open ? "translateX(10%) rotate(8deg)" : "translateX(-100%) rotate(8deg)",
                  transitionDelay: "250ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages[1]} alt="2024 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[550px] left-0 w-24 md:w-32 transition-all duration-700 ease-out ${
                  is2024Open ? "translate-x-[-10%] opacity-50" : "translate-x-[-100%] opacity-0"
                }`}
                style={{
                  transform: is2024Open ? "translateX(-10%) rotate(-5deg)" : "translateX(-100%) rotate(-5deg)",
                  transitionDelay: "400ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages[2]} alt="2024 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              {/* Right side polaroids */}
              <div
                className={`absolute top-[150px] right-0 w-32 md:w-40 transition-all duration-700 ease-out ${
                  is2024Open ? "translate-x-[20%] opacity-70" : "translate-x-[100%] opacity-0"
                }`}
                style={{
                  transform: is2024Open ? "translateX(20%) rotate(12deg)" : "translateX(100%) rotate(12deg)",
                  transitionDelay: "150ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages[3]} alt="2024 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[400px] right-0 w-28 md:w-36 transition-all duration-700 ease-out ${
                  is2024Open ? "translate-x-[-5%] opacity-60" : "translate-x-[100%] opacity-0"
                }`}
                style={{
                  transform: is2024Open ? "translateX(-5%) rotate(-10deg)" : "translateX(100%) rotate(-10deg)",
                  transitionDelay: "300ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages[4]} alt="2024 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[600px] right-0 w-24 md:w-32 transition-all duration-700 ease-out ${
                  is2024Open ? "translate-x-[15%] opacity-50" : "translate-x-[100%] opacity-0"
                }`}
                style={{
                  transform: is2024Open ? "translateX(15%) rotate(6deg)" : "translateX(100%) rotate(6deg)",
                  transitionDelay: "450ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages[5]} alt="2024 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>
            </div>

            {/* Expandable Card with Photo Gallery */}
            <Card
              className={`hover-lift w-full mx-auto mt-8 transition-all duration-500 ease-out relative z-20 ${
                is2024Open ? "max-w-6xl" : "max-w-md"
              }`}
            >
              <CardContent className={`transition-all duration-500 ${is2024Open ? "p-8" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-500 ${
                    is2024Open ? "text-3xl md:text-4xl mb-8" : "text-2xl"
                  }`}
                >
                  2024
                </p>

                {/* Stats Section */}
                <div
                  className={`grid grid-cols-3 gap-6 md:gap-12 transition-all duration-700 overflow-hidden ${
                    is2024Open ? "max-h-[200px] opacity-100 mb-8 mt-2" : "max-h-0 opacity-0 mb-0 mt-0"
                  }`}
                >
                  {[
                    { value: 50, label: "Participants" },
                    { value: 19, label: "Ideas Pitched" },
                    { value: 9, label: "Teams Formed" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`text-center transition-all duration-500 ${
                        is2024Open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: is2024Open ? `${300 + i * 150}ms` : "0ms" }}
                    >
                      <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                        <CountUp end={stat.value} trigger={is2024Open} />
                      </p>
                      <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    is2024Open
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[2000px] opacity-100 mt-4"
                      : "grid-cols-1 max-h-0 opacity-0"
                  }`}
                >
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500 overflow-hidden ${
                        is2024Open ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: is2024Open ? `${idx * 30}ms` : "0ms",
                      }}
                    >
                      <img src={img} alt={`2024 event photo ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats row below card - fades when gallery opens */}
            <div className={`grid grid-cols-3 gap-12 md:gap-24 mt-12 transition-all duration-500 ${is2024Open ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
              {[
                { value: 50, label: "Participants" },
                { value: 19, label: "Ideas Pitched" },
                { value: 9, label: "Teams Formed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                    <CountUp end={stat.value} trigger={!is2024Open} />
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (year === "2023") {
    return (
      <div className="min-h-screen bg-white relative">
        <RocketFollower />

        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={hero2023Gif} alt="2023 edition highlight" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center justify-center">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">2023</h1>
            </div>
          </div>
        </section>

        {/* Single Polaroid Section */}
        <section className="container mx-auto px-4 mb-20 pt-16 relative overflow-hidden">
          <div ref={polaroidSectionRef2023} className="flex flex-col items-center pb-3 px-1">
            {/* Polaroid group with hover animation */}
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
                onMouseEnter={handleHoverStart2023}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left tilted polaroid */}
                <div
                  className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 2
                      ? "opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
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
                      ? "opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <img src={hoverImages2023[1]} alt="2023 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                    <div className="h-8 bg-white"></div>
                  </div>
                </div>

                {/* Main polaroid - raises on hover */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                    hoveredIndex === 2 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                  }`}
                  onClick={() => setIs2023Open((v) => !v)}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                    <img src={mainImage2023} alt="2023 event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                    <div className="h-8 bg-white" />
                  </div>
                </div>
              </div>

            {/* Floating side polaroids - only visible when opened */}
            <div
              className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${is2023Open ? "opacity-100" : "opacity-0"}`}
            >
              {/* Left side polaroids */}
              <div
                className={`absolute top-[100px] left-0 w-32 md:w-40 transition-all duration-700 ease-out ${
                  is2023Open ? "translate-x-[-20%] opacity-70" : "translate-x-[-100%] opacity-0"
                }`}
                style={{
                  transform: is2023Open ? "translateX(-20%) rotate(-15deg)" : "translateX(-100%) rotate(-15deg)",
                  transitionDelay: "100ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages2023[0]} alt="2023 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[350px] left-0 w-28 md:w-36 transition-all duration-700 ease-out ${
                  is2023Open ? "translate-x-[10%] opacity-60" : "translate-x-[-100%] opacity-0"
                }`}
                style={{
                  transform: is2023Open ? "translateX(10%) rotate(8deg)" : "translateX(-100%) rotate(8deg)",
                  transitionDelay: "250ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages2023[1]} alt="2023 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[550px] left-0 w-24 md:w-32 transition-all duration-700 ease-out ${
                  is2023Open ? "translate-x-[-10%] opacity-50" : "translate-x-[-100%] opacity-0"
                }`}
                style={{
                  transform: is2023Open ? "translateX(-10%) rotate(-5deg)" : "translateX(-100%) rotate(-5deg)",
                  transitionDelay: "400ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages2023[2]} alt="2023 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              {/* Right side polaroids */}
              <div
                className={`absolute top-[150px] right-0 w-32 md:w-40 transition-all duration-700 ease-out ${
                  is2023Open ? "translate-x-[20%] opacity-70" : "translate-x-[100%] opacity-0"
                }`}
                style={{
                  transform: is2023Open ? "translateX(20%) rotate(12deg)" : "translateX(100%) rotate(12deg)",
                  transitionDelay: "150ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages2023[3]} alt="2023 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[400px] right-0 w-28 md:w-36 transition-all duration-700 ease-out ${
                  is2023Open ? "translate-x-[-5%] opacity-60" : "translate-x-[100%] opacity-0"
                }`}
                style={{
                  transform: is2023Open ? "translateX(-5%) rotate(-10deg)" : "translateX(100%) rotate(-10deg)",
                  transitionDelay: "300ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages2023[4]} alt="2023 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className={`absolute top-[600px] right-0 w-24 md:w-32 transition-all duration-700 ease-out ${
                  is2023Open ? "translate-x-[15%] opacity-50" : "translate-x-[100%] opacity-0"
                }`}
                style={{
                  transform: is2023Open ? "translateX(15%) rotate(6deg)" : "translateX(100%) rotate(6deg)",
                  transitionDelay: "450ms",
                }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <img src={sideImages2023[5]} alt="2023 event" className="aspect-[4/3] rounded-sm object-cover" />
                  <div className="h-5 bg-white"></div>
                </div>
              </div>
            </div>

            {/* Expandable Card with Photo Gallery */}
            <Card
              className={`hover-lift w-full mx-auto mt-8 transition-all duration-500 ease-out relative z-20 ${
                is2023Open ? "max-w-6xl" : "max-w-md"
              }`}
            >
              <CardContent className={`transition-all duration-500 ${is2023Open ? "p-8" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-500 ${
                    is2023Open ? "text-3xl md:text-4xl mb-8" : "text-2xl"
                  }`}
                >
                  2023
                </p>

                {/* Stats Section */}
                <div
                  className={`grid grid-cols-3 gap-6 md:gap-12 transition-all duration-700 overflow-hidden ${
                    is2023Open ? "max-h-[200px] opacity-100 mb-8 mt-2" : "max-h-0 opacity-0 mb-0 mt-0"
                  }`}
                >
                  {[
                    { value: 50, label: "Participants" },
                    { value: 17, label: "Ideas Pitched" },
                    { value: 14, label: "Teams Formed" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`text-center transition-all duration-500 ${
                        is2023Open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: is2023Open ? `${300 + i * 150}ms` : "0ms" }}
                    >
                      <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                        <CountUp end={stat.value} trigger={is2023Open} />
                      </p>
                      <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    is2023Open
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[2000px] opacity-100 mt-4"
                      : "grid-cols-1 max-h-0 opacity-0"
                  }`}
                >
                  {galleryImages2023.map((img, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500 overflow-hidden ${
                        is2023Open ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: is2023Open ? `${idx * 30}ms` : "0ms",
                      }}
                    >
                      <img src={img} alt={`2023 event photo ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats row below card - fades when gallery opens */}
            <div className={`grid grid-cols-3 gap-12 md:gap-24 mt-12 transition-all duration-500 ${is2023Open ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
              {[
                { value: 50, label: "Participants" },
                { value: 17, label: "Ideas Pitched" },
                { value: 14, label: "Teams Formed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                    <CountUp end={stat.value} trigger={!is2023Open} />
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (year !== "2025") {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">{year}</h1>
        </div>
      </div>
    );
  }

  // State for 2025 dual polaroids
  const [activeEvent, setActiveEvent] = useState<"may" | "october" | null>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const [heroGifIndex, setHeroGifIndex] = useState(0);

  // 2025 May images state
  const [galleryImages2025May, setGalleryImages2025May] = useState(() => shuffleArray(allImages2025May).slice(0, 12));
  const [hoverImages2025May, setHoverImages2025May] = useState(() => shuffleArray(allImages2025May).slice(0, 2));
  const [sideImages2025May, setSideImages2025May] = useState(() => shuffleArray(allImages2025May).slice(0, 6));
  const [mainImage2025May, setMainImage2025May] = useState(() => allImages2025May[Math.floor(Math.random() * allImages2025May.length)]);

  // 2025 October images state
  const [galleryImages2025Oct, setGalleryImages2025Oct] = useState(() => shuffleArray(allImages2025Oct).slice(0, 12));
  const [hoverImages2025Oct, setHoverImages2025Oct] = useState(() => shuffleArray(allImages2025Oct).slice(0, 2));
  const [mainImage2025Oct, setMainImage2025Oct] = useState(() => allImages2025Oct[Math.floor(Math.random() * allImages2025Oct.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroGifIndex((prev) => (prev + 1) % hero2025Gifs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <RocketFollower />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {hero2025Gifs.map((gif, i) => (
            <img
              key={i}
              src={gif}
              alt="2025 edition highlight"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: heroGifIndex === i ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/80 via-dark-grey/70 to-dark-grey/90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-10" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">2025</h1>
          </div>
        </div>
      </section>

      {/* Polaroids Section */}
      <section ref={mainSectionRef} className="container mx-auto px-4 mb-20 pt-16 relative overflow-hidden">
        {/* Floating side polaroids - visible when any event is open */}
        <div
          className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${activeEvent ? "opacity-100" : "opacity-0"}`}
        >
          {/* Left side polaroids */}
          <div
            className={`absolute top-[100px] left-0 w-32 md:w-40 transition-all duration-700 ease-out ${
              activeEvent ? "translate-x-[-20%] opacity-70" : "translate-x-[-100%] opacity-0"
            }`}
            style={{
              transform: activeEvent ? "translateX(-20%) rotate(-15deg)" : "translateX(-100%) rotate(-15deg)",
              transitionDelay: "100ms",
            }}
          >
            <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
              <img src={sideImages2025May[0]} alt="2025 May" className="aspect-[4/3] rounded-sm object-cover" />
              <div className="h-5 bg-white"></div>
            </div>
          </div>

          <div
            className={`absolute top-[350px] left-0 w-28 md:w-36 transition-all duration-700 ease-out ${
              activeEvent ? "translate-x-[10%] opacity-60" : "translate-x-[-100%] opacity-0"
            }`}
            style={{
              transform: activeEvent ? "translateX(10%) rotate(8deg)" : "translateX(-100%) rotate(8deg)",
              transitionDelay: "250ms",
            }}
          >
            <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
              <img src={sideImages2025May[1]} alt="2025 May" className="aspect-[4/3] rounded-sm object-cover" />
              <div className="h-5 bg-white"></div>
            </div>
          </div>

          <div
            className={`absolute top-[550px] left-0 w-24 md:w-32 transition-all duration-700 ease-out ${
              activeEvent ? "translate-x-[-10%] opacity-50" : "translate-x-[-100%] opacity-0"
            }`}
            style={{
              transform: activeEvent ? "translateX(-10%) rotate(-5deg)" : "translateX(-100%) rotate(-5deg)",
              transitionDelay: "400ms",
            }}
          >
            <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
              <img src={sideImages2025May[2]} alt="2025 May" className="aspect-[4/3] rounded-sm object-cover" />
              <div className="h-5 bg-white"></div>
            </div>
          </div>

          {/* Right side polaroids */}
          <div
            className={`absolute top-[150px] right-0 w-32 md:w-40 transition-all duration-700 ease-out ${
              activeEvent ? "translate-x-[20%] opacity-70" : "translate-x-[100%] opacity-0"
            }`}
            style={{
              transform: activeEvent ? "translateX(20%) rotate(12deg)" : "translateX(100%) rotate(12deg)",
              transitionDelay: "150ms",
            }}
          >
            <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
              <img src={sideImages2025May[3]} alt="2025 May" className="aspect-[4/3] rounded-sm object-cover" />
              <div className="h-5 bg-white"></div>
            </div>
          </div>

          <div
            className={`absolute top-[400px] right-0 w-28 md:w-36 transition-all duration-700 ease-out ${
              activeEvent ? "translate-x-[-5%] opacity-60" : "translate-x-[100%] opacity-0"
            }`}
            style={{
              transform: activeEvent ? "translateX(-5%) rotate(-10deg)" : "translateX(100%) rotate(-10deg)",
              transitionDelay: "300ms",
            }}
          >
            <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
              <img src={sideImages2025May[4]} alt="2025 May" className="aspect-[4/3] rounded-sm object-cover" />
              <div className="h-5 bg-white"></div>
            </div>
          </div>

          <div
            className={`absolute top-[600px] right-0 w-24 md:w-32 transition-all duration-700 ease-out ${
              activeEvent ? "translate-x-[15%] opacity-50" : "translate-x-[100%] opacity-0"
            }`}
            style={{
              transform: activeEvent ? "translateX(15%) rotate(6deg)" : "translateX(100%) rotate(6deg)",
              transitionDelay: "450ms",
            }}
          >
            <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
              <img src={sideImages2025May[5]} alt="2025 May" className="aspect-[4/3] rounded-sm object-cover" />
              <div className="h-5 bg-white"></div>
            </div>
          </div>
        </div>

        <div className={`grid items-start gap-8 mb-8 grid-cols-1 transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-10 ${
            activeEvent === "may"
              ? "md:grid-cols-[1fr_0fr]"
              : activeEvent === "october"
                ? "md:grid-cols-[0fr_1fr]"
                : "md:grid-cols-[1fr_1fr]"
          }`}>
          {/* May Polaroid Stack */}
          <div
            className={`min-w-0 overflow-hidden flex flex-col items-center pt-12 pb-3 px-1 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              activeEvent === "october" ? "opacity-0 -translate-x-12 pointer-events-none" : "opacity-100 translate-x-0"
            }`}
          >
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={() => { setHoverImages2025May(shuffleArray(allImages2025May).slice(0, 2)); setHoveredIndex(0); }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
              <div
                className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0
                    ? "opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10"
                    : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <img src={hoverImages2025May[0]} alt="2025 May event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </div>

              {/* Right tilted polaroid */}
              <div
                className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 0
                    ? "opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10"
                    : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <img src={hoverImages2025May[1]} alt="2025 May event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </div>

              {/* Main polaroid - raises on hover */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                  hoveredIndex === 0 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                }`}
                onClick={() => { setGalleryImages2025May(shuffleArray(allImages2025May).slice(0, 12)); setActiveEvent(prev => prev === "may" ? null : "may"); }}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <img src={mainImage2025May} alt="2025 May event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white" />
                </div>
              </div>
            </div>

            {/* Expandable Card with Photo Gallery */}
            <Card
              className={`hover-lift w-full mx-auto mt-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-20 ${
                activeEvent === "may" ? "max-w-6xl" : "max-w-md"
              }`}
            >
              <CardContent className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeEvent === "may" ? "p-8" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeEvent === "may" ? "text-3xl md:text-4xl mb-6" : "text-2xl"
                  }`}
                >
                  May
                </p>

                {/* Stats Section - visible when expanded */}
                <div
                  className={`grid grid-cols-3 gap-6 md:gap-12 transition-all duration-700 overflow-hidden ${
                    activeEvent === "may" ? "max-h-[200px] opacity-100 mb-8 mt-2" : "max-h-0 opacity-0 mb-0 mt-0"
                  }`}
                >
                  {[
                    { value: 50, label: "Participants" },
                    { value: 19, label: "Ideas Pitched" },
                    { value: 10, label: "Teams Formed" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`text-center transition-all duration-500 ${
                        activeEvent === "may" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: activeEvent === "may" ? `${300 + i * 150}ms` : "0ms" }}
                    >
                      <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                        <CountUp end={stat.value} trigger={activeEvent === "may"} />
                      </p>
                      <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeEvent === "may" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                      {galleryImages2025May.map((img, idx) => (
                        <div
                          key={idx}
                          className={`aspect-square rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            activeEvent === "may" ? "scale-100 opacity-100 translate-y-0" : "scale-[0.97] opacity-0 translate-y-3"
                          }`}
                          style={{
                            transitionDelay: activeEvent === "may" ? `${idx * 50}ms` : `${(11 - idx) * 20}ms`,
                          }}
                        >
                          <img src={img} alt={`2025 May photo ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats row below May card - fades when gallery opens */}
            <div className={`grid grid-cols-3 gap-12 md:gap-24 mt-12 transition-all duration-500 ${activeEvent === "may" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
              {[
                { value: 50, label: "Participants" },
                { value: 19, label: "Ideas Pitched" },
                { value: 10, label: "Teams Formed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                    <CountUp end={stat.value} trigger={activeEvent !== "may"} />
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* October Polaroid Stack */}
          <div
            className={`min-w-0 overflow-hidden flex flex-col items-center pt-12 pb-3 px-1 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              activeEvent === "may" ? "opacity-0 translate-x-12 pointer-events-none" : "opacity-100 translate-x-0"
            }`}
          >
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={() => { setHoverImages2025Oct(shuffleArray(allImages2025Oct).slice(0, 2)); setHoveredIndex(1); }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left tilted polaroid */}
              <div
                className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1
                    ? "opacity-100 translate-x-[-60px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10"
                    : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <img src={hoverImages2025Oct[0]} alt="2025 October event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </div>

              {/* Right tilted polaroid */}
              <div
                className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                  hoveredIndex === 1
                    ? "opacity-100 translate-x-[60px] -translate-y-1/2 rotate-[25deg] scale-100 z-10"
                    : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                }`}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                  <img src={hoverImages2025Oct[1]} alt="2025 October event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white"></div>
                </div>
              </div>

              {/* Main polaroid - raises on hover */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                  hoveredIndex === 1 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                }`}
                onClick={() => { setGalleryImages2025Oct(shuffleArray(allImages2025Oct).slice(0, 12)); setActiveEvent(prev => prev === "october" ? null : "october"); }}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <img src={mainImage2025Oct} alt="2025 October event" className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden object-cover" />
                  <div className="h-8 bg-white" />
                </div>
              </div>
            </div>

            {/* Expandable Card with Photo Gallery */}
            <Card
              className={`hover-lift w-full mx-auto mt-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-20 ${
                activeEvent === "october" ? "max-w-6xl" : "max-w-md"
              }`}
            >
              <CardContent className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeEvent === "october" ? "p-8" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeEvent === "october" ? "text-3xl md:text-4xl mb-6" : "text-2xl"
                  }`}
                >
                  October
                </p>

                {/* Stats Section - visible when expanded */}
                <div
                  className={`grid grid-cols-3 gap-6 md:gap-12 transition-all duration-700 overflow-hidden ${
                    activeEvent === "october" ? "max-h-[200px] opacity-100 mb-8 mt-2" : "max-h-0 opacity-0 mb-0 mt-0"
                  }`}
                >
                  {[
                    { value: 50, label: "Participants" },
                    { value: 21, label: "Ideas Pitched" },
                    { value: 10, label: "Teams Formed" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`text-center transition-all duration-500 ${
                        activeEvent === "october" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: activeEvent === "october" ? `${300 + i * 150}ms` : "0ms" }}
                    >
                      <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                        <CountUp end={stat.value} trigger={activeEvent === "october"} />
                      </p>
                      <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeEvent === "october" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                      {galleryImages2025Oct.map((img, idx) => (
                        <div
                          key={idx}
                          className={`aspect-square rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            activeEvent === "october" ? "scale-100 opacity-100 translate-y-0" : "scale-[0.97] opacity-0 translate-y-3"
                          }`}
                          style={{
                            transitionDelay: activeEvent === "october" ? `${idx * 50}ms` : `${(11 - idx) * 20}ms`,
                          }}
                        >
                          <img src={img} alt={`2025 October photo ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats row below October card - fades when gallery opens */}
            <div className={`grid grid-cols-3 gap-12 md:gap-24 mt-12 transition-all duration-500 ${activeEvent === "october" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
              {[
                { value: 50, label: "Participants" },
                { value: 21, label: "Ideas Pitched" },
                { value: 10, label: "Teams Formed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-[#5ad1fc]">
                    <CountUp end={stat.value} trigger={activeEvent !== "october"} />
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastEditionDetail;
