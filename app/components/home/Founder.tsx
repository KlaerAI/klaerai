"use client";

import React, {useRef} from "react";
import {motion, useInView} from "framer-motion";
import Image from "next/image";

// Founder data for both people
const founders = [
  {
    name: "Md. Mobasshir Shakil Khan",
    title: "Founder",
    linkedin: "https://www.linkedin.com/in/md-mobasshir-shakil-khan-8ba835326",
    tagline:
      "Talent is universal. Opportunity is not. We built this to bridge the gap.",
    image: "/Mobasshir.jpg",
  },
  {
    name: "Ayush Kumar",
    title: "Co-Founder",
    linkedin: "https://linkedin.com/in/ayushnotkumar",
    tagline: "Technology should empower everyone. We're making that a reality.",
    image: "/Ayush.jpg",
  },
];

function FounderSection({
  founder,
  index,
  isReversed,
}: {
  founder: (typeof founders)[0];
  index: number;
  isReversed: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: "-100px"});

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black py-20 md:py-24 lg:py-32 overflow-hidden min-h-screen flex items-center"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        {/* Section Label */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, ease: [0.76, 0, 0.24, 1]}}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan)]">
            {index === 0 ? "About Us" : "Meet The Team"}
          </span>
          <div
            className={`flex-1 h-[1px] ${
              index === 0 ? "bg-black/10" : "bg-white/10"
            }`}
          />
        </motion.div>

        {/* Main Content */}
        <div
          className={`flex flex-col ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-12 lg:gap-20 items-center`}
        >
          {/* Founder Image */}
          <motion.div
            initial={{opacity: 0, x: isReversed ? 40 : -40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
            className="w-full lg:w-5/12"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group cursor-pointer">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* Grain Overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none transition-all duration-300 group-hover:opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* LinkedIn Overlay on Hover */}
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30"
              >
                <div className="bg-[#0077B5] p-4 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{opacity: 0, x: isReversed ? -40 : 40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1]}}
            className="w-full lg:w-7/12"
          >
            {/* Quote */}
            <blockquote
              className="text-3xl md:text-4xl lg:text-5xl leading-snug mb-12"
              style={{fontFamily: "var(--font-playfair), Georgia, serif"}}
            >
              <span className="italic font-normal">
                "{founder.tagline.split(".")[0]}.
                <br />
                <span className="not-italic font-semibold text-[var(--accent-cyan)]">
                  {founder.tagline.split(".")[1]?.trim()}.
                </span>
                <br />
                <span className="not-italic font-medium">
                  {founder.tagline.split(".").slice(2).join(".").trim()}"
                </span>
              </span>
            </blockquote>

            {/* Founder Info */}
            <div className="space-y-2 mb-8">
              <p className="text-xl font-bold">{founder.name}</p>
              <p className="text-[var(--gray-body)]">{founder.title}</p>
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

export function Founder() {
  return (
    <div id="about">
      {founders.map((founder, index) => (
        <FounderSection
          key={founder.name}
          founder={founder}
          index={index}
          isReversed={index % 2 === 1}
        />
      ))}
    </div>
  );
}
