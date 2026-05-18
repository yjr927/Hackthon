/* global React, Mascot, Asterisk, Burst, Sparkle, Squiggle, HandDrawArrow, Heart, StarShape, I */
// Learning Path, Word Lesson (Watch / Practice / Feedback / Success)

/* =========================== LEARNING PATH MAP =========================== */

const WORD_COLORS = ["var(--teal)", "var(--yellow)", "var(--pink)", "var(--orange)", "var(--blue)"];
const COURSE = [
{
  unit: "Chapter 1 · Starter Signs", color: "var(--teal)",
  lessons: ["apple", "book", "bye", "cat", "dad"].map((id, i) => makeLesson(id, i))
},
{
  unit: "Chapter 2 · Home Signs", color: "var(--orange)",
  lessons: ["dog", "drink", "happy", "hello", "home"].map((id, i) => makeLesson(id, i))
},
{
  unit: "Chapter 3 · Daily Needs", color: "var(--purple)",
  lessons: ["hot", "hungry", "look", "milk", "mom"].map((id, i) => makeLesson(id, i))
},
{
  unit: "Chapter 4 · Kind Words", color: "var(--pink)",
  lessons: ["no", "please", "sad", "sleep", "thankyou"].map((id, i) => makeLesson(id, i))
},
{
  unit: "Chapter 5 · Questions", color: "var(--blue)",
  lessons: ["water", "where", "who", "why", "yes"].map((id, i) => makeLesson(id, i))
}];

function makeLesson(id, index) {
  return {
    id,
    word: displayWord(id),
    video: `assets/videos/${id}.mp4`,
    color: WORD_COLORS[index % WORD_COLORS.length],
    status: "locked"
  };
}

function displayWord(id) {
  if (id === "thankyou") return "Thank you";
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function getLessonByWord(word, course = COURSE) {
  const key = normalizeWordId(word);
  return course.flatMap((c) => c.lessons).find((l) => l.id === key);
}

function normalizeWordId(word) {
  return String(word || "").toLowerCase().replace(/\s+/g, "");
}

function buildCourseProgress(unlockedIndex = 1) {
  let flatIndex = 0;
  return COURSE.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => {
      const status =
        flatIndex < unlockedIndex ? "done" :
        flatIndex === unlockedIndex ? "current" :
        "locked";
      flatIndex += 1;
      return { ...lesson, status };
    })
  }));
}


function LearningPath({ onStartLesson, course = COURSE, streak = 6, xp = 240, badges = 3 }) {
  const activeIdx = course.findIndex(c => c.lessons.some(l => l.status !== "done"));
  const idx = activeIdx === -1 ? course.length - 1 : activeIdx;
  const active = course[idx];
  const completedInActive = active.lessons.filter((l) => l.status === "done").length;
  const totalInActive = active.lessons.length;
  return (
    <main style={{ padding: "40px 0 100px", position: "relative", background: "#F3F4F0" }}>
      {/* deco — thumbprint mascots */}
      <div style={{ position: "absolute", left: -30, top: 80, transform: "rotate(-12deg)" }} className="nb-float">
        <Mascot color="yellow" size={120} />
      </div>
      <div style={{ position: "absolute", right: -20, top: 220, transform: "rotate(15deg)" }} className="nb-float-slow">
        <Mascot color="purple" size={110} />
      </div>
      <div style={{ position: "absolute", left: -10, top: 580, transform: "rotate(8deg)" }} className="nb-float-slow">
        <Mascot color="teal" size={90} />
      </div>
      <div style={{ position: "absolute", right: -10, bottom: 200, transform: "rotate(-6deg)" }} className="nb-float">
        <Mascot color="pink" size={100} />
      </div>

      <div className="container-md">
        {/* Stat bar */}
        <div className="nb-card-lg" style={{
          background: "var(--yellow)", padding: "26px 30px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, flexWrap: "wrap"
        }}>
          <div>
            <div style={{ fontFamily: "Caveat, cursive", fontSize: "1.3rem", color: "var(--ink-soft)" }}>
              Welcome back, JJ!
            </div>
            <h2>One sign at a time.</h2>
            <p style={{ marginTop: 6, fontWeight: 800 }}>You're on {active.unit} · {completedInActive} / {totalInActive} done</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <StatPill icon={<I.Flame size={20} />} big={streak} label="Streak" color="var(--pink)" fg="#fff" />
            <StatPill icon={<I.Star size={20} />} big={xp} label="XP" color="var(--blue)" fg="#fff" />
            <StatPill icon={<I.Trophy size={20} />} big={badges} label="Badges" color="var(--teal)" fg="var(--ink)" />
          </div>
        </div>

        {/* Map — show one active chapter at a time. Next chapters appear locked. */}
        <div style={{ marginTop: 50 }}>
          {(() => {
            // Find the chapter that contains the current lesson (or the first not-fully-done one)
            const upcoming = course.slice(idx + 1);
            return (
              <>
                <ChapterMap chapter={active} index={idx} onStart={onStartLesson} />
                {upcoming.map((c) =>
                  <LockedChapterCard key={c.unit} chapter={c} />
                )}
              </>
            );
          })()}
        </div>
      </div>
    </main>);

}

