# Sidekick Checkout Prompts

Paste everything below the line into Claude, then fill in your store details at the bottom. Claude will write 8 prompts for you to paste into Shopify Sidekick (the AI assistant inside your Shopify admin), plus a test-order checklist. First check that Sidekick appears in your admin and that it can edit checkout and cart settings on your plan. If it can't, each prompt comes with a manual fallback to check.

---

You are helping me improve my Shopify checkout for Indian shoppers using Shopify Sidekick, the AI assistant inside the Shopify admin. You will write 8 prompts that I paste into Sidekick one at a time, plus a 5-step test-order checklist I run before anything goes live.

**Ground rules (follow these in everything you write):**
- Never invent facts about my store. That includes delivery dates, courier cutoffs, COD fees, prepaid discounts, return windows, certifications, review counts or "100% secure" type claims. If you need a fact I haven't given you, write [CHECK: what I need to confirm] and carry on.
- You don't know exactly what Sidekick can change on my store. What it can do depends on my Shopify plan, my region, my theme and Shopify's current features. Don't tell me a change is possible. Where you're unsure, write [CHECK: ...].
- Every Sidekick prompt must ask Sidekick to first explain what it will change and where, then wait for my yes before applying anything.
- Every Sidekick prompt must also say: do not change prices, taxes, shipping rates, payment providers, inventory or discounts unless this prompt asks for it. Only change the text or field described.
- Where a change touches the theme, ask Sidekick to make it on a duplicate or unpublished theme first, if that's possible.
- Customer-facing lines must be short and readable on a phone with one thumb. Use plain words and no fake urgency. Use Hinglish or Hindi only if I ask for it.

**Step 1: Get my facts.** Read my store details at the bottom. If anything on this list is missing, ask me for it in one short list before writing the prompts:
1. Shopify plan, and whether Sidekick shows up in my admin.
2. Payment methods I offer: COD (yes/no), any COD fee, my UPI or payment gateway name, any real prepaid offer.
3. Couriers or shipping app I use, and my real Diwali order-by date for delivery before Diwali, if I know it.
4. Whether I offer gift wrap or gift messages, and who packs the orders.
5. Trust facts that are actually true: return or exchange window, payment provider, GST registered, years in business, real review rating and count, and where those reviews live.

If I say "I don't know" to any of these, use [CHECK: ...] in that spot. Don't stop.

**Step 2: Write the 8 Sidekick prompts.** For each one, give me:
- **What it does:** one line.
- **Paste into Sidekick:** the exact prompt, in a code block, written for my store using my facts.
- **Where the shopper sees it:** cart page, checkout, payment step or order confirmation. Mark it [CHECK] if that depends on my plan or theme.
- **If Sidekick can't do it:** the manual route in Shopify admin, marked [CHECK: confirm this path in your admin], or a simpler alternative such as putting it on the cart page instead of checkout.
- **Watch out:** one honest risk or limit.

The 8 prompts:
1. **Capability check (no changes).** Ask Sidekick to list what it can and cannot edit on my store's cart, checkout, payment instructions and order confirmation on my current plan. It must not make any changes. I'll run this first and share the answer with you if I need the other prompts adjusted.
2. **Gift message field.** Add an optional "Gift message" box, ideally on the cart page or checkout, with a character limit. Make sure the message reaches the order in my admin and, if possible, the packing slip, so the packing team actually sees it.
3. **Landmark line in the address.** Help the shopper add a landmark, for example by relabelling or adding hint text to the second address line ("Apartment, landmark, near..."). Indian couriers rely on landmarks. The shopper must still be able to check out without filling it in.
4. **COD note.** Add a short note on the cash on delivery option: what to keep ready, any COD fee (only if I gave you one), and that the order may get a confirmation call or message, only if that's true for my store.
5. **Pay by UPI nudge.** Add a short line encouraging prepaid or UPI payment. Mention a prepaid discount or faster dispatch only if I've confirmed it's real. Otherwise use a neutral reason ("UPI is quick and you skip handing over cash at the door").
6. **Diwali delivery-date line.** Add a line such as "Order by [ADD date] for delivery before Diwali to most pincodes." Use only the date I give you. If I haven't given one, write [CHECK: confirm cutoff with your courier]. Also tell me the date I should remove or update this line.
7. **Trust badges.** Show only badges and lines that are true for my store, such as secure payment via my named provider, my real return window, or my real rating. No made-up seals or certifications. If checkout badges aren't possible on my plan, suggest the cart page or product page instead.
8. **Review and undo.** Ask Sidekick to list every change it made in this session, where each one lives, and the exact steps to undo each one. I'll save this list.

**Step 3: The 5-step test-order checklist.** Write a checklist for my store, using my real payment methods, with these 5 steps:
1. **Preview on a phone:** check each change on the duplicate theme or in preview on a real phone, on mobile data.
2. **Prepaid test order:** place one with a gift message and a landmark filled in, using Shopify's test mode or test gateway [CHECK: how to enable this on your payment provider]. Confirm both show up in the order in admin, on the packing slip, and in what my shipping app or courier receives.
3. **COD test order:** place one if I offer COD. Check that the COD note shows, any fee is correct, and the order is marked correctly in admin.
4. **Confirmation check:** check the order confirmation email or message. Make sure the Diwali line and trust lines are still true, including for a far-away pincode.
5. **Clean up, then publish:** cancel and refund the test orders, restock any inventory they used, turn test mode off, then publish. Put a reminder in the calendar for the day the Diwali line comes down.

**Step 4: Claim check.** Finally, list every customer-facing line you wrote in one table with 3 columns: the line, where it appears, and "needs proof?" (yes or no). Mark yes for any line that makes a promise about dates, money, security or reviews, so I can confirm each one before it goes live.

Plain words. No hype. Keep my brand's voice if I describe it.

Here is my store:
- Store name and what I sell: [ADD]
- Shopify plan, and does Sidekick show in my admin?: [ADD]
- Payment methods (COD? fee? UPI gateway? real prepaid offer?): [ADD]
- Couriers or shipping app, and Diwali order-by date if known: [ADD]
- Gift wrap or gift messages offered? Who packs?: [ADD]
- True trust facts (returns, payment provider, GST, real rating and count): [ADD]
- Language for checkout lines (English / Hinglish / Hindi): [ADD]
