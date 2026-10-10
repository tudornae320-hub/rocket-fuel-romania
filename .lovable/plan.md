# Judging area for Sunday finals (Google Sheet, no Cloud)

## What judges see (unlisted page: /swb-oct26/judging)
- Mobile-friendly, same style as the mentor schedule, no menu link.
- Step 1: pick your name (Bogdan Deac, Raluca Epureanu, Lucian Popovici). The phone remembers the choice, and links like ?judge=bogdan-deac work too.
- Step 2: one startup at a time, in table order (14 startups from the mentor schedule):
  - startup name and table number
  - 3 rows of 1–10 buttons: Validation, Execution & Design, Business Model
  - optional short note
  - "Save & next", plus Previous / Next
- A progress line ("5 / 14 scored") and a list of startups with a tick on the ones already scored, so judges can go back and change a score.
- Each judge's scores are also kept on their phone, so nothing is lost if the signal drops. A "Resend all" button sends everything again.

## Where the answers go
- Every save adds a row to your Google Sheet: time, judge, table, startup, Validation, Execution & Design, Business Model, total, note.
- If a judge changes a score, a new row is added. A second tab, "Latest", automatically shows only each judge's most recent score per startup, plus totals and a ranking.
- To get Excel: in Google Sheets, File → Download → Microsoft Excel.

## Fewer startups tomorrow
- Startups that don't show up can be removed from the judges' list with a quick message to me before the pitches start. They come out of the list in a single change.

## One-time setup (about 5 minutes, I'll give you exact steps)
1. Create a new Google Sheet.
2. Extensions → Apps Script, paste the short script I give you, click Deploy → Web app (Execute as: Me, Access: Anyone).
3. Paste the web app link back here in chat. I add it to the page.

## Limits to know
- Anyone with the page link could send scores, so share the link only with the 3 judges. The page isn't in any menu.

## Technical details
- New page `src/pages/SwbOct26Judging.tsx`, route `/swb-oct26/judging` in App.tsx, no nav entry. Startup list is reused from the mentorship TABLES data (moved to a shared `src/data/swbOct26.ts`), with an `active` flag.
- Submission: `fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: JSON })` (text/plain to avoid a CORS preflight). Apps Script `doPost` appends to the "Responses" sheet. The "Latest" tab is built with formulas the script sets up on first run.
- Local copy in localStorage per judge (`swb-oct26-judge`, `swb-oct26-scores-{judge}`) for progress ticks and resend.
- Record the route rule in AGENTS.md.
