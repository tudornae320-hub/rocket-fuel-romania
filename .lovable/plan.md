

## Replace sponsors section with "Powered by" + "Supported by" layout

### What changes

The current "Sponsors & Partners" section will be restructured into two sub-sections:

1. **"Powered by"** -- Techstars + Stripe logos displayed large and centered (static, no carousel)
2. **"Supported by"** -- The scrollable carousel remains the same size but all current logos are replaced with the 8 uploaded logos: Code Society, Nova, Ambasada, Brewtifi, Make IT in Oradea, How To Web, Featherless.ai, and one more (the numbered uploads)

The "Supported by the best" subtitle is removed.

### Technical details

**Files to create/modify:**

1. **Save 8 uploaded logos** to `src/assets/sponsors/` as:
   - `code-society.png` (Logo_Partner_SWB-1)
   - `nova.png` (Logo_Partner_SWB-2)
   - `ambasada.png` (Logo_Partner_SWB-5)
   - `brewtifi.png` (replace existing, Logo_Partner_SWB-6)
   - `make-it-oradea.png` (replace existing, Logo_Partner_SWB-7)
   - `how-to-web.png` (Logo_Partner_SWB-8)
   - `featherless-ai.png` (Logo_Partner_SWB-9)

2. **`src/pages/Home.tsx`** -- Restructure the partners section:
   - Remove the "Supported by the best" subtitle
   - Add a "Powered by" sub-section with Techstars and Stripe logos displayed large (using existing assets)
   - Add a "Supported by" heading above the `ScrollableSponsors` component

3. **`src/components/ScrollableSponsors.tsx`** -- Replace the sponsors array:
   - Remove all current sponsor imports and entries (Stripe, Veridion, VSFA, BOS Romania, PROW, VIP Romania, V7 Capital, Launch.ro, Business Club, Third Place, Code Cup, and old Techstars/Brewtifi/Make It Oradea)
   - Add new imports for the 7 uploaded logos
   - Update sponsors array with: Code Society, Nova, Ambasada, Brewtifi, Make IT in Oradea, How To Web, Featherless.ai

