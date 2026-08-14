import type { LegalSection } from "./legal";

/**
 * The client-facing subscription agreement: what a customer accepts when they
 * subscribe (including via the Stripe checkout terms checkbox). Written to
 * read like a standard SaaS master subscription agreement so it holds up in
 * investor diligence, with the recruiting-specific clauses that matter:
 * active-role slots, no placement guarantee, candidate-data handling, and the
 * client owning all hiring decisions.
 *
 * NOT LEGAL ADVICE. Counsel must review before the first signed client relies
 * on it. Sections most needing a lawyer's eye: 10 (indemnification),
 * 11 (liability cap), and the non-solicitation carve-outs in 8.
 */
export const SUBSCRIPTION_TERMS: LegalSection[] = [
  {
    heading: "The agreement",
    blocks: [
      'This Subscription Agreement (the "Agreement") is between ATALNT LLC ("ATALNT," "we," "us") and the organization identified at signup or checkout (the "Client," "you"). It governs your subscription to the ATALNT AI service.',
      "You accept this Agreement by signing an order form that references it, by completing checkout, or by using the service. The person accepting represents that they have authority to bind the Client. If a separately signed order form or master agreement conflicts with this Agreement, the signed document controls.",
    ],
  },
  {
    heading: "The service",
    blocks: [
      "ATALNT AI is a subscription recruiting service. It combines a software platform with recruiting services delivered by a named recruiter: sourcing and screening candidates, assembling ranked shortlists, coordinating interview scheduling, and communicating offers at your direction.",
      {
        sub: "Active roles",
        body: "Your plan includes a stated number of active roles: searches we are working at the same time. When a role is filled or closed, its slot frees up and you may replace it with another role. Multiple openings filled from a single requisition count as one active role.",
      },
      {
        sub: "Service levels",
        body: "We work each active role continuously during business hours and aim to deliver a first shortlist within one week of a completed intake. Timelines vary with role difficulty, market conditions, and how quickly you provide feedback, and are targets rather than guarantees.",
      },
    ],
  },
  {
    heading: "Fees and payment",
    blocks: [
      "Subscription fees are stated at checkout or on your order form, are billed monthly in advance, and are payable by card or ACH through our payment processor, Stripe. Fees are exclusive of applicable taxes, which you are responsible for, excluding taxes on our income.",
      "There are no per-placement fees. Your monthly fee does not change based on how many people you hire within your plan's active-role allowance.",
      "Promotional trial periods, when offered at signup, are stated at checkout. Billing begins when the trial ends unless you terminate before then.",
      "If an invoice or charge fails and remains unpaid fourteen days after notice, we may suspend work on your searches until payment resumes. Fees already paid are non-refundable except where this Agreement says otherwise or the law requires it.",
    ],
  },
  {
    heading: "Term and termination",
    blocks: [
      "The subscription runs month to month from your start date and renews automatically each billing month until terminated, unless your order form states a different initial term.",
      "Either party may terminate the subscription with written notice, effective at the end of the then-current billing month. We may also terminate or suspend immediately for material breach that goes uncured for fourteen days after notice, or for unlawful use of the service.",
      "On termination, access to the platform ends, we stop work on open searches, and you may export your data as described in the Data section. Sections of this Agreement that by their nature should survive termination (including confidentiality, ownership, limitation of liability, and payment of accrued fees) survive.",
      "Candidates presented to you during the subscription may be hired by you at any time, including after termination, with no additional fee.",
    ],
  },
  {
    heading: "Your responsibilities",
    blocks: [
      "You agree to provide accurate job requirements and lawful hiring criteria, respond to shortlists and scheduling requests in a reasonable time, and use the service only for your own hiring.",
      {
        sub: "Hiring decisions are yours",
        body: "ATALNT sources, screens, and recommends. You make all employment decisions, including interviews, offers, compensation, background checks, work-authorization verification, and compliance with employment and equal-opportunity laws that apply to you. We are not the employer or co-employer of any candidate you hire.",
      },
      {
        sub: "Lawful use",
        body: "You will not use the service to discriminate on any basis prohibited by law, to collect candidate data for purposes unrelated to hiring, or to resell or share candidate information outside your organization.",
      },
    ],
  },
  {
    heading: "Candidate data and privacy",
    blocks: [
      "The service processes candidate personal information: resumes, contact details, work history, screening notes, and interview feedback. Our Privacy Policy describes this processing and forms part of this Agreement.",
      "For candidate data you upload (for example, resumes submitted for screening), you confirm you have the right to share it with us, and we process it on your behalf to deliver the service. For candidates we source, we may retain their information in our network after your subscription ends; records of your searches, feedback, and hires remain available to you for export for ninety days after termination.",
      "Each party will maintain reasonable technical and organizational safeguards. Candidate data is encrypted in transit and at rest.",
    ],
  },
  {
    heading: "Ownership",
    blocks: [
      "ATALNT owns the platform, its software, models, templates, and everything we build to deliver the service, including improvements informed by aggregated, de-identified usage. You own your data: your job descriptions, internal notes, and hiring records.",
      "You grant us a non-exclusive license to use the materials you provide solely to deliver the service. If you give us feedback about the service, we may use it without restriction or obligation.",
    ],
  },
  {
    heading: "Confidentiality and non-solicitation",
    blocks: [
      "Each party will protect the other's non-public information with at least the care it uses for its own, and use it only to perform under this Agreement. This does not restrict information that is public, independently developed, or lawfully received from someone else.",
      "During the subscription and for twelve months after, you agree not to solicit for employment the ATALNT recruiters who worked your searches, and we agree not to solicit your employees, in each case excluding responses to general job postings not directed at that person.",
    ],
  },
  {
    heading: "No placement guarantee",
    blocks: [
      "Recruiting outcomes depend on your market, your requirements, your compensation, and your decisions. We commit effort and process, not outcomes: we do not guarantee that any role will be filled, that any candidate will accept an offer, or that any hire will remain employed. Nothing in our marketing materials, calculators, or estimates modifies this section.",
    ],
  },
  {
    heading: "Warranties and disclaimer",
    blocks: [
      "We warrant that we will provide the service in a professional and workmanlike manner consistent with industry standards. Except for that warranty, the service is provided \"as is,\" and we disclaim all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement, to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "Indemnification",
    blocks: [
      "You will defend and indemnify ATALNT against third-party claims arising from your employment decisions, your violation of employment law, or your misuse of candidate data. We will defend and indemnify you against third-party claims that the platform, as provided by us and used as permitted, infringes their intellectual-property rights.",
      "The indemnified party must give prompt notice, reasonable cooperation, and sole control of the defense to the indemnifying party.",
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      "Neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, or data, even if advised of the possibility.",
      "Each party's total liability arising out of this Agreement is capped at the fees you paid to ATALNT in the twelve months before the event giving rise to the claim. This cap does not apply to your payment obligations, either party's indemnification obligations, or a party's breach of confidentiality.",
    ],
  },
  {
    heading: "General",
    blocks: [
      "This Agreement is governed by the laws of the State of California, and disputes will be resolved exclusively in the state or federal courts located in California.",
      "Neither party may assign this Agreement without the other's consent, except to an affiliate or in connection with a merger or sale of substantially all assets. Neither party is liable for delay caused by events beyond its reasonable control.",
      'We may update this Agreement for future billing months by posting the revised version and giving you notice at least thirty days before it takes effect; continued use after the effective date is acceptance. The version you accepted, together with your order form and our Privacy Policy, is the entire agreement and supersedes prior discussions.',
      "Questions and notices: privacy@atalnt.com, ATALNT LLC.",
    ],
  },
];
