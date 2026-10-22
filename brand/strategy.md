# Strategy for the week of 2026-10-22

# Strategy: week of 2026-10-22

## Prashant's standing decisions (these outrank everything below)

### 21 Oct 2026: viral rules
The research on accounts that got millions of views fast is in docs/VIRAL.md. Apply it to every reel:
- broad pain + FREE + a named tool people know
- payoff or shock in the first second
- 15 to 25 seconds long
- a new picture every 1 to 1.5 s
- the comment gate as caption line 1 and on screen mid-reel
- Bunty as a recurring series, with running jokes: his mummy, his chai, rival Pinky
- 'Part 2' when a topic has more to give

### 20 Oct 2026: format
Every reel is a 3D story episode (docs/STORY.md). Bunty has a real D2C problem, Prashant fixes it with AI on his phone, there is a twist, and the episode ends on one keyword.
- Captions follow the story caption rules in docs/STORY.md, but caption line 1 is the comment gate (21 Oct rule).
- Voices are Kokoro hm_omega (Bunty) and hm_psi (Prashant). No spoken line starts with 'Claude'.
- The 'N AI shoppers judge your X' panel appears at most as one phone beat inside a story.
- Give Bunty a different problem in every episode.

## Evidence level: still almost none
- 9 reels in 6 days, with a top reach of 102 and 501 reach in total.
- Totals: 0 likes, 0 shares, 2 saves, and 6 comments, all on one post.
- Only 1 story episode exists: STORE, 94 views at about 1 day, 1.45x the page median of 65. That is n=1.
- Hook id is logged on 1 of 9 posts and style on 3 of 9.
- Hold@3s, watch time, follows and non-follower % are missing on all 9. Nothing below is a proven pattern.
- **Baseline the story episodes have to beat:** the old-format median of 60 views (8 posts, latest numbers), with 0 likes and 0 shares.

## Non-negotiable: log everything
This improved from 0 of 8 posts with a hook id to 1 of 9, and that is still not enough.

At publishing:
- `hook`: the hooks.json id
- `style`: exactly `story-3d` for episodes and `carousel` for carousels. The 21 Oct episode was logged as 'story', so fix it.
- publish time. The log stores UTC: 8 to 9 PM IST = 14:30 to 15:30 UTC.

At 72 hours:
- `keyword_comments`, counted by hand, leaving out Prashant's replies
- from in-app insights: **hold at 3s, average watch time, follows, non-follower % of reach**
- DMs sent and link taps

Don't publish the next post until the previous one's publish-time fields are filled in.

## Hook formulas
- **Favour:** none proven.
  - #2 Negative Command is the only id ever logged: 1 post, 1.45x, 0 likes, comments, saves or shares.
  - It may be reused in at most 2 episodes this week so it doesn't crowd out the comparison.
- **Avoid:** none, because no other id has data.
- **Do:**
  - Use at least 3 different hooks.json ids across this week's episodes. #2 plus at least 2 others, each logged.
  - Next Monday compares them by hold@3s.
  - Open every episode on Bunty's problem in the first line, with a specific number or moment, and label it as an example (example: '40 COD orders, 11 came back'). No intro, no greeting.

## Reel styles and worlds
- **Worked:** nothing proven.
  - story-3d: 1 episode, 1.45x at about 1 day old, the youngest post in the top two.
  - We keep it because Prashant decided on it. The data agrees so far but can't confirm it.
- **Retired:** dark ink stage, clay box characters, world (1 post, 0.69x) and motion (1 post, 1.00x). One post each is not a verdict on those styles.
- **This week's style:** only story-3d, so style is not a variable. That means the bright stockroom, word-pop captions with yellow key words, and the cardboard-sign cover.

## Pillars and keywords
Posted so far: Sell more 6, Operations 2, Ads 1, Retention 0, Proof 0, carousels 0. No pillar has enough posts for a verdict:
- Sell more: median 1.03x, n=6
- Operations: 1.23x and 1.00x, n=2
- Ads: 0.31x, n=1

