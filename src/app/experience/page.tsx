"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/projects";
import SectionReveal from "@/components/SectionReveal";

export default function ExperiencePage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <SectionReveal>
        <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Career</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Work History</h1>
        <p className="text-muted text-lg mb-16">
          A timeline of my professional experience building backend systems and AI-driven applications.
        </p>
      </SectionReveal>

      <div>
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8 pb-14 border-l border-card-border last:pb-0"
          >
            <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent -translate-x-[7px]" />
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
              <h2 className="text-xl font-bold">{exp.role}</h2>
              <span className="text-accent font-mono text-sm">@ {exp.company}</span>
            </div>
            <p className="text-sm font-mono text-muted mb-5">
              {exp.period} · {exp.location}
            </p>
            <ul className="space-y-2">
              {exp.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
