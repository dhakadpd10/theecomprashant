# Strategy for the week of 2026-10-28

# Strategy for the week of 2026-10-28

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

## Evidence level: still thin, but now with one view claim and one hunch
**Totals:** 20 reels, 2,239 views, 1,978 reach, 9 likes, 8 comments, 3 saves, 0 shares. Median: 121 views.

**Claim (moderate confidence): story-3d beats the old format on views.**
- 12 episodes: median 126 views.
- 8 old-format reels: median 60.5 views.
- The top 11 posts are all episodes. The bottom 7 are all old format.
- Caveats:
  - Every episode is newer than every old post.
  - Follower count was never logged, so page growth could explain part of the gap.

**Hunch (low confidence, n=3): naming a message the viewer already sends their customer.**
- The top 3 episodes all do this:
  - FAQ (size chart, 2.40x, 263 reach)
  - AFTER ('Rate us 5 stars', 1.72x, 173 reach)
  - CART ('Dear customer', 1.22x, 131 reach)
- FAQ and AFTER are the first posts above the 101 to 131 reach floor.
- All three also used hook #2 and the 07:31 UTC slot, so the cause can't be isolated.
- #2 also made four posts at 0.88x to 1.00x, which points at the theme over the hook. This week's experiment tests it.

**What the data doesn't show:**
- Any action:
  - 0 shares on 1,978 reach.
  - 1 save and 2 comments across 12 episodes.
  - 9 of 12 episodes have exactly 1 like.
- Any hook grade, because hold@3s was copied on 0 of 20 posts.
- Whether the two breakouts reached non-followers.
- Any pillar effect: episode medians all sit between 123.5 and 148, and pillar is tangled with slot.

**Baselines to beat:**
- Views: episode median of 126.
- Reach: above 150.
- Action: any share, or saves above 1 on an episode.

## Non-negotiable: log everything
Missed again last week:
- style was 'story' on all 12 episodes
- no `arm` was logged
- 0 carousels
- 0 of 7 posts went out in the window
- no follower count
- hold@3s was copied on 0 of 20 posts

Hook ids were logged on every episode. Keep that.

At publishing:
- `hook`: the hooks.json id. This includes carousel covers.
- `style`: exactly `story-3d` or `carousel`. Fix the 12 existing 'story' rows now.
- `arm`: `A` or `B` on the 4 experiment episodes, blank otherwise.
- Publish time in UTC.
- Follower count at the time of posting.

At 72 hours:
- `keyword_comments`, counted by hand, leaving out Prashant's replies.
- From in-app insights: **hold at 3s, average watch time, follows, non-follower % of reach**.
- DMs sent and link taps.

Don't publish the next post until the previous one's publish-time fields are filled in. With no hold@3s, the Monday audit gives no hook verdict and can't judge the experiment's 'why'.

## Check before planning
- Copy in-app insights for the posts that are already past 72 hours:
  - FAQ is the most important one. Did its 263 reach come from non-followers, and did it get follows?
  - STORE episode
  - ROAST (21 Oct and 22 Oct)
  - SALE
  - CART
  - RIVAL
  - WINBACK
  - TEAM episode (28 Oct, 14:01 UTC)
- Hold dates:
  - BUNDLE: 29 Oct, 07:31 UTC
  - UGC: 29 Oct, 14:01 UTC
  - AFTER: 30 Oct, 07:31 UTC
- Hand-count CART's 2 comments and old STORE's 6. Were they the keyword? Were any from Prashant?
- Check who left the single like on 9 episodes. Is it one account?
- Move the scheduler to 14:45 UTC. It has posted at 07:31 and 14:01 UTC for two weeks.

## Hook formulas
- **Favour:** none proven.
  - #2 Negative Command made the top 3, but also four posts at about 1.0x (n=7, median 1.00x).
  - #1 Cost Confession: n=3, 1.03x to 1.17x.
  - #17 Head To Head: n=1, 1.13x.
  - #3 Nobody Tells You: n=1, 1.03x.
- **Avoid:** none. No id has hold@3s.
- **This week:**
  - #2 on the 4 experiment episodes, so the hook is held fixed.
  - #3 on 2 episodes. It was owed last week and never used.
  - #1 on 1 episode.
  - #17 on 1 episode.
  - At least 1 hooks.json id never used before.
  - Log the cover hook id on carousels too.
- Open every episode on Bunty's problem in the first line, with a specific number or message labelled as an example (example: 'Sent Dear customer to 60 carts, example number, 0 came back'). No intro, no greeting.

## Reel styles and worlds
- **Worked (moderate confidence on views): story-3d.** Keep the bright stockroom, word-pop captions with yellow key words and the cardboard-sign cover.
- **Retired:**
  - dark ink stage
  - clay box characters
  - world (DESC 0.37x)
  - motion (RTO 0.54x)
  - the old talking-list format (median 60.5)
- **Carousels: still untested after 3 weeks.** Publish 2 in the first 4 days (AFTER, JOBS), and STORE and HOOK later in the week.
- **The sendable beat (a guess, untested):** the Pinky-forward twist produced 0 sends in 12 episodes. Try ending on the corrected message, full screen and readable. That gives the viewer something to screenshot and forward to whoever sends their WhatsApps.

