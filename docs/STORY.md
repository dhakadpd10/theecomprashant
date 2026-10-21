# Story reels: how to write one

Every reel on @theecomprashant is a short 3D cartoon story with the same two people, made by `story/` (three.js, rendered on GitHub).
The format is a two-person explainer sitcom: one loud person with a real D2C problem, one calm person who fixes it with AI, a joke at the end, then the free tool. The characters are our own. Never copy, name or imitate a TV or film character.

## The show

**Bunty** (`"who": "bunty"`): runs BUNTY'S, a small handmade-kurta brand from Jaipur. Big, loud, lovable, always on his phone, proud of his "premium cotton". He makes the mistakes real Indian D2C founders make (COD returns, weak product pages, boosting posts, discounting everything, no WhatsApp follow-up, copying rivals). He is never stupid. He's busy and a bit stubborn, and he learns. Speaks simple Indian English with a little Hindi ("Arre", "Bhai", "Yaar", "Accha"). Comic energy, short lines.

**Prashant** (`"who": "prashant"`): the AI-for-ecommerce guy (the page owner). Calm, warm, a little smug when he's right. Shows the fix on his phone, step by step, with a real prompt in Claude. Never lectures; one idea per line.

**The set** is Bunty's stockroom office: banner, shelves of kurtas and parcels, a packing table. `"brand"` can change the banner for one episode (another of Bunty's experiments), but keep it Bunty's brand.

## Storytelling (Corey Haines: story first, tactics second)

Read docs/VIRAL.md first: it is what the million-view reels do, and it outranks anything here.

A reel is a story with stakes, never a list read aloud. Shape every episode like this (15 to 25 seconds, 45 to 70 spoken words, 6 to 9 beats, a new camera angle every caption chunk):

1. **Hook, 0 to 2 s.** Start in the middle of the action: Bunty's disaster at its peak, or the payoff already on screen. 10 spoken words or fewer, with feeling, and the promise as `"hook"` text on screen (6 words or fewer, a benefit, a number or a secret). The visual, the spoken line and the text all land in the first second. Never introduce the characters. Use the hook formula the planner picked.
2. **Cause.** Prashant names why it happens in one plain sentence.
3. **Push-back.** Bunty argues ("But it says premium cotton!"). This is the relatable beat; the viewer is Bunty.
4. **The fix on the phone, 2 to 3 beats.** Show the real thing: the prompt typed into Claude, the WhatsApp message, the page before and after. Specific nouns and numbers, never "optimise your funnel".
5. **Payoff.** Bunty gets it, big reaction (`celebrate`, mood `excited`).
6. **Twist.** One punchline that flips something. Set `"musicStop"` to this beat's index so the music cuts out under it.
7. **CTA.** `"cta": true` on the last beat: "Comment KEYWORD, and I'll send you <the exact thing>." One ask only.

