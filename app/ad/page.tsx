"use client";

/**
 * The 58-second promo ad, built as an animated 1080×1920 page so it can be
 * screen-recorded at full resolution. Every value here comes from the real
 * design system, so the capture is pixel-exact to the brand rather than a
 * generator's approximation of it.
 *
 * Script: promo-ad-script.md. Timings below match that document's table.
 * Press Space to play/pause, R to restart, H to hide the controls before you
 * record. Add ?clean=1 to load with the controls already hidden.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------- tokens */

const C = {
  ink: "#15130e",
  inkRaised: "#26221a",
  inkLine: "#2a271f",
  bone: "#f7f4ec",
  bone50: "#fcfaf4",
  white: "#ffffff",
  body: "#3a352a",
  secondary: "#6b6452",
  muted: "#938b79",
  line: "#e7e0d0",
  lineInner: "#f0eadc",
  gold: "#b5903f",
  goldBright: "#c8a24c",
  goldInk: "#9a7a2e",
  goldDeep: "#7a5e1f",
  decline: "#a23b33",
  declineMid: "#c9897f",
} as const;

const SERIF = "var(--font-newsreader), Georgia, serif";
const SANS = "var(--font-hanken), system-ui, sans-serif";

const W = 1080;
const H = 1920;
const DURATION = 60;

/**
 * Audio. Drop files at these paths and they sync to the timeline automatically:
 *   public/ad-audio/vo.mp3     — the voiceover
 *   public/ad-audio/music.mp3  — the music bed
 * Neither is required; missing files are reported in the control bar.
 *
 * Music is silent until the turn and then sits well under the voice. That
 * silence across the whole problem half is the point, not an oversight —
 * see the production notes in promo-ad-script.md.
 */
const MUSIC_IN = 24;
const MUSIC_FADE = 1.6;
const MUSIC_BED = 0.26;
const AUDIO = { vo: "/ad-audio/vo.mp3", music: "/ad-audio/music.mp3" };

const musicGain = (t: number) =>
  t < MUSIC_IN ? 0 : Math.min(1, (t - MUSIC_IN) / MUSIC_FADE) * MUSIC_BED;

/**
 * The voiceover, cued to the timeline. Until a recorded vo.mp3 exists these
 * are spoken by the browser so the whole ad can be heard end to end — timing,
 * pacing, and whether a line is too long for its slot.
 *
 * A synthetic read is a timing tool, not a performance. Record a human before
 * this ships; the pauses are half the ad.
 */
const VO_CUES: { at: number; text: string }[] = [
  { at: 0.8, text: "Four hundred and twelve applicants." },
  { at: 3.4, text: "Two worth calling." },
  { at: 6.4, text: "You found the right one on Tuesday." },
  { at: 9.6, text: "Nine days of scheduling later, she'd taken another offer." },
  { at: 15.4, text: "And eleven more roles behind her." },
  {
    at: 18.2,
    text: "Three people are covering one of those seats, which is why nobody has time to fill it.",
  },
  { at: 24.6, text: "That's not a hiring problem. That's a capacity problem." },
  { at: 30.4, text: "ATALNT AI. AI brings the scale. Humans bring the judgment." },
  {
    at: 34.4,
    text: "Our agents work thirty plus job boards, and cold outreach the people who aren't applying.",
  },
  { at: 38.3, text: "Then an in-house recruiter screens every one by hand." },
  {
    at: 41.4,
    text: "They confirm interviews directly with the candidate. You share when you're free.",
  },
  { at: 45.0, text: "No links, no chasing. No nine days." },
  { at: 48.4, text: "Do that for all eleven roles. The price doesn't move." },
  { at: 51.6, text: "One flat monthly fee, not twenty percent per hire." },
  { at: 55.6, text: "The future of recruiting isn't AI versus people. It's both." },
];

/** Index of the last cue at or before `t`. */
const cueIndexAt = (t: number) => {
  let idx = -1;
  for (let i = 0; i < VO_CUES.length; i++) if (t >= VO_CUES[i].at) idx = i;
  return idx;
};

/* ------------------------------------------------------------- utilities */

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
/** Ease-out cubic — everything decelerates into place. */
const ease = (n: number) => 1 - Math.pow(1 - clamp01(n), 3);

/** Progress through a window, 0→1. */
function ramp(t: number, start: number, dur: number) {
  return ease((t - start) / dur);
}

