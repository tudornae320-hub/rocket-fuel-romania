import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Users, User } from "lucide-react";

const TABLES: Record<number, string> = {
  1: "HAI: Plans With Friends",
  2: "NestRay",
  3: "Doomate",
  4: "CityFix",
  5: "Denki Management",
  6: "Knowledge as Liquidity",
  7: "AirSpot",
  8: "3onsai",
  9: "CLNR",
  10: "Devino Hacker",
  11: "Artimedi",
  12: "StartupX",
};

interface Pair {
  id: string;
  mentors: string[];
  wave1: number[];
  wave2: number[];
}

const PAIRS: Pair[] = [
  { id: "A", mentors: ["Andrei-Fredy Craciun", "Adina Saniuta"], wave1: [1, 6, 5, 4, 3, 2], wave2: [7, 12, 11, 10, 9, 8] },
  { id: "B", mentors: ["Antonio Hus", "David Webster"], wave1: [2, 1, 6, 5, 4, 3], wave2: [8, 7, 12, 11, 10, 9] },
  { id: "C", mentors: ["Bogdan Deac", "Steliana Moraru"], wave1: [3, 2, 1, 6, 5, 4], wave2: [9, 8, 7, 12, 11, 10] },
  { id: "D", mentors: ["Cosmin Posteuca", "Cristian-George Farauanu"], wave1: [4, 3, 2, 1, 6, 5], wave2: [10, 9, 8, 7, 12, 11] },
  { id: "E", mentors: ["Ionuț Radu Munteanu", "Constantin-Daniel Pestrea"], wave1: [5, 4, 3, 2, 1, 6], wave2: [11, 10, 9, 8, 7, 12] },
  { id: "F", mentors: ["Anca Popan"], wave1: [6, 5, 4, 3, 2, 1], wave2: [12, 11, 10, 9, 8, 7] },
];

const MENTORS = PAIRS.flatMap((p) => p.mentors).sort((a, b) => a.localeCompare(b));

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const STORAGE_KEY = "swb-oct26-mentor";

const WaveSection = ({ title, tables }: { title: string; tables: number[] }) => (
  <section aria-label={title}>
    <h3 className="mb-4 text-xl font-bold uppercase">{title}</h3>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {tables.map((table, i) => (
        <article
          key={i}
          className="rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-4 text-card-foreground shadow-[var(--shadow-brutalist)]"
        >
          <p className="text-sm font-semibold text-muted-foreground">Round {i + 1}</p>
          <p className="mt-1 text-2xl font-bold uppercase text-secondary">Table {table}</p>
          <p className="mt-1 break-words text-base font-medium leading-snug">{TABLES[table]}</p>
        </article>
      ))}
    </div>
  </section>
);

const SwbOct26Mentorship = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);

  // Initial selection: URL param wins, then localStorage.
  useEffect(() => {
    const fromUrl = searchParams.get("mentor");
    if (fromUrl) {
      const match = MENTORS.find((m) => slugify(m) === fromUrl);
      if (match) {
        setSelected(match);
        return;
      }
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && MENTORS.includes(stored)) setSelected(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectMentor = (name: string | null) => {
    setSelected(name);
    if (name) {
      window.localStorage.setItem(STORAGE_KEY, name);
      setSearchParams({ mentor: slugify(name) }, { replace: true });
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
      setSearchParams({}, { replace: true });
    }
  };

  const pair = useMemo(() => PAIRS.find((p) => p.mentors.includes(selected ?? "")), [selected]);
  const partner = pair?.mentors.find((m) => m !== selected) ?? null;

  return (
    <main className="bg-background pb-20 pt-32 sm:pt-36">
      <div className="container mx-auto max-w-3xl px-5 sm:px-8">
        <header className="mb-10">
          <p className="mb-4 font-semibold text-secondary">Startup Weekend Bucharest</p>
          <h1 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">Mentor Schedule</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Startups stay at their tables. Mentors move between rounds. Each meeting lasts 12
            minutes, with 2 minutes to move. There is a 10-minute break between waves.
          </p>
        </header>

        <section aria-label="Select your name" className="mb-10 rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-5 shadow-[var(--shadow-brutalist)] sm:p-6">
          <label htmlFor="mentor-select" className="mb-2 block text-lg font-bold">
            Select your name
          </label>
          <select
            id="mentor-select"
            value={selected ?? ""}
            onChange={(e) => selectMentor(e.target.value || null)}
            className="w-full rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background px-4 py-3 text-base font-medium"
          >
            <option value="">Select your name</option>
            {MENTORS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {selected && (
            <div className="mt-5">
              <p className="text-2xl font-bold">{selected}</p>
              <p className="mt-2 flex items-center gap-2 text-lg">
                {partner ? (
                  <>
                    <Users className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <span>
                      Your partner: <span className="font-bold">{partner}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <span>You mentor individually</span>
                  </>
                )}
              </p>
              <button
                onClick={() => selectMentor(null)}
                className="mt-3 text-sm font-semibold text-secondary underline underline-offset-4"
              >
                Change name
              </button>
            </div>
          )}
        </section>

        {selected && pair && (
          <div className="grid gap-8">
            <WaveSection title="Wave 1" tables={pair.wave1} />
            <div
              role="separator"
              className="rounded-2xl border-2 border-dashed border-[hsl(var(--brutalist-border))] bg-muted p-4 text-center text-lg font-bold uppercase"
            >
              10-minute mentor break
            </div>
            <WaveSection title="Wave 2" tables={pair.wave2} />
          </div>
        )}
      </div>
    </main>
  );
};

export default SwbOct26Mentorship;
