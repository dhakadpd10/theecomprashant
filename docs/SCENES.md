# Writing posts: reel and carousel specs

Every post is one folder in `content/posts/<id>/`. A reel has `post.json`; a carousel has `carousel.json`. Both have `caption.txt`. The engine turns the spec into `reel.mp4` + `cover.png/jpg` or `slide-NN.png/jpg`.

## Reel: `post.json`

```json
{
  "id": "2026-10-19-reel-launch",
  "keyword": "LAUNCH",
  "world": "courtroom",
  "voice": "am_fenrir",
  "speed": 1.08,
  "hot": "^(LAUNCH|12|twelve|judge)",
  "page": { "title": "Glow Night Cream", "price": "₹1,299", "label": "NEW" },
  "cast": [ { "name": "Student", "col": "#7DD3C0", "prop": "phone" } ],
  "lines": [
    { "say": "Stop asking your team if the launch is good.", "card": "STOP ASKING YOUR TEAM", "scene": { "type": "page" } },
    { "say": "Ask twelve AI customers.", "show": "Ask 12 AI customers.", "card": "ASK 12 AI CUSTOMERS", "scene": { "type": "drop", "big": "×12" } }
  ],
  "cover": { "title": ["12 AI CUSTOMERS", "JUDGE YOUR LAUNCH"], "line": 5, "lt": 4, "shift": 150 }
}
```

- **world**: the reel's look. Every reel in a week uses a different one, chosen to fit the topic:
  - `stage`: dark night stage, spotlight, paper sticker titles (the original look)
  - `courtroom`: wood-panelled court, marble columns, gold plaque titles: trials, verdicts, juries, judging
  - `bazaar`: Indian market street at dusk, string lights, striped awning, price-tag titles: shoppers, pricing, festivals, selling
  - `desk`: top-down founder desk, coffee, sticky notes, paper-cutout characters: audits, checklists, planning, workflows
  - `arcade`: synthwave arcade, neon grid, pixel titles, robots: automation, agents, tools, hacks, speed
  - `studio`: TV news studio, globe, ticker, lower-third titles: news, new features, announcements, trends
  - `notebook`: ruled notebook paper, doodles, marker titles: lessons, frameworks, copywriting, hooks
  - `space`: space with planet and stars, neon titles, robots: big ideas, AI teams, scaling, the future
  - `gameshow`: game-show stage, curtains, spotlights, marquee titles: versus, votes, A/B tests, prices, challenges
- **lines** (7–11): each is one spoken sentence. `say` is what the voice reads (numbers as words: "twelve", "ninety-seven"); `show` is the on-screen caption (digits allowed). The voice must never start a line with "Claude". Hook = first 1–2 lines. Last line = `Comment KEYWORD and I'll send you the free ...` so it loops back to the hook.
- **card**: the sticker title at the top, 6 words max, capitals. A line without `card` keeps the previous card.
- **scene**: what's on screen during the line. A line without `scene` continues the previous scene (good for a 2-line beat). Times inside a scene are seconds from that scene's start; `"@line7+0.2"` means 0.2 s after line 7 starts.
- **cast**: up to 16 characters. `col` is a hex colour, `prop` is one of `question tag gift glass phone heart shades gavel cart none`. Refer to them by index.
- **hot**: regex of words to colour yellow in captions.
- **page**: optional mock product page (`title`, `price`, `label`, `button`, `url`, `line`, `fixedLine`).

### Scene types

| type | params | shows |
|---|---|---|
| `page` | `ghosts` (bool: grey visitors walk away), `pins` [{x,y,label,at}] (page coords 0–740 × 0–820: price 690,200 · reviews 690,262 · title 690,132 · shipping 690,686), `who` + `whoAt` + `say` [2 lines] (a character complains), `fixAt` + `fixes` (pins flip to FIXED, counter) | the product page |
| `drop` | `ids` [cast idx] (>6 goes to two rows), `big` (e.g. "×7"), `bigSize`, `mood` | characters fall in |
| `grid` | `leave` (e.g. 97), `leftLabel`, `stayLabel` | 100 dots, most walk out |
| `chat` | `text` (typed into a Claude chat box), `ids` | characters pop out of the chat |
| `lineup` | `rows` [[ids],[ids]], `reveal` [ids appearing now], `shown` [ids already visible], `mood` | characters in booths with name chips |
| `versus` | `left`/`right`: {who, tag, say [lines], mood, col}, `gap` (seconds before right appears) | two characters argue |
| `jury` | `ids`, `cols`, `walls`, `votes` [text per id], `voteAt`, `voteStep`, `tally`, `noLabel` | a grid that votes; "BUY" is green, anything else red |
| `list` | `title`, `items` [3–4 short lines], `who`, `mood` | checklist ticking in |
| `verdict` | `who`, `stamp` (≤ 14 chars), `sub`, `size`, `col` | a judge and a stamp |
| `stat` | `big` (e.g. "5 MIN", "200"), `label` | one giant number |
| `cta` | `sub`, `ids` | "Comment KEYWORD" with happy characters |

Moods: `neutral happy frown angry`.

## Carousel: `carousel.json`

```json
{
  "id": "2026-10-19-carousel-store",
  "keyword": "STORE",
  "cast": [ { "name": "First-time buyer", "col": "#7DD3C0", "prop": "question" } ],
  "slides": [
    { "type": "cover", "title": ["WHY SHOPPERS LEAVE", "YOUR PRODUCT PAGE"], "sub": "6 leaks to check tonight", "art": { "page": true, "w": 520, "y": 640 } },
    { "type": "stake", "title": "97 of every 100 visitors leave without buying.", "hot": ["97", "100"], "body": "...", "art": { "cast": [ { "who": 0 } ] } },
    { "type": "idea", "num": 1, "title": "The delivery fee shows up late", "body": "≤ 25 words", "art": { "cast": [ { "who": 0, "mood": "frown", "s": 1.2, "y": 1180 } ], "say": ["How big", "is it?"], "sayX": 600, "sayY": 930 } },
    { "type": "recap", "title": "CHECK THESE 6 TONIGHT", "items": ["...", "..."], "foot": "Screenshot this." },
    { "type": "cta", "body": "and 7 AI shoppers check your page for all 6. Free, in your DMs." }
  ]
}
```

8–10 slides: `cover` → `stake` → `idea` × N → `recap` → `cta`. Cover lines ≤ 6 words. Idea body ≤ 25 words. `art` can hold `page` (mini product page, with `pins` [{x,y,label}]), `cast` [{who, x, y, s, mood}] and `say` (a speech bubble).

## Caption (`caption.txt`)

Reels: `Comment "KEYWORD" and I'll DM you the free <tool>: <one-line promise>. Follow so the DM lands 📩` → `👇 READ BELOW` → 4–5 numbered steps → What you get → Why it works → The catch → `Comment "KEYWORD" for the <tool>.` → 3 hashtags. First line ≤ 125 characters. One ask only. No em dashes.
Carousels: line 1 is the hook, then the list in plain words, then one ask (the keyword), 3 hashtags.
