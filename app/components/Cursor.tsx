"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const hovered = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { hovered.current = true; };
    const onLeave = () => { hovered.current = false; };

    const interactives = "a, button, [role='button'], input, label, select, textarea, [tabindex]";

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(interactives).forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId: number;
    const tick = () => {
      const dot  = dotRef.current;
      const rig  = ringRef.current;
      const mx   = mouse.current.x;
      const my   = mouse.current.y;

      ring.current.x += (mx - ring.current.x) * 0.1;
      ring.current.y += (my - ring.current.y) * 0.1;

      if (dot) dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      if (rig) {
        const size = hovered.current ? 44 : 32;
        rig.style.width  = `${size}px`;
        rig.style.height = `${size}px`;
        rig.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
        rig.style.borderColor = hovered.current ? "rgba(26,79,110,0.55)" : "rgba(26,79,110,0.28)";
        rig.style.background  = hovered.current ? "rgba(26,79,110,0.06)" : "transparent";
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  style={{ position:"fixed", top:0, left:0, width:6, height:6, borderRadius:"50%", background:"#1a4f6e", pointerEvents:"none", zIndex:9999, willChange:"transform" }} />
      <div ref={ringRef} style={{ position:"fixed", top:0, left:0, width:32, height:32, borderRadius:"50%", border:"1px solid rgba(26,79,110,0.28)", pointerEvents:"none", zIndex:9998, willChange:"transform", transition:"width 0.25s ease,height 0.25s ease,border-color 0.25s ease,background 0.25s ease" }} />
    </>
  );
}
