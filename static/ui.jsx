/* global React */
// Shared UI: mascots, decorative stickers, icons, header/footer

const MASCOTS = {
  blue: "assets/mascot-blue.png",
  pink: "assets/mascot-pink.png",
  purple: "assets/mascot-purple.png",
  yellow: "assets/mascot-yellow.png",
  teal: "assets/mascot-teal.png",
  pinkAlt: "assets/mascot-pink-alt.png",
  blueAlt: "assets/mascot-blue-alt.png",
  group: "assets/mascot-group.png",
  happy: "assets/mascot-happy.png",
  brand: "assets/brand-logo.png"
};

function Mascot({ color = "blue", size = 120, className = "", style = {}, alt }) {
  return (
    <img
      src={MASCOTS[color] || MASCOTS.blue}
      width={size}
      alt={alt || `${color} buddy`}
      className={`mascot ${className}`}
      style={{ width: size, ...style }}
      draggable={false} />);


}

/* ============ Decorative SVG stickers ============ */

function Asterisk({ size = 80, fill = "var(--orange)", rotate = 0, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotate}deg)`, filter: "drop-shadow(4px 4px 0 var(--ink))", ...style }}>
      
      <path
        d="M50 5 L58 36 L88 22 L70 50 L94 60 L65 60 L78 88 L50 70 L22 88 L35 60 L6 60 L30 50 L12 22 L42 36 Z"
        fill={fill}
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round" />
      
    </svg>);

}

function Burst({ size = 90, fill = "var(--orange)", rotate = 0, points = 12, style = {} }) {
  // wavy starburst (like the orange blob in reference)
  const r1 = 48,r2 = 38;
  const cx = 50,cy = 50;
  const path = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? r1 : r2;
    const a = Math.PI * 2 * i / (points * 2) - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotate}deg)`, filter: "drop-shadow(4px 4px 0 var(--ink))", ...style }}>
      
      <path d={path} fill={fill} stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    </svg>);

}

function Sparkle({ size = 40, fill = "var(--yellow)", rotate = 0, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <path
        d="M50 5 Q55 45 95 50 Q55 55 50 95 Q45 55 5 50 Q45 45 50 5 Z"
        fill={fill}
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round" />
      
    </svg>);

}

function Squiggle({ width = 120, color = "var(--ink)", style = {} }) {
  return (
    <svg width={width} height="20" viewBox="0 0 120 20" style={style}>
      <path
        d="M2 10 Q 15 2 28 10 T 54 10 T 80 10 T 106 10 T 118 10"
        stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      
    </svg>);

}

function HandDrawArrow({ width = 160, color = "var(--ink)", flip = false, style = {} }) {
  return (
    <svg width={width} height="80" viewBox="0 0 160 80" style={{ transform: flip ? "scaleX(-1)" : "none", ...style }}>
      <path
        d="M8 14 Q 40 8 70 28 Q 100 48 145 60"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      <path
        d="M145 60 L 130 50 M145 60 L 135 75"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      
    </svg>);

}

function Heart({ size = 30, fill = "var(--pink)", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <path
        d="M50 88 C 20 65 8 45 8 28 C 8 14 18 6 30 6 C 40 6 47 12 50 20 C 53 12 60 6 70 6 C 82 6 92 14 92 28 C 92 45 80 65 50 88 Z"
        fill={fill} stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      
    </svg>);

}

function StarShape({ size = 38, fill = "var(--yellow)", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <path
        d="M50 6 L62 38 L96 40 L70 60 L80 92 L50 74 L20 92 L30 60 L4 40 L38 38 Z"
        fill={fill} stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      
    </svg>);

}

/* ============ Icons (line, neobrutal) ============ */