function StatPill({ icon, big, label, color, fg }) {
  return (
    <div style={{
      background: color, color: fg,
      border: "3px solid var(--ink)", borderRadius: 20,
      padding: "10px 16px", display: "flex", gap: 10, alignItems: "center",
      boxShadow: "4px 4px 0 var(--ink)",
      minWidth: 110
    }}>
      {icon}
      <div>
        <div style={{ fontFamily: "Archivo Black", fontSize: "1.5rem", lineHeight: 1 }}>{big}</div>
        <div style={{ fontSize: ".7rem", fontWeight: 900, letterSpacing: ".08em" }}>{label.toUpperCase()}</div>
      </div>
    </div>);

}

function LockedChapterCard({ chapter, hint }) {
  const total = chapter.lessons.length;
  return (
    <section style={{ marginTop: 30, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 16, opacity: .65 }}>
        <span className="nb-chip" style={{ background: chapter.color, borderWidth: 3 }}>
          <I.Lock size={12} /> {chapter.unit}
        </span>
        <div style={{
          flex: 1, minWidth: 200, height: 16, border: "3px solid var(--ink)",
          borderRadius: 999, background: "#fff", overflow: "hidden"
        }}>
          <div style={{ height: "100%", width: "0%", background: chapter.color }} />
        </div>
        <strong>0 / {total}</strong>
      </div>

      <div className="nb-card-lg" style={{
        background: "#fff", padding: "40px 28px",
        textAlign: "center", position: "relative",
        opacity: .9
      }}>
        {/* dim diagonal stripes */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(45deg, transparent 0 18px, rgba(14,20,48,.04) 18px 36px)",
          borderRadius: "inherit",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", width: 72, height: 72, borderRadius: 999,
            border: "3px solid var(--ink)", background: "var(--cream-soft)",
            boxShadow: "4px 4px 0 var(--ink)",
            alignItems: "center", justifyContent: "center",
            marginBottom: 12,
          }}>
            <I.Lock size={30} />
          </div>
          <h3>{chapter.unit}</h3>
          <p style={{ marginTop: 8, color: "var(--ink-soft)", fontWeight: 800 }}>
            {hint || `Finish the current chapter to unlock ${total} new signs.`}
          </p>
        </div>
      </div>
    </section>
  );
}

