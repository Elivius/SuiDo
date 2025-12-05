"use client";

import { useState, useEffect } from "react"

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

export function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars only on the client to avoid hydration mismatch
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 8000}ms`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `starTwinkle ${s.duration} infinite ease-in-out`,
            animationDelay: s.delay,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </>
  )
}
