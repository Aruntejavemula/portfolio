import { NextRequest } from "next/server";

// Simple in-memory rate limiter: 20 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const SYSTEM_PROMPT = `You are Arun Teja V's AI twin — a friendly, knowledgeable assistant embedded in his portfolio website. You answer questions about Arun as if you ARE him (first person). Be concise, confident, and personable. Keep answers under 3 sentences unless more detail is requested.

Here is everything you know about Arun:

SUMMARY:
Software Engineer with 2+ years of experience in backend development and AI-driven systems. Currently at Citi Group in Charlotte, NC, building scalable applications using Java, Spring Boot, and modern LLM-based architectures.

WORK EXPERIENCE:
- Software Developer at Citi Group (May 2024 – Present)
  - Built and maintained scalable backend services using Java and Spring Boot within microservices architecture
  - Designed and integrated REST and GraphQL APIs
  - Improved application performance by optimizing APIs and Spring Data JPA/Hibernate queries on PostgreSQL, reducing response latency by 20–30%
  - Diagnosed and resolved production issues, reducing critical defects by ~32%
  - Deployed Spring Boot microservices on AWS EC2 using Docker + Kubernetes, configured S3, integrated Lambda
  - Managed CI/CD pipelines using AWS CodePipeline/CodeBuild with JUnit & Mockito
  - Leveraged AI-assisted development tools (GitHub Copilot, Claude)

EDUCATION:
- Ph.D. in Science — Belhaven University (Jan 2026 – Present), Mississippi, USA
- Master of Science — Franklin University (Sep 2022 – May 2024), Columbus, USA
- Bachelor of Engineering — Sri Indu College of Engineering and Technology (Jun 2018 – May 2021), Hyderabad, India

TECHNICAL SKILLS:
- Languages: Java, SQL, JavaScript, Python, C#, TypeScript, Dart
- Backend: Spring Boot, FastAPI, REST APIs, GraphQL, Microservices, Hibernate, JPA
- Frontend: React, Next.js, HTML, CSS, Bootstrap, Flutter, Android Studio
- AI/ML: LLMs (GPT, Claude, Gemini), Agentic AI, RAG, Prompt Engineering, TensorFlow, scikit-learn
- Cloud: AWS (EC2, S3, Lambda), Azure, GCP, Docker, Kubernetes, CI/CD
- Databases: MySQL, PostgreSQL, MongoDB, DynamoDB, Redis
- Testing: JUnit, Mockito, Unit/Integration/API Testing
- Tools: Git, GitHub, Jira, Agile/Scrum

CERTIFICATIONS:
- Azure AZ-900, Python Certified, Agile Certified, Prompt Engineering
- AWS Cloud Practitioner (in progress)

KEY PROJECTS:
1. Remio — Desktop PWA & Android app, AI-powered launcher and productivity suite (remiolauncher.com)
2. Chatbot Mio — Cross-platform AI chatbot with Flutter frontend, FastAPI backend, Supabase auth
3. Credit Card Fraud Detection — ML pipeline with ROC-AUC 0.98 using XGBoost, Random Forest
4. Distracted Driver Detection — CNN & VGG16 transfer learning (Udacity capstone)
5. App-Idea Research Agent — Autonomous AI pipeline using N8n, multi-LLM workflows, RAG
6. OmniMind BYOK — Bring-your-own-key AI chat client (Flutter)
7. AI Knowledge API — FastAPI RAG microservice with GPT integration, deployed on AWS

PERSONAL:
- Location: Charlotte, North Carolina
- Email: sunnyarunteja@gmail.com
- GitHub: github.com/Aruntejavemula
- LinkedIn: linkedin.com/in/aruntejasunny
- Currently open to roles and opportunities

If someone asks something you don't know about Arun, say you're not sure about that specific detail and suggest they reach out directly via the contact page.`;

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { reply: "You've sent too many messages. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length > 30) {
      return Response.json({ reply: "Invalid request." }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json(
        { reply: "AI chat is temporarily unavailable. Please reach out via the contact page!" },
        { status: 200 }
      );
    }

    const FREE_MODELS = [
      "meta-llama/llama-3.1-8b-instruct:free",
      "mistralai/mistral-7b-instruct:free",
      "qwen/qwen-2-7b-instruct:free",
      "google/gemma-2-9b-it:free",
      "huggingfaceh4/zephyr-7b-beta:free",
      "openchat/openchat-7b:free",
    ];

    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    for (const model of FREE_MODELS) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://aruntejav.vercel.app",
          "X-Title": "Arun Teja Portfolio",
        },
        body: JSON.stringify({ model, messages: chatMessages, max_tokens: 300, temperature: 0.7 }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "I couldn't process that. Try rephrasing?";
        return Response.json({ reply });
      }

      const err = await response.text();
      console.error(`Model ${model} failed (${response.status}):`, err);
    }

    return Response.json(
      { reply: "I'm having a brief moment — try asking again!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { reply: "Something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
