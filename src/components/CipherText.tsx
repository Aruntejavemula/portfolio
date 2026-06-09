"use client";

import { useEffect, useState, useCallback } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";

interface CipherTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: boolean;
}

export default function CipherText({
  text,
  className = "",
  delay = 0,
  speed = 30,
  trigger = true,
}: CipherTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (!trigger || started) return;
    const timeout = setTimeout(() => {
      setStarted(true);
      scramble();
    }, delay);
    return () => clearTimeout(timeout);
  }, [trigger, delay, scramble, started]);

  return <span className={className}>{displayed}</span>;
}