function ChapterMap({ chapter, index, onStart }) {
  const completed = chapter.lessons.filter((l) => l.status === "done").length;
  const total = chapter.lessons.length;
  const pct = Math.round(completed / total * 100);

  // Winding path: zigzag positions with extra breathing room for large nodes.
  const positions = chapter.lessons.map((_, i) => {
    const t = i / Math.max(1, total - 1);
    const x = 50 + Math.sin(i * 1.2) * 26; // % horizontal
    const y = 16 + t * 68; // % vertical
    return { x, y };
  });

  return (
    <section style={{ marginTop: 30, position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 16
      }}>
        <span className="nb-chip" style={{ background: chapter.color, borderWidth: 3 }}>
          <I.Star size={12} fill="currentColor" /> {chapter.unit}
        </span>
        <div style={{
          flex: 1, minWidth: 200, height: 16, border: "3px solid var(--ink)",
          borderRadius: 999, background: "#fff", overflow: "hidden"
        }}>
          <div style={{
            height: "100%", width: `${pct}%`, background: chapter.color,
            transition: "width .4s"
          }} />
        </div>
        <strong>{completed} / {total}</strong>
      </div>

      <div className="nb-card-lg" style={{
        background: index === 0 ? "var(--cream-soft)" : "#fff",
        padding: "70px 32px", position: "relative", overflow: "hidden",
        minHeight: 760
      }}>
        {/* dashed connecting path */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={`M ${positions[0].x} ${positions[0].y} ${positions.slice(1).map((p, i) => {
              const prev = positions[i];
              const cx = (prev.x + p.x) / 2 + (i % 2 ? 15 : -15);
              const cy = (prev.y + p.y) / 2;
              return `Q ${cx} ${cy} ${p.x} ${p.y}`;
            }).join(" ")}`}
            stroke="var(--ink)" strokeWidth="0.6" strokeDasharray="2 2"
            fill="none" vectorEffect="non-scaling-stroke" />
          
        </svg>

        {/* deco mascots inside the map */}
        <div style={{ position: "absolute", right: 20, top: 30 }} className="nb-float-slow">
          <Mascot color={index === 0 ? "yellow" : "blue"} size={64} />
        </div>
        <div style={{ position: "absolute", left: 30, bottom: 30 }}>
          <Sparkle size={36} fill="var(--yellow)" />
        </div>
        {chapter.lessons.map((l, i) => {
          const pos = positions[i];
          const isLocked = l.status === "locked";
          const isDone = l.status === "done";
          const isCurrent = l.status === "current";
          return (
            <div key={l.id} style={{
              position: "absolute",
              left: `${pos.x}%`, top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
              textAlign: "center"
            }}>
              <button
                disabled={isLocked}
                onClick={() => onStart(l.id, l.word)}
                style={{
                  width: 104, height: 104, borderRadius: 999,
                  border: "4px solid var(--ink)",
                  background: isLocked ? "var(--cream)" : l.color,
                  boxShadow: isLocked ? "4px 4px 0 var(--ink)" : "6px 6px 0 var(--ink)",
                  cursor: isLocked ? "not-allowed" : "pointer",
                  opacity: isLocked ? .5 : 1,
                  fontFamily: "Archivo Black", fontSize: "1rem",
                  color: "var(--ink)",
                  position: "relative",
                  transition: "transform .15s",
                  padding: 10
                }}
                onMouseEnter={(e) => !isLocked && (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                
                {isCurrent &&
                <span style={{
                  position: "absolute", inset: -10,
                  border: "3px dashed var(--ink)", borderRadius: 999,
                  animation: "wobble 3s ease-in-out infinite"
                }} />
                }
                <span style={{ display: "block", lineHeight: 1, fontSize: "1rem" }}>
                  {l.word}
                </span>
                {/* badge */}
                <span style={{
                  position: "absolute", top: -10, right: -10,
                  width: 36, height: 36, borderRadius: 999,
                  border: "3px solid var(--ink)",
                  background: isDone ? "var(--teal)" : isCurrent ? "var(--yellow)" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "2px 2px 0 var(--ink)"
                }}>
                  {isDone ? <I.Check size={18} /> : isLocked ? <I.Lock size={14} /> : <I.Star size={16} />}
                </span>
              </button>
              <div style={{
                marginTop: 8, fontWeight: 900, fontSize: ".82rem",
                color: isLocked ? "var(--ink-soft)" : "var(--ink)"
              }}>
                {isDone ? <><I.Check size={12} /> Done</> : isCurrent ? <><I.Sparkle size={12} /> Start</> : <><I.Lock size={12} /> {l.word}</>}
              </div>
            </div>);

        })}
      </div>
    </section>);

}

/* =========================== WORD LESSON =========================== */

function WordLesson({ word, nextWord, onComplete, onExit, startStep = "watch" }) {
  const [step, setStep] = React.useState(startStep);
  const [attempts, setAttempts] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null);
  const [analysisLandmarks, setAnalysisLandmarks] = React.useState(null);

  const runAnalysis = async ({ videoBlob, fileName, landmarks }) => {
    setAnalysisLandmarks(landmarks || null);
    setFeedback(null);
    setStep("analyzing");
    try {
      const result = await window.ASL_API.coachVideo({
        video: videoBlob,
        fileName,
        targetSign: word,
        userGoal: `Practice word: ${word}`,
        topk: 5
      });
      setFeedback(buildApiFeedback(word, result, landmarks));
    } catch (error) {
      setFeedback(buildFallbackFeedback(word, error, landmarks, attempts));
    } finally {
      setStep("feedback");
    }
  };

  const stepNames = ["watch", "practice", "feedback", "success"];
  const stepIdx = step === "analyzing" ? 2 : stepNames.indexOf(step);

  return (
    <main style={{ padding: "30px 0 80px", position: "relative" }}>
      <div className="container-md">
        {/* Top banner */}
        <LessonBanner word={word} onExit={onExit} stepIdx={stepIdx} />

        {step === "watch" &&
        <WatchStep word={word} onNext={() => setStep("practice")} />
        }
        {step === "practice" &&
        <PracticeStep
          word={word}
          onAnalyze={runAnalysis}
          onBack={() => setStep("watch")} />

        }
        {step === "analyzing" &&
        <AnalysisStep word={word} landmarks={analysisLandmarks} />
        }
        {step === "feedback" && feedback &&
        <FeedbackStep
          word={word}
          feedback={feedback}
          onRetry={() => {setAttempts((a) => a + 1);setStep("practice");}}
          onContinue={() => setStep("success")} />

        }
        {step === "success" &&
        <SuccessStep
          word={word}
          nextWord={nextWord}
          onContinue={onComplete}
          onAgain={() => {setStep("watch");setAttempts(0);}} />

        }
      </div>
    </main>);

}

function LessonBanner({ word, onExit, stepIdx }) {
  const labels = ["Watch", "Practice", "Feedback", "Complete"];
  return (
    <div className="nb-card-lg" style={{
      background: "var(--blue)", color: "#fff",
      padding: "20px 26px",
      display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
      justifyContent: "space-between", position: "relative"
    }}>
      <button onClick={onExit} className="nb-btn nb-btn--white" style={{
        padding: "8px 14px", position: "absolute", top: 16, right: 16
      }}>
        <I.X size={16} /> Exit
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: ".78rem", fontWeight: 900, opacity: .8, letterSpacing: ".08em" }}>NOW LEARNING</div>
          <div style={{ fontFamily: "Archivo Black", fontSize: "2rem", color: "#fff" }}>"{word}"</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", paddingRight: 100 }}>
        {labels.map((l, i) =>
        <React.Fragment key={l}>
            <div style={{
            padding: "6px 14px", borderRadius: 999,
            border: "3px solid var(--ink)",
            background: i === stepIdx ? "var(--yellow)" : i < stepIdx ? "var(--teal)" : "#fff",
            color: "var(--ink)",
            fontWeight: 900, fontSize: ".82rem",
            boxShadow: i === stepIdx ? "3px 3px 0 var(--ink)" : "none",
            display: "flex", gap: 6, alignItems: "center"
          }}>
              {i < stepIdx ? <I.Check size={14} /> : <span>{i + 1}</span>}
              <span>{l}</span>
            </div>
            {i < labels.length - 1 &&
          <div style={{ width: 14, height: 0, borderTop: "3px dashed rgba(255,255,255,.5)" }} />
          }
          </React.Fragment>
        )}
      </div>
    </div>);

}

