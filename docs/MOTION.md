# Motion reels: how to write one

A motion reel is a reel whose picture is motion graphics: kinetic type, animated UI mock-ups, counters, checklists, chat bubbles, price tags, before/after. It is rendered with [HyperFrames](https://github.com/heygen-com/hyperframes) (HTML + GSAP, rendered frame by frame in Chrome). The voice, music, sound effects, captions and cover are the same house pieces every reel uses; you write the picture.

Pick motion for ideas that are **numbers, steps, checklists, tools, before/after, news, a prompt or a screen**. Pick a world reel (characters judging) for panels of shoppers, critics, juries.

The craft rules below are distilled from the open-source iart.ai motion skills (MIT) and the HyperFrames composition contract (Apache-2.0).

## The files you write

Every motion reel is `content/posts/<id>/` with three files:

1. `post.json`: words and timing anchors (below).
2. `scene.html`: one `<style>` block, then the elements. No `<script>`.
3. `scene.js`: GSAP calls on the timeline `tl`, using times from `T`. Nothing else.

The engine records the voice first, so when you write `scene.html` and `scene.js` you are given the real seconds for every line.

### `post.json`

```json
{
  "id": "2026-10-28-reel-five-questions",
  "style": "motion",
  "keyword": "AUDIT",
  "world": "desk",
  "voice": "am_fenrir",
  "speed": 1.08,
  "hot": "^(AUDIT|5|five|gone|free)$",
  "palette": { "bg": "#10131A", "ink": "#F6F1E7", "accent": "#FFC857" },
  "lines": [
    { "say": "Your product page is losing buyers, and it isn't the price.", "show": "Your product page is losing buyers. It isn't the price.", "cut": true },
    { "say": "It's five questions every shopper asks before they buy.", "show": "It's 5 questions every shopper asks.", "cut": true }
  ],
  "sfx": [{ "at": "@line4.voice+1.1", "fx": "thud" }],
  "cover": { "at": "@line3+0.9", "title": ["5 QUESTIONS", "YOUR PAGE MUST ANSWER"] }
}
```

- **lines** (6 to 12, 20 to 30 seconds spoken): `say` is read by the voice (numbers as words, never start with "Claude", 16 words max). `show` is the caption (digits fine, 4 to 9 words). `cut: true` marks a new beat: a whoosh plays there. Mark 4 to 7 lines. Last line says `Comment KEYWORD ...`.
- **world**: still required. If the motion render fails, the reel is made in this world instead, so it is never missing.
- **hot**: regex tested against each caption word (punctuation stripped); matches turn the accent colour.
- **palette**: `bg`, `ink`, `accent` become CSS variables `--bg`, `--ink`, `--accent`. Dark background, light ink, one loud accent. Vary it per reel; keep text contrast at least 4.5:1.
- **sfx**: optional extra sounds: `pop thud click bloop buzz ding whoosh`. `at` is a time (below). Use 2 to 6, on real hits (a stamp, a tick, a slam).
- **cover**: `at` = the moment to photograph (pick one where the idea is fully on screen), `title` = 2 lines, 6 words max each, capitals. The cover puts the titles on top and the frame below.

### Times

Anywhere a time is asked for (`data-from`, `data-to`, `sfx.at`, `cover.at`) write:
- `"@line3"`: when line 3's beat starts on screen (a tenth of a second before the voice).
- `"@line3.voice"`: when the voice starts line 3. `"@line3.end"`: when it finishes.
- `"@line3+0.4"`, `"@line3.voice-0.2"`: offsets in seconds. `"end"`: the end of the reel. Or plain seconds.

In `scene.js` the same are functions: `T.at(3)`, `T.voice(3)`, `T.end(3)`, with an optional offset `T.at(3, 0.4)`. Also `T.dur` (reel length), `T.beat` (0.6 s: the music is 100 BPM from 0), `T.lines[i]` (`a`, `voice`, `end`, `b` = next beat), `T.rand(seed)` (seeded random, returns a function).

## The frame

1080 × 1920, 30 fps. Coordinates are pixels inside the frame.

| Zone | y range | Rule |
|---|---|---|
| Top margin | 0 to 120 | Keep empty (Instagram's top bar). |
| **Stage** | 120 to 1300 | Everything you draw goes here. |
| House captions | 1330 to 1590 | Reserved. The engine draws the spoken words here. Never put anything here. |
| Bottom | 1590 to 1920 | Keep empty (Instagram's caption and buttons). |
| Right rail | x 960 to 1080 | No text (like/comment buttons). Keep text between x 90 and 990. |

The grid crop on the profile shows the middle 1080 × 1440, so the cover idea must sit between y 240 and 1680.

## `scene.html`

- Start with one `<style>` block. Then the persistent background (no timing), then one `<section>` per beat.
- Time a beat with `data-from` and `data-to`: `<section class="scene" id="s2" data-from="@line2" data-to="@line5">`. Outside that window the section is hidden for you. Beats may overlap; later sections paint on top.
- Give every element you animate a unique id (a beat prefix like `#s2-price` avoids clashes), or a class scoped under its section (`#s2 .row`).
- Position with `position: absolute` inside a section that has `left: 0; right: 0; top: 120px; height: 1180px`, or with flex. Size every box; give text a `max-width` or fixed `width` so it wraps inside the frame.
- Fonts (already loaded; no others exist): `var(--display)` = Archivo Black (titles), `var(--body)` = Inter (weights 400, 700, 900), plus `'Bebas Neue'`, `'Permanent Marker'` (hand-written), `'Playfair Display'` (700, editorial), `'Press Start 2P'` (pixel). ₹ works in all of them.
- Text sizes: titles 90 to 140 px, labels 40 to 60 px, nothing under 30 px. At most three sizes on screen at once.
- Draw everything with CSS (gradients, borders, radius, shadows) or inline `<svg>`. No images, no web fonts, no links: **no `http` anywhere**. No emoji (they don't render on the server); draw icons with CSS or SVG.
- No `<br>` inside sentences (let `max-width` wrap them). A short title may put each word in its own block.
- Never give an element a CSS `transform` (or `translate`, `scale`) that `scene.js` also animates; set the start state in the tween instead. A fixed tilt that never animates can use the CSS `rotate:` property on an element you don't tween.
- Elements you scale or move must be block-level and sized (`display: block` or flex). Inline `<span>`s don't transform.
- Overlap on purpose (a stamp over a card)? Put `data-layout-allow-overlap` on the overlapping element. Otherwise the checker fails overlapping text.
- Masks for text reveals: `<span class="mask"><span class="l">Word</span></span>` with `.mask { display: block; overflow: hidden }` and `.mask > span { display: block }`.

## `scene.js`

- Only call `tl.fromTo`, `tl.to`, `tl.set`, `tl.add` with times from `T`. The timeline exists already: never create another, never call `play()`, never touch `window.__timelines`.
- Prefer `fromTo` so every state is defined whatever frame is shown first.
- Forbidden (the render must be the same every time): `Date`, `performance.now`, `Math.random` (use `T.rand(7)`), `setTimeout`, `setInterval`, `requestAnimationFrame`, `fetch`, event listeners, `repeat: -1`.
- Never animate `display`, `visibility` or `autoAlpha`, and never animate a `<section>` itself: animate the elements inside it.
- A counter or clock: tween a plain object and write the text in `onUpdate` (see the example). That is the only allowed `onUpdate`.

## Make it good: the craft

**Retention grammar.** One idea per reel. The hook text is on screen at frame 0 and the strongest visual is already there: no fade-up from black, no slow ramp. Open a question in the first 3 seconds and close it at the end. A visible change every 2 to 4 seconds (a new beat, a punch-in, a counter, a slam), at uneven intervals so it feels like momentum, not a metronome. No flat middle: every beat either shows the next piece of the idea or resets attention. The last beat is the keyword, big, with a reason to comment.

**Show the idea, don't repeat the caption.** The captions already carry the words. The stage shows the thing: the product page, the five slots filling, the clock running down, the fix list, the comment bubble. Big words on stage are 1 to 3 words (a title, a number, a verdict), never the full sentence.

**Three layers in every beat.** Hero: the one thing the eye follows (enters first, biggest move). Support: the pieces that react to it (rows, ticks, labels, settling 40 to 80 ms later). Texture: background life that never asks for attention (slow drifting gradient blobs across the whole reel, a faint grid). No more than a third of the elements move at once.

**Easing.**

| Move | GSAP ease | Duration |
|---|---|---|
| Enter | `expo.out` or `power3.out` | 0.35 to 0.6 s |
| Exit | `power3.in` | 0.2 to 0.3 s |
| Move on screen | `power2.inOut` | 0.3 to 0.5 s |
| Pop / branded | `back.out(1.8)` | 0.3 to 0.5 s |
| Slam (stamp, verdict) | `power4.in` from big scale | 0.2 to 0.3 s |
| Background drift, scan line | `sine.inOut` / `none` | whole beat |

Never `linear` on a discrete event. Bigger things move slower. Stagger lists 0.05 to 0.08 s per item, characters 0.02 to 0.04 s, total reveal under 0.8 s. Nothing travels more than a third of the screen in one straight move.

**Weight.** Anticipation: a tiny dip (`scale 0.95`) before a pop. Follow-through: attached pieces settle after the hero lands. A shake (`x` yoyo, 5 to 8 repeats of 0.05 s) sells a mistake; a 1.05 bump sells a success.

**On the beat.** The music is 100 BPM: hits land well on `T.voice(n) + k * T.beat` or half beats. Line hits up with the words: the stamp lands as the voice says the word (spread by fraction of the spoken span: `T.voice(n) + 0.6 * (T.end(n) - T.voice(n))`).

**Kinetic type.** Titles enter with a mask reveal (`yPercent: 110 → 0`, `expo.out`, lines 0.08 s apart). Other reveals: blur-in (`filter: blur(12px) → blur(0px)` with opacity), clip wipe (`clipPath: 'inset(0 100% 0 0)' → 'inset(0 0% 0 0)'`), typing (`steps(n)` on a clip wipe). One technique per beat.

**Move library** (pick what fits the idea; combine 3 to 5 per reel):
- Product page mock-up: card, image block drawn with gradients, title, price chip, buy button; a stamp slams onto the part that matters.
- Slots filling: empty dashed rows that fill (cream background, dark text) as each item is said.
- Checklist scan: a window with three dots, a highlight bar sweeping down, ticks popping on the beat.
- Counter or clock: big number counting to a value (label example numbers as "example").
- Chat: bubbles left/right, a typing indicator of three dots before each reply, each bubble pops with a `pop` sound.
- Price: was/now with a strike line drawing across (`scaleX 0 → 1`, origin left).
- Before / after: split frame, a divider wipes across.
- Prompt box: a text field types the input, a GO button presses, the answer card slides in.
- Comment CTA: avatar plus a bubble whose keyword letters drop in on the beat, a small sticker ("FREE · 5 MIN").

**House look.** Dark, rich background with drifting colour blobs and a faint grid; cream cards with near-black text; one accent colour for the words that matter; rounded corners 20 to 40 px; soft deep shadows. Every reel in a week uses a different palette and different moves.

## Honesty

Never invent results, revenue, clients or statistics. Anything that looks like data is labelled `example` on screen. The tool must really do what the reel says it does: read the tool's description before writing the payoff.

## Before you return it

- The hook text and the main visual are visible at 0.0 s.
- Something changes at least every 4 seconds; the keyword is huge in the last beat.
- Nothing in y 1330 to 1920, nothing outside x 90 to 990 except backgrounds.
- Every id you animate exists in `scene.html`; every section has `data-from`.
- No `http`, no `<script>`, no `<br>` mid-sentence, no emoji, no forbidden calls.

The checker (HyperFrames lint plus a browser pass for layout, overlap and contrast) runs after you; if it finds errors you get them back to fix.

## Example

`content/posts/m01-five-questions/` (post.json, scene.html, scene.js) is a finished motion reel that passed the checker. Reply with exactly two fenced blocks: first ```html (scene.html), then ```js (scene.js).
