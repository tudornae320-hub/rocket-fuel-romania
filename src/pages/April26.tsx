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
                  <div className="inline-block bg-primary/20 border-2 border-[#000000] rounded-full px-3 py-1 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Elevator Pitch
                    </span>
                  </div>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {team.pitch}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

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
