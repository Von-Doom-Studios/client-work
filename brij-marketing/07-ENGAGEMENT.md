# 07 - ENGAGEMENT: Brij Marketing

Specific X accounts to engage with weekly, by handle, with the kind of value to add. This is the actual lever for organic growth on a small account in a small space.

This file is also the input contract for the external X-watcher agent that scrapes these handles daily and surfaces posts worth engaging with.

**Owner:** VD-Marketing
**Related files:** [02-STRATEGY.md](./02-STRATEGY.md), [04-CALENDAR.md](./04-CALENDAR.md)
**Last updated:** 2026-05-26

---

## Rules of engagement

1. **Replies must add value.** A code snippet, a counter-example, a sharp extension of the point with Brij as the proof. Empty "great post!" replies are banned.
2. **Public, not private.** Engagement is public on X. Outreach over DM is Ops territory.
3. **15-20 minutes/day on X.** Not a one-off task. Daily ritual against the queue produced by the external X-watcher agent.
4. **Quality over volume.** 3 substantive replies a day beats 30 empty ones.
5. **Quote-post selectively.** Quote-post when there's a sharp extension. Otherwise reply in-thread.
6. **No DMs without permission.**
7. **Comedy reposts.** When a Tier 1-3 account posts something the Brij comedy slot would have written, repost or quote-post in-character. Engagement is also brand-building.

## Tiered target list

The external X-watcher reads this list and scrapes each handle. The columns are the contract.

### Tier 1 - Ecosystem amplifiers (highest leverage)

Reposts and quote-posts from these accounts compound. One amplification here is worth 50 generic likes.

| Handle | Why | What to reply with |
|---|---|---|
| @CoinbaseDev | x402 protocol team. The most important amplifier we have. | Real x402 implementations, edge cases, performance numbers from our endpoints. |
| @solana | Top of the Solana funnel. | Solana-specific receipts: settlement times, escrow PDA patterns, USDC flow numbers. |
| @SolanaFndn | Foundation account. | Ecosystem milestone language. Tie what we're shipping to broader Solana narratives. |
| @helius_labs | Solana infrastructure. Heavily used by builders. | Technical notes on how we use their RPC, any edge cases worth flagging. |
| @JupiterExchange | DeFi infrastructure on Solana. | Cross-pollination with on-ramps and best-rate routing. |
| @phantom | Wallet UX leader. | When they post about agent UX or programmatic wallets, we have a point of view. |
| @superteam | Solana builder community. | Builder spotlight content, hackathon angles. |

### Tier 2 - Agent framework accounts (primary buyer audience)

Where our customers actually live. Reply traffic here converts to followers and email signups.

| Handle | Why | What to reply with |
|---|---|---|
| @LangChainAI | Largest agent framework community. | Code-level replies about how a Brij wallet + x402 integration would look in LangChain. |
| @crewAIInc | Multi-agent framework. | Payment primitives for multi-agent systems. |
| @vercel | AI SDK is heavily used. | "Here's the payment piece you didn't have" framing when they post about agent capabilities. |
| @letta_ai | Stateful agents. | Stateful-agent + persistent-wallet pairing. |
| @ai16zdao | Eliza framework, active builder community. | Eliza plugin angle for Brij. |
| @mastra_ai | Newer agent framework with active devrel. | Direct integration pitch in public. |
| @pyautogen | Microsoft's framework. | Enterprise angle, payment compliance. |

### Tier 3 - Builders shipping in adjacent space

Peer builders. Mutual amplification. Replies build relationships that turn into co-marketing.

| Handle | Why | What to reply with |
|---|---|---|
| _Seed list pending_ - individual x402 builders | To be sourced from x402 ecosystem listings. | Technical questions, sharing edge cases we've hit. |
| _Seed list pending_ - Solana agent builders | To be sourced from ecosystem. | Solana-specific implementation chat. |
| _Per-event basis_ - Crypto AI hackathon winners | Track winners as they're announced. | Repost their wins. Quote-post with "here's how Brij would slot in" when relevant. |

### Tier 4 - Crypto media and analysts who cover infra (not price)

Earned media targets. Not customers, but influence.

| Handle | Why | What to reply with |
|---|---|---|
| @BanklessHQ | They cover agent infrastructure. | Substantive replies on agent-payment narratives. |
| @TheBlock__ | Tier-1 crypto trade press. | Source for technical context when they cover x402 or agent payments. |
| @LightspeedPod | Solana-focused show. | Pitch when there's a real story. |
| @decryptmedia | Broader crypto. | Source when they cover agent or payment stories. |
| @sassal0x | Crypto analyst on infrastructure. | Engage on substance. |

---

## External X-watcher agent - input spec

A separate agent on an external server scrapes the handles in this file daily and produces a ranked engagement queue. This section is its input contract. Do not change the column structure of the tiered tables above without updating this section.

### What the agent reads

The agent reads only this file. It parses:

- Every markdown table row in the `Tier 1` through `Tier 4` sections.
- The columns: `Handle`, `Why`, `What to reply with`.
- Handles are extracted from the `Handle` column. Lines starting with `_..._` (italic) are placeholders and are skipped.

### What the agent does

For each scraped handle, daily:

1. Pull the account's last 24 hours of original posts (not replies, not reposts).
2. Score each post on engagement opportunity: relevance to Brij thesis (x402, Solana, agent payments, smart wallets, on-ramps, AI agent infrastructure), recency (decay), and post traction (likes + reposts + replies).
3. Rank the top posts across all handles into a single daily queue.

### What the agent outputs

A single file committed to the repo at `Von-Doom-Studios/CLIENT-WORK/brij-marketing/engagement-queue/YYYY-MM-DD.md` (the agent creates the `engagement-queue/` folder on first run if it doesn't exist). Structure per entry:

```
## [post N of 5] @handle - <relative time, e.g. 4h ago>

**Post URL:** https://x.com/handle/status/...
**Post text:** <full text, truncated to 280 chars if needed>
**Why it's high-leverage:** <one-line justification tied to the "Why" column for this handle in 07-ENGAGEMENT.md>
**Suggested reply angle:** <one-line angle derived from the "What to reply with" column>
**Tier:** 1 | 2 | 3 | 4
**Score:** <integer>
```

Top 5 entries per day. The queue is read by the operator who actually posts the replies. The operator picks 2-3 and replies. Marketing does not post; Marketing curates the spec the agent reads.

### Cadence

- **Run:** daily at 08:00 ET.
- **Commit window:** by 08:30 ET so the queue is available for the daily engagement ritual.

### What the agent does NOT do

- Does not post replies on its own.
- Does not modify this file (07-ENGAGEMENT.md).
- Does not DM anyone.
- Does not write to any file outside `brij-marketing/engagement-queue/`.

---

## Tracking

For now, lightweight, tracked at the campaign level inside [05-CAMPAIGNS.md](./05-CAMPAIGNS.md):

- Notable amplifications per campaign window (any Tier 1 repost, reply, or DM)
- Inbound from engagements (followers and replies that reference a specific Brij reply or thread)

## Open items

1. Seed the Tier 3 builder list. ~10-20 handles already followed in the x402 / Solana agent space.
2. Confirm whether @brij_fi or `[client]`-personal handle should be the primary engagement voice on Tier 4 media accounts.
3. Confirm the external X-watcher agent is wired to read this file and write to `engagement-queue/`.
