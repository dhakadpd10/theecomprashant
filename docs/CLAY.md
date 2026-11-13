# The clay look (13 Nov 2026)

Prashant's call: **one post a day, alternating a reel and a carousel, every post a proven idea (brand/proven.md) remade in our Claymation style.** Quality over volume: a post that isn't clearly more useful than the original doesn't ship.

## Reels: post.json `"theme": "clay"`

The engine does the clay for you (engine/clay.js):
- **The host is the 3D clay Prashant** (navy hoodie, glasses, "AI" badge). Choose `at`, `pose` and `mood` per line exactly as in "The host" (docs/MOTION.md). He has no pressure cooker in clay: `whistle: true` gives a jump and a puff of clay steam on the payoff.
- **Plasticine is automatic on these classes:** `.card` and `.clay` (slabs), `.clay-s` (small pieces: number badges, chips, pills, stamps, icons), `.clay-blob` (big soft shapes), `.title` and `.clay-type` (clay lettering). Put the class on the outer element; never on both a card and the rows inside it.
- **Stop-motion:** the reel is drawn at 12 drawings a second, and the clay texture and the puppet are re-pressed every other drawing. Keep motion bold and simple. Pops, slides and stamps read best. Fine motion (tiny drifts, long slow fades) disappears.
- **No paper or grain layers.** The board background comes from the theme. Leave `#root` alone.

Palette (warm studio clay): board `#E9D6B8`, ink `#2B2420`, accent `#D2602A` (terracotta). Supporting clay colours: cream `#FBF4E8`, sand `#EFE2CC`, mustard `#F2C14E`, sage `#8DB28A`, sky `#7FA6D9`, blush `#F7DCCB`. Colour still means something (docs/EXPLAINER.md): green = right, red = wrong, amber = check.

Readable on a phone (the checker enforces it): the hook is at least 110 px, card text 34 to 44 px, nothing under 24 px, and every card is full by the end of its beat.

Model: `content/story-samples/e05-clay-sites/` (proven P07 remade in clay).

## Carousels: carousel.json `"style": "clay"`

Rendered by engine/claycarousel.js (1080 x 1350, clay slabs, the clay host on the first and last slide).

```json
{
  "id": "<given>", "style": "clay", "proven": "P02", "keyword": "WEBSITES",
  "slides": [
    { "kind": "cover", "kicker": "FREE AND REAL", "title": ["5 websites that", "feel *illegal*", "to know"], "sub": "one line, 14 words max" },
    { "kind": "item", "n": 1, "name": "Photo*pea*", "domain": "photopea.com", "line": "what it does, 18 words max",
      "rows": [{ "k": "GREAT FOR", "v": "who or what, 8 words max" }, { "k": "HOW TO START", "v": "the first step, 10 words max" }],
      "box": "optional copy-paste prompt, 45 words max", "catch": "the honest limit, 10 words max" },
    { "kind": "recap", "title": "Save this *list.*", "items": ["3 to 7 short lines"] },
    { "kind": "cta", "title": "Send this to *a friend.*", "who": "the specific friend, 10 words max", "text": "what the keyword DM gives, 10 words max" }
  ]
}
```

- 7 to 10 slides: cover first, then items (3 to 7), then a recap, then the cta last.
- `*word*` marks one accent word in a title or name.
- Every item is real and checked: a real site, tool, feature or prompt that works today, with its real domain. If you're not sure it exists and is free, leave it out.
- One item per slide, at least 2 rows or a box on each, and the catch on every item.
- Model: `content/story-samples/e06-clay-websites/` (proven P02 remade in clay).
