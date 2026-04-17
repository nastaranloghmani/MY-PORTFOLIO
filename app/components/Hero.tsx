"use client";

import { useEffect, useRef, useState } from "react";

// ─── UI Fragment content components ──────────────────────────────────────────

function TypeFragment() {
  return (
    <div style={{ padding: "16px 18px", minWidth: 110 }}>
      <div style={{ fontSize: 34, fontWeight: 300, color: "#1a4f6e", letterSpacing: "-0.03em", lineHeight: 1 }}>Aa</div>
      <div style={{ height: 1, background: "rgba(26,79,110,0.1)", margin: "10px 0 8px" }} />
      {[100, 72, 50].map((w, i) => (
        <div key={i} style={{ height: 1.5, borderRadius: 1, background: `rgba(26,79,110,${0.08 + i * 0.05})`, width: `${w}%`, marginBottom: 4 }} />
      ))}
      <div style={{ fontSize: 8, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>Typography</div>
    </div>
  );
}

function ColorFragment() {
  return (
    <div style={{ padding: "14px 16px", minWidth: 130 }}>
      <div style={{ fontSize: 8, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Color System</div>
      <div style={{ display: "flex", gap: 4 }}>
        {["#050d1a", "#1a4f6e", "#2a7fa8", "#5ab3d8", "#cce8f4"].map((c) => (
          <div key={c} style={{ flex: 1, height: 32, background: c, borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontSize: 7, color: "#ccc" }}>Dark</span>
        <span style={{ fontSize: 7, color: "#ccc" }}>Light</span>
      </div>
    </div>
  );
}

function ComponentFragment() {
  return (
    <div style={{ padding: "14px 16px", minWidth: 148 }}>
      <div style={{ fontSize: 8, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>UI Components</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <div style={{ padding: "5px 12px", background: "#1a4f6e", color: "white", fontSize: 9, letterSpacing: "0.05em" }}>Primary</div>
        <div style={{ padding: "5px 12px", border: "1px solid rgba(26,79,110,0.28)", color: "#1a4f6e", fontSize: 9, letterSpacing: "0.05em" }}>Ghost</div>
      </div>
      <div style={{ height: 1, background: "rgba(26,79,110,0.07)", marginBottom: 8 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2a7fa8", flexShrink: 0 }} />
        <div style={{ height: 3, background: "rgba(26,79,110,0.08)", flex: 1, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function MetricFragment() {
  return (
    <div style={{ padding: "14px 18px", minWidth: 100 }}>
      <div style={{ fontSize: 8, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Performance</div>
      <div style={{ fontSize: 32, fontWeight: 600, color: "#1a4f6e", lineHeight: 1 }}>98</div>
      <div style={{ fontSize: 10, color: "#2a7fa8", marginTop: 2 }}>/ 100</div>
      <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: "rgba(26,79,110,0.07)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: "98%", background: "linear-gradient(90deg, #1a4f6e, #2a7fa8)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

function WireframeFragment() {
  return (
    <div style={{ padding: "14px 16px", minWidth: 112 }}>
      <div style={{ fontSize: 8, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Layout</div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 3 }}>
        <div style={{ height: 38, border: "1px solid rgba(26,79,110,0.12)", background: "rgba(26,79,110,0.03)" }} />
        <div style={{ height: 38, border: "1px solid rgba(26,79,110,0.12)", background: "rgba(26,79,110,0.03)" }} />
        <div style={{ height: 8, border: "1px solid rgba(26,79,110,0.08)", gridColumn: "1/-1", background: "rgba(26,79,110,0.02)" }} />
        <div style={{ height: 8, border: "1px solid rgba(26,79,110,0.08)", background: "rgba(26,79,110,0.02)" }} />
        <div style={{ height: 8, border: "1px solid rgba(26,79,110,0.08)", background: "rgba(26,79,110,0.02)" }} />
      </div>
    </div>
  );
}

function ResearchFragment() {
  const bars = [{ label: "Users", v: 85 }, { label: "Retention", v: 72 }, { label: "NPS", v: 91 }];
  return (
    <div style={{ padding: "14px 16px", minWidth: 126 }}>
      <div style={{ fontSize: 8, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Research</div>
      {bars.map(({ label, v }) => (
        <div key={label} style={{ marginBottom: 7 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 8, color: "#bbb" }}>{label}</span>
            <span style={{ fontSize: 8, color: "#2a7fa8" }}>{v}%</span>
          </div>
          <div style={{ height: 2, borderRadius: 1, background: "rgba(26,79,110,0.07)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${v}%`, background: "linear-gradient(90deg, #1a4f6e, #2a7fa8)", borderRadius: 1 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Fragment definitions ─────────────────────────────────────────────────────

type FragDef = {
  id: string;
  depth: number;
  x: string; // CSS left
  y: string; // CSS top
  delay: number;
  hideOnMobile?: boolean;
  Component: () => React.JSX.Element;
};

const FRAGMENTS: FragDef[] = [
  { id: "type",      depth: 0.5,  x: "6%",  y: "16%", delay: 300,  Component: TypeFragment },
  { id: "color",     depth: 0.85, x: "65%", y: "9%",  delay: 150,  Component: ColorFragment },
  { id: "component", depth: 1.25, x: "75%", y: "46%", delay: 500,  Component: ComponentFragment },
  { id: "metric",    depth: 0.7,  x: "68%", y: "74%", delay: 250,  Component: MetricFragment },
  { id: "wireframe", depth: 1.1,  x: "2%",  y: "62%", delay: 400,  Component: WireframeFragment, hideOnMobile: true },
  { id: "research",  depth: 0.4,  x: "36%", y: "3%",  delay: 100,  Component: ResearchFragment, hideOnMobile: true },
];

// ─── Main Hero ────────────────────────────────────────────────────────────────

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const mouseRef   = useRef({ x: 0, y: 0 });
  const offsetRef  = useRef(FRAGMENTS.map(() => ({ x: 0, y: 0 })));
  const fragEls    = useRef<(HTMLDivElement | null)[]>([]);
  const blob1Ref   = useRef<HTMLDivElement>(null);
  const blob2Ref   = useRef<HTMLDivElement>(null);
  const blob3Ref   = useRef<HTMLDivElement>(null);
  const blobOff    = useRef({ x: 0, y: 0 });
  const rafRef     = useRef<number>(0);

  useEffect(() => { setMounted(true); }, []);

  // Track mouse
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Parallax RAF
  useEffect(() => {
    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;

      // Blobs move gently opposite to mouse (world-move feel)
      blobOff.current.x += (-mx * 18 - blobOff.current.x) * 0.04;
      blobOff.current.y += (-my * 12 - blobOff.current.y) * 0.04;
      const bx = blobOff.current.x;
      const by = blobOff.current.y;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(calc(-50% + ${bx * 0.6}px), calc(-50% + ${by * 0.6}px))`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(calc(-50% + ${bx * 1.0}px), calc(-50% + ${by * 1.0}px))`;
      if (blob3Ref.current) blob3Ref.current.style.transform = `translate(calc(-50% + ${bx * 1.4}px), calc(-50% + ${by * 1.4}px))`;

      // Fragments parallax toward mouse
      FRAGMENTS.forEach((frag, i) => {
        const el = fragEls.current[i];
        if (!el) return;
        const tx = mx * 22 * frag.depth;
        const ty = my * 14 * frag.depth;
        offsetRef.current[i].x += (tx - offsetRef.current[i].x) * 0.05;
        offsetRef.current[i].y += (ty - offsetRef.current[i].y) * 0.05;
        el.style.transform = `translate(${offsetRef.current[i].x}px, ${offsetRef.current[i].y}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%,100% { border-radius: 60% 40% 50% 50% / 40% 60% 50% 50%; }
          33%      { border-radius: 40% 60% 65% 35% / 60% 35% 65% 40%; }
          66%      { border-radius: 70% 30% 40% 60% / 30% 65% 35% 65%; }
        }
        @keyframes blob2 {
          0%,100% { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; }
          50%      { border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%; }
        }
        @keyframes blob3 {
          0%,100% { border-radius: 50% 50% 70% 30% / 30% 70% 50% 50%; }
          40%      { border-radius: 30% 70% 40% 60% / 70% 30% 60% 40%; }
          80%      { border-radius: 60% 40% 30% 70% / 40% 60% 70% 30%; }
        }
        @keyframes heroIn {
          from { opacity:0; transform: translateY(28px); }
          to   { opacity:1; transform: translateY(0);    }
        }
        .hero-fragment-card:hover {
          box-shadow: 0 10px 40px rgba(26,79,110,0.14), 0 2px 10px rgba(26,79,110,0.08) !important;
          border-color: rgba(42,127,168,0.28) !important;
          background: rgba(255,255,255,0.96) !important;
        }
        .hero-fragment-card {
          transition: box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease, transform 0.35s ease;
        }
        .hero-cta:hover {
          background: #163f58 !important;
          gap: 18px !important;
        }
        .hero-cta { transition: background 0.25s ease, gap 0.25s ease; }
      `}</style>

      <section className="relative min-h-screen overflow-hidden" style={{ background: "#f7f8fa" }}>

        {/* ── Dot grid ── */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(26,79,110,0.045) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }} />

        {/* ── Blob 1 — outermost, slowest ── */}
        <div ref={blob1Ref} aria-hidden="true" style={{
          position: "absolute", width: "72vmin", height: "72vmin",
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle at 50% 50%, rgba(42,127,168,0.07) 0%, rgba(26,79,110,0.04) 45%, transparent 72%)",
          animation: "blob1 22s ease-in-out infinite",
          filter: "blur(3px)",
        }} />

        {/* ── Blob 2 — mid ── */}
        <div ref={blob2Ref} aria-hidden="true" style={{
          position: "absolute", width: "52vmin", height: "52vmin",
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle at 40% 60%, rgba(42,127,168,0.10) 0%, rgba(26,79,110,0.05) 55%, transparent 78%)",
          animation: "blob2 14s ease-in-out infinite",
        }} />

        {/* ── Blob 3 — inner core ── */}
        <div ref={blob3Ref} aria-hidden="true" style={{
          position: "absolute", width: "30vmin", height: "30vmin",
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(42,127,168,0.14) 0%, rgba(90,179,216,0.06) 50%, transparent 72%)",
          animation: "blob3 9s ease-in-out infinite",
        }} />

        {/* ── UI Fragment cards ── */}
        {mounted && FRAGMENTS.map((frag, i) => {
          const { Component, x, y, id, delay, hideOnMobile } = frag;
          return (
            <div
              key={id}
              ref={el => { fragEls.current[i] = el; }}
              className={hideOnMobile ? "hidden md:block" : ""}
              style={{
                position: "absolute", left: x, top: y,
                zIndex: 10,
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.9s ease ${delay}ms`,
                willChange: "transform",
              }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="hero-fragment-card"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 4px 28px rgba(26,79,110,0.07), 0 1px 5px rgba(0,0,0,0.04)",
                  transform: hovered === id ? "scale(1.05)" : "scale(1)",
                }}
              >
                <Component />
              </div>
            </div>
          );
        })}

        {/* ── Central text ── */}
        <div style={{
          position: "relative", zIndex: 20,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          minHeight: "100vh", textAlign: "center",
          padding: "100px 24px 80px",
        }}>

          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginBottom: 32,
            animation: mounted ? "heroIn 0.7s ease 0.1s both" : "none",
          }}>
            <span style={{ width: 28, height: 1, background: "#1a4f6e", display: "inline-block" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a4f6e", fontWeight: 500 }}>
              UX/UI Developer · Dubai, UAE
            </span>
            <span style={{ width: 28, height: 1, background: "#1a4f6e", display: "inline-block" }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(3rem, 6.5vw, 6rem)",
            fontWeight: 600, lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#0d1b26",
            maxWidth: 640, marginBottom: 24,
            animation: mounted ? "heroIn 0.85s ease 0.22s both" : "none",
          }}>
            I design products<br />
            <span style={{
              background: "linear-gradient(130deg, #1a4f6e 0%, #2a7fa8 60%, #5ab3d8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              that feel right.
            </span>
          </h1>

          {/* Subline */}
          <p style={{
            fontSize: 15, color: "#7a8694", letterSpacing: "0.02em",
            marginBottom: 44,
            animation: mounted ? "heroIn 0.85s ease 0.38s both" : "none",
          }}>
            UX thinker. Product builder. AI-driven designer.
          </p>

          {/* Single CTA */}
          <a
            href="#projects"
            className="hero-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "#1a4f6e", color: "white",
              padding: "15px 34px",
              fontSize: 12, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none",
              animation: mounted ? "heroIn 0.85s ease 0.52s both" : "none",
            }}
          >
            View My Work
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8,
          opacity: mounted ? 0.5 : 0,
          transition: "opacity 1s ease 1.2s",
          zIndex: 20, pointerEvents: "none",
        }}>
          <span style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa" }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #bbb, transparent)" }} />
        </div>

      </section>
    </>
  );
}
