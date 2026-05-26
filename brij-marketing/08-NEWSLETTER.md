# 08 - NEWSLETTER: Brij Marketing

The newsletter is a long-form channel that always ties back to a campaign. Issue structure, cadence, capture spec, lifecycle, integration with campaigns, and drafted issue copy.

**Owner:** VD-Marketing
**Related files:** [02-STRATEGY.md](./02-STRATEGY.md), [04-CALENDAR.md](./04-CALENDAR.md), [05-CAMPAIGNS.md](./05-CAMPAIGNS.md), [06-CONTENT-LIBRARY.md](./06-CONTENT-LIBRARY.md)
**Last updated:** 2026-05-26

---

## What this is

402 Receipts is the Brij newsletter. It is a long-form companion to the X channel, not a separate brand.

The contract:

- **Every issue ties to at least one campaign in [05-CAMPAIGNS.md](./05-CAMPAIGNS.md).** Campaigns produce the X posts (the hook) and the newsletter (the depth). A campaign without a newsletter slot is incomplete.
- **Every issue links back to X.** Newsletter copy embeds links to the original X posts and the @brij_fi handle. The newsletter is how we turn subscribers into followers and repliers, not how we replace X with an isolated channel.
- **Long-form means long-form.** Issues are 600-1,200 words, with real context, real numbers when available, and at least one technical detail an operator could not get from a 280-character post. No 4-bullet "what shipped" emails.

## Cadence

- **Frequency:** monthly.
- **Send day:** first Wednesday of the month, AM. Calendar slot in [04-CALENDAR.md](./04-CALENDAR.md).
- **Issue 01:** 2026-06-17, gated on email list crossing ~500 subscribers. If the list is short, the slot becomes a teaser without a full issue drop and Issue 01 moves to the first Wednesday after the threshold is hit.

## Issue structure (every issue uses this)

Each issue has these sections, in this order. Word-count guides are floors, not ceilings.

1. **Lead - What shipped on Brij this month** (200-400 words)
   - The product, capability, or milestone delivered. Long-form expansion of the month's product X posts.
   - Always links back to the related X posts in [06-CONTENT-LIBRARY.md](./06-CONTENT-LIBRARY.md) via their live post URLs once posted.
   - Real numbers when production data is available. No invented receipts.

2. **Five things in agent payments worth knowing** (250-400 words)
   - Five short items covering: the x402 ecosystem, Solana agent infrastructure, framework updates (LangChain, CrewAI, Mastra, Vercel AI SDK, Letta, Eliza), payment standards work, and one builder we're watching.
   - Each item is 2-4 sentences with a source link.

3. **Build of the month** (150-250 words)
   - One builder using x402, Solana agent payments, or Brij itself. What they shipped, what's notable, where to find them.
   - This is also the social bridge: their X handle is linked, and if they're in [07-ENGAGEMENT.md](./07-ENGAGEMENT.md) Tier 2 or 3, the spotlight doubles as engagement bait.

4. **What we're working on next** (100-200 words)
   - 2-4 lines on the next campaign and product wedge.
   - Soft-CTA: builder use cases land at `hello@brij.fi` or as @brij_fi replies.

5. **Social close** (always present)
   - Three short lines:
     - Follow @brij_fi on X for the daily build (`https://x.com/brij_fi`)
     - Try the product: brij.fi and travel.brij.fi
     - Reply to this email with what you're building. We read every one.

### Subject line rules

- Subject leads with the issue payload, not "402 Receipts Issue N." Example: "Brij is live: what we shipped" not "402 Receipts: June 2026."
- 6-9 words. No emoji. No "newsletter."

### From and sender

- **From name:** Brij
- **Reply-to:** `hello@brij.fi` (or whatever inbox `[client]` confirms is monitored).

## Integration with campaigns

This is the spine. Newsletter and campaigns are the same plan.

For each campaign in [05-CAMPAIGNS.md](./05-CAMPAIGNS.md):

