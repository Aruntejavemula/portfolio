"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const commands: Record<string, string> = {
  help: `Available commands:
  about       — Who I am
  skills      — Tech stack
  experience  — Work history
  education   — Academic background
  projects    — Featured projects
  certs       — Certifications
  contact     — Get in touch
  clear       — Clear terminal`,

  about: `Arun Teja V
Software Engineer with 2+ years of experience in backend
development and AI-driven systems. Currently at Citi Group,
building scalable microservices on AWS.

Obsessed with agentic AI — autonomous pipelines, RAG systems,
and LLM orchestration across GPT, Claude, and Gemini.

📍 Charlotte, NC  |  🎓 Ph.D. candidate @ Belhaven University`,

  skills: `Languages     Java, Python, TypeScript, Dart, C#, SQL
Backend       Spring Boot, FastAPI, REST, GraphQL, Microservices
Frontend      React, Next.js, Flutter, Node.js
AI / ML       LLMs (GPT, Claude, Gemini), RAG, Agentic AI
Cloud         AWS (EC2, S3, Lambda), Azure, GCP, Docker, K8s
Databases     PostgreSQL, MongoDB, DynamoDB, Redis
Testing       JUnit, Mockito, Unit/Integration/API Testing`,

  experience: `Software Developer @ Citi Group     May 2024 – Present
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Built scalable backend services (Java + Spring Boot)
• Designed REST & GraphQL APIs
• Reduced response latency by 20–30%
• Deployed on AWS EC2 with Docker + Kubernetes
• Implemented CI/CD with AWS CodePipeline
• Leveraged GitHub Copilot & Claude for dev productivity`,

  education: `🎓 Ph.D. in Science
   Belhaven University          Jan 2026 – Present

🎓 Master of Science
   Franklin University           Sep 2022 – May 2024

🎓 Bachelor of Engineering
   Sri Indu College of Eng.      Jun 2018 – May 2021`,

  projects: `Featured Projects:
━━━━━━━━━━━━━━━━━
1. Remio               Desktop PWA & Android launcher → remiolauncher.com
2. Chatbot Mio         Flutter + FastAPI + Supabase
3. Fraud Detection     ML pipeline, ROC-AUC 0.98
4. Driver Detection    CNN + VGG16 transfer learning
5. Research Agent      Agentic AI + RAG + multi-LLM
6. OmniMind BYOK       Multi-provider AI chat client

→ Visit /projects for details`,

  certs: `Certifications:
• Azure AZ-900
• Python Certified
• Agile Certified
• Prompt Engineering
• AWS Cloud Practitioner (in progress)`,

  contact: `Email     sunnyarunteja@gmail.com
GitHub    github.com/Aruntejavemula
LinkedIn  linkedin.com/in/aruntejasunny

→ Visit /contact to send a message`,
};

interface Line {
  type: "input" | "output";
  content: string;
}

export default function TerminalResume() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", content: 'Welcome to Arun\'s Terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [...lines, { type: "input", content: cmd }];

    if (cmd === "clear") {
      setLines([{ type: "output", content: "Terminal cleared." }]);
    } else if (commands[cmd]) {
      newLines.push({ type: "output", content: commands[cmd] });
      setLines(newLines);
    } else {
      newLines.push({
        type: "output",
        content: `Command not found: ${cmd}. Type "help" for available commands.`,
      });
      setLines(newLines);
    }
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl border border-card-border bg-[#0d0d0d] overflow-hidden font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-card-border">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-muted">arun@portfolio ~ %</span>
      </div>

      {/* Terminal body */}
      <div ref={containerRef} className="h-72 md:h-80 overflow-y-auto p-4 space-y-1">
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className="text-accent shrink-0">❯</span>
                <span className="text-foreground">{line.content}</span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-muted/80 pl-4 leading-relaxed">
                {line.content}
              </pre>
            )}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <span className="text-accent shrink-0">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground caret-accent"
            autoFocus
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="animate-blink text-accent">▊</span>
        </form>
      </div>
    </motion.div>
  );
}
