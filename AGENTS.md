# Architecture rules
- Store newly extracted uploaded mentor portraits as Lovable Assets pointers and use their URLs in the existing mentor carousel; this preserves source photos without adding binary media to the repository.
- Keep the October participant roster in a dedicated page at /swb-oct26 without navigation links; this makes the event reference accessible by direct URL without changing the main site menu.- Keep October event data (startup tables) in src/data/swbOct26.ts and judging at unlisted /swb-oct26/judging posting to a user-owned Google Apps Script; avoids enabling a backend.
