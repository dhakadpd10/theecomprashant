# Dispatch Day Sheet

Paste everything below the line into Claude. Then fill in the two spaces at the bottom: your courier pickup times, and today's Shopify orders export (Shopify Admin → Orders → filter to Unfulfilled → Export → CSV). You can paste the CSV text or attach the file. Claude gives you three tables, and each one pastes straight into its own tab of a blank Google Sheet: Pick List, Packing Order and Flags.

---

You are preparing today's dispatch sheet for a small D2C store. I will give you my Shopify orders export and my courier pickup times. Your job is to turn them into three things my packing team can work from: a pick list, a packing order and a list of problem orders.

You do not book couriers, print labels, check stock or contact customers. Do not say or suggest that you did any of these.

**Ground rules**
- Use only what is in my export and what I tell you. Never invent orders, SKUs, sizes, pin codes, addresses, couriers or times.
- If something is missing or unclear, write [CHECK: what to check] in that cell and keep going. Never fill the gap with a guess.
- Every unit in the export must show up exactly once in the pick list. If your totals don't match, say so at the top. Do not hide the difference.
- Treat customer details as private. In your tables, show only the order number, the customer's first name, the city and the pin code. Show a phone number only as its last 4 digits, and only where it is needed to explain a duplicate flag. Never repeat full emails or full phone numbers.
- If the export is too long to process completely, stop and tell me how many orders you got through. Ask me to paste the rest in parts. Never cut it short without saying.

**Step 1: Read the export properly.**
Shopify puts one row per line item. An order with 3 products has 3 rows. The order-level fields (email, address, pin code, payment method, shipping method, notes) are usually filled in only on the first row of each order. Group the rows by the order number in the "Name" column (for example #1042) before you do anything else.

Then report:
- Total orders, total line items, total units (the sum of "Lineitem quantity").
- Which columns you found and used. Look for: Name, Financial Status, Fulfillment Status, Cancelled at, Lineitem name, Lineitem sku, Lineitem quantity, Shipping Name, Shipping Address1, Shipping Address2, Shipping City, Shipping Zip, Shipping Province, Shipping Phone, Payment Method, Shipping Method, Tags, Notes, Created at.
- Any of those columns that are missing.

**Step 2: Decide what ships today.**
Include only orders that are unfulfilled or partially fulfilled, not cancelled and not refunded. List the orders you left out and the reason for each, in one short line per order. If an order's status is unclear, keep it in and flag it [CHECK: status].

**Step 3: Pick list (grouped by SKU and size).**
Find the size or variant in "Lineitem name". It usually comes after the last " - ", for example "Cotton Kurta - Pink / M". If there is no SKU, use the product name and flag it [CHECK: no SKU]. If you can't tell the size, write [CHECK: size].

Columns: SKU | Product | Size / Variant | Total units | No. of orders | Order numbers

Sort by SKU, then by size in a sensible order (XS, S, M, L, XL, XXL, or ascending numbers). Add a totals row at the bottom. The total units here must equal the total units for the orders shipping today.

**Step 4: Packing order (sorted by courier pickup time).**
Use the courier pickup times and the courier rules I gave below. To match each order to a courier, use the "Shipping Method" column or my rules (for example, "COD goes with Delhivery"). If you can't tell which courier an order goes with, put it in a group at the end called [CHECK: courier] and don't guess.

Columns: Pack # | Order | Courier | Pickup time | Items (SKU × qty) | Payment (COD / Prepaid) | City | Pin code | Flag

Sort order:
1. Earliest pickup time first.
2. Within the same pickup, orders with no flags first, so the team packs what can definitely go.
3. Then by order date, oldest first.

Orders with a flag still get a row, but write "HOLD: see Flags" in the Flag column so nobody packs them until they are checked.

**Step 5: Flags.**
Check every order for these problems. One row per problem, so one order can have several rows.

- **Possible duplicate:** two or more orders with the same phone number, email or shipping address and the same or very similar items, placed within 48 hours of each other. COD double orders are common. Flag both orders. Never decide for me which one is the real one.
- **Missing or bad pin code:** blank, not exactly 6 digits, starts with 0, or has letters or spaces in it. If a pin code looks valid but doesn't seem to fit the city or state, flag it [CHECK: pin code vs city]. Say that you can't confirm it, because you don't have a pin code database.
- **Half address:**
  - no house, flat, plot or building number
  - Address1 is a single word or under about 15 characters
  - the address is only a landmark ("near temple")
  - city or state is missing
  - the phone number is missing or isn't 10 digits once the country code is removed
- **Other things worth a look:** a note from the customer (copy it word for word), a high risk level if that column exists, a very large quantity of one item, or an order that is partially fulfilled already.

Columns: Order | Flag type | What's wrong (quote the exact field) | Suggested fix

The suggested fix should be a practical next step: "Call or WhatsApp the customer to confirm house number", "Confirm with customer which order to keep", "Fix the pin code in Shopify before booking". Do not change or "correct" any data yourself.

**Step 6: Address check message.**
Write one short, polite WhatsApp message I can send to customers with a half address or bad pin code. It should ask them to confirm their full address and pin code before the order ships. Keep it under 40 words, friendly, and in plain English that is easy to read. Put [Order number] and [Name] where they go, and do not fill them in.

**Step 7: Summary and sheet-ready output.**
Start your answer with a 5-line summary:
- orders shipping today
- units to pick
- orders on hold with a flag
- orders with no courier match
- whether the unit totals match the export (yes / no, and by how much)

Then give each of the three tables (Pick List, Packing Order, Flags) twice:
1. As a normal table I can read here.
2. As a tab-separated block inside a code block, with the header row first. I will paste it into cell A1 of a blank Google Sheet tab named "Pick List", "Packing Order" or "Flags".

Plain words. No extra commentary beyond what is asked.

**My courier pickup times and rules:**
[PASTE HERE, for example: Delhivery pickup 4:00 PM, Shiprocket pickup 6:00 PM. COD orders go with Delhivery, prepaid orders go with Shiprocket. If you have one courier, write just that.]

**My Shopify orders export:**
[PASTE THE CSV TEXT HERE OR ATTACH THE FILE]
