const startups = [
  {
    "name": "HAI: Plans With Friends",
    "pitch": "My startup, HAI, is building a social planning platform that helps young adults turn the intention to meet into real-world plans with their friends through frictionless coordination, personalized recommendations, and local activity discovery.\n\nUnlike group chats, calendars, or event-discovery platforms that solve only one part of the problem, HAI combines discovery, decision-making, planning, and participation in one social experience designed around existing friend groups.\n\nOur goal is to become the layer between “we should do something” and actually doing it."
  },
  {
    "name": "NestRay",
    "pitch": "My startup, NestRay, is developing a web platform that helps homebuyers, homeowners, and real estate professionals understand how sunlight affects properties in Bucharest and how much electricity solar panels could generate.\n\nUsing 3D simulations, solar data, and mapping technology, NestRay visualizes natural light inside homes throughout the day and estimates photovoltaic energy production.\n\nUnlike traditional real estate platforms, we go beyond location, price, and photos to reveal a property's solar potential before you make a decision."
  },
  {
    "name": "Doomate",
    "pitch": "My startup, Doomate, is developing a social app blocker to help people wanting to spend less time doomscrolling stick to their goals with a social accountability step that makes them ask their friends for more time once their daily limit runs out.\n\nUnlike traditional app blockers, we move the accountability from the person to trusted people who accept or deny their requests, and unlike direct competitors like Useless, we add Doomy AI who reviews their requests in case they don\"t have people to use the app with."
  },
  {
    "name": "CityFix",
    "pitch": "My startup, CityFix, is developing an app that connects citizens and local government to solve urban issues.\n\nPowered by an AI module and a no-login platform, CityFix offers an intuitive interface that allows users to report a problem in just 2 seconds, making urban reporting faster and more accessible than platforms like bucuresti.help."
  },
  {
    "name": "Denki Management",
    "pitch": "We share sugar with our neighbours. Why not share energy?\n\nDenki (means energy in Japanese) Management is developing a platform to help neighbours and local authorities form energy communities and participate in energy markets—with community organisation, legal guidance, and energy management in one place.\n\nRomanian law allows these communities to operate, and national and European funding programmes can support eligible projects.\n\nUnlike setting up solar power on your own, we bring people together to share energy and access markets as a community.\n\nWe have three pilot projects.\n\nOur goal: clean, decentralised energy, a community where you belong, and lower bills."
  },
  {
    "name": "Knowledge as Liquidity",
    "pitch": "My startup, KaL (Knowledge as Liquidity), is building an AI-powered, decentralized knowledge economy that enables learners worldwide to prove their skills, earn verifiable credentials, and receive rewards for demonstrated understanding.\n\nUnlike traditional learning platforms that measure progress through course completion and static quizzes, we use our proprietary Proof of Cognitive Work protocol, combining adaptive AI assessments, psychometric modeling, and blockchain verification to make knowledge measurable, verifiable, and economically valuable."
  },
  {
    "name": "AirSpot",
    "pitch": "My startup, AirSpot, is developing an app meant to help comercial drone users command their operation in one place, this cutting costs using our interested functions to generate and request authorizations and such.\n\nUnlike free or paid alternative, you can manage your entire operation within our app."
  },
  {
    "name": "3onsai",
    "pitch": "he wellness market is overwhelming. Consumers struggle to identify trustworthy products, understand how to use them, and find reliable guidance.\n\n3ONSAI is a curated wellness ecosystem that brings together quality products, trusted professionals, education, and real-life experiences in one platform.\n\nWith an integrated AI Guide, we make wellness easier to discover, understand, and integrate into everyday life.\n\nUnlike traditional marketplaces, we don't just sell products. We connect knowledge with quality, transforming wellness shopping into an informed, guided experience.\n\nOur vision is to become the trusted destination for holistic wellness, connecting mind, body, and spirit through one seamless online and offline ecosystem.\n\n3ONSAI isn't just about what you buy. It's about understanding what you buy, why it matters, and how to make it part of your life."
  },
  {
    "name": "CLNR",
    "pitch": "My startup, CLNR, is developing a suite of cleaning robots to help municipalities keep the sidewalks clean from buds (cigarette butts), flyers and dog poops, using extensible arms to work silently, unlike noisy vacuum cleaners and odour detection to escalate to human teams when the shit hits the fan.\n\nUnlike our Chinese competitors, we keep our data servers in Romania and DON'T send traffic to the Chinese Communist Party or USA's Algorithm Companies."
  },
  {
    "name": "Devino Hacker",
    "pitch": "My startup, Devino Hacker, is developing a gamified way to learn cybersecurity for both beginners and intermediate learners.\n\nThe problem we are solving is the need to understand digital security principles from a young age (target audience is 14-20+ and their parents, also schools, NGOs, and even bootcamps, teambuildings for cybersecurity firms), both to protect ourselves and to kick-start a future career.\n\nOur key innovation revolves around the combination of digital and physical learning products. On the digital side, we have a platform with courses, eBooks, materials, and simulations, whilst the hardware part consists of reusable cases that simulate real-world incidents (e.g., an attack on a nuclear power plant, defusing a bomb, or breaking into a bank safe).\n\nAll of this is designed to showcase and teach important cybersecurity principles, both for defense and red teaming (cryptography, binary exploitation, web security, phishing methods, social engineering, and reverse engineering).\n\nOur competition mainly consists of board games that are not really focused on cybersecurity, but rather on criminalistics and detective games.\n\nAlso, none of them combine both digital and hardware components while being specifically designed for the Romanian market. Initially, it will be a national product, with the possibility of expanding internationally."
  }
];

// Splits a pitch at the end of its first sentence so it can be emphasised.
const splitFirstSentence = (text: string) => {
  const cut = text.search(/\.(?=\s|$)/);
  if (cut === -1) return { first: text, rest: "" };
  return { first: text.slice(0, cut + 1), rest: text.slice(cut + 1) };
};

const SwbOct26 = () => (
  <main className="bg-background pb-20 pt-32 sm:pt-36">
    <div className="container mx-auto max-w-5xl px-5 sm:px-8">
      <header className="mb-10 sm:mb-14">
        <p className="mb-4 font-semibold text-secondary">9–11 October 2026 · Bucharest</p>
        <h1 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">Meet the Startups</h1>
        <p className="mt-4 text-lg text-muted-foreground">Startup Weekend Bucharest · {startups.length} participating startups</p>
      </header>
      <section aria-label="Participating startups" className="grid gap-6 sm:gap-8">
        {startups.map((startup, index) => (
          <article key={startup.name} aria-labelledby={`startup-${index}`} className="min-w-0 rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-5 text-card-foreground shadow-[var(--shadow-brutalist)] sm:p-8">
            <div className="mb-5 flex items-start gap-4">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">{String(index + 1).padStart(2, "0")}</span>
              <h2 id={`startup-${index}`} className="min-w-0 break-words text-2xl font-bold leading-tight sm:text-3xl">{startup.name}</h2>
            </div>
            <p className="whitespace-pre-line break-words text-base leading-relaxed sm:text-lg">
              {(() => {
                const { first, rest } = splitFirstSentence(startup.pitch);
                return (
                  <>
                    <span className="font-bold">{first}</span>
                    {rest}
                  </>
                );
              })()}
            </p>
          </article>
        ))}
      </section>
    </div>
  </main>
);

export default SwbOct26;
