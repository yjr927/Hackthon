/* global React, ReactDOM, Landing, Onboarding, LearningPath, WordLesson, PracticeReview, ParentDashboard, COURSE, buildCourseProgress, NbHeader, NbFooter, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "blue",
  "background": "cream",
  "shadows": "bold",
  "stickers": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = {
  blue: { hero: "var(--blue)", primary: "var(--blue)", pillBg: "var(--teal)" },
  pink: { hero: "var(--pink)", primary: "var(--pink)", pillBg: "var(--yellow)" },
  teal: { hero: "var(--teal)", primary: "var(--teal-deep)", pillBg: "var(--orange)" },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState("landing");
  const [activeWord, setActiveWord] = React.useState("Book");
  const [unlockedIndex, setUnlockedIndex] = React.useState(1);

  // Apply tweak vars
  React.useEffect(() => {
    const r = document.documentElement;
    if (tweaks.background === "ink") {
      r.style.setProperty("--cream", "#0E1430");
      r.style.setProperty("--cream-soft", "#1A2147");
    } else if (tweaks.background === "mint") {
      r.style.setProperty("--cream", "#D7F5E3");
      r.style.setProperty("--cream-soft", "#EEFCF3");
    } else {
      r.style.setProperty("--cream", "#F4ECD8");
      r.style.setProperty("--cream-soft", "#FBF6E8");
    }
    if (tweaks.shadows === "subtle") {
      r.style.setProperty("--sh-sm", "2px 2px 0 var(--ink)");
      r.style.setProperty("--sh-md", "3px 3px 0 var(--ink)");
      r.style.setProperty("--sh-lg", "5px 5px 0 var(--ink)");
    } else if (tweaks.shadows === "extreme") {
      r.style.setProperty("--sh-sm", "6px 6px 0 var(--ink)");
      r.style.setProperty("--sh-md", "10px 10px 0 var(--ink)");
      r.style.setProperty("--sh-lg", "16px 16px 0 var(--ink)");
    } else {
      r.style.setProperty("--sh-sm", "4px 4px 0 var(--ink)");
      r.style.setProperty("--sh-md", "6px 6px 0 var(--ink)");
      r.style.setProperty("--sh-lg", "10px 10px 0 var(--ink)");
    }
  }, [tweaks.background, tweaks.shadows]);

  const loggedIn = !["landing", "onboarding"].includes(screen);

  // Find word/next word
  const course = React.useMemo(() => buildCourseProgress(unlockedIndex), [unlockedIndex]);
  const flatLessons = course.flatMap(c => c.lessons);
  const findLesson = (w) => {
    const idx = flatLessons.findIndex(l => l.word.toLowerCase() === w.toLowerCase());
    if (idx === -1) return { lesson: null, next: null };
    return { lesson: flatLessons[idx], next: flatLessons[idx + 1] };
  };

  const onStartLesson = (id, word) => {
    setActiveWord(word || "Hello");
    setScreen("lesson");
  };

  const completeLesson = () => {
    const idx = flatLessons.findIndex(l => l.word.toLowerCase() === activeWord.toLowerCase());
    const { next } = findLesson(activeWord);
    if (idx >= 0) setUnlockedIndex((current) => Math.max(current, idx + 1));
    if (next) {
      setActiveWord(next.word);
      setScreen("path");
    } else {
      setScreen("path");
    }
  };

  return (
    <>
      <NbHeader
        screen={screen === "lesson" ? "lesson" : screen}
        onNav={(k) => {
          if (k === "landing") setScreen("landing");
          if (k === "path") setScreen("path");
          if (k === "practice") setScreen("practice");
          if (k === "lesson") {
            const currentLesson = flatLessons.find((l) => l.status === "current") || flatLessons[0];
            setActiveWord(currentLesson.word);
            setScreen("lesson");
          }
          if (k === "dashboard") setScreen("dashboard");
        }}
        onStart={() => setScreen("onboarding")}
        loggedIn={loggedIn}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {screen === "landing" && (
          <Landing
            onStart={() => setScreen("onboarding")}
            onParents={() => setScreen("dashboard")}
          />
        )}
        {screen === "onboarding" && (
          <Onboarding onBack={() => setScreen("landing")} onDone={() => setScreen("path")} />
        )}
        {screen === "path" && (
          <LearningPath onStartLesson={onStartLesson} course={course} />
        )}
        {screen === "practice" && (
          <PracticeReview
            onPractice={(w) => { setActiveWord(w); setScreen("lesson"); }}
          />
        )}
        {screen === "lesson" && (
          <WordLesson
            word={activeWord}
            nextWord={findLesson(activeWord).next?.word}
            onComplete={completeLesson}
            onExit={() => setScreen("path")}
            startStep="watch"
          />
        )}
        {screen === "dashboard" && (
          <ParentDashboard
            onPracticeTogether={() => {
              setActiveWord("Thank you");
              setScreen("lesson");
            }}
            onGoLearn={() => setScreen("path")}
          />
        )}
      </div>

      <NbFooter />

      {/* Floating jump-to-screen panel — always visible (this is a demo prototype) */}
      <ScreenJump screen={screen} setScreen={setScreen} />

      <TweaksPanel title="SignBuddy Tweaks">
        <TweakSection label="Background">
          <TweakRadio
            label="Tone"
            value={tweaks.background}
            onChange={(v) => setTweak("background", v)}
            options={["cream", "mint", "ink"]}
          />
        </TweakSection>
        <TweakSection label="Shadows">
          <TweakRadio
            label="Depth"
            value={tweaks.shadows}
            onChange={(v) => setTweak("shadows", v)}
            options={["subtle", "bold", "extreme"]}
          />
        </TweakSection>
        <TweakSection label="Stickers">
          <TweakToggle
            value={tweaks.stickers}
            onChange={(v) => setTweak("stickers", v)}
            label="Floating mascots & shapes"
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

/* Floating screen-navigator for the demo (this is a prototype, not the product UI) */
function ScreenJump({ screen, setScreen }) {
  const [open, setOpen] = React.useState(false);
  const screens = [
    ["landing", "Landing"],
    ["onboarding", "Onboarding"],
    ["path", "Learning path"],
    ["practice", "Practice (memory curve)"],
    ["lesson", "Word lesson"],
    ["dashboard", "Parent dashboard"],
  ];
  return (
    <div style={{
      position: "fixed", left: 18, bottom: 18, zIndex: 60,
      fontFamily: "Nunito, sans-serif",
    }}>
      {open ? (
        <div className="nb-card" style={{ background: "#fff", padding: 14, minWidth: 220 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong style={{ fontFamily: "Archivo Black", fontSize: ".9rem" }}>Jump to screen</strong>
            <button onClick={() => setOpen(false)} style={{
              border: "none", background: "transparent", cursor: "pointer", padding: 4,
            }}><I.X size={16} /></button>
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            {screens.map(([k, label]) => (
              <button key={k} onClick={() => setScreen(k)} style={{
                border: "3px solid var(--ink)", borderRadius: 14,
                padding: "8px 12px",
                background: screen === k ? "var(--yellow)" : "#fff",
                color: "var(--ink)",
                cursor: "pointer", textAlign: "left",
                fontWeight: 900, fontSize: ".88rem",
                boxShadow: "2px 2px 0 var(--ink)",
              }}>{label}</button>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="nb-btn nb-btn--ink" style={{ boxShadow: "4px 4px 0 var(--yellow)" }}>
          <I.Menu size={16} /> Demo nav
        </button>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
