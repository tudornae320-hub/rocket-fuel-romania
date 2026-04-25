import { useEffect } from "react";

interface Team {
  name: string;
  pitch: string;
}

const teams: Team[] = [
  {
    name: "CTRL ALT ELITE",
    pitch:
      "We're building a lead generation platform to solve the problem of inefficiency in the sales process (or maybe better said in the lead generation part of the process) to customers that are between 5-25 employees in the US/UK/Western Europe that sell high ticket services and constantly needs new clients. We're doing this by using our platform of lead generation so we can profile qualified leads for them.",
  },
  {
    name: "Medic75",
    pitch:
      "We're building a real-time medicine request platform that connects patients with nearby pharmacies. For patients who urgently need medication, we solve the problem of wasting time calling pharmacy after pharmacy only to hear 'we don't have it.' A patient simply sends a request for a specific medicine, nearby pharmacies receive it instantly, approved the request if available and the patient picks the best option based on availability, distance, or price.",
  },
  {
    name: "The Sage",
    pitch:
      "We are building an AI Wrapper that guides users through their problem. We help them clear their perspective and their mind, managing a work-life balance.",
  },
  {
    name: "CivicMind",
    pitch:
      "CivicMind is developing an AI-powered legislative transparency and personalized civic intelligence platform to help citizens and civic organizations fight misinformation, understand how Romanian laws affect their lives, and hold politicians accountable with live parliamentary and legislative data, semantic search across the full legal corpus, vote tracking, and AI agents that analyze bills, surface similar laws, answer questions, and personalize insights for each user profile.",
  },
  {
    name: "Hackshare",
    pitch:
      "Building shouldn't be in silence, but nothing is out there for founders. We are a BeReal for your startup: share realtime progress without wasting time.",
  },
  {
    name: "One Image",
    pitch:
      "Influencer analysis using AI. 10 cheaper influencers will create more impact than one big one — we help you find those ones and make data driven decisions.",
  },
  {
    name: "CodeArchaeologist",
    pitch:
      "The Product: A web app where a junior developer pastes in a file of confusing, legacy code. The tool instantly generates simple, plain-English documentation and adds line-by-line comments explaining the logic. The Target Audience: Mid-sized companies struggling to onboard junior developers. The Problem: Senior engineers retire or quit, leaving behind thousands of lines of old, completely undocumented code. Junior developers waste weeks just trying to understand what the code actually does.",
  },
  {
    name: "CumSeFace",
    pitch:
      "We are building an automated system for consultancy firms that maps legislative changes directly onto their client portfolios and generates concrete action plans for each, eliminating the need for manual research. Consultants waste hundreds of unbillable hours manually tracking legislative updates and cross-referencing them against client data. This 'manual research gap' leads to missed opportunities, human error, and slow response times. Our system automatically maps real-time legislative changes directly onto a firm's client portfolio. It generates alerts on new legislation and key insights on how the changes could affect their customers.",
  },
  {
    name: "ArtiMedi",
    pitch:
      "ArtiMedi is a platform for underprivileged students preparing for national exams like the capacity exam and the baccalaureate. We solve the lack of access to quality tutoring by offering memberships that provide an AI-powered tutor with personalized lessons, practice, and feedback — so every student has a fair chance to succeed.",
  },
  {
    name: "PeMal",
    pitch:
      "PeMal is a peer-to-peer business model that intermediates the process of booking a spot for fishing. It also serves as a way for fishing pond owners to access a broader audience by listing all of their rules and facilities. The problem we're trying to solve is the fact that the majority of anglers don't have the certainty that they have a stand secured just by calling, since pond owners often give out the spots based on connections and so on. Also, many times the conditions and rules are not accurate when you arrive there, resulting in extra taxes and things like this. We bring a system that allows both the angler and the owner to reach out, clarify the conditions, see the free spots, and give the option to choose where you'll sit. This way, pond owners benefit from much easier schedule management, not having to worry about calls, hours, or when and who comes.",
  },
  {
    name: "Viba Team",
    pitch:
      "Viba is a mobile app that shows the live “vibe” of nearby venues and events.\n\nEach place has a real-time channel where people there can post text, voice notes, and photos. Open the app, check the map or list, see what’s happening nearby, and decide where to go.\n\nIt’s for locals, tourists, groups, venues, and hosts who want to know or show what’s actually happening right now.\n\nInstead of stale reviews, curated stories, or slow group chats, Viba makes social content place-based and live, with 24-hour venue channels, simple posting tools, and no infinite feed.",
  },
  {
    name: "TerraTune",
    pitch:
      "An AI-powered platform that guides Romanian farmers through the agricultural season, from soil preparation to harvest.\nIt’s built for farmers managing 20–500 hectares who often make daily decisions without access to an agronomist.\nThe platform combines weather data, soil sensor inputs, and crop-specific logic to recommend what to do, when, and why. Each farmer gets a personalized task calendar and alerts based on real field conditions, not generic schedules.",
  },
  {
    name: "The Sage AI",
    pitch:
      "The Sage is developing an AI Wisdom Coach to help professionals who seem successful on the outside, but feel stuck on the inside — caught in decision paralysis, unclarity and patterns that keep repeating over and over again. The Sage AI diagnoses root causes and delivers precise, actionable solutions drawn from Buddhist psychology — one of the oldest and most rigorous cause-and-effect systems ever developed for the evolution of the human mind. No spirituality required. Pure logic. Cause & Effect.",
  },
];

