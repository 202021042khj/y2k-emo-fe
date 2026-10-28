# love.exe — design plan

Y2K cyber with a little emo. One page that plays like an edited music video or a keynote, not a website.

## Story

"love.exe has stopped responding" — the 2000s through the objects that held our feelings: the flip phone we waited on, the burned CD we gave away, the chrome heart we wore. Each object gets a scene; the camera orbits it as you scroll, like an Apple product reveal.

## Scenes (each is a full-screen "shot")

1. Cold open — black, a blinking cursor types the title. Timecode starts.
2. Object 1: chrome flip phone — orbit. Caption: "1 new message".
3. Chapter card — what Y2K cyber was (chrome, holograms, translucent plastic, the millennium bug).
4. Object 2: burned CD + clear Discman — orbit. Caption: "track 07 — you know which one".
5. Chapter card — where emo came in (black, hot pink, checkerboard, away messages, top 8).
6. Object 3: chrome heart, safety pin through it — orbit. Caption: "heart.exe has stopped responding".
7. End credits — rolling credits, "fin." and a restart button.

## Presentation, not website

- Every scene is exactly one viewport; scroll snaps scene to scene.
- Persistent "video" chrome: letterbox bars, timecode, scene counter, a scrub bar showing progress through the whole page.
- Captions sit low and centered like subtitles.
- Transitions between scenes are cuts, glitches and wipes, not fades on every element.
- No nav bar, no cards, no footer links.

## Color

| Token | Hex | Role |
|---|---|---|
| void | `#07060A` | background |
| chrome | `#D9DDE6` | metal type, highlights |
| hot pink | `#FF2E88` | emo accent, REC dot, scrub bar |
| cyber blue | `#3DF2FF` | hologram, glitch split |
| bruise | `#5B2A86` | holographic shadow |
| paper | `#F2EFE9` | subtitle text |

## Type

- Display: a wide chrome-ready sans for titles (set as chrome gradient with chromatic split).
- Subtitles and UI: a monospace for timecode and captions, like a camcorder overlay.
- Sentence case for captions; lowercase file-name style (`love.exe`) for chapter titles.

## Motion

- Orbit videos scrub with scroll; a full turn takes 2–2.5 viewports.
- One glitch cut per chapter change. Everything else holds still.
- prefers-reduced-motion: no snapping, posters instead of orbits, no glitch.
