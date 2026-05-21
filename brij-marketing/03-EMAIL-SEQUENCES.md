# Email Sequences — BRIJ

Actual copy. Paste into your email platform (Resend, Loops, Mailchimp). Adjust and send.

---

## LIST BUILDING

### Where to capture emails

| Location | CTA Copy | When |
|----------|----------|------|
| brij.fi homepage (above fold) | "Join 1,000+ developers building on BRIJ → [email field] [Get early access]" | Now |
| travel.brij.fi | "Get notified when new features launch → [email field] [Subscribe]" | Now |
| X bio | Link to brij.fi (ensure email capture is above fold) | Now |
| Premium access flow | Email required to request premium tier when capacity is hit | When buffer is exhausted |
| Post-booking confirmation | "Want to hear about wallet integration and credit card booking? → [Subscribe]" | When bookings are live |

---

## SEQUENCE 1: Welcome Email (Trigger: new signup)

**Subject:** You're in — here's what BRIJ does

**Body:**

Hey —

You just signed up for BRIJ. Here's the short version:

BRIJ is the agent layer for Solana. We give AI agents the ability to read on-chain state, write transactions, pay for APIs, and convert fiat — all through one integration.

**What you can do right now:**

→ **Book a flight with your AI agent.** Connect the BRIJ MCP on Grok, search real airline inventory, and book — paid in USDC via x402. Try it: [travel.brij.fi](https://travel.brij.fi)

→ **Read the docs.** Full OpenAPI spec, agent manifest, and x402 discovery docs are live on the travel page.

→ **Build on the platform.** If you're developing agents on Solana, BRIJ handles the infrastructure so you don't have to. [Explore the platform →](https://brij.fi/platform)

More coming soon — wallet integration, credit card onboarding, and new x402 services.

— The BRIJ team

---

## SEQUENCE 2: Espresso Cash → BRIJ Announcement (One-time blast to existing Espresso Cash users)

**Subject:** Espresso Cash is now BRIJ

**Body:**

Hey —

If you're getting this email, you used Espresso Cash. Here's what happened:

**Espresso Cash is now BRIJ.**

Same wallet. Same team. The wallet you know is now one part of something bigger: the agent layer for Solana.

BRIJ gives AI agents the infrastructure to operate autonomously — reading on-chain state, executing transactions, paying for services, and converting fiat. The Espresso Cash wallet is now the BRIJ wallet — the smart wallet that agents use to hold funds, sign transactions, and enforce spending limits.

**What's new:**

→ **BRIJ Travel is live.** Your AI agent can book real flights using stablecoins on Solana. [Try it →](https://travel.brij.fi)

→ **The BRIJ platform.** Read, Write, Pay, Onramp — four pillars, one stack. [See the platform →](https://brij.fi/platform)

Your wallet is safe. Your funds are safe. Everything works the same — it just does a lot more now.

Follow us: [@brij_fi on X](https://x.com/brij_fi)

— The BRIJ team

---

## SEQUENCE 3: Travel Launch Announcement (Blast to full list)

**Subject:** Your AI agent can book flights now — BRIJ Travel is live

**Body:**

Hey —

BRIJ Travel is live. It's the world's first agentic flight booking service.

**How it works:**

Your AI agent (Grok, via MCP) searches real airline inventory, selects a flight, and books it — paid in USDC on Solana via x402. Four API calls from search to confirmation.

**Why it matters:**

→ Airlines track your searches across websites and inflate prices. Your agent has no cookies, no fingerprint, no search history. It gets the real price.

→ No merchant account needed. No IATA accreditation. No monthly minimums. Payment is authentication.

→ Every booking is escrow-backed on Solana. Price changed before confirmation? Automatic refund.

**What it costs:**

- Search: $0.10 USDC
- Reserve: $0.10 USDC
- Book: the flight price
- No subscriptions. No hidden fees.

**Try it:** [travel.brij.fi](https://travel.brij.fi)

**Docs:** [OpenAPI spec](https://travel.brij.fi/openapi.json) | [Agent manifest](https://travel.brij.fi/llms.txt) | [x402 discovery](https://travel.brij.fi/.well-known/x402)

— The BRIJ team

---

## SEQUENCE 4: Post-Booking Follow-Up (Automated — trigger: completed booking)

### Email 1: Booking confirmation (Day 0)

**Subject:** Your flight is booked — here's your confirmation

**Body:**

Your agent just booked a flight through BRIJ Travel.

**Confirmation code:** [CONFIRMATION_CODE]
**Route:** [ORIGIN] → [DESTINATION]
**Date:** [DATE]

Your booking was escrow-backed on Solana and settled via x402. The confirmation code above is your airline PNR — use it directly with the airline for check-in and seat selection.

Questions? Reply to this email.

— BRIJ

### Email 2: Feedback (Day 3)

**Subject:** How was your booking experience?

**Body:**

You booked a flight through BRIJ Travel 3 days ago. Quick question:

**How was the experience?**

→ Reply to this email with any feedback — what worked, what didn't, what you'd want next.

We're a small team building something new. Your input directly shapes what we build next.

— BRIJ

### Email 3: Re-engagement (Day 14)

**Subject:** Going somewhere else?

**Body:**

You booked a flight through BRIJ Travel two weeks ago.

If you're planning another trip, your agent is ready: [travel.brij.fi](https://travel.brij.fi)

**What's new since your last booking:**
— [Feature update 1]
— [Feature update 2]

— BRIJ

---

## SEQUENCE 5: Wallet Launch Announcement (Future — when wallet ships)

**Subject:** BRIJ Wallet is live — your agent has a bank account

**Body:**

Hey —

The BRIJ Wallet is live. It's a smart wallet built for software — not humans.

**What it does:**

→ Holds funds (USDC, SOL, stablecoins)
→ Signs transactions autonomously
→ Enforces spending limits and policy guards
→ No browser extension. No seed phrases. No human in the loop.

**What this means for Travel:**

You can now book flights without managing USDC manually. Fund the wallet once. Your agent uses it when it needs to.

**[Set up your wallet →](https://brij.fi)**

— The BRIJ team

---

## EMAIL RULES

1. **Max 1 email/week.** Exception: product launch weeks can have 2 (announcement + follow-up).
2. **Every email has one message and one CTA.** Not two. Not three. One.
3. **Subject lines are specific.** "Your AI agent can book flights now" > "Exciting news from BRIJ"
4. **If unsubscribe rate exceeds 2%, reduce frequency immediately.**
5. **No email is sent without being read aloud first.** If it sounds like a press release, rewrite it.

---

## EMAIL TARGETS

| Phase | Cumulative Signups | Sends/Week |
|-------|--------------------|------------|
| Phase 1 | 500 | 0–1 |
| Phase 2 | 2,500 | 1 |
| Phase 3 | **10,000** | 1–2 |
