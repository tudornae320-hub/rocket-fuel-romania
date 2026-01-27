import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { RocketFollower } from "@/components/RocketFollower";
import heroBackground from "@/assets/hero-background.jpg";
import polaroidHackathon from "@/assets/2024/polaroid-hackathon.jpg";

const PastEditionDetail = () => {
  const { year } = useParams<{ year: string }>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<'may' | 'october' | null>(null);
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
  const handlePolaroidClick = (event: 'may' | 'october') => {
    if (selectedEvent === event) {
      // If clicking on the already selected event, close it
      setSelectedEvent(null);
    } else {
      // If switching from one event to another, scroll to top first
      if (selectedEvent !== null) {
        photoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          setSelectedEvent(event);
          // After switching, scroll back to the polaroid section
          setTimeout(() => {
            photoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    event: 'may' | 'october',
    polaroidRef: React.RefObject<HTMLDivElement>,
    handleHover: () => void,
    index: number,
    isExpanded: boolean = false
  ) => {
    const isSelected = selectedEvent === event;
    const eventName = event === 'may' ? 'May' : 'October';
    
    return (
      <div 
        className={`flex flex-col items-center transition-all duration-700 ${
          isExpanded ? 'w-full max-w-4xl' : ''
        }`}
      >
        <div
          ref={polaroidRef}
          className={`relative mb-0 transition-all duration-700 ${
            isExpanded ? 'w-full max-w-2xl h-[400px] md:h-[500px]' :
            'w-64 md:w-80 h-[280px] md:h-[320px]'
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handlePolaroidClick(event)}
        >
          {/* Left tilted polaroid */}
          <div 
            className={`absolute top-1/2 transition-all duration-500 ease-out ${
              isExpanded ? 'left-[10%]' : 'left-0'
            } ${
              hoveredIndex === index 
                ? `opacity-100 -translate-y-1/2 -rotate-[25deg] scale-100 z-10 ${isExpanded ? 'translate-x-[-30px]' : 'translate-x-[-60px]'}` 
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
            className={`absolute top-1/2 transition-all duration-500 ease-out ${
              isExpanded ? 'right-[10%]' : 'right-0'
            } ${
              hoveredIndex === index 
                ? `opacity-100 -translate-y-1/2 rotate-[25deg] scale-100 z-10 ${isExpanded ? 'translate-x-[30px]' : 'translate-x-[60px]'}` 
                : 'opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0'
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
              hoveredIndex === index
                ? 'translate-y-[-40px] z-30' 
                : 'translate-y-0 z-10'
            }`}
          >
            <div className={`bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm transition-all duration-700 ${
              isExpanded ? 'w-full max-w-2xl' : 'w-64 md:w-80'
            }`}>
              <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden bg-gray-200"></div>
              <div className="h-8 bg-white"></div>
            </div>
          </div>
        </div>
        
        <Card className={`hover-lift w-full mx-auto transition-all duration-700 ${
          isExpanded ? 'max-w-6xl mt-[60px] md:mt-[80px]' : 'max-w-md mt-[120px] md:mt-[140px]'
        }`}>
          <CardContent className={`transition-all duration-700 ${
            isExpanded ? 'p-8' : 'p-6'
          }`}>
            <p className={`text-center font-bold text-black transition-all duration-700 ${
              isExpanded ? 'text-3xl md:text-4xl mb-8' : 'text-2xl'
            }`}>
              {eventName}
            </p>
            
            {/* Photo Gallery - only shown when expanded */}
            <div 
              ref={isExpanded ? photoGalleryRef : null}
              className={`overflow-hidden transition-all duration-700 ${
                isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 ${
                isExpanded ? 'translate-y-0 scale-100' : 'translate-y-[-20px] scale-95'
              }`}>
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500`}
                    style={{
                      transitionDelay: isExpanded ? `${idx * 30}ms` : '0ms'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Photo {idx + 1}
                    </div>
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
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">
                2024
              </h1>
            </div>
          </div>
        </section>

        {/* Single Polaroid Section (match 2025 May expanded layout/spacing) */}
        <section className="container mx-auto px-4 mb-20 pt-16 relative">
          <div className="relative flex flex-col items-center gap-16">
            {/* Decorative floating polaroids (only when open) */}
            {is2024Open && (
              <>
                <div
                  className="absolute top-0 left-0 w-40 md:w-48 animate-float-in-left"
                  style={
                    {
                      "--translate-x": "-50%",
                      "--translate-y": "80px",
                      "--rotate": "-15deg",
                      "--opacity": "0.7",
                    } as React.CSSProperties
                  }
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                    <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden" />
                    <div className="h-6 bg-white" />
                  </div>
                </div>

                <div
                  className="absolute top-40 right-0 w-40 md:w-48 animate-float-in-right"
                  style={
                    {
                      "--translate-x": "50%",
                      "--translate-y": "40px",
                      "--rotate": "12deg",
                      "--opacity": "0.7",
                    } as React.CSSProperties
                  }
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                    <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden" />
                    <div className="h-6 bg-white" />
                  </div>
                </div>

                <div
                  className="absolute top-[500px] left-0 w-36 md:w-44 animate-float-in-left"
                  style={
                    {
                      "--translate-x": "-33%",
                      "--translate-y": "0px",
                      "--rotate": "8deg",
                      "--opacity": "0.6",
                      animationDelay: "200ms",
                    } as React.CSSProperties
                  }
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                    <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden" />
                    <div className="h-6 bg-white" />
                  </div>
                </div>

                <div
                  className="absolute top-[600px] right-0 w-36 md:w-44 animate-float-in-right"
                  style={
                    {
                      "--translate-x": "33%",
                      "--translate-y": "0px",
                      "--rotate": "-10deg",
                      "--opacity": "0.6",
                      animationDelay: "300ms",
                    } as React.CSSProperties
                  }
                >
                  <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                    <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden" />
                    <div className="h-6 bg-white" />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col items-center w-full max-w-4xl">
              <div
                ref={polaroid2024Ref}
                className={`relative mb-0 transition-all duration-700 ${
                  is2024Open
                    ? "w-full max-w-2xl h-[400px] md:h-[500px]"
                    : "w-64 md:w-80 h-[280px] md:h-[320px]"
                }`}
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setIs2024Open((v) => !v)}
              >
                {/* Left tilted polaroid */}
                <div
                  className={`absolute top-1/2 transition-all duration-500 ease-out ${
                    is2024Open ? "left-[10%]" : "left-0"
                  } ${
                    hoveredIndex === 0
                      ? `opacity-100 -translate-y-1/2 -rotate-[25deg] scale-100 z-10 ${
                          is2024Open ? "translate-x-[-30px]" : "translate-x-[-60px]"
                        }`
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                      <img src={polaroidHackathon} alt="Startup Weekend 2024" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-8 bg-white" />
                  </div>
                </div>

                {/* Right tilted polaroid */}
                <div
                  className={`absolute top-1/2 transition-all duration-500 ease-out ${
                    is2024Open ? "right-[10%]" : "right-0"
                  } ${
                    hoveredIndex === 0
                      ? `opacity-100 -translate-y-1/2 rotate-[25deg] scale-100 z-10 ${
                          is2024Open ? "translate-x-[30px]" : "translate-x-[60px]"
                        }`
                      : "opacity-0 translate-x-0 -translate-y-1/2 translate-y-[20px] rotate-0 scale-95 z-0"
                  }`}
                >
                  <div className="bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm w-48 md:w-56">
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                      <img src={polaroidHackathon} alt="Startup Weekend 2024" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-8 bg-white" />
                  </div>
                </div>

                {/* Main polaroid - stays in place */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out cursor-pointer z-20"
                >
                  <div
                    className={`bg-white p-3 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm transition-all duration-700 ${
                      is2024Open ? "w-full max-w-2xl" : "w-64 md:w-80"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full mb-2 rounded-sm overflow-hidden">
                      <img src={polaroidHackathon} alt="Startup Weekend 2024" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-8 bg-white" />
                  </div>
                </div>
              </div>

              <Card
                className={`hover-lift w-full mx-auto transition-all duration-700 ${
                  is2024Open
                    ? "max-w-6xl mt-[60px] md:mt-[80px]"
                    : "max-w-md mt-[120px] md:mt-[140px]"
                }`}
              >
                <CardContent className={`transition-all duration-700 ${is2024Open ? "p-8" : "p-6"}`}>
                  <p
                    className={`text-center font-bold text-black transition-all duration-700 ${
                      is2024Open ? "text-3xl md:text-4xl mb-8" : "text-2xl"
                    }`}
                  >
                    2024
                  </p>

                  {/* Photo Gallery (same animation as 2025 May expanded card) */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      is2024Open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div
                      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 ${
                        is2024Open ? "translate-y-0 scale-100" : "translate-y-[-20px] scale-95"
                      }`}
                    >
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="aspect-square bg-gray-200 rounded-sm border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] transition-all duration-500"
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
                  </div>
                </CardContent>
              </Card>
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
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
            {year}
          </h1>
        </div>
      </div>
    );
  }

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
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight">
              2025
            </h1>
          </div>
        </div>
      </section>

      {/* Polaroids Section */}
      <section ref={photoSectionRef} className="container mx-auto px-4 mb-20 pt-16 relative">
        {/* No event selected - show both side by side */}
        {!selectedEvent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {renderPolaroid('may', polaroid1Ref, handlePolaroid1Hover, 0)}
            {renderPolaroid('october', polaroid2Ref, handlePolaroid2Hover, 1)}
          </div>
        )}

        {/* May selected */}
        {selectedEvent === 'may' && (
          <div className="relative flex flex-col items-center gap-16">
            {/* Decorative floating polaroids */}
            <div 
              className="absolute top-0 left-0 w-40 md:w-48 animate-float-in-left" 
              style={{ 
                '--translate-x': '-50%',
                '--translate-y': '80px',
                '--rotate': '-15deg',
                '--opacity': '0.7'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            <div 
              className="absolute top-40 right-0 w-40 md:w-48 animate-float-in-right" 
              style={{ 
                '--translate-x': '50%',
                '--translate-y': '40px',
                '--rotate': '12deg',
                '--opacity': '0.7'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            <div 
              className="absolute top-[500px] left-0 w-36 md:w-44 animate-float-in-left" 
              style={{ 
                '--translate-x': '-33%',
                '--translate-y': '0px',
                '--rotate': '8deg',
                '--opacity': '0.6',
                animationDelay: '200ms'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            <div 
              className="absolute top-[600px] right-0 w-36 md:w-44 animate-float-in-right" 
              style={{ 
                '--translate-x': '33%',
                '--translate-y': '0px',
                '--rotate': '-10deg',
                '--opacity': '0.6',
                animationDelay: '300ms'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            {renderPolaroid('may', polaroid1Ref, handlePolaroid1Hover, 0, true)}
            {renderPolaroid('october', polaroid2Ref, handlePolaroid2Hover, 1, false)}
          </div>
        )}

        {/* October selected */}
        {selectedEvent === 'october' && (
          <div className="relative flex flex-col items-center gap-16">
            {/* Decorative floating polaroids */}
            <div 
              className="absolute top-0 left-0 w-40 md:w-48 animate-float-in-left" 
              style={{ 
                '--translate-x': '-50%',
                '--translate-y': '80px',
                '--rotate': '-15deg',
                '--opacity': '0.7'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            <div 
              className="absolute top-40 right-0 w-40 md:w-48 animate-float-in-right" 
              style={{ 
                '--translate-x': '50%',
                '--translate-y': '40px',
                '--rotate': '12deg',
                '--opacity': '0.7'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            <div 
              className="absolute top-[500px] left-0 w-36 md:w-44 animate-float-in-left" 
              style={{ 
                '--translate-x': '-33%',
                '--translate-y': '0px',
                '--rotate': '8deg',
                '--opacity': '0.6',
                animationDelay: '200ms'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            <div 
              className="absolute top-[600px] right-0 w-36 md:w-44 animate-float-in-right" 
              style={{ 
                '--translate-x': '33%',
                '--translate-y': '0px',
                '--rotate': '-10deg',
                '--opacity': '0.6',
                animationDelay: '300ms'
              } as React.CSSProperties}
            >
              <div className="bg-white p-2 border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] rounded-sm">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden"></div>
                <div className="h-6 bg-white"></div>
              </div>
            </div>
            
            {renderPolaroid('october', polaroid2Ref, handlePolaroid2Hover, 1, true)}
            {renderPolaroid('may', polaroid1Ref, handlePolaroid1Hover, 0, false)}
          </div>
        )}
      </section>
    </div>
  );
};

export default PastEditionDetail;
