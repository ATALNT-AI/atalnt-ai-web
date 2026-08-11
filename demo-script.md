# ATALNT AI — Video Scripts

- **Part A — Meta / Instagram ads.** Four 30-second cold scripts plus one retargeting script, each built on a different pain spine.
- **Part B — Product demo.** One ~3:30 walkthrough, structured as four problems resolved in order.

Every scene has three lines: **ON SCREEN** (what the viewer sees), **VO** (what is said), and **VISUAL PROMPT** (a self-contained description you can paste into an AI video/image generator with no other context).

---

## Who these are aimed at

Organizations running **high req volume that can't close roles fast enough**. Not an industry — a situation. But inside that situation there are **two different people**, and they do not feel the same pain, don't answer to the same number, and don't play the same role in the deal.

### Persona A — the HR / Talent leader
*Head of Talent, HR Director, VP People, sometimes a COO at smaller companies.*

- **Owns:** the req board, the recruiting budget, the agency relationships. **This is the economic buyer — they sign.**
- **Measured on:** time-to-fill, cost-per-hire, offer-accept rate. Agency spend is a line item they personally defend.
- **Feels:** being the bottleneck. Every leadership meeting is a status update on roles they can't move.
- **Fears:** losing credibility with the exec team. Asking for recruiter headcount and being told no. And — read this twice — **being replaced by exactly this category of product.**

### Persona B — the line leader who's also the hiring manager
*VP Sales, Director of Ops, Head of Engineering, Controller. Runs a function, has a seat empty on their team.*

- **Owns:** the outcome the empty seat is blocking. **Not the budget — but the escalation.** This is your champion, not your signer.
- **Measured on:** their number. Recruiting metrics are somebody else's problem.
- **Feels:** their best people covering the gap and getting close to done with it. Interviewing candidates who waste their time.
- **Fears:** missing the quarter because they're a person down. Losing a second person to burnout.
- **Does not care about cost per hire.** Telling this person you're 50–70% cheaper is answering a question they never asked. They want the seat filled.

### The trap, and it's a serious one

**Persona A can read "AI recruiting" as a threat to their job.** If you're a Head of Talent and an ad implies software does what your team does, you don't book a walkthrough — you feel attacked, and you scroll. This is the single most likely way these ads underperform with the buyer who actually signs.

Fortunately the fix is already the product's real story: **ATALNT AI gives a talent leader the capacity they couldn't get approved as headcount.** Every line aimed at Persona A must land as *leverage for you*, never *instead of you*. Concretely:

- ✅ "The sourcing capacity you couldn't get headcount for"
- ✅ "Your team stops sourcing and starts closing"
- ✅ "Keep the recruiter" — the existing wedge line does this work perfectly
- ❌ "Replace your recruiting team" · "You don't need recruiters" · "Recruiting on autopilot"
- ❌ Anything implying the talent function is the reason roles are open

Persona B has no such sensitivity — they'll take the seat filled by any means available.

### Which ad goes to whom

| Ad | Pain spine | Primary persona | Why |
|---|---|---|---|
| **Ad 1** — Four Hundred Applicants | Quality | **Both** | A talent leader lives this; a hiring manager suffers the interviews it produces. The best shared-pain ad in the set |
| **Ad 2** — Nine Days | Speed | **A**, secondary B | Calendar friction is a talent-ops pain. A hiring manager is often the *cause* of the delay, so tread lightly |
| **Ad 3** — Ninety-One Days | The death spiral | **B**, strongly | "Three people are covering that seat" is a line leader's exact daily reality. Do not lead with this to Persona A — it reads as an accusation about their board |
| **Ad 4** — The Tenth Hire | The pricing model | **A**, only | Cost-per-hire is Persona A's scoreboard and nobody else's. Wasted impression on a VP of Sales |
| **Ad 5** — Messy Is Fine | Friction | Retargeting, both | |

**Meta targeting:** run two campaigns, not one. Persona A on job titles (Head of Talent, Talent Acquisition, HR Director, VP People, People Operations, Recruiting Manager) with Ads 1, 2, 4. Persona B on functional leadership titles (VP Sales, Director of Operations, Head of Engineering, Controller, General Manager) with Ads 3 and 1. Same landing page, different ad sets, separate budgets — otherwise Meta's optimizer pools them and you learn nothing about which buyer is actually moving.