/* ----- Watch step ----- */
function WatchStep({ word, onNext }) {
  const [playing, setPlaying] = React.useState(true);
  const videoRef = React.useRef(null);
  const lesson = getLessonByWord(word);
  const videoSrc = lesson?.video || `assets/videos/${normalizeWordId(word)}.mp4`;

  React.useEffect(() => {
    setPlaying(true);
    if (videoRef.current) videoRef.current.currentTime = 0;
  }, [word]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing, videoSrc]);

  const replay = () => {
    if (videoRef.current) videoRef.current.currentTime = 0;
    setPlaying(true);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div className="nb-card-lg" style={{
        background: "var(--cream-soft)", padding: 22, position: "relative"
      }}>
        <div style={{
          background: "var(--purple)", borderRadius: 22, border: "3px solid var(--ink)",
          minHeight: 380, position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <SignDemoVideo videoRef={videoRef} videoSrc={videoSrc} word={word} />

          <span className="nb-chip nb-chip--yellow" style={{ position: "absolute", top: 16, left: 16 }}>
            STEP 1 · WATCH
          </span>
          <span className="nb-chip nb-chip--ink" style={{ position: "absolute", top: 16, right: 16 }}>
            <I.Eye size={14} /> Demo
          </span>

          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            padding: 16, display: "flex", justifyContent: "space-between", gap: 12,
            background: "linear-gradient(to top, rgba(0,0,0,.3), transparent)"
          }}>
            <button onClick={() => setPlaying((p) => !p)} className="nb-btn nb-btn--white">
              {playing ? <><I.Pause size={14} /> Pause</> : <><I.Play size={14} /> Play</>}
            </button>
            <button onClick={replay} className="nb-btn nb-btn--yellow">
              <I.Refresh size={14} /> Replay
            </button>
          </div>
        </div>

        {/* description */}
        <div style={{ marginTop: 18, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <Tip color="var(--teal)" title="Hand shape" body="Watch the signer's hand shape first." />
          <Tip color="var(--yellow)" title="Position" body="Notice where the sign begins." />
          <Tip color="var(--pink)" title="Movement" body="Copy the movement path slowly." fg="#fff" />
        </div>
      </div>

      <button onClick={onNext} className="nb-btn nb-btn--lg nb-btn--blue" style={{ width: "100%", marginTop: 22 }}>
        <I.Cam size={20} /> Sign now
      </button>
    </div>);

}

function Tip({ color, title, body, fg = "var(--ink)" }) {
  return (
    <div className="nb-card-flat" style={{ background: color, color: fg, padding: 14 }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: ".95rem" }}>{title}</div>
      <div style={{ marginTop: 4, fontWeight: 800, fontSize: ".88rem" }}>{body}</div>
    </div>);

}

function SignDemoVideo({ videoRef, videoSrc, word }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [videoSrc]);

  return (
    <div style={{ position: "relative", width: "min(620px, 88%)", textAlign: "center" }}>
      <div style={{
        width: "100%",
        aspectRatio: "16 / 9",
        border: "4px solid var(--ink)",
        borderRadius: 24,
        background: "#fff",
        boxShadow: "6px 6px 0 var(--ink)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {failed ? (
          <div style={{ padding: 24, color: "var(--ink)", fontWeight: 900 }}>
            Video missing for "{word}"
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            loop
            autoPlay
            onError={() => setFailed(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#fff",
              display: "block"
            }}
          />
        )}
      </div>
      <div style={{
        position: "absolute", right: -18, top: -18,
        width: 96, height: 96, borderRadius: 999,
        border: "4px solid var(--ink)",
        background: "var(--yellow)",
        boxShadow: "4px 4px 0 var(--ink)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transformOrigin: "bottom",
        animation: "wave-hand 1.2s ease-in-out infinite"
      }}><I.Hand size={56} stroke={3} /></div>
      <div className="nb-chip" style={{
        background: "var(--yellow)", marginTop: 14,
        fontFamily: "Archivo Black", fontSize: "1.1rem"
      }}>"{word}"</div>
    </div>);

}

function displayPercent(prob) {
  if (typeof prob !== "number" || Number.isNaN(prob)) return "unknown";
  return `${Math.round(prob * 100)}%`;
}

function splitCoachFeedback(text) {
  const defaults = [
    "Recognition summary: I checked your sign attempt against the model result.",
    "Correction: Keep your hand centered in the yellow box and move slowly.",
    "Encouragement: Nice work finishing a full practice try.",
    "Next step: Watch the demo once, then record one more clear attempt."
  ];
  const lines = String(text || "")
    .split(/\n+/)
    .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
    .filter(Boolean);

  return defaults.map((fallback, i) => lines[i] || fallback);
}

