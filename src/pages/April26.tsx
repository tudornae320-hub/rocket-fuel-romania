import { useEffect } from "react";

interface Team {
  name: string;
  pitch: string;
}

interface Schedule {
  title: string;
  mentors: string[];
  slots: string[][];
}

const schedules: Schedule[] = [
  {
    title: "Group 1",
    mentors: [
      "Bogdan Deac",
      "Claudiu Jojatu",
      "Cosmin Cosma",
      "Stefan Dumitru",
      "Radu Cudalb",
      "Rares Banescu",
    ],
    slots: [
      ["CTRL ALT ELITE", "Medic75", "CodeArchaeologist", "Hackshare", "One image", "CumSeFace"],
      ["Medic75", "CodeArchaeologist", "Hackshare", "One image", "CumSeFace", "CTRL ALT ELITE"],
      ["CodeArchaeologist", "Hackshare", "One image", "CumSeFace", "CTRL ALT ELITE", "Medic75"],
      ["Hackshare", "One image", "CumSeFace", "CTRL ALT ELITE", "Medic75", "CodeArchaeologist"],
      ["One image", "CumSeFace", "CTRL ALT ELITE", "Medic75", "CodeArchaeologist", "Hackshare"],
      ["CumSeFace", "CTRL ALT ELITE", "Medic75", "CodeArchaeologist", "Hackshare", "One image"],
    ],
  },
  {
    title: "Group 2",
    mentors: [
      "Gianina Craciun",
      "Valentin Maior",
      "Mihnea Craciun",
      "Oana Cosman",
      "Peter Stoica",
      "Liana Stoian",
    ],
    slots: [
      ["CivicMind", "ArtiMedi", "The Sage AI", "PeMal", "Viba Team", "TerraTune"],
      ["ArtiMedi", "The Sage AI", "PeMal", "Viba Team", "TerraTune", "CivicMind"],
      ["The Sage AI", "PeMal", "Viba Team", "TerraTune", "CivicMind", "ArtiMedi"],
      ["PeMal", "Viba Team", "TerraTune", "CivicMind", "ArtiMedi", "The Sage AI"],
      ["Viba Team", "TerraTune", "CivicMind", "ArtiMedi", "The Sage AI", "PeMal"],
      ["TerraTune", "CivicMind", "ArtiMedi", "The Sage AI", "PeMal", "Viba Team"],
    ],
  },
];

const teams: Team[] = [
  {
    name: "ArtiMedi",
    pitch:
      "ArtiMedi is an AI tutoring platform for underprivileged students preparing for national exams like Evaluarea Nationala and Bacalaureat. It offers personalized lessons, practice, and feedback through memberships, helping students access quality learning support regardless of background. The goal is to give every student a fair chance to succeed.",
  },
  {
    name: "CivicMind",
    pitch:
      "CivicMind is an AI-powered civic intelligence platform for citizens and civic organizations in Romania. It helps people understand laws, track political decisions, and fight misinformation using live legislative data, semantic search, vote tracking, and personalized AI insights. The platform makes complex legal and political information easier to understand and act on.",
  },
  {
    name: "CodeArchaeologist",
    pitch:
      "CodeArchaeologist is a web app that helps junior developers understand confusing legacy code. Users paste in undocumented code, and the tool generates simple explanations, documentation, and line-by-line comments. It helps companies onboard developers faster and reduce time lost understanding old codebases.",
  },
  {
    name: "CTRL ALT ELITE",
    pitch:
      "CTRL ALT ELITE is a lead generation platform for small B2B companies selling high-ticket services in the US, UK, and Western Europe. It helps companies with 5–25 employees find and profile qualified leads faster. The platform improves sales efficiency by focusing on better lead generation.",
  },
  {
    name: "CumSeFace",
    pitch:
      "CumSeFace is an automated legislative monitoring platform for consultancy firms. It tracks legislative changes, maps them to client portfolios, and generates concrete action plans for each client. This reduces manual research, missed opportunities, human error, and slow response times.",
  },
  {
    name: "Hackshare",
    pitch:
      "Hackshare is a real-time progress sharing platform for founders and builders. It helps startup teams share what they are building without polished updates, long posts, or social media noise. The focus is on quick, authentic progress updates for startups.",
  },
  {
    name: "Medic75",
    pitch:
      "Medic75 is a real-time medicine request platform connecting patients with nearby pharmacies. Patients request a specific medicine, pharmacies confirm availability, and the patient chooses the best option based on distance, price, or stock. It helps people avoid wasting time calling multiple pharmacies.",
  },
  {
    name: "One image",
    pitch:
      "One image is an AI-powered influencer analysis platform for brands and marketing teams. It helps companies identify smaller, more cost-effective influencers who can create stronger campaign impact than one expensive large creator. The platform supports more data-driven influencer marketing decisions.",
  },
  {
    name: "PeMal",
    pitch:
      "PeMal is a booking platform for fishing spots, connecting anglers with fishing pond owners. Anglers can see available spots, rules, facilities, and conditions before booking, while owners manage reservations more easily. It brings more transparency and predictability to the fishing experience.",
  },
  {
    name: "TerraTune",
    pitch:
      "TerraTune is an AI farming assistant for Romanian farmers managing 20–500 hectares. It guides farmers through the agricultural season using weather data, soil sensor inputs, and crop-specific logic. The platform recommends what to do, when, and why, based on real field conditions.",
  },
  {
    name: "The Sage AI",
    pitch:
      "The Sage AI is an AI wisdom coach for professionals who seem successful on the outside but feel stuck on the inside. It helps diagnose root causes behind decision paralysis, lack of clarity, and repeating patterns. The guidance is based on logic, cause and effect, and Buddhist psychology, without requiring spirituality.",
  },
  {
    name: "Viba",
    pitch:
      "Viba is a real-time cultural discovery app for people who want to make the most of what is happening around them. It shows nearby events, venues, and social activity in one place, using real-time updates, smart curation, and location-based recommendations. The goal is to help people stop scrolling and start experiencing the city in real life.",
  },
];