/* -------------------------------------------------------------- elements */

/** Fade + rise. `at` is the local time it begins. */
function In({
  at,
  t,
  dur = 0.6,
  y = 28,
  children,
  style,
}: {
  at: number;
  t: number;
  dur?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const p = ramp(t, at, dur);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Small uppercase label. */
function Label({
  children,
  tone = "light",
  style,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        fontFamily: SANS,
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:
          tone === "dark" ? C.secondary : tone === "gold" ? C.gold : "#9c937f",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** The gold radial wash behind dark scenes. */
function Glow({
  x = "50%",
  y = "42%",
  size = 1100,
  opacity = 0.5,
}: {
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, rgba(181,144,63,${opacity}) 0%, rgba(181,144,63,0.10) 42%, rgba(181,144,63,0) 68%)`,
        pointerEvents: "none",
      }}
    />
  );
}

/** Two-line serif statement on dark — the ad's recurring title device. */
function Statement({
  t,
  lines,
  at = 0,
}: {
  t: number;
  lines: string[];
  at?: number;
}) {
  return (
    <div style={{ textAlign: "center", padding: "0 40px" }}>
      {lines.map((l, i) => (
        <In key={l} at={at + i * 0.5} t={t} dur={0.75} y={22}>
          <p
            style={{
              fontFamily: SERIF,
              // Sized so the longest line in the ad — "Humans bring the
              // judgment." — sets on one line at 1080 wide. Statements that
              // wrap lose all their weight.
              fontSize: 74,
              whiteSpace: "nowrap",
              lineHeight: 1.28,
              letterSpacing: "-0.02em",
              color: i === 0 ? "#efe9dc" : C.goldBright,
              margin: 0,
            }}
          >
            {l}
          </p>
        </In>
      ))}
    </div>
  );
}

function Diamond({ size = 16, color = C.gold }: { size?: number; color?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        background: color,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

/* ------------------------------------------------------- candidate cards */

type Cand = {
  initials: string;
  avatar: string;
  name: string;
  role: string;
  pitch: string;
  skills: string[];
  match: number;
};

const CANDIDATES: Cand[] = [
  {
    initials: "EV",
    avatar: "#E7DCC2",
    name: "Elena V.",
    role: "Senior Account Executive · 8 yrs",
    pitch: "Built a $4M book across mid-market SaaS.",
    skills: ["Enterprise Close", "Salesforce", "MEDDIC"],
    match: 94,
  },
  {
    initials: "MC",
    avatar: "#DCE3D2",
    name: "Marcus C.",
    role: "Operations Manager · 6 yrs",
    pitch: "Ran multi-site operations for a top-25 distributor.",
    skills: ["Process Design", "NetSuite", "Vendor Mgmt"],
    match: 89,
  },
  {
    initials: "DA",
    avatar: "#E2D8E0",
    name: "Dana A.",
    role: "Customer Success Manager · 5 yrs",
    pitch: "Held 118% net revenue retention across 60 accounts.",
    skills: ["Retention", "Gainsight", "QBR Strategy"],
    match: 86,
  },
];

function CandidateCard({
  c,
  dim = false,
  stamped = false,
  compact = false,
}: {
  c: Cand;
  dim?: boolean;
  stamped?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: C.white,
        border: `1px solid ${C.lineInner}`,
        borderRadius: 22,
        padding: compact ? 26 : 34,
        boxShadow: "0 18px 42px -20px rgba(58,53,42,0.30)",
        filter: dim ? "grayscale(1) brightness(0.94)" : "none",
        opacity: dim ? 0.55 : 1,
        transition: "filter 500ms ease, opacity 500ms ease",
      }}
    >
      <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
        <div
          style={{
            width: compact ? 62 : 76,
            height: compact ? 62 : 76,
            borderRadius: 999,
            background: c.avatar,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: compact ? 22 : 26,
            color: C.body,
            flexShrink: 0,
          }}
        >
          {c.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            <p
              style={{
                fontFamily: SANS,
                fontSize: compact ? 28 : 34,
                fontWeight: 600,
                color: C.ink,
                margin: 0,
              }}
            >
              {c.name}
            </p>
            <span style={{ whiteSpace: "nowrap" }}>
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: compact ? 36 : 46,
                  color: C.goldInk,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {c.match}%
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: C.muted,
                  marginLeft: 8,
                }}
              >
                MATCH
              </span>
            </span>
          </div>

          <p
            style={{
              fontFamily: SANS,
              fontSize: compact ? 21 : 24,
              color: C.secondary,
              margin: "6px 0 0",
            }}
          >
            {c.role}
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: compact ? 22 : 25,
              lineHeight: 1.5,
              color: C.body,
              margin: "14px 0 0",
            }}
          >
            {c.pitch}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            {c.skills.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: SANS,
                  fontSize: 18,
                  fontWeight: 500,
                  color: C.secondary,
                  border: `1px solid ${C.line}`,
                  background: C.bone50,
                  borderRadius: 999,
                  padding: "8px 16px",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {stamped && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.decline,
              border: `3px solid ${C.decline}`,
              borderRadius: 10,
              padding: "14px 26px",
              transform: "rotate(-7deg)",
              background: "rgba(255,255,255,0.86)",
            }}
          >
            Accepted elsewhere
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- req board */

const ROLES = [
  { title: "Operations Manager", days: 91 },
  { title: "Senior Account Executive", days: 74 },
  { title: "Staff Accountant", days: 68 },
  { title: "Customer Success Manager", days: 55 },
  { title: "Implementation Lead", days: 47 },
  { title: "Sales Development Rep", days: 41 },
  { title: "Financial Analyst", days: 33 },
  { title: "Product Designer", days: 28 },
  { title: "Support Engineer", days: 21 },
  { title: "Office Manager", days: 14 },
  { title: "Controller", days: 9 },
];

function ReqBoard({
  t,
  revealAt = 0,
  ready = false,
}: {
  t: number;
  revealAt?: number;
  ready?: boolean;
}) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.line}`,
        borderRadius: 26,
        padding: "34px 40px",
        boxShadow: "0 22px 50px -26px rgba(58,53,42,0.32)",
      }}
    >
      <Label tone="dark" style={{ fontSize: 22, marginBottom: 8 }}>
        Open roles
      </Label>

      {ROLES.map((r, i) => {
        const p = ramp(t, revealAt + i * 0.055, 0.4);
        const hot = !ready && r.days >= 55;
        return (
          <div
            key={r.title}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              padding: "19px 0",
              borderTop: i === 0 ? "none" : `1px solid ${C.lineInner}`,
              opacity: p,
              transform: `translateX(${(1 - p) * -14}px)`,
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontSize: 27,
                fontWeight: 500,
                color: hot ? C.decline : C.body,
              }}
            >
              {r.title}
            </span>

            {ready ? (
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.goldDeep,
                  border: `1px solid ${C.gold}`,
                  background: "#fbf7ec",
                  borderRadius: 999,
                  padding: "7px 18px",
                  whiteSpace: "nowrap",
                }}
              >
                Ready
              </span>
            ) : (
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 24,
                  fontWeight: 600,
                  color: hot ? C.declineMid : C.muted,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                {r.days} days
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- scenes */

/** 0–6 · 412 applicants → 2 worth calling */
function S1({ t }: { t: number }) {
  const count = Math.round(ramp(t, 0.15, 1.1) * 412);
  return (
    <Dark>
      <Glow y="38%" opacity={0.28} />
      <Center>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: 300,
            lineHeight: 1,
            color: C.goldBright,
            margin: 0,
            fontVariantNumeric: "tabular-nums",
            opacity: ramp(t, 0.1, 0.4),
          }}
        >
          {count}
        </p>
        <In at={1.2} t={t} dur={0.5}>
          <Label style={{ marginTop: 26 }}>Applicants</Label>
        </In>

        <In at={2.9} t={t} dur={0.7}>
          <div style={{ marginTop: 130 }}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 300,
                lineHeight: 1,
                color: "#efe9dc",
                margin: 0,
              }}
            >
              2
            </p>
            <Label style={{ marginTop: 26 }}>Worth calling</Label>
          </div>
        </In>
      </Center>
    </Dark>
  );
}

/** 6–15 · found her → calendar friction → lost her */
function S2({ t }: { t: number }) {
  const day = Math.min(9, Math.max(1, Math.round(ramp(t, 3.0, 2.6) * 9)));
  const showClutter = t > 2.9 && t < 6.4;
  const lost = t > 6.5;

  return (
    <Light>
      <Center pad={70}>
        <In at={0.15} t={t} dur={0.7}>
          <Label tone="dark" style={{ marginBottom: 34, textAlign: "center" }}>
            Tuesday
          </Label>
        </In>

        <In at={0.3} t={t} dur={0.8}>
          <div style={{ width: 860 }}>
            <CandidateCard
              c={{ ...CANDIDATES[0], match: 96 }}
              dim={lost}
              stamped={lost}
            />
          </div>
        </In>

        {showClutter && (
          <div style={{ marginTop: 56, width: 860 }}>
            {[
              "Does Thursday work?",
              "Sorry, can we move it?",
              "Checking with the panel.",
            ].map((msg, i) => (
              <In key={msg} at={3.1 + i * 0.42} t={t} dur={0.35} y={14}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.line}`,
                    borderRadius: 16,
                    padding: "20px 26px",
                    marginBottom: 14,
                    marginLeft: i * 46,
                    fontFamily: SANS,
                    fontSize: 26,
                    color: C.secondary,
                    boxShadow: "0 10px 24px -14px rgba(58,53,42,0.3)",
                  }}
                >
                  {msg}
                </div>
              </In>
            ))}
            <In at={3.4} t={t} dur={0.4}>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 96,
                  color: C.declineMid,
                  margin: "18px 0 0",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {day} days
              </p>
            </In>
          </div>
        )}

        {lost && (
          <In at={6.9} t={t} dur={0.6}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 60,
                color: C.body,
                marginTop: 70,
                textAlign: "center",
              }}
            >
              Nine days later, she was gone.
            </p>
          </In>
        )}
      </Center>
    </Light>
  );
}

/** 15–24 · eleven more roles, three people covering one */
function S3({ t }: { t: number }) {
  return (
    <Light>
      <Center pad={70}>
        <In at={0.1} t={t} dur={0.6}>
          <div style={{ width: 900 }}>
            <ReqBoard t={t} revealAt={0.25} />
          </div>
        </In>

        <In at={4.6} t={t} dur={0.7}>
          <div
            style={{
              marginTop: 46,
              width: 900,
              background: C.ink,
              borderRadius: 22,
              padding: "34px 40px",
              boxShadow: "0 22px 50px -26px rgba(21,19,14,0.6)",
            }}
          >
            <Label tone="gold" style={{ fontSize: 21 }}>
              Operations Manager · covering
            </Label>
            <div style={{ display: "flex", gap: 18, marginTop: 24 }}>
              {["JL", "SM", "TW"].map((n, i) => (
                <In key={n} at={5.0 + i * 0.3} t={t} dur={0.4} y={10}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: C.inkRaised,
                      border: `1px solid ${C.inkLine}`,
                      borderRadius: 999,
                      padding: "12px 22px 12px 12px",
                    }}
                  >
                    <span
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        background: "#3a352a",
                        color: C.goldBright,
                        fontFamily: SANS,
                        fontWeight: 700,
                        fontSize: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {n}
                    </span>
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: 22,
                        color: "#cdc5b4",
                      }}
                    >
                      covering
                    </span>
                  </div>
                </In>
              ))}
            </div>
          </div>
        </In>
      </Center>
    </Light>
  );
}

/** 24–30 · the turn */
function S4({ t }: { t: number }) {
  return (
    <Dark>
      <Glow opacity={0.4} />
      <Center>
        <Statement
          t={t}
          at={0.25}
          lines={["Not a hiring problem.", "A capacity problem."]}
        />
      </Center>
    </Dark>
  );
}

/** 30–41 · the model, 30+ boards, passive outreach, the shortlist */
function S5({ t }: { t: number }) {
  const boards = Math.round(ramp(t, 3.5, 1.2) * 30);
  const phase = t < 3.2 ? 0 : t < 6.6 ? 1 : 2;

  return (
    <>
      {phase === 0 && (
        <Dark>
          <Glow opacity={0.45} />
          <Center>
            <In at={0.1} t={t} dur={0.6}>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 84,
                  letterSpacing: "0.06em",
                  color: "#efe9dc",
                  margin: "0 0 70px",
                }}
              >
                ATALNT AI
              </p>
            </In>
            <Statement
              t={t}
              at={0.9}
              lines={["AI brings the scale.", "Humans bring the judgment."]}
            />
          </Center>
        </Dark>
      )}

      {phase === 1 && (
        <Dark>
          <Glow opacity={0.34} />
          <Center>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 260,
                lineHeight: 1,
                color: C.goldBright,
                margin: 0,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {boards}+
            </p>
            <Label style={{ marginTop: 22 }}>Job boards</Label>

            <In at={5.0} t={t} dur={0.7}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 76,
                  justifyContent: "center",
                }}
              >
                {["Email", "Voice", "Text"].map((ch) => (
                  <span
                    key={ch}
                    style={{
                      fontFamily: SANS,
                      fontSize: 24,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "#cdc5b4",
                      border: `1px solid ${C.inkLine}`,
                      background: C.inkRaised,
                      borderRadius: 999,
                      padding: "14px 30px",
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </In>

            <In at={5.6} t={t} dur={0.8}>
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 62,
                  color: C.goldBright,
                  marginTop: 60,
                  textAlign: "center",
                }}
              >
                the ones who aren&rsquo;t applying
              </p>
            </In>
          </Center>
        </Dark>
      )}

      {phase === 2 && (
        <Light>
          <Center pad={70}>
            <div style={{ width: 900 }}>
              {CANDIDATES.map((c, i) => (
                <In key={c.name} at={6.8 + i * 0.28} t={t} dur={0.55}>
                  <div style={{ marginBottom: 22 }}>
                    <CandidateCard c={c} compact />
                  </div>
                </In>
              ))}
            </div>

            <In at={8.1} t={t} dur={0.7}>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 66,
                  color: C.ink,
                  marginTop: 44,
                  textAlign: "center",
                }}
              >
                3 people you&rsquo;d actually call.
              </p>
            </In>
          </Center>
        </Light>
      )}
    </>
  );
}

/** 41–48 · the recruiter closes the speed loop */
function S6({ t }: { t: number }) {
  const booked = t > 3.6;
  return (
    <Light>
      <Center pad={70}>
        <In at={0.1} t={t} dur={0.7}>
          <div
            style={{
              width: 860,
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 24,
              padding: 36,
              boxShadow: "0 20px 46px -24px rgba(58,53,42,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span
              style={{
                width: 78,
                height: 78,
                borderRadius: 999,
                background: C.ink,
                color: C.goldBright,
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              AR
            </span>
            <div>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 32,
                  fontWeight: 600,
                  color: C.ink,
                  margin: 0,
                }}
              >
                Alex Rivera
              </p>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 21,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.goldDeep,
                  margin: "8px 0 0",
                }}
              >
                Your recruiter
              </p>
            </div>
          </div>
        </In>

        <In at={1.5} t={t} dur={0.7}>
          <div style={{ marginTop: 44, width: 860 }}>
            <Label tone="dark" style={{ fontSize: 21, marginBottom: 18 }}>
              You share when you&rsquo;re free
            </Label>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {["Tue 10:00", "Tue 14:00", "Wed 14:00", "Thu 09:30"].map((s, i) => (
                <In key={s} at={1.7 + i * 0.16} t={t} dur={0.35} y={10}>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: 26,
                      fontWeight: 500,
                      color: booked && i === 2 ? C.white : C.body,
                      background: booked && i === 2 ? C.goldInk : C.white,
                      border: `1px solid ${booked && i === 2 ? C.goldInk : C.line}`,
                      borderRadius: 14,
                      padding: "18px 28px",
                      transition: "background 400ms ease, color 400ms ease",
                    }}
                  >
                    {s}
                  </span>
                </In>
              ))}
            </div>
          </div>
        </In>

        {booked && (
          <In at={3.8} t={t} dur={0.6}>
            <div
              style={{
                marginTop: 52,
                width: 860,
                background: C.ink,
                borderRadius: 22,
                padding: "34px 40px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Diamond size={20} color={C.goldBright} />
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 52,
                  color: "#efe9dc",
                  margin: 0,
                }}
              >
                Booked · Wednesday 2:00pm
              </p>
            </div>
          </In>
        )}

        <In at={5.0} t={t} dur={0.7}>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 34,
              color: C.secondary,
              marginTop: 46,
              textAlign: "center",
            }}
          >
            No links. No chasing. No nine days.
          </p>
        </In>
      </Center>
    </Light>
  );
}

/** 48–55 · every role ready, one flat price */
function S7({ t }: { t: number }) {
  const collapse = t > 4.2;
  return (
    <Light>
      <Center pad={70}>
        {!collapse && (
          <In at={0.1} t={t} dur={0.6}>
            <div style={{ width: 900 }}>
              <ReqBoard t={t} revealAt={0.2} ready />
            </div>
          </In>
        )}

        {collapse && (
          <In at={4.4} t={t} dur={0.8}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  height: 1,
                  width: 620,
                  margin: "0 auto 54px",
                  backgroundImage: `repeating-linear-gradient(90deg, ${C.line} 0 8px, transparent 8px 16px)`,
                }}
              />
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 104,
                  lineHeight: 1.1,
                  color: C.ink,
                  margin: 0,
                }}
              >
                one flat
                <br />
                monthly price
              </p>
              <div
                style={{
                  height: 1,
                  width: 620,
                  margin: "54px auto 0",
                  backgroundImage: `repeating-linear-gradient(90deg, ${C.line} 0 8px, transparent 8px 16px)`,
                }}
              />
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 32,
                  color: C.secondary,
                  marginTop: 46,
                }}
              >
                Not 20% every time someone signs.
              </p>
            </div>
          </In>
        )}
      </Center>
    </Light>
  );
}

/** 55–60 · close */
function S8({ t }: { t: number }) {
  return (
    <Dark>
      <Glow opacity={0.5} />
      <Center>
        <Statement
          t={t}
          at={0.15}
          lines={["Not AI versus people.", "AI and people."]}
        />

        <In at={2.2} t={t} dur={0.8}>
          <div style={{ textAlign: "center", marginTop: 120 }}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 86,
                letterSpacing: "0.06em",
                color: "#efe9dc",
                margin: 0,
              }}
            >
              ATALNT AI
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                marginTop: 30,
              }}
            >
              <Diamond size={12} />
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 28,
                  color: "#a89f8c",
                  margin: 0,
                }}
              >
                Sourced candidate list within a week · atalnt.ai
              </p>
              <Diamond size={12} />
            </div>
          </div>
        </In>
      </Center>
    </Dark>
  );
}

/* ------------------------------------------------------------ containers */

function Dark({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.ink,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Light({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.bone,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Center({
  children,
  pad = 90,
}: {
  children: React.ReactNode;
  pad?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: `0 ${pad}px`,
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- timeline */

const SCENES = [
  { at: 0, end: 6, C: S1, name: "Pain 1 · 412 applicants" },
  { at: 6, end: 15, C: S2, name: "Pain 2 · nine days" },
  { at: 15, end: 24, C: S3, name: "Pain 3 · eleven roles" },
  { at: 24, end: 30, C: S4, name: "The turn" },
  { at: 30, end: 41, C: S5, name: "Solution 1 · scale + judgment" },
  { at: 41, end: 48, C: S6, name: "Solution 2 · speed" },
  { at: 48, end: 55, C: S7, name: "Solution 3 · the model" },
  { at: 55, end: 60, C: S8, name: "Close" },
];

/* ------------------------------------------------------------------ page */

export default function AdPage() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [chrome, setChrome] = useState(true);
  const [scale, setScale] = useState(0.4);
  const raf = useRef<number | null>(null);
  /** performance.now() corresponding to t = 0 for the current play run. */
  const last = useRef<number | null>(null);
  /** Latest t, readable from effects without re-subscribing them. */
  const tRef = useRef(0);
  tRef.current = t;

  /* ------------------------------------------------------------- audio */

  const [sound, setSound] = useState(false);
  const [pad, setPad] = useState(true);
  const [speak, setSpeak] = useState(true);
  /**
   * Tracks which tracks actually loaded. Deliberately optimistic in the safe
   * direction: we assume there is NO file until one reports it can play, so a
   * missing track falls back to the spoken voice and the scratch pad rather
   * than silently arming nothing and playing silence.
   */
  const [loaded, setLoaded] = useState<string[]>([]);
  const lastCue = useRef(-1);
  const voRef = useRef<HTMLAudioElement | null>(null);
  const musRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const padRef = useRef<ReturnType<typeof makePad> | null>(null);

  const noteLoaded = useCallback((name: string, ok: boolean) => {
    setLoaded((l) =>
      ok ? (l.includes(name) ? l : [...l, name]) : l.filter((x) => x !== name)
    );
  }, []);

  const hasMusicFile = loaded.includes("music.mp3");
  const hasVoFile = loaded.includes("vo.mp3");
  const speaking = speak && !hasVoFile;

  /** Stop any in-flight utterance and re-point the cue cursor at `to`. */
  const resetSpeech = useCallback((to: number) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    lastCue.current = cueIndexAt(to);
  }, []);

  // Speak each line as the clock crosses its cue.
  useEffect(() => {
    if (!sound || !speaking || !playing) return;
    if (!("speechSynthesis" in window)) return;

    const idx = cueIndexAt(t);
    if (idx <= lastCue.current) return;
    lastCue.current = idx;

    // Only voice a cue we've just crossed — after a scrub, skip the backlog.
    if (t - VO_CUES[idx].at > 0.8) return;

    const u = new SpeechSynthesisUtterance(VO_CUES[idx].text);
    u.rate = 1.02;
    u.pitch = 0.95;
    u.volume = 1;
    const preferred = window.speechSynthesis
      .getVoices()
      .find((v) => /en-US|en_GB|en-GB/.test(v.lang) && /Google|Samantha|Daniel/.test(v.name));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  }, [t, sound, speaking, playing]);

  // Never leave a voice talking over a paused frame.
  useEffect(() => {
    if ((!playing || !sound) && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [playing, sound]);

  // The scratch pad only exists while sound is on and no real track is loaded.
  useEffect(() => {
    if (!sound || !pad || hasMusicFile) {
      padRef.current?.stop();
      padRef.current = null;
      return;
    }
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    void ctx.resume();
    padRef.current = makePad(ctx);
    return () => {
      padRef.current?.stop();
      padRef.current = null;
    };
  }, [sound, pad, hasMusicFile]);

  // Keep both tracks locked to the master clock, including across scrubs.
  useEffect(() => {
    const els = [voRef.current, musRef.current];
    for (const el of els) {
      if (!el) continue;
      if (!sound) {
        el.pause();
        continue;
      }
      if (Math.abs(el.currentTime - t) > 0.16) el.currentTime = t;
      if (playing && el.paused) void el.play().catch(() => {});
      if (!playing && !el.paused) el.pause();
    }
    if (musRef.current) musRef.current.volume = musicGain(t);
    padRef.current?.setGain(playing && sound ? musicGain(t) : 0);
  }, [t, playing, sound]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("clean")) {
      setChrome(false);
    }
  }, []);

  // Fit the 1080×1920 stage to the viewport.
  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / W, window.innerHeight / H) * 0.94);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  /**
   * The clock is anchored to wall time rather than accumulated frame deltas,
   * and ticks from BOTH requestAnimationFrame and an interval.
   *
   * Browsers throttle rAF hard in a background or occluded tab — sometimes to
   * nothing at all — which froze playback entirely. With a wall-clock anchor
   * the time stays correct no matter how rarely a tick lands, and the interval
   * guarantees ticks keep landing. rAF still drives smoothness when the tab is
   * visible; the interval is only a floor.
   */
  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    last.current = performance.now() - tRef.current * 1000;

    const tick = () => {
      if (last.current === null) return;
      const next = (performance.now() - last.current) / 1000;
      setT(next >= DURATION ? DURATION : next);
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    const floor = window.setInterval(tick, 100);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.clearInterval(floor);
    };
  }, [playing]);

  useEffect(() => {
    if (t >= DURATION) setPlaying(false);
  }, [t]);

  const restart = useCallback(() => {
    setT(0);
    last.current = null;
    resetSpeech(0);
    setPlaying(true);
  }, [resetSpeech]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
      if (e.key === "r" || e.key === "R") restart();
      if (e.key === "h" || e.key === "H") setChrome((c) => !c);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  // The only way the lookup misses is t === DURATION, so hold the final frame
  // rather than snapping back to the opening scene.
  const active =
    SCENES.find((s) => t >= s.at && t < s.end) ?? SCENES[SCENES.length - 1];
  const local = t - active.at;
  const Scene = active.C;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0b0a08",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* The capture surface. Record exactly this rectangle. */}
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "center",
          position: "relative",
          overflow: "hidden",
          background: C.ink,
          flexShrink: 0,
        }}
      >
        <Scene t={local} />
      </div>

      {/* Optional tracks. Absent files are reported, never fatal. */}
      <audio
        ref={voRef}
        src={AUDIO.vo}
        preload="auto"
        onCanPlay={() => noteLoaded("vo.mp3", true)}
        onError={() => noteLoaded("vo.mp3", false)}
      />
      <audio
        ref={musRef}
        src={AUDIO.music}
        preload="auto"
        onCanPlay={() => noteLoaded("music.mp3", true)}
        onError={() => noteLoaded("music.mp3", false)}
      />

      {chrome && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "18px 26px",
            background: "rgba(11,10,8,0.92)",
            borderTop: "1px solid #2a271f",
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: SANS,
            color: "#cdc5b4",
            fontSize: 14,
          }}
        >
          <button
            onClick={() => setPlaying((p) => !p)}
            style={btn}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={restart} style={btn}>
            Restart
          </button>

          <input
            type="range"
            min={0}
            max={DURATION}
            step={0.05}
            value={t}
            onChange={(e) => {
              const v = Number(e.target.value);
              setPlaying(false);
              resetSpeech(v);
              setT(v);
            }}
            style={{ flex: 1, accentColor: C.gold }}
            aria-label="Timeline"
          />

          <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 108 }}>
            {t.toFixed(1)}s / {DURATION}s
          </span>
          <span style={{ color: C.gold, minWidth: 230 }}>{active.name}</span>

          <button
            onClick={() => setSound((s) => !s)}
            style={{
              ...btn,
              borderColor: sound ? C.gold : "#2a271f",
              color: sound ? C.goldBright : "#efe9dc",
            }}
          >
            {sound ? "Sound on" : "Sound off"}
          </button>

          {sound && (
            <>
              {!hasVoFile && (
                <label style={chk} title="Browser-spoken voiceover, cued to the timeline">
                  <input
                    type="checkbox"
                    checked={speak}
                    onChange={(e) => {
                      setSpeak(e.target.checked);
                      resetSpeech(t);
                    }}
                    style={{ accentColor: C.gold }}
                  />
                  Voice
                </label>
              )}
              {!hasMusicFile && (
                <label style={chk} title="Synthesised placeholder bed, silent until 0:24">
                  <input
                    type="checkbox"
                    checked={pad}
                    onChange={(e) => setPad(e.target.checked)}
                    style={{ accentColor: C.gold }}
                  />
                  Pad
                </label>
              )}
              <span
                style={{ color: t < MUSIC_IN ? "#6b6452" : C.gold, fontSize: 12.5 }}
                title="Music is silent for the whole problem half and enters on the turn at 0:24"
              >
                {t < MUSIC_IN ? "music enters 0:24" : "music in"}
              </span>
            </>
          )}

          <button onClick={() => setChrome(false)} style={btn}>
            Hide (H)
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * A placeholder music bed, synthesised so the timing can be heard before a
 * real track exists. Two detuned oscillators through a soft lowpass, with a
 * slow tremolo — warm, sparse, and deliberately unremarkable. Replace it with
 * a licensed track before this ships; it is a scratch bed, not a score.
 */
function makePad(ctx: AudioContext) {
  const out = ctx.createGain();
  out.gain.value = 0;
  out.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.6;
  filter.connect(out);

  // A low open fifth — root, fifth, and the octave above, barely there.
  const oscs = [110, 164.81, 220].map((f, i) => {
    const o = ctx.createOscillator();
    o.type = i === 2 ? "sine" : "triangle";
    o.frequency.value = f;
    o.detune.value = i === 1 ? 4 : -3;
    const g = ctx.createGain();
    g.gain.value = i === 2 ? 0.16 : 0.34;
    o.connect(g).connect(filter);
    o.start();
    return o;
  });

  // Slow breathing so it doesn't sit dead flat under the voice.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();

  return {
    setGain: (v: number) => {
      out.gain.setTargetAtTime(v, ctx.currentTime, 0.08);
    },
    stop: () => {
      oscs.forEach((o) => o.stop());
      lfo.stop();
      out.disconnect();
    },
  };
}

const chk: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const btn: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 14,
  fontWeight: 600,
  color: "#efe9dc",
  background: "#26221a",
  border: "1px solid #2a271f",
  borderRadius: 8,
  padding: "9px 16px",
  cursor: "pointer",
};
