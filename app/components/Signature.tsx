"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const NODES = [
  {
    id: "center",
    label: "Product\nThinking",
    isCenter: true,
    angle: 0,
    radius: 0,
    desc: "",
  },
  {
    id: "ux",
    label: "UX\nResearch",
    isCenter: false,
    angle: -90,
    radius: 195,
    desc: "Understanding users before touching design. Interviews, behavior patterns, real data.",
  },
  {
    id: "ui",
    label: "UI\nDesign",
    isCenter: false,
    angle: -18,
    radius: 195,
    desc: "Systems that scale. Every visual decision has a purpose behind it.",
  },
  {
    id: "frontend",
    label: "Frontend\nDev",
    isCenter: false,
    angle: 54,
    radius: 195,
    desc: "React, Next.js, Tailwind. The design and the build are one thing.",
  },
  {
    id: "data",
    label: "Data\nThinking",
    isCenter: false,
    angle: 126,
    radius: 195,
    desc: "Decisions backed by numbers, never assumptions or gut feelings.",
  },
  {
    id: "ai",
    label: "AI\nIntegration",
    isCenter: false,
    angle: 198,
    radius: 195,
    desc: "AI as a thinking partner — it sharpens the work, not replaces the thinking.",
  },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export default function Signature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 820, h: 520 });

  const hoveredRef = useRef<string | null>(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const progressRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // Measure container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      setContainerSize({ w: container.offsetWidth, h: container.offsetHeight });
    });
    ro.observe(container);
    setContainerSize({ w: container.offsetWidth, h: container.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerSize.w * dpr;
    canvas.height = containerSize.h * dpr;
  }, [containerSize]);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 1500;
    let animId: number;
    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1);
      progressRef.current = easeOutCubic(raw);
      if (raw < 1) animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [visible]);

  // Drawing loop
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const progress = progressRef.current;
      const t = tRef.current;
      const hov = hoveredRef.current;
      const rect = container.getBoundingClientRect();
      const mx = mousePosRef.current.x - rect.left;
      const my = mousePosRef.current.y - rect.top;

      const outerNodes = NODES.filter((n) => !n.isCenter);

      outerNodes.forEach((node, i) => {
        const rad = toRad(node.angle);
        const entranceP = Math.min(1, Math.max(0, (progress - i * 0.08) / 0.6));
        const r = node.radius * easeOutBack(Math.min(entranceP, 1));
        const nx = cx + r * Math.cos(rad);
        const ny = cy + r * Math.sin(rad);

        const isHov = hov === node.id || hov === "center";

        // Organic breathing on midpoint
        const breathe = Math.sin(t * 0.016 + i * 1.3) * 6;
        const rawMidX = (cx + nx) / 2;
        const rawMidY = (cy + ny) / 2;

        // Mouse pull on control point
        const distToMid = Math.sqrt((mx - rawMidX) ** 2 + (my - rawMidY) ** 2);
        const pull = Math.max(0, 1 - distToMid / 280) * 22;
        const ctrlX = rawMidX + (mx - rawMidX) * (pull / 280) + breathe;
        const ctrlY = rawMidY + (my - rawMidY) * (pull / 280) + breathe;

        const baseAlpha = isHov ? 0.75 : 0.14 + Math.sin(t * 0.01 + i) * 0.03;

        // Gradient line
        const grad = ctx.createLinearGradient(cx, cy, nx, ny);
        grad.addColorStop(0, `rgba(42,127,168,${baseAlpha})`);
        grad.addColorStop(0.5, `rgba(42,127,168,${baseAlpha * 0.8})`);
        grad.addColorStop(1, `rgba(26,79,110,${baseAlpha * 0.4})`);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(ctrlX, ctrlY, nx, ny);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isHov ? 1.5 : 0.8;
        ctx.stroke();

        // Traveling energy dot
        if (entranceP > 0.9) {
          const dt = ((t * 0.007 + i * 0.2) % 1);
          const dotX =
            (1 - dt) ** 2 * cx +
            2 * (1 - dt) * dt * ctrlX +
            dt ** 2 * nx;
          const dotY =
            (1 - dt) ** 2 * cy +
            2 * (1 - dt) * dt * ctrlY +
            dt ** 2 * ny;
          const dotAlpha = isHov ? 0.9 : 0.4 + Math.sin(t * 0.025 + i) * 0.15;

          // Glow
          const grd = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 5);
          grd.addColorStop(0, `rgba(42,127,168,${dotAlpha})`);
          grd.addColorStop(1, `rgba(42,127,168,0)`);
          ctx.beginPath();
          ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,220,240,${dotAlpha})`;
          ctx.fill();
        }
      });

      // Center glow pulse on canvas
      const pulseAlpha = 0.06 + Math.sin(t * 0.025) * 0.03;
      const pulseR = 60 + Math.sin(t * 0.02) * 5;
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
      centerGlow.addColorStop(0, `rgba(42,127,168,${pulseAlpha * 2})`);
      centerGlow.addColorStop(1, `rgba(42,127,168,0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

      tRef.current++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [visible]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#050d1a] overflow-hidden">
      {/* Header */}
      <div
        className="max-w-6xl mx-auto px-6 mb-16 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <span className="inline-block w-8 h-px bg-[#2a7fa8] mb-6" />
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          How I Think
        </h2>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Every product I design starts with understanding — then connecting the right pieces.
        </p>
      </div>

      {/* Interactive node graph */}
      <div
        ref={containerRef}
        className="relative mx-auto select-none"
        style={{ width: "100%", maxWidth: "820px", height: "520px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        />

        {NODES.map((node, i) => {
          const isCenter = node.isCenter;
          const isHov = hovered === node.id;
          const rad = toRad(node.angle);
          const { w, h } = containerSize;

          const cx = w / 2;
          const cy = h / 2;
          const nx = isCenter ? cx : cx + node.radius * Math.cos(rad);
          const ny = isCenter ? cy : cy + node.radius * Math.sin(rad);

          const tooltipRight = Math.cos(rad) >= 0;

          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: nx,
                top: ny,
                transform: "translate(-50%, -50%)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${isCenter ? 0.1 : 0.2 + i * 0.12}s`,
                zIndex: isHov ? 20 : 10,
              }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer glow ring */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: isCenter ? "-28px" : "-18px",
                  background: isCenter
                    ? `radial-gradient(circle, rgba(42,127,168,${isHov ? 0.4 : 0.22}) 0%, transparent 70%)`
                    : `radial-gradient(circle, rgba(42,127,168,${isHov ? 0.45 : 0.0}) 0%, transparent 70%)`,
                  transition: "background 0.4s ease",
                }}
              />

              {/* Node */}
              <div
                className="relative flex items-center justify-center rounded-full cursor-default"
                style={{
                  width: isCenter ? 116 : isHov ? 84 : 70,
                  height: isCenter ? 116 : isHov ? 84 : 70,
                  background: isCenter
                    ? "linear-gradient(145deg, #1a4f6e 0%, #2a7fa8 60%, #1a7a9a 100%)"
                    : isHov
                    ? "rgba(26,79,110,0.55)"
                    : "rgba(26,79,110,0.10)",
                  border: `1px solid ${
                    isCenter
                      ? "rgba(42,127,168,0.9)"
                      : isHov
                      ? "rgba(42,127,168,0.55)"
                      : "rgba(42,127,168,0.16)"
                  }`,
                  boxShadow: isCenter
                    ? "0 0 56px rgba(42,127,168,0.5), 0 0 120px rgba(42,127,168,0.15), inset 0 1px 0 rgba(255,255,255,0.12)"
                    : isHov
                    ? "0 0 28px rgba(42,127,168,0.3)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <span
                  className="whitespace-pre-line text-center leading-tight font-medium"
                  style={{
                    fontSize: isCenter ? "11px" : "9px",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: isCenter
                      ? "white"
                      : isHov
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(42,127,168,0.8)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {node.label}
                </span>
              </div>

              {/* Tooltip */}
              {!isCenter && isHov && node.desc && (
                <div
                  className="absolute pointer-events-none z-30"
                  style={{
                    width: "190px",
                    ...(tooltipRight
                      ? { left: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" }
                      : { right: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" }),
                  }}
                >
                  <div
                    style={{
                      background: "rgba(5,13,26,0.95)",
                      border: "1px solid rgba(42,127,168,0.22)",
                      backdropFilter: "blur(16px)",
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      className="mb-2 uppercase font-semibold"
                      style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#2a7fa8" }}
                    >
                      {node.label.replace("\n", " ")}
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed">{node.desc}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom label */}
      <div
        className="text-center mt-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.8s",
        }}
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">
          Hover a node to explore
        </span>
      </div>
    </section>
  );
}
