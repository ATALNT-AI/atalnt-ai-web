# ATALNT prompt architecture

Distilled 2026-08-20 from the six production prompts Nik provided: Mikee (Sales Nav candidate
matching), Dee (Zoho Voice texting), Jessica (Indeed sourcing plus Google identity search),
the sales pre-screen call script, the candidate submission generator, and Kavya's two client
sourcing prompts (AI talent, and Texas construction placement).

This file is the reusable spine. New prompts inherit it. Anything prospect facing also has to
clear `sales-playbook.md` for voice and `cold-email-context.md` for claims.

## The spine

Every one of these prompts is the same machine, which is why they work:

1. **Screen context, not search.** The operator puts the right page on screen. The model reads
   only what is visible. If something is not visible, it does not exist.
2. **Deterministic mode.** Not an advisor, not a coach, not creative. No commentary, no meta
   explanation, no softening, no score inflation.
3. **Explicit triggers, no output otherwise.** `START` / `NEXT` / `CANDIDATE` / `PASS`, or
   `1` / `2` / `3`. If the last message is not a trigger, produce nothing.
4. **Stateless per subject, persistent per reference doc.** Each trigger discards the prior
   candidate or prospect. The job description or service description survives until explicitly
   replaced.
5. **Execution authority.** The trigger IS the operator's confirmation that the right thing is on
   screen. The model may not verify, question, or block on UI visibility.
6. **A human gate before outreach.** Jessica's `PASS` gate is the pattern: the model scores, the
   human confirms identity, only then does copy get generated.
7. **Single signal doctrine.** One personalization signal, one implication, one service angle,
   one ask. Stuffing is the main failure mode.
8. **Banned words and hard character limits.** Kills the AI tells and the consultant voice.
9. **Fixed output format.** Same block structure every time, copy paste ready, no labels the
   operator has to strip.
10. **Re arm.** Produce once, return to idle.

## The universal rules

- **Never an em dash.** In all six. It is the house rule.
- No emojis, no bullet points in messages, no signatures unless instructed.
- No invented details. If required information is missing, say so or insert `[INSERT HERE]`.
- Score conservatively. Vague or implied experience counts as partial at best. Titles alone
  satisfy nothing. Hard exclusions are an automatic fail.
- 80 percent and Pass is the messaging threshold on the candidate side.

## Banned signals (from the Texas prompt, applies everywhere)

LinkedIn UI metadata is never personalization: connection degree, mutual connections, follows you,
in your network, open to work banner, Premium badges, active now, profile photo, follower count,
endorsements. If that is all you have, fall back to a captured role.

Same file also fixes the trigger collision: "1st", "2nd", "3rd", "Tier 1", "Top 3" in profile text
are not triggers. Triggers are only valid as the entire most recent message.

## Length limits in force

| Asset | Limit |
|---|---|
| InMail subject | 60 chars, aim 30 to 45 |
| InMail body | 70 words, aim 50 to 60, max 5 sentences, 4 blocks |
| Connection note | 200 chars, single sentence, no CTA |
| Cold text | 220 chars, first name only, no conditional language |
| Zoho SMS | 320 chars |

## Three different offers live in these prompts. Do not mix them.

This is the thing most likely to cause a bad send.

| Offer | Buyer | The money | Where it is defined |
|---|---|---|---|
| **ATALNT contingent search** | Hiring managers buying a placement | 18 to 25 percent of first year salary, per hire | `sales-playbook.md` section 8 |
| **ATALNT AI subscription** | HR / People leader, Director and up | Flat monthly, custom quoted, never named in outbound | `cold-email-context.md` |
| **ATALNT AI talent delivery** | Eng and product leaders buying AI engineers | Four engagement models, project scoped | Kavya's AI sales prompt |

A prompt written for one of these will produce a compliance problem if it is pointed at another.
Placement fee terms never enter an AI subscription pitch, and subscription pricing never enters
a contingent search pitch.

## Open conflicts to resolve

Flagged, not silently fixed. Nik decides.

1. **Cold text to buyers.** Kavya's two client prompts generate a cold text for every prospect.
   The ATALNT AI compliance floor is explicit: no cold texting, no ringless voicemail, text only
   after a reply or a booking. Candidate side texting (Mikee, Dee, Jessica) is a different posture
   and is not affected. Recommendation: on the buyer side, replace the cold text output with a
   voicemail script.
2. **The $2,800 in the Texas construction prompt.** That prompt mandates "$2,800/month" and
   "$20K" in the body of every message. ATALNT AI pricing is custom and quoted, and no dollar
   figure for our plans goes into outbound. $2,800 is also within a hair of the internal Growth
   anchor. If the Texas construction offer is deliberately a fixed public price, it needs to be
   written down as its own product with its own rules, because right now it contradicts the AI
   subscription rules it sits next to.
3. **"950+ placements at 98% retention"** in the Texas prompt. Neither number is substantiated in
   the repo. Anything a prospect can ask us to prove on the first call needs a source before it
   ships.
4. **"HQ North Carolina, partners in Phoenix, Durham, Dallas"** in Dee's texting prompt, and
   "US based recruiter". The AI product may never claim team location. If the staffing business
   genuinely operates from those cities the claim is fine there, but the two must not share copy.
5. **Missing buyer qualification.** The client prompts capture role titles off a jobs page, which
   is the right instinct, but they never compute the numbers the AI pitch actually runs on: the
   recruiter req and its age, the distinct req count, whether a TA function already exists, and
   the posted salary range in pay transparency states. Trigger 1 in
   `linkedin-inmail-atalnt-ai-demo.md` fixes this.

## What is not archived here

The six original prompts are not stored verbatim in this repo. If they should be, drop them in
`prompts/library/` one file each.
