"use client";

import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealLine({ children, visible, delay = 0, style }: {
  children: React.ReactNode;
  visible: boolean;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div style={{
        transform: visible ? "translateY(0)" : "translateY(105%)",
        transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}>
        {children}
      </div>
    </div>
  );
}

function WordReveal({ text, visible, baseDelay = 0, color }: {
  text: string; visible: boolean; baseDelay?: number; color?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em", verticalAlign: "bottom" }}>
          <span style={{
            display: "inline-block",
            color,
            transform: visible ? "translateY(0)" : "translateY(110%)",
            transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 0.07}s`,
          }}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Contact() {
  const { ref, visible } = useInView();

  return (
    <section id="contact" style={{ padding: "120px 32px 100px", maxWidth: 1200, margin: "0 auto", borderTop: "1px solid #e8e8e8" }}>
      <div ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 80 }}>
          <span style={{
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa",
            opacity: visible ? 1 : 0, transition: "opacity 0.5s ease",
          }}>005</span>
          <RevealLine visible={visible} delay={0.1}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0 }}>Contact</h2>
          </RevealLine>
        </div>

        {/* Main CTA - word-by-word reveal */}
        <div style={{ marginBottom: 80 }}>
          <p style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.3,
            color: "#0f0f0f",
            maxWidth: 640,
            margin: "0 0 48px",
          }}>
            <WordReveal text="Have a project in mind?" visible={visible} baseDelay={0.15} />
            <br />
            <WordReveal text="Let's make it real." visible={visible} baseDelay={0.55} color="#1a4f6e" />
          </p>

          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s",
          }}>
            <a
              href="mailto:loghmaninastaran@gmail.com"
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
              loghmaninastaran@gmail.com
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer row */}
        <div style={{
          borderTop: "1px solid #e8e8e8", paddingTop: 32,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 1s",
        }}>
          <span style={{ fontSize: 12, color: "#bbb", letterSpacing: "0.04em" }}>© 2025 Nastaran Loghmani</span>
          <div style={{ display: "flex", gap: 32 }}>
            <a href="https://github.com/nastaranloghmani" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#888", letterSpacing: "0.04em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >GitHub</a>
            <a href="https://www.linkedin.com/in/nastaran-l-5a40b2262" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#888", letterSpacing: "0.04em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
