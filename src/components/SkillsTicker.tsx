"use client";

import { skills } from "@/data/projects";

export default function SkillsTicker() {
  const doubled = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-8 border-y border-card-border">
      <div className="animate-ticker flex gap-8 whitespace-nowrap">
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="text-sm font-mono text-muted/60 hover:text-accent transition-colors flex-shrink-0"
          >
            {skill}
            <span className="ml-8 text-card-border">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
