"use client";

import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";

const PHASES = [
  {
    title: "Learn",
    subtitle: "Master Skills",
    desc: "Access AI-powered tutoring, study resources, and personalized learning paths.",
  },
  {
    title: "Build",
    subtitle: "Create Impact",
    desc: "Participate in hackathons, collaborate on projects, and build your portfolio.",
  },
  {
    title: "Earn",
    subtitle: "Get Rewarded",
    desc: "Monetize your skills through verified gigs and freelance opportunities.",
  },
  {
    title: "Lead",
    subtitle: "Shape The Future",
    desc: "Mentor others, lead communities, and become a campus influencer.",
  },
];

export function Flywheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
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
    <section className="relative bg-[var(--black-primary)] text-white">
      <div ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left: Rotating Diagram */}
              <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex-shrink-0">
                {/* Outer Ring */}
                <motion.div
                  style={{rotate: rotation}}
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
                  style={{rotate: useTransform(rotation, (r) => -r * 0.5)}}
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
              <div className="flex-1 space-y-6 md:space-y-8">
                {PHASES.map((phase, i) => (
                  <motion.div
                    key={i}
                    style={{
                      opacity: useTransform(
                        activeIndex,
                        [i - 0.5, i, i + 0.5],
                        [0.3, 1, 0.3],
                      ),
                      scale: useTransform(
                        activeIndex,
                        [i - 0.5, i, i + 0.5],
                        [0.95, 1, 0.95],
                      ),
                    }}
                    className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-4xl md:text-5xl font-bold text-[var(--accent-cyan)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-[var(--gray-body)] text-base md:text-lg">
                      {phase.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
