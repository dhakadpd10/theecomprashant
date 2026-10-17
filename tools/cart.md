# The No-Spam Cart Recovery Sequence

Paste everything below the line into Claude, then fill in your store details at the bottom where it says. Works for any store that collects phone numbers at checkout (Shopify, WooCommerce, Dukaan, your own site). Claude writes the messages and the timing. You send them yourself through the WhatsApp Business app or your cart-recovery tool.

---

You are writing a No-Spam Cart Recovery Sequence for my online store. It is three WhatsApp messages for shoppers who left items in their cart, in English and Hinglish, plus a separate version for sale weeks. You write the scripts and the timing only. I will send them myself through WhatsApp Business or my own tool. Never tell me anything has been sent or set up.

**Ground rules. Follow every one.**
- Use only the facts I give you. Never invent prices, discounts, codes, delivery dates, stock levels, reviews, ratings, guarantees or policies. If a message needs a fact I haven't given, write [CHECK: what I need to confirm] inside the message and keep going.
- No fake urgency. Don't write "only 2 left", "price goes up tonight" or "offer ends soon" unless I have told you it is true and given you the real number or date.
- Send no more than three messages per cart. Each one must give the shopper something useful: a link, an answer or a real offer. Never send just "you forgot something".
- Every message ends with an easy way out. English: "Reply STOP and we won't message you again." Hinglish: "STOP reply karein, hum dobara message nahi karenge."
- Keep it short. Aim for under 300 characters in the body so it reads on a phone in 5 seconds. Use one link and one ask.
- Sound like a person at a small brand, not a bank. Don't use "Dear Customer". Don't use ALL CAPS. Use one emoji at most per message.
- Hinglish means Hindi written in English letters, the way people actually text. One example is "Aapka cart abhi bhi saved hai". Don't translate word for word. Rewrite each line so it sounds natural.

**Step 1: Read my details.** Read the store details I filled in at the bottom. If something important is blank (price, delivery time, COD, returns), ask me for it once in a single short list. If I say I don't know, write it as [CHECK: ...] and carry on.

**Step 2: Check the basics first.** Give me a short checklist of things to confirm before I send anything. Present it as practical notes, not legal advice. Cover these points:
1. **Opt-in.** Only message shoppers who agreed to get WhatsApp messages from my brand. The usual way is a checkbox at checkout that clearly says they will get order updates and offers on WhatsApp. Best practice is to leave it unticked by default. If I pasted my current wording, tell me plainly if it is unclear. Add [CHECK: does your consent wording cover marketing messages under India's data protection rules (DPDP)?].
2. **Approved templates.** On the WhatsApp Business Platform (the API, usually through a provider), any message I start outside 24 hours of the customer's last message must use a template that Meta has approved. Cart reminders usually go in the Marketing category, and Marketing messages are paid per message. Add [CHECK: current per-message rates on Meta's pricing page or with your provider]. Meta decides the final category, not me.
3. **The free WhatsApp Business app.** It cannot send automatic cart reminders. Messages go out by hand, and broadcast lists only reach people who saved my number. This works at low volume, roughly a handful of carts a day.
4. **Stop rules.** Don't send a message if any of these is true:
   - The shopper has already ordered.
   - They replied STOP.
   - They replied with a question. Answer it by hand instead of sending the next scripted message.
   - They have already received message 3.
   Only send between 9 AM and 9 PM IST. If one shopper abandons a cart twice in a week, send only one sequence.
5. **Failed payments.** If the checkout dropped at a failed UPI or card payment, message 1 should offer help to retry, not remind them they forgot. Write one extra version of message 1 for this case.
6. **Delivery.** Meta may not deliver every marketing message to every user. So a low delivery count doesn't always mean the sequence is broken.

**Step 3: The standard sequence.** Write three messages. Give each one in English and in Hinglish.
- **Message 1, at 1 hour: the helper.** Remind them gently, link back to their cart and offer to answer a question on chat. Don't give a discount.
- **Message 2, at 24 hours: the doubt-killer.** Answer the most common reason people hesitate, using my details. Add one real proof point I gave you, such as review count, return policy or delivery time. If I gave none, use [CHECK: ...].
- **Message 3, at 72 hours: the last nudge.** Say clearly that this is the last message. If I have a real offer, use it here with the real expiry. If I don't, leave out the discount and give an easy exit, for example "Not for you right now? No problem."

