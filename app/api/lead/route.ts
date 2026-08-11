import { NextResponse } from "next/server";

/**
 * Lead intake.
 *
 * Forwards to Zoho so leads land in the same CRM as atalnt.com. Configure:
 *
 *   ZOHO_LEAD_WEBHOOK_URL   Zoho Flow / CRM webhook the payload is POSTed to
 *   ZOHO_LEAD_TOKEN         Optional bearer token, if the webhook requires one
 *   LEAD_FALLBACK_EMAIL     Optional, only used for the log line below
 *
 * If the webhook is not configured, the request is logged and accepted rather
 * than dropped, so a misconfiguration never silently loses a lead. Check the
 * deployment logs for entries tagged [lead] until Zoho is wired up.
 */

type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  openRoles?: string;
  message?: string;
  smsConsent?: boolean;
  calculator?: Record<string, unknown> | null;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let lead: LeadPayload;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!lead.name?.trim() || !lead.company?.trim()) {
    return NextResponse.json(
      { error: "Name and company are required." },
      { status: 400 }
    );
  }
  if (!lead.email || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json(
      { error: "Please enter a valid work email." },
      { status: 400 }
    );
  }

  const record = {
    ...lead,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const webhook = process.env.ZOHO_LEAD_WEBHOOK_URL;

  if (!webhook) {
    // Not configured yet. Accept and log loudly rather than 500 at a visitor
    // who did nothing wrong.
    console.warn(
      "[lead] ZOHO_LEAD_WEBHOOK_URL is not set. Lead captured in logs only:",
      JSON.stringify(record)
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ZOHO_LEAD_TOKEN
          ? { Authorization: `Bearer ${process.env.ZOHO_LEAD_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(record),
    });

    if (!res.ok) {
      console.error("[lead] Zoho rejected the lead:", res.status, JSON.stringify(record));
      // The visitor still gets a success state; we have the lead in logs.
      return NextResponse.json({ ok: true, delivered: false });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] Delivery failed:", err, JSON.stringify(record));
    return NextResponse.json({ ok: true, delivered: false });
  }
}
