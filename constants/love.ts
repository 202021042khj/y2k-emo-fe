import type { Chapter, Device, ObjectDetail, ObjectSlug, OrbitObject, SceneKey } from "@/types/love";

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
  { role: "made by", name: "Hojin Kang" },
];

export const OBJECT_DETAILS: Record<ObjectSlug, ObjectDetail> = {
  phone: {
    slug: "phone",
    object: PHONE,
    properties: [
      { label: "type", value: "clamshell phone, chrome" },
      { label: "size", value: "fits in a back pocket, barely" },
      { label: "created", value: "christmas 2004" },
      { label: "battery", value: "3 days, if nobody texts" },
      { label: "attributes", value: "bedazzled, cracked, loved" },
    ],
    details: [
      {
        image: "/details/phone-1.webp",
        alt: "Macro of the phone hinge covered in tiny hot pink rhinestones.",
        caption: "the hinge",
        note: "Two hundred rhinestones, glued on one at a time during a sleepover.",
      },
      {
        image: "/details/phone-2.webp",
        alt: "Macro of the cracked inner screen with a faint pink heart behind the glass.",
        caption: "the screen",
        note: "Dropped once, the night of the text. The heart wallpaper still shows through.",
      },
    ],
    action: {
      folder: "/frames/phone-action",
      count: 121,
      poster: "/frames/phone-action-poster.webp",
      alt: "The flip phone's screens light up and a message icon starts blinking.",
    },
    actionSubtitle: "it lit up. it was not them.",
    next: "cd",
  },
  cd: {
    slug: "cd",
    object: CD,
    properties: [
      { label: "type", value: "portable cd player, clear" },
      { label: "size", value: "one burned cd-r, 80 min" },
      { label: "created", value: "2:04 a.m., spring 2005" },
      { label: "tracks", value: "18, every one a hint" },
      { label: "attributes", value: "skips on stairs, never returned" },
    ],
    details: [
      {
        image: "/details/cd-1.webp",
        alt: "Macro of a smudged sharpie heart on a rainbow CD surface.",
        caption: "the disc",
        note: "Sharpie heart, smudged by a thumb before it dried. Track 07 is circled on the case.",
      },
      {
        image: "/details/cd-2.webp",
        alt: "Macro of tangled black earbud cables with a silver safety pin clipped on.",
        caption: "the earbuds",
        note: "One side stopped working. The safety pin kept the cable from tangling. It didn't.",
      },
    ],
    action: {
      folder: "/frames/cd-action",
      count: 121,
      poster: "/frames/cd-action-poster.webp",
      alt: "The burned CD spins up inside the clear player and the lid closes.",
    },
    actionSubtitle: "press play. skip to 07.",
    next: "heart",
  },
  heart: {
    slug: "heart",
    object: HEART,
    properties: [
      { label: "type", value: "chrome heart, pendant-sized" },
      { label: "size", value: "bigger than it looks" },
      { label: "created", value: "2006, after the top 8 change" },
      { label: "status", value: "not responding" },
      { label: "attributes", value: "pinned, wired, cracked" },
    ],
    details: [
      {
        image: "/details/heart-1.webp",
        alt: "Macro of black barbed wire wrapped around an iridescent chrome surface.",
        caption: "the wire",
        note: "Wrapped on so nothing else gets in. Mostly worked.",
      },
      {
        image: "/details/heart-2.webp",
        alt: "Macro of a silver safety pin piercing chrome beside a glowing pink crack.",
        caption: "the pin",
        note: "A safety pin holds it together. It's the most punk thing it's ever done.",
      },
    ],
    action: {
      folder: "/frames/heart-action",
      count: 121,
      poster: "/frames/heart-action-poster.webp",
      alt: "The glowing pink crack spreads across the chrome heart and pulses.",
    },
    actionSubtitle: "it still beats. it just glows now.",
    next: "phone",
  },
};

export const DETAIL_SCENES = 5;

/** Detail films end at 00:01:36:00 */
export const DETAIL_TOTAL_FRAMES = 96 * 24;