function buildApiFeedback(word, result, landmarks) {
  const predicted = result.predicted_label || "unknown";
  const matched = normalizeWordId(predicted) === normalizeWordId(word);
  const confidence = result.confidence || displayPercent(result.predicted_prob);
  const coachLines = splitCoachFeedback(result.coach_feedback);

  return {
    ok: matched,
    source: "backend",
    primary: matched ?
    `Nice match! I recognized "${word}".` :
    `I recognized "${predicted}" first. Let's compare it with "${word}".`,
    details: [
      `✓ ${coachLines[0]}`,
      `${matched ? "✓" : "→"} ${coachLines[1]}`,
      `✓ ${coachLines[2]}`,
      `→ ${coachLines[3]}`
    ],
    confidence,
    topPredictions: Array.isArray(result.topk_predictions) ? result.topk_predictions : [],
    coachFeedback: result.coach_feedback,
    landmarks,
    raw: result
  };
}

function buildFallbackFeedback(word, error, landmarks, attempts = 0) {
  const retryNudge = attempts > 0 ? "You are improving the sample each time." : "This first try gave us enough to coach from.";
  return {
    ok: false,
    source: "fallback",
    primary: "Backend feedback is not available yet",
    details: [
      landmarks ? "✓ MediaPipe: hand landmarks were collected" : "→ MediaPipe: keep your hand visible in the yellow box",
      "→ AI analysis: start the backend on port 8000 to use the model",
      `✓ Practice word: ${word}`,
      `→ Next step: ${retryNudge}`
    ],
    confidence: "offline",
    landmarks,
    coachFeedback: error?.message || "Backend request failed. The app kept the same flow and showed local guidance instead."
  };
}

function getRecordingOptions() {
  const candidates = [
    { mimeType: "video/mp4;codecs=h264", ext: "mp4" },
    { mimeType: "video/mp4", ext: "mp4" },
    { mimeType: "video/webm;codecs=vp8", ext: "webm" },
    { mimeType: "video/webm", ext: "webm" }
  ];
  for (const candidate of candidates) {
    if (window.MediaRecorder?.isTypeSupported(candidate.mimeType)) return candidate;
  }
  return { mimeType: "", ext: "webm" };
}

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17]
];

function MediaPipeHandsTracker({ videoRef, active, onTracking }) {
  React.useEffect(() => {
    if (!active || !videoRef.current) return;
    let stopped = false;
    let raf = 0;
    let hands = null;
    const video = videoRef.current;

    async function start() {
      if (!window.Hands) {
        onTracking?.({ status: "MediaPipe loading", landmarks: null, handVisible: false });
        return;
      }
      hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: .65,
        minTrackingConfidence: .55
      });
      hands.onResults((results) => {
        const landmarks = results.multiHandLandmarks?.[0] || null;
        onTracking?.({
          status: landmarks ? "Hand detected" : "AI watching live",
          landmarks,
          handVisible: Boolean(landmarks)
        });
      });
      const tick = async () => {
        if (stopped) return;
        if (video.readyState >= 2) await hands.send({ image: video });
        raf = requestAnimationFrame(tick);
      };
      tick();
    }

    start();
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      hands?.close?.();
    };
  }, [active, videoRef, onTracking]);

  return null;
}

/* ----- Practice step (camera) ----- */
function attachCameraStream(video, stream) {
  if (!video || !stream) return;
  if (video.srcObject !== stream) video.srcObject = stream;
  const playPromise = video.play?.();
  if (playPromise?.catch) playPromise.catch(() => {});
}

