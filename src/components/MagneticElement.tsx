"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;   // how much the element drifts toward cursor (0-1)
  radius?: number;     // pixel radius of magnetic field
  lift?: boolean;      // whether to 3D-lift on hover
}

export default function MagneticElement({
  children,
  className = "",
  strength = 0.35,
  radius = 120,
  lift = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      const falloff = 1 - distance / radius;
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);

      if (lift) {
        // Tilt based on cursor position relative to center
        rotateX.set(-(dy / rect.height) * 12);
        rotateY.set((dx / rect.width) * 12);
        scale.set(1 + 0.08 * falloff);
      }
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        scale,
        rotateX: lift ? rotateX : 0,
        rotateY: lift ? rotateY : 0,
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={`inline-block ${className}`}
      data-hover
    >
      <div
        className="transition-shadow duration-300"
        style={{
          boxShadow: hovered
            ? "0 8px 30px rgba(204, 88, 1, 0.15), 0 4px 12px rgba(0,0,0,0.3)"
            : "none",
          borderRadius: "inherit",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
