"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CipherText from "@/components/CipherText";
import SectionReveal from "@/components/SectionReveal";
import ProjectCard from "@/components/ProjectCard";
import SkillsTicker from "@/components/SkillsTicker";
import TerminalResume from "@/components/TerminalResume";
import MagneticElement from "@/components/MagneticElement";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Floating gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/3 blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 text-center max-w-4xl">
          {/* Pre-title */}
          <p className="hero-pre-title font-mono text-xs tracking-[0.5em] text-accent uppercase mb-6">
            Software Engineer · AI Enthusiast
          </p>

          {/* Name */}
          <h1
            className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
            style={{ perspective: 1000 }}
          >
            <CipherText text="ARUN TEJA V" delay={600} speed={25} />
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mt-6 text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Building scalable backend systems and AI-driven applications at{" "}
            <span className="text-foreground font-medium">Citi Group</span>.
            Obsessed with agentic AI and LLM orchestration.
          </p>

          {/* CTAs */}
          <div className="hero-ctas mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticElement strength={0.4} radius={100} scaleAmount={1.15}>
              <Link
                href="/projects"
                className="px-8 py-3.5 rounded-full bg-accent text-white text-sm font-medium tracking-wide hover:bg-accent-light transition-all active:scale-95"
                data-hover
              >
                View Work
              </Link>
            </MagneticElement>
            <MagneticElement strength={0.4} radius={100} scaleAmount={1.15}>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full border border-card-border text-sm font-medium tracking-wide text-foreground hover:border-accent/50 hover:text-accent transition-all active:scale-95"
                data-hover
              >
                Contact
              </Link>
            </MagneticElement>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono text-muted tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-card-border flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </div>
      </section>

      {/* ── About Snippet ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <SectionReveal className="md:col-span-5" direction="left">
            <div className="relative">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -3 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                style={{ perspective: 800, transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/images/photo2-suit.jpeg"
                  alt="Arun Teja V"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </motion.div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -right-4 bg-card border border-card-border rounded-xl px-4 py-2 font-mono text-xs"
              >
                <span className="text-accent">3+</span> yrs experience
              </motion.div>
            </div>
          </SectionReveal>

          <SectionReveal className="md:col-span-7 space-y-6" delay={0.2}>
            <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase">01 — About</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Engineer at the
              <br />
              <span className="text-accent">edge of AI.</span>
            </h2>
            <p className="text-muted leading-relaxed">
              I&apos;m a Software Developer at <span className="text-foreground font-medium">Citi Group</span> where
              I ship low-latency microservices on AWS using Java and Spring Boot. My obsession is{" "}
              <span className="text-foreground font-medium">agentic AI</span> — autonomous pipelines
              built with RAG systems and LLM orchestration across GPT, Claude, and Gemini.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-mono text-muted">
              <span className="flex items-center gap-2">
                <span className="text-accent">📍</span> Charlotte, NC
              </span>
              <span className="flex items-center gap-2">
                <span className="text-accent">🎓</span> Ph.D. @ Belhaven
              </span>
              <span className="flex items-center gap-2">
                <span className="text-accent">✦</span> Open to roles
              </span>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-accent font-mono hover:gap-3 transition-all"
              data-hover
            >
              Read more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── Skills Ticker ── */}
      <SkillsTicker />

      {/* ── Featured Projects ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">02 — Work</p>
                <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-sm text-muted font-mono hover:text-accent transition-colors"
                data-hover
              >
                View all →
              </Link>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, i) => (
              <SectionReveal key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </SectionReveal>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-accent font-mono"
              data-hover
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Terminal ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">03 — Interactive</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Terminal Resume</h2>
            <p className="text-muted mb-8 max-w-xl">
              Prefer the command line? Type <code className="text-accent bg-card px-2 py-0.5 rounded text-xs">help</code> to
              explore my background interactively.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <TerminalResume />
          </SectionReveal>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-24 md:py-32 px-6 border-t border-card-border">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-6">04 — Connect</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s work together.
            </h2>
            <p className="text-muted mb-10 max-w-md mx-auto">
              Open to full-time roles, freelance projects, and interesting collaborations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticElement strength={0.4} radius={100}>
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-full bg-accent text-white text-sm font-medium tracking-wide hover:bg-accent-light transition-all active:scale-95"
                  data-hover
                >
                  Get in Touch
                </Link>
              </MagneticElement>
              <MagneticElement strength={0.4} radius={100}>
                <Link
                  href="mailto:sunnyarunteja@gmail.com"
                  className="px-8 py-3.5 rounded-full border border-card-border text-sm font-medium tracking-wide hover:border-accent/50 hover:text-accent transition-all"
                  data-hover
                >
                  sunnyarunteja@gmail.com
                </Link>
              </MagneticElement>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