**Mix for 14 posts:** Sell more 3 · Ads 4 · Operations 4 · Retention 3 · Proof 0.
- This mix rebalances for comparison. It isn't based on performance.
- Proof stays at 0 because there are no real MiniKin numbers. If Prashant supplies real numbers, swap 1 Operations slot for Proof.
- Never invent figures. Label example numbers as examples.

**Push:**
- Retention: CART (it would be the first Retention post ever), then REPEAT, and the AFTER carousel if there's room.
- Ads: ROAST, UGC, RIVAL.
- Operations: SUPPORT, STOCK.
- Sell more: the STORE carousel plus 2 new topics from the bank. SALE (Diwali planner) is timely for the calendar. That is a timing call, not a data call.

**Hold until 72-hour numbers are in:**
- RTO: 23 Oct, 07:31 UTC.
- STORE story episode: 24 Oct, 07:31 UTC.

**Rest (a rest, not a verdict):**
- LAUNCH: best reach two weeks running, but zero action on every pull.
- AUDIT: 0.12x.
- REVIEWS: 0.31x, from one post.
- PRICE: 0.85x, zero action at about 72 hours.
- DESC: 0.69x, zero action at about 72 hours.

**Carousels:** at least 2. We still have zero, so there is no save data on a second format.
- STORE: '6 reasons shoppers leave your product page'. Reuse the existing STORE tool and DM flow.
- JOBS: '7 jobs to hand to AI this week, 7 to keep'.

## Topics to repeat with a new angle
- **STORE:** already run once as a story episode (21 Oct).
  - No second STORE reel until its 72-hour numbers are in and both STORE posts' comments are hand-counted.
  - The old reel's 6 comments haven't moved since the first snapshot, and the episode has 0. The STORE carousel goes ahead because it is a different format.
- **TEAM, as one optional Operations episode:** Bunty is drowning in work and Prashant shows the 4-agent team.
  - TEAM scored 1.23x with the highest save rate on the page (13.9 per 1k).
  - That rate comes from 1 save, so it is a hunch.
- Nothing else gets repeated.

## Posting window
Post everything from 8 to 9 PM IST, which is **14:30 to 15:30 UTC**.
- The scheduler's 07:31 UTC slot is 1:01 PM IST. Four posts, including the first story episode, went out there.
- Fix the scheduler. Evening is not proven to work. A fixed window just takes time out of the comparison.

## One experiment: where the keyword appears (carried over, never run, adjusted to the 21 Oct rule)
**Why:** the only comment signal on the page is old STORE (6 comments) against story STORE (0), with the same keyword. That pair can't separate format from keyword placement.

**Setup:** 4 story episodes, 2 in Ads and 2 in Operations, all story-3d, all posted 8 to 9 PM IST on different days, alternating A and B.
- **Both arms:** the comment gate is caption line 1, the keyword is on screen mid-reel (Prashant's rule), and the keyword is spoken at the end.
- **Episode A:** also puts the keyword on the cardboard-sign cover and as a yellow chip in the first 3 seconds, while Bunty states the problem.
- **Episode B:** no keyword before the mid-reel beat.

**How we judge it:**
- Main measure: keyword comments ÷ reach at 72 hours, counted by hand, leaving out Prashant's replies.
- Guardrail: if A's hold@3s is more than 10 points below B's, B wins whatever the comment count says, because the extra comments aren't worth the lost reach.

**Reading the result:**
- With 4 posts, any result is only directional.
- If A beats B in both pillars, repeat the test before making it the house format.
- If the pillars disagree, call it noise.

## Baseline check (not an experiment)
At each 72-hour mark, compare the story episodes' median views with the old-format median of 60, and their likes and shares with the old 0.
- After about 10 episodes, bring the comparison to the Monday audit.
- If story episodes are still under 60 views with 0 shares at that point, look at hold@3s first, before changing topics.

## Check before planning
- Hand-count the comments on both STORE posts. Were they 'STORE'? Were any from Prashant?
- Re-pull RTO at 72 hours (23 Oct).
- At 72 hours (24 Oct), copy the STORE story episode's hold@3s, average watch time, follows and non-follower % from in-app insights. These are the most useful numbers the page can get right now.
- Pull the retention graphs for LAUNCH (best) and AUDIT (worst) from in-app insights while they're still available.
