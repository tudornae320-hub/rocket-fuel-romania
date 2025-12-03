import { useState } from "react";

const agendaData = {
  friday: {
    label: "Friday",
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
  const days: DayKey[] = ["friday", "saturday", "sunday"];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Day Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-card border border-border rounded-full p-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                px-6 py-2 rounded-full font-medium text-sm transition-all duration-300
                ${selectedDay === day 
                  ? "bg-dark-grey text-white" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {agendaData[day].label}
            </button>
          ))}
        </div>
      </div>

      {/* Agenda Card */}
      <div className="rounded-xl overflow-hidden border border-border shadow-lg">
        {/* Header */}
        <div className="bg-primary py-4 px-6">
          <h3 className="text-white text-xl font-bold uppercase tracking-wider text-center">
            Agenda
          </h3>
        </div>

        {/* Events List */}
        <div className="bg-card">
          {agendaData[selectedDay].events.map((event, idx) => (
            <div 
              key={idx}
              className={`
                flex gap-6 p-5 
                ${idx !== agendaData[selectedDay].events.length - 1 ? "border-b border-border" : ""}
              `}
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
  );
};
