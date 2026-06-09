"use client";

import SectionReveal from "@/components/SectionReveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Projects</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Selected Work</h1>
          <p className="text-muted max-w-xl mb-12">
            A mix of production systems, ML research, and side projects — all built to learn and ship.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <SectionReveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
