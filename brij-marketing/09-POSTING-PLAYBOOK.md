# 09 - POSTING PLAYBOOK

How to write X posts and replies that actually get engagement. Applied before any post or reply ships.

Read alongside [02-STRATEGY.md](./02-STRATEGY.md) voice rules. This file is the mechanics. 02 is the voice.

**Owner:** VD-Marketing
**Last updated:** 2026-05-26

---

## What the algorithm rewards (2026)

X weights interactions, not impressions. Per-action algorithmic value:

| Action | Weight |
|---|---|
| Back-and-forth conversation (we reply to a reply) | 150x |
| Reply to our post | 27x |
| Repost | 20x |
| Like | 1x |
| External link in post body | ~0 (suppresses reach) |

Implication: a post with 5 replies that we engage back with is worth more than a post with 500 likes. Optimize for replies.

## The 18-minute rule

A post loses half its reach in the first 18 minutes. The first line is the whole game. If the first line doesn't earn the second, the post is dead.

## What we post (Brij specific)

Three Brij-shaped post types make the 3x/week cadence work:

1. **Receipt.** A concrete thing that happened. Numbers. Names. Time. Specific enough that the reader knows it's real.
2. **POV.** A short opinion the buyer audience hasn't heard phrased that way before. Defended by one line of proof.
3. **Comedy.** Setup, misdirection, payoff. In-thesis. See [02-STRATEGY.md](./02-STRATEGY.md) comedy rules.

## First-line rules (the hook)

The first line decides the post. Every post is rewritten until the first line passes this checklist:

- **Specific noun in the first 6 words.** "An AI booked a flight" beats "We built something cool."
- **No throat-clearing.** No "So...", no "Today I want to share...", no "Big news:".
- **No corporate cadence.** No "We're excited," "Proud to announce," "Thrilled," "Game-changing."
- **No filler abstractions.** "Future of finance," "next generation," "revolutionary."
- **Read it without context.** If the first line only makes sense after the second line, restructure.

Hook patterns that work for Brij:

- **The receipt.** "An AI booked a flight to Lisbon at 3am. The owner was asleep."
- **The flat statement.** "Most wallets just hold money. Ours spends it."
- **The number.** "Four cents. That's what a Brij agent paid an API this morning."
- **The setup misdirection (comedy).** "A wire transfer takes three days because one computer needs to ask another."

Hook patterns to avoid:

- Rhetorical questions ("Ever wonder what would happen if...")
- "Here's something nobody is talking about"
- "Let me tell you about..."
- "POV:" / "Imagine if..."

## Length and shape

- **Standalone post:** target 1-3 short sentences. Stop when the idea is delivered.
- **Threads:** only when one tweet won't carry it. Hook tweet must work as a standalone. Each tweet in the thread = one new idea. Final tweet = call to action.
- **Lists:** 3-5 items max. Each item is one line. No nested bullets.
- **No em dashes.** No semicolons. No hyphens used as em dashes (e.g. "wallet - your money"). If a hyphen would carry a clause break, rewrite the sentence.

## Formatting

- **Plain text first.** Bold/italic only when X actually renders the contrast (rarely).
- **Line breaks for rhythm.** Use a blank line between the hook and the body, and between the body and the CTA.
- **No hashtags in the post body.** If a hashtag is required for discoverability (rare for us), it goes on the last line as a single tag.
- **No external links in the post body.** Algorithm suppresses them. Links go in the first self-reply.
- **Native media wins.** A screenshot, a 15-second screen recording, or a single chart will outperform text every time. Brief Creative when a post needs visual support.

## Calls to action

Every post has at most one CTA. Patterns:

- Plain URL: `travel.brij.fi` (no link shortener, no UTM-laden mess in body)
- Action verb: `Try it.` / `Reply with what you're building.` / `Quote-post with your take.`
- No "Click here," no "Learn more," no "DM us."

## Replies (engagement on others' posts)

Replies are the highest-leverage thing we do as a small account. Rules:

1. **Be in the first 3-5 replies.** Early replies surface to the original author's full audience. After ~30 minutes a reply is buried.
2. **Add a thing the author didn't say.** A counter-point, a sharper example, a real number, a working link to something they reference. Never "Great post!" or emoji.
3. **Match the post's register.** A casual post gets a casual reply. A technical post gets a technical reply. Mismatched tone reads as bot.
4. **Land the value before the brand.** If we're mentioning Brij in a reply, the Brij mention is the last line, not the first. The reader has to want to know about us by the time they get there.
5. **Polite disagreement out-performs agreement.** A respectful counter-take generates 3-10x the reply volume of agreement. Use sparingly and only when we have a real point.
6. **Don't drop the URL unless asked or it's clearly relevant.** A reply that's secretly an ad is worse than no reply.

Reply template (when relevant to Brij):

```
[One line that adds something to what the author said. Specific.]

[Optional second line tying it to a concrete Brij example - only if it lands without forcing it.]
```

## Post-and-engage discipline

A post is not done at publish. The first hour decides whether the algorithm pushes it.

- Reply to every comment that gets one, fast. The author replying back is the 150x signal.
- If a post starts performing (5+ replies in the first hour), reply to your own post with a follow-up thought. Reply chains on your own post extend the algorithmic life.
- Quote-post your own post into your timeline 24 hours later with a new angle if it underperformed but the topic is still relevant.

## Worked example (before/after)

**Before (the original w1-x-1 lead in 06-CONTENT-LIBRARY, pre-rewrite):**

> An AI agent can now book a real flight on Brij. It searches live airline inventory, pays in USDC over the x402 protocol, and returns a real PNR. No card. No airline account. No IATA accreditation.

Audit fails: "PNR" and "IATA accreditation" are jargon a normal X reader won't recognize, so the first line forces the reader to decode before they get the picture. Three ideas stacked.

**After:**

> An AI agent can now book your flight. It searches the same airlines you would, finds the cheapest seat, pays for it, and sends you the confirmation. You don't need an account anywhere. travel.brij.fi

Audit passes: first line names a concrete event in plain language; one idea (an AI books your flight); every clause carries weight; CTA is a plain URL.

## Audit checklist (apply before every post or reply)

Mechanics only. Voice tests live in [02-STRATEGY.md](./02-STRATEGY.md).

1. Does the first line stop the scroll without context?
2. Is there one idea, not two?
3. Is every word doing work? Can I cut 20% without losing meaning?
4. Is there any jargon a normal X reader won't recognize? If yes, replace or cut.
5. Is the CTA a single plain URL or action verb (not "click here / learn more / DM us")?
6. If it's a reply, is the value-add in the first sentence, with the brand mention (if any) last?
7. Are there any em dashes or hyphens used as em dashes? Rewrite the sentence if yes.
8. Are external links out of the post body? (Algorithm suppresses them. Links go in the first self-reply.)

Failing any one of these = rewrite, not ship.

## What we never do

- Engagement bait without payoff ("This will change everything" with no follow-through)
- Manufactured controversy (contrarian for clicks without a real take)
- Threads longer than 7 tweets
- Reply guy tactics (replying to giant accounts with empty hot takes)
- Posting and leaving for an hour
- Reposting our own brand spam back into the timeline within 7 days
- Apologizing for "being quiet" or "missing posts" - just post
