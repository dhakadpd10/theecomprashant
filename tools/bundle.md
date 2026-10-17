# The Bundle Builder

Paste everything below the line into Claude, then paste your product list where it says: name, selling price and cost per unit for each product. If you have an order export (Shopify, WooCommerce, Dukaan or a sheet), paste it too, but delete customer names, phone numbers, emails and addresses first. Works for any online store.

---

You are building product bundles for my online store. Your job is to find 3 bundles that raise my order value without hurting my margin. Then you test them on 10 simulated shoppers and give me a plan to test the winner on real customers.

**Rules for the whole task:**
- Use only the numbers and facts I give you. Never invent prices, costs, sales numbers, reviews, ratings, stock levels or customer details.
- If something you need is missing, mark it as [CHECK: what you need] and continue with a clearly labelled assumption.
- Every margin you show is an example worked out from my numbers and your stated assumptions. It is not a promise. Label it "Example margin" every time.
- The 10 shoppers in Step 4 are a simulation. They are not real customers, and their picks are not data.
- If my order export still contains names, phone numbers, emails or addresses, do not repeat them anywhere. Work only with products, quantities, prices and dates.
- Don't write claims I can't back up, like "bestseller", "limited stock", "loved by 10,000 customers" or delivery promises, unless my data shows they are true.

**Step 0: Ask once, then go.** Before you start, check whether I've given you these. List the missing ones in one short message and ask me for them. If I reply "go ahead", continue with a sensible assumption for each one, marked [CHECK: ...].
- Are my selling prices GST-inclusive? What GST rate applies to each product?
- Packaging cost per box (box, filler, tape, gift wrap if any).
- Shipping cost per order. Do I offer free shipping above a certain order value?
- Payment gateway fee (%), COD charge per order, and roughly what share of my orders are COD.
- My COD return (RTO) rate, if I know it.
- Stock levels, if I want a bundle that moves slow stock.

**Step 1: Read my products.** Make a table with these columns: product, selling price, cost per unit, and stock if I gave it. Flag anything that looks wrong, like a cost higher than the price or a missing cost, as [CHECK: ...]. Don't fix it yourself.

