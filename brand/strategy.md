# Strategy for the week of 2026-10-24

# Strategy for the week of 2026-10-24

## Prashant's standing decisions (these outrank everything below)

### 21 Oct 2026: viral rules
The research is in docs/VIRAL.md. Apply it to every reel:
- broad pain + FREE + a named tool people know
- payoff or shock in the first second
- 15 to 25 seconds long
- a new picture every 1 to 1.5 s
- the comment gate as caption line 1 and on screen mid-reel
- Bunty as a recurring series, with running jokes: his mummy, his chai, rival Pinky
- 'Part 2' when a topic has more to give

### 20 Oct 2026: format
Every reel is a 3D story episode (docs/STORY.md). Bunty has a real D2C problem, Prashant fixes it with AI on his phone, there is a twist, and the episode ends on one keyword.
- Captions follow docs/STORY.md, but caption line 1 is the comment gate.
- Voices are Kokoro hm_omega (Bunty) and hm_psi (Prashant). No spoken line starts with 'Claude'.
- The 'N AI shoppers judge your X' panel appears at most as one phone beat inside a story.
- Give Bunty a different problem in every episode.

## Evidence level: thin, with one first claim
**Totals:** 13 reels, 954 reach, 5 likes, 8 comments, 2 saves, 0 shares.

**The one claim the data supports (low to moderate confidence): story-3d beats the old format on views.**
- 5 episodes: median 121 views (1.49x).
- 8 old-format reels: median 60.5 views (0.75x).
- All 5 episodes rank in the top 6, and every bottom-5 post is old format.
- Caveats:
  - n=5.
  - The episodes are the newest posts, so page growth may explain part of the gap.
  - Non-follower % is missing, so we don't know if they travelled.

**What it doesn't show:**
- No episode broke out. Reach sat between 101 and 111 on all 5, which looks like a floor.
- Story lifted views, not action: 1 like per episode, 0 saves, 0 shares.

**Still missing on 13 of 13 posts:** hold@3s, average watch time, follows and non-follower %. Until these exist:
- we can't grade hooks
- we can't tell a hook problem from a profile problem

**New baseline to beat:** the story-3d median of 121 views. The old-format median of 60 is already beaten. The next bar is action: any share, or saves above 0.

## Non-negotiable: log everything
Missed again last week: style was 'story' on all 5 episodes, 0 of 13 posts had hold@3s copied, and no A/B arm was logged.

At publishing:
- `hook`: the hooks.json id
- `style`: exactly `story-3d` for episodes, `carousel` for carousels. Fix the 5 existing 'story' rows to `story-3d`.
- `arm`: `A` or `B` for the 4 experiment episodes, blank otherwise
- publish time in UTC, between 14:30 and 15:30 UTC (8 to 9 PM IST)
- follower count at the time of posting. We need it to read the reach floor.

At 72 hours:
- `keyword_comments`, counted by hand, leaving out Prashant's replies
- from in-app insights: **hold at 3s, average watch time, follows, non-follower % of reach**
- DMs sent and link taps

Don't publish the next post until the previous one's publish-time fields are filled in. The Monday audit gives no hook verdict without hold@3s.

## Check before planning
- Copy in-app insights for the STORE episode (72 hours passed 24 Oct, 07:31 UTC) and ROAST 21 Oct (72 hours at 24 Oct, 14:01 UTC). These are the first episode numbers that can show whether the hook or the reach is the problem.
- Hand-count CART's 2 comments and old STORE's 6. Were they the keyword? Were any from Prashant?
- Check who left the single like on each episode. Is it one account?
- Pull the LAUNCH and AUDIT retention graphs if Instagram still shows them.
- Hold dates:
  - SALE: 25 Oct, 08:28 UTC
  - ROAST 22 Oct: 25 Oct, 14:01 UTC
  - CART: 26 Oct, 07:31 UTC

## Hook formulas
- **Favour:** none proven. All three logged ids landed within 21 views of each other:
  - #1 Cost Confession: 1.57x, n=1
  - #3 Nobody Tells You: 1.52x, n=1
  - #2 Negative Command: 1.31x to 1.54x, n=3
- **Avoid:** none. No id has hold@3s data.
- **Do:**
  - Balance the sample. Use #1 in 2 episodes and #3 in 2 episodes.
  - Use #2 in at most 1 episode, because it already has 3.
  - Add at least 1 hooks.json id never used before.
  - Log every id. Next Monday compares them by hold@3s, but only if hold@3s was copied.
  - Open every episode on Bunty's problem in the first line, with a specific number or moment labelled as an example (example: '40 COD orders, 11 came back'). No intro, no greeting.

## Reel styles and worlds
- **Worked (low to moderate confidence):** story-3d.
  - 5 episodes, median 1.49x, all in the top 6.
  - Keep the bright stockroom, word-pop captions with yellow key words and the cardboard-sign cover.
