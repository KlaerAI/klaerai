"use client";

import React, {useRef, useState, useEffect} from "react";
import {motion, useInView, AnimatePresence} from "framer-motion";

// --- Data ---

const SERVICES = [
  {
    id: "01",
    title: "Intelligence over Information",
    accentWord: "Intelligence",
    desc: "Transforming scattered, uncivilized notes into an AI-powered neural network for your brain.",
    features: ["AI Document Synthesis", "Semantic Search", "Auto-Revision Engine"],
  },
  {
    id: "02",
    title: "Exposure without Barriers",
    accentWord: "Exposure",
    desc: "A unified infrastructure for technical and non-technical events that bridge the institutional gap.",
    features: ["Native Event Hosting", "Unified Discovery Hub", "Portfolio Continuity"],
  },
  {
    id: "03",
    title: "Merit over Network",
    accentWord: "Merit",
    desc: "Connect with like-minded peers and collaborators based on verified skills, not social status.",
    features: [
      "Skill-Based Peer Matching",
      "Native Forum Discourse",
      "Authentic Endorsements",
    ],
  },
  {
    id: "04",
    title: "Skills into Currency",
    accentWord: "Currency",
    desc: "A streamlined marketplace engineered to connect student talent with verified freelance opportunities.",
    features: [
      "Verified Freelance Gigs",
      "Skill-Matched Bidding",
      "Secure On-Campus Payments",
    ],
  },
];
const DYNAMIC_WORDS = ["Develop", "Design", "Elevate"];

// --- Animation Constants ---
const ACCENT_COLOR = "#00CED1";
const ACCENT_GLOW = "0 0 10px rgba(0, 206, 209, 0.4)";

// "Sav1n" style sharp easings
const REVEAL_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const SPRING_EASE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// Stagger timings
const DELAY_BORDER = 0;
const DELAY_NUMBER = 0.1;
const DELAY_TITLE = 0.25;
const DELAY_DESC = 0.4;
const DELAY_BULLETS = 0.6;

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, {once: true, margin: "-100px"});
  const [wordIndex, setWordIndex] = useState(0);

  // Cycle Dynamic Word
  useEffect(() => {
    if (!headlineInView) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 4000); // 4s cycle for slower feel
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
          {/* Sticky Headline */}
          <div className="lg:w-[35%] lg:sticky lg:top-40 lg:self-start z-10">
            <div ref={headlineRef}>
              <h2 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[0.9] tracking-tight text-white flex flex-col items-start">
                <div className="overflow-hidden mb-2">
                  <motion.span
                    initial={{y: "100%"}}
                    animate={headlineInView ? {y: 0} : {y: "100%"}}
                    transition={{duration: 0.8, ease: REVEAL_EASE}}
                    className="block"
                  >
                    I&apos;ll Help
                  </motion.span>
                </div>

                {/* Vertical Slide Dynamic Word */}
                <div className="h-[1.1em] overflow-hidden mb-2 relative min-w-[300px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={wordIndex}
                      initial={{y: "120%", opacity: 0}} // Slide in from further down
                      animate={{y: 0, opacity: 1}}
                      exit={{y: "-120%", opacity: 0}} // Slide out further up
                      transition={{duration: 0.8, ease: "easeInOut"}} // Smoother, standard easing
                      className="block text-[#00CED1] origin-left"
                      style={{textShadow: ACCENT_GLOW}}
                    >
                      {DYNAMIC_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="overflow-hidden">
                  <motion.span
                    initial={{y: "100%"}}
                    animate={headlineInView ? {y: 0} : {y: "100%"}}
                    transition={{duration: 0.8, ease: REVEAL_EASE, delay: 0.15}}
                    className="block"
                  >
                    Your Brand
                  </motion.span>
                </div>
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
  const isInView = useInView(cardRef, {once: true, margin: "-10%"});

  // Stagger cascading based on index
  const baseDelay = index * 0.15;

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col min-h-[350px] pl-8 md:pl-10 pt-4"
    >
      {/* 1. Left Vertical Border (Draw Top->Bottom) */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] h-full overflow-visible pointer-events-none">
        <svg className="h-full w-full overflow-visible">
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="4"
            initial={{pathLength: 0}}
            animate={isInView ? {pathLength: 1} : {pathLength: 0}}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: baseDelay + DELAY_BORDER,
            }}
          />
        </svg>
      </div>

      {/* 2. Number (Scale/Slide Up) */}
      <div className="mb-4 relative overflow-hidden">
        <motion.span
          initial={{y: "100%", opacity: 0}}
          animate={isInView ? {y: 0, opacity: 1} : {y: "100%", opacity: 0}}
          transition={{
            duration: 0.7,
            ease: SPRING_EASE,
            delay: baseDelay + DELAY_NUMBER,
          }}
          className="block text-[4rem] font-bold text-[#00CED1]/80 leading-none tracking-tighter tabular-nums"
        >
          {item.id}
        </motion.span>
      </div>

      {/* 3. Title (Masked Slide Up + Color Shift) */}
      <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 text-white overflow-hidden">
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{y: "100%"}}
            animate={isInView ? {y: 0} : {y: "100%"}}
            transition={{
              duration: 0.6,
              ease: REVEAL_EASE,
              delay: baseDelay + DELAY_TITLE,
            }}
          >
            {item.title.split(" ").map((word, i) => {
              const isAccent = word
                .toLowerCase()
                .includes(item.accentWord.toLowerCase());
              return (
                <span key={i} className="inline-block mr-2 relative">
                  {/* Base geometry is visible, but we layer color on top or just switch it */}
                  {isAccent ? (
                    <motion.span
                      initial={{color: "#ffffff", textShadow: "none"}}
                      animate={
                        isInView
                          ? {color: ACCENT_COLOR, textShadow: ACCENT_GLOW}
                          : {}
                      }
                      // Color transition happens slightly after geometry reveal
                      transition={{
                        duration: 0.4,
                        delay: baseDelay + DELAY_TITLE + 0.3,
                      }}
                    >
                      {word}
                    </motion.span>
                  ) : (
                    word
                  )}
                </span>
              );
            })}
          </motion.span>
        </span>
      </h3>

      {/* 4. Description (Word-by-Word Slide Up) */}
      <div className="text-white/60 text-base md:text-lg leading-relaxed mix-blend-plus-lighter mb-8">
        <WordReveal
          text={item.desc}
          pDelay={baseDelay + DELAY_DESC}
          isInView={isInView}
        />
      </div>

      {/* 5. Bullets (Slide In) */}
      <ul className="mt-auto space-y-3">
        {item.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, x: -20}}
            animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: -20}}
            transition={{
              duration: 0.4,
              delay: baseDelay + DELAY_BULLETS + i * 0.08,
              ease: "easeOut",
            }}
            className="flex items-center gap-3 text-sm text-white/40"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{backgroundColor: ACCENT_COLOR}}
            />
            {feature}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Word Reveal Component to mimic "SplitText Lines"
function WordReveal({
  text,
  pDelay,
  isInView,
}: {
  text: string;
  pDelay: number;
  isInView: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className="block flex flex-wrap gap-x-1.5">
      {words.map((word, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{y: "110%"}} // Start deeply hidden
            animate={isInView ? {y: 0} : {y: "110%"}}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: pDelay + i * 0.015, // Extremely tight stagger for "flow"
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
