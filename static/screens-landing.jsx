/* global React, Mascot, Asterisk, Burst, Sparkle, Squiggle, HandDrawArrow, Heart, StarShape, I, MarqueeStrip */
// Landing page + Onboarding

function Landing({ onStart, onParents }) {
  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      {/* ========== HERO ========== */}
      <section style={{ position: "relative", paddingTop: 40, paddingBottom: 60 }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", left: -30, top: 40 }} className="nb-float-slow">
          <Burst size={140} fill="var(--orange)" rotate={-15} />
        </div>
        <div style={{ position: "absolute", right: -40, top: 100 }} className="nb-float">
          <Asterisk size={120} fill="var(--blue)" rotate={20} />
        </div>
        <div style={{ position: "absolute", left: "8%", bottom: 60 }} className="nb-float">
          <Sparkle size={64} fill="var(--yellow)" rotate={10} />
        </div>
        <div style={{ position: "absolute", right: "8%", bottom: 40 }} className="nb-float-slow">
          <Burst size={88} fill="var(--teal)" points={10} rotate={30} />
        </div>

        <div className="container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", maxWidth: 920, margin: "0 auto" }}>
            <div className="nb-chip nb-chip--ink nb-pop" style={{ marginBottom: 24 }}>
              <span style={{
                width: 8, height: 8, borderRadius: 999, background: "var(--teal)",
                display: "inline-block", boxShadow: "0 0 0 4px rgba(94,229,200,.4)"
              }} />
              Real-time AI vision · Now in beta
            </div>

            <h1 style={{ position: "relative", zIndex: 1 }}>
              Learn ASL with{" "}
              <span className="nb-pill nb-pill--teal">real-time</span>{" "}
              <br />
              AI feedback for{" "}
              <span className="nb-pill nb-pill--orange">every family</span>.
            </h1>

            <p style={{
              fontSize: "1.2rem",
              maxWidth: 640,
              margin: "28px auto 0",
              color: "var(--ink-soft)",
              lineHeight: 1.5,
              fontWeight: 700
            }}>
              Watch one sign at a time. Practice with your camera. Get kind, specific
              feedback on <strong>hand shape</strong>, <strong>movement</strong>, and{" "}
              <strong>orientation</strong> — built for kids, parents, and beginners.
            </p>

            <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="nb-btn nb-btn--lg nb-btn--blue" onClick={onStart}>
                Start learning <I.Arrow size={18} />
              </button>
              <button className="nb-btn nb-btn--lg nb-btn--yellow" onClick={onStart}>
                <I.Cam size={18} /> Try AI feedback
              </button>
              <button className="nb-btn nb-btn--lg nb-btn--white" onClick={onParents}>
                <I.Users size={18} /> Parent mode
              </button>
            </div>

            <div style={{ marginTop: 20, fontSize: ".9rem", color: "var(--ink-soft)", fontWeight: 800 }}>
              No app · No login required to try · Built with people with hearing disabilities
            </div>
          </div>

          {/* Hero product preview */}
          <div style={{ marginTop: 64, position: "relative", display: "flex", justifyContent: "center" }}>
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ========== Trust strip ========== */}
      <MarqueeStrip
        items={["Hand shape", "Movement path", "Palm orientation", "Position", "Left/Right hand", "AI Coach"]}
        bg="var(--blue)" />
      

      {/* ========== Problem / Stats ========== */}
      <section style={{ padding: "80px 0", position: "relative", background: "var(--cream)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
            <div style={{ position: "absolute", left: "12%", top: -20 }}>
              <Mascot color="purple" size={70} className="nb-float" />
            </div>
            <div style={{ position: "absolute", right: "12%", top: -10 }}>
              <Mascot color="yellow" size={66} className="nb-float-slow" />
            </div>
            <span className="nb-chip nb-chip--pink" style={{ color: "#fff" }}>
              The problem
            </span>
            <h2 style={{ marginTop: 18, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
              The problem isn't a lack of <span className="nb-underline">content</span>.<br />
              It's a lack of <span className="nb-pill nb-pill--yellow">feedback</span>.
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            <StatCard
              big="90–95%"
              label="of children with hearing disabilities are born to hearing parents"
              bg="var(--blue)"
              fg="#fff"
              corner={<Burst size={70} fill="var(--yellow)" rotate={-10} style={{ position: "absolute", top: -28, right: -22 }} />}
              tilt="-2deg" />
            
            <StatCard
              big="70%"
              label="are at risk of language deprivation before age 5"
              bg="var(--pink)"
              fg="#fff"
              corner={<Asterisk size={68} fill="var(--teal)" rotate={15} style={{ position: "absolute", top: -28, right: -22 }} />}
              tilt="1.5deg" />
            
            <StatCard
              big="0"
              label="real-time feedback in most ASL apps today"
              bg="var(--yellow)"
              fg="var(--ink)"
              corner={<Sparkle size={64} fill="var(--pink)" rotate={20} style={{ position: "absolute", top: -28, right: -22 }} />}
              tilt="-1deg" />
            
          </div>
        </div>
      </section>

      {/* ========== How it works ========== */}
      <section style={{ background: "var(--ink)", color: "var(--cream)", padding: "90px 0", position: "relative", borderTop: "3px solid var(--ink)", borderBottom: "3px solid var(--ink)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="nb-chip nb-chip--yellow">5 steps</span>
            <h2 style={{ color: "var(--cream)", marginTop: 16 }}>
              How <span className="nb-pill nb-pill--pink" style={{ color: "#fff" }}>SignBuddy</span> works
            </h2>
            <p style={{ marginTop: 16, color: "rgba(255,255,255,.7)", fontSize: "1.1rem", fontWeight: 700 }}>
              One sign. One try. One tiny win. Repeat.
            </p>
          </div>

          <HowItWorks />
        </div>

        {/* decorative */}
        <div style={{ position: "absolute", left: "5%", top: 30 }}>
          <Sparkle size={50} fill="var(--yellow)" />
        </div>
        <div style={{ position: "absolute", right: "8%", bottom: 30 }}>
          <Sparkle size={36} fill="var(--teal)" />
        </div>
      </section>

      {/* ========== Feedback CTA ========== */}
      <section style={{ padding: "100px 0", position: "relative" }}>
        <div className="container-md">
          <div className="nb-card-lg" style={{
            background: "var(--teal)",
            padding: "60px 50px",
            textAlign: "center",
            position: "relative",
            overflow: "visible"
          }}>
            <div style={{ position: "absolute", top: -40, left: -30 }} className="nb-tilt-lg-l">
              <Mascot color="blue" size={140} />
            </div>
            <div style={{ position: "absolute", top: -50, right: -20 }} className="nb-tilt-lg-r">
              <Mascot color="pink" size={130} />
            </div>
            <div style={{ position: "absolute", bottom: -30, right: "40%" }}>
              <Mascot color="yellow" size={80} />
            </div>

            <h2 style={{ position: "relative", zIndex: 1 }}>
              Ready to sign your first word?
            </h2>
            <p style={{ marginTop: 18, fontSize: "1.15rem", fontWeight: 800, position: "relative", zIndex: 1 }}>
              It takes 60 seconds. No download. Just a camera and a smile.
            </p>
            <button onClick={onStart} className="nb-btn nb-btn--lg nb-btn--ink" style={{ marginTop: 30, position: "relative", zIndex: 1 }}>
              Start free <I.Arrow size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>);

}

function StatCard({ big, label, bg, fg, corner, tilt = "0deg" }) {
  return (
    <div className="nb-card" style={{
      background: bg, color: fg, padding: "32px 28px",
      transform: `rotate(${tilt})`, transition: "transform .2s",
      overflow: "visible"
    }}>
      {corner}
      <div style={{
        fontFamily: "Archivo Black, sans-serif",
        fontSize: "clamp(3rem, 6vw, 4.4rem)",
        lineHeight: 1,
        letterSpacing: "-.02em"
      }}>{big}</div>
      <p style={{
        marginTop: 16, fontWeight: 800, fontSize: "1.05rem",
        lineHeight: 1.35
      }}>{label}</p>
    </div>);

}

function HowItWorks() {
  const steps = [
  { n: "01", title: "Choose a goal", body: "Pick a learner type. Daily signs, family chat, or full fluency.", color: "var(--teal)", fg: "var(--ink)", icon: <I.Sparkle /> },
  { n: "02", title: "Watch one sign", body: "A short demo shows hand shape, motion, palm — clearly, slowly.", color: "var(--yellow)", fg: "var(--ink)", icon: <I.Eye /> },
  { n: "03", title: "Practice on camera", body: "Open your camera and try. We see your hands in real-time.", color: "var(--pink)", fg: "#fff", icon: <I.Cam /> },
  { n: "04", title: "Get AI feedback", body: "Specific, kind notes — \u201Cmove a little higher\u201D, not just \u201Cwrong\u201D.", color: "var(--blue)", fg: "#fff", icon: <I.Bolt /> },
  { n: "05", title: "Unlock next word", body: "Earn XP. Keep your streak. Stack signs into a full vocabulary.", color: "var(--orange)", fg: "var(--ink)", icon: <I.Star /> }];


  return (
    <div style={{ position: "relative" }}>
      {/* connecting dashed line */}
      <svg style={{
        position: "absolute", left: 0, right: 0, top: 60,
        width: "100%", height: 80, pointerEvents: "none"
      }} viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M50 40 Q 250 0 500 40 T 950 40" stroke="var(--cream)" strokeWidth="3" strokeDasharray="6 8" fill="none" />
      </svg>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 26, position: "relative" }}>
        {steps.map((s, i) =>
        <div key={s.n} className="nb-card" style={{
          background: s.color, color: s.fg, padding: "26px 22px",
          transform: `rotate(${i % 2 === 0 ? "-1.5deg" : "2deg"})`,
          position: "relative"
        }}>
            <div style={{
            position: "absolute", top: -18, left: -14,
            width: 48, height: 48, borderRadius: 999,
            background: "var(--ink)", color: "var(--cream)",
            border: "3px solid var(--ink)", boxShadow: "3px 3px 0 var(--cream)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Archivo Black", fontSize: ".9rem"
          }}>{s.n}</div>
            <div style={{ marginBottom: 14, marginTop: 4 }}>{s.icon}</div>
            <h3 style={{ color: s.fg, fontFamily: "Archivo Black", fontSize: "1.15rem" }}>{s.title}</h3>
            <p style={{ marginTop: 8, fontSize: ".92rem", fontWeight: 700, opacity: .9 }}>{s.body}</p>
          </div>
        )}
      </div>
    </div>);

}

function HeroPreview() {
  return (
    <div style={{ position: "relative", maxWidth: 880, width: "100%" }}>
      {/* Phone-frame style camera mock */}
      <div className="nb-card-lg" style={{
        background: "var(--cream-soft)",
        padding: 18,
        transform: "rotate(-1.5deg)"
      }}>
        <div style={{
          background: "#0A1A6B",
          borderRadius: 18,
          border: "3px solid var(--ink)",
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden"
        }}>
          {/* Faux camera with hand */}
          <FakeCameraGraphic />

          {/* AI feedback bubble overlay */}
          <div style={{
            position: "absolute",
            top: 22, left: 22,
            background: "#fff",
            border: "3px solid var(--ink)",
            borderRadius: 18,
            padding: "12px 16px",
            maxWidth: 280,
            boxShadow: "4px 4px 0 var(--ink)",
            display: "flex",
            gap: 10,
            alignItems: "flex-start"
          }} className="nb-pop">
            <Mascot color="purple" size={36} />
            <div>
              <div className="nb-chip" style={{ background: "var(--teal)", marginBottom: 6 }}>
                <I.Sparkle size={12} /> AI
              </div>
              <div style={{ fontWeight: 800, fontSize: ".95rem" }}>
                Move your hand a little higher — almost there!
              </div>
            </div>
          </div>

          {/* Word overlay */}
          <div style={{
            position: "absolute", bottom: 22, right: 22,
            background: "var(--yellow)",
            border: "3px solid var(--ink)",
            borderRadius: 999,
            padding: "10px 22px",
            boxShadow: "4px 4px 0 var(--ink)",
            fontFamily: "Archivo Black",
            fontSize: "1.3rem"
          }}>
            "Thank you"
          </div>

          {/* recording chip */}
          <div style={{
            position: "absolute", top: 22, right: 22,
            background: "var(--pink)", color: "#fff",
            border: "3px solid var(--ink)",
            borderRadius: 999,
            padding: "6px 14px",
            boxShadow: "3px 3px 0 var(--ink)",
            fontWeight: 900, fontSize: ".82rem",
            display: "flex", alignItems: "center", gap: 6
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#fff" }} />
            REC 02s
          </div>
        </div>
      </div>

      {/* Floating side card */}
      <div style={{
        position: "absolute", bottom: -30, left: -40
      }} className="nb-tilt-lg-l">
        <div className="nb-card" style={{ background: "var(--orange)", padding: 18, width: 240 }}>
          <div className="nb-chip nb-chip--ink" style={{ marginBottom: 10 }}>STREAK · DAY 6</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <I.Flame size={28} />
            <div style={{ fontFamily: "Archivo Black", fontSize: "1.8rem" }}>6 days</div>
          </div>
          <div style={{ marginTop: 6, fontWeight: 800, fontSize: ".85rem" }}>
            Keep it up — you got this.
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", top: -30, right: -30
      }} className="nb-tilt-lg-r">
        <div className="nb-card" style={{ background: "#fff", padding: 16, width: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Mascot color="teal" size={48} />
            <div>
              <div className="nb-chip nb-chip--yellow">+10 XP</div>
              <div style={{ fontWeight: 900, marginTop: 4, fontSize: ".95rem" }}>"Hello" unlocked</div>
            </div>
          </div>
        </div>
      </div>

      {/* hand-drawn arrow */}
      <div style={{ position: "absolute", left: -80, top: 100 }} className="nb-tilt-lg-l">
        <HandDrawArrow width={120} />
      </div>
    </div>);

}

function FakeCameraGraphic() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* gradient background */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1530B3" />
          <stop offset="100%" stopColor="#070C3A" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#bgGrad)" />

      {/* soft figure silhouette */}
      <ellipse cx="400" cy="540" rx="200" ry="170" fill="rgba(255,255,255,0.06)" />
      <circle cx="400" cy="290" r="78" fill="rgba(255,255,255,0.06)" />

      {/* position guide */}
      <rect x="280" y="120" width="240" height="240" rx="24" fill="none" stroke="#FFD747" strokeWidth="4" strokeDasharray="10 10" />

      {/* hand landmark dots */}
      {[
      [400, 320], [370, 280], [350, 240], [340, 200], [335, 168],
      [410, 270], [420, 230], [428, 200], [434, 175],
      [440, 280], [452, 240], [462, 210], [470, 184],
      [460, 290], [478, 256], [492, 226], [502, 200],
      [475, 305], [495, 280], [510, 258], [524, 240]].
      map(([x, y], i) =>
      <circle key={i} cx={x} cy={y} r="6" fill="#FFD747" stroke="#0E1430" strokeWidth="2" />
      )}
      {/* connecting lines */}
      <g stroke="#EC4F9C" strokeWidth="3" fill="none">
        <polyline points="400,320 370,280 350,240 340,200 335,168" />
        <polyline points="400,320 410,270 420,230 428,200 434,175" />
        <polyline points="400,320 440,280 452,240 462,210 470,184" />
        <polyline points="400,320 460,290 478,256 492,226 502,200" />
        <polyline points="400,320 475,305 495,280 510,258 524,240" />
      </g>
      {/* movement path */}
      <path d="M 200 380 Q 380 280 580 220" stroke="#5EE5C8" strokeWidth="5" fill="none" strokeDasharray="10 10" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="1.2s" repeatCount="indefinite" />
      </path>
      <polygon points="580,220 565,210 568,232" fill="#5EE5C8" stroke="#0E1430" strokeWidth="2" />
    </svg>);

}

/* =========================== ONBOARDING =========================== */

function Onboarding({ onDone, onBack }) {
  const [step, setStep] = React.useState(1);
  const [learner, setLearner] = React.useState(null);
  const [goal, setGoal] = React.useState(null);
  const [showApiPrompt, setShowApiPrompt] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("");
  const [apiBusy, setApiBusy] = React.useState(false);
  const [apiMessage, setApiMessage] = React.useState("");

  const learners = [
  { k: "myself", label: "Me", sub: "I want to learn ASL", bg: "var(--blue)", fg: "#fff", mascot: "blue" },
  { k: "child", label: "My child", sub: "I'm teaching a kid", bg: "var(--pink)", fg: "#fff", mascot: "pink" },
  { k: "family", label: "Our family", sub: "We learn together", bg: "var(--orange)", fg: "var(--ink)", mascot: "yellow" },
  { k: "hearing-disability-family", label: "Parent of a child with hearing disabilities", sub: "Catching up fast", bg: "var(--teal)", fg: "var(--ink)", mascot: "teal" }];

  const goals = [
  { k: "daily", label: "Daily signs", sub: "Hi, thanks, help, more", bg: "var(--yellow)", fg: "var(--ink)" },
  { k: "chat", label: "Family chat", sub: "Short conversations", bg: "var(--teal)", fg: "var(--ink)" },
  { k: "pro", label: "Fluent ASL", sub: "Interpreter level", bg: "var(--purple)", fg: "var(--ink)" }];

  const finishOnboarding = async () => {
    setApiMessage("");
    if (!window.ASL_API?.apiKeyStatus) {
      setShowApiPrompt(true);
      return;
    }
    try {
      const status = await window.ASL_API.apiKeyStatus();
      if (status.coach_available) {
        onDone();
      } else {
        setShowApiPrompt(true);
      }
    } catch {
      setShowApiPrompt(true);
    }
  };

  const saveKeyAndContinue = async () => {
    if (!apiKey.trim()) {
      setApiMessage("Paste a Gemini API key, or continue without Gemini.");
      return;
    }
    setApiBusy(true);
    setApiMessage("");
    try {
      await window.ASL_API.saveApiKey(apiKey.trim());
      onDone();
    } catch (error) {
      setApiMessage(error.message || "API key could not be saved. You can still continue without Gemini.");
    } finally {
      setApiBusy(false);
    }
  };


  return (
    <main style={{ padding: "40px 0 80px", position: "relative" }}>
      {/* decorations */}
      <div style={{ position: "absolute", left: "5%", top: 60 }} className="nb-float">
        <Asterisk size={80} fill="var(--orange)" rotate={-15} />
      </div>
      <div style={{ position: "absolute", right: "8%", top: 120 }} className="nb-float-slow">
        <Burst size={86} fill="var(--blue)" />
      </div>
      <div style={{ position: "absolute", right: "4%", bottom: 60 }}>
        <Sparkle size={48} fill="var(--pink)" />
      </div>

      <div className="container-md">
        {/* Progress */}
        <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
          {[1, 2].map((s) =>
          <div key={s} style={{
            flex: 1, height: 18, border: "3px solid var(--ink)",
            borderRadius: 999, background: "#fff", overflow: "hidden"
          }}>
              <div style={{
              height: "100%",
              width: step >= s ? "100%" : "0%",
              background: "var(--yellow)",
              transition: "width .35s"
            }} />
            </div>
          )}
        </div>

        {/* Buddy bubble */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", marginBottom: 24 }}>
          <Mascot color="blue" size={90} />
          <div className="nb-card" style={{
            background: "#fff", padding: "12px 18px", maxWidth: 360,
            borderRadius: "26px 26px 26px 6px"
          }}>
            <strong>{step === 1 ? "Hi! Who's learning today?" : "Awesome. What feels right?"}</strong>
          </div>
        </div>

        {step === 1 ?
        <>
            <h1>Who is learning?</h1>
            <div className="grid" style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginTop: 28
          }}>
              {learners.map((opt) => {
              const sel = learner === opt.k;
              return (
                <button key={opt.k} onClick={() => setLearner(opt.k)}
                className="nb-card" style={{
                  background: opt.bg, color: opt.fg,
                  padding: 22, textAlign: "left",
                  border: "3px solid var(--ink)",
                  cursor: "pointer", fontFamily: "inherit",
                  transform: sel ? "translate(-3px,-3px)" : "translate(0,0)",
                  boxShadow: sel ? "9px 9px 0 var(--ink)" : "6px 6px 0 var(--ink)",
                  transition: "all .12s"
                }}>
                    <div style={{
                    marginBottom: 8,
                    width: 72, height: 72, borderRadius: 18,
                    border: "3px solid var(--ink)", background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "3px 3px 0 var(--ink)",
                    overflow: "hidden"
                  }}><Mascot color={opt.mascot} size={64} /></div>
                    <div style={{ fontFamily: "Archivo Black", fontSize: "1.3rem" }}>{opt.label}</div>
                    <div style={{ marginTop: 4, fontWeight: 700, fontSize: ".95rem", opacity: .9 }}>{opt.sub}</div>
                    {sel &&
                  <div style={{
                    position: "absolute", top: -14, right: -14,
                    width: 40, height: 40, borderRadius: 999,
                    background: "var(--ink)", color: "var(--cream)",
                    border: "3px solid var(--cream)", boxShadow: "3px 3px 0 var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                        <I.Check size={20} />
                      </div>
                  }
                  </button>);

            })}
            </div>
          </> :

        <>
            <h1>What's your goal?</h1>
            <div className="grid" style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginTop: 28
          }}>
              {goals.map((opt) => {
              const sel = goal === opt.k;
              return (
                <button key={opt.k} onClick={() => setGoal(opt.k)}
                className="nb-card" style={{
                  background: opt.bg, color: opt.fg,
                  padding: 26, textAlign: "left",
                  cursor: "pointer", fontFamily: "inherit",
                  transform: sel ? "translate(-3px,-3px)" : "translate(0,0)",
                  boxShadow: sel ? "9px 9px 0 var(--ink)" : "6px 6px 0 var(--ink)",
                  transition: "all .12s"
                }}>
                    <div style={{ fontFamily: "Archivo Black", fontSize: "1.6rem" }}>{opt.label}</div>
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{opt.sub}</div>
                    {sel &&
                  <div style={{
                    position: "absolute", top: -14, right: -14,
                    width: 40, height: 40, borderRadius: 999,
                    background: "var(--ink)", color: "var(--cream)",
                    border: "3px solid var(--cream)", boxShadow: "3px 3px 0 var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                        <I.Check size={20} />
                      </div>
                  }
                  </button>);

            })}
            </div>
          </>
        }

        <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => step === 1 ? onBack() : setStep(1)} className="nb-btn nb-btn--white">
            <I.ArrowL size={16} /> Back
          </button>
          <div style={{ fontWeight: 900, color: "var(--ink-soft)" }}>{step} / 2</div>
          <button
            disabled={step === 1 ? !learner : !goal}
            onClick={() => step === 1 ? setStep(2) : finishOnboarding()}
            className="nb-btn nb-btn--lg nb-btn--blue">
            
            {step === 1 ? "Continue" : "Let's go"} <I.Arrow size={18} />
          </button>
        </div>
      </div>
      {showApiPrompt &&
      <div style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "rgba(14,20,48,.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20
      }}>
          <div className="nb-card-lg" style={{
          background: "var(--cream-soft)", padding: 24,
          maxWidth: 560, width: "100%"
        }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <Mascot color="purple" size={72} />
              <div style={{ flex: 1 }}>
                <div className="nb-chip nb-chip--yellow" style={{ marginBottom: 10 }}>
                  <I.Sparkle size={12} /> Gemini API key
                </div>
                <h2 style={{ marginBottom: 8 }}>Use Gemini coaching?</h2>
                <p style={{ fontWeight: 850, color: "var(--ink-soft)" }}>
                  Add your API key for Gemini-powered feedback. You can continue without one; SignBuddy will still generate feedback from the backend fallback, but it will not be based on the Gemini large model.
                </p>
              </div>
            </div>

            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste Gemini API key"
              type="password"
              style={{
                width: "100%", marginTop: 18, padding: "14px 16px",
                border: "3px solid var(--ink)", borderRadius: 16,
                fontFamily: "Nunito, sans-serif", fontWeight: 900,
                fontSize: "1rem", boxShadow: "4px 4px 0 var(--ink)"
              }}
            />

            {apiMessage &&
            <div className="nb-card-flat" style={{ marginTop: 12, padding: 12, background: "var(--yellow)", fontWeight: 900 }}>
                {apiMessage}
              </div>
            }

            <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
              <button onClick={() => {setShowApiPrompt(false);onDone();}} className="nb-btn nb-btn--white">
                Continue without Gemini
              </button>
              <button onClick={saveKeyAndContinue} disabled={apiBusy} className="nb-btn nb-btn--lg nb-btn--blue">
                {apiBusy ? "Saving..." : "Save key & continue"} <I.Arrow size={18} />
              </button>
            </div>
          </div>
        </div>
      }
    </main>);

}

Object.assign(window, { Landing, Onboarding });
