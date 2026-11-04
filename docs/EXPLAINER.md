# AI explainer reels: the playbook (30 Oct 2026)

Prashant's decision: **every reel is a value-first AI explainer.** One useful AI idea per reel, explained so visually that someone who has never used AI gets it, and useful enough to send to a friend. No skits and no pure news. When an idea saves time or earns money, say so, but the explanation is the product.

This file outranks docs/MONEY.md and docs/VIRAL.md when they clash. MONEY.md's honesty rules and platform list still apply whenever a reel touches money.

## Why (the numbers that drove it)

- 9 money reels on @theprashant.ai, 28 to 30 Oct: 28 to 132 views, average watch **4.1 to 4.6 seconds** on 25-second reels. The skit held 9.7 s.
- People left in the first 5 seconds. The scripts were fine; the screens didn't hold them. The hook was small, cards were half empty and the result was never shown.
- Explainers that win on Instagram give the viewer a "now I get it" moment they can repeat to a friend. That moment gets sent, and sends per reach is what puts reels in front of non-followers.

## The five kinds (config motion.mix)

1. **explain**: how or why something in AI works, with one analogy from daily life. "Why ChatGPT makes things up", "What a prompt really is", "How AI makes a picture from words", "Why AI forgets your earlier chat". Sample: `content/story-samples/e04-explain-lies/`.
2. **tutorial**: do one useful thing with AI in 3 steps, and show the finished result. "Turn a voice note into a to-do list", "Make a study plan from your syllabus PDF".
3. **prompt**: one prompt that makes AI much better at something, shown before and after: the plain answer, then the answer with the prompt.
4. **tool**: one free AI tool or new feature: what it does, the result on screen, who it's for, and the catch.
5. **compare**: two or three tools or methods side by side on the same task, with a clear verdict. "ChatGPT vs Gemini vs Claude for writing a CV."

## The story arc (every kind, 20 to 28 seconds)

| Beat | Job | Time |
|---|---|---|
| Hook | The surprising claim or the result, on screen at frame 0 | 0 to 3 s |
| Problem | The pain or the confusion, in the viewer's words | 3 to 6 s |
| How it works | The mechanism or the steps, one per beat, each with its own diagram | 6 to 18 s |
| Payoff | The finished result, the "now I get it" moment (the cooker whistles) | 18 to 22 s |
| Catch and send | One honest limit, then "send this to the friend who…" and the keyword | 22 to 28 s |

- **One core idea.** Write it as one sentence before anything else ("It guesses the next word, so a likely word can be a wrong word"). If a beat doesn't serve that sentence, cut it.
- **One analogy, kept all the way through.** Pick it from daily life in India (a phone keyboard, a chai stall order, an exam topper copying notes, a Swiggy route). Never switch analogies mid-reel. If the analogy needs explaining, it's the wrong one.
- **Script first.** About 3.3 spoken words per second at speed 1.05: 70 to 95 words in total, 16 words or fewer per line.
- **Pace follows tension.** The hook and problem are brisk. The "how" beats are slow, so each diagram can land. Let the payoff breathe.

## The screen (on top of docs/MOTION.md "Readability and proof")

- **Frame 0** shows the claim as the biggest thing on screen (110 px or more, 6 words or fewer) and something visual that isn't explained yet. That creates the curiosity gap.
- **Every "how" beat is a diagram, not a sentence.** Build it in pieces (progressive disclosure): first the parts, then the arrows or bars between them, then the labels. Good shapes: a sentence built word by word with probability bars, a flow of 3 boxes with arrows that draw themselves, a before/after split, a meter, a checklist that ticks, a chat that types.
- **Colour means something, and never changes meaning within a reel.** Blue (the accent) = the AI. Green = right or true. Red = wrong or made up. Amber = unsure or check. Label example numbers on screen as "EXAMPLE".
- **Show the result.** The payoff beat shows the finished thing (the better answer, the plan, the picture) as a full card.
- **Use the stage.** The host presents from the corner. Hide him (`"at": "hidden"`) on the one beat where a diagram needs the full width (cards at left 90 px, right 90 px), and bring him back for the payoff.

## Motion (from the animation-principles and explainer-video skills)

Settle these before choosing numbers: what should the viewer feel (curiosity, then relief), what is the micro-story of this beat, and how do we make it believable.

- **Three layers at once.** Primary: the hero move the eye follows (the card, the diagram). Secondary: things that react to it (labels settle 0.05 to 0.1 s later, a chip wobbles, the card shakes when a stamp lands). Ambient: slow background life for the whole reel (two soft orbs drifting with `sine.inOut` over `T.dur`).
- **Easing.** Enter: `expo.out`, 0.4 to 0.6 s. Pop: `back.out(1.7)`, 0.35 to 0.45 s. Exit or strike: `power3.in`, 0.2 to 0.35 s. Move: `power2.inOut`. Use `linear` and `steps()` only for typing and blinking carets.
- **Stagger.** 0.06 to 0.08 s between items in a list. Cap a group's reveal at about 0.7 s. Reveal top to bottom, following the eye.
- **Anticipation and follow-through.** Chips scale to 1.12 and settle to 1. A stamp slams in with `power4.in`, then the card shakes 5 times by 8 to 10 px. Labels arrive after their card.
- **Count-ups and bars.** Numbers count up while their bar grows (`scaleX` from 0, `power3.out`, 0.5 to 0.7 s), so the eye sees the size and the number together.
- **The 1/3 rule.** No more than about a third of the elements move at once, and nothing slides more than a third of the screen without a scale or opacity change.
- **On the beat.** Land stamps, ticks and pops on the voice's stressed word or on `T.voice(n) + k * T.beat / 2`.

## Hooks that work for explainers

- The surprising truth: "ChatGPT made that up. Here's why."
- The hidden mechanism: "This is what AI actually does when you type."
- The mistake: "You're using ChatGPT like Google. That's why the answers are bad."
- The result first: show the finished thing, then "Here's how, in 3 steps."
- Never open on the tool's name alone, a greeting, or "In this video".

## Honesty

- Every claim about how AI works must be true in plain words. Simplify; never invent. If you're not sure a feature exists or is free, it must be in this week's research with a link, or leave it out.
- Say the catch out loud in every reel.
- No "AI will make you rich", no fear-bait ("AI is taking your job tomorrow").

## Topic bank (rotate; never the same topic within 3 weeks)

- Why ChatGPT makes things up, and the one line that fixes it (explain, TRUTH)
- What a prompt really is: you're giving a new intern a brief (explain)
- Why AI forgets what you said 20 messages ago (explain)
- How AI makes a picture from words, explained with a blurry photo (explain)
- Turn any long PDF into a 1-page summary and 10 quiz questions (tutorial)
- Make a week of meals from what's in your fridge (tutorial)
- The prompt that makes AI write like you, not like a robot (prompt, MONEY or a new tool)
- Before and after: a plain prompt vs a role, goal and format prompt (prompt)
- NotebookLM turns your notes into a podcast (tool)
- ChatGPT vs Gemini vs Claude for writing a CV, judged (compare)
- Free vs paid ChatGPT: what you actually get (compare)
- Your phone's built-in AI features most people never open (tool)