- **Retired:** dark ink stage, clay box characters, world (DESC 0.56x), motion (RTO 0.80x) and the old talking-list format (median 0.75x across 8 posts).
- **This week's style:** only story-3d, so style is not a variable.
- **The open question is action, not reach.** Each episode needs one beat worth sending: the twist should be something Bunty would forward to Pinky.

## Pillars and keywords
**Posted so far:** Sell more 7, Ads 3, Operations 2, Retention 1, Proof 0, carousels 0.

Pillar shows nothing once format is held fixed. Episode views by pillar: Ads 127 and 106, Retention 125, Sell more 123 and 121.

**Mix for 14 posts:** Sell more 3 · Ads 3 · Operations 5 · Retention 3 · Proof 0.
- This rebalances for comparison. It isn't based on performance.
- Operations has zero story episodes, and Retention has one.
- If Prashant supplies real MiniKin numbers, swap 1 Operations slot for Proof.
- Never invent figures. Label example numbers as examples.

**Push:**
- **Operations (5):**
  - SUPPORT episode
  - STOCK episode
  - TEAM episode (Bunty drowning in work; 1.00x old format, best save rate from 1 save, a hunch)
  - RTO retold as a story episode (Bunty's COD returns). Only the motion version was tested.
  - JOBS carousel
- **Ads (3):** UGC, RIVAL and SCALE episodes. ROAST already has 2 episodes, so no third this week.
- **Retention (3):**
  - REPEAT episode
  - AFTER carousel
  - CART Part 2, but only if CART's 72-hour keyword comments are real 'CART' comments from people other than Prashant. Otherwise do an ABANDONED-cart-adjacent topic from the bank, or a third REPEAT angle.
- **Sell more (3):**
  - STORE carousel ('6 reasons shoppers leave your product page'), reusing the STORE tool and DM flow
  - BUNDLE episode (Diwali gift bundles)
  - SALE Part 2 (Diwali shipping cutoffs). This is a timing call with Diwali about 2 weeks out, not a data call. Hold it until SALE's 72-hour numbers are in.

**Carousels: 2 minimum (STORE, JOBS), published in the first 4 days.** We're two weeks in with zero, so there's still no save data on a second format.

**Rest (a rest, not a verdict):** LAUNCH (zero action on every pull), AUDIT 0.10x, REVIEWS 0.25x, PRICE 0.69x, DESC 0.56x, and RTO in the motion format.

## Topics to repeat with a new angle
- **RTO:** as a story episode. The topic was only ever tested in the retired motion style.
- **TEAM:** optional Operations episode.
- **SALE Part 2 and CART Part 2:** under the conditions above.
- **STORE:** no third STORE reel. The carousel is the repeat.
- Nothing else.

## Posting window
- Post everything at 14:30 to 15:30 UTC (8 to 9 PM IST). Set the scheduler to 14:45 UTC.
- Both current slots are wrong: 07:31 UTC is 1:01 PM IST, and 14:01 UTC is 7:31 PM IST.
- Time showed no effect among the episodes. The fixed window is only there to remove a variable.

## One experiment: where the keyword appears (carried over, never confirmed as run)
**Why:** comments are the page's main metric, and they are near zero. The only signals are old STORE's frozen 6 and CART's 2, which can't separate format from keyword placement.

**Setup:** 4 story-3d episodes, 2 in Ads and 2 in Operations, posted at 14:30 to 15:30 UTC on different days, alternating A and B. Log `arm` on each.
- **Both arms:** the comment gate is caption line 1, the keyword is on screen mid-reel, and the keyword is spoken at the end.
- **Episode A:** also puts the keyword on the cardboard-sign cover and as a yellow chip in the first 3 seconds, while Bunty states the problem.
- **Episode B:** no keyword before the mid-reel beat.

**How we judge it:**
- Main measure: keyword comments ÷ reach at 72 hours, counted by hand, leaving out Prashant's replies.
- Guardrail: if A's hold@3s is more than 10 points below B's, B wins whatever the comment count says.
- If hold@3s isn't copied for all 4 episodes, the test can't be judged, and it is void.

**Reading the result:**
- With 4 posts, any result is directional only.
- If A beats B in both pillars, repeat the test before making it the house format.
- If the pillars disagree, call it noise.

## Baseline check (not an experiment)
- At each 72-hour mark, compare episode views with the story-3d median of 121, and compare shares and saves with 0.
- At about 10 episodes, bring the comparison to the Monday audit.
- If reach is still stuck around 100 to 110 with 0 shares, check two things before touching topics:
  - hold@3s, which tells us whether it's a hook problem
  - non-follower %, which tells us whether it's a distribution problem
