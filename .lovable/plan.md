

## Plan: Add a video/gif polaroid card to the Home page

### What
A decorative polaroid stack near the bottom of the Home page — same visual style as the Past Editions polaroid cards. The **front (main) polaroid** displays a gif (`video_hero_2.gif`), and the **two background polaroids** (left and right) show static images from the existing event photos. On hover, the side polaroids fan out just like the Past Editions page.

### Where
Insert a new section in `src/pages/Home.tsx` just **before** the final CTA section ("Ready to build something great?"), roughly around line 760.

### Implementation (single file: `src/pages/Home.tsx`)

1. **Add state** — a boolean `isPolaroidHovered` to track hover.

2. **Add a new section** with the same polaroid structure used in `PastEditions.tsx`:
   - Parent container with `onMouseEnter`/`onMouseLeave` toggling `isPolaroidHovered`
   - **Left polaroid** — static image (e.g. a 2025 event photo from `/2025/may/...`), tilted left, fades/slides in on hover
   - **Right polaroid** — static image (e.g. a 2024 event photo from `/2024/...`), tilted right, fades/slides in on hover
   - **Main polaroid** — `<img src={heroBackground}>` (the gif), raises up on hover
   - Same white border, black shadow, rounded-sm styling as existing polaroids

3. **Purely decorative** — no `<Link>`, no navigation on click.

4. Reuse the exact same CSS transition classes (`transition-all duration-500 ease-out`) and hover transforms (rotation, translation, opacity) from the Past Editions polaroid pattern.