- The campaign declares a **Newsletter tie-in** field naming the issue and section that carries the long-form version.
- The X posts ship in the campaign week per [04-CALENDAR.md](./04-CALENDAR.md).
- The newsletter issue lands within 30 days of campaign start and includes:
  - Long-form expansion of the campaign in the relevant section (usually the Lead or Build of the Month).
  - Inline links to every X post in the campaign so subscribers can repost or reply.
  - The campaign's primary CTA (try the product, join the waitlist, submit to the bounty, etc.).

For each newsletter issue:

- Open the issue draft by listing the campaign(s) it ties to at the top of the file in [05-CAMPAIGNS.md](./05-CAMPAIGNS.md). If a section is not tied to a campaign, it's filler and gets cut.

## Capture spec (brief to VD-Dev)

Email is the asset we own. Followers are rented. Capture must be live on every Brij surface, with source tags so we know which surface converts.

### Form 1 - brij.fi homepage hero CTA

- **Placement:** above the fold, after the smart-wallet headline.
- **Fields:** email only.
- **Copy:** "Get notified when Wallet, On-Ramps, and Service Access ship to the public."
- **CTA button:** "Get the list"
- **Confirmation:** inline success state ("Thanks. We'll be in touch.")
- **Source tag:** `site_hero`

### Form 2 - brij.fi mid-page section CTAs

- **Placement:** bottom of each product section (Smart Wallet, On-Ramps, Service Access).
- **Fields:** email only.
- **Copy varies:**
  - Smart Wallet: "Notify me when Wallet APIs ship."
  - On-Ramps: "Notify me when On-Ramps go live."
  - Service Access: "Notify me when Service Access opens to builders."
- **CTA button:** "Notify me"
- **Source tag:** `site_smartwallet`, `site_onramps`, `site_serviceaccess`

### Form 3 - brij.fi footer

- **Placement:** footer.
- **Fields:** email only.
- **Copy:** "Get the monthly 402 Receipts newsletter."
- **CTA button:** "Subscribe"
- **Source tag:** `site_footer`

### Form 4 - travel.brij.fi post-booking capture

- **Placement:** the booking confirmation response.
- **Fields:** email only.
- **Copy:** "Get notified when more agent-ready services launch on Brij."
- **CTA button:** "Notify me"
- **Source tag:** `travel_postbooking`

This is the highest-intent surface we have. A user just transacted with an agent over crypto. They convert at 5-8x site-hero baseline.

### Form 5 - travel.brij.fi docs / endpoints

- **Placement:** inside the endpoints / Discovery section.
- **Fields:** email only.
- **Copy:** "Get the Platform API early-access list."
- **CTA button:** "Get the list"
- **Source tag:** `travel_docs`

### Common requirements (all forms)

- All forms POST to the same ESP endpoint with `source` parameter.
- Double-opt-in for deliverability and list hygiene.
- Honeypot field plus basic rate-limit. No captcha unless we see abuse.
- All forms log UTM params (`utm_source`, `utm_medium`, `utm_campaign`) alongside the source tag.

### Dev brief format (paste-into-issue)

```
Title: Brij - email capture forms (5 placements)

Spec: brij-marketing/08-NEWSLETTER.md (sections "Capture spec" and "Common requirements")

Deliverables:
- 5 capture forms across brij.fi (3) and travel.brij.fi (2)
- ESP integration (account setup pending - confirm credentials with marketing)
- Source-tagged event firing
- Inline success state, no page reload
- Confirmation email handled by ESP double-opt-in

Acceptance criteria:
- All 5 forms live, submitting to ESP, source-tagged
- Confirmation email arrives in <60s
- UTM params captured in ESP contact properties

Deadline: end of week 1 (2026-05-31)
Owner: VD-Dev
Related: brij-marketing/08-NEWSLETTER.md
```

## ESP recommendation

**Pick: Resend + Beehiiv**, OR **Loops**, depending on tooling preference.

