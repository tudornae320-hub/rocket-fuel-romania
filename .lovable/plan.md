

## Plan: Unify year card and polaroid hover/click behavior

Currently each edition section has two separate elements:
1. **Polaroid group** — hovering fans out side polaroids, clicking navigates to `/past-editions/{year}`
2. **Year card** (e.g. "2025") — has a basic `hover-lift` effect, no click action, no connection to polaroid animation

### Changes (single file: `src/pages/PastEditions.tsx`)

**For each edition (2025, 2024, 2023):**

1. **Wrap both polaroid group and year card in a single parent container** that handles `onMouseEnter` / `onMouseLeave` — so hovering the year card triggers the same polaroid fan-out animation as hovering the photos.

2. **Make the year card a `<Link>`** to `/past-editions/{year}` so clicking it navigates the same way as clicking the main polaroid.

3. **Remove the separate `onMouseEnter`/`onMouseLeave`** from the polaroid `div` since the parent now handles it.

This means the hover zone expands to cover both the polaroid stack and the year label below it, creating a unified interactive area. Hovering anywhere in that zone fans the polaroids; clicking either the photos or the year card navigates to the edition page.

### Technical detail

- Move `onMouseEnter={handle20XXHoverStart}` and `onMouseLeave={() => setHoveredIndex(null)}` from the polaroid container `div` up to the parent `div` that wraps both polaroid + card.
- Change each `<Card className="hover-lift ...">` wrapping the year text into a `<Link to="/past-editions/{year}"><Card ...>...</Card></Link>` (or wrap the Card's content in a Link).
- Add `cursor-pointer` to the year card for visual affordance.

