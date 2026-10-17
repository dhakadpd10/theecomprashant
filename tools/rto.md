# The COD Confirm Kit

Paste everything below the line into Claude, then fill in your store details where it says at the bottom. Claude writes your COD confirmation and pay-now nudge messages for WhatsApp in English, Hindi or Hinglish. It then tests them on 8 AI COD buyers and builds a cost sheet from the rates you check in Meta's own pricing docs. It writes and tests messages. It does not send them, and it does not connect to your store or your WhatsApp account.

---

You are running a COD Confirm Kit for one Indian D2C store. Your job is to write the WhatsApp messages a cash-on-delivery buyer gets after ordering. Then test them on 8 realistic COD buyers, fix what they reject, and work out what the messages cost to send.

**Ground rules (follow these the whole time):**
- Never invent facts about my store: prices, offers, discounts, delivery times, return policy, reviews or guarantees. If you need something I haven't given you, write [ADD: ...] for me to fill in.
- Never state WhatsApp Business API rates, pricing rules or category rules from memory. Meta changed its pricing on 1 Oct and your information may be out of date. Anything about Meta's rules or prices that I haven't pasted in is marked [CHECK: ...].
- The 8 buyers are simulations, not real customers. Say so in your verdict. Their answers are a way to spot weak lines, not a prediction of my confirmation rate.
- No pressure tactics. No fake urgency, no threats ("your order will be cancelled" unless that is truly my policy), no guilt. Cancelling must always be easy. A buyer who cancels before dispatch costs me less than an RTO.
- Plain words. Short sentences. No hype.

**Step 1: Get my details.** Read what I filled in at the bottom. If anything marked "needed" is missing, ask me for it in one short list and wait. Do not guess.

**Step 2: Write the messages.** Write these three messages in each language I chose:

1. **Order confirmation:** sent right after a COD order. Confirms what they ordered, the amount to pay on delivery, and the delivery address. Quick-reply buttons: "Confirm order", "Change address", "Cancel order".
2. **Pay-now nudge:** offers the switch from COD to prepaid via UPI or a payment link. Only use an incentive I gave you. If I gave none, write it without one and give the buyer a plain, true reason (for example, no need to keep cash ready). Never promise faster delivery or anything else I didn't confirm.
3. **No-reply follow-up:** sent once if they haven't replied after the time I set. Friendly, short, same three buttons.

Rules for writing:
- Write each one as a WhatsApp template. Use numbered variables like {{1}}, {{2}} and list what each one is (name, order number, amount, product, address, payment link).
- Put the brand name, order number and exact amount near the top of every message. Buyers who are wary of scams check these before tapping anything.
- Never write a real-looking link. Use a variable for the payment link and tell me it must come from my own payment gateway.
- Keep each message short enough to read on a phone lock screen preview. Give the character count of the body.
- Hindi is written in Devanagari and Hinglish in Roman script, the way people actually type on WhatsApp, not translated word for word. Add a note that a native speaker on my team should read the Hindi before I submit it.
- Under each message, write the template category it is most likely to be (utility or marketing) and why, marked [CHECK: Meta decides the category when it reviews the template; a message with an offer or discount may be classed as marketing]. Flag any line that might push a confirmation message into a pricier category.

**Step 3: Eight COD buyers, each alone.** Show each message to these eight buyers, one at a time. Each buyer answers on their own and never sees the others' answers, so nobody goes easy.

1. **First-time COD buyer:** never bought from this brand. Chose COD because they don't trust paying a new website upfront.
2. **Second-thoughts buyer:** ordered on impulse from an Instagram ad last night. Now wondering if they need it.
3. **Hindi-first buyer:** in a tier 2 or tier 3 town. Reads English slowly and skips long messages.
4. **Scam-wary buyer:** older, has been warned about fake payment links on WhatsApp. Suspicious of any link or anything that asks for money.
5. **UPI-every-day buyer:** pays everything by UPI but picked COD "just in case". Could switch easily if given a good reason.
6. **Ordered-for-someone-else buyer:** ordered for a parent or sibling at a different address. The person receiving it may not know about the order.
7. **Busy buyer:** gets 200 WhatsApp messages a day, mutes business chats, reads only the first line.
8. **Serial canceller:** often orders on COD at several stores and decides at the door. Has refused deliveries before.

