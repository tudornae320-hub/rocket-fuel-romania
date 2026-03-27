

## Plan: Align CTA section with "54 hours" section

### Problem
The "Ready to build something great?" CTA block doesn't left-align with the "54 hours to build a startup" section because:
- "54 hours" section: `container mx-auto px-4` → `max-w-6xl mx-auto` (narrower centered content)
- CTA section: `container mx-auto px-0` → no `max-w-6xl` wrapper (uses full container width)

### Changes (`src/pages/Home.tsx`)

1. **Line 759** — Add `max-w-6xl` wrapper inside the CTA container to match the "54 hours" section layout:
   - Wrap the grid in `max-w-6xl mx-auto` 
   - Restore `px-4` on the container (matching the other section)
   - Remove the manual `px-4 lg:pl-4 lg:pr-0` from the left column (no longer needed)

Resulting structure:
```
<div className="container mx-auto px-4 relative z-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
    <div className="text-center lg:text-left">
      ...
    </div>
    <div className="flex justify-center lg:justify-start">
      ...
    </div>
  </div>
</div>
```

This mirrors the exact same container → max-w-6xl → content pattern used by the "54 hours" section, ensuring left edges align perfectly.

