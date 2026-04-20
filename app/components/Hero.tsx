"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* Flowing curved paths — adapted to portfolio accent color */
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.025,
    opacity: 0.04 + i * 0.018,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#1a4f6e"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.2, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [path.opacity * 0.5, path.opacity, path.opacity * 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + path.id * 0.6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function SplitChars({ text, show, baseDelay = 0, color }: {
  text: string; show: boolean; baseDelay?: number; color?: string;
}) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          transform: show ? "translateY(0)" : "translateY(70px)",
          opacity: show ? 1 : 0,
          transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 0.022}s, opacity 0.5s ease ${baseDelay + i * 0.022}s`,
          color,
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
      overflow: "hidden",
    }}>
      {/* Animated path background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

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

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Headline — character split animation */}
      <div style={{ paddingBottom: 80, position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontSize: "clamp(3.4rem, 7.5vw, 7.5rem)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          color: "#0f0f0f",
          margin: "0 0 36px",
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
