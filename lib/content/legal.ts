/**
 * Legal content, adapted from the policies published on atalnt.com so the two
 * properties stay consistent. Changes made for this site:
 *   - Applies to atalnt.ai and the ATALNT AI platform, not just the corporate site
 *   - Collection channels reflect this site (demo requests, savings
 *     calculator) rather than the resume intake form
 *   - Adds platform account data and client-uploaded candidate data, which the
 *     corporate policy does not cover
 *
 * NOT LEGAL ADVICE. ATALNT's counsel should review before launch, particularly
 * the SMS terms (10DLC registration requires a published policy) and the
 * handling of candidate data uploaded by clients.
 */

export type LegalSection = {
  heading: string;
  blocks: (string | { sub: string; body: string } | { list: string[] })[];
};

export const LEGAL_UPDATED = "August 11, 2026";
export const LEGAL_CONTACT = "privacy@atalnt.com";

export const PRIVACY: LegalSection[] = [
  {
    heading: "Who we are",
    blocks: [
      'ATALNT LLC ("we," "us," or "our") operates atalnt.ai and the ATALNT AI recruiting platform. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit this site or use the platform.',
      "By using this site or submitting your information to us, you agree to the practices described here.",
    ],
  },
  {
    heading: "Information we collect",
    blocks: [
      "We collect personal information that you provide to us through the following channels:",
      {
        sub: "Walkthrough and demo requests",
        body: "When you request a demo or contact us, we collect your name, work email address, company name, and phone number, along with anything else you choose to tell us about your hiring needs.",
      },
      {
        sub: "Savings calculator",
        body: "If you ask us to price your plan from the calculator, we collect the figures you entered along with your contact details so we can follow up with a quote.",
      },
      {
        sub: "Platform accounts",
        body: "If you become a customer, we collect account information for each user, including name, work email, and role, plus the job descriptions, hiring preferences, and feedback you enter while using the product.",
      },
      {
        sub: "Candidate information",
        body: "The platform processes candidate data, including resumes, contact details, work history, and interview notes. This comes from our own sourcing and from resumes our customers upload for screening. Where a customer uploads candidate data, that customer determines how it is used and we process it on their behalf.",
      },
      {
        sub: "Automatically collected information",
        body: "When you visit this site, we may automatically collect technical information including your IP address, browser type, device information, pages visited, referring URL, and the date and time of your visit.",
      },
    ],
  },
  {
    heading: "How we use your information",
    blocks: [
      "We use the information we collect to:",
      {
        list: [
          "Respond to your inquiry and schedule and conduct demos",
          "Prepare and deliver pricing for your account",
          "Provide the ATALNT AI platform, including sourcing, screening, and shortlisting candidates for open roles",
          "Communicate with you about our services by phone, email, or text message",
          "Improve our website, our platform, and the quality of our shortlists",
          "Comply with legal obligations",
          "Detect and prevent fraud or misuse of our services",
        ],
      },
    ],
  },
  {
    heading: "SMS and text messaging",
    blocks: [
      "If you provide a phone number through any form on this site, you may be offered the option to receive text messages from ATALNT.",
      {
        sub: "Your consent",
        body: "By opting in, you expressly consent to receive recurring automated or prerecorded text messages from ATALNT at the phone number you provided. Consent is not a condition of purchasing any goods or services from us.",
      },
      {
        sub: "Message frequency",
        body: "Message frequency varies depending on your interactions with us. Typically you may receive between 1 and 10 messages per month.",
      },
      {
        sub: "Costs",
        body: "Message and data rates may apply depending on your mobile carrier and plan. ATALNT does not charge for text messages, but your carrier's standard messaging rates apply.",
      },
      {
        sub: "Opting out",
        body: "You can opt out at any time by replying STOP to any message. You will receive a single confirmation message, and no further texts will be sent unless you opt in again.",
      },
      {
        sub: "Help",
        body: `For help with text messaging, reply HELP to any message or contact us at ${LEGAL_CONTACT}.`,
      },
      {
        sub: "Carrier disclaimer",
        body: "Carriers are not liable for delayed or undelivered messages.",
      },
    ],
  },
  {
    heading: "Cookies and tracking",
    blocks: [
      "This site may use cookies and similar technologies to enhance your browsing experience, analyze traffic, and understand how visitors interact with the site.",
      "You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Disabling cookies may affect the functionality of parts of this site.",
    ],
  },
  {
    heading: "Third-party services",
    blocks: [
      "We use third-party service providers to help operate our business and deliver our services, including Zoho for scheduling, forms, and customer relationship management, and hosting and analytics providers.",
      "We do not sell your personal information. We share information with service providers only as necessary to perform services on our behalf, and they are required to protect it consistent with this policy.",
    ],
  },
  {
    heading: "Data retention",
    blocks: [
      "We retain personal information for as long as necessary to fulfill the purposes described here, unless a longer period is required or permitted by law.",
      "Inquiry and calculator data is retained for up to 24 months. Candidate data is retained for up to 24 months after last activity, unless earlier deletion is requested.",
      `You may request deletion of your data at any time by contacting ${LEGAL_CONTACT}.`,
    ],
  },
  {
    heading: "Security",
    blocks: [
      "We implement reasonable administrative, technical, and physical safeguards to protect personal information from unauthorized access, disclosure, alteration, or destruction. Candidate data is encrypted in transit and at rest. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your rights under the CCPA",
    blocks: [
      "If you are a California resident, you have the following rights:",
      {
        list: [
          "Right to know: request the categories and specific pieces of personal information we have collected about you, the sources, the business purpose, and the categories of third parties with whom we share it.",
          "Right to delete: request that we delete personal information we collected from you, subject to exceptions permitted by law.",
          "Right to opt out of sale: we do not sell your personal information. If this changes, we will update this policy and provide a way to opt out.",
          "Right to non-discrimination: we will not discriminate against you for exercising any of these rights.",
        ],
      },
      `To exercise any of these rights, contact us at ${LEGAL_CONTACT}. We will respond to verified requests within 45 days as required by law.`,
    ],
  },
  {
    heading: "Children's privacy",
    blocks: [
      `This site and our services are not directed to individuals under 16, and we do not knowingly collect their personal information. If you believe we have, contact us at ${LEGAL_CONTACT}.`,
    ],
  },
  {
    heading: "Changes to this policy",
    blocks: [
      'We may update this policy to reflect changes in our practices or for legal, operational, or regulatory reasons. The updated policy will be posted here with a revised "Last updated" date.',
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      `Questions about this policy or our data practices: ATALNT LLC, ${LEGAL_CONTACT}, atalnt.com.`,
    ],
  },
];

export const TERMS: LegalSection[] = [
  {
    heading: "Agreement to these terms",
    blocks: [
      'Welcome to atalnt.ai, operated by ATALNT LLC ("we," "us," or "our"). These Terms of Service govern your access to and use of this website. By accessing or using it, you agree to be bound by these Terms. If you do not agree, please do not use the site.',
      "Use of the ATALNT AI platform itself is governed by the separate subscription agreement signed with your organization. Where that agreement and these Terms conflict, the subscription agreement controls.",
    ],
  },
  {
    heading: "Our services",
    blocks: [
      "ATALNT AI is a subscription recruiting service that pairs a dedicated account manager with software for sourcing, screening, and shortlisting candidates. This website lets you learn about the service, use our savings calculator, and request a demo.",
    ],
  },
  {
    heading: "Eligibility",
    blocks: [
      "By using this site you represent that you are at least 16 years of age and have the legal capacity to enter into these Terms. If you are using it on behalf of an organization, you represent that you have authority to bind that organization.",
    ],
  },
  {
    heading: "Acceptable use",
    blocks: [
      "You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use of, the site by any third party. You agree not to:",
      {
        list: [
          "Submit false, misleading, or fraudulent information through any form on the site",
          "Upload or transmit viruses, malware, or other harmful code",
          "Attempt to gain unauthorized access to our systems, servers, or networks",
          "Use the site to send unsolicited communications or spam",
          "Scrape, crawl, or use automated tools to extract data from the site without our written permission",
          "Interfere with or disrupt the operation of the site",
          "Use the site in any way that violates applicable local, state, national, or international law",
        ],
      },
    ],
  },
  {
    heading: "Intellectual property",
    blocks: [
      "All content on this site, including text, graphics, logos, images, software, and design elements, is the property of ATALNT LLC or our licensors and is protected by United States and international intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise use our content without prior written consent. The ATALNT name and logo are trademarks of ATALNT LLC.",
    ],
  },
  {
    heading: "Information you submit",
    blocks: [
      "By submitting information through this site, you grant ATALNT LLC a non-exclusive, royalty-free right to use that information for the purposes described in our Privacy Policy, including responding to your inquiry, delivering services, and communicating with you. You are responsible for ensuring the information you submit is accurate and does not violate the rights of any third party.",
    ],
  },
  {
    heading: "SMS terms",
    blocks: [
      "By providing your phone number and opting in to receive text messages from ATALNT, you agree to the terms set out on our SMS Terms page, which forms part of these Terms.",
    ],
  },
  {
    heading: "Savings calculator disclaimer",
    blocks: [
      "The savings calculator is provided to help you estimate potential value. Its results are estimates only and are not guarantees of actual results, savings, or outcomes. Agency fees vary by role and market, and actual results depend on your specific circumstances. ATALNT makes no warranties regarding the accuracy or reliability of the calculator's output. Pricing is confirmed only in a written quote.",
    ],
  },
  {
    heading: "Third-party links and services",
    blocks: [
      "This site may contain links to third-party websites and services, including Zoho for scheduling and forms. These are not controlled by ATALNT, and we are not responsible for their content, privacy practices, or terms. We encourage you to review the terms and privacy policies of any third-party site you visit.",
    ],
  },
  {
    heading: "Disclaimer of warranties",
    blocks: [
      'This site is provided on an "as is" and "as available" basis without warranties of any kind, express or implied. To the fullest extent permitted by law, ATALNT disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted, error-free, or secure.',
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      "To the fullest extent permitted by law, ATALNT LLC and its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to your use of this site. Our total liability for any claim arising from your use of this site shall not exceed the amount you paid to ATALNT, if any, during the 12 months preceding the claim.",
    ],
  },
  {
    heading: "Indemnification",
    blocks: [
      "You agree to indemnify, defend, and hold harmless ATALNT LLC and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable attorneys' fees) arising out of or related to your use of this site, your violation of these Terms, or your violation of the rights of another party.",
    ],
  },
  {
    heading: "Governing law",
    blocks: [
      "These Terms are governed by the laws of the State of California, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms or your use of this site shall be resolved exclusively in the state or federal courts located in California, and you consent to the personal jurisdiction of those courts.",
    ],
  },
  {
    heading: "Changes, severability, and entire agreement",
    blocks: [
      'We may modify these Terms at any time. When we do, we will update the "Last updated" date above. Continued use of the site after changes constitutes acceptance.',
      "If any provision is found unenforceable or invalid, it shall be limited or eliminated to the minimum extent necessary, and the remaining provisions remain in full force.",
      "These Terms, together with our Privacy Policy, constitute the entire agreement between you and ATALNT regarding your use of this website.",
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      `Questions about these Terms: ATALNT LLC, ${LEGAL_CONTACT}, atalnt.com.`,
    ],
  },
];

export const SMS_TERMS: LegalSection[] = [
  {
    heading: "Consent",
    blocks: [
      "By providing your phone number and opting in to receive text messages from ATALNT, you consent to receive recurring automated or prerecorded text messages from ATALNT at the number you provided. Consent is not a condition of any purchase or service.",
    ],
  },
  {
    heading: "Types of messages",
    blocks: [
      "Messages may relate to demo scheduling, pricing follow-ups, service updates, interview scheduling, and other communications about our recruiting services.",
    ],
  },
  {
    heading: "Message frequency",
    blocks: [
      "Message frequency varies. You may receive between 1 and 10 messages per month.",
    ],
  },
  {
    heading: "Costs",
    blocks: [
      "Message and data rates may apply. ATALNT does not charge for text messages, but your carrier's standard rates apply.",
    ],
  },
  {
    heading: "Opting out",
    blocks: [
      "To opt out, reply STOP to any text message from ATALNT. You will receive a single confirmation message and will no longer receive text messages from us unless you opt in again.",
    ],
  },
  {
    heading: "Help",
    blocks: [`For help, reply HELP or email ${LEGAL_CONTACT}.`],
  },
  {
    heading: "Carrier disclaimer",
    blocks: ["Carriers are not liable for delayed or undelivered messages."],
  },
  {
    heading: "Changes",
    blocks: [
      "We may revise these SMS terms at any time. Continued receipt of messages after changes constitutes acceptance of the updated terms.",
    ],
  },
];
