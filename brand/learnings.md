# Learnings (the agent updates this every Monday)

Each week: what the numbers said, what to do more of, what to stop. Newest on top. Only write conclusions the data supports; with fewer than ~5 posts a week, call it a hunch.

## Week of 2026-10-20

- **8 reels, 360 reach, 0 likes, 0 shares, 2 saves.** By outlier multiple against a median of 55, the ranking is LAUNCH 2.11x, TEAM 1.45x, STORE 1.42x, PRICE 1.00x, DESC 0.78x, REVIEWS 0.36x, AUDIT 0.15x and RTO 0.07x (RTO is hours old). Nothing in the old format earned a like or a share. This fits Prashant's 20 Oct switch to 3D story episodes, but it can't show which part failed, because hold@3s, watch time, follows and non-follower reach are still missing on every post.
- **STORE is still the only post with comments (6), and the count hasn't moved since last week** even though reach went from 26 to 66. All 6 came early and may be Prashant's own replies or friends. keyword_comments is still blank, so this stays a hunch.
- **One like-for-like pair (hunch):** on 18 Oct, 2 hours apart, TEAM (Operations) got 80 views and REVIEWS (Ads) got 20. One pair isn't a pillar verdict.
- **AUDIT published fine** (0 to 8 views). The 0 was lag. It's simply weak at 0.15x after 3 days. Rest it, along with LAUNCH (reach and zero action, twice).
- **The plan wasn't followed, so the week can't be audited properly.** Hook id was blank on 8 of 8 posts and style on 6 of 8. There were 0 carousels and the keyword-placement test never ran. Midday IST posts (PRICE, AUDIT, RTO) sat at or below the median, but that's mixed up with post age, so it isn't a finding. Post everything from 8 to 9 PM IST so time stops being a variable.

## Week of 2026-10-19

- **Still too early: 3 reels, 1 pillar, 124 total reach.** The ranking by outlier multiple against a median of 32 is LAUNCH 3.5x, STORE 1.0x and AUDIT 0x. A median built from 3 posts means very little, so none of this is a pattern. Shares are 0 on every post, so the strongest signal (sends per reach) can't rank anything yet.
- **Same shape as last week (hunch).** LAUNCH got reach (98) but no action: 0 likes, 0 comments, 1 save (10.2 per 1k reach). STORE got 6 comments on 26 reach (231 per 1k). We still can't tell if those comments were "STORE" because keyword_comments is blank, and without hold at 3s we can't say where LAUNCH lost people.
- **AUDIT is still at 0 views and 0 reach** a day or more after its 08:04 UTC publish on 17 Oct. Before counting it, check by hand that the reel is live and public and that the API pull isn't lagging. Treat it as a possible publishing issue, not a hook verdict.
- **The log can't answer the audit's questions yet.** Hook formula and reel style are blank on all 3 posts, so the hooks.json comparison can't run. Hold at 3s, watch time, follows and non-follower reach aren't in the API. From now on, fill in hook id, style and keyword comments for every post, and copy those 4 numbers from in-app insights at 72 hours.
- **Carry forward unchanged:** follow the planned pillar mix, and run the keyword-placement test (chip in the first 3 seconds plus the end, against the end only) on 4 reels at 8 to 9 PM IST. Judge it on keyword comments ÷ reach at 72 hours.

## Week of 2026-10-17

- **Too early to conclude anything.** There are 3 reels, all in the Sell more pillar, and each was under 36 hours old at the snapshot. Together they have 156 views. Everything below is a hunch. AUDIT shows 0 views because it went live at 08:04 UTC on the day of the snapshot, so re-pull it next Monday before reading anything into it.
- **STORE got comments, LAUNCH got reach (hunch).**
  - STORE had 6 comments on 26 reach (about 23%), with 0 likes, 0 saves and 0 shares.
  - LAUNCH had 112 views and 98 reach, with 0 comments, 1 save and 0 shares.
  - My guess is that "7 AI shoppers reject your store" feels like a personal challenge, so people want to type. "12 AI customers judge your launch" is easy to watch but only matters to someone about to launch, so it gets no reply.
  - Reach is partly timing. LAUNCH went live at 5:13 PM IST and STORE at 8:58 PM IST, so STORE had about 4 fewer hours.
  - The 6 comments might come from 2 or 3 people, or include Prashant's own replies. Don't call it a win yet.
- **Fix the log first.**
  - keyword_comments is blank on all 3 posts. We can't tell if STORE's 6 comments were "STORE", which means we can't track keyword comments ÷ views, our main metric.
  - LAUNCH shows 2 total interactions but only 1 save is listed. Log follows, DMs sent and link taps so gaps like this are explained.
  - Stop publishing without these columns filled in by hand.
- **Stop running a single pillar.** With every post in Sell more, we can't compare anything. Next week follow the planned mix (Ads, Operations, Retention alongside Sell more) so the data can show which pillar pulls comments.
- **Experiment for next week: where the keyword appears.**
  - Run 4 reels, 2 in Sell more and 2 in Ads.
  - In each pillar, one reel puts the yellow keyword chip and "Comment KEYWORD" on screen in the first 3 seconds and repeats it at the end. The other keeps it at the end only (the current format).
  - Post all 4 in the same window, 8 to 9 PM IST.
  - Compare keyword comments ÷ reach at 72 hours. With 4 posts, treat the result as directional and repeat it the week after.

## Before launch (16 Oct 2026)
- No posts live yet. Starting assumptions from the reference creators:
  - Panel formats ("N AI critics / shoppers / customers judge your X") should lead.
  - Keyword-gated free tools drive comments; track comments ÷ views and DMs sent per post.
  - Watch saves on carousels (screenshot/recap slide) and shares on reels.
- Metrics to log per post: views (reach), likes, comments, keyword comments, saves, shares, follows, DMs sent, link taps.
