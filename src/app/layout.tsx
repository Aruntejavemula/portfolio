import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VelocityCursor from "@/components/VelocityCursor";
import AIChatbot from "@/components/AIChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arun Teja V — Software Engineer & AI Enthusiast",
  description:
    "Portfolio of Arun Teja V — Software Engineer at Citi Group, building scalable backend systems and AI-driven applications. Java, Spring Boot, Python, Flutter, LLMs.",
  keywords: [
    "Arun Teja",
    "Software Engineer",
    "AI",
    "Machine Learning",
    "Full Stack Developer",
    "Java",
    "Spring Boot",
    "Python",
    "Flutter",
  ],
  openGraph: {
    title: "Arun Teja V — Software Engineer & AI Enthusiast",
    description: "Building scalable backend systems and AI-driven applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <VelocityCursor />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
