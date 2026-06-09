"use client";

import { useEffect, useRef, useState } from "react";

export default function VelocityCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.hover
      ) {
        setHovering(true);
      }
    };

    const onOut = () => setHovering(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf: number;
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
      if (ring.current) {
        const size = hovering ? 48 : 32;
        ring.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ring.current.style.width = `${size}px`;
        ring.current.style.height = `${size}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible, hovering]);

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-accent"
        style={{
          width: 8,
          height: 8,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border border-accent/50"
        style={{
          width: 32,
          height: 32,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, width 0.3s ease, height 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
