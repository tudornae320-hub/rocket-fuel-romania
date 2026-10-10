import { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, Users, User } from "lucide-react";

const TABLES: Record<number, string> = {
  1: "AirSpot",
  2: "3onsai",
  3: "Denki Management",
  4: "Knowledge as Liquidity",
  5: "HAI: Plans With Friends",
  6: "CityFix",
  7: "logiplay",
  8: "Artimedi",
  9: "CLNR",
  10: "NestRay",
  11: "Devino Hacker",
  12: "Doomate",
  13: "Temelia",
  14: "RentSharing",
};

interface Pair {
  id: string;
  mentors: string[];
  room1: number[];
  room2: number[];
}

const PAIRS: Pair[] = [
  { id: "A", mentors: ["Andrei-Fredy Craciun", "Adina Saniuta"], room1: [1, 7, 6, 5, 4, 3, 2], room2: [8, 14, 13, 12, 11, 10, 9] },
  { id: "B", mentors: ["Antonio Hus", "David Webster"], room1: [2, 1, 7, 6, 5, 4, 3], room2: [9, 8, 14, 13, 12, 11, 10] },
  { id: "C", mentors: ["Bogdan Deac", "Steliana Moraru"], room1: [3, 2, 1, 7, 6, 5, 4], room2: [10, 9, 8, 14, 13, 12, 11] },
  { id: "D", mentors: ["Cosmin Posteuca", "Cristian-George Farauanu"], room1: [4, 3, 2, 1, 7, 6, 5], room2: [11, 10, 9, 8, 14, 13, 12] },
  { id: "E", mentors: ["Ionuț Radu Munteanu", "Constantin-Daniel Pestrea"], room1: [5, 4, 3, 2, 1, 7, 6], room2: [12, 11, 10, 9, 8, 14, 13] },
  { id: "F", mentors: ["Anca Popan"], room1: [6, 5, 4, 3, 2, 1, 7], room2: [13, 12, 11, 10, 9, 8, 14] },
];

const MENTORS = PAIRS.flatMap((p) => p.mentors).sort((a, b) => a.localeCompare(b));

const groupOf = (name: string) => PAIRS.find((p) => p.mentors.includes(name))?.id ?? "";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const STORAGE_KEY = "swb-oct26-mentor";

const RoomSection = ({
  room,
  tables,
  group,
}: {
  room: 1 | 2;
  tables: number[];
  group: string;
}) => (
  <section aria-label={`Room ${room}`}>
    <h3 className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xl font-bold uppercase">
      <span>Room {room}</span>
      <span className="rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-secondary px-3 py-1 text-sm font-bold uppercase text-secondary-foreground">
        Group {group}
      </span>
    </h3>
    <div className="flex flex-col">
      {tables.map((table, i) => {
        return (
          <Fragment key={i}>
            <article className="rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-4 text-card-foreground shadow-[var(--shadow-brutalist)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-muted-foreground">Round {i + 1}</p>
                <span className="text-sm font-semibold uppercase text-muted-foreground">Room {room}</span>
              </div>
              <p className="mt-1 text-2xl font-bold uppercase text-secondary">Table {table}</p>
              <p className="mt-1 break-words text-2xl font-semibold leading-snug">{TABLES[table]}</p>
            </article>
            {i < tables.length - 1 && (
              <div className="flex justify-center py-1" aria-hidden="true">
                <ArrowDown className="h-7 w-7 text-secondary" strokeWidth={2.5} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  </section>
);

const ROOM1_INDEPENDENT = [7, 6, 5, 4, 3, 2, 1];
const ROOM2_INDEPENDENT = [14, 13, 12, 11, 10, 9, 8];

const OverviewSection = ({
  room,
  independent,
}: {
  room: 1 | 2;
  independent: number[];
}) => (
  <section aria-label={`Room ${room} overview`}>
    <h3 className="mb-4 text-xl font-bold uppercase">Room {room}</h3>
    <div className="grid gap-4">
      {[0, 1, 2, 3, 4, 5, 6].map((r) => (
        <article
          key={r}
          className="rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-4 text-card-foreground shadow-[var(--shadow-brutalist)]"
        >
          <p className="text-sm font-semibold text-muted-foreground">Round {r + 1}</p>
          <ul className="mt-2 grid gap-1.5">
            {PAIRS.map((p) => {
              const tables = room === 1 ? p.room1 : p.room2;
              return (
                <li key={p.id} className="flex items-baseline gap-2 text-sm sm:text-base">
                  <span className="shrink-0 font-bold text-secondary">Group {p.id}</span>
                  <span className="shrink-0 text-muted-foreground">·</span>
                  <span className="shrink-0 font-semibold">Table {tables[r]}</span>
                  <span className="min-w-0 truncate font-medium">{TABLES[tables[r]]}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Working independently: Table {independent[r]} · {TABLES[independent[r]]}
          </p>
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
          <p className="mt-4 whitespace-pre-line text-lg text-muted-foreground">{"Start in Room 1, then move to Room 2 after a 10-minute break.\n\nMeetings last 12 minutes, with 1 minute to change tables. Startups stay seated.\n\nFollow your route below."}</p>
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
                {m} · Group {groupOf(m)}
              </option>
            ))}
          </select>

          {selected && (
            <div className="mt-5">
              <p className="flex flex-wrap items-center gap-3 text-2xl font-bold">
                {selected}
                <span className="rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-secondary px-3 py-1 text-sm uppercase text-secondary-foreground">
                  Group {pair?.id}
                </span>
              </p>
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
            <RoomSection room={1} tables={pair.room1} group={pair.id} />
            <div
              role="separator"
              className="rounded-2xl border-2 border-dashed border-[hsl(var(--brutalist-border))] bg-muted p-4 text-center text-lg font-bold uppercase"
            >
              10-minute break · Move to Room 2
            </div>
            <RoomSection room={2} tables={pair.room2} group={pair.id} />
          </div>
        )}
      </div>
    </main>
  );
};

export default SwbOct26Mentorship;
