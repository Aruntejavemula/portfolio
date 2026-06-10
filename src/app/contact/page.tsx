"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import MagneticElement from "@/components/MagneticElement";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/sunnyarunteja@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <SectionReveal direction="left">
          <p className="text-xs font-mono tracking-[0.4em] text-accent uppercase mb-3">Contact</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Let&apos;s build
            <br />
            <span className="text-accent">something great.</span>
          </h1>
          <p className="text-muted mb-10 leading-relaxed">
            Open to full-time roles, freelance projects, and interesting collaborations.
            Drop a message or reach out directly.
          </p>

          <div className="space-y-4 mb-10">
            <a
              href="mailto:sunnyarunteja@gmail.com"
              className="flex items-center gap-3 text-sm font-mono text-muted hover:text-accent transition-colors"
              data-hover
            >
              <span className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-accent">
                @
              </span>
              sunnyarunteja@gmail.com
            </a>
            <a
              href="https://github.com/Aruntejavemula"
              target="_blank"
              className="flex items-center gap-3 text-sm font-mono text-muted hover:text-accent transition-colors"
              data-hover
            >
              <span className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
              github.com/Aruntejavemula
            </a>
            <a
              href="https://www.linkedin.com/in/aruntejasunny/"
              target="_blank"
              className="flex items-center gap-3 text-sm font-mono text-muted hover:text-accent transition-colors"
              data-hover
            >
              <span className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-accent text-xs font-bold">
                in
              </span>
              linkedin.com/in/aruntejasunny
            </a>
          </div>

          {/* Photo */}
          <motion.div
            whileHover={{ rotateY: 5, scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-xs"
            style={{ perspective: 800 }}
          >
            <Image
              src="/images/photo5-chaplin.jpeg"
              alt="Arun having fun"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </motion.div>
        </SectionReveal>

        {/* Right: Form */}
        <SectionReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card border border-card-border rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-accent/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-card border border-card-border rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-accent/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-card border border-card-border rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-accent/50 transition-colors resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <MagneticElement strength={0.25} radius={120}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 rounded-xl bg-accent text-white text-sm font-medium tracking-wide hover:bg-accent-light transition-all disabled:opacity-50"
                data-hover
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                  ? "Message Sent!"
                  : "Send Message"}
              </button>
            </MagneticElement>

            {status === "error" && (
              <p className="text-sm text-red-400 text-center">
                Something went wrong. Try emailing directly.
              </p>
            )}
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