**A useful thing about running both:** Persona B is often the one who forwards it. A hiring manager who sees Ad 3 and sends it to their Head of Talent is a warmer intro than any cold click, so don't judge the B campaign on its own conversion rate alone — watch for direct traffic and branded search lifting at the same time.

---

## The retention architecture

This is the structure every script below follows. It's worth understanding rather than just reading, because it's what makes people watch past three seconds.

**An unresolved problem is an open loop. Open loops hold attention. Resolved loops feel like payoff.** So:

| Time | Beat | What it does |
|---|---|---|
| 0:00–0:04 | **Pain 1** — the sharpest one, stated as a *scene*, not a claim | Opens loop 1. Earns the next 3 seconds |
| 0:04–0:09 | **Pain 2** — escalate | Opens loop 2. "It's worse than that" |
| 0:09–0:13 | **Pain 3** — the consequence the first two produce | Opens loop 3. Peak tension |
| 0:13–0:16 | **The turn** — name the enemy | Relief. Critically: the enemy is *the model*, never the viewer |
| 0:16–0:26 | **Solutions 1, 2, 3** — same order as the pains | Each one snaps a loop shut |
| 0:26–0:30 | Proof + CTA | |

**Four rules that matter more than the words:**

1. **Show the pain, narrate the solution.** The pain beats should be nearly silent — on-screen text and one short line. Let the visual do it. Wall-to-wall voiceover during the problem half is the single most common way these die.
2. **Scene, not adjective.** "Four hundred applicants, not one can do the job" beats "hiring is hard." Specific beats intense.
3. **Never blame the viewer.** The enemy is the pricing model and the math, never their competence. This is both the ethical line and the effective one — a viewer who feels accused scrolls.
4. **Same order, both halves.** If pain 2 was speed, solution 2 is speed. Break the order and the payoff doesn't land.

---

## Claims sheet — read before recording

Pulled from the live site copy in `lib/site.ts`. Stick to these words.

**Safe to say:**

| Claim | Exact wording |
|---|---|
| Cost | "50 to 70% lower cost per hire" |
| Model | "One flat monthly price" — never a dollar figure, pricing is quoted per account |
| Human | "A dedicated, U.S.-based account manager" · "1:1" |
| Speed | "Your first shortlist inside a week" |
| Terms | "No implementation fee. Cancel anytime." |
| Agency cost | "18 to 25% of first-year salary" · "$10,000 to $40,000 per hire" |
| Data | "Candidate data encrypted in transit and at rest" · "You own your data and can export it any time" |

**Do NOT say:**

- ❌ **"SOC 2 Type II certified."** The audit is *in progress*. Only permitted phrasing: "SOC 2 Type II audit in progress." The demo's login screen shows the unqualified version — do not film it.
- ❌ **"2.4M profiles indexed"** — `lib/site.ts` flags it as pending substantiation. Held out of every script; drop it into Ad 5 and Demo Scene 4 once cleared.
- ❌ Named clients, logos, or testimonials until attribution exists.
- ❌ **Any days-to-fill, time-to-hire, applicant-volume, or quality-of-hire statistic.** The pain scenes are full of numbers — 400 applicants, 91 days, nine days to schedule. Every one is a *depicted scenario*, exactly like the site's illustrative fee ledger. The VO never states them as fact and never attributes them to research or to ATALNT results. Check this at the edit; it's the easiest thing to break in a rewrite.
- ❌ "Guaranteed," "replace your recruiting team," or anything implying no effort on the client's side.

**On Meta policy — refining what I said earlier, because it affects how hard you can hit.** Second person is fine. B2B ads say "your open roles" constantly. The prohibited thing is implying knowledge of a *personal attribute* — someone's finances, health, or hardship. So:

- ✅ "That seat's been empty ninety-one days" — a depicted business scenario
- ✅ "Your tenth hire cost what your first did" — the industry's pricing model
- ❌ "Struggling to fill roles?" — implies knowledge of their situation, and reads as an accusation
- ❌ Anything framing them as failing, falling behind, or bad at the job

Hit the situation hard. Never hit the viewer.

**On role names:** all sample roles are sector-neutral. See the production note — the demo app is seeded with freight/logistics data and needs reseeding before you film.

---

# Part A — Meta / Instagram ads

