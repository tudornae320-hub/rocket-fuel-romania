# Judging area for Sunday finals

## What judges see (unlisted page: /swb-oct26/judging)
- Mobile-friendly, same brutalist style as the mentor schedule, no menu link.
- Step 1: pick your name from a dropdown with the 3 jurors (Bogdan Deac, Raluca Epureanu, Lucian Popovici). The choice is remembered on that phone, and links like ?judge=bogdan-deac work too.
- Step 2: one startup at a time, in table order. Each startup card has:
  - startup name and table number
  - 3 rows with buttons 1–10: Validation, Execution & Design, Business Model
  - an optional short note field
  - "Save & next" button, plus Previous / Next to move between startups
- A small progress line ("5 / 14 scored") and a list showing which startups are done, so judges can jump back and change a score. Re-saving overwrites that judge's previous score.

## What you see (unlisted page: /swb-oct26/judging/results)
- Opened with a passcode only you know.
- Table of every startup: each judge's 3 scores, each judge's total, and the overall total/average, ranked.
- "Download Excel" button: one sheet with all raw scores (judge, startup, 3 criteria, total, note, time), one sheet with the ranking.
- Turn startups on/off here (for teams that don't show up tomorrow). Hidden startups disappear from the judges' list.

## Saving the answers
- Scores are saved online with Lovable Cloud, so all 3 judges' answers land in one place instantly and survive refreshes or phone switches.
- No logins for judges (to keep it fast on the day). The results page and the on/off switches are protected by your passcode, checked on the server.

## Technical details
- Enable Lovable Cloud.
- Tables: `judging_startups` (table_no, name, active), `judging_scores` (judge_slug, startup_id, validation, execution, business_model 1–10 check constraints, note, updated_at; unique judge+startup for upsert). Seed 14 startups from the mentorship TABLES map.
- RLS: anon may read active startups and insert/update scores (upsert by judge+startup); reading all scores, toggling startups and exporting go through an edge function that checks a `JUDGING_ADMIN_PASSCODE` secret.
- Excel generated in the browser with SheetJS (`xlsx`) from data returned by the admin edge function.
- New pages `SwbOct26Judging.tsx` and `SwbOct26JudgingResults.tsx`, routes in App.tsx, no nav entries. Record route rule in AGENTS.md.
