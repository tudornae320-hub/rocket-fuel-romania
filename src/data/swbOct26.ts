// Physical table assignment used by the mentorship schedule (Room 1 = 1-7, Room 2 = 8-14).
export const TABLES: Record<number, string> = {
  1: "AirSpot",
  2: "3onsai",
  3: "Denki Management",
  4: "Knowledge as Liquidity",
  5: "HAI: Plans With Friends",
  6: "CityFix",
  7: "logiplay",
  8: "Artimedi",
  9: "CLNR",
  10: "NestRay",
  11: "Devino Hacker",
  12: "Doomate",
  13: "Temelia",
  14: "RentSharing",
};

// Tables not pitching in the finals (remove from judging list).
export const INACTIVE_TABLES: number[] = [];

// Finals pitch order, Sunday 11 October 2026 — drives the judging page.
export const PITCH_ORDER: string[] = [
  "HAI: Plans With Friends",
  "AirSpot",
  "EduQuest",
  "Temelia",
  "Devino Hacker",
  "logiplay",
  "3ONSAI",
  "CityFix",
  "BookMap",
  "Denki Management",
  "Doomate",
  "Artimedi",
  "CLNR",
  "RentSharing",
];

// Drop a startup from judging without touching the pitch order above.
export const INACTIVE_PITCHES: string[] = [];
