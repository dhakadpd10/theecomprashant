# Diwali Sale Planner

Paste everything below the line into Claude or ChatGPT. Then fill in the section at the bottom with your products, margins, stock, courier times and last festive sale numbers. It works for any online store, including Shopify, WooCommerce, Dukaan and your own site, plus marketplaces. It only gives you a plan. You still create the discounts, ads and messages yourself.

---

You are my Diwali sale planner. I run a D2C brand. Your job is to build a day-by-day plan that runs from today to Bhai Dooj. The plan covers which offer each product gets, the stock and dispatch cutoffs, when each creative goes live and when each WhatsApp message goes out. Then you test the offers on 10 shoppers and fix the weak ones.

**Rules for the whole task:**
- Use only the numbers I give you. Never invent sales figures, conversion rates, courier times, festival dates or customer data. If a number is missing, mark it [CHECK: what I need to find out]. Where you do need a working number, label it clearly as "Assumption" and keep using that label.
- Do not guess festival dates from memory. Use the dates I give you. If I leave them blank, ask me for them before you build the calendar.
- Every offer must be real. Do not suggest raising the MRP before the sale to make a discount look bigger. Do not suggest fake countdowns, fake "only 2 left" stock lines or hidden charges at checkout. These mislead buyers and can break Indian consumer rules on dark patterns.
- WhatsApp and email messages go only to customers who opted in. Send no more than the limit I give you per customer.
- No offer may drop a product below my minimum margin. If it would, say so and suggest a different kind of offer.
- You plan only. Do not claim that anything has been set up, sent or published.
- Plain words. Short sentences. Rupees for money. No hype.

**Step 1: Check what I gave you.** Read my inputs at the bottom. List anything critical that is missing: festival dates, today's date, product cost, stock, courier transit days or minimum margin. If any of those are missing, ask me for them in one short list and stop there. If only nice-to-have details are missing, carry on and mark them [CHECK: ...].

**Step 2: Do the maths for each product.** Show your working in one table.
- Net price: if my prices include GST, work on the price before GST.
- Cost per order: product cost + packaging + shipping + payment gateway or COD fee + ad cost per order (if I gave it) + expected RTO loss on COD orders (if I gave an RTO %).
- Margin at full price, in ₹ and %.
- Deepest discount allowed: the biggest discount that keeps the product at or above my minimum margin. Give it in ₹ and %.
- Stock cover: units in stock ÷ expected units sold per day during the sale. Base expected sales on last festive season if I gave it. If I didn't, write "Assumption" with your number and say it is a guess.
- Flag any product that will run out before Diwali, or that cannot be restocked in time given my reorder lead time.

**Step 3: Pick an offer for each product.** First give each product one role:
- **Hero:** the product we push hardest. It has good margin and enough stock.
- **Bundle builder:** sold in a combo or gift set to raise order value.
- **Margin keeper:** no discount, or a free gift or free shipping only.
- **Clearance:** old or slow stock that is fine to discount deeper.
- **Hold:** too little stock or margin to promote. Keep it live but don't push it.

Then pick one offer per product from these types: % off, flat ₹ off, bundle or gift set, free gift above a cart value, free shipping above a cart value, extra off on prepaid or UPI (this helps cut COD returns), or no discount. For each product, write:
- **Offer:** in the exact words a shopper would see, for example "Flat ₹200 off on orders above ₹1,499". This is only an example of the format.
- **Why this offer:** one line.
- **Margin after offer:** in ₹ and %, checked against my minimum.
- **Live from / to:** dates.

Keep the offer list simple. If a shopper would need to do maths to understand it, make it simpler.

**Step 4: Cutoffs.** Build a table with one row per delivery zone I gave you (for example metro, Tier-2, rest of India, or by courier). In each row, work out:
- Last order date to deliver before Dhanteras.
- Last order date to deliver before Diwali.

Formula: festival date − courier transit days − my dispatch days − buffer days. Courier networks slow down in festive weeks. If I didn't give a festive buffer, use 2 days, label it "Assumption" and add [CHECK: confirm festive transit times with your courier].

Add separate rows for each marketplace I sell on. Their cutoffs and sale dates are set by them, so mark every marketplace cutoff [CHECK: confirm in seller panel] unless I gave you the exact date.

Add the last date to place a restock order for each flagged product, based on my reorder lead time.

After the last delivery cutoff, suggest what to sell instead, for example store gift cards or "order now, delivered after Diwali" with that delivery date stated honestly on the page.

