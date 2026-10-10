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
  const [view, setView] = useState<"score" | "review">("score");
  const [submitted, setSubmitted] = useState(false);

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
      setView("score");
      setSubmitted(window.localStorage.getItem(scoresKey(j) + "-submitted") === "1");
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

  const saveNext = () => {
    if (!judge || !isComplete(current)) return;
    setStatus("");
    if (idx < STARTUPS.length - 1) setIdx(idx + 1);
    else setView("review");
  };

  const allDone = doneCount === STARTUPS.length;

  const submitFinal = async () => {
    if (!judge || !allDone) return;
    setStatus("Submitting…");
    let n = 0;
    for (const s of STARTUPS) {
      if (await send(judge, s.table, scores[s.table])) n++;
    }
    if (n === STARTUPS.length) {
      window.localStorage.setItem(scoresKey(judge) + "-submitted", "1");
      setSubmitted(true);
      setStatus("Final scores submitted ✓ Thank you!");
    } else {
      setStatus(`Only ${n} of ${STARTUPS.length} sent — check your connection and try again.`);
    }
  };

  const box = "rounded-2xl border-2 border-[hsl(var(--brutalist-border))] bg-card p-4 shadow-[var(--shadow-brutalist)] sm:p-5";

  return (
    <main className="bg-background pb-20 pt-32 sm:pt-36">
      <div className="container mx-auto max-w-3xl px-4 sm:px-8">
        <header className="mb-5 sm:mb-8">
          <p className="mb-2 font-semibold text-secondary">Startup Weekend Bucharest</p>
          <h1 className="text-3xl font-bold uppercase leading-tight sm:text-5xl">Judging</h1>
          <p className="mt-2 text-base text-muted-foreground sm:mt-3 sm:text-lg">Score each startup from 1 to 10 on the three criteria.</p>
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

        {judge && view === "review" && (
          <section className={box}>
            <h2 className="text-2xl font-bold uppercase">Review your scores</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tap a startup to change its scores.</p>
            <ul className="mt-5 grid gap-2">
              {STARTUPS.map((s, i) => {
                const sc = scores[s.table];
                const ok = isComplete(sc);
                const total = ok ? CRITERIA.reduce((a, c) => a + (sc![c.key] as number), 0) : null;
                return (
                  <li key={s.table}>
                    <button
                      type="button"
                      onClick={() => { setIdx(i); setView("score"); setStatus(""); }}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background px-4 py-3 text-left"
                    >
                      <span className="min-w-0">
                        <span className="block font-bold">{s.name}</span>
                        <span className="block text-sm text-muted-foreground">
                          {ok ? CRITERIA.map((c) => `${c.label.split(" ")[0]} ${sc![c.key]}`).join(" · ") : "Not scored yet"}
                        </span>
                      </span>
                      <span className={`shrink-0 text-xl font-bold ${ok ? "text-secondary" : "text-destructive"}`}>
                        {ok ? total : "!"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={submitFinal}
              disabled={!allDone}
              className="mt-6 w-full rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-primary px-4 py-3 text-lg font-bold uppercase text-primary-foreground shadow-[var(--shadow-brutalist)] disabled:opacity-40"
            >
              {submitted ? "Submit again" : "Submit final scores"}
            </button>
            {!allDone && (
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                Score all {STARTUPS.length} startups to submit ({doneCount} done).
              </p>
            )}
            {status && <p className="mt-3 text-sm font-semibold text-secondary">{status}</p>}
            <button
              type="button"
              onClick={() => { setView("score"); setStatus(""); }}
              className="mt-4 text-sm font-semibold text-secondary underline underline-offset-4"
            >
              Back to scoring
            </button>
          </section>
        )}

        {judge && startup && view === "score" && (
          <>
            <p className="mb-3 text-sm font-bold uppercase text-muted-foreground">
              {doneCount} / {STARTUPS.length} scored
            </p>

            <article className={box}>
              <p className="text-sm font-semibold text-muted-foreground">Startup {idx + 1} of {STARTUPS.length}</p>
              <p className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{startup.name}</p>

              <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6">
                {CRITERIA.map((c) => (
                  <div key={c.key}>
                    <p className="mb-1.5 flex justify-between text-base font-bold sm:mb-2 sm:text-lg">
                      <span>{c.label}</span>
                      <span className="text-secondary">{current[c.key] ?? "–"}</span>
                    </p>
                    <div className="grid grid-cols-10 gap-1 sm:gap-2">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                        const on = current[c.key] === n;
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => update({ [c.key]: n })}
                            aria-pressed={on}
                            aria-label={`${c.label} ${n}`}
                            className={`h-10 rounded-lg border-2 border-[hsl(var(--brutalist-border))] text-sm font-bold sm:h-12 sm:rounded-xl sm:text-lg ${
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
                  className="w-full rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 sm:mt-6">
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
                  className="flex-1 rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-primary px-4 py-2.5 text-base font-bold uppercase text-primary-foreground shadow-[var(--shadow-brutalist)] disabled:opacity-40 sm:py-3 sm:text-lg"
                >
                  {idx === STARTUPS.length - 1 ? "Save & review" : "Save & next"}
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
              onClick={() => { setView("review"); setStatus(""); }}
              className="mt-4 w-full rounded-xl border-2 border-[hsl(var(--brutalist-border))] bg-background px-4 py-2.5 text-sm font-bold uppercase sm:mt-6 sm:py-3 sm:text-base"
            >
              Review all scores &amp; submit
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default SwbOct26Judging;