**Step 2: Read my orders (only if I gave you an export).** Find:
- The product pairs most often bought in the same order, with counts.
- My average order value and average items per order. Show how you worked them out.
- What repeat customers buy on their second order, if the export shows repeat buyers.
- Any months or dates where orders jump (Diwali, Rakhi, Valentine's, end-of-season sale).

If the export has fewer than about 50 orders, say clearly that the patterns are weak. If I gave no export, say that the bundles are based on product logic only and haven't been checked against how my customers actually buy.

**Step 3: Build 3 bundles.** Each bundle does a different job:
- **Bundle A: for new gift buyers.** Easy to understand, looks good as a gift, a price that's easy to say yes to.
- **Bundle B: for past buyers, to get a second order.** A refill, a "complete the set", an upgrade, or the thing that goes with what they already bought.
- **Bundle C: your best third idea from my data.** A bigger premium box, a festival box, or a box that moves slow stock (only if I gave stock numbers). Say why you chose it.

For each bundle, give me:
1. **Name:** a short, giftable name that's easy to say out loud and fits my brand. Add one line describing the box.
2. **What's inside:** products and quantities.
3. **Who to offer it to:** new gift buyers or past buyers for a second order. Say where to show it: product page, cart, WhatsApp or email after delivery.
4. **Price:** what the items cost bought separately, the suggested bundle price, and the discount in ₹ and %.
5. **Example margin per box:** show the maths line by line:
   - Bundle price
   - minus GST (if my prices include it)
   - minus product costs
   - minus packaging
   - minus shipping
   - minus payment gateway or COD fee
   - = Example margin in ₹ and as % of the bundle price.

   Then show the example margin on a typical single-item order of my best-selling product, worked out the same way, so I can see whether the bundle earns more per order in ₹.
6. **Why it should work:** one sentence pointing at my order data, or at product logic if there's no data. Say which it is.
7. **The risk:** one line. For example, it eats into full-price sales, it uses up stock of a fast seller, or it's heavier and costs more to ship.

Pricing rules:
- Keep the discount small enough that the example margin per box, in ₹, is higher than on a single-item order. If no discount does that, say so plainly and suggest a smaller bundle or a free add-on instead of a price cut.
- Never suggest a price below the full cost of the box.
- Use price points Indian shoppers are used to (₹499, ₹999, ₹1,499), but show the exact maths behind the rounding.
- If I have a free-shipping threshold, say whether each bundle crosses it.
- Remember that orders returned under COD cost me shipping both ways. If I gave you my RTO rate, show what it does to the example margin. If not, add [CHECK: RTO rate].

**Step 4: 10 shoppers pick one.** Read the three bundles ten times, each time as one of these people. Each shopper answers alone and never sees the others' answers. Any shopper can pick "none" if nothing fits.

1. **Diwali gift buyer (new):** fixed budget, wants it to look premium the moment the box is opened.
2. **Last-minute birthday buyer (new):** needs it in 3 days. Cares about delivery and gift wrap.
3. **Bargain hunter (new):** checks whether the same items are cheaper on Amazon, Flipkart or Meesho.
4. **Meta ad clicker (new):** never heard of the brand. Is a bundle too big a first risk?
5. **COD-only buyer (new):** won't pay upfront to a brand they don't know. Worried about getting stuck with something they don't want.
6. **Happy repeat buyer (past):** loved one product. Wants more of it, or the thing that goes with it.
7. **Lukewarm past buyer (past):** first order was fine, not great. Needs a reason to come back.
8. **Corporate or bulk gifter (new):** wants 10 to 20 boxes for a team or for clients. Asks about GST invoices and bulk pricing.
9. **Self-buyer (new or past):** buying for themselves. Only cares about value and use.
10. **Phone scroller (new):** half-distracted. Picks whatever is easiest to understand in five seconds.

For each shopper, write:
- **Type:** new gift buyer, past buyer, or self-buyer.
- **Picks:** A, B, C or none.
- **Because:** one sentence, in their own voice.
- **What nearly stopped me:** one thing.
- **Would pick it faster if:** one change.

**Step 5: The verdict.**
- A table: shopper, type, pick.
- The winner, with its count. Then the best bundle for new gift buyers and the best for past buyers, if they are different.
- The objections more than one shopper raised, and a fix for each.
- Repeat this clearly: these picks are a simulation. They help you choose what to test first. They don't tell you what real customers will buy.

**Step 6: Test the winner on real traffic.** Give me a simple plan:
- **Where to show it:** for example, the product page of my best seller, the cart, or a WhatsApp or email message to past buyers.
- **How long:** run it until it has a fair number of orders. With low traffic, that may take 2 to 4 weeks. Don't change anything else on the page during the test.
- **What to measure:** bundle orders ÷ total orders, average order value before vs during the test, margin per order, and returns or RTO on bundle orders compared with normal orders.
- **Keep or drop:** keep the bundle if both average order value and margin per order go up. Drop or change it if margin per order falls, even if order value rises.

Then write the copy, ready to use:
- **Product page bundle block:** a headline and two short lines.
- **WhatsApp message to past buyers:** under 60 words, friendly, not pushy. End with an easy opt-out line, like "Reply STOP if you'd rather not hear from us."
- Mark anything I need to fill in as [CHECK: ...]. For example: delivery days, gift wrap, return policy for bundles.

**Finish with:** a short list of every [CHECK: ...] item in one place, so I can fill them in before anything goes live.

Plain words. Rupees for money. No hype.

Here is my product list (name, selling price, cost per unit, stock if you have it):
[PASTE PRODUCT LIST HERE]

My order export (optional; delete names, phones, emails and addresses first):
[PASTE ORDER EXPORT HERE, OR WRITE "NONE"]

Anything else I should know (GST, packaging, shipping, COD share, free-shipping threshold, festival coming up):
[PASTE DETAILS HERE, OR LEAVE BLANK]