- **Resend + Beehiiv:** Resend for transactional/lifecycle, Beehiiv for the newsletter front-end (issue archive, public subscribe page, referrals built in). Best if the newsletter is treated as a public publication.
- **Loops:** marketing + transactional in one tool, built for SaaS, clean API. Best if minimizing tool count matters more than a public newsletter archive.

Decision needed from `[client]`. Without one, defaulting to Loops in the dev spec above.

## Lifecycle sequence

### Email 01 - Welcome

**Trigger:** any new subscriber, after double-opt-in.
**Send:** immediately.
**Subject:** "Welcome to Brij"

**Body:**

> You signed up because you want to know when more agent-ready services land on Brij. Here's what you'll get:
>
> - A short note when a meaningful product or feature ships. No fluff.
> - The monthly 402 Receipts newsletter. Five things in agent payments worth knowing, plus what shipped on Brij.
> - Early access to Platform APIs when they open up to external builders.
>
> What's live today:
>
> - brij.fi - the smart wallet, on-ramps, and service access layer.
> - travel.brij.fi - the first proof. An agent can book a real flight using x402 and USDC.
>
> Follow along on X at @brij_fi.
>
> If you're a builder and you have a use case in mind, just reply. We read every one.
>
> Brij

### Email 02 - The proof (day 3)

**Trigger:** 72 hours after welcome.
**Subject:** "Watch an agent book a flight"

**Body:**

> The fastest way to understand what Brij does is to watch an agent do it.
>
> The flow: an AI agent searches live airline inventory, pays in USDC over the x402 protocol, and returns a real PNR. No IATA accreditation. No merchant onboarding. Three HTTP calls.
>
> Try it yourself at travel.brij.fi.
>
> Watch the live version on X: the pinned post on @brij_fi has the full demo.
>
> If you want to talk about your own use case, reply to this email.
>
> Brij

### Email 03 - The 402 explainer (day 10)

**Trigger:** 7 days after Email 02.
**Subject:** "402 Payment Required is the new API key"

**Body:**

> The HTTP 402 status code sat dormant for 25 years. Then x402 turned it into the cleanest payment primitive on the internet.
>
> Here's what Brij's three layers look like in practice:
>
> Smart Wallet. An agent has its own checking account: daily limits, signing keys, policies enforced on every transaction.
>
> On-Ramps. Fiat in, USDC out, routed automatically. No centralized exchange in the middle.
>
> Service Access. Pay-per-call to any API. No subscriptions. No API keys to lose.
>
> If you're building agents and any of this would save you a month of integration work, reply and tell us what you're shipping.
>
> More day-to-day on X at @brij_fi.
>
> Brij

### Email 04 - The ask (day 21)

**Trigger:** 11 days after Email 03.
**Subject:** "What are you building?"

**Body:**

> One question while you're on the list:
>
> What are you building, and what's the biggest payment-related blocker you've hit?
>
> Reply with one sentence. We read every one. The product roadmap moves based on these answers.
>
> Brij

### Email 05+ - The newsletter (recurring)

Monthly. Full draft format above. First scheduled issue below.

## Segmentation

ESP contact properties:

- `source` - which form/CTA captured them.
- `utm_source`, `utm_medium`, `utm_campaign`.
- `referrer_url`.
- `signup_date`.
- `booked_on_travel` - boolean, true if also a travel.brij.fi booker.
- `replied_to_lifecycle` - boolean, true on any inbound reply.

Lists / segments to maintain:

- All subscribers (newsletter default).
- High-intent: source ∈ {travel_postbooking, travel_docs, site_serviceaccess}.
- Builders: anyone who replied to the lifecycle "what are you building" email.
- Cold (no opens in 60 days): re-engagement candidate at month 3.

## Off-channel email

- **Targeted developer outreach** when a builder hits an agent-payment wall publicly: Marketing flags the moment, Ops executes via DM or email. Not automation.
- **Partner co-marketing list swaps** with Coinbase x402 devrel, Solana ecosystem newsletters, agent framework newsletters. Marketing identifies fit, Ops executes outreach.
- **No bought lists. No generic cold blasts.**

---

## Issue 01 - 2026-06-17 - "Brij is live"

