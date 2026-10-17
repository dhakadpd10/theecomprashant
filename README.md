# Theecomprashant

An open-source Instagram agent that runs a whole page about **practical AI for D2C and ecommerce brands**, in the cloud, with your computer off.

Every week it researches what's new, plans 14 posts (a carousel at 1 pm and a reel at 7:30 pm, every day; `slot_overrides` in config/agent.json switches a period to something else, such as reels only), writes them, records a voiceover, renders the videos and slides, and asks you to approve the week. After you approve, it posts on time, sends the free tool by DM to everyone who comments the keyword, answers comments and DMs, escalates anything sensitive to you, and reads the numbers to plan a better next week.

It runs entirely on **GitHub Actions** (free for public repositories) with **Claude** as the brain (your Claude subscription through Claude Code, or an API key) and **Instagram's official API**.

```
Saturday 06:00 IST   research → plan → write → voice → render → pull request "Approve 2026-W44"
you                  open the pull request on your phone → Merge   (that's the approval)
every minute         publish posts that are due (one long "Run" job, restarted hourly)
every 10 min         send keyword DMs · answer comments and DMs
daily 10:00 IST      log each post's views, reach, likes, comments, saves, shares
Monday               refresh the Instagram token
```

## What it does and doesn't do

| Does | Doesn't |
|---|---|
| Plans and makes reels (voiceover, captions, sound) and carousels in one consistent look | Post anything you haven't approved |
| Publishes approved posts at set times through Instagram's official Content Publishing API | Comment on other people's posts (Instagram doesn't allow it by API, and doing it by bot is spam). It can draft comments for you to post |
| DMs the free tool to anyone who comments the post's keyword (Instagram "private replies") | Follow, like or message people who haven't contacted you |
| Replies to questions in comments and DMs in your voice; opens a GitHub issue for complaints, refunds, collabs or anything unsure | Invent results, revenue or clients |
| Logs every post's numbers and writes what worked into `brand/learnings.md` | Log into Instagram with a password, scrape at volume, or use unofficial APIs |
| Researches new AI and ecommerce news each week (Claude's web search) | |

## How it's built

| Folder | What |
|---|---|
| `src/` | the agent: `plan.js` (weekly brain), `publish.js`, `engage.js` (DMs + replies), `analytics.js`, `ig.js` (Instagram API), `claude.js` (Claude API), `site.js` (public site), `validate.js` |
| `engine/` | renders reels (`make.js`, scene types in `lib.js`) and carousels (`carousel.js`) with `@napi-rs/canvas` + `ffmpeg`; motion-graphics reels (`motion.js`) with HyperFrames, see `docs/MOTION.md` |
| `tts/` | local voiceover (Kokoro, open-source) and a Whisper word check |
| `brand/` | voice, content pillars, learnings: edit these to make it yours |
| `config/agent.json` | handle, posting times, models, reply rules, keyword → free tool map |
| `tools/` | the free tools (one Markdown file per keyword), published at `/tools/` |
| `content/` | posts, weekly queues, analytics, reply state |
| `skills/` | the Instagram skill pack this builds on, for use in Claude Code |
| `.github/workflows/` | the schedules |
| `docs/` | `SETUP.md` (start here), `SCENES.md` (how posts are specified) |

## Make it yours

Fork it, then change `brand/voice.md`, `brand/pillars.md`, `config/agent.json` and the tools in `tools/`. Follow [docs/SETUP.md](docs/SETUP.md). Costs: GitHub Actions is free for public repos. Claude runs either on your Claude subscription (through Claude Code, set `CLAUDE_CODE_OAUTH_TOKEN`) or on a pay-per-use API key (`ANTHROPIC_API_KEY`).

## Credits

Built on [instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill) by Jake Schincariol (MIT), included in `skills/`. Voice by [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M) (Apache-2.0), speech check by Whisper via Transformers.js, fonts from Fontsource (OFL).

MIT licence.
