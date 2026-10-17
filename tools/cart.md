# Cart Comeback Sequence

Paste everything below the line into Claude, then fill in the brief at the bottom with your product, offer and tone. You get three WhatsApp messages to load into your own WhatsApp provider or Shopify app (Interakt, WATI, AiSensy, Gupshup or similar). This only writes the messages. It does not send anything, and it does not connect to your store.

---

You are writing a 3-message WhatsApp abandoned-cart sequence for a D2C brand. The messages go to shoppers who added something to their cart, gave their phone number, and left without paying. Your job is to bring back the ones who meant to buy, without annoying the ones who didn't.

**Rules for you, the writer:**
- Never invent facts. That includes prices, discounts, delivery times, return policies, stock levels, reviews, ratings and guarantees. If the brief doesn't give it, write [CHECK: ...] and tell me what to fill in.
- Never invent urgency. Don't write "only 2 left", "offer ends tonight" or a countdown unless the brief says it is true.
- If I gave no discount, don't add one. Write the sequence without an offer and suggest where one could go, marked [CHECK: do you want to offer anything here?].
- WhatsApp rules and Meta's prices change. Don't state any rule, limit or price as certain. Mark anything I should confirm as [CHECK: ...].

**Step 1: Read the brief.**
Read the brief at the bottom. List anything missing or unclear that would change the messages, such as no return policy, no checkout link format, an unclear offer, or no word on how customers opted in. Ask me for these in one short list. If I say "go ahead anyway", continue and mark each gap as [CHECK: ...].

**Step 2: Consent check (before writing anything).**
Tell me in plain words:
- These messages should only go to people who agreed to get WhatsApp messages from the brand, for example a ticked box or a clear line at checkout. Typing a phone number for delivery is not the same as agreeing to marketing. [CHECK: how does your store collect WhatsApp opt-in today?]
- The shopper hasn't messaged the brand first, so each message will almost certainly need to be a pre-approved WhatsApp template. Cart reminders are usually treated as Marketing templates. [CHECK: confirm the template category with your provider before you submit.]
- Meta can reject templates and may not deliver every marketing message, so some carts won't get all three. [CHECK: your provider's delivery report.]

Keep this to 3 or 4 lines. Don't lecture.

**Step 3: Write the three messages.**
Write each message in **English** and in **Hinglish** (Hindi words in Roman script, the way people actually type on WhatsApp, not formal Hindi). Match the tone in the brief.

1. **Message 1, about 1 hour after the cart is left: "You left this."**
   A helpful reminder. Name the product, give the cart link, and answer the most likely worry (size, delivery time, COD, returns), using only facts from the brief. No discount here.
2. **Message 2, about 24 hours after: "Here's why people buy it."**
   One real reason to buy: a true product fact, a real review quote from the brief, or a clear answer to a common doubt. Offer help: "Reply here if you have a question." If the brief has no reviews, don't write any.
3. **Message 3, about 72 hours after: "Last reminder."**
   Say plainly that this is the last message about this cart. Include the offer only if the brief gives one, with its real terms and end date. Otherwise just make it easy to finish the order.

For every message, give:
- **Send at:** the timing, plus the quiet-hours rule from Step 5.
- **English version** and **Hinglish version.** Keep each under 600 characters and easy to read on a phone. Show the character count.
- **Variables** in WhatsApp template format: {{1}} = first name, {{2}} = product name, {{3}} = cart link, and so on. List what each one is.
- **Buttons:** suggest at most 2, for example a URL button "Complete order" and a quick-reply button "Stop reminders".
- **Opt-out line** at the end (see Step 4).
- **Stop if:** the conditions that cancel this message, such as order placed, opted out, or replied asking to stop.

No guilt trips ("Don't you want it?"), no ALL CAPS, at most one emoji per message, and no "Hey dear".

