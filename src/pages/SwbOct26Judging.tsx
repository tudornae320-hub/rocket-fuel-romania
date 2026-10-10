import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TABLES, INACTIVE_TABLES } from "@/data/swbOct26";

// Paste the Google Apps Script web app URL here.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLs2Ld7lik9IAtHatY16FZc41JBnPc481s6eGt9UXE9r-y1ItijZ6iOkGfjh6Ld-VD/exec";

const JUDGES = ["Bogdan Deac", "Raluca Epureanu", "Lucian Popovici"];
const CRITERIA = [
  { key: "validation", label: "Validation" },
  { key: "execution", label: "Execution & Design" },
  { key: "business", label: "Business Model" },
] as const;
type CritKey = (typeof CRITERIA)[number]["key"];
type Score = Partial<Record<CritKey, number>> & { note?: string };

const STARTUPS = Object.entries(TABLES)
  .map(([t, name]) => ({ table: Number(t), name }))
  .filter((s) => !INACTIVE_TABLES.includes(s.table));

const slugify = (n: string) =>
  n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const JUDGE_KEY = "swb-oct26-judge";
const scoresKey = (j: string) => `swb-oct26-scores-${slugify(j)}`;

const isComplete = (s?: Score) => !!s && CRITERIA.every((c) => typeof s[c.key] === "number");

const send = async (judge: string, table: number, s: Score) => {
  if (!SCRIPT_URL) return false;
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        judge,
        table,
        startup: TABLES[table],
        validation: s.validation,
        execution: s.execution,
        business: s.business,
        note: s.note ?? "",
      }),
    });
    return true;
  } catch {
    return false;
  }
};

const SwbOct26Judging = () => {
  const [params, setParams] = useSearchParams();
  const [judge, setJudge] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<number, Score>>({});
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fromUrl = params.get("judge");
    const match = JUDGES.find((j) => slugify(j) === fromUrl);
    const stored = window.localStorage.getItem(JUDGE_KEY);
    const pick = match ?? (stored && JUDGES.includes(stored) ? stored : null);
    if (pick) choose(pick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (j: string | null) => {
    setJudge(j);
    setStatus("");
    if (j) {
      window.localStorage.setItem(JUDGE_KEY, j);
      setParams({ judge: slugify(j) }, { replace: true });
      try {
        setScores(JSON.parse(window.localStorage.getItem(scoresKey(j)) || "{}"));
      } catch {
        setScores({});
      }
      setIdx(0);
    } else {
      window.localStorage.removeItem(JUDGE_KEY);
      setParams({}, { replace: true });
    }
  };

  const startup = STARTUPS[idx];
  const current = scores[startup?.table] ?? {};
  const doneCount = useMemo(() => STARTUPS.filter((s) => isComplete(scores[s.table])).length, [scores]);

  const update = (patch: Score) => {
    if (!judge) return;
    setScores((prev) => {
      const next = { ...prev, [startup.table]: { ...prev[startup.table], ...patch } };
      window.localStorage.setItem(scoresKey(judge), JSON.stringify(next));
      return next;
    });
  };

  const saveNext = async () => {
    if (!judge || !isComplete(current)) return;
    setStatus("Sending…");
    const ok = await send(judge, startup.table, current);
    setStatus(ok ? `Saved ${startup.name} ✓` : `Saved on this phone (sheet not connected)`);
    if (idx < STARTUPS.length - 1) setIdx(idx + 1);
  };

  const resendAll = async () => {
    if (!judge) return;
    setStatus("Resending…");
    let n = 0;
    for (const s of STARTUPS) {
      if (isComplete(scores[s.table]) && (await send(judge, s.table, scores[s.table]))) n++;
    }
    setStatus(`Resent ${n} scores`);
  };

  const box = "rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-5 shadow-[var(--shadow-brutalist)]";

  return (
    <main className="bg-background pb-20 pt-32 sm:pt-36">
      <div className="container mx-auto max-w-3xl px-5 sm:px-8">
        <header className="mb-8">
          <p className="mb-3 font-semibold text-secondary">Startup Weekend Bucharest</p>
          <h1 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">Judging</h1>
          <p className="mt-3 text-lg text-muted-foreground">Score each startup from 1 to 10 on the three criteria.</p>
        </header>

        <section className={`mb-8 ${box}`}>
          <label htmlFor="judge-select" className="mb-2 block text-lg font-bold">Select your name</label>
          <select
            id="judge-select"
            value={judge ?? ""}
            onChange={(e) => choose(e.target.value || null)}
            className="w-full rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background px-4 py-3 text-base font-medium"
          >
            <option value="">Select your name</option>
            {JUDGES.map((j) => <option key={j} value={j}>{j}</option>)}
          </select>
        </section>

        {judge && startup && (
          <>
            <p className="mb-3 text-sm font-bold uppercase text-muted-foreground">
              {doneCount} / {STARTUPS.length} scored
            </p>

            <article className={box}>
              <p className="text-sm font-semibold text-muted-foreground">Startup {idx + 1} of {STARTUPS.length}</p>
              <h2 className="mt-1 text-2xl font-bold uppercase text-secondary">Table {startup.table}</h2>
              <p className="text-3xl font-bold leading-tight">{startup.name}</p>

              <div className="mt-6 grid gap-6">
                {CRITERIA.map((c) => (
                  <div key={c.key}>
                    <p className="mb-2 flex justify-between text-lg font-bold">
                      <span>{c.label}</span>
                      <span className="text-secondary">{current[c.key] ?? "–"}</span>
                    </p>
                    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                        const on = current[c.key] === n;
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => update({ [c.key]: n })}
                            aria-pressed={on}
                            aria-label={`${c.label} ${n}`}
                            className={`h-12 rounded-xl border-2 border-[hsl(var(--brutalist-border))] text-lg font-bold ${
                              on ? "bg-secondary text-secondary-foreground" : "bg-background"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <textarea
                  value={current.note ?? ""}
                  onChange={(e) => update({ note: e.target.value })}
                  placeholder="Note (optional)"
                  rows={2}
                  className="w-full rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background px-4 py-3 text-base"
                />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIdx(Math.max(0, idx - 1))}
                  disabled={idx === 0}
                  aria-label="Previous startup"
                  className="rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background p-3 disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={saveNext}
                  disabled={!isComplete(current)}
                  className="flex-1 rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-primary px-4 py-3 text-lg font-bold uppercase text-primary-foreground shadow-[var(--shadow-brutalist)] disabled:opacity-40"
                >
                  Save &amp; next
                </button>
                <button
                  type="button"
                  onClick={() => setIdx(Math.min(STARTUPS.length - 1, idx + 1))}
                  disabled={idx === STARTUPS.length - 1}
                  aria-label="Next startup"
                  className="rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background p-3 disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              {status && <p className="mt-3 text-sm font-semibold text-muted-foreground">{status}</p>}
            </article>

            <button
              type="button"
              onClick={resendAll}
              className="mt-6 text-sm font-semibold text-secondary underline underline-offset-4"
            >
              Resend all my scores
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default SwbOct26Judging;
