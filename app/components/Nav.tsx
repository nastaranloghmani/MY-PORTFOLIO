"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="hover:opacity-70 transition-opacity">
          <Image
            src="/logo.svg"
            alt="Nastaran Loghmani"
            width={180}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-gray-500 hover:text-[#1a4f6e] transition-colors tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:loghmaninastaran@gmail.com"
          className="hidden md:inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase border border-[#1a4f6e] text-[#1a4f6e] px-4 py-2 hover:bg-[#1a4f6e] hover:text-white transition-all duration-300"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
