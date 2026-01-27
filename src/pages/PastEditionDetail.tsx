import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { RocketFollower } from "@/components/RocketFollower";
import heroBackground from "@/assets/hero-background.jpg";
import polaroidHackathon from "@/assets/2024/polaroid-hackathon.jpg";

const PastEditionDetail = () => {
  const { year } = useParams<{ year: string }>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<"may" | "october" | null>(null);
  const photoSectionRef = useRef<HTMLDivElement>(null);

  const [is2024Open, setIs2024Open] = useState(false);

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
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroBackground})`,
              filter: "brightness(0.7)",
            }}
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center gap-4 md:gap-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">2024</h1>
            </div>
          </div>
        </section>

        {/* Single Polaroid Section */}
        <section className="container mx-auto px-4 mb-20 pt-16 relative overflow-hidden">
          <div className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(0)}
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                    <img src={polaroidHackathon} alt="Startup Weekend 2024" className="w-full h-full object-cover" />
                  </div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
              <CardContent className={`transition-all duration-500 ${is2024Open ? "p-5" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-500 ${
                    is2024Open ? "text-3xl md:text-4xl mb-8" : "text-2xl"
                  }`}
                >
                  2024
                </p>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    is2024Open
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[2000px] opacity-100 mt-4"
                      : "grid-cols-1 max-h-0 opacity-0"
                  }`}
                >
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500 ${
                        is2024Open ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: is2024Open ? `${idx * 30}ms` : "0ms",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Photo {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  const [is2023Open, setIs2023Open] = useState(false);

  if (year === "2023") {
    return (
      <div className="min-h-screen bg-white relative">
        <RocketFollower />

        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroBackground})`,
              filter: "brightness(0.7)",
            }}
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center gap-4 md:gap-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">2023</h1>
            </div>
          </div>
        </section>

        {/* Single Polaroid Section */}
        <section className="container mx-auto px-4 mb-20 pt-16 relative overflow-hidden">
          <div className="flex flex-col items-center">
            {/* Polaroid group with hover animation */}
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(2)}
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
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

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    is2023Open
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[2000px] opacity-100 mt-4"
                      : "grid-cols-1 max-h-0 opacity-0"
                  }`}
                >
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500 ${
                        is2023Open ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: is2023Open ? `${idx * 30}ms` : "0ms",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Photo {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
  const [isMayOpen, setIsMayOpen] = useState(false);
  const [isOctoberOpen, setIsOctoberOpen] = useState(false);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  const handleMayClick = (fromBottom: boolean = false) => {
    if (isMayOpen) {
      // Close May with scroll to top
      mainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        setIsMayOpen(false);
      }, 200);
    } else if (isOctoberOpen) {
      // Switch from October to May - scroll to top first
      mainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        setIsOctoberOpen(false);
        setIsMayOpen(true);
      }, 300);
    } else {
      // Open May
      if (fromBottom) {
        mainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          setIsMayOpen(true);
        }, 300);
      } else {
        setIsMayOpen(true);
      }
    }
  };

  const handleOctoberClick = (fromBottom: boolean = false) => {
    if (isOctoberOpen) {
      // Close October with scroll to top
      mainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        setIsOctoberOpen(false);
      }, 200);
    } else if (isMayOpen) {
      // Switch from May to October - scroll to top first
      mainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        setIsMayOpen(false);
        setIsOctoberOpen(true);
      }, 300);
    } else {
      // Open October
      if (fromBottom) {
        mainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          setIsOctoberOpen(true);
        }, 300);
      } else {
        setIsOctoberOpen(true);
      }
    }
  };

  const activeEvent = isMayOpen ? "may" : isOctoberOpen ? "october" : null;

  return (
    <div className="min-h-screen bg-white relative">
      <RocketFollower />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBackground})`,
            filter: "brightness(0.7)",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-4 md:gap-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">2025</h1>
          </div>
        </div>
      </section>

      {/* Polaroids Section */}
      <section ref={mainSectionRef} className="container mx-auto px-4 mb-20 pt-16 relative overflow-hidden">
        {/* No event selected - show both side by side */}
        {!activeEvent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* May Polaroid Stack */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
                onMouseEnter={() => setHoveredIndex(0)}
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
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-8 bg-white"></div>
                  </div>
                </div>

                {/* Main polaroid - raises on hover */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                    hoveredIndex === 0 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                  }`}
                  onClick={() => handleMayClick(false)}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-8 bg-white" />
                  </div>
                </div>
              </div>
              <Card className="hover-lift w-full max-w-md mx-auto mt-8 relative z-20">
                <CardContent className="p-6">
                  <p className="text-center font-bold text-black text-2xl">May</p>
                </CardContent>
              </Card>
            </div>

            {/* October Polaroid Stack */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
                onMouseEnter={() => setHoveredIndex(1)}
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
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-8 bg-white"></div>
                  </div>
                </div>

                {/* Main polaroid - raises on hover */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                    hoveredIndex === 1 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                  }`}
                  onClick={() => handleOctoberClick(false)}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-8 bg-white" />
                  </div>
                </div>
              </div>
              <Card className="hover-lift w-full max-w-md mx-auto mt-8 relative z-20">
                <CardContent className="p-6">
                  <p className="text-center font-bold text-black text-2xl">October</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* May selected - show May expanded at top, October small at bottom */}
        {activeEvent === "may" && (
          <div className="flex flex-col items-center">
            {/* Floating side polaroids */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Left side polaroids */}
              <div
                className="absolute top-[100px] left-0 w-32 md:w-40 transition-all duration-700 ease-out opacity-70"
                style={{ transform: "translateX(-20%) rotate(-15deg)", transitionDelay: "100ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[350px] left-0 w-28 md:w-36 transition-all duration-700 ease-out opacity-60"
                style={{ transform: "translateX(10%) rotate(8deg)", transitionDelay: "250ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[550px] left-0 w-24 md:w-32 transition-all duration-700 ease-out opacity-50"
                style={{ transform: "translateX(-10%) rotate(-5deg)", transitionDelay: "400ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              {/* Right side polaroids */}
              <div
                className="absolute top-[150px] right-0 w-32 md:w-40 transition-all duration-700 ease-out opacity-70"
                style={{ transform: "translateX(20%) rotate(12deg)", transitionDelay: "150ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[400px] right-0 w-28 md:w-36 transition-all duration-700 ease-out opacity-60"
                style={{ transform: "translateX(-5%) rotate(-10deg)", transitionDelay: "300ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[600px] right-0 w-24 md:w-32 transition-all duration-700 ease-out opacity-50"
                style={{ transform: "translateX(15%) rotate(6deg)", transitionDelay: "450ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>
            </div>

            {/* May expanded polaroid and card */}
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(0)}
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>

              {/* Main polaroid */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                  hoveredIndex === 0 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                }`}
                onClick={() => handleMayClick(false)}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                  <div className="h-8 bg-white" />
                </div>
              </div>
            </div>

            {/* May expanded card with gallery */}
            <Card
              className={`hover-lift w-full mx-auto mt-8 transition-all duration-500 ease-out relative z-20 ${
                isMayOpen ? "max-w-6xl" : "max-w-md"
              }`}
            >
              <CardContent className={`transition-all duration-500 ${isMayOpen ? "p-8" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-500 ${
                    isMayOpen ? "text-3xl md:text-4xl mb-8" : "text-2xl"
                  }`}
                >
                  May
                </p>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    isMayOpen
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[2000px] opacity-100 mt-4"
                      : "grid-cols-1 max-h-0 opacity-0"
                  }`}
                >
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500 ${
                        isMayOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMayOpen ? `${idx * 30}ms` : "0ms",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Photo {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* October mini polaroid at bottom */}
            <div ref={bottomSectionRef} className="mt-16 flex flex-col items-center">
              <div
                className="relative w-48 md:w-56 h-[200px] md:h-[220px] cursor-pointer"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleOctoberClick(true)}
              >
                {/* Left tilted polaroid */}
                <div
                  className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 1
                      ? "opacity-100 translate-x-[-40px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm w-32 md:w-40">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-6 bg-white"></div>
                  </div>
                </div>

                {/* Right tilted polaroid */}
                <div
                  className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 1
                      ? "opacity-100 translate-x-[40px] -translate-y-1/2 rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm w-32 md:w-40">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-6 bg-white"></div>
                  </div>
                </div>

                {/* Main polaroid */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 1 ? "-translate-y-[calc(50%+30px)] z-30" : "-translate-y-1/2 z-10"
                  }`}
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-6 bg-white" />
                  </div>
                </div>
              </div>
              <Card className="hover-lift w-full max-w-xs mx-auto mt-[80px]">
                <CardContent className="p-4">
                  <p className="text-center font-bold text-black text-xl">October</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* October selected - show October expanded at top, May small at bottom */}
        {activeEvent === "october" && (
          <div className="flex flex-col items-center">
            {/* Floating side polaroids */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Left side polaroids */}
              <div
                className="absolute top-[100px] left-0 w-32 md:w-40 transition-all duration-700 ease-out opacity-70"
                style={{ transform: "translateX(-20%) rotate(-15deg)", transitionDelay: "100ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[350px] left-0 w-28 md:w-36 transition-all duration-700 ease-out opacity-60"
                style={{ transform: "translateX(10%) rotate(8deg)", transitionDelay: "250ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[550px] left-0 w-24 md:w-32 transition-all duration-700 ease-out opacity-50"
                style={{ transform: "translateX(-10%) rotate(-5deg)", transitionDelay: "400ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              {/* Right side polaroids */}
              <div
                className="absolute top-[150px] right-0 w-32 md:w-40 transition-all duration-700 ease-out opacity-70"
                style={{ transform: "translateX(20%) rotate(12deg)", transitionDelay: "150ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[400px] right-0 w-28 md:w-36 transition-all duration-700 ease-out opacity-60"
                style={{ transform: "translateX(-5%) rotate(-10deg)", transitionDelay: "300ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>

              <div
                className="absolute top-[600px] right-0 w-24 md:w-32 transition-all duration-700 ease-out opacity-50"
                style={{ transform: "translateX(15%) rotate(6deg)", transitionDelay: "450ms" }}
              >
                <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                  <div className="aspect-[4/3] bg-gray-200 rounded-sm"></div>
                  <div className="h-5 bg-white"></div>
                </div>
              </div>
            </div>

            {/* October expanded polaroid and card */}
            <div
              className="relative w-64 md:w-80 h-[280px] md:h-[320px]"
              onMouseEnter={() => setHoveredIndex(1)}
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
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
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                  <div className="h-8 bg-white"></div>
                </div>
              </div>

              {/* Main polaroid */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
                  hoveredIndex === 1 ? "-translate-y-[calc(50%+40px)] z-30" : "-translate-y-1/2 z-10"
                }`}
                onClick={() => handleOctoberClick(false)}
              >
                <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-64 md:w-80">
                  <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                  <div className="h-8 bg-white" />
                </div>
              </div>
            </div>

            {/* October expanded card with gallery */}
            <Card
              className={`hover-lift w-full mx-auto mt-8 transition-all duration-500 ease-out relative z-20 ${
                isOctoberOpen ? "max-w-6xl" : "max-w-md"
              }`}
            >
              <CardContent className={`transition-all duration-500 ${isOctoberOpen ? "p-8" : "p-6"}`}>
                <p
                  className={`text-center font-bold text-black transition-all duration-500 ${
                    isOctoberOpen ? "text-3xl md:text-4xl mb-8" : "text-2xl"
                  }`}
                >
                  October
                </p>

                {/* Photo Gallery - expands on click */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    isOctoberOpen
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[2000px] opacity-100 mt-4"
                      : "grid-cols-1 max-h-0 opacity-0"
                  }`}
                >
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500 ${
                        isOctoberOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOctoberOpen ? `${idx * 30}ms` : "0ms",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Photo {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* May mini polaroid at bottom */}
            <div ref={bottomSectionRef} className="mt-16 flex flex-col items-center">
              <div
                className="relative w-48 md:w-56 h-[200px] md:h-[220px] cursor-pointer"
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleMayClick(true)}
              >
                {/* Left tilted polaroid */}
                <div
                  className={`absolute left-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 0
                      ? "opacity-100 translate-x-[-40px] -translate-y-1/2 -rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm w-32 md:w-40">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-6 bg-white"></div>
                  </div>
                </div>

                {/* Right tilted polaroid */}
                <div
                  className={`absolute right-0 top-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 0
                      ? "opacity-100 translate-x-[40px] -translate-y-1/2 rotate-[25deg] scale-100 z-10"
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm w-32 md:w-40">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-6 bg-white"></div>
                  </div>
                </div>

                {/* Main polaroid */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${
                    hoveredIndex === 0 ? "-translate-y-[calc(50%+30px)] z-30" : "-translate-y-1/2 z-10"
                  }`}
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[3px_3px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
                    <div className="h-6 bg-white" />
                  </div>
                </div>
              </div>
              <Card className="hover-lift w-full max-w-xs mx-auto mt-[80px]">
                <CardContent className="p-4">
                  <p className="text-center font-bold text-black text-xl">May</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PastEditionDetail;
