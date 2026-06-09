"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { experience, education, certifications, skills } from "@/data/projects";

const skillCategories = [
  { name: "Languages", items: ["Java", "Python", "TypeScript", "Dart", "C#", "SQL", "JavaScript"] },
  { name: "Backend", items: ["Spring Boot", "FastAPI", "REST", "GraphQL", "Microservices", "Node.js"] },
  { name: "Frontend & Mobile", items: ["React", "Next.js", "Flutter", "HTML/CSS", "Tailwind"] },
  { name: "AI / ML", items: ["GPT", "Claude", "Gemini", "RAG", "Agentic AI", "TensorFlow", "scikit-learn"] },
  { name: "Cloud & DevOps", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD"] },
  { name: "Databases", items: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis", "MySQL"] },
];

export default function AboutPage() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="grid md:grid-cols-12 gap-12 items-start mb-24">
          <SectionReveal className="md:col-span-5" direction="left">
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] col-span-2"
                style={{ perspective: 800 }}
              >
                <Image
                  src="/images/photo1-oculus.jpeg"
                  alt="Arun at Oculus NYC"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </motion.div>
              <motion.div
                whileHover={{ rotateY: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative rounded-xl overflow-hidden aspect-square"
                style={{ perspective: 800 }}
              >
                <Image
                  src="/images/photo3-snow.jpeg"
                  alt="Arun in snow"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </motion.div>
              <motion.div
                whileHover={{ rotateY: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative rounded-xl overflow-hidden aspect-square"
                style={{ perspective: 800 }}
              >
                <Image
                  src="/images/photo4-field.jpeg"
                  alt="Arun in field"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </motion.div>
            </div>
          </SectionReveal>

          <SectionReveal className="md:col-span-7 space-y-6" delay={0.2}>
            <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase">About</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Building at the
              <br />
              <span className="text-accent">intersection of</span>
              <br />
              code &amp; intelligence.
            </h1>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                I&apos;m <span className="text-foreground font-medium">Arun Teja V</span> — a Software
                Engineer with 2+ years of production experience at{" "}
                <span className="text-foreground font-medium">Citi Group</span>, where I build
                scalable backend services using Java, Spring Boot, and microservices architecture on AWS.
              </p>
              <p>
                My obsession is <span className="text-foreground font-medium">agentic AI</span> —
                autonomous pipelines, RAG systems, and LLM orchestration across GPT, Claude, and Gemini.
                I treat AI not as a feature but as a teammate that helps ship better, faster.
              </p>
              <p>
                Currently pursuing a <span className="text-foreground font-medium">Ph.D. in Science</span> at
                Belhaven University while building AI-powered tools and contributing to the developer community.
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* Tech Stack Grid */}
        <SectionReveal className="mb-24">
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Tech Stack</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Tools I Work With</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className="rounded-2xl border border-card-border bg-card p-6"
              >
                <h3 className="text-sm font-mono text-accent mb-4">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-2.5 py-1 rounded-full border border-card-border text-muted hover:text-foreground hover:border-accent/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Experience Timeline */}
        <SectionReveal className="mb-24">
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Work History</h2>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 pb-12 border-l border-card-border"
            >
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent -translate-x-[7px]" />
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="text-accent font-mono text-sm">@ {exp.company}</span>
              </div>
              <p className="text-sm font-mono text-muted mb-4">
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
        </SectionReveal>

        {/* Education */}
        <SectionReveal className="mb-24">
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Education</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Academic Background</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotateY: 3, scale: 1.02 }}
                className="rounded-2xl border border-card-border bg-card p-6"
                style={{ perspective: 800 }}
              >
                <p className="text-xs font-mono text-accent mb-2">{edu.period}</p>
                <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                <p className="text-sm text-muted">{edu.school}</p>
                <p className="text-xs text-muted/60 mt-1">{edu.location}</p>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Certifications */}
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Certifications</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Credentials</h2>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="text-sm font-mono px-4 py-2 rounded-full border border-card-border bg-card text-foreground hover:border-accent/30 transition-colors"
              >
                {cert}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
