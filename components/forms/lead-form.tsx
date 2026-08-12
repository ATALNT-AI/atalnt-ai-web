"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { computeRoi, formatUsd } from "@/lib/roi";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-sm border border-line-input bg-surface px-3.5 py-3 text-[15px] text-body " +
  "placeholder:text-placeholder focus:border-line-hover focus:outline-none";

const LABEL = "block text-[13.5px] font-medium text-secondary";

export function LeadForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Carried over from the savings calculator so the quote request arrives with
  // the numbers the visitor already ran.
  const roles = Number(params.get("roles")) || null;
  const hires = Number(params.get("hires")) || null;
  const salary = Number(params.get("salary")) || null;
  const fee = Number(params.get("fee")) || null;
  const hasCalc = Boolean(roles && hires && salary && fee);

  const roi = hasCalc
    ? computeRoi({
        activeRoles: roles!,
        hiresPerYear: hires!,
        averageSalary: salary!,
        agencyFeePct: fee!,
      })
    : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    // Honeypot: bots fill hidden fields, humans do not.
    if (form.get("website")) {
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          phone: form.get("phone"),
          openRoles: form.get("openRoles"),
          message: form.get("message"),
          smsConsent: form.get("smsConsent") === "on",
          calculator: hasCalc
            ? {
                roles,
                hires,
                salary,
                feePct: fee,
                plan: roi?.plan.name,
                contingentAnnual: roi?.contingentAnnual,
              }
            : null,
          source: "atalnt.ai/demo",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-hero border border-success-line bg-success-tint p-8">
        <p className="font-display text-[26px] text-success">
          Thanks. We&rsquo;ve got it.
        </p>
        <p className="mt-3 text-[15.5px] leading-[1.7] text-body">
          One of us will reach out within one business day to set up a time.
          If it&rsquo;s urgent, email{" "}
          <a
            href="mailto:hello@atalnt.com"
            className="font-medium underline underline-offset-4"
          >
            hello@atalnt.com
          </a>{" "}
          and we&rsquo;ll move faster.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {roi && (
        <div className="rounded-card border border-gold-line bg-gold-tint p-4">
          <p className="text-[13px] leading-[1.6] text-gold-deep">
            We&rsquo;ll price this against the numbers you ran:{" "}
            <strong className="font-semibold">
              {roles} {roles === 1 ? "role" : "roles"} at once
            </strong>{" "}
            ({roi.plan.name} plan),{" "}
            <strong className="font-semibold">{hires} hires a year</strong> at{" "}
            <strong className="font-semibold">{formatUsd(salary!)}</strong> and
            a <strong className="font-semibold">{fee}%</strong> fee, which is{" "}
            <strong className="font-semibold">
              {formatUsd(roi.contingentAnnual)}
            </strong>{" "}
            a year in agency fees today.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={`mt-2 ${FIELD}`} />
        </div>
        <div>
          <label htmlFor="company" className={LABEL}>
            Company
          </label>
          <input id="company" name="company" required autoComplete="organization" className={`mt-2 ${FIELD}`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={LABEL}>
            Work email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`mt-2 ${FIELD}`} />
        </div>
        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={`mt-2 ${FIELD}`} />
        </div>
      </div>

      <div>
        <label htmlFor="openRoles" className={LABEL}>
          How many roles are open right now?
        </label>
        <select id="openRoles" name="openRoles" defaultValue="" className={`mt-2 ${FIELD}`}>
          <option value="" disabled>
            Select one
          </option>
          <option>1 to 4</option>
          <option>5 to 9</option>
          <option>10 to 19</option>
          <option>20 or more</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Anything we should know? <span className="text-muted">Optional</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="The roles you're struggling to fill, your timeline, what you've tried already."
          className={`mt-2 resize-y ${FIELD}`}
        />
      </div>

      <label className="flex items-start gap-3 text-[13px] leading-[1.6] text-secondary">
        <input type="checkbox" name="smsConsent" className="mt-1 size-4 accent-[var(--color-gold)]" />
        <span>
          Text me about scheduling. Message frequency varies, message and data
          rates may apply, reply STOP to opt out. See our{" "}
          <a href="/sms-terms" className="underline underline-offset-4 hover:text-ink">
            SMS terms
          </a>
          .
        </span>
      </label>

      {/* Honeypot, hidden from people and screen readers alike. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Leave this blank</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-card border border-decline-line bg-decline-tint px-4 py-3 text-[14px] text-decline">
          {error} You can also email{" "}
          <a href="mailto:hello@atalnt.com" className="font-medium underline">
            hello@atalnt.com
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Book a demo"}
        </Button>
        <p className="text-[12.5px] leading-[1.5] text-muted">
          No commitment. We reply within one business day.
        </p>
      </div>

      <p className="text-[12px] leading-[1.6] text-muted">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-ink">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
