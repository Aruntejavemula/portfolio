"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionReveal from "@/components/SectionReveal";
import MagneticElement from "@/components/MagneticElement";

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <SectionReveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mb-8"
            data-hover
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>
        </SectionReveal>

        {/* Header */}
        <SectionReveal delay={0.1}>
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">
            /{project.slug}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-lg text-muted leading-relaxed mb-8">
            {project.longDescription}
          </p>
        </SectionReveal>

        {/* Tech stack */}
        <SectionReveal delay={0.2}>
          <h3 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-card-border text-foreground bg-card"
              >
                {t}
              </span>
            ))}
          </div>
        </SectionReveal>

        {/* Highlights */}
        <SectionReveal delay={0.3}>
          <h3 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">Key Highlights</h3>
          <ul className="space-y-3 mb-12">
            {project.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 text-muted"
              >
                <span className="text-accent mt-1 shrink-0">▸</span>
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </SectionReveal>

        {/* Links */}
        <SectionReveal delay={0.4}>
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <MagneticElement strength={0.35} radius={100}>
                <Link
                  href={project.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-card-border text-sm font-medium hover:border-accent/50 hover:text-accent transition-all"
                  data-hover
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Source
                </Link>
              </MagneticElement>
            )}
            {project.live && (
              <MagneticElement strength={0.35} radius={100}>
                <Link
                  href={project.live}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-light transition-all"
                  data-hover
                >
                  Live Demo →
                </Link>
              </MagneticElement>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
