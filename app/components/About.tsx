"use client";

import { useEffect, useRef, useState } from "react";

const traits = [
  { label: "Research-led", desc: "Every design decision starts with understanding people, not assumptions." },
  { label: "Systems thinker", desc: "I see beyond screens — to flows, structures, and how pieces connect." },
  { label: "AI-native", desc: "I use AI as a collaborator, not a shortcut. It sharpens my thinking." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="section-divider mb-6" />
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-8 leading-snug">
              Not just a developer.
              <br />
              <span className="gradient-text">A product thinker.</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-base">
              I started with code. Then I fell in love with the question behind the code:
              <em className="text-gray-700 not-italic font-medium"> why does this need to exist, and who is it for?</em>
            </p>
            <p className="text-gray-500 leading-relaxed mb-6 text-base">
              At MK Innovations in Dubai, I work across the full spectrum — conducting user research,
              translating data into design decisions, building interfaces, and shipping real products.
              I call this being a <span className="text-[#1a4f6e] font-medium">vibe coder</span>: someone who
              feels the product, not just writes it.
            </p>
            <p className="text-gray-500 leading-relaxed text-base">
              My approach is minimal by default, intentional by design, and driven by what
              actually solves a problem — not what looks impressive in a Figma file.
            </p>
          </div>

          {/* Right — trait cards */}
          <div
            className="flex flex-col gap-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {traits.map((t, i) => (
              <div
                key={t.label}
                className="group border border-gray-100 p-6 hover:border-[#1a4f6e]/30 hover:shadow-sm transition-all duration-300"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1a4f6e] flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 tracking-wide">
                      {t.label}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Stat */}
            <div className="mt-4 pt-6 border-t border-gray-100 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-semibold text-[#1a4f6e] mb-1">8</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Months experience</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[#1a4f6e] mb-1">3×</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Disciplines in one</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