**Specs:** 9:16 vertical, 1080×1920. 30 seconds. Burned-in captions always — assume sound off for the first 3 seconds. Logo only in the last 3. One pain spine per ad.

**Budget order:** Ad 1 and Ad 2 first, head to head. Ad 3 is the emotional outlier and may over- or under-perform dramatically — small budget, watch it. Ad 4 is the rational closer for anyone who's seen the others. Ad 5 is retargeting only.

---

## Ad 1 — "Four Hundred Applicants"
*Pain spine: **quality**. Applicants aren't candidates. The most universally felt pain in the set, and the best cold hook.*

**0:00 – 0:04 — Pain 1: volume without quality**
- **ON SCREEN:** An applicant list scrolling fast — dozens of rows blurring past. It stops. Counter reads `412 applicants`.
- **VO:** "Four hundred and twelve applicants."
- **VISUAL PROMPT:** A long list of anonymous applicant rows scrolling rapidly on a clean cream dashboard, motion blur, coming to a stop on a large counter reading 412. Muted, overwhelming, no faces.

**0:04 – 0:09 — Pain 2: the reality underneath**
- **ON SCREEN:** Rows grey out one by one, fast. Six remain. Then two. On screen: `2 worth calling`.
- **VO:** "Two worth calling."
- **VISUAL PROMPT:** The same applicant list with rows desaturating and fading one by one in rapid succession until only two remain highlighted. Stark, quiet, high contrast between faded and remaining rows.

**0:09 – 0:14 — Pain 3: the consequence**
- **ON SCREEN:** A req board behind it — eleven open roles, day counters climbing. Text: *and ten more roles behind this one.*
- **VO:** "And ten more roles behind this one."
- **VISUAL PROMPT:** A list of open job requisitions with day counters incrementing upward, several rows tinted warm red, seen slightly out of focus behind a foreground panel. Sense of backlog.

**0:14 – 0:17 — The turn**
- **ON SCREEN:** Everything clears to black. `Posting isn't sourcing.`
- **VO:** "Posting a job isn't sourcing. It's waiting."
- **VISUAL PROMPT:** A single line of elegant serif text centered on deep black with a faint warm gold glow. Total visual silence after clutter.

**0:17 – 0:23 — Solutions 1 and 2**
- **ON SCREEN:** Sourcing channels light up — *Internal Databases · LinkedIn · Job Postings · Email · Voice · Text*. Resolves into a ranked shortlist: three candidates, gold match scores.
- **VO:** "ATALNT AI goes and finds them. Then a real account manager screens every one by hand — so what reaches you is three people who can actually do the job."
- **VISUAL PROMPT:** Labeled channel nodes illuminating in sequence around a center point with thin gold connecting lines on dark background, dissolving into a recruiting interface with three candidate cards on warm cream, each with a large gold percentage match score.

**0:23 – 0:27 — Solution 3**
- **ON SCREEN:** The eleven-role board again — but each row now carries a **Ready** badge.
- **VO:** "For every open role. One flat monthly price."
- **VISUAL PROMPT:** The same requisition list, now calm and neutral-toned, each row carrying a small gold "Ready" pill badge. Resolution and order.

**0:27 – 0:30 — Close**
- **ON SCREEN:** `First shortlist inside a week` → wordmark → `atalnt.ai`
- **VO:** "First shortlist inside a week."
- **VISUAL PROMPT:** Short line of text on deep black dissolving into a minimal serif wordmark with warm gold radial glow.

---

## Ad 2 — "Nine Days"
*Pain spine: **speed**. You did the hard part and lost anyway. The most painful scenario in the set because it's a near-miss, not a failure.*

**0:00 – 0:05 — Pain 1: the win**
- **ON SCREEN:** A single candidate card. Match `96%`. A cursor hovers. Text: *Tuesday. You found her.*
- **VO:** "Tuesday. You found her. Perfect on paper, better on the phone."
- **VISUAL PROMPT:** A single candidate card centered on warm cream, high gold match score, softly lit, everything else dark. Hopeful, focused, singular.

**0:05 – 0:11 — Pain 2: the machinery**
- **ON SCREEN:** Calendar tetris. Emails stack: *"Does Thursday work?"* → *"Sorry, can we move it?"* → *"Checking with the panel."* A day counter climbs: `1 · 3 · 6 · 9`.
- **VO:** "Then the calendar. Then the panel. Then the reschedule."
- **VISUAL PROMPT:** Overlapping email threads and calendar invites accumulating on screen, a small day counter incrementing in the corner from one to nine. Cluttered, cool-toned, mounting friction.

