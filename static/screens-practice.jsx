/* global React, Mascot, Asterisk, Burst, Sparkle, I */
// Memory-curve practice screen (spaced-repetition / Ebbinghaus-style)

const REVIEW_BANK = [
  { word: "Hello",     dueIn: -1, strength: 4, lastSeen: "2 days ago", color: "var(--teal)" },
  { word: "Thank you", dueIn:  0, strength: 2, lastSeen: "Today",      color: "var(--pink)" },
  { word: "Mom",       dueIn:  0, strength: 1, lastSeen: "Yesterday",  color: "var(--orange)" },
  { word: "More",      dueIn:  1, strength: 3, lastSeen: "3 days ago", color: "var(--yellow)" },
  { word: "Please",    dueIn:  2, strength: 2, lastSeen: "Today",      color: "var(--blue)" },
  { word: "Friend",    dueIn:  3, strength: 4, lastSeen: "Today",      color: "var(--purple)" },
  { word: "Help",      dueIn:  5, strength: 5, lastSeen: "Today",      color: "var(--teal)" },
];

function PracticeReview({ onPractice }) {
  const due = REVIEW_BANK.filter((r) => r.dueIn <= 0);
  const upcoming = REVIEW_BANK.filter((r) => r.dueIn > 0);

  return (
    <main style={{ padding: "40px 0 80px", position: "relative", background: "#F3F4F0" }}>
      {/* thumbprint decoration */}
      <div style={{ position: "absolute", left: -20, top: 80, transform: "rotate(-10deg)" }} className="nb-float">
        <Mascot color="blue" size={110} />
      </div>
      <div style={{ position: "absolute", right: -20, top: 250, transform: "rotate(12deg)" }} className="nb-float-slow">
        <Mascot color="pink" size={100} />
      </div>

      <div className="container-md">
        {/* hero header */}
        <div className="nb-card-lg" style={{
          background: "var(--orange)", padding: "30px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, flexWrap: "wrap",
        }}>
          <div>
            <span className="nb-chip nb-chip--ink">
              <I.Brain size={14} /> MEMORY CURVE
            </span>
            <h1 style={{ marginTop: 12 }}>
              <span className="nb-pill nb-pill--yellow">{due.length} signs</span> need a refresh
            </h1>
            <p style={{ marginTop: 8, fontWeight: 800, maxWidth: 440 }}>
              We replay signs right as you're about to forget them — so they stick for life, not just for today.
            </p>
          </div>
          <button onClick={() => onPractice(due[0]?.word || "Thank you")}
                  className="nb-btn nb-btn--lg nb-btn--ink" disabled={due.length === 0}>
            <I.Play size={16} fill="currentColor" /> Start review
          </button>
        </div>

        {/* The curve itself */}
        <section style={{ marginTop: 32 }}>
          <ForgettingCurve />
        </section>

        {/* Due now */}
        <section style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2>Due now</h2>
            <span className="nb-chip nb-chip--pink" style={{ color: "#fff" }}>{due.length} signs</span>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {due.map((r, i) => (
              <ReviewCard key={r.word} review={r} tilt={i % 2 === 0 ? -1.5 : 1.5} onClick={() => onPractice(r.word)} />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3>Coming up</h3>
            <span className="nb-chip">Scheduled by memory curve</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {upcoming.map((r) => (
              <li key={r.word} className="nb-card-flat" style={{
                background: "#fff", padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 999,
                  border: "3px solid var(--ink)", background: r.color,
                  boxShadow: "2px 2px 0 var(--ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Archivo Black", fontSize: ".95rem",
                }}>{r.word[0]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Archivo Black", fontSize: "1rem" }}>"{r.word}"</div>
                  <div style={{ fontSize: ".82rem", fontWeight: 800, color: "var(--ink-soft)" }}>
                    Last seen {r.lastSeen.toLowerCase()} · strength <StrengthDots n={r.strength} />
                  </div>
                </div>
                <span className="nb-chip">In {r.dueIn}d</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function StrengthDots({ n }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, verticalAlign: "middle", marginLeft: 6 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{
          width: 8, height: 8, borderRadius: 999,
          border: "1.5px solid var(--ink)",
          background: i <= n ? "var(--teal)" : "transparent",
        }} />
      ))}
    </span>
  );
}

function ReviewCard({ review, tilt, onClick }) {
  return (
    <button onClick={onClick} className="nb-card" style={{
      background: review.color, color: "var(--ink)",
      padding: "20px 22px", textAlign: "left",
      transform: `rotate(${tilt}deg)`, cursor: "pointer",
      fontFamily: "inherit",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span className="nb-chip nb-chip--ink"><I.Refresh size={12} /> Review</span>
        <I.Brain size={20} />
      </div>
      <div style={{ fontFamily: "Archivo Black", fontSize: "1.7rem" }}>"{review.word}"</div>
      <div style={{ marginTop: 8, fontSize: ".88rem", fontWeight: 800 }}>
        Strength <StrengthDots n={review.strength} />
      </div>
      <div style={{ marginTop: 4, fontSize: ".8rem", fontWeight: 800, opacity: .8 }}>
        Last seen: {review.lastSeen}
      </div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 900, fontSize: ".82rem" }}>Practice now →</span>
        <I.Arrow size={18} />
      </div>
    </button>
  );
}

/* Visual: forgetting curve with our review points */
function ForgettingCurve() {
  // Ebbinghaus-style decay curve, "lifted" each time we review.
  // Build a piecewise curve that drops, then jumps back to 100 on review.
  const w = 800, h = 240;
  const pad = { l: 50, r: 30, t: 30, b: 40 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const days = 10;
  const reviews = [0, 1, 3, 6];
  const x = (d) => pad.l + (d / days) * innerW;
  const y = (v) => pad.t + (1 - v) * innerH;

  // Single decay curve (no reviews) – dashed
  const noReviewPath = [];
  for (let d = 0; d <= days; d += 0.2) {
    const v = Math.exp(-d / 2.4); // fast decay
    noReviewPath.push(`${d === 0 ? "M" : "L"} ${x(d).toFixed(1)} ${y(v).toFixed(1)}`);
  }
  // With reviews – solid
  const withPath = [];
  for (let r = 0; r < reviews.length; r++) {
    const start = reviews[r];
    const end = reviews[r + 1] ?? days;
    for (let d = start; d <= end; d += 0.2) {
      const elapsed = d - start;
      const v = Math.exp(-elapsed / (2.4 + r * 1.8)); // each review slows decay
      withPath.push(`${d === 0 ? "M" : "L"} ${x(d).toFixed(1)} ${y(v).toFixed(1)}`);
    }
  }

  return (
    <div className="nb-card-lg" style={{ background: "#fff", padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 14 }}>
        <div>
          <span className="nb-chip nb-chip--yellow">HOW IT WORKS</span>
          <h3 style={{ marginTop: 8 }}>Your memory, mapped</h3>
          <p style={{ marginTop: 4, fontWeight: 800, color: "var(--ink-soft)", maxWidth: 460 }}>
            Without review, signs fade fast. We bring them back right at the wobble — so each review costs less and lasts longer.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="nb-chip" style={{ background: "rgba(14,20,48,.08)" }}>
            <span style={{ width: 14, height: 0, borderTop: "3px dashed var(--ink)" }} /> Without review
          </span>
          <span className="nb-chip nb-chip--teal">
            <span style={{ width: 14, height: 3, background: "var(--ink)" }} /> With SignBuddy
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* axes */}
        <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke="var(--ink)" strokeWidth="3" />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke="var(--ink)" strokeWidth="3" />
        {/* Y axis label */}
        <text x={pad.l - 8} y={pad.t + 4} fontSize="11" fontWeight="900" textAnchor="end" fill="var(--ink)">100%</text>
        <text x={pad.l - 8} y={h - pad.b} fontSize="11" fontWeight="900" textAnchor="end" fill="var(--ink)">0%</text>
        <text x={pad.l - 30} y={pad.t + innerH / 2} fontSize="11" fontWeight="900" textAnchor="middle"
              fill="var(--ink-soft)" transform={`rotate(-90, ${pad.l - 30}, ${pad.t + innerH / 2})`}>Memory</text>
        {/* X day ticks */}
        {[0, 2, 4, 6, 8, 10].map((d) => (
          <g key={d}>
            <line x1={x(d)} y1={h - pad.b} x2={x(d)} y2={h - pad.b + 6} stroke="var(--ink)" strokeWidth="2" />
            <text x={x(d)} y={h - pad.b + 22} fontSize="11" fontWeight="900" textAnchor="middle" fill="var(--ink-soft)">D{d}</text>
          </g>
        ))}

        {/* no-review curve */}
        <path d={noReviewPath.join(" ")} stroke="var(--ink)" strokeWidth="3" fill="none"
              strokeDasharray="6 7" strokeLinecap="round" opacity=".5" />

        {/* with-review curve */}
        <path d={withPath.join(" ")} stroke="var(--teal-deep)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* review markers */}
        {reviews.map((d, i) => (
          <g key={d}>
            <line x1={x(d)} y1={y(0)} x2={x(d)} y2={y(1)} stroke="var(--pink)" strokeWidth="2" strokeDasharray="3 4" opacity=".5" />
            <circle cx={x(d)} cy={y(1)} r="8" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="3" />
            <text x={x(d)} y={y(1) - 14} fontSize="11" fontWeight="900" textAnchor="middle" fill="var(--ink)">R{i + 1}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

Object.assign(window, { PracticeReview, REVIEW_BANK });