function PracticeStep({ word, onAnalyze, onBack }) {
  const [recording, setRecording] = React.useState(false);
  const [secs, setSecs] = React.useState(0);
  const [tracking, setTracking] = React.useState({ status: "AI watching live", landmarks: null, handVisible: false });
  const [error, setError] = React.useState("");
  const vidRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const recorderRef = React.useRef(null);
  const chunksRef = React.useRef([]);
  const samplesRef = React.useRef([]);
  const [hasCam, setHasCam] = React.useState(false);

  React.useEffect(() => {
    let stream = null;
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("This browser cannot open the camera. Please try Chrome on localhost.");
      return () => {};
    }
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 960 },
        height: { ideal: 720 }
      },
      audio: false
    }).
    then((s) => {
      stream = s;
      streamRef.current = s;
      attachCameraStream(vidRef.current, s);
      setHasCam(true);
      setError("");
    }).
    catch((cameraError) => {
      setHasCam(false);
      const reason = cameraError?.name ? ` (${cameraError.name})` : "";
      setError(`Camera permission is needed for live analysis${reason}. Allow camera access for this preview, then reload if the browser already blocked it.`);
    });
    return () => {
      recorderRef.current?.state === "recording" && recorderRef.current.stop();
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  React.useEffect(() => {
    if (hasCam) attachCameraStream(vidRef.current, streamRef.current);
  }, [hasCam]);

  React.useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const handleTracking = React.useCallback((next) => {
    setTracking(next);
    samplesRef.current = [...samplesRef.current.slice(-90), next];
  }, []);

  const startRecord = () => {
    if (!hasCam || !streamRef.current) {
      setError("Please allow camera access first, then press Sign now.");
      return;
    }
    if (!window.MediaRecorder) {
      setError("This browser cannot record video for backend analysis.");
      return;
    }
    setError("");
    setRecording(true);
    setSecs(0);
    chunksRef.current = [];
    samplesRef.current = [];

    const option = getRecordingOptions();
    const recorder = option.mimeType ?
      new MediaRecorder(streamRef.current, { mimeType: option.mimeType }) :
      new MediaRecorder(streamRef.current);
    recorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data?.size) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      setRecording(false);
      const mimeType = option.mimeType || chunksRef.current[0]?.type || "video/webm";
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const latest = [...samplesRef.current].reverse().find((sample) => sample.landmarks)?.landmarks || null;
      onAnalyze({
        videoBlob: blob,
        fileName: `signbuddy-${normalizeWordId(word)}.${option.ext}`,
        landmarks: latest
      });
    };

    recorder.start(250);
    window.setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
    }, 3000);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div className="nb-card-lg" style={{ background: "var(--cream-soft)", padding: 22 }}>
        <MediaPipeHandsTracker videoRef={vidRef} active={hasCam} onTracking={handleTracking} />
        <CameraView vidRef={vidRef} hasCam={hasCam} recording={recording} secs={secs} word={word}
        chipLeft="STEP 2 · PRACTICE" chipRight={<><I.Cam size={14} /> Camera</>} landmarks={tracking.landmarks} />

        <div style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <button onClick={onBack} className="nb-btn nb-btn--white">
            <I.ArrowL size={14} /> Watch again
          </button>
          <div className="nb-chip nb-chip--teal">
            <I.Sparkle size={14} /> {tracking.handVisible ? "Hand detected" : "AI watching live"}
          </div>
          <button onClick={startRecord} disabled={recording} className="nb-btn nb-btn--lg nb-btn--pink">
            {recording ? <>● Recording {secs}s</> : <><I.Play size={16} fill="currentColor" /> Sign now</>}
          </button>
        </div>
        {error &&
        <div className="nb-card-flat" style={{
          marginTop: 14, background: "var(--yellow)", padding: 12,
          fontWeight: 900, color: "var(--ink)"
        }}>
            {error}
          </div>
        }
      </div>

      <div className="nb-card" style={{
        background: "var(--teal)", padding: 16, marginTop: 18,
        display: "flex", gap: 12, alignItems: "center"
      }}>
        <Mascot color="teal" size={52} />
        <div style={{ flex: 1, fontWeight: 800 }}>
          Tip: Good light. Slow hands. Keep them in the yellow box.
        </div>
      </div>
    </div>);

}

function CameraView({ vidRef, hasCam, recording, secs, word, chipLeft, chipRight, analyzing = false, landmarks = null }) {
  return (
    <div className="cam-frame" style={{ aspectRatio: "16/10", position: "relative" }}>
      <video ref={vidRef} autoPlay playsInline muted style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", transform: "scaleX(-1)",
        opacity: hasCam ? 1 : 0,
        background: "#050a3a"
      }} />

      {!hasCam && <CamPlaceholder />}

      {/* hand overlay */}
      <CamOverlay recording={recording || analyzing} landmarks={landmarks} />

      <span className="nb-chip nb-chip--yellow" style={{
        position: "absolute", top: 16, left: 16, boxShadow: "3px 3px 0 var(--ink)"
      }}>{chipLeft}</span>

      <span className="nb-chip nb-chip--ink" style={{
        position: "absolute", top: 16, right: 16
      }}>{chipRight}</span>

      {recording &&
      <span className="nb-chip nb-chip--pink" style={{
        position: "absolute", top: 60, right: 16, color: "#fff",
        animation: "wobble 1.5s ease-in-out infinite"
      }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#fff" }} /> REC {secs}s
        </span>
      }

      <div style={{
        position: "absolute", bottom: 12, left: 12, right: 12,
        background: "var(--ink)", color: "var(--cream)",
        border: "3px solid var(--cream)", borderRadius: 14,
        padding: "8px 14px", fontWeight: 900, textAlign: "center",
        boxShadow: "3px 3px 0 var(--cream)"
      }}>
        {analyzing ? `Analyzing "${word}"...` :
        recording ? `Sign "${word}" now — I'm watching!` :
        `Put hands in the yellow box, then press "Sign now"`}
      </div>
    </div>);

}

function CamPlaceholder() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(circle at 50% 40%, #1a2cb8, #050a3a)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", flexDirection: "column", padding: 30, textAlign: "center"
    }}>
      <I.Cam size={48} />
      <div style={{ fontFamily: "Archivo Black", marginTop: 12, fontSize: "1.1rem" }}>Camera preview</div>
      <div style={{ marginTop: 6, opacity: .8, fontWeight: 700 }}>Allow camera access to see yourself signing.</div>
    </div>);

}

function CamOverlay({ recording, landmarks }) {
  // hand landmark overlay — animates when recording/analyzing
  const points = landmarks || null;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      {/* yellow position guide */}
      <rect x="240" y="100" width="320" height="320" rx="28"
      fill="none" stroke="#FFD747" strokeWidth="5" strokeDasharray="12 10">
        <animate attributeName="stroke-dashoffset" from="0" to="-44" dur="1.5s" repeatCount="indefinite" />
      </rect>
      {/* corner markers */}
      {[[240, 100], [560, 100], [240, 420], [560, 420]].map(([x, y], i) =>
      <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#FFD747" stroke="#0E1430" strokeWidth="3" />
        </g>
      )}
      {points?.length ?
      <g>
          <circle cx={(1 - points[0].x) * 800} cy={points[0].y * 500} r="28" fill="rgba(94,229,200,0.2)" />
          {HAND_CONNECTIONS.map(([a, b]) =>
          points[a] && points[b] ?
          <line key={`${a}-${b}`} x1={(1 - points[a].x) * 800} y1={points[a].y * 500} x2={(1 - points[b].x) * 800} y2={points[b].y * 500}
          stroke="#EC4F9C" strokeWidth="4" strokeLinecap="round" /> : null
          )}
          {points.map((p, i) =>
          <circle key={i} cx={(1 - p.x) * 800} cy={p.y * 500} r="7" fill="#FFD747" stroke="#0E1430" strokeWidth="3" />
          )}
        </g> :
      recording && <HandLandmarks />
      }
    </svg>);

}

