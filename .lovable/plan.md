

## Plan: Remove gap between CTA text and polaroid

### What
Remove padding/margins creating the visual gap between the left CTA block and right polaroid stack.

### Changes (single file: `src/pages/Home.tsx`)

1. **Line 759** — Remove `px-4` from the container div so there's no horizontal padding pushing content inward:
   - Change `container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center`
   - To `container mx-auto px-0 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center`

2. **Line 761** — Remove any padding/margin on the left column div (currently just `text-center lg:text-left`, so likely fine — but add `px-4 lg:pl-4 lg:pr-0` to keep left text readable while eliminating right-side space).

3. **Line 888** — Remove right-side spacing on the polaroid column: change `flex justify-center lg:justify-end` to `flex justify-center lg:justify-end lg:pr-0` (or remove any implicit spacing).

The core issue is `px-4` on the container plus the `container` class max-width creating whitespace. We'll keep `px-4` only on the left text column and let the polaroid sit flush on the right.

