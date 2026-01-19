"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// --- Data ---
const SERVICES = [
  {
    id: "01",
    title: "Built for conversion",
    accentWord: "conversion",
    desc: "AI-powered academic support engineered from the ground up. Every interaction has a purpose.",
    features: ["24/7 AI Tutoring", "Smart Study Plans", "Exam Prep Assistant"],
  },
  {
    id: "02",
    title: "Designed to be understood",
    accentWord: "understood",
    desc: "Students shouldn't have to think. Clear flows, obvious CTAs, seamless experience.",
    features: ["Event Discovery", "Team Formation", "Portfolio Builder"],
  },
  {
    id: "03",
    title: "The brief is never complete",
    accentWord: "complete",
    desc: "Monetize your skills through verified campus marketplace opportunities.",
    features: [
      "Verified Freelance Gigs",
      "Skill-Based Matching",
      "Secure Payments",
    ],
  },
  {
    id: "04",
    title: "Most websites are mediocre",
    accentWord: "mediocre",
    desc: "Merit-based networking that values skills over followers.",
    features: [
      "Skill Endorsements",
      "Project Collaboration",
      "Mentor Matching",
    ],
  },
];

const DYNAMIC_WORDS = ["Develop", "Design", "Elevate"];

// --- Animation Constants (Strict from Prompt) ---
const ACCENT_COLOR = "#00CED1";
const ACCENT_GLOW = "0 0 10px rgba(0, 206, 209, 0.5)";
const SPRING_EASE = [0.34, 1.56, 0.64, 1]; // Springy bounce for numbers
const SMOOTH_EASE = [0.25, 0.46, 0.45, 0.94]; // Smooth ease for others

// Sequence Timings (ms converted to seconds)
const TIME_BORDER = 0;
const TIME_NUMBER = 0.05;
const TIME_TITLE = 0.2;
const TIME_DESC = 0.4;
const TIME_BULLETS_START = 0.55;
const BULLET_STAGGER = 0.075;

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: "-100px" });
  const [wordIndex, setWordIndex] = useState(0);

  // Rotating Word Cycle
  useEffect(() => {
    if (!headlineInView) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [headlineInView]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-white py-32 md:py-40 lg:py-52 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Sticky Headline Section */}
          <div className="lg:w-[35%] lg:sticky lg:top-40 lg:self-start z-10">
            <div ref={headlineRef}>
              <h2 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[0.9] tracking-tight text-white flex flex-col items-start">
                <span className="block mb-2">I&apos;ll Help</span>

                {/* Rotating Word */}
                <span className="block h-[1.1em] relative overflow-visible mb-2 min-w-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, position: "absolute" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="block origin-left"
                      style={{
                        color: ACCENT_COLOR,
                        textShadow: ACCENT_GLOW
                      }}
                    >
                      {DYNAMIC_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>

                <span className="block">Your Brand</span>
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {SERVICES.map((item, index) => (
              <ServiceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  index,
}: {
  item: (typeof SERVICES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  // Stagger delays based on card index (150ms between cards)
  const cardDelay = index * 0.15;

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col min-h-[350px] pl-8 md:pl-10 pt-4"
    >
      {/* 2. Left Vertical Border Animation (Starting T=0) */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] h-full overflow-visible pointer-events-none">
        <svg className="h-full w-full overflow-visible">
          {/* Draw from top to bottom */}
          <motion.line
            x1="0" y1="0" x2="0" y2="150" // ~150px height as requested
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: cardDelay + TIME_BORDER
            }}
          />
        </svg>
      </div>

      {/* 3. Number Entrance (Starting T=50ms) */}
      <div className="mb-4 relative">
        <motion.span
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
          transition={{
            duration: 0.6,
            ease: SPRING_EASE, // Springy bounce
            delay: cardDelay + TIME_NUMBER
          }}
          className="block text-[4rem] font-bold text-white/10 leading-none tracking-tighter tabular-nums"
        >
          {item.id}
        </motion.span>
      </div>

      {/* 4. Title Text (Starting T=200ms) */}
      <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 text-white">
        {item.title.split(" ").map((word, i) => {
          const isAccent = word.toLowerCase().includes(item.accentWord.toLowerCase());
          return (
            <span key={i} className="inline-block mr-2">
              {isAccent ? (
                <motion.span
                  initial={{ color: "#ffffff", textShadow: "none" }}
                  animate={isInView ? {
                    color: ACCENT_COLOR,
                    textShadow: ACCENT_GLOW
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay: cardDelay + TIME_TITLE,
                    ease: "easeInOut"
                  }}
                >
                  {word}
                </motion.span>
              ) : (
                word // Standard white text
              )}
            </span>
          );
        })}
      </h3>

      {/* 5. Description Text (Starting T=400ms) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: cardDelay + TIME_DESC,
          ease: "easeInOut"
        }}
        className="text-white/60 text-base md:text-lg leading-relaxed mix-blend-plus-lighter mb-8"
      >
        {item.desc}
      </motion.p>

      {/* 6. Bullets (Starting T=550ms, Staggered) */}
      <ul className="mt-auto space-y-3">
        {item.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              duration: 0.4,
              delay: cardDelay + TIME_BULLETS_START + (i * BULLET_STAGGER),
              ease: SMOOTH_EASE,
            }}
            className="flex items-center gap-3 text-sm text-white/40"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: ACCENT_COLOR }}
            />
            {feature}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
