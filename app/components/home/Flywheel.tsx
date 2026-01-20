"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PHASES = [
  {
    title: "Synthesize",
    subtitle: "CodeLogs",
    desc: "From scattered notes to an organised intelligent knowledge base. So you know where to look. All. The. Time.",
  },
  {
    title: "Showcase",
    subtitle: "Axiom",
    desc: "A unified infrastructure for events that bridge the institutional gap and amplify your reach.",
  },
  {
    title: "Connect",
    subtitle: "Inkwell",
    desc: "Networking up to chance? Not anymore. Introducing merit based connections and collaborations.",
  },
  {
    title: "Earn",
    subtitle: "Opus",
    desc: "A streamlined marketplace engineered to connect your talent with verified freelance opportunities.",
  },
];

export function Flywheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Rotation based on scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Active phase based on scroll progress
  const activeIndex = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 3],
  );

  return (
    <section id="system" className="relative bg-[var(--black-primary)] text-white">
      <div ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
              {/* Left: Rotating Diagram */}
              <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex-shrink-0 scale-90 md:scale-100 transform origin-center">
                {/* Outer Ring */}
                <motion.div
                  style={{ rotate: rotation }}
                  className="absolute inset-0 rounded-full border border-[var(--accent-cyan)]/30"
                >
                  {/* Phase indicators on the ring */}
                  {PHASES.map((phase, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--accent-cyan)]"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 90}deg) translateX(${140}px) translate(-50%, -50%)`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Inner Ring */}
                <motion.div
                  style={{ rotate: useTransform(rotation, (r) => -r * 0.5) }}
                  className="absolute inset-8 md:inset-12 lg:inset-16 rounded-full border border-white/10"
                />

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      The
                      <br />
                      <span className="text-[var(--accent-cyan)]">System</span>
                    </h2>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-[var(--accent-cyan)]/5 blur-3xl -z-10" />
              </div>

              {/* Right: Phase Cards */}
              {/* Right: Phase Cards */}
              <div className="flex-1 relative h-[260px] md:h-[350px] w-full flex items-center">
                {PHASES.map((phase, i) => (
                  <FlywheelCard
                    key={i}
                    phase={phase}
                    index={i}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlywheelCard({
  phase,
  index,
  activeIndex,
}: {
  phase: (typeof PHASES)[0];
  index: number;
  activeIndex: any;
}) {
  const opacity = useTransform(
    activeIndex,
    [index - 0.4, index, index + 0.4],
    [0, 1, 0],
  );
  const y = useTransform(
    activeIndex,
    [index - 0.4, index, index + 0.4],
    [50, 0, -50],
  );
  const scale = useTransform(
    activeIndex,
    [index - 0.4, index, index + 0.4],
    [0.9, 1, 0.9],
  );
  // We can't use `useTransform` for zIndex directly in style if it returns a number that changes non-continuously usually? 
  // actually framer motion handles it.
  const zIndex = useTransform(activeIndex, (v: number) =>
    Math.round(v) === index ? 10 : 0,
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        zIndex,
      }}
      className="absolute inset-x-0 p-5 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-xl"
    >
      <div className="flex items-baseline gap-4 mb-3">
        <span className="text-4xl md:text-5xl font-bold text-[var(--accent-cyan)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold">{phase.title}</h3>
      </div>
      <div className="text-lg text-[var(--accent-cyan)] mb-2 font-medium tracking-wide">
        {phase.subtitle}
      </div>
      <p className="text-[var(--gray-body)] text-base md:text-lg leading-relaxed">
        {phase.desc}
      </p>
    </motion.div>
  );
}
