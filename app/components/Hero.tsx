"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0 32px 80px",
      maxWidth: 1200,
      margin: "0 auto",
      width: "100%",
    }}>
      {/* Index label */}
      <div style={{
        position: "absolute",
        top: 120,
        left: 32,
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

      {/* Main headline */}
      <div style={{
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
            Nastaran Loghmani — UX/UI Developer & Product Designer
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
  );
}
