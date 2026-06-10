"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = -(e.clientX - rect.left - rect.width / 2) / 20;
    setRotate({ x, y });
  };

  const onMouseLeave = () => {
    setHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovering(true)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative group rounded-2xl border border-card-border bg-card p-6 md:p-8 overflow-hidden"
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        data-hover
      >
        {/* Glow effect */}
        <motion.div
          animate={{ opacity: hovering ? 0.15 : 0 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-transparent pointer-events-none"
        />

        {/* Number */}
        <span className="block font-mono text-xs text-accent mb-4">
          /{project.slug}
        </span>

        {/* Title with hover scramble effect */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-1 rounded-full border border-card-border text-muted bg-background/50"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="text-[10px] font-mono px-2 py-1 text-muted">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: hovering ? 4 : 0, opacity: hovering ? 1 : 0.4 }}
          className="absolute top-6 right-6 text-accent"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}
