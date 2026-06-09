export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  highlights: string[];
  github?: string;
  live?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "chatbot-mio",
    title: "Chatbot Mio",
    description:
      "Cross-platform AI chatbot with Flutter frontend, FastAPI backend, Supabase auth & DB, and multi-provider LLM support.",
    longDescription:
      "A full-stack AI chatbot ecosystem providing a secure, multi-client interface for LLM interactions. Features slash commands, model picker, subscription flows, and a clean architecture pattern across the entire codebase.",
    tech: ["Flutter", "Dart", "FastAPI", "Python", "Supabase", "PostgreSQL", "JWT", "Redis"],
    highlights: [
      "Multi-provider LLM support with FastAPI orchestration",
      "Secure auth pipeline — JWT + Supabase Row Level Security",
      "Clean architecture (core / data / presentation layers)",
      "Deployed on Railway (API) + Vercel (web)",
    ],
    github: "https://github.com/Aruntejavemula/Chatbot_Mio",
  },
  {
    slug: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection",
    description:
      "End-to-end ML pipeline comparing Logistic Regression, XGBoost, Decision Tree & Random Forest on imbalanced transaction data.",
    longDescription:
      "A comprehensive machine learning project tackling the class imbalance problem in fraud detection. Implements multiple algorithms with SMOTE and undersampling strategies, achieving a best ROC-AUC of 0.98.",
    tech: ["Python", "scikit-learn", "XGBoost", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      "Best ROC-AUC: 0.98",
      "SMOTE + undersampling for class imbalance handling",
      "Full EDA, feature engineering, and model comparison",
      "4 model architectures benchmarked end-to-end",
    ],
    github: "https://github.com/Aruntejavemula/credit-card-fraud-detection",
  },
  {
    slug: "distracted-driver-detection",
    title: "Distracted Driver Detection",
    description:
      "CNN & VGG16 transfer learning for classifying distracted driving behaviors from dashboard camera images.",
    longDescription:
      "Udacity ML Nanodegree capstone project. Built a custom CNN and fine-tuned VGG16 for multi-class image classification of driver distraction types, achieving competitive Kaggle results.",
    tech: ["Python", "TensorFlow", "Keras", "VGG16", "OpenCV", "NumPy"],
    highlights: [
      "Custom CNN + VGG16 fine-tuning",
      "Best Kaggle log-loss: 1.125",
      "Image augmentation & visualization pipeline",
      "10-class distraction behavior classification",
    ],
    github: "https://github.com/Aruntejavemula/distracted-driver-detection",
  },
  {
    slug: "app-idea-research-agent",
    title: "App-Idea Research Agent",
    description:
      "Autonomous AI agent pipeline that discovers startup ideas by scraping data and generating structured research output.",
    longDescription:
      "An agentic AI system designed to autonomously research and validate app ideas. Uses multi-stage LLM workflows with RAG for context-aware reasoning, orchestrated end-to-end in Python with cross-language versions.",
    tech: ["Python", "N8n", "Claude", "GPT", "Gemini", "RAG", "TypeScript", "C#"],
    highlights: [
      "Multi-stage LLM workflows (GPT, Claude Opus 4, Gemini)",
      "RAG for context-aware reasoning and automation",
      "Cross-language implementations (Python, TypeScript, C#)",
      "Autonomous agent-based system design",
    ],
    github: "https://github.com/App-scraping-research-assistant",
  },
  {
    slug: "omnimind-byok",
    title: "OmniMind BYOK",
    description:
      "Bring-your-own-key AI chat client — use your own Anthropic, OpenAI, or Gemini API keys for private LLM conversations.",
    longDescription:
      "A privacy-focused AI chat application where users bring their own API keys. Supports multiple LLM providers with a unified interface, ensuring conversations stay private with zero server-side key storage.",
    tech: ["Flutter", "Dart", "Anthropic API", "OpenAI API", "Gemini API"],
    highlights: [
      "Multi-provider support (Anthropic, OpenAI, Gemini)",
      "Zero server-side key storage — full privacy",
      "Clean, unified chat interface",
      "Cross-platform (iOS, Android, Web)",
    ],
    github: "https://github.com/Aruntejavemula/omnimind-byok",
  },
];

export const skills = [
  "Java", "Python", "TypeScript", "Dart", "C#", "SQL", "JavaScript",
  "Spring Boot", "FastAPI", "React", "Next.js", "Flutter", "Node.js",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes",
  "PostgreSQL", "MongoDB", "DynamoDB", "Redis",
  "TensorFlow", "PyTorch", "scikit-learn",
  "GPT", "Claude", "Gemini", "RAG", "LLM Orchestration",
  "Git", "CI/CD", "REST", "GraphQL", "Microservices",
];

export const experience = [
  {
    role: "Software Developer",
    company: "Citi Group",
    period: "May 2024 – Present",
    location: "Charlotte, NC",
    bullets: [
      "Built scalable backend services using Java and Spring Boot within microservices architecture",
      "Designed and integrated REST and GraphQL APIs for efficient service-to-frontend communication",
      "Optimized APIs and Spring Data JPA/Hibernate queries on PostgreSQL, reducing response latency by 20–30%",
      "Deployed microservices on AWS EC2 using Docker + Kubernetes, integrated S3 and Lambda",
      "Implemented CI/CD pipelines using AWS CodePipeline/CodeBuild with JUnit & Mockito testing",
      "Leveraged AI-assisted development tools (GitHub Copilot, Claude) to accelerate feature development",
    ],
  },
];

export const education = [
  {
    degree: "Ph.D. in Science",
    school: "Belhaven University",
    period: "Jan 2026 – Present",
    location: "Mississippi, USA",
  },
  {
    degree: "Master of Science",
    school: "Franklin University",
    period: "Sep 2022 – May 2024",
    location: "Columbus, USA",
  },
  {
    degree: "Bachelor of Engineering",
    school: "Sri Indu College of Engineering and Technology",
    period: "Jun 2018 – May 2021",
    location: "Hyderabad, India",
  },
];

export const certifications = [
  "Azure AZ-900",
  "Python Certified",
  "Agile Certified",
  "Prompt Engineering",
  "AWS Cloud Practitioner (in progress)",
];
