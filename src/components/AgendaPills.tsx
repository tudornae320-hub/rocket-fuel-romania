import { useState } from "react";

const agendaData = {
  friday: {
    label: "Friday",
    initial: "F",
    events: [
      { time: "18:00 – 18:30", title: "Registration", desc: "Welcome to Startup Weekend! Check in, grab your badge, and meet the crew." },
      { time: "18:30 – 19:00", title: "Dinner & networking", desc: "Fuel up and mingle! Share ideas and chat with potential teammates." },
      { time: "19:00 – 19:30", title: "Welcome", desc: "Our Techstars facilitator walks you through the weekend." },
      { time: "19:30 – 20:00", title: "Pitches", desc: "60 seconds to share your idea and rally a team." },
      { time: "20:00 – 20:30", title: "Vote & form teams", desc: "Vote on favorite ideas and join a team." },
      { time: "20:30 – 21:30", title: "Startup Ideation Workshop", desc: "Shape great startup ideas with Alex Dascalu (Founder Institute)." },
      { time: "21:30 – Late", title: "Start building!", desc: "Dive into brainstorming, planning, and MVP madness." },
    ],
  },
  saturday: {
    label: "Saturday",
    initial: "S",
    events: [
      { time: "09:00 – 09:30", title: "Breakfast", desc: "Start strong with breakfast at the venue." },
      { time: "10:30 – 11:30", title: "Workshop: GTM Strategy", desc: "Learn go-to-market strategy with Alex Gavril, CEO ▲ promocrat." },
      { time: "13:00 – 14:00", title: "Lunch", desc: "Take a well-earned break and recharge." },
      { time: "14:00 – 17:00", title: "Mentoring sessions", desc: "Get feedback and support from mentors one-on-one." },
      { time: "18:00 – 18:30", title: "Talk: The story of Planable", desc: "Behind-the-scenes with Nicolae Gudumac (Founder & CTO)." },
      { time: "19:00 – 19:30", title: "Dinner", desc: "Refuel and chat with other teams." },
      { time: "21:00 – Late", title: "Night Sprint", desc: "Build, iterate, repeat. Venue stays open late." },
    ],
  },
  sunday: {
    label: "Sunday",
    initial: "S",
    events: [
      { time: "09:30 – 10:00", title: "Breakfast", desc: "Grab breakfast and prep for the final sprint." },
      { time: "10:30 – 11:30", title: "Pitching Workshop", desc: "Craft a compelling pitch with Cosmin Pirvu from Veridion." },
      { time: "12:00 – 13:00", title: "Pitch Practice", desc: "Test your pitch, get feedback, boost confidence." },
      { time: "13:00 – 14:00", title: "Lunch", desc: "Fuel up one last time before the big moment." },
      { time: "14:00 – 15:00", title: "Pitch Prep & Tech Check", desc: "Final polish and make sure everything works." },
      { time: "15:00 – 17:00", title: "Final Pitches", desc: "Show off your startup to the jury and audience!" },
      { time: "17:00 – 18:00", title: "Awards & Closing", desc: "Celebrate winners, recap the weekend, make connections." },
    ],
  },
};

type DayKey = keyof typeof agendaData;

export const AgendaPills = () => {
  const [selectedDay, setSelectedDay] = useState<DayKey | null>(null);
  const days: DayKey[] = ["friday", "saturday", "sunday"];

  const handleDayClick = (day: DayKey) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  const getSlideClass = (day: DayKey) => {
    if (!selectedDay) return "translate-x-0";
    
    const selectedIndex = days.indexOf(selectedDay);
    const currentIndex = days.indexOf(day);
    
    if (day === selectedDay) return "translate-x-0";
    
    // Fri clicked → Sat & Sun right
    // Sat clicked → Fri left, Sun right
    // Sun clicked → Fri & Sat left
    if (currentIndex < selectedIndex) {
      return "-translate-x-[150%] opacity-0";
    } else {
      return "translate-x-[150%] opacity-0";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Pills Container */}
      <div className="flex justify-center gap-4 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            className={`
              w-14 h-14 rounded-full font-bold text-xl
              transition-all duration-500 ease-out
              ${getSlideClass(day)}
              ${selectedDay === day 
                ? "bg-primary text-primary-foreground scale-110 shadow-lg" 
                : "bg-card border-2 border-border hover:border-primary hover:scale-105"
              }
            `}
          >
            {agendaData[day].initial}
          </button>
        ))}
      </div>

      {/* Day Label */}
      <div className={`text-center mb-4 transition-all duration-300 ${selectedDay ? "opacity-100" : "opacity-0 h-0"}`}>
        {selectedDay && (
          <h3 className="text-2xl font-bold">{agendaData[selectedDay].label}</h3>
        )}
      </div>

      {/* Dropdown Panel */}
      <div 
        className={`
          overflow-hidden transition-all duration-500 ease-out
          ${selectedDay ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {selectedDay && (
          <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
            <div className="space-y-4">
              {agendaData[selectedDay].events.map((event, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="min-w-[100px] text-sm font-semibold text-primary">
                    {event.time}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