**0:11 – 0:16 — Pain 3: the loss**
- **ON SCREEN:** The candidate card again — now greyed, stamped `Accepted elsewhere`. Silence. Hold a full beat.
- **VO:** *(nothing — let it sit)*
- **VISUAL PROMPT:** The same candidate card, now fully desaturated to grey with a small stamp reading "Accepted elsewhere," alone on a dark background. Still, quiet, final.

**0:16 – 0:19 — The turn**
- **ON SCREEN:** `Good candidates aren't lost. They're out-waited.`
- **VO:** "You didn't lose her to a better offer. You lost her to nine days."
- **VISUAL PROMPT:** A single line of elegant serif text on deep black with faint gold glow, generous spacing.

**0:19 – 0:26 — Solutions**
- **ON SCREEN:** The account manager card. An availability panel. Then a confirmation: *Booked — Wednesday 2:00pm*, in a single beat.
- **VO:** "Your account manager confirms interviews directly with the candidate. You share when you're free, they handle the rest, and you both get told once it's booked. No links. No chasing."
- **VISUAL PROMPT:** A profile card with a dark circular avatar and gold initials beside a simple availability selector, resolving to a single clean confirmation panel. Warm cream, gold accents, calm and immediate.

**0:26 – 0:30 — Close**
- **ON SCREEN:** `Shortlist in a week. Interviews in days.` → wordmark → `atalnt.ai`
- **VO:** "Shortlist in a week. Book a walkthrough."
- **VISUAL PROMPT:** Two short lines on deep black, each with a small gold diamond, dissolving to a minimal serif wordmark with warm glow.

---

## Ad 3 — "Ninety-One Days"
*Pain spine: **the death spiral** — the seat is empty, so the team covers it, so nobody has time to fill it. The truest pain here and the least-said. Higher variance: it may resonate hard or feel too close. Small budget, watch it closely.*

**0:00 – 0:05 — Pain 1**
- **ON SCREEN:** One req row, isolated. `Operations Manager · open 91 days`. The counter ticks to 92.
- **VO:** "Ninety-one days."
- **VISUAL PROMPT:** A single job requisition row isolated on a warm cream background, showing a job title and a day counter that increments once. Minimal, quiet, slightly ominous.

**0:05 – 0:11 — Pain 2**
- **ON SCREEN:** Three names appear beneath it, each with a small label: *covering* · *covering* · *covering*.
- **VO:** "Three people are covering that seat. Which is why none of them have time to help you fill it."
- **VISUAL PROMPT:** Three simple name rows appearing beneath a requisition, each with a small muted label, connected by thin lines to the open role above. Clean org-chart feel, quietly heavy.

**0:11 – 0:16 — Pain 3**
- **ON SCREEN:** A second req opens below. Then a third. Text: *and now his role is open too.*
- **VO:** "And now one of them has left."
- **VISUAL PROMPT:** Additional open requisition rows appearing below the first in sequence, each with a fresh day counter starting at zero, the group tinting slowly warmer red. Compounding.

**0:16 – 0:19 — The turn**
- **ON SCREEN:** `An open role costs more than the fee you're avoiding.`
- **VO:** "The empty seat was never the cheap option."
- **VISUAL PROMPT:** A single line of serif text on deep black with faint gold glow.

**0:19 – 0:26 — Solutions**
- **ON SCREEN:** The board clears. Roles resolve to **Ready**. The account manager card sits alongside. The three "covering" labels disappear.
- **VO:** "ATALNT AI puts a dedicated account manager on that role — sourcing, screening, and booking the interviews. Your first shortlist lands inside a week. You just show up and pick."
- **VISUAL PROMPT:** A cluttered warm-red requisition board clearing to calm neutral rows each carrying a gold "Ready" badge, with a profile card beside it. Relief, order, warmth.

**0:26 – 0:30 — Close**
- **ON SCREEN:** `Your first shortlist inside a week` → wordmark → `atalnt.ai`
- **VO:** "Get the seat filled. Send this to whoever owns hiring."
- **VISUAL PROMPT:** Short line of text on deep black with a small gold diamond, dissolving to a minimal serif wordmark with warm glow.

