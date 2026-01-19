"use client";

import React, {useRef} from "react";
import {motion, useInView} from "framer-motion";

const PROBLEMS = [
  {title: "Unequal Access", desc: "Resources scattered by zip code."},
  {title: "Gated Opportunity", desc: "Status over merit."},
  {title: "Discontinuous Events", desc: "No portfolio continuity."},
  {title: "Meritless Networking", desc: "Who you know > What you do."},
];

export function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: "-100px"});

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-white text-black py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <motion.h2
          initial={{opacity: 0, y: 40}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-24 max-w-4xl leading-tight tracking-tight"
        >
          The campus experience is{" "}
          <span className="text-[var(--accent-cyan)]">fragmented</span>.
        </motion.h2>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, y: 40}}
              animate={isInView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 * i,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="group relative p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-between cursor-default border-t border-l border-black/10 first:border-l-0 md:first:border-l lg:first:border-l-0 hover:bg-black hover:text-white transition-all duration-500"
            >
              {/* Border overlays for consistent grid lines */}
              <div className="absolute top-0 right-0 w-[1px] h-full bg-black/10 group-hover:bg-white/10" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 group-hover:bg-white/10" />

              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                {item.title}
              </h3>
              <p className="text-lg md:text-xl opacity-50 group-hover:opacity-80 transition-opacity">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
