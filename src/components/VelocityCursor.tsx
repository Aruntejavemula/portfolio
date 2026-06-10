"use client";

import { useEffect, useRef, useState } from "react";

export default function VelocityCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true = render nothing on SSR
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
        const size = hovering ? 0 : 32;
        ring.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ring.current.style.width = `${size}px`;
        ring.current.style.height = `${size}px`;
        ring.current.style.opacity = hovering ? "0" : (visible ? "1" : "0");
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
  }, [visible, hovering, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot — always visible, shrinks on hover */}
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-accent"
        style={{
          width: hovering ? 6 : 8,
          height: hovering ? 6 : 8,
          opacity: visible ? (hovering ? 0.6 : 1) : 0,
          transition: "opacity 0.3s, width 0.2s, height 0.2s",
        }}
      />
      {/* Ring — visible when NOT hovering, fades out on hover so button text is clear */}
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border border-accent/50"
        style={{
          width: 32,
          height: 32,
          opacity: visible && !hovering ? 1 : 0,
          transition: "opacity 0.25s ease, width 0.3s ease, height 0.3s ease",
        }}
      />
    </>
  );
}
