"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "◎",
    title: "Data Research",
    desc: "Translating user behavior data and market signals into actionable design direction. I don't guess — I investigate.",
  },
  {
    icon: "◈",
    title: "UX / UI Design",
    desc: "From low-fi wireframes to polished interfaces. Designing systems that work at every fidelity level.",
  },
  {
    icon: "◇",
    title: "Frontend Build",
    desc: "Shipping production-ready code in React, Next.js, and Tailwind. The design and the build are one.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="py-32 bg-[#fafafa]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className="mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="section-divider mb-6" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 leading-snug">
                Where I've been
                <br />
                <span className="gradient-text">building things.</span>
              </h2>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-400 tracking-widest uppercase mb-1">Current</div>
              <div className="text-sm font-medium text-gray-700">2024 — Present</div>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div
          className="relative mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          <div className="bg-white border border-gray-100 p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  UX/UI Developer
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[#1a4f6e] font-medium">MK Innovations</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-400 text-sm">Dubai, UAE</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-[#1a4f6e]/5 text-[#1a4f6e] px-3 py-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a4f6e] glow-pulse" />
                  8 months · Active
                </span>
              </div>
            </div>

            {/* 3 pillars */}
            <div className="grid md:grid-cols-3 gap-px bg-gray-100">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="bg-white p-8 group hover:bg-[#1a4f6e] transition-colors duration-400"
                >
                  <div className="text-2xl text-[#1a4f6e] group-hover:text-white/60 mb-4 transition-colors">
                    {p.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-sm text-gray-500 group-hover:text-white/70 leading-relaxed transition-colors">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education strip */}
        <div
          className="grid md:grid-cols-2 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          {/* Featured degree */}
          <div className="md:col-span-2 border border-[#1a4f6e]/20 bg-white p-6 hover:border-[#1a4f6e]/40 transition-colors flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-400 tracking-widest uppercase">2025 — 2028</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#1a4f6e] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a4f6e] glow-pulse" />
                  In Progress
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                Bachelor of Science — Software Engineering
              </div>
              <div className="text-xs text-gray-400">University of Europe for Applied Sciences (UE)</div>
            </div>
            <div className="hidden md:flex flex-col items-end text-right flex-shrink-0">
              <div className="text-2xl font-semibold text-[#1a4f6e]/15 leading-none">BSc</div>
            </div>
          </div>

          {[
            { title: "Meta Front-End Developer", sub: "Professional Certificate", date: "2024" },
            { title: "Web Development Basics · Python", sub: "HTML · CSS · JavaScript · Python", date: "2023" },
          ].map((e) => (
            <div key={e.title} className="border border-gray-100 bg-white p-6 hover:border-[#1a4f6e]/30 transition-colors">
              <div className="text-xs text-gray-400 tracking-widest uppercase mb-3">{e.date}</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">{e.title}</div>
              <div className="text-xs text-gray-400">{e.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
