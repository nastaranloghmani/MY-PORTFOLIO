"use client";

import { useEffect, useRef, useState } from "react";

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const GAP = 32;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wave = Math.sin((c + r) * 0.35 - t) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(c * GAP, r * GAP, 0.8 + wave * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26,79,110,${0.06 + wave * 0.2})`;
          ctx.fill();
        }
      }
      t += 0.018;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function SplitChars({ text, show, baseDelay = 0, color }: { text: string; show: boolean; baseDelay?: number; color?: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          transform: show ? "translateY(0)" : "translateY(70px)",
          opacity: show ? 1 : 0,
          transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 0.022}s, opacity 0.5s ease ${baseDelay + i * 0.022}s`,
          color: color,
        }}>
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "0 32px",
      maxWidth: 1200,
      margin: "0 auto",
      width: "100%",
      position: "relative",
    }}>
      {/* Index label */}
      <div style={{
        paddingTop: 108,
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#aaa",
        position: "relative", zIndex: 1,
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease 0.1s",
      }}>
        001 - Portfolio
      </div>

      {/* Dot grid */}
      <div style={{
        flex: 1, position: "relative",
        minHeight: 200, maxHeight: 340, marginTop: 24,
        opacity: show ? 1 : 0,
        transition: "opacity 1.2s ease 0.4s",
      }}>
        <DotGrid />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: "linear-gradient(to bottom, transparent, #fff)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Headline — character split animation */}
      <div style={{ paddingBottom: 72, position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontSize: "clamp(3.4rem, 7.5vw, 7.5rem)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          color: "#0f0f0f",
          margin: "0 0 36px",
          overflow: "hidden",
        }}>
          <div style={{ overflow: "hidden", display: "block" }}>
            <SplitChars text="Designing products" show={show} baseDelay={0.2} />
          </div>
          <div style={{ overflow: "hidden", display: "block" }}>
            <SplitChars text="that feel right." show={show} baseDelay={0.55} color="#1a4f6e" />
          </div>
        </h1>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          opacity: show ? 1 : 0,
          transform: show ? "none" : "translateY(16px)",
          transition: "opacity 0.8s ease 1.1s, transform 0.8s ease 1.1s",
        }}>
          <p style={{ fontSize: 15, color: "#888", margin: 0, letterSpacing: "0.01em", lineHeight: 1.6 }}>
            Nastaran Loghmani - UX/UI Developer &amp; Product Designer
          </p>
          <a
            href="#work"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontSize: 13, fontWeight: 500, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#0f0f0f",
              textDecoration: "none", borderBottom: "1px solid #0f0f0f",
              paddingBottom: 2, transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#1a4f6e"; el.style.borderColor = "#1a4f6e"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#0f0f0f"; el.style.borderColor = "#0f0f0f"; }}
          >
            View Work
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "#e8e8e8",
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease 1.4s",
      }} />
    </section>
  );
}
