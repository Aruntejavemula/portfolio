"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const initial = {
    up: { opacity: 0, y: 60, rotateX: 8 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
  };

  return (
    <motion.div
      initial={initial[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