const Icon = ({ d, size = 22, stroke = 2.8, fill = "none", color = "currentColor" }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>;


const I = {
  Arrow: (p) => <Icon {...p} d={["M5 12h14", "M13 6l6 6-6 6"]} />,
  ArrowL: (p) => <Icon {...p} d={["M19 12H5", "M11 6l-6 6 6 6"]} />,
  Play: (p) => <Icon {...p} d="M7 4l13 8-13 8V4z" fill="currentColor" />,
  Pause: (p) => <Icon {...p} d={["M7 4v16", "M17 4v16"]} />,
  Cam: (p) => <Icon {...p} d={["M3 7h4l2-3h6l2 3h4v12H3z", "M12 17a4 4 0 100-8 4 4 0 000 8z"]} />,
  Check: (p) => <Icon {...p} d="M4 12l5 5L20 6" />,
  Lock: (p) => <Icon {...p} d={["M6 11h12v9H6z", "M9 11V8a3 3 0 016 0v3"]} />,
  Star: (p) => <Icon {...p} d="M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="currentColor" />,
  Flame: (p) => <Icon {...p} d="M12 2c1 4 6 6 6 11a6 6 0 11-12 0c0-3 2-4 3-6 .8-1.6.5-3 .5-5 1.5 1 2 2 2.5 0z" fill="currentColor" />,
  Trophy: (p) => <Icon {...p} d={["M8 4h8v6a4 4 0 11-8 0V4z", "M4 6h4v3a2 2 0 01-2 2H4z", "M20 6h-4v3a2 2 0 002 2h2z", "M9 18h6", "M12 14v4"]} />,
  Sparkle: (p) => <Icon {...p} d={["M12 3v6", "M12 15v6", "M3 12h6", "M15 12h6", "M6 6l3 3", "M15 15l3 3", "M18 6l-3 3", "M9 15l-6 6"]} />,
  X: (p) => <Icon {...p} d={["M6 6l12 12", "M18 6L6 18"]} />,
  Bolt: (p) => <Icon {...p} d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" />,
  Eye: (p) => <Icon {...p} d={["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M12 9a3 3 0 100 6 3 3 0 000-6z"]} />,
  Mic: (p) => <Icon {...p} d={["M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z", "M5 11a7 7 0 0014 0", "M12 18v3"]} />,
  Heart: (p) => <Icon {...p} d="M20 8a5 5 0 00-8-4 5 5 0 00-8 4c0 6 8 11 8 11s8-5 8-11z" fill="currentColor" />,
  Refresh: (p) => <Icon {...p} d={["M3 12a9 9 0 0115-6.7L21 8", "M21 3v5h-5", "M21 12a9 9 0 01-15 6.7L3 16", "M3 21v-5h5"]} />,
  Hand: (p) => <Icon {...p} d="M7 11V5a2 2 0 014 0v6m0 0V3a2 2 0 014 0v8m0 0V5a2 2 0 014 0v8a8 8 0 01-16 0v-2a2 2 0 014 0" />,
  Home: (p) => <Icon {...p} d={["M3 11l9-8 9 8", "M5 10v10h14V10"]} />,
  Brain: (p) => <Icon {...p} d="M9 4a3 3 0 00-3 3v1a3 3 0 00-2 5 3 3 0 002 5v1a3 3 0 003 3 3 3 0 003-3 3 3 0 003 3 3 3 0 003-3v-1a3 3 0 002-5 3 3 0 00-2-5V7a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 00-3-3z" />,
  Users: (p) => <Icon {...p} d={["M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2", "M9 11a4 4 0 100-8 4 4 0 000 8z", "M22 21v-2a4 4 0 00-3-3.87", "M16 3.13a4 4 0 010 7.75"]} />,
  Baby: (p) => <Icon {...p} d={["M9 12a3 3 0 006 0", "M9 8h.01", "M15 8h.01", "M12 2a8 8 0 100 16 8 8 0 000-16z"]} />,
  ChevR: (p) => <Icon {...p} d="M9 6l6 6-6 6" />,
  Menu: (p) => <Icon {...p} d={["M4 7h16", "M4 12h16", "M4 17h16"]} />,
  Dot: (p) => <Icon {...p} d="M12 12h.01" stroke="currentColor" />
};

/* ============ Stickers (mascots + decoration in clusters) ============ */

function StickerCluster({ which = "hero" }) {
  if (which === "hero") {
    return (
      <>
        <div style={{ position: "absolute", left: -20, top: 30 }} className="nb-float-slow">
          <Burst size={120} fill="var(--orange)" rotate={-12} />
        </div>
        <div style={{ position: "absolute", right: -10, top: 60 }} className="nb-float">
          <Asterisk size={86} fill="var(--blue)" rotate={20} />
        </div>
        <div style={{ position: "absolute", left: 40, bottom: -20 }} className="nb-float">
          <Sparkle size={56} fill="var(--yellow)" rotate={10} />
        </div>
        <div style={{ position: "absolute", right: 60, bottom: 0 }} className="nb-float-slow">
          <Burst size={70} fill="var(--teal)" rotate={30} points={10} />
        </div>
      </>);

  }
  return null;
}

/* ============ Header / Footer / Layout ============ */

function NbHeader({ screen, onNav, onStart, loggedIn }) {
  const isApp = loggedIn;
  return (
    <header className="nb-header">
      <div className="nb-header-inner">
        <button className="nb-logo" onClick={() => onNav("landing")}>
          <span className="nb-logo-mark">
            <img src={MASCOTS.brand} alt="" />
          </span>
          <span>Sign<span style={{ color: "var(--blue)" }}>Buddy</span></span>
          <span className="nb-chip nb-chip--yellow" style={{ marginLeft: 4 }}>BETA</span>
        </button>

        {isApp &&
        <nav className="nb-nav">
            {[
          ["path", "Learn"],
          ["practice", "Practice"],
          ["dashboard", "Parents"]].
          map(([k, label]) =>
          <button
            key={k}
            className={screen === k ? "active" : ""}
            onClick={() => onNav(k)}>
            {label}</button>
          )}
          </nav>
        }

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {isApp ?
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div className="nb-chip nb-chip--orange"><I.Flame size={14} /> 6</div>
              <div className="nb-chip nb-chip--yellow"><I.Star size={14} /> 240</div>
              <div style={{
              width: 44, height: 44, borderRadius: 999, overflow: "hidden",
              border: "3px solid var(--ink)", background: "var(--pink)",
              boxShadow: "3px 3px 0 var(--ink)"
            }}>
                <Mascot color="pink" size={44} />
              </div>
            </div> :

          <>
              <button className="nb-btn nb-btn--white" onClick={() => onNav("dashboard")}>
                Parent mode
              </button>
              <button className="nb-btn nb-btn--yellow" onClick={onStart}>
                Start free <I.Arrow size={16} />
              </button>
            </>
          }
        </div>
      </div>
    </header>);

}

function NbFooter() {
  return (
    <footer className="nb-footer">
      <div className="nb-footer-inner">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Mascot color="pink" size={36} />
          <strong>SignBuddy © 2026</strong>
          <span style={{ opacity: .6 }}>· Built with care for every family</span>
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          <a style={{ color: "inherit" }}>About</a>
          <a style={{ color: "inherit" }}>Accessibility</a>
          <a style={{ color: "inherit" }}>Privacy</a>
          <a style={{ color: "inherit" }}>Contact</a>
        </div>
      </div>
    </footer>);

}

/* ============ Marquee strip (used between sections) ============ */

function MarqueeStrip({ items, bg = "var(--blue)", color = "#fff" }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div style={{
      borderTop: "3px solid var(--ink)",
      borderBottom: "3px solid var(--ink)",
      background: bg,
      color,
      overflow: "hidden",
      padding: "14px 0",
      position: "relative"
    }}>
      <div style={{
        display: "flex", gap: 50, whiteSpace: "nowrap",
        animation: "marquee 30s linear infinite",
        fontFamily: "Archivo Black, sans-serif",
        fontSize: "1.4rem",
        letterSpacing: ".02em"
      }}>
        {repeated.map((it, i) =>
        <span key={i} style={{ display: "inline-flex", gap: 30, alignItems: "center" }}>
            <span>{it}</span>
            <StarShape size={22} fill="var(--yellow)" />
          </span>
        )}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
      `}</style>
    </div>);

}

Object.assign(window, {
  MASCOTS, Mascot, Asterisk, Burst, Sparkle, Squiggle, HandDrawArrow,
  Heart, StarShape, Icon, I, StickerCluster, NbHeader, NbFooter, MarqueeStrip
});