For each message, show:
- **Send time**
- **English body**
- **Hinglish body**
- **Buttons:** two at most. For example, a "View my cart" link button and an "Ask a question" quick reply.
- **Template version:** the English body with variables such as {{1}} for first name, {{2}} for product name and {{3}} for cart link. List what each variable stands for, and suggest a template category.
- **Length:** the approximate character count of the English body.

**Step 4: The sale-week version.** Write this only if I gave you a real sale with a real end date and time. If I wrote "none", write a version I can adapt later and fill the sale facts with [CHECK: ...]. Give each message in English and Hinglish, in the same format as Step 3.
- **Message 1, at 1 hour.** Remind them, show the sale price only if I gave it, and link to the cart.
- **Message 2, at 12 hours.** If 12 hours falls outside 9 AM to 9 PM IST, send it at 10 AM the next morning instead. Answer the top doubt. In sale weeks, be honest about delivery. If couriers are slower during my sales, give the real estimate I provided.
- **Message 3, at least 6 hours before the sale ends.** Send it only if the cart is still open and the end time is real. Name the real end date and time in IST. If the sale ends before this message is due, skip it and tell me so in the table.

**Step 5: Rewrite for my top doubt.** Rewrite message 2 and message 3, in both the standard and sale-week versions, around my product's most common doubt. Handle each doubt this way:
- **Size.**
  - Link to the size guide.
  - State my real exchange or return policy.
  - Offer help on chat, for example "Send us your usual size in another brand and we'll suggest yours."
  - Never promise a "perfect fit".
- **Delivery date.**
  - Give my real dispatch time and usual delivery days.
  - Say "usually" or "estimated", never "guaranteed", unless I told you I guarantee it.
  - Mention a festival delivery cutoff only if I gave one.
- **COD.**
  - Say whether COD is available and whether there is a COD fee.
  - Mention UPI and other prepaid options, plus any prepaid discount, with the real numbers only.
  - If COD isn't available, say so plainly with the reason I gave.
  - Never make COD buyers feel judged.
- **Something else** (fabric, quality, authenticity, skin type and so on). Answer it with a real fact from my details or a [CHECK: ...].

If I didn't name a doubt, ask me: "What do shoppers ask most in your DMs or support chats? Paste 10 to 20 real questions and I'll find the top one." If I paste questions, group them and count how many fall under each doubt. Count only what I pasted, show the counts, then rewrite for the top doubt.

**Step 6: Hand-off.** End with these four things:
- **Summary table.** One screen showing each message, its send time, its goal and whether it has an offer (yes or no), for both versions.
- **CHECK list.** Every [CHECK: ...] you left, in one list, so I can fix them all at once.
- **What to track.**
  - Recovered orders ÷ carts messaged.
  - Replies ÷ messages sent.
  - STOP replies ÷ messages sent.
  If STOP replies climb, cut message 3 first. Don't quote industry benchmark numbers as facts.
- **Reminder.** Say plainly that nothing has been sent. These are drafts for me to load into the WhatsApp Business app or my tool, and templates need Meta approval before I can use them.

Keep my brand's voice. Use plain words and no hype.

**My store details:**
- Brand name:
- What I sell (one line):
- Typical product and price range (₹):
- Store platform (Shopify, WooCommerce, Dukaan, other):
- How I'll send (WhatsApp Business app by hand / provider name / not sure):
- How shoppers opt in to WhatsApp now (paste the checkout wording if you have it):
- Dispatch time and usual delivery days (metros / rest of India):
- COD available? COD fee?
- Prepaid options and any prepaid discount:
- Return or exchange policy (paste it):
- Real proof I can use (review count, rating, anything true):
- Offer for message 3 (exact amount, code and expiry, or "none"):
- Sale-week details (sale name, real discount, start and end date and time in IST, or "none"):
- Most common doubt (size / delivery date / COD / other / not sure):
- Optional: 10 to 20 real customer questions, pasted:
- Brand voice in 3 words (for example: warm, simple, playful):
- Words to avoid:
