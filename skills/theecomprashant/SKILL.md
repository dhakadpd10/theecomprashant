---
name: theecomprashant
description: Work on the Theecomprashant Instagram agent repo - make or fix a reel or carousel by hand, change the voice, pillars or reply rules, add a free tool, or run any job locally. Use inside this repository when asked to "make a reel about", "fix this carousel", "add a free tool", "change how it replies", or "run the weekly plan".
---

# Theecomprashant (in Claude Code)

The cloud workflows do the weekly work; use this when a person wants to step in.

- **Make a post by hand:** write `content/posts/<id>/post.json` or `carousel.json` following `docs/SCENES.md` (validate with `node -e "console.log(require('./src/validate').validateReel(require('./content/posts/<id>/post.json')))"`), then `node engine/make.js content/posts/<id>` or `node engine/carousel.js content/posts/<id>`. A **motion reel** (HyperFrames motion graphics) is `post.json` with `"style": "motion"` plus `scene.html` and `scene.js`, written per `docs/MOTION.md` (model: `content/posts/m01-five-questions/`): `node engine/motion.js <dir> --prep` records the voice and writes `timing.json`, `--lint` runs the HyperFrames checker, `--stills 1,5,9` takes frames, no flag renders `reel.mp4` + cover. `config/agent.json` `motion.share` sets how many planned reels are motion. Write `caption.txt`; lint with `skills/ig-caption/caption.py` and `skills/ig-human/detect.py`. Add a slot to that week's `content/queue/<week>/plan.json` with `"status": "made"`.
- **Add a free tool:** `tools/<id>.md` (title, one paragraph, a `---` line, the prompt), then add the keyword to `config/agent.json` → `keywords`.
- **Change behaviour:** voice and banned words in `brand/voice.md`; topics in `brand/pillars.md`; times, models and reply rules in `config/agent.json`.
- **Run a job:** `node src/cli.js plan|publish --dry-run|engage|analytics|site|check` with the same secrets in the environment.
- Rules that never change: nothing posts without the weekly approval merge; never invent results; official Instagram API only; never start a spoken line with "Claude".
