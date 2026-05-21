# Social Content Bank — BRIJ

Ready-to-edit posts. Copy them, adjust, publish. Organized by launch.

---

## LAUNCH 1: Espresso Cash → BRIJ

---

### Thread #1: The Rebrand Announcement (X — Pin to profile)

**Tweet 1 (hook):**
Espresso Cash is now BRIJ.

Same wallet. Same team. Much bigger mission.

Here's what changed and why. 🧵

**Tweet 2:**
Espresso Cash started as a wallet on Solana — fast transfers, clean UX, no seed phrases.

It worked. But we kept running into the same wall: agents need more than a wallet.

**Tweet 3:**
They need to read on-chain state. Write transactions. Pay for APIs. Convert fiat. All without a human in the loop.

No product on Solana did all of that. So we built one.

**Tweet 4:**
BRIJ is the agent layer for Solana.

Four capabilities, one stack:
→ Read: protocol-aware state across Jupiter, Orca, Raydium, Solend
→ Write: declarative tx execution + smart wallet
→ Pay: x402 per-request stablecoin settlement
→ Onramp: best-rate fiat conversion via MCP aggregator

**Tweet 5:**
Espresso Cash didn't die. It evolved.

The wallet is now one pillar of something much larger.

If you used Espresso Cash, you're already on BRIJ. Welcome.

brij.fi

---

### Standalone Tweets: Rebrand Week

**Day 2:**
Espresso Cash is now @brij_fi.

Same wallet. Bigger mission.

The agent layer for Solana.

**Day 3:**
If you used Espresso Cash, you're already on BRIJ.

Same wallet. Now it's part of an infrastructure stack that lets AI agents read, write, pay, and onramp on Solana.

brij.fi

**Day 5 (teaser):**
The wallet was just the beginning.

Monday, your AI agent books its first flight.

travel.brij.fi

---

## LAUNCH 2: BRIJ Travel

---

### Thread #2: Travel Launch (X — Pin to profile, replace rebrand thread)

**Tweet 1 (hook):**
Your AI agent just booked a flight.

Real airline inventory. Real ticket. Paid in USDC on Solana. Settled in under a second.

This is BRIJ Travel. 🧵

**Tweet 2:**
Here's what happened:

1. Agent searches live flights (POST /air/search) — $0.10
2. Locks in the offer (POST /air/intents) — $0.10
3. Pays the escrow and books (POST /air/intents/{id}/book) — flight price
4. Airline confirmation code returned

Four HTTP calls. No account. No contract. No IATA accreditation.

**Tweet 3:**
How it works under the hood:

Your agent connects via the BRIJ MCP on Grok. It hits our x402-powered API. Payment is authentication — show up with USDC, start booking.

Every booking is escrow-backed on Solana. If the price changes before confirmation, you get an automatic refund.

**Tweet 4:**
Why this matters:

Airlines track your searches across sites and inflate prices the more desperate you look.

Your AI agent has no cookies. No browser fingerprint. No search history. It just gets the price.

**Tweet 5:**
Traditional flight booking:
— Apply for GDS access (weeks)
— IATA accreditation (months)
— Monthly minimums
— PCI compliance
— Merchant accounts

BRIJ Travel:
— Show up with USDC
— Start booking

**Tweet 6:**
This is the first x402 merchant on Solana.

Pay-per-call. No subscription. No API keys. No monthly minimums.

Your agent pays $0.10 to search. The flight price to book. That's the entire cost structure.

**Tweet 7:**
Try it now: travel.brij.fi

Connect the BRIJ MCP on Grok. Search a flight. Book it.

API docs: travel.brij.fi/openapi.json
Agent manifest: travel.brij.fi/llms.txt
x402 discovery: travel.brij.fi/.well-known/x402

The agent layer for Solana is live.

**[Attach: 30-sec demo video]**

---

### Thread #3: How x402 Works (Technical — Wed of launch week)

**Tweet 1 (hook):**
We built a flight booking service with zero accounts, zero API keys, and zero merchant onboarding.

Here's how x402 makes that possible. 🧵

**Tweet 2:**
x402 is an HTTP-native payment protocol.

Your agent makes a request. The server returns HTTP 402 Payment Required. The agent pays in USDC on Solana. Server returns 200 OK with the data.

That's the entire auth flow. Payment IS authentication.

**Tweet 3:**
```
$ curl -X POST "https://travel.brij.fi/air/search" \
  -H "PAYMENT-SIGNATURE: <sig>" \
  -d '{"origin":"SFO","destination":"JFK","departure_date":"2026-08-15"}'
```

$0.10 USDC. Live airline offers returned. No signup. No API key.

**Tweet 4:**
Booking uses the same pattern.

Create an intent → lock in the offer → pay the escrow amount via x402 → airline confirmation code returned.

Every booking has a per-intent Solana escrow PDA. If the upstream price changed, the booking is rejected and funds are refunded automatically.

**Tweet 5:**
For API providers, x402 means:

List your service once. Get paid per request in stablecoins. No billing infrastructure. No auth system. No compliance overhead.