> **Persona note (B — line leader).** The close is deliberately a *forward*, not a booking. This viewer usually can't sign, and asking them to book a walkthrough for a budget they don't control is friction. Asking them to send it to their Head of Talent is the action they'd take anyway — and it arrives as an internal recommendation. Also note the solution beat sells **the seat getting filled**, not capacity or cost. "Sourcing capacity without adding headcount" is a Persona A line; it means nothing to a VP of Sales.

---

## Ad 4 — "The Tenth Hire"
*Pain spine: **the pricing model**. The most rational ad and the strongest argument you own — an agency cannot answer it, because it's their business model, not their service quality. Best as a second-touch for people who already felt the pain in Ads 1–3.*

**0:00 – 0:05 — Pain 1**
- **ON SCREEN:** Black. `HIRE #1 — $19,000` fades up. Beat. Beneath it: `HIRE #10 — $19,000`.
- **VO:** "Your first hire this year cost nineteen thousand in fees. So did your tenth."
- **VISUAL PROMPT:** Two stacked rows of large gold serif text on near-black, each a label and an identical dollar figure, the second appearing after a pause. Faint warm glow, film grain.

**0:05 – 0:11 — Pain 2**
- **ON SCREEN:** Eight more identical rows stack fast. Running total climbs, stops at `$190,000`.
- **VO:** "Same percentage every time. No credit for volume, no leverage on your tenth search that you didn't have on your first."
- **VISUAL PROMPT:** A ledger rapidly stacking ten identical dollar rows on warm off-white, a running total counting upward beneath a thin dashed rule. Minimal, expensive.

**0:11 – 0:16 — Pain 3**
- **ON SCREEN:** One row flickers and restarts at `$0 → $19,000`. Text: *she left in month eight.*
- **VO:** "And when one doesn't work out, the meter starts over."
- **VISUAL PROMPT:** A single ledger row resetting to zero then counting back up to its original figure, the rest of the ledger dimmed. Small, cruel detail.

**0:16 – 0:19 — The turn**
- **ON SCREEN:** The ten rows collapse into one flat line: `one flat monthly price`.
- **VO:** "Pay for recruiting. Not for introductions."
- **VISUAL PROMPT:** Multiple stacked ledger rows collapsing and merging into a single clean line of text on warm cream.

**0:19 – 0:26 — Solutions**
- **ON SCREEN:** Ranked shortlist. Then the account manager card. Then a counter: `Roles submitted this month: 11`.
- **VO:** "Submit as many roles as you need — the price doesn't move. It's the sourcing capacity you couldn't get headcount for, so your team spends their time closing instead of searching."
- **VISUAL PROMPT:** Recruiting shortlist with three candidate cards and gold match scores on cream, a small profile card, and a summary tile showing a count of roles submitted.

**0:26 – 0:30 — Close**
- **ON SCREEN:** `50–70% lower cost per hire` → wordmark → `atalnt.ai`
- **VO:** "Fifty to seventy percent lower, per hire. Book a walkthrough."
- **VISUAL PROMPT:** Bold gold statistic on deep near-black dissolving into a minimal serif wordmark with warm gold glow.

> **Persona note (A — talent leader).** The solution beat was rewritten specifically for this reader. The earlier version listed what the AI does — sources, ranks, screens — which to a Head of Talent is a list of *their own job functions* being performed by software. The current line reframes the identical capability as budget they couldn't get approved, and puts their team on the higher-status half of the work. Same product, and it's the difference between "this threatens me" and "this arms me." Apply the same test to any line you rewrite in Ads 1, 2, or 4.

---

## Ad 5 — "Messy Is Fine" *(retargeting only)*
*No pain stack — these people already felt it. Pure friction removal. Serve to 50%+ video viewers and site visitors who didn't book.*

**0:00 – 0:04**
- **ON SCREEN:** A hand pastes a genuinely ugly job description — inconsistent bullets, ALL CAPS, a typo. Cursor blinks.
- **VO:** "This is a real job description. It's a mess. Watch."
- **VISUAL PROMPT:** Screen recording style, close on a text field filling with badly formatted job description text, inconsistent capitalization and bullets. Slight screen glow, warm background.