const April26 = () => {
  useEffect(() => {
    document.title = "April 26 Teams · Startup Weekend Bucharest";
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-primary border-2 border-[#000000] rounded-full px-5 py-2 shadow-[4px_4px_0px_0px_#000000] mb-6">
            <span className="font-bold text-primary-foreground text-sm uppercase tracking-wider">
              April 26 · Mentorship Day
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Mentoring Schedule
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your slot, find your team. Two groups running in parallel.
          </p>
        </div>

        {/* Mentoring Schedule */}
        <section className="mb-20">

          <div className="space-y-10">
            {schedules.map((group) => (
              <div key={group.title}>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {group.title}
                </h3>
                {/* Desktop table */}
                <div className="hidden md:block bg-card border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] overflow-hidden">
                  <table className="w-full text-xs md:text-sm border-collapse table-fixed">
                    <thead>
                      <tr className="bg-secondary text-secondary-foreground">
                        <th className="text-left font-bold px-2 md:px-3 py-3 border-b-2 border-[#000000] border-r-2 w-[70px] md:w-[80px]">
                          Slot
                        </th>
                        {group.mentors.map((mentor) => (
                          <th
                            key={mentor}
                            className="text-left font-bold px-2 md:px-3 py-3 border-b-2 border-[#000000] border-r-2 last:border-r-0 leading-tight"
                          >
                            {mentor}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.slots.map((row, slotIdx) => (
                        <tr key={slotIdx} className="even:bg-muted/30">
                          <td className="font-bold px-2 md:px-3 py-3 border-b border-[#000000]/20 border-r-2 border-r-[#000000]">
                            Slot {slotIdx + 1}
                          </td>
                          {row.map((team, i) => (
                            <td
                              key={i}
                              className="px-2 md:px-3 py-3 border-b border-[#000000]/20 border-r border-r-[#000000]/20 last:border-r-0 leading-tight"
                            >
                              {team}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-4">
                  {group.slots.map((row, slotIdx) => (
                    <div
                      key={slotIdx}
                      className="bg-card border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] overflow-hidden"
                    >
                      <div className="bg-secondary text-secondary-foreground px-4 py-2 border-b-2 border-[#000000] font-bold">
                        Slot {slotIdx + 1}
                      </div>
                      <ul className="divide-y divide-[#000000]/15">
                        {group.mentors.map((mentor, i) => (
                          <li
                            key={mentor}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                          >
                            <span className="font-semibold text-foreground">{mentor}</span>
                            <span className="text-foreground/80 text-right">{row[i]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

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
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Judging Criteria
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              The three lenses to look through when giving feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* 01 Validation */}
            <article className="bg-card border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-secondary border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary-foreground">01</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Validation
                  </h3>
                  <ul className="space-y-2 text-base md:text-lg text-foreground leading-relaxed list-disc pl-5">
                    <li>Did the team <strong className="font-bold">validate the problem</strong> with real potential users?</li>
                    <li>Is the problem <strong className="font-bold">clear, specific, and important</strong> enough?</li>
                    <li>Did they identify a clear <strong className="font-bold">target market?</strong></li>
                    <li>Is there evidence that people actually <strong className="font-bold">need or want</strong> this solution?</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 02 Execution & Design */}
            <article className="bg-card border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-secondary border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary-foreground">02</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Execution &amp; Design
                  </h3>
                  <ul className="space-y-2 text-base md:text-lg text-foreground leading-relaxed list-disc pl-5">
                    <li>Did the team build a working <strong className="font-bold">MVP, prototype, or clear product demo?</strong></li>
                    <li>How <strong className="font-bold">functional and realistic</strong> is the solution?</li>
                    <li>Is the product <strong className="font-bold">easy to understand and use?</strong></li>
                    <li>Does the <strong className="font-bold">design support</strong> the user experience?</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 03 Business Model */}
            <article className="bg-card border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6 md:p-8 hover-lift">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-secondary border-2 border-[#000000] rounded-2xl shadow-[4px_4px_0px_0px_#000000] w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary-foreground">03</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Business Model
                  </h3>
                  <ul className="space-y-2 text-base md:text-lg text-foreground leading-relaxed list-disc pl-5">
                    <li>Is there a clear plan for how this can <strong className="font-bold">become a business?</strong></li>
                    <li>Is the <strong className="font-bold">value proposition</strong> strong and easy to understand?</li>
                    <li>Does the team understand <strong className="font-bold">who would pay and why?</strong></li>
                    <li>Is the idea <strong className="font-bold">differentiated</strong> from existing alternatives?</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

      </div>
    </main>
  );
};

export default April26;
