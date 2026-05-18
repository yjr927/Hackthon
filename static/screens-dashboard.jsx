/* global React, Mascot, Asterisk, Burst, Sparkle, HandDrawArrow, Heart, StarShape, I */
// Parent Dashboard

function ParentDashboard({ onPracticeTogether, onGoLearn }) {
  return (
    <main style={{ padding: "40px 0 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -30, top: 100 }} className="nb-float-slow">
        <Burst size={100} fill="var(--pink)" rotate={-10} />
      </div>
      <div style={{ position: "absolute", right: -10, top: 250 }} className="nb-float">
        <Asterisk size={86} fill="var(--orange)" rotate={20} />
      </div>

      <div className="container">
        {/* Hero summary */}
        <div className="nb-card-lg" style={{
          background: "var(--blue)", color: "#fff",
          padding: "32px 36px",
          display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          position: "relative", overflow: "visible",
        }}>
          <div style={{
            width: 120, height: 120, borderRadius: 24,
            border: "3px solid var(--ink)",
            background: "var(--yellow)",
            boxShadow: "6px 6px 0 var(--ink)",
            overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Mascot color="pink" size={110} />
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="nb-chip nb-chip--yellow">FAMILY DASHBOARD</div>
            <h1 style={{ color: "#fff", marginTop: 10 }}>
              JJ is on a <span className="nb-pill nb-pill--orange" style={{ color: "var(--ink)" }}>6-day streak</span>
            </h1>
            <p style={{ marginTop: 8, fontSize: "1.05rem", fontWeight: 800, opacity: .9 }}>
              Cheer them on. Sign together. Watch tiny wins stack up.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={onPracticeTogether} className="nb-btn nb-btn--lg nb-btn--yellow">
              <Heart size={16} /> Sign together
            </button>
            <button onClick={onGoLearn} className="nb-btn nb-btn--white">
              <I.Eye size={16} /> Watch JJ practice
            </button>
          </div>
        </div>

        {/* Stat grid */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginTop: 36 }}>
          <BigStat big="6" label="Day streak" icon={<I.Flame size={22} />} bg="var(--pink)" fg="#fff" tilt={-2} />
          <BigStat big="240" label="XP this week" icon={<I.Star size={22} fill="currentColor" />} bg="var(--yellow)" fg="var(--ink)" tilt={1.5} />
          <BigStat big="3" label="Badges earned" icon={<I.Trophy size={22} />} bg="var(--teal)" fg="var(--ink)" tilt={-1} />
          <BigStat big="12" label="Signs learned" icon={<I.Hand size={22} />} bg="var(--orange)" fg="var(--ink)" tilt={2} />
        </div>

        {/* Two-column body */}
        <div className="grid" style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 28, marginTop: 36 }}>
          {/* Left col — Now learning + Needs review */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Now learning */}
            <section className="nb-card-lg" style={{ padding: 28, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <span className="nb-chip nb-chip--blue">CURRENT UNIT</span>
                  <h2 style={{ marginTop: 8 }}>Chapter 1 · First Hellos</h2>
                </div>
                <div className="nb-chip nb-chip--yellow"><I.Sparkle size={14} /> 1 of 5 done</div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { word: "Hello",     status: "Done",   color: "var(--teal)",   note: "Beautiful hand shape" },
                  { word: "Thank you", status: "Now",    color: "var(--pink)",   note: "Practicing today" },
                  { word: "Yes",       status: "Locked", color: "var(--cream)",  note: "Unlocks next" },
                  { word: "No",        status: "Locked", color: "var(--cream)",  note: "—" },
                  { word: "Please",    status: "Locked", color: "var(--cream)",  note: "—" },
                ].map((l, i, arr) => (
                  <li key={l.word} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "14px 0",
                    borderBottom: i < arr.length - 1 ? "3px dashed var(--ink)" : "none",
                  }}>
                    <span style={{
                      width: 48, height: 48, borderRadius: 999,
                      border: "3px solid var(--ink)", background: l.color,
                      boxShadow: "3px 3px 0 var(--ink)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "Archivo Black", color: "var(--ink)",
                    }}>{l.word[0]}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Archivo Black", fontSize: "1.1rem" }}>{l.word}</div>
                      <div style={{ fontWeight: 700, fontSize: ".88rem", color: "var(--ink-soft)" }}>{l.note}</div>
                    </div>
                    <span className={`nb-chip ${
                      l.status === "Done" ? "nb-chip--teal" : l.status === "Now" ? "nb-chip--yellow" : ""
                    }`}>{l.status === "Done" ? <I.Check size={12} /> : l.status === "Now" ? <I.Sparkle size={12} /> : <I.Lock size={12} />} {l.status}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* AI summary */}
            <section className="nb-card-lg" style={{
              background: "var(--ink)", color: "var(--cream)",
              padding: 28, position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -20, right: 24,
              }}>
                <div className="nb-chip nb-chip--yellow">AI WEEKLY SUMMARY</div>
              </div>
              <h3 style={{ color: "var(--cream)" }}>What I noticed this week</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "grid", gap: 12 }}>
                {[
                  { tone: "good", text: "\"Hello\" — hand shape and timing look beautiful." },
                  { tone: "grow", text: "\"Thank you\" — try a slightly slower outward motion." },
                  { tone: "good", text: "Eye contact while signing is improving — great focus." },
                  { tone: "good", text: "Comfortable with both right and left dominant practice." },
                ].map((n, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      width: 30, height: 30, borderRadius: 999,
                      background: n.tone === "good" ? "var(--teal)" : "var(--yellow)",
                      color: "var(--ink)", flexShrink: 0,
                      border: "3px solid var(--cream)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "Archivo Black",
                    }}>{n.tone === "good" ? <I.Check size={14} /> : "↗"}</span>
                    <span style={{ fontWeight: 700, paddingTop: 4 }}>{n.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right col — Practice together + review */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <section className="nb-card-lg" style={{ background: "var(--teal)", padding: 28, position: "relative" }}>
              <div style={{ position: "absolute", top: -30, right: -20 }} className="nb-tilt-lg-r">
                <Mascot color="pink" size={110} />
              </div>
              <span className="nb-chip nb-chip--pink" style={{ color: "#fff" }}>FAMILY MODE</span>
              <h3 style={{ marginTop: 10 }}>Sign together tonight</h3>
              <p style={{ marginTop: 6, fontWeight: 800 }}>
                A 5-minute, hands-on activity. We pick words your family already knows.
              </p>
              <button onClick={onPracticeTogether} className="nb-btn nb-btn--lg nb-btn--ink" style={{ marginTop: 18 }}>
                <Heart size={14} /> Start session
              </button>
            </section>

            <section className="nb-card-lg" style={{ background: "#fff", padding: 28 }}>
              <span className="nb-chip nb-chip--orange">REVIEW</span>
              <h3 style={{ marginTop: 10 }}>Signs to revisit</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 12 }}>
                {[
                  { w: "Thank you", note: "Smoother outward motion" },
                  { w: "Please",    note: "Slower circle" },
                ].map((r) => (
                  <li key={r.w} className="nb-card-flat" style={{
                    padding: 14, background: "var(--cream-soft)",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  }}>
                    <div>
                      <div style={{ fontFamily: "Archivo Black" }}>"{r.w}"</div>
                      <div style={{ fontSize: ".85rem", fontWeight: 700, color: "var(--ink-soft)" }}>{r.note}</div>
                    </div>
                    <button onClick={onGoLearn} className="nb-btn nb-btn--yellow" style={{ padding: "8px 14px" }}>
                      <I.Play size={12} fill="currentColor" /> Open
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="nb-card" style={{
              background: "var(--yellow)", padding: 22, textAlign: "center",
            }}>
              <Mascot color="yellow" size={80} style={{ margin: "0 auto" }} />
              <p style={{ marginTop: 10, fontWeight: 900 }}>
                Cheer, don't check up. We only show what helps.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function BigStat({ big, label, icon, bg, fg, tilt }) {
  return (
    <div className="nb-card" style={{
      background: bg, color: fg, padding: "22px 20px",
      transform: `rotate(${tilt}deg)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon}
        <span style={{ fontWeight: 900, fontSize: ".82rem", letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{
        marginTop: 6,
        fontFamily: "Archivo Black",
        fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
        lineHeight: 1,
      }}>{big}</div>
    </div>
  );
}

Object.assign(window, { ParentDashboard });