**0:04 – 0:12**
- **ON SCREEN:** It resolves into clean fields — *Role · Seniority · Must-have skills · Location*. One clarifying question appears.
- **VO:** "The AI structures it into a role, skills, and seniority, then asks the two or three questions that actually sharpen the search. That's your entire setup."
- **VISUAL PROMPT:** Unstructured text morphing into clean labeled form fields on cream, smooth transition, a single question prompt below with soft gold highlight.

**0:12 – 0:22**
- **ON SCREEN:** Sourcing channels light up. Cut to the ranked shortlist. **Ready**.
- **VO:** "Then it searches everywhere at once, and reaches out by email, voice, and text. Days later, a ranked shortlist, vetted by a human. Do that for every open role — the price doesn't move."
- **VISUAL PROMPT:** Labeled nodes illuminating in sequence with thin gold lines on dark, cutting to a recruiting shortlist on warm cream with gold match scores and a small "Ready" badge.

**0:22 – 0:30**
- **ON SCREEN:** `No implementation fee · Cancel anytime · First shortlist inside a week` → `atalnt.ai` + *Open the live demo →*
- **VO:** "No implementation fee, cancel any time. Open the live demo at atalnt dot A-I."
- **VISUAL PROMPT:** Three short lines with small gold diamonds on deep black, dissolving to a minimal wordmark and URL with warm gold glow.

---

## Hook bank
Swap into the first 3 seconds of any ad. Test five, keep two.

**Quality:** "Four hundred and twelve applicants. Two worth calling." · "You don't have an applicant problem. You have a candidate problem."
**Speed:** "You found her Tuesday. She accepted somewhere else on Thursday." · "You didn't lose them to a better offer. You lost them to nine days."
**Spiral:** "Ninety-one days." · "Three people are covering that seat. That's why nobody has time to fill it."
**Model:** "Your first hire cost nineteen thousand. So did your tenth." · "The more you hire, the worse the agency model gets." · "Twenty percent of salary — for an introduction."
**Wedge:** "Every AI recruiting tool hands you a dashboard and wishes you luck."

## Caption + CTA

**Ad 1 — quality:**
> Job boards give you applicants. Sourcing gives you candidates. ATALNT AI searches internal and external databases, LinkedIn, and live postings, then reaches out by email, voice, and text — and a dedicated U.S.-based account manager screens every result by hand before it reaches you. Submit every open role for one flat monthly price. First shortlist inside a week.

**Ad 2 — speed:**
> The best candidates are gone in days, and most of that time is calendar friction. Your ATALNT AI account manager confirms interviews directly with the candidate — you share your availability, they handle the rest, you both get told once it's booked. Ranked shortlist inside a week. 50–70% lower cost per hire.

**Ad 3 — the empty seat *(written for the line leader, not the talent leader)*:**
> An empty seat costs more than the invoice ever shows — it costs the three people covering it. ATALNT AI puts a dedicated account manager on the role: they source, screen, and book the interviews, and your first shortlist lands inside a week. You show up and pick. Send it to whoever owns hiring where you work.

**Ad 4 — the model:**
> Contingent search charges 18–25% of first-year salary on every hire — your tenth costs exactly what your first did, and if they leave, the meter restarts. ATALNT AI replaces the fee with one flat monthly price, so the next role is free at the margin. 50–70% lower cost per hire.

**Headlines:** `412 applicants. 2 worth calling.` · `You lost her to nine days, not a better offer` · `Your tenth hire shouldn't cost what your first did` · `The sourcing capacity you couldn't get headcount for` *(A)* · `Get the seat filled` *(B)*

**CTA button:** Ads 1, 2, 4 → *Book a walkthrough* (`atalnt.ai/demo`). Ad 3 → *Learn more* (`atalnt.ai`) — a line leader who can't sign shouldn't be pushed at a sales call.

---

# Part B — Product demo (~3:30)

Same architecture, longer runway. **Four problems opened in the cold open, then resolved one at a time, in order.** Each scene is explicitly named for the problem it kills — that naming is what keeps a three-minute video from becoming a feature tour.

Screen recordings are the hero. Presenter is voiceover only.

**The four loops:**
1. More reqs than sourcing capacity
2. Applicants aren't candidates
3. Good people are lost to slow process
4. Every hire re-bills you

---