Rules of the story:
- Show, don't claim. The proof is the screen. Never invent results, revenue, clients or "my orders went up 3x". Bunty's numbers are his story ("40 parcels came back"), so keep them plausible for a small Indian brand.
- One idea per reel, the one the free tool delivers. The phone must show what the free tool really does.
- Every line moves the story. If a line could be cut, cut it.
- The joke comes from character (Bunty's pride, his mummy, his chai, his 40 parcels), never from mocking the viewer or any real person or brand.
- Write for sound-off: the captions carry it, so put the key word of each line early.

## Writing the lines (from Corey Haines' copywriting and social skills)

- Spoken lines are short: 4 to 14 words. Contractions. Talk like people talk.
- **No AI tells**: no "It's not X, it's Y", no "No X, no Y, no Z", no self-answered questions ("The result?"), no colon reveals, no "Say goodbye to", "unlock", "game-changer", "here's the thing", no em dashes, no lists of three on every line.
- `"say"` is what the voice reads: spell numbers as words ("forty", "two hundred"), write "cash on delivery" (not COD). `"show"` is the caption text when it should differ: digits and short forms there ("40", "COD").
- Don't start a line with "Claude" (the voice garbles it); "paste it into Claude" is fine mid-line.
- `"hot"`: 3 to 6 words to colour yellow in the captions (numbers are coloured anyway).

## post.json

```json
{
  "id": "2026-10-27-reel-<slug>",
  "style": "story",
  "keyword": "DESC",
  "hook": "200 visitors. 0 orders.",          // on-screen hook, 6 words or fewer
  "sign": "200 visitors\n0 orders\nWHY??",    // the cardboard sign on the cover, 2 to 4 short lines, 22 characters max per line
  "cover": { "mood": "worried" },             // Bunty's face on the cover
  "brand": { "name": "BUNTY'S", "line": "Handmade kurtas · Jaipur" },
  "hot": ["zero", "DESC", "COD"],
  "musicStop": 7,                              // index of the twist beat
  "beats": [ { ... }, ... ]
}
```

A beat: `{ "who": "bunty"|"prashant", "say": "...", "show": "...", "shot": "...", "act": "...", "mood": "...", "look": "camera", "other": { "act": "...", "mood": "..." }, "screen": {...}, "sfx": [...], "punch": true, "cta": true }`

- `shot`: `two` (both, the default), `bunty`, `prashant` (medium close-ups), `bunty-push`, `prashant-push` (slow push in, for hooks and big moments), `phone` (the phone fills the screen; needs `screen`), `wide`.
  Change the shot almost every beat. Use `phone` for 2 to 4 beats in the middle. Start on `bunty-push`. End on `two` or `prashant` with `"look": "camera"`.
- `act` (the speaker's body): `explain`, `point`, `phone`, `facepalm`, `celebrate`, `shrug`, `think`, `arms`, `idle`, `sign`.
- `mood`: `normal`, `happy`, `excited`, `smug`, `worried`, `sad`, `angry`, `shock` (eyes pop on the line).
- `other`: what the listener does in that beat (default: stands and reacts).
- `screen` (phone beats), with text short enough to read in two seconds:
  - `chat`: `{ "type": "chat", "ask": "<the real prompt, 15 to 40 words>", "answer": "<what comes back, 15 to 40 words>" }`
  - `page`: `{ "type": "page", "product": "kurta", "name": "...", "price": "₹899", "url": "buntys.in/...", "lines": [{ "text": "...", "mark": "bad"|"good" }] }` (2 to 4 lines)
  - `whatsapp`: `{ "type": "whatsapp", "name": "Bunty's Kurtas", "msgs": [{ "from": "brand"|"buyer", "text": "...", "buttons": ["Yes, send it", "No, cancel"] }] }`
  - `stats`: `{ "type": "stats", "label": "...", "from": 0, "to": 40, "prefix": "", "suffix": "", "note": "..." }` (Bunty's own story numbers only)
  - `list`: `{ "type": "list", "title": "...", "items": ["...", "..."] }` (3 to 5 items)
  - `ad`: `{ "type": "ad", "brand": "...", "headline": "...", "product": "kurta", "notes": ["...", "..."] }`
  - `notify`: `{ "type": "notify", "items": [{ "app": "Shiprocket", "text": "RTO: order #1042 returned" }] }`
  - `product` can be kurta, serum, candle, sneaker, tea, jewellery or box.
- `sfx`: `fail` (sad trombone, for the hook), `ding` (the fix works), `boing`, `cash`, `buzz` (phone), `scratch` (record scratch, for the twist), `pop`.
- `punch: true`: a quick camera punch-in on a comic line (use once or twice).

## Caption (caption.txt)

Line 1 is the comment gate: `Comment "KEYWORD" and I'll DM you the free <tool> 📩` (the biggest comment counts come from this being first). Then one short paragraph telling Bunty's story and what Prashant showed (2 or 3 sentences, plain words, the number). Then `Follow so the DM lands.` and a one-line note that the prompt is free and what you need. Then 3 to 5 hashtags.
No em dashes, no emoji bullets, no "game-changer", none of the AI tells above. Write it like a person.
