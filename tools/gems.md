# Gem Backup Prompt and Checklist

Paste everything below the line into Claude. Then open your Gem's edit screen in Gemini, copy everything in its Instructions box, and paste it where it says. If you have Google's Gems-to-Skills help page open, paste its text too, so your checklist follows Google's own steps and not general advice. Do this before 17 Dec, and confirm that date on Google's page.

---

You are helping me back up one Gemini Gem before Google's Gems-to-Skills change. You have three jobs:
1. Turn my Gem's instructions into a one-page brief I can keep.
2. Turn that brief into a Skill I can reuse.
3. Give me a checklist of what to save before the deadline.

**Rules for everything you write:**
- Never invent facts. That includes Google's steps, dates, menu names, file limits, prices, store policies and anything else I didn't give you.
- Mark every unknown as [CHECK: what to verify and where].
- Don't say what Google's help page says unless I pasted its text below. If I didn't, say plainly that you haven't read it.
- Keep my Gem's meaning. Don't add new rules or a new personality. If a line is unclear, keep the original wording and flag it. Don't guess what I meant.
- Watch for private data in what I paste: passwords, API keys, customer names, phone numbers, addresses, order details. If you find any:
  - Don't repeat it in your answer.
  - Replace it with [REMOVED: private data].
  - Tell me to delete it from the Gem too.
- Use plain words and short sentences. No hype.

**Step 1: Check what I gave you.** These are the inputs:
- A. My Gem's instructions (required).
- B. The Gem's name and description (optional).
- C. The names of any knowledge files I uploaded to the Gem (optional).
- D. The text of Google's Gems-to-Skills help page (optional).

If A is missing, ask me for it and stop. If B, C or D is missing, carry on and mark the gaps.

**Step 2: Understand the Gem.** In 5 short lines, tell me:
- what job it does
- who it is for
- what I give it
- what it gives back
- the one rule it must never break

Then list any instructions that:
- conflict with each other
- are vague (for example "be good" or "make it nice")
- depend on a file or link I didn't include

**If this Gem is for a business** (for example product descriptions, customer replies, WhatsApp messages, ad copy, captions or order and return questions):
- List every business fact it relies on: prices, offers, shipping times, delivery areas, COD rules, return and refund policy, sizes, ingredients, brand voice and banned words.
- Mark each one [CHECK: still true today?]. These facts go out of date, and a Gem that repeats an old return policy to a customer costs real money.

**Step 3: The one-page brief.** Rewrite the Gem as a brief of 400 words or fewer, with these headings:
- **Name**
- **What it does:** one sentence.
- **Use it when:** 2 or 3 real situations, taken from my instructions.
- **What to give it:** the inputs, as a list.
- **What it gives back:** the format, length and structure.
- **Steps it follows:** numbered, in order.
- **Always / Never:** the rules, word for word where they matter.
- **Voice:** how it should sound, in one or two lines.
- **Example:** only if my instructions had one. Otherwise write [ADD: one real example of a good answer].
- **Files and facts it needs:** from C and Step 2, or [CHECK: which files did this Gem use?].

**Step 4: The Skill version.** Turn the brief into one file I can save as `SKILL.md`, in this shape:

```
---
name: short-name-with-hyphens
description: One or two sentences on what this does and when to use it.
---

(the brief's steps, rules, voice and example, written as instructions)
```

This is the format Claude Skills use.
- If D (Google's page) describes a different format for Gemini Skills, follow the page. Show me both versions and quote the line from the page you followed.
- If I didn't paste D, add this line under the file: [CHECK: does Google's Skills format match this? See the Gems-to-Skills help page.]

**Step 5: The backup checklist.** Write it as tick boxes, most important first.

- **If I pasted D:**
  - Build the checklist only from that page.
  - Under each item, quote the line it comes from.
  - Write down the deadline exactly as the page states it. If it isn't 17 Dec, flag that at the top in bold.
  - At the end, list anything the page doesn't cover that I might still lose, each marked [CHECK].
- **If I didn't paste D:** start with "I haven't read Google's help page, so confirm every item there." Then give this general list and mark every item [CHECK: confirm on Google's Gems-to-Skills help page]:
  - [ ] Save the Gem's full instructions in a doc or notes app (this prompt does that).
  - [ ] Save the Gem's name and description.
  - [ ] Keep your own original copy of every knowledge file you uploaded. Don't rely on getting it back out of the Gem later.
  - [ ] Write down any Google Drive files or links the Gem uses, and who can open them.
  - [ ] Save any chats with this Gem that you still need, such as good answers or past replies to customers.
  - [ ] Take a screenshot of the Gem's settings screen.
  - [ ] Note anyone you shared the Gem with, so you can share the new version.
  - [ ] Check every business fact from Step 2 is still true before you reuse the brief.

**Step 6: Test it.** Give me 3 test inputs to try with the new brief or Skill in a fresh chat. Take them from real situations in my instructions. For each one, write in one line what a good answer must include, based on the original Gem.

**Your answer, in this order:**
1. What the Gem does (Step 2)
2. Problems and facts to check
3. The one-page brief
4. The `SKILL.md` file
5. The backup checklist
6. The 3 tests
7. A short list of every [CHECK] and [ADD] item, so I can clear them in one go

Here is my Gem:

A. Instructions:
[PASTE YOUR GEM'S INSTRUCTIONS HERE]

B. Name and description (optional):
[PASTE HERE OR LEAVE BLANK]

C. Knowledge file names (optional, names only, not the files' contents):
[LIST HERE OR LEAVE BLANK]

D. Google's Gems-to-Skills help page text (optional):
[PASTE HERE OR LEAVE BLANK]
