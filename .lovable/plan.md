

## Plan: Make hero year text a link back to /past-editions

### Change (single file: `src/pages/PastEditionDetail.tsx`)

Wrap each hero `<h1>` element displaying the year (2024, 2025, 2023, and the fallback) in a `<Link to="/past-editions">` component. Add `cursor-pointer` and a subtle hover effect (e.g., opacity transition or scale) so users understand it's clickable.

There are 4 locations with the large year heading:
- ~line 417-426 (2024 hero)
- ~line 689-698 (2025 hero) 
- ~line 947 (fallback)
- ~line 1000-1009 (2023 hero)

Each `<h1>` gets wrapped in `<Link to="/past-editions">` with hover styling. Import `Link` from `react-router-dom` (already imported as `useParams`, just add `Link`).

