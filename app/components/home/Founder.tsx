"use client";

import React, {useRef} from "react";
import {motion, useInView} from "framer-motion";

export function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: "-100px"});

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white text-black py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: Founder Image */}
          <motion.div
            initial={{opacity: 0, x: -40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
            className="w-full lg:w-5/12"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              {/* Placeholder Image with grain effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 grain-filter">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* SVG Placeholder Icon */}
                  <svg
                    className="w-24 h-24 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Overlay grain texture */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </motion.div>

          {/* Right: Manifesto */}
          <motion.div
            initial={{opacity: 0, x: 40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1]}}
            className="w-full lg:w-7/12"
          >
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan)]">
                About Me
              </span>
              <div className="flex-1 h-[1px] bg-black/10" />
            </div>

            {/* Quote */}
            <blockquote
              className="text-3xl md:text-4xl lg:text-5xl leading-snug mb-12"
              style={{fontFamily: "var(--font-playfair), Georgia, serif"}}
            >
              <span className="italic font-normal">
                "Talent is universal.
                <br />
                Opportunity is{" "}
                <span className="not-italic font-semibold text-[var(--accent-cyan)]">
                  not
                </span>
                .
                <br />
                <span className="not-italic font-medium">
                  We built this to bridge the gap."
                </span>
              </span>
            </blockquote>

            {/* Founder Info */}
            <div className="space-y-2 mb-8">
              <p className="text-xl font-bold">Ayush Kumar</p>
              <p className="text-[var(--gray-body)]">
                Founder & CEO, Digital Campus
              </p>
            </div>

            {/* Animated Signature */}
            <motion.svg
              initial={{pathLength: 0, opacity: 0}}
              animate={isInView ? {pathLength: 1, opacity: 0.6} : {}}
              transition={{duration: 2, delay: 0.5, ease: "easeOut"}}
              className="w-48 md:w-64 h-16"
              viewBox="0 0 200 50"
              fill="none"
            >
              <motion.path
                d="M10 35 Q 30 10, 50 35 T 90 35 Q 110 20, 130 35 T 170 25 Q 185 15, 195 30"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{pathLength: 0}}
                animate={isInView ? {pathLength: 1} : {}}
                transition={{duration: 2, delay: 0.5, ease: "easeOut"}}
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
