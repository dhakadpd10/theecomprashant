# The Bundle Builder

Paste everything below the line into Claude, then paste your order export where it says. In Shopify, go to Orders, then Export, and choose CSV. Other platforms (WooCommerce, Dukaan, marketplaces) have a similar export. Keep only the order id, product name, quantity, price and order status columns. Delete customer names, phone numbers, emails and addresses before you paste.

---

You are building product bundles for my online store from my real order history. Your job is to find which products my customers already buy together, suggest 3 bundles, and help me check the margin before I list anything. You do not create anything in my store. I will do that myself.

**Rules for the whole task**
- Use only the data I paste. Never invent orders, counts, prices, costs, customer reasons or results.
- Every number you show must come from my data or from a calculation you show. If you don't know something, write [CHECK: what I need to confirm].
- Don't promise that a bundle will raise sales or order value. Call your suggestions what they are: ideas to test.
- If the export contains customer names, phone numbers, emails or addresses, don't repeat them. Tell me to remove them next time.

**Step 1: Read the data.**
- Tell me which columns you found and what you think each one means. If the order id, product name or price column is unclear, ask me before going on.
- Many exports (Shopify included) put one row per product, so one order spans several rows. Group rows by order id.
- If there is a status column, leave out cancelled, refunded and returned or RTO orders. Tell me how many you removed. If there's no status column, write [CHECK: does this export include cancelled or returned orders?].
- Sizes and colours of the same product count as one product, unless I tell you otherwise. List the merges you made so I can correct them.
- If you can run code, use it to count. If you can't, and the data is too big to count accurately by hand, say so. Then work on a stated sample (for example, the first 300 orders) and label every number as coming from that sample.

**Step 2: Find what's already bought together.**
Show:
- Total orders, the number of orders with 2 or more different products, and that number as a % of all orders.
- Average order value, with the calculation.
- How many orders each product appears in, top 15.
- The top 10 product pairs. For each pair show:
  - the number of orders containing both;
  - the attach rate: of the orders with product A, the % that also had B, and the other way round.
- Any group of 3 products that appears together in 3 or more orders.

If fewer than 30 orders contain 2 or more products, warn me at the top. The pairs may be chance, so treat the bundles as guesses to test, not patterns.

**Step 3: Suggest 3 bundles.**
Aim for three different jobs, but only where the data supports each one. If it doesn't, say so and suggest something else.
1. **The natural pair:** built on the strongest pair from Step 2.
2. **The order-value bundle:** brings a typical order above my free-shipping or offer threshold [CHECK: your free-shipping threshold in ₹, if you have one].
3. **The best-seller plus slower mover:** pairs a top product with one that appears in fewer orders, if they have ever been bought together.

For each bundle, write:
- **Name:** short, plain, fits the products. No hype.
- **Products and quantities.**
- **Why:** the numbers from Step 2 that support it, for example "bought together in [X] orders, [Y]% attach rate".
- **Who it's for:** one line. Base it on the products, and say it's your read, not data.
- **Suggested price:**
  - the sum of the individual prices;
  - a bundle price with a 5% to 15% discount, rounded to a normal price point (for example ₹999 or ₹1,499);
  - the ₹ saving the customer sees.
- **The risk:** one line, for example "may pull sales from people who would have paid full price for both".

**Step 4: Check the margin. Don't skip this.**
Don't guess my costs. Give me this table to fill in for each product, with every cost marked [CHECK: ...]:

| Item | Cost per unit (₹) |
|---|---|
| Product cost (buying or making) | [CHECK] |
| Packaging | [CHECK] |

Then ask for these per-order costs:
- Shipping cost per order [CHECK]
- Payment gateway fee % [CHECK]
- COD charge per order, plus the share of my orders that are COD [CHECK]
- Allowance for returns and RTO, as a % of orders [CHECK]
- Marketplace commission %, if I'll list the bundle on Amazon, Flipkart or Meesho [CHECK]
- Whether my prices include GST, and the GST rate [CHECK]
- My minimum acceptable margin % [CHECK]

Once I give you the numbers, calculate for each bundle:
- Profit in ₹ and margin % at the bundle price.
- Profit if the same products were bought as separate orders at full price, with shipping charged once per order. Also show it with shipping charged once in total, since I can't tell from this data which one is more realistic.
- **List / Adjust / Drop:**
  - List if it clears my minimum margin.
  - Adjust if a smaller discount would make it clear. Give the lowest bundle price that does.
  - Drop if it doesn't clear even at full price.

If I haven't given costs yet, stop after Step 3, show the blank table, and wait.

**Step 5: Before I list.**
Give me a short checklist:
- Confirm stock of every product in each bundle, so a bundle doesn't sell out because one item ran out.
- Create the bundle myself, as a new product with its own SKU or through a bundle app. You can't do this for me.
- Check the "you save ₹X" claim against the real individual prices on the day I list.
- [CHECK: if you sell packaged goods in India, a combo pack may need its own MRP and label details; confirm with your CA or compliance person.]
- What to measure for 2 to 4 weeks:
  - bundle orders as a % of all orders;
  - average order value before and after;
  - margin per bundle order;
  - returns on bundle orders.
- Compare these against the numbers from Step 2, not against a target you invented.

Keep the whole reply plain. Short sentences, ₹ for money, tables where they help.

Here is my order export:
[PASTE YOUR ORDER EXPORT HERE]