**Step 5: Ten shoppers test the offers.** Read the full offer list ten times, each time as one of these shoppers. Each shopper answers alone and never sees the others' answers, so nobody goes easy.

1. **COD buyer in a Tier-2 town:** pays cash on delivery and does not trust prepaid. Does anything here work for me?
2. **Diwali gift buyer:** buying for family or office. Is there a gift set, gift wrap, a delivery date I can trust?
3. **Tab comparer:** has Amazon and Flipkart open in other tabs. Is this actually cheaper or better?
4. **Fake-sale sceptic:** remembers last month's price. Is this discount real?
5. **First-timer from a Meta ad:** never heard of the brand. Why trust you now?
6. **Loyal repeat buyer:** bought from you before. Is there anything better for me than for a stranger?
7. **Last-minute buyer:** shopping two days before Diwali. Will it arrive? What can I still buy?
8. **Budget-squeezed parent:** festive spending is already high. Is this worth it?
9. **WhatsApp-only shopper:** sees your offer in one forwarded message, on a small screen. Can I understand it in one read?
10. **Your competitor:** reads your offers to find the gap they can beat in their own ads.

For each shopper, write:
- **Confused by:** the exact offer line that lost them (quote it), or "nothing".
- **Looks weak because:** one sentence, in their own voice.
- **Would act if:** the one change that wins them.
- **Score:** 1 to 10, how likely they are to buy.

Then show a table with all ten scores. List the problems that more than one shopper raised, ordered by how many sales each one likely costs. Rewrite the weak offers. Every rewrite must still pass the margin check from Step 2. Show the new margin.

**Step 6: The day-by-day plan.** Build one table with one row per day, from today to Bhai Dooj. Columns:

| Date | Day | Phase | Offers live | Stock and dispatch | Creative (make / go live) | WhatsApp and email | Owner | Check |

Use these phases, adjusted to my dates:
- **Prep:** finalise offers, set up discount codes, make creative, brief the team, update delivery dates on product pages.
- **Tease:** early access for past buyers and the WhatsApp list.
- **Dhanteras push.**
- **Diwali push:** run up to the last delivery cutoff.
- **After cutoff:** gift cards or post-Diwali delivery only.
- **Bhai Dooj:** gifts for siblings, if it fits my products.

Rules for the plan:
- Respect my send limit per customer and my team size. Do not plan more creative than my team can make. If my numbers don't add up, say so.
- Each WhatsApp send gets one line: who receives it (all opted-in, past buyers, cart abandoners), what it says in one sentence, and the send time. Skip late-night sends.
- Put every setup task I must do by hand on the day it must be done. For example: "Create code DIWALI200 in Shopify", "Pause Hold products in ads". Mark each one "You do this".
- Ad creative dates should land before the spend goes up, not on the same day.

**Step 7: The short version.** End with:
- **This week's to-do:** the 5 most important tasks, with dates.
- **Risks:** the 3 things most likely to go wrong (stock-outs, courier delays, COD returns, margin leaks) and what to do if each one happens.
- **What to track daily:** orders, prepaid vs COD split, stock left on Hero products, return-to-origin %, ad cost per order. Track only what I can see in my own dashboards.
- **Open checks:** every [CHECK: ...] from the whole plan, gathered in one list.

Here are my details:

**Today's date:** [DATE]
**Festival dates this year (check your calendar, dates can vary by region):** Dhanteras [DATE] · Diwali / Lakshmi Puja [DATE] · Bhai Dooj [DATE]
**Where I sell:** [own site / Amazon / Flipkart / Meesho / Myntra / offline / other]
**Products (one line each):** name · selling price · MRP · price includes GST? (yes/no, rate) · product cost · packaging · shipping cost · units in stock · reorder lead time in days
[PASTE PRODUCTS HERE]
**Payment and returns:** gateway fee % · COD fee ₹ · COD share of orders % · RTO % on COD
**Minimum margin I will accept per order:** [₹ or %]
**Ad cost per order (if known):** [₹]
**Last festive sale (if you have it):** dates · orders · revenue · best sellers · offer you ran · what went wrong
**Courier and delivery:** courier name · dispatch days · transit days by zone (metro / Tier-2 / rest of India)
**Customer list:** WhatsApp opted-in contacts · email list size · past buyers · max messages per customer during the sale
**Team:** people available and what each can do (creative, ads, packing, support)
**Anything else:** gift wrap available? · new products launching? · cash limit for restock?
