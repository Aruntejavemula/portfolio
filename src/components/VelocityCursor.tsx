"use client";

import { useEffect, useRef, useState } from "react";

export default function VelocityCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    // Hide OS cursor only after this JS component is mounted
    document.documentElement.classList.add("cursor-hidden");

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
        const size = hovering ? 56 : 32;
        ring.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px) scale3d(${hovering ? 1.3 : 1}, ${hovering ? 1.3 : 1}, 1)`;
        ring.current.style.width = `${size}px`;
        ring.current.style.height = `${size}px`;
      }
      if (glow.current) {
        const glowSize = hovering ? 80 : 0;
        glow.current.style.transform = `translate(${ringPos.current.x - glowSize / 2}px, ${ringPos.current.y - glowSize / 2}px)`;
        glow.current.style.width = `${glowSize}px`;
        glow.current.style.height = `${glowSize}px`;
        glow.current.style.opacity = hovering ? "0.15" : "0";
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
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
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border-2 border-accent/60"
        style={{
          width: 32,
          height: 32,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          background: hovering ? "rgba(204, 88, 1, 0.08)" : "transparent",
          backdropFilter: hovering ? "blur(4px)" : "none",
          borderColor: hovering ? "rgba(204, 88, 1, 0.8)" : "rgba(204, 88, 1, 0.5)",
        }}
      />
      {/* Glow orb on hover */}
      <div
        ref={glow}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent blur-xl"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
          transition: "opacity 0.4s ease, width 0.4s ease, height 0.4s ease",
        }}
      />
    </>
  );
}
