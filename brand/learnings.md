# Learnings (the agent updates this every Monday)

Each week: what the numbers said, what to do more of, what to stop. Newest on top. Only write conclusions the data supports; with fewer than ~5 posts a week, call it a hunch.

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
