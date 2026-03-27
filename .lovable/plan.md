

## Plan: Replicate the staggered card layout for "How It Works" section

### What
Replace the current plain grid "How It Works" section (lines 595-656) with an exact replica of the original card section's layout (lines 450-591) — including the staggered vertical offsets (`-translate-y-24` / `translate-y-24`), the three animated arrow SVGs between cards, and the same scroll-progress-based reveal animation.

### Changes (single file: `src/pages/Home.tsx`)

1. **Add a new scroll ref and progress tracker** for the second arrow section (e.g. `arrowsSectionRef2` / `arrowsProgress2`), mirroring the existing `arrowsSectionRef` / `arrowsProgress` pattern.

2. **Replace the "How It Works" section** (lines 595-656) with a structure identical to lines 450-591:
   - Same `relative grid` container with `mt-40 md:mt-48`
   - Three arrow SVGs positioned identically (below card 1, above card 2, below card 3) using `sageterSvg`, with the same rotation, flip, and mask-based scroll reveal — but referencing the new `arrowsProgress2`
   - Cards 1 & 3 use `md:-translate-y-24`, Cards 2 & 4 use `md:translate-y-24`
   - Keep the new content (Meet & Pitch / Team Up / Build & Validate / Demo Day) and icons (Mic, Users, Hammer, Trophy)

3. **No other changes** — purely structural duplication with different content.

### Technical details
- The existing scroll progress logic uses `useEffect` + `IntersectionObserver` or scroll listener tied to `arrowsSectionRef`. The same pattern will be duplicated for `arrowsSectionRef2`.
- Arrow positioning uses absolute positioning with percentage-based `left` and `top` offsets, identical to the original.