**Step 4: The opt-out line.**
Write one short opt-out line in English and one in Hinglish to add to every message. For example: "Reply STOP and we won't message you about this cart again." Pair it with a "Stop reminders" quick-reply button if the provider supports one. Tell me to set my provider so that STOP, "stop", "band karo" and a tap on the button all end the sequence straight away and mark the number as opted out of marketing. [CHECK: does your provider handle opt-out keywords automatically, or do you set them up?]

**Step 5: The no-spam rule list.**
Give me a short checklist to set up in my provider or app:
- Only send to numbers that opted in to WhatsApp messages.
- No more than 3 messages per cart, ever.
- Stop the sequence the moment the order is placed, including COD orders and orders placed on another device.
- Stop the moment someone opts out, and never send them marketing again unless they opt back in.
- Quiet hours: no messages between 9pm and 9am in the shopper's time. Hold the message until 9am. [CHECK: change the hours if your buyers keep different hours.]
- If the same number leaves a new cart within 7 days, don't start a new sequence. [CHECK: pick your own window.]
- Never claim stock, deadlines or prices that aren't true at the time of sending.
- If a shopper replies with a question, a human (or a support bot trained on your real policies) answers it. Don't send the next reminder on top of an open conversation.
- For sensitive products (health, intimate, personal care), don't name the product in the message. Say "your cart" instead.
- Check the provider's failed and blocked numbers every week. If many people block or report you, cut the sequence to 2 messages.

**Step 6: Message count and cost check.**
Show how many paid messages each cart uses:
- Table columns: Message, Template category [CHECK with provider], Sent when, Skipped if.
- **Most a cart can use:** 3 template messages.
- **Average per cart:** lower than 3, because some people buy or opt out after message 1 or 2. Give the formula:
  `Average messages per cart = 1 + (share still not bought after msg 1) + (share still not bought after msg 2)`
- **Monthly cost formula:**
  `Abandoned carts with opt-in per month × average messages per cart × rate per marketing message`
- Leave the rate blank as [CHECK: current per-message rate for Marketing templates to Indian numbers, from Meta's WhatsApp Business pricing page or your provider's rate card. Many providers add their own fee on top.]
- Then work one sum with made-up numbers, labelled clearly as **EXAMPLE ONLY, NOT REAL DATA**. For example: 500 carts, 30% still not bought after message 1, 20% after message 2, so 1 + 0.3 + 0.2 = 1.5 messages per cart, 750 messages a month × [rate]. Also show the break-even: how many recovered orders at my average order value pay for that month.
- Note that replies the shopper sends, and my replies to them inside the 24-hour window after they write to me, may be priced differently or be free. [CHECK: current rules on Meta's pricing page.]

**Step 7: Setup checklist.**
Give me 5 to 8 steps to get this live in my provider: submit templates for approval, map the variables to my store's cart data, set the three delays, set the stop conditions, set quiet hours, test on my own number, and turn it on. Keep each step generic and tell me to check my provider's help docs for where each setting lives. Don't describe menus you can't see.

**Step 8: What this doesn't do.**
End with 3 honest lines: this sequence doesn't send messages, doesn't track who bought, and doesn't guarantee approval or delivery. My provider or app does all of that.

Plain words. Short sentences. Rupees for money. No hype.

Here is my brief:
- Brand name: [ ]
- What I sell (main products, price range in ₹): [ ]
- Average order value in ₹ (for the break-even sum): [ ]
- Offer for abandoned carts, with exact terms and end date (or "none"): [ ]
- Delivery time and areas: [ ]
- COD available? Any COD charge?: [ ]
- Return / exchange policy (exact words if possible): [ ]
- 2 or 3 real customer reviews I'm allowed to quote (or "none"): [ ]
- Common doubts shoppers have before buying (size, quality, delivery, etc.): [ ]
- Tone (for example: friendly didi, premium and calm, fun and young): [ ]
- Brand sign-off name (for example "Team MiniKin" or a person's first name): [ ]
- Sensitive products? (yes / no): [ ]
- WhatsApp provider or Shopify app I use: [ ]
- How customers opt in to WhatsApp today: [ ]
- Cart link format, if I know it: [ ]
