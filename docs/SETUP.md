# Setup (about an hour, once)

You'll create four things: a GitHub repository, a Claude API key, an Instagram app token, and a few settings. Everything after that runs by itself.

## 1. Instagram account
1. Instagram app → Settings → **Account type and tools** → switch to **Creator** (or Business).
2. Make sure the username matches `handle` in `config/agent.json`.

## 2. GitHub repository
1. Create a free account at github.com (if you don't have one).
2. Create a new **public** repository named `theecomprashant` (public keeps Actions free and lets Instagram fetch your media).
3. Upload this folder to it (Claude can do this for you once you're signed in to GitHub on your computer).
4. Repository → **Settings → Pages** → Source: **GitHub Actions**.
5. Repository → **Settings → Actions → General** → Workflow permissions: **Read and write**, and tick **Allow GitHub Actions to create and approve pull requests**.
6. In `config/agent.json`, set `site_url` to `https://<your-github-username>.github.io/theecomprashant`.

## 3. Claude API key
1. console.anthropic.com → sign in → **API keys** → Create key. Add a little credit under Billing.
2. Repository → **Settings → Secrets and variables → Actions → New repository secret**: name `ANTHROPIC_API_KEY`, value = the key.

## 4. Instagram API token (official, no password sharing)
1. developers.facebook.com → **My Apps → Create app** → use case **"Manage messaging & content on Instagram"** (Instagram API with Instagram Login).
2. In the app: **Instagram → API setup with Instagram business login** → add these permissions: `instagram_business_basic`, `instagram_business_content_publish`, `instagram_business_manage_comments`, `instagram_business_manage_messages`, `instagram_business_manage_insights`.
3. **Generate access token** for your Instagram account (you log in to Instagram in Meta's own window). Copy the token and your **Instagram user ID** shown there.
4. Add two more repository secrets: `IG_ACCESS_TOKEN` (the token) and `IG_USER_ID` (the ID).
5. Turn on message access for the app in the Instagram app: Settings → Messages and story replies → Message controls → **Connected tools: allow access to messages**.

While the Meta app is in development mode it only works for accounts with a role on the app, which includes yours. That's all this agent needs.

## 5. Keep the token alive
Instagram tokens last 60 days. Create a GitHub fine-grained token (github.com → Settings → Developer settings → Fine-grained tokens) for this repository only, with **Secrets: Read and write**. Save it as the secret `GH_PAT`. The **Token** workflow then refreshes Instagram every Monday.

## 6. Go live
1. Actions tab → **Site** → Run workflow (publishes the tools page and media). Open `https://<you>.github.io/theecomprashant/tools/` to check.
2. Actions tab → **Launch** → Run workflow → enter Day 1 (e.g. `2026-10-26`). The 14 ready-made posts go out at 13:00 and 19:30 IST from that day.
3. From then on, every Saturday you get a pull request **"Approve <week>"**. Look through it on the GitHub app and press **Merge**. Close it to reject the week, or set a post's `"status"` to `"skip"` in its `plan.json` to hold one back.
4. Anything the agent won't answer itself shows up as an **issue** labelled `inbox`. Turn on GitHub notifications on your phone.

## Check it
Actions tab → run **Publish**, **Engage** or **Daily** by hand any time. Each run's log says exactly what it did.
To run locally: `npm ci`, put the same secrets in a `.env`-style environment, then `node src/cli.js check`.
