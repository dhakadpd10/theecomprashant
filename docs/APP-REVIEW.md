# Meta App Review: let the agent see comments and send DMs to everyone

While the Meta app is in **development mode**, Instagram only shows the agent comments from accounts that have a role on the app, and only lets it message those accounts. Posting your own reels already works. To answer real followers, two permissions need **Advanced Access**, then the app is switched to **Live**.

Everything below is on developers.facebook.com → your app.

## 1. App settings → Basic

| Field | Value |
|---|---|
| App icon | `docs/app-icon.png` (1024 × 1024) |
| Privacy Policy URL | https://dhakadpd10.github.io/theecomprashant/privacy/ |
| Terms of Service URL | https://dhakadpd10.github.io/theecomprashant/terms/ |
| User data deletion | choose **Data deletion instructions URL** → https://dhakadpd10.github.io/theecomprashant/data-deletion/ |
| Category | Business and pages |
| Contact email | your email |

Click **Save changes**.

## 2. Record the screen recording (needed once, about 2 minutes)

Meta wants to see the feature working. Do the tester test first (your second account as an **Instagram tester**), then record your phone or computer screen while you:

1. Show a reel on @theecomprashant whose caption says *Comment "STORE"…*.
2. From the second account, comment **store** on it.
3. In GitHub → **Actions → Engage → Run workflow** (or wait up to 15 minutes).
4. Show the public reply under the comment ("Sent! Check your DMs 📩").
5. Open the second account's DMs and show the message with the free tool link, then open the link.
6. Comment a question (e.g. "does this work for Shopify?") and show the agent's reply.

Save it as an MP4 (under 100 MB).

## 3. Request Advanced Access

App dashboard → **App Review → Permissions and features** (or Use cases → Instagram → Customize → Permissions). Click **Request advanced access** for:

### `instagram_business_manage_comments`
> Our app runs the Instagram professional account @theecomprashant, which shares free AI tools for small online stores. Each post asks people to comment a keyword (for example "STORE") to receive a free tool. The app reads comments on our own posts to (1) detect the keyword and reply publicly that the tool was sent, and (2) answer questions people ask in the comments. We only read comments on posts published by our own account, we do not store comment text, and we never comment on other accounts' posts. The screen recording shows a user commenting "store" on our reel and the app replying to that comment.

### `instagram_business_manage_messages`
> When someone comments a post's keyword on our own posts, the app sends that person one private reply (a direct message linked to their comment) containing the free tool they asked for. The app also replies to direct messages people send to @theecomprashant, within Instagram's 24-hour messaging window, and hands anything sensitive (complaints, orders, partnerships) to a human. We never message people who have not commented on our posts or messaged us first, and we do not send promotional broadcasts. The screen recording shows the private reply arriving in the commenter's inbox.

### `instagram_business_basic`
> Needed to read our own account's profile and list our own posts so the app knows which post a comment belongs to.

(`instagram_business_content_publish` and `instagram_business_manage_insights` are only used on our own account, so standard access is enough; request them too if the form asks.)

For each one, upload the screen recording, tick the agreement boxes, and **Submit**.

## 4. Business verification (if Meta asks)

Advanced access can require verifying who runs the app. Meta will show a **Start verification** button if so. Individuals can usually verify with a government ID; businesses with registration documents. Do this yourself in Meta's own form.

## 5. After approval

- At the top of the app dashboard, switch **App Mode** from **Development** to **Live**.
- Nothing changes in GitHub: the Engage job starts seeing every comment on its next run. Its log stops showing "comments are hidden" warnings.

Review usually takes 2 to 10 days. If Meta rejects a permission, they say why; paste the message to Claude and fix that one item.