**Ties to:** Campaign 01 (Espresso-to-Brij), Campaign 02 (Smart Wallet), Campaign 04 (Newsletter launch + bounty + free flight).

**Subject line:** "Brij is live: what we shipped"
**Send:** 2026-06-17 (Wed), AM.
**Status:** DRAFT (gated on email list crossing ~500 subscribers).

### Lead - What shipped on Brij this month

This is Issue 01. The headline: Espresso Cash is now Brij, and the first proof product is live. travel.brij.fi lets an AI agent search live airline inventory, pay in USDC over the x402 protocol, and return a real PNR. No card. No airline account. No IATA accreditation. The X post that launched it lives here: `[link to post-w1-x-1 once posted]`.

Underneath travel sits the rest of Brij: a smart wallet built for software, not humans with thumbs. Daily limits, policy rules, programmatic signing, fiat on-ramps. The capability detail post on X has the four-thing breakdown: `[link to post-w2-x-3 once posted]`.

We chose travel as the first wedge because it is one of the hardest payments problems in the world. Regulated industry, live inventory, real consequences when something breaks. If a wallet can clear travel, it can clear most of what an agent will need to buy next.

If you want to try it yourself, travel.brij.fi is open. Three HTTP calls.

### Five things in agent payments worth knowing

1. **x402 keeps moving.** [One-line update on x402 ecosystem activity in the past month, sourced.]
2. **Solana agent infrastructure update.** [One-line update on the most relevant Solana infra change in the past month.]
3. **Framework news.** [One-line update from LangChain / CrewAI / Mastra / Vercel AI SDK / Letta / Eliza.]
4. **Payment standards work.** [One-line update on any relevant standards work, e.g. x402 spec changes, ERC-7715, Solana token program changes.]
5. **One builder worth watching.** [One-line on a specific builder with an X handle - candidate from [07-ENGAGEMENT.md](./07-ENGAGEMENT.md) Tier 3.]

(Bullets above are placeholders. Fill in from live ecosystem reading the week of send. Each item ends with a source link.)

### Build of the month

[Spotlight one builder using x402, Solana agent payments, or Brij itself. Name, what they shipped, where to find them on X. Bridge to @brij_fi if they're already in our Tier 2 or 3 engagement list. For Issue 01, candidate sources include the x402 ecosystem listings and the Solana agent hackathon winners.]

### What we're working on next

Builder bounty: $500 USDC for the best demo of an agent paying for something real with a Brij wallet. Full rules and submission window on X: `[link to post-w4-x-1 once posted]`.

Free flight promo: the first 10 people to book on travel.brij.fi this month get the flight covered. Full mechanic: `[link to post-w4-x-3 once posted]`.

After this, Service Access opens to external builders. If you're shipping agents and you've hit the paywall wall, we want to talk.

### Social close

- Follow `@brij_fi` on X for the daily build: https://x.com/brij_fi
- Try the product: brij.fi and travel.brij.fi
- Reply to this email with what you're building. We read every one.

---

## Issue 02+ structure (template, for future issues)

Each subsequent issue follows the same 5-section structure. Drafts live in this file as sub-sections under their own date header (`## Issue 0N - YYYY-MM-DD - <subject>`). Issue is not considered shippable until:

- It ties to ≥1 active campaign in [05-CAMPAIGNS.md](./05-CAMPAIGNS.md).
- Every X-post link placeholder is replaced with a live URL.
- The "Five things" section has 5 real sourced items.
- The "Build of the month" names a real builder with an X handle.

---

## Open items

1. Approve ESP pick (Loops, vs Resend + Beehiiv, vs other).
2. Confirm budget allocation for ESP (lives in [03-BUDGET.md](./03-BUDGET.md)).
3. Confirm any recoverable Espresso Cash email list - if yes, that's the import seed for week 1.
4. Approve lifecycle sequence copy above.
5. Confirm Issue 01 subscriber-threshold gate (~500), or override to ship Issue 01 regardless on 2026-06-17.