For each buyer and each message, write:
- **Decision:** Confirm / Switch to prepaid / Cancel / Ignore (no reply).
- **Because:** one sentence, in their own voice.
- **The line that decided it:** quote it from the message.
- **Would change their mind if:** the one change that would get a better outcome.

**Step 4: The verdict.** Show a table: buyers down the side, the three messages across the top, decisions in the cells. Then:
- List the problems that two or more buyers hit, ordered by how many confirmations or prepaid switches each one likely costs.
- Rewrite all three messages as version 2, fixing those problems. Keep my brand's tone.
- Run version 2 only past the buyers who cancelled or ignored version 1, and show their new decisions. Be honest if a buyer still says no. Some COD buyers won't be won by any message.

**Step 5: The cost sheet.** Ask me to paste the current WhatsApp Business API rates for India from Meta's official pricing page. I need the rate for each template category I'm using, the currency, and the date I checked. Also ask for my provider's (BSP's) fee per message, if they charge one. Wait for these. Do not fill in any rate yourself. If I can't find a number, leave it as [CHECK: ...].

Also ask me to check on Meta's pricing page whether any of these messages are free in some cases (for example, when the buyer has messaged me first). Do not tell me the rule from memory. Put it in the sheet as [CHECK: ...] until I confirm it.

Then build the sheet two ways: a Markdown table I can read, and a CSV block I can paste into Google Sheets with working formulas. Use these columns:
- A: Message
- B: Template category
- C: Meta rate per message (₹)
- D: BSP fee per message (₹)
- E: Share of COD orders that get this message (%). Confirmation is 100%. For the nudge and follow-up, use my estimate and label it MY ESTIMATE.
- F: COD orders per month
- G: Monthly cost (₹) = (C + D) × E × F

Add a total row. Below it, add an RTO block using my numbers only:
- Cost of one RTO (₹) = forward shipping + return shipping + packaging + any other cost I list
- Break-even = total monthly message cost ÷ cost of one RTO. This is how many RTOs per month the messages need to prevent to pay for themselves.

Do not predict how many RTOs the messages will prevent. If you show a worked example, label every number in it EXAMPLE and keep it separate from my real sheet.

**Step 6: Before I go live.** Give me a short checklist covering:
- Templates need Meta approval before sending. Submit them through my provider.
- Buyers must have opted in to WhatsApp messages from my store. [CHECK: where my checkout collects this opt-in]
- Check which category Meta actually assigned, and update the cost sheet if it differs.
- Send each message to my own phone first and tap every button.
- Have a native speaker read the Hindi and Hinglish versions.
- Use payment links from my own gateway only, and make sure the amount matches the order.
- Decide who on my team handles "Change address" and "Cancel order" replies, and how fast.
- After two weeks, compare my real confirmation, prepaid and RTO numbers with the month before. Only real numbers tell me whether this works.

**Here are my details:**

- Brand name (needed): [ ]
- What I sell, in one line (needed): [ ]
- Average order value in ₹ (needed): [ ]
- COD orders per month (needed): [ ]
- Current RTO rate on COD orders, if I know it: [ ] (write "don't know" if not)
- Languages (needed): English / Hindi / Hinglish (choose one or more)
- Tone: friendly / formal / playful (pick one)
- Usual delivery time: [ ]
- Prepaid incentive I actually offer, if any (example: ₹X off or free shipping on prepaid): [ ] (write "none" if none)
- Hours to wait before the no-reply follow-up: [ ]
- My WhatsApp API provider (BSP): [ ]
- One message I send today, if I have one: [PASTE HERE]
- Cost of one RTO, broken down if I know it: [ ]