BRIJ settles the payment and takes a fee. You get revenue.

**Tweet 6:**
x402 is how the internet should have worked from the start.

Read the spec: brij.fi/resources/x402-standard
Try the travel API: travel.brij.fi/openapi.json

---

### Thread #4: First Week Results (Week 3 Monday)

**Tweet 1:**
BRIJ Travel — Week 1 numbers.

We launched the world's first agentic flight booking 7 days ago.

Here's what happened. 🧵

**Tweet 2:**
[X] flight searches
[X] bookings completed
[X] unique users
[X] total USDC settled

(Fill with real numbers. If numbers are small, own it: "We're early. The people who tried it came back.")

**Tweet 3:**
What we learned:
— [Specific observation about user behavior]
— [What surprised us]
— [What we're fixing]

**Tweet 4:**
What's next:
— [Wallet integration timeline]
— [Upcoming feature]
— [Community ask or CTA]

---

### Thread #5: The Platform Vision (Week 4 Monday)

**Tweet 1 (hook):**
BRIJ Travel isn't a travel company.

It's proof that the agent layer for Solana works. 🧵

**Tweet 2:**
Think of it like this:

OpenRouter made it trivial to access any LLM via one endpoint.

BRIJ does the same thing for on-chain services on Solana.

Read state. Write transactions. Pay for APIs. Convert fiat. One integration.

**Tweet 3:**
Travel is the first service built on this stack.

But the stack does a lot more than flights:
→ Smart wallets that agents control with policy guards
→ Per-request payments to any API
→ Best-rate fiat onramps across 10+ providers
→ Unified reads across every major Solana protocol

**Tweet 4:**
We're building for three groups:

1. Agent builders: ship autonomous agents without glue code
2. API providers: earn stablecoins per agent request, no billing overhead
3. Wallet developers: agent-native fiat rails, best rates

**Tweet 5:**
Whether you're building agents, exposing APIs, or need fiat rails — we're the layer underneath.

brij.fi/platform

---

### Standalone Tweets: Travel Launch Weeks

**"No tracking" angle:**
Airlines track your searches across 6 sites and raise prices.

Your AI agent has no cookies. No fingerprint. No search history.

It just gets the price.

travel.brij.fi

**"Cost" angle:**
Search a flight: $0.10
Reserve it: $0.10
Book it: the ticket price

No subscription. No monthly minimums. No merchant account.

That's BRIJ Travel.

**"Speed" angle:**
Traditional flight booking: open 6 tabs. Compare for 45 minutes. Get a worse price than yesterday.

Agent booking: "Find me a flight to Barcelona next Friday." Done.

travel.brij.fi

**"Escrow" angle:**
Every BRIJ Travel booking is escrow-backed on Solana.

If the airline price changes before confirmation, you get an automatic refund. No support tickets. No disputes.

travel.brij.fi

**"Builder" angle:**
4 endpoints. Full booking lifecycle.
POST /air/search
POST /air/intents
POST /air/intents/{id}/book
POST /air/intents/{id}/refund-requests

Docs: travel.brij.fi/openapi.json

**Weekend hook:**
Going somewhere this weekend?

Let your agent handle the booking.

travel.brij.fi

---

## REDDIT POSTS

---

### Reddit #1: r/solana Launch Post

**Title:** We just shipped the first agentic flight booking service on Solana — your AI agent can book real flights with USDC

**Body:**
Hey r/solana — we've been building BRIJ, an infrastructure layer for AI agents on Solana. Today we shipped our first product: BRIJ Travel.

**What it does:** Your AI agent (Grok, via MCP) can search live airline inventory, select a flight, and book it — paid in USDC via the x402 protocol. Four API calls from search to confirmed booking.

**How it works:**
- Search: POST /air/search ($0.10 USDC)
- Reserve: POST /air/intents ($0.10)
- Book: POST /air/intents/{id}/book (flight price, escrow-backed)
- Refund: automatic if upstream price changes

No account needed. No API keys. No IATA accreditation. Payment is authentication.

**Why Solana:** Escrow PDAs per booking intent. Sub-second settlement. Stablecoin-native.

Try it: travel.brij.fi
API docs: travel.brij.fi/openapi.json
Agent manifest: travel.brij.fi/llms.txt

Happy to answer any technical questions.

---

### Reddit #2: r/ChatGPT or r/LocalLLaMA

**Title:** Your AI agent can now book real flights — we built an x402-powered flight booking API

**Body:**
We built BRIJ Travel — an API that lets AI agents search and book real flights. It's live at travel.brij.fi.

The flow: your agent (currently works best on Grok with our MCP connector) searches real airline inventory, selects a flight, and books it. Paid in USDC on Solana. Four API calls total.

The interesting part from an agent perspective: there's no account creation, no API keys, no merchant setup. The agent authenticates by paying — x402 protocol. The payment IS the authentication.

Right now it's for the technically inclined — you need USDC and a Grok account with MCP support. We're working on wallet integration and eventually credit card onboarding for mainstream users.

Demo + docs: travel.brij.fi

Curious what this community thinks. Happy to answer questions.
