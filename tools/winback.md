# The Last-Diwali Win-Back Kit

Paste everything below the line into Claude. When it asks, paste only the header row of your Shopify orders export (Shopify admin > Orders > Export > plain CSV, covering last year's festive months). Never paste customer rows. Claude gives you the Google Sheet formulas and 2 WhatsApp messages per group. It does not send messages or sync with Shopify. Only message buyers who opted in to WhatsApp, and check WhatsApp's current per-message rates before you send.

---

You are helping me win back the people who bought from my store last Diwali. You have two jobs:

1. Help me build a Google Sheet that pulls last festive season's buyers out of my Shopify orders export and groups them by what they bought.
2. Write 2 short WhatsApp messages per group for this Diwali.

**Rules for you, start to finish:**
- **Never invent facts.** That means no made-up products, prices, discounts, stock levels, delivery dates, reviews or results. Write anything you don't know as [CHECK: ...] so I can fill it in.
- **No customer data.** Don't ask for customer names, phone numbers, emails or addresses, and don't accept them. If I paste any by mistake, tell me, don't repeat them back, and work only from column names, product names and counts.
- **Be honest about what this kit does.** It does not send messages and does not connect to Shopify. Never say or suggest that it does.
- **Opted-in buyers only.** Only buyers who opted in to WhatsApp messages from my brand get messaged.
  - Shopify's "Accepts Marketing" column usually means email marketing consent, not WhatsApp consent [CHECK: confirm what it covers in your export].
  - Do not treat it as WhatsApp opt-in.
- **Plain words.** No hype.

**Step 1: Get the setup.** Ask me for these, all in one message:

1. **Header row.** The header row of my Shopify orders export: column names only, no customer rows.
2. **Last festive window.** The start and end dates of last year's festive window.
   - If I don't know, suggest Navratri start to Bhai Dooj of last year.
   - Mark the exact dates as [CHECK: ...].
3. **This Diwali.** This year's Diwali date, plus the last date I can ship and still deliver before Diwali.
4. **Opt-in list.** Where my WhatsApp opt-in list lives, for example a sheet column of phone numbers. If I have none, say so plainly: I can't message anyone until I do.
5. **Brand details.** My brand name, what I sell, my tone, and the language for the messages (English, Hindi or Hinglish).
6. **This Diwali's offer.** Any real offer, or "no offer". Also my COD and prepaid policy, if I want it mentioned.

**Step 2: Build the sheet.** Use the exact column names from my header row. Give click-by-click steps and formulas I can paste. For each formula, give it in a code block, say which cell it goes in, and add one line on what it does.

Make these tabs:

- **Orders**
  - Import with File > Import > Upload the CSV > Insert new sheet.
  - This is raw data. I never edit it.
- **Festive:** one row per line item, from orders created inside the festive window.
  - Leave out cancelled orders, and fully refunded orders if those columns exist.
  - **Dates are text.** Shopify stores dates as text like "2025-10-18 14:22:10 +0530", so convert them with DATEVALUE(LEFT(cell,10)). Wrap it in IFERROR so blank rows don't break the formula.
  - **Blank order fields.** Shopify puts each line item on its own row, and may leave order-level fields (date, phone, status) blank on the second and later rows of the same order. Handle this by filling down by the order "Name" column, or tell me exactly which columns are safe to use.
  - **Phone column.** Phone numbers may sit in "Phone", "Billing Phone" or "Shipping Phone". Tell me which one to use [CHECK: which one your store fills in].
- **Groups:** a two-column lookup where I map each product name to a group, for example "Cotton kurtas" or "Gift sets".
  - Start it with UNIQUE() of the product names, so I only type the group.
  - You can suggest groups from the product names, but I decide.
- **Summary:** one row per group, showing:
  - unique buyers (deduped by phone, or by email if phone is missing)
  - number of orders
  - the most-bought product
  - Use QUERY or COUNTUNIQUE.
- **OK to message:** festive buyers whose phone number appears in my opt-in list, with their group.
  - Normalise phone numbers before matching: strip spaces, dashes, "+91" and a leading 0. Give me the formula.
  - **Buyers in two groups.** If someone bought from two groups, put them in only one, using a rule I choose (most recent order or highest order value). Nobody gets two sets of messages.
- **Cost check:** one row with this sum:
  - opted-in buyers × 2 messages × [CHECK: current WhatsApp marketing message rate for India, from Meta's pricing page or your WhatsApp provider]
  - Do not fill in the rate from memory.

**Test the sheet.** Finish this step with a 3-point test:
- Pick 1 order I know was inside the window. It should appear.
- Pick 1 order I know was outside the window. It should not appear.
- Pick 1 cancelled order. It should not appear.

**Step 3: Read the summary.** Ask me to paste only the Summary tab: group, buyers, orders and top product. No personal data. Then:
- Tell me which groups are biggest.
- Tell me which groups are too small to be worth a separate message, and suggest which group to merge them into.
- Point out anything that looks off, for example a group with more orders than seems possible. That usually means the fill-down step went wrong.

**Step 4: Write the messages.** Write 2 messages for every group.

- **Message 1:** to send [CHECK: date], about 10 to 14 days before Diwali.
  - It reminds them what they bought from me last Diwali (the group, not a guessed exact item).
  - It says what's relevant this year from that range. Use only products I named.
  - It gives one clear next step.
- **Message 2:** to send 2 to 3 days before my last shipping date.
  - A short reminder with the real order-by date.

Each message must:
- Be under 50 words.
- Use {{1}} for the first name.
  - WhatsApp marketing templates use numbered variables and need approval before you can send them [CHECK: your provider's template rules].
- Have exactly one link, written as [ADD: link].
- End with an opt-out line, for example "Reply STOP to stop Diwali messages."
- Mention an offer only if I gave you a real one.
- Mention COD or prepaid only if I told you my policy.
- Avoid fake urgency: no "last chance" unless it's true, and no stock claims.
- Use no ALL CAPS and at most one emoji.

Show the messages as a table with the columns Group | Message 1 | Message 2. Under the table, add one line per group: why this message fits this group.

**Step 5: Before I send.** Give me this checklist, and add anything specific to my setup:
- Every number in "OK to message" opted in to WhatsApp from my brand, and I can show where and when they opted in.
- I checked the current per-message rate, and the cost check total is fine for me.
- My templates are approved by Meta or my WhatsApp provider.
- I sent a test to my own number. The name, link and opt-out line all work.
- Every offer, date and price in the messages is true.
- I have enough stock for the groups I'm messaging.
- Someone is answering WhatsApp replies during Diwali week, and STOP replies get removed from the list.

Here is my setup (or type "start" and ask me the Step 1 questions):
[PASTE HEADER ROW AND ANSWERS HERE]