const April26 = () => {
  useEffect(() => {
    document.title = "April 26 Teams · Startup Weekend Bucharest";
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-primary border-2 border-[#000000] rounded-full px-5 py-2 shadow-[4px_4px_0px_0px_#000000] mb-6">
            <span className="font-bold text-primary-foreground text-sm uppercase tracking-wider">
              April 26 · Mentorship Day
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Meet the Teams
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            What our teams are building and where they need a hand from mentors.
          </p>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-1 gap-8">
          {teams.map((team, idx) => (
            <article
              key={team.name}
              className="bg-card border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-secondary border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {team.name}
                  </h2>
                  <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line">
                    {team.pitch}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Judging Criteria */}
        <section className="mt-20">
          <div className="text-center mb-10">
            <div className="inline-block bg-secondary border-2 border-[#000000] rounded-full px-5 py-2 shadow-[4px_4px_0px_0px_#000000] mb-6">
              <span className="font-bold text-secondary-foreground text-sm uppercase tracking-wider">
                For the mentors
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Judging Criteria
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              The three lenses to look through when giving feedback or scoring teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01 Validation */}
            <article className="bg-[#000000] border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift">
              <div className="mb-6">
                <div className="text-off-white font-bold text-2xl leading-none mb-1">01</div>
                <h3 className="text-off-white font-bold text-3xl md:text-4xl leading-tight">
                  Validation
                </h3>
              </div>
              <div className="space-y-5 text-primary text-lg md:text-xl leading-snug">
                <p>
                  Did the team <strong className="font-bold">validate the problem</strong> with real potential users?
                </p>
                <p>
                  Is the problem <strong className="font-bold">clear, specific, and important</strong> enough?
                </p>
                <p>
                  Did they identify a clear <strong className="font-bold">target market?</strong>
                </p>
                <p>
                  Is there evidence that people actually <strong className="font-bold">need or want</strong> this solution?
                </p>
              </div>
            </article>

            {/* 02 Execution & Design */}
            <article className="bg-[#000000] border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift">
              <div className="mb-6">
                <div className="text-off-white font-bold text-2xl leading-none mb-1">02</div>
                <h3 className="text-off-white font-bold text-3xl md:text-4xl leading-tight">
                  Execution &amp; Design
                </h3>
              </div>
              <div className="space-y-5 text-primary text-lg md:text-xl leading-snug">
                <p>
                  Did the team build a working <strong className="font-bold">MVP, prototype, or clear product demo?</strong>
                </p>
                <p>
                  How <strong className="font-bold">functional and realistic</strong> is the solution?
                </p>
                <p>
                  Is the product <strong className="font-bold">easy to understand and use?</strong>
                </p>
                <p>
                  Does the <strong className="font-bold">design support</strong> the user experience?
                </p>
              </div>
            </article>

            {/* 03 Business Model */}
            <article className="bg-[#000000] border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift">
              <div className="mb-6">
                <div className="text-off-white font-bold text-2xl leading-none mb-1">03</div>
                <h3 className="text-off-white font-bold text-3xl md:text-4xl leading-tight">
                  Business Model
                </h3>
              </div>
              <div className="space-y-5 text-primary text-lg md:text-xl leading-snug">
                <p>
                  Is there a clear plan for how this can <strong className="font-bold">become a business?</strong>
                </p>
                <p>
                  Is the <strong className="font-bold">value proposition</strong> strong and easy to understand?
                </p>
                <p>
                  Does the team understand <strong className="font-bold">who would pay and why?</strong>
                </p>
                <p>
                  Is the idea <strong className="font-bold">differentiated</strong> from existing alternatives?
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            More teams coming soon as they pitch and form. 🚀
          </p>
        </div>
      </div>
    </main>
  );
};

export default April26;
