"use client";

import React, {useRef} from "react";
import dynamic from "next/dynamic";
import {ArrowDown} from "lucide-react";
import {motion, useScroll, useTransform} from "framer-motion";

// Dynamic import to avoid SSR issues with Three.js
const ParticleBackground = dynamic(
  () => import("../three/ParticleBackground"),
  {ssr: false},
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      id="vision"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[var(--black-primary)] text-[var(--white-primary)]"
    >
      {/* 3D Particle Background */}
      <motion.div style={{opacity, scale}} className="absolute inset-0 z-0">
        <ParticleBackground />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{opacity, y}}
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full"
      >
        <div className="max-w-5xl">
          {/* Main Headline */}
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] font-light tracking-[-0.03em] mb-8 md:mb-12">
            <span className="block text-white">One Campus.</span>
            <span className="font-bold text-white">Infinite </span>
            <span className="font-bold text-white">Opportunities</span>
            <span className="text-[var(--accent-cyan)]">.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-[var(--gray-body)] max-w-2xl mb-12 md:mb-16 font-light leading-relaxed">
            An all-in-one digital ecosystem that democratizes academic support,
            events, freelancing, and networking for every college
            student—powered by AI.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6">
            {/* Primary CTA - Outlined Pill */}
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.98}}
              className="group px-8 md:px-10 py-4 md:py-5 rounded-full border-2 border-white text-white font-semibold text-base md:text-lg tracking-wide flex items-center gap-3 hover:bg-white hover:text-black transition-all duration-300"
            >
              EXPLORE ECOSYSTEM
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>

            {/* Secondary CTA - Text Link */}
            <button className="px-4 py-3 text-base md:text-lg text-white/80 font-medium relative group">
              Partner with Us
              <span className="absolute bottom-2 left-4 right-4 h-[1px] bg-[var(--accent-cyan)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 2, duration: 0.8}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{y: [0, 8, 0]}}
          transition={{repeat: Infinity, duration: 2, ease: "easeInOut"}}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
