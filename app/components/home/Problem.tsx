"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

// --- Data (Condensed) ---
const PROBLEMS = [
  {
    title: "Chaotic Intelligence",
    desc: "From scattered notes to an intelligent knowledge base.",
  },
  {
    title: "The Visibility Gap",
    desc: "Unified exposure for every campus opportunity.",
  },
  {
    title: "Silent Collaboration",
    desc: "Merit-based connections, not just chance encounters.",
  },
  {
    title: "Economic Isolation",
    desc: "Turning academic excellence into professional income.",
  },
];

// --- Animations ---
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Smoother "out" easing

export function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-white text-black py-32 md:py-40 lg:py-52"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: REVEAL_EASE }}
              className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold leading-tight tracking-tight pb-4"
            >
              The Student Experience <br className="hidden md:block" />
              is <span className="text-[var(--accent-cyan)]">Fragmented</span>.
            </motion.h2>
          </div>
        </div>

        {/* Original 4-Column Grid UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-black/10">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: REVEAL_EASE,
              }}
              className="group relative p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-between cursor-default border-t border-l border-black/10 first:border-l-0 md:first:border-l lg:first:border-l-0 hover:bg-black hover:text-white transition-all duration-500"
            >
              {/* Border overlays for consistent grid lines */}
              <div className="absolute top-0 right-0 w-[1px] h-full bg-black/10 group-hover:bg-white/10" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 group-hover:bg-white/10" />

              <h3 className="text-2xl md:text-3xl font-bold leading-tight relative z-10">
                {item.title}
              </h3>
              <p className="text-lg md:text-xl opacity-60 group-hover:opacity-90 transition-opacity leading-snug relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
