"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Work",       href: "#work" },
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "16px 0" : "28px 0",
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #e8e8e8" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" aria-label="Home">
          <Image src="/logo.svg" alt="Nastaran Loghmani" width={200} height={24} style={{ height: 20, width: "auto", opacity: 0.9 }} priority />
        </a>
        <ul style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.href} className="hidden md:block">
              <a href={l.href} style={{ fontSize: 13, letterSpacing: "0.04em", color: "#555", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