## Pillars and keywords
**Mix for 14 posts:** Sell more 3 · Ads 3 · Operations 4 · Retention 4 · Proof 0.
- This is for coverage, not performance. Operations still has only 1 episode.
- If Prashant supplies real MiniKin numbers, swap 1 slot for Proof.
- Never invent figures. Label example numbers as examples.

**Operations (4):**
- RTO as a story episode (experiment A)
- SUPPORT episode (experiment A)
- STOCK episode (experiment B)
- JOBS carousel

**Ads (3):**
- SCALE episode (experiment B)
- HOOK carousel
- UGC Part 2, only if UGC is still at least 1.0x at 72 hours with any action. Otherwise use a new Ads topic written into the bank.
- No ROAST and no RIVAL.

**Retention (4):**
- AFTER carousel (reuse the AFTER tool)
- REPEAT episode
- AFTER Part 2 episode, only if AFTER is still at least 1.5x at 72 hours (30 Oct). Otherwise do a second REPEAT angle.
- CART Part 2, only if CART's comments are real 'CART' comments from someone other than Prashant. Otherwise skip the slot.

**Sell more (3):**
- FAQ Part 2 episode. This is the top post, so the same FAQ tool gets a new angle: returns tagged 'size issue'.
- STORE carousel ('6 reasons shoppers leave your product page')
- SALE Part 2 (Diwali shipping cutoffs), only if it can publish by 31 Oct. This is a timing call, not a data call: SALE was 1.03x with zero action. Otherwise do BUNDLE Part 2, the only episode with a save. That is a weak reason, n=1.

**Rest (a rest, not a verdict):**
- ROAST (0.88x and 1.05x, zero action)
- RIVAL (0.99x)
- WINBACK (1.00x)
- LAUNCH
- AUDIT
- REVIEWS
- PRICE
- DESC
- TEAM (both versions, zero action)

## Topics to repeat with a new angle
- **FAQ:** Part 2 on the same tool.
- **AFTER:** a carousel, plus a Part 2 if AFTER holds at 72 hours.
- **RTO:** retold as a story about the 'order confirmed' COD WhatsApp, as experiment arm A.
- **CART Part 2** and **SALE Part 2:** only under the conditions above.
- **STORE:** carousel only, no third reel.
- Nothing else.

## Posting window
- Post everything at 14:45 UTC (8:15 PM IST). One slot removes a variable.
- The 07:31 UTC slot holds the top 3, but those 3 also share hook #2 and a theme, so this isn't a finding. Time gets checked last.
- Don't run a time test.

## Keyword placement (house default, test retired for now)
- The old A/B test never ran in 3 weeks, and at about 1 comment per 1,000 episode reach, 4 posts would read 0 against 0.
- Every reel does the same thing:
  - the comment gate as caption line 1
  - the keyword on screen mid-reel
  - the keyword spoken at the end
  - no keyword chip on the cover
- Bring the test back once episodes average 3 or more keyword comments.

## One experiment: a named customer message vs a back-office problem
**Why:** the only posts to break the reach floor (FAQ, AFTER, plus CART in third place) each named a message the viewer already sends their customer. Hook and slot were tangled with that, so hold them fixed and vary only the theme.

**Setup:** 4 story-3d episodes, posted on different days in the order A, B, A, B. Log `arm` on each.
- **Held fixed across all 4:**
  - hook #2
  - 15 to 25 s
  - 14:45 UTC
  - the same keyword-gate rules
  - Bunty's problem in the first line with an example number
- **Arm A, a named customer message (2 Operations episodes):**
  - RTO: Bunty's 'Your order is confirmed!' COD WhatsApp that buyers ignore, then the orders come back.
  - SUPPORT: his copy-pasted 'Sorry for the inconvenience' reply.
  - The message is quoted on the cardboard-sign cover in Bunty's words.
- **Arm B, a back-office problem no customer sees:**
  - STOCK: his bestseller sells out because the reorder sheet is stale (Operations).
  - SCALE: his weekly ad report doesn't say what to kill (Ads).
  - The covers state the problem, with no quoted message.
- **Known confound:** B has one Ads episode. Ads episodes sat at 0.88x to 1.17x, all at 14:01, so watch for it.

**How we judge it:**
- **Main measure:** reach at 72 hours.
  - A wins if both A episodes out-reach both B episodes and both A episodes clear 150 reach.
- **Secondary measures:** keyword comments, saves and shares per 1k reach, each counted by hand.
- **Why it won:**
  - If hold@3s is copied on all 4, higher hold on A means the cover and hook did the work.
  - Equal hold but higher non-follower % on A means the topic travelled.
  - If hold@3s is missing, the reach result stands as directional only, and we can't say why.
- **Profile check:** if any episode passes 200 reach with 0 follows, go to /ig-profile before more hook work.

**Reading the result:**
- With 4 posts, any result is directional only.
- **A wins cleanly:**
  - Brief the next 2 weeks of episodes on named customer messages.
  - Rerun the test with hook #3 to see whether it holds without #2.
- **Mixed result:** call it noise and keep this mix.
- **B wins:** the FAQ and AFTER lift came from something else (slot, recency or chance). Record it and don't chase it.

## Baseline check (not an experiment)
- At each 72-hour mark, compare:
  - views with the episode median of 126
  - reach with 150
  - shares and saves with 0
- If reach stays under 131 and shares stay at 0 through this week, check hold@3s and non-follower % before touching topics again.