### Scene 1 — The cold open: all four problems (0:00 – 0:35)
- **ON SCREEN:** Four fast beats, no narration over the first three — let each image land with on-screen text only. Req board with climbing counters → `412 applicants / 2 worth calling` → a greyed candidate stamped *Accepted elsewhere* → the ten-row fee ledger totalling `$190,000`.
- **VO:** *(begins only on the fourth beat)* "Too many roles and not enough people to source them. Hundreds of applicants and almost no candidates. The good ones gone before you can get them on a calendar. And a fee that charges the same on the tenth hire as the first. Four problems. They're the same problem. Here's how we take them apart."
- **VISUAL PROMPT:** Four rapid sequential images — a list of open requisitions with climbing day counters, a long applicant list reducing to two highlighted rows, a single desaturated candidate card stamped "Accepted elsewhere," and a financial ledger of ten identical fee rows with a large total. Warm cream and near-black, editorial, escalating tension.

### Scene 2 — The turn: what it is (0:35 – 1:05)
- **ON SCREEN:** Two panels. Left: the ATALNT AI interface. Right: a named account manager card.
- **VO:** "ATALNT AI is two things working together. An AI that sources, screens, and ranks — and a dedicated account manager, a named person on a U.S.-based team, who works your searches by hand. Software gives you a tool. We give you a person, backed by one. One flat monthly price, however many roles you're running. And to be clear about what this is: it's the sourcing capacity you probably couldn't get approved as headcount. Your team doesn't get replaced by it — they stop spending their week searching and get their time back for the part only they can do."
- **VISUAL PROMPT:** Balanced two-panel layout, clean software interface beside a warm profile card with gold accent border. Calm, premium, cream and near-black.

> **Persona note.** Almost everyone who watches three and a half minutes of this is Persona A — a talent leader evaluating whether to bring it to their exec team. The last two sentences exist entirely for them. A Head of Talent watching an AI recruiting demo is quietly asking whether this is a case for cutting their team, and if you don't answer it they'll answer it themselves, badly. Say it once, early, plainly, and then never mention it again — belabouring it sounds defensive.

### Scene 3 — Closing loop 1: capacity (1:00 – 1:35)
- **ON SCREEN:** Live capture. Paste a messy Operations Manager JD → structured fields → two clarifying questions → answer them. Then submit three more roles back to back. End on the board: all four in flight.
- **VO:** "First problem: more roles than hours. Submitting one takes about a minute. Paste the description, drop in a file — messy is fine, most of them are. The AI structures it into a role, skills, and seniority, then asks the handful of questions that actually sharpen a shortlist. Not a forty-field form. And because it costs you nothing extra, you submit *every* open req — not just the ones you can justify sending out."
- **VISUAL PROMPT:** Screen recording of unstructured job description text transforming into clean labeled fields, a short clarifying question with two options, then a list view filling with several submitted roles running in parallel. Warm cream UI, gold highlights.

### Scene 4 — Closing loop 2, part one: sourcing (1:35 – 2:00)
- **ON SCREEN:** Channels activating across all four roles at once: Internal Databases, External Databases, LinkedIn, Job Postings, Email, Voice, Text.
- **VO:** "Second problem: applicants aren't candidates. A job post waits for people who are already looking. This goes and finds the ones who aren't — internal and external databases, LinkedIn, live postings — then runs outreach by email, voice, and text. Across every role simultaneously."
- **VISUAL PROMPT:** Seven labeled channel nodes illuminating in sequence around a center point with thin gold connecting lines on dark background, several parallel groups running at once. Understated, not futuristic.

### Scene 5 — Closing loop 2, part two: the shortlist (2:00 – 2:30)
- **ON SCREEN:** Scroll the ranked shortlist slowly. Hover one card to expand — the one-line pitch, skill tags, match score, the account manager's notes.
- **VO:** "And this is the half that isn't software. Every candidate here was screened and vetted by your account manager before it reached you. You see why each person is on the list — the line that matters, the skills that matched, where they fall against the rest. Three to five people you'd actually call. Nobody on this list is filler."
- **VISUAL PROMPT:** Recruiting shortlist interface with three to five candidate cards, circular avatars, large gold match percentages, one-line summaries and skill tag pills on warm cream. One card expanded showing detail and handwritten-style notes.