function HandLandmarks() {
  return (
    <g>
      {/* center palm pulse */}
      <circle cx="400" cy="320" r="20" fill="rgba(94,229,200,0.3)">
        <animate attributeName="r" from="20" to="40" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from=".8" to="0" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {/* landmarks */}
      {[
      [400, 320], [370, 280], [350, 240], [340, 200], [335, 168],
      [410, 270], [420, 230], [428, 200], [434, 175],
      [440, 280], [452, 240], [462, 210], [470, 184],
      [460, 290], [478, 256], [492, 226], [502, 200],
      [475, 305], [495, 280], [510, 258], [524, 240]].
      map(([x, y], i) =>
      <circle key={i} cx={x} cy={y} r="6" fill="#FFD747" stroke="#0E1430" strokeWidth="2" />
      )}
      <g stroke="#EC4F9C" strokeWidth="3" fill="none">
        <polyline points="400,320 370,280 350,240 340,200 335,168" />
        <polyline points="400,320 410,270 420,230 428,200 434,175" />
        <polyline points="400,320 440,280 452,240 462,210 470,184" />
        <polyline points="400,320 460,290 478,256 492,226 502,200" />
        <polyline points="400,320 475,305 495,280 510,258 524,240" />
      </g>
    </g>);

}

function AnalysisStep({ word, landmarks }) {
  const emptyRef = React.useRef(null);
  return (
    <div style={{ marginTop: 24 }}>
      <div className="nb-card-lg" style={{ background: "var(--cream-soft)", padding: 22 }}>
        <CameraView vidRef={emptyRef} hasCam={false} recording={false} secs={0} word={word}
        chipLeft="STEP 3 · FEEDBACK" chipRight={<><I.Sparkle size={14} /> AI Analysis</>}
        analyzing landmarks={landmarks} />

        <div style={{ marginTop: 18, display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          <div className="nb-card nb-pop" style={{
            background: "var(--yellow)", padding: 20, display: "flex", gap: 14,
            alignItems: "center", gridColumn: "1 / -1"
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 999, background: "#fff",
              border: "3px solid var(--ink)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "3px 3px 0 var(--ink)", animation: "wobble 1.2s ease-in-out infinite"
            }}>
              <I.Sparkle size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="nb-chip nb-chip--ink" style={{ marginBottom: 8 }}>
                <I.Sparkle size={12} /> AI COACH
              </div>
              <div style={{ fontFamily: "Archivo Black", fontSize: "1.4rem" }}>
                Analyzing "{word}"...
              </div>
            </div>
          </div>
          {["Reading MediaPipe landmarks", "Sending video to backend", "Running sign recognition", "Writing four feedback notes"].map((label, i) =>
          <div key={label} className="nb-card-flat" style={{
            background: i % 2 ? "var(--yellow)" : "var(--mint)",
            padding: 14, display: "flex", gap: 10, alignItems: "center"
          }}>
              <div style={{
              width: 32, height: 32, borderRadius: 999,
              background: i % 2 ? "var(--orange)" : "var(--teal-deep)",
              color: "#fff", border: "3px solid var(--ink)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, animation: "wobble 1.4s ease-in-out infinite"
            }}>
                <I.Sparkle size={14} />
              </div>
              <span style={{ fontWeight: 800 }}>{label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----- Feedback step ----- */
function FeedbackStep({ word, feedback, onRetry, onContinue }) {
  const emptyRef = React.useRef(null);
  return (
    <div style={{ marginTop: 24 }}>
      <div className="nb-card-lg" style={{ background: "var(--cream-soft)", padding: 22 }}>
        <CameraView vidRef={emptyRef} hasCam={false} recording={false} secs={0} word={word}
        chipLeft="STEP 3 · FEEDBACK" chipRight={<><I.Sparkle size={14} /> AI Analysis</>}
        analyzing landmarks={feedback.landmarks} />

        {/* analysis panel below camera */}
        <div style={{ marginTop: 18, display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          {/* Main bubble */}
          <div className="nb-card nb-pop" style={{
            background: feedback.ok ? "var(--teal)" : "var(--yellow)",
            padding: 20, display: "flex", gap: 14, alignItems: "flex-start",
            gridColumn: "1 / -1"
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 999, background: "#fff",
              border: "3px solid var(--ink)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "3px 3px 0 var(--ink)"
            }}>
              <Mascot color={feedback.ok ? "teal" : "purple"} size={50} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="nb-chip nb-chip--ink" style={{ marginBottom: 8 }}>
                <I.Sparkle size={12} /> AI COACH
              </div>
              <div style={{ fontFamily: "Archivo Black", fontSize: "1.4rem" }}>
                {feedback.primary}
              </div>
              <div style={{ marginTop: 8, fontWeight: 900 }}>
                {feedback.source === "backend" ? `Live backend result · ${feedback.confidence}` : feedback.coachFeedback}
              </div>
            </div>
          </div>

          {/* Specific signals */}
          {feedback.details.slice(0, 4).map((d, i) => {
            const isOk = d.startsWith("✓");
            return (
              <div key={i} className="nb-card-flat" style={{
                background: isOk ? "var(--mint)" : "var(--yellow)",
                padding: 14, display: "flex", gap: 10, alignItems: "center"
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 999,
                  background: isOk ? "var(--teal-deep)" : "var(--orange)",
                  color: "#fff", border: "3px solid var(--ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  {isOk ? <I.Check size={16} /> : <I.Bolt size={14} />}
                </div>
                <span style={{ fontWeight: 800 }}>{d.slice(2)}</span>
              </div>);

          })}
        </div>
      </div>

      <div style={{ marginTop: 22, display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
        <button onClick={onRetry} className="nb-btn nb-btn--lg nb-btn--white">
          <I.Refresh size={16} /> Try again
        </button>
        <button onClick={onContinue} className="nb-btn nb-btn--lg nb-btn--blue">
          <I.Check size={16} /> {feedback.ok ? "Got it" : "Continue"}
        </button>
      </div>
    </div>);

}

/* ----- Success step ----- */
function SuccessStep({ word, nextWord, onContinue, onAgain }) {
  return (
    <div style={{ marginTop: 24, position: "relative" }}>
      {/* confetti */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: 30 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const colors = ["var(--yellow)", "var(--pink)", "var(--teal)", "var(--blue)", "var(--orange)"];
          return (
            <span key={i} className="confetti" style={{
              left: `${i * 4.3 % 100}%`,
              animationDelay: `${(i * 0.18).toFixed(2)}s`,
              background: colors[i % colors.length],
              transform: `rotate(${i * 33}deg)`
            }} />);

        })}
      </div>

      <div className="nb-card-lg" style={{
        background: "var(--pink)", color: "#fff", padding: "50px 30px",
        textAlign: "center", position: "relative", overflow: "visible"
      }}>
        <div style={{ position: "absolute", top: -40, left: "10%" }} className="nb-tilt-lg-l nb-float">
          <StarShape size={80} fill="var(--yellow)" />
        </div>
        <div style={{ position: "absolute", top: -50, right: "10%" }} className="nb-tilt-lg-r nb-float-slow">
          <Burst size={90} fill="var(--teal)" />
        </div>
        <div style={{ position: "absolute", bottom: -40, left: 30 }}>
          <Mascot color="yellow" size={100} className="nb-float" />
        </div>
        <div style={{ position: "absolute", bottom: -40, right: 30 }}>
          <Mascot color="blue" size={100} className="nb-float-slow" />
        </div>

        <Mascot color="purple" size={140} style={{ margin: "0 auto" }} className="nb-pop" />

        <div className="nb-chip nb-chip--yellow" style={{ marginTop: 10, color: "var(--ink)" }}>
          <I.Sparkle size={14} /> WORD UNLOCKED
        </div>

        <h1 style={{ marginTop: 12, color: "#fff" }}>You got "{word}"!</h1>
        <p style={{ marginTop: 10, fontSize: "1.1rem", fontWeight: 800 }}>
          Nice work. Your hands look great.
        </p>

        {/* rewards row */}
        <div style={{ marginTop: 28, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <RewardChip icon={<I.Star />} label="+10 XP" bg="var(--yellow)" />
          <RewardChip icon={<I.Flame />} label="Streak 7" bg="var(--orange)" />
          <RewardChip icon={<I.Trophy />} label="Greeter badge" bg="var(--teal)" />
        </div>

        {nextWord &&
        <div className="nb-card" style={{
          background: "#fff", color: "var(--ink)",
          padding: 18, marginTop: 30,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          maxWidth: 460, margin: "30px auto 0", textAlign: "left"
        }}>
            <div>
              <div className="nb-chip nb-chip--teal">NEXT UP</div>
              <div style={{ marginTop: 6, fontFamily: "Archivo Black", fontSize: "1.4rem" }}>"{nextWord}"</div>
            </div>
            <I.Arrow size={28} />
          </div>
        }

        <div style={{ marginTop: 28, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onAgain} className="nb-btn nb-btn--white">
            <I.Refresh size={16} /> Practice again
          </button>
          <button onClick={onContinue} className="nb-btn nb-btn--lg nb-btn--ink">
            Next word <I.Arrow size={16} />
          </button>
        </div>
      </div>
    </div>);

}

function RewardChip({ icon, label, bg }) {
  return (
    <div className="nb-card" style={{
      background: bg, color: "var(--ink)",
      padding: "12px 18px",
      display: "flex", alignItems: "center", gap: 10,
      fontFamily: "Archivo Black",
      transform: "rotate(-2deg)"
    }}>
      {icon} <span>{label}</span>
    </div>);

}

Object.assign(window, { LearningPath, WordLesson, COURSE, buildCourseProgress });
