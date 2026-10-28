import type { Chapter, Device, OrbitObject, SceneKey } from "@/types/love";

/**
 * Desktop and Mobile trees both mount (only one is visible), so anchor ids
 * must differ per device or links would jump to the hidden copy.
 */
export const sceneId = (device: Device, key: SceneKey) => (device === "mobile" ? `m-${key}` : key);

export const SCENE_ORDER: readonly SceneKey[] = ["open", "phone", "y2k", "cd", "emo", "heart", "credits"];

/** Total running time shown by the timecode at the very end: 00:04:12:20 at 24 fps */
export const TOTAL_FRAMES = (4 * 60 + 12) * 24 + 20;

export const PHONE: OrbitObject = {
  key: "phone",
  label: "object 01",
  title: "flip phone, 2004",
  subtitle: "1 new message.",
  frames: {
    folder: "/frames/phone",
    count: 121,
    poster: "/frames/phone-poster.webp",
    alt: "A chrome flip phone with pink rhinestones and a cracked screen, turning in a black void.",
  },
  callouts: [
    { text: "pink rhinestones, applied by hand", at: 0.08, left: "11%", top: "37%" },
    { text: "cracked screen, never fixed", at: 0.3, left: "57%", top: "31%" },
    { text: "23:59. still waiting.", at: 0.55, left: "62%", top: "58%" },
  ],
};

export const CD: OrbitObject = {
  key: "cd",
  label: "object 02",
  title: "burned cd, 2005",
  subtitle: "track 07. you know which one.",
  frames: {
    folder: "/frames/cd",
    count: 121,
    poster: "/frames/cd-poster.webp",
    alt: "A clear plastic CD player holding a burned CD with a hand-drawn heart, turning in a black void.",
  },
  callouts: [
    { text: "burned at 2 a.m.", at: 0.08, left: "15%", top: "41%" },
    { text: "sharpie heart, slightly smudged", at: 0.3, left: "57%", top: "35%" },
    { text: "skip protection: none", at: 0.55, left: "60%", top: "62%" },
  ],
};

export const HEART: OrbitObject = {
  key: "heart",
  label: "object 03",
  title: "chrome heart, 2006",
  subtitle: "heart.exe has stopped responding.",
  frames: {
    folder: "/frames/heart",
    count: 121,
    poster: "/frames/heart-poster.webp",
    alt: "A chrome heart pierced by a safety pin and wrapped in barbed wire, glowing pink through a crack.",
  },
  callouts: [
    { text: "safety pin, for holding things together", at: 0.08, left: "9%", top: "52%" },
    { text: "barbed wire, for keeping things out", at: 0.3, left: "60%", top: "41%" },
    { text: "crack, since 2006", at: 0.55, left: "62%", top: "58%" },
  ],
};

export const Y2K: Chapter = {
  key: "y2k",
  label: "chapter 1",
  title: "y2k.cyber",
  body: "Around 2000 the future looked like liquid metal. Chrome, holograms, see-through plastic and a bug that might end the world made everyday tech feel like science fiction.",
  files: [
    { name: "chrome.png", description: "Everything shiny, even the mouse.", year: "1999" },
    { name: "hologram.gif", description: "Stickers, cards and phone cases that changed color.", year: "2000" },
    { name: "translucent.plastic", description: "See the circuits. iMacs, Game Boys, CD players.", year: "1998" },
    { name: "bug.y2k", description: "Clocks rolled over. Nothing ended. We kept the look.", year: "2000" },
  ],
};

export const EMO: Chapter = {
  key: "emo",
  label: "chapter 2",
  title: "emo.mp3",
  body: "Then the chrome got moody. Emo brought eyeliner, hot pink, checkerboard and song lyrics in away messages. The same shiny tech, now carrying heartbreak.",
  files: [
    { name: "away_message.txt", description: "Song lyrics, posted at midnight, meant for one person.", year: "2004" },
    { name: "top8.html", description: "A public ranking of your friends. What could go wrong.", year: "2005" },
    { name: "mixtape_for_u.cda", description: "Eighteen tracks, every one a hint.", year: "2005" },
    { name: "eyeliner.exe", description: "Applied heavily. Smudged on purpose.", year: "2006" },
  ],
  checkerboard: true,
};

export const CREDITS: readonly { role: string; name: string }[] = [
  { role: "directed by", name: "your 2000s" },
  { role: "starring", name: "a flip phone, a cd player, a chrome heart" },
  { role: "soundtrack", name: "track 07" },
  { role: "made with", name: "Higgsfield, Figma, Next.js" },
];
