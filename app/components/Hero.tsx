"use client";

import { useEffect, useState } from "react";

const LINES = [
  { x1: "2%",  y1: "18%", x2: "38%", y2: "22%", delay: 0,    dur: 6 },
  { x1: "55%", y1: "12%", x2: "95%", y2: "9%",  delay: 1.2,  dur: 7 },
  { x1: "10%", y1: "38%", x2: "52%", y2: "34%", delay: 0.4,  dur: 8 },
  { x1: "60%", y1: "42%", x2: "88%", y2: "38%", delay: 2.1,  dur: 6 },
  { x1: "0%",  y1: "58%", x2: "30%", y2: "55%", delay: 0.8,  dur: 7 },
  { x1: "42%", y1: "62%", x2: "78%", y2: "58%", delay: 1.6,  dur: 9 },
  { x1: "70%", y1: "74%", x2: "100%",y2: "70%", delay: 0.2,  dur: 6 },
  { x1: "5%",  y1: "80%", x2: "40%", y2: "76%", delay: 2.8,  dur: 8 },
  { x1: "20%", y1: "26%", x2: "48%", y2: "30%", delay: 3.2,  dur: 7 },
  { x1: "65%", y1: "28%", x2: "92%", y2: "24%", delay: 1.0,  dur: 9 },
  { x1: "30%", y1: "50%", x2: "58%", y2: "46%", delay: 2.4,  dur: 6 },
  { x1: "80%", y1: "55%", x2: "100%",y2: "52%", delay: 0.6,  dur: 8 },
];

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes drawLine {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          15%  { opacity: 1; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          85%  { opacity: 0.6; }
          100% { stroke-dashoffset: -1; opacity: 0; }
        }
      `}</style>

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
        {/* Index label — top */}
        <div style={{
          paddingTop: 120,
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#aaa",
          opacity: show ? 1 : 0,
          transform: show ? "none" : "translateY(8px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          001 - Portfolio
        </div>

        {/* Animated SVG background — fills middle space */}
        <div style={{
          flex: 1,
          position: "relative",
          minHeight: 0,
        }}>
          <svg
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {LINES.map((ln, i) => (
              <line
                key={i}
                x1={ln.x1} y1={ln.y1}
                x2={ln.x2} y2={ln.y2}
                stroke="#1a4f6e"
                strokeWidth="0.8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: `drawLine ${ln.dur}s ease-in-out ${ln.delay}s infinite`,
                  opacity: 0,
                }}
              />
            ))}

            {/* Small accent dots at line endpoints */}
            {LINES.slice(0, 6).map((ln, i) => (
              <circle
                key={`dot-${i}`}
                cx={ln.x2} cy={ln.y2}
                r="1.5"
                fill="#1a4f6e"
                style={{
                  animation: `drawLine ${ln.dur}s ease-in-out ${ln.delay + 0.2}s infinite`,
                  opacity: 0,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Bottom content — headline + CTA */}
        <div style={{
          paddingBottom: 80,
          opacity: show ? 1 : 0,
          transform: show ? "none" : "translateY(40px)",
          transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}>
          <h1 style={{
            fontSize: "clamp(3.8rem, 8.5vw, 8.5rem)",
            fontWeight: 500,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: "#0f0f0f",
            margin: "0 0 40px",
            maxWidth: "90vw",
          }}>
            Designing products<br />
            <span style={{ color: "#1a4f6e" }}>that feel right.</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <p style={{
              fontSize: 16,
              color: "#888",
              margin: 0,
              letterSpacing: "0.01em",
              lineHeight: 1.6,
            }}>
              Nastaran Loghmani - UX/UI Developer &amp; Product Designer
            </p>

            <a href="#work" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#0f0f0f",
              textDecoration: "none",
              borderBottom: "1px solid #0f0f0f",
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
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

        {/* Thin bottom rule */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "#e8e8e8",
          opacity: show ? 1 : 0,
          transition: "opacity 0.8s ease 1s",
        }} />
      </section>
    </>
  );
}
