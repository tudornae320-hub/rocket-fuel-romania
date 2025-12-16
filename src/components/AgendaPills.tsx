import { useState, useEffect, useRef } from "react";

const agendaData = {
  friday: {
    label: "Friday",
    initial: "F",
    events: [
      { time: "18:00 - 18:30", title: "Registration", desc: "Arrive at the venue and get checked in" },
      { time: "18:30 - 19:00", title: "Dinner & networking", desc: "Eat food, share ideas, practice pitches, and get to know your fellow participants" },
      { time: "19:00 - 19:30", title: "Welcome", desc: "Meet our Techstars facilitator and review agenda for the weekend" },
      { time: "19:30 - 20:00", title: "Pitches", desc: "Facilitator gives a walk-through of the pitching process and then pitches begin! Optionally line up to give your pitch" },
      { time: "20:00 - 20:30", title: "Vote for top pitches and form teams", desc: "Network, share questions, vote for the top pitches and form teams" },
      { time: "20:30 - 21:30", title: "Workshop: From Idea to Reality", desc: "Learn how to validate your idea and start building" },
      { time: "21:30 - Late", title: "Start building!", desc: "Set up your team workspace for the weekend and start work on the idea. You may stay as late as the venue will allow" },
    ],
  },
  saturday: {
    label: "Saturday",
    initial: "S",
    events: [
      { time: "09:00 - 09:30", title: "Breakfast", desc: "Start strong with breakfast at the venue" },
      { time: "10:30 - 11:30", title: "Workshop: GTM Strategy", desc: "Learn go-to-market strategy with Alex Gavril, CEO ▲ promocrat" },
      { time: "13:00 - 14:00", title: "Lunch", desc: "Take a well-earned break and recharge" },
      { time: "14:00 - 17:00", title: "Mentoring sessions", desc: "Get feedback and support from mentors one-on-one" },
      { time: "18:00 - 18:30", title: "Talk: The story of Planable", desc: "Behind-the-scenes with Nicolae Gudumac (Founder & CTO)" },
      { time: "19:00 - 19:30", title: "Dinner", desc: "Refuel and chat with other teams" },
      { time: "21:00 - Late", title: "Night Sprint", desc: "Build, iterate, repeat. Venue stays open late" },
    ],
  },
  sunday: {
    label: "Sunday",
    initial: "S",
    events: [
      { time: "09:30 - 10:00", title: "Breakfast", desc: "Grab breakfast and prep for the final sprint" },
      { time: "10:30 - 11:30", title: "Pitching Workshop", desc: "Craft a compelling pitch with Cosmin Pirvu from Veridion" },
      { time: "12:00 - 13:00", title: "Pitch Practice", desc: "Test your pitch, get feedback, boost confidence" },
      { time: "13:00 - 14:00", title: "Lunch", desc: "Fuel up one last time before the big moment" },
      { time: "14:00 - 15:00", title: "Pitch Prep & Tech Check", desc: "Final polish and make sure everything works" },
      { time: "15:00 - 17:00", title: "Final Presentations", desc: "5 min pitch + 5 min Q&A with the jury. Show what you built!" },
      { time: "17:00 - 19:00", title: "Awards & After Party", desc: "Celebrate an unforgettable weekend together!" },
    ],
  },
};

type DayKey = keyof typeof agendaData;

export const AgendaPills = () => {
  const [selectedDay, setSelectedDay] = useState<DayKey>("friday");
  const [isVisible, setIsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const days: DayKey[] = ["friday", "saturday", "sunday"];

  useEffect(() => {
    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section is visible - open smoothly
          if (!isVisible) {
            setIsVisible(true);
            setTimeout(() => setShowDropdown(true), 300);
          }
        } else {
          // Section is not visible - only close if scrolling up
          if (scrollDirection.current === 'up' && (isVisible || showDropdown)) {
            setShowDropdown(false);
            setTimeout(() => setIsVisible(false), 500); // Wait for close animation to finish
          }
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, showDropdown]);

  return (
    <div ref={sectionRef} className="max-w-3xl mx-auto">
      {/* Unified Card Container */}
      <div className="bg-card rounded-2xl border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] overflow-hidden">
        {/* Header */}
        <div className="text-center py-8 px-6 border-b border-[#000000]">
          <h2 
            className={`
              text-4xl md:text-5xl font-bold mb-2 transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            Agenda
          </h2>
          <p 
            className={`
              text-lg text-muted-foreground transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            Your 54-hour journey
          </p>
        </div>

        {/* Dropdown Content */}
        <div 
          className={`
            transition-all duration-500 ease-in-out overflow-hidden
            ${showDropdown ? "max-h-[2000px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}
          `}
        >
          {/* Day Tabs */}
          <div 
            className={`
              py-6 px-6 flex justify-center border-b border-[#000000] overflow-hidden
              transition-all duration-500 ease-in-out
              ${showDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
          >
            <div className="flex items-center justify-center gap-3">
              {days.map((day, index) => {
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`
                      relative rounded-xl font-bold transition-all duration-500 ease-out transform shrink-0
                      ${isSelected 
                        ? "px-10 py-4 bg-primary text-primary-foreground text-lg min-w-[160px] shadow-lg z-10" 
                        : "w-14 h-14 bg-card border-2 border-[#000000] text-muted-foreground hover:border-primary hover:text-primary hover:scale-110 text-xl"
                      }
                      active:scale-95
                    `}
                  >
                    <span className="inline-block transition-all duration-300">
                      {isSelected ? agendaData[day].label : agendaData[day].initial}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events List */}
          <div 
            key={selectedDay}
            className={`
              transition-all duration-500 ease-in-out
              ${showDropdown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {agendaData[selectedDay].events.map((event, idx) => (
              <div 
                key={`${selectedDay}-${idx}`}
                className={`
                  flex gap-6 p-5 transition-all duration-300
                  ${idx !== agendaData[selectedDay].events.length - 1 ? "border-b border-[#000000]" : ""}
                `}
                style={{ 
                  animation: showDropdown ? `fade-in 0.4s ease-out ${idx * 50 + 200}ms both` : 'none'
                }}
              >
                <div className="min-w-[110px] text-sm text-muted-foreground font-medium pt-0.5">
                  {event.time}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-1">{event.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