### Scene 6 — Closing loop 3: speed (2:30 – 3:00)
- **ON SCREEN:** Three beats, account manager card visible throughout. Share availability → interview confirmed → offer terms → a declined candidate handled.
- **VO:** "Third problem: losing people to your own process. Share the times you're free — your account manager confirms directly with the candidate and tells you both once it's booked. You never send a scheduling link again. Set the offer terms, they extend it, handle the negotiation, and close it. And when it's a pass, they tell the candidate. Kindly. At this volume, that reputation compounds."
- **VISUAL PROMPT:** Three sequential interface moments — an availability selector, a booked confirmation, and an offer terms panel — each with a small account manager avatar card present. Warm, calm, human.

### Scene 7 — Closing loop 4: the model (3:00 – 3:30)
- **ON SCREEN:** The savings calculator. Drag *hires per year* from 4 to 12 and let the gap widen visibly. Land on the annual saving range.
- **VO:** "Fourth problem: the fee. Set your hires per year and average salary. This is what contingent search runs you, against what you'd spend with us. Watch what happens as you drag the volume up — the gap widens, because our price doesn't. Fifty to seventy percent lower per hire. No implementation fee, cancel any time, first shortlist inside a week. Book a walkthrough at atalnt dot A-I."
- **VISUAL PROMPT:** Interactive savings calculator with sliders and large animated dollar figures on warm cream, a visibly widening gap between two compared figures as a slider moves right, gold accents on the savings figure.

---

## Production notes

**Before you film anything — reseed the demo data.** The demo app and the site's hero shortlist are seeded with freight and logistics roles (Senior Freight Broker, Fleet Dispatcher, reefer lanes, McLeod TMS — see `components/sections/shortlist-preview.tsx`). That reads as a vertical product and works against the positioning. Swap in sector-neutral roles: Account Executive, Operations Manager, Staff Accountant, Customer Success Manager. Same for the fee ledger in `components/sections/problem.tsx`.

**If a person is recording this:**
- Screen capture at 2× / Retina, then scale down. Full-width browser, no bookmarks bar, no notifications.
- Record voiceover separately and cut picture to voice. Every timing above is a target, not a constraint.
- Slow every UI interaction to roughly half your natural speed. Sluggish while recording reads as confident on playback.
- Use the real demo app at `/demo-app` — but **skip the login screen**, it displays the unqualified SOC 2 claim.
- **In the pain scenes, cut the music down, not up.** The instinct is to build tension with a driving track. Do the opposite — strip it, let the images sit in near-silence, and bring the music in on the turn. The contrast is the effect.

**If an AI tool is generating this:**
- Feed one scene at a time. The VISUAL PROMPT lines stand alone with no other context.
- Global style, prepend to every prompt: *warm cream and near-black palette, gold accents, elegant serif headlines, generous white space, soft raised shadows, editorial and premium, no stock-photo people.*
- Never let a generator invent UI text — it produces garbled words on screen. Generate the background, composite real captures or real typography over it.

**Music:** sparse and warm. Nothing driving. The product's whole argument is that it's calm — a frantic track contradicts the pitch.

## What to test first

**Two campaigns, separate budgets, same landing page.** Pooling the personas into one ad set means Meta optimizes toward whoever clicks cheapest — which will be the line leader, who can't buy. You'd get a great CPC and no pipeline, and it would take a month to notice.

**Campaign A — talent leaders.** Ad 1 vs. Ad 2 head to head, quality pain vs. speed pain. Whichever wins tells you which wound is closer to the surface, and that answer should shape the site's hero copy too. Add Ad 4 as a second touch once someone's engaged — don't lead with it. It's a rational argument, and rational arguments convert people who are already uncomfortable, not people who are scrolling.

**Campaign B — line leaders.** Ad 3, with Ad 1 as the control. This is the highest-variance script in the set: the death-spiral framing is the truest thing here and the least said by competitors, but it sits close to the bone. Small budget, and read the comments, not just the CPC.

**Judge the two campaigns on different metrics.** Campaign A on booked walkthroughs. Campaign B on *forwards* — direct traffic, branded search, and "someone on my team sent me this" showing up on sales calls. A hiring manager who sends Ad 3 to their Head of Talent is a warmer intro than any cold click, and it will never appear in Meta's attribution. If you grade Campaign B on its own conversion rate you'll kill the thing that's actually working.
