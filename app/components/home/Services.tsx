"use client";

import React, {useRef, useState, useEffect} from "react";
import {motion, useInView, AnimatePresence} from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "Built for conversion",
    desc: "AI-powered academic support engineered from the ground up. Every interaction has a purpose.",
    features: ["24/7 AI Tutoring", "Smart Study Plans", "Exam Prep Assistant"],
  },
  {
    id: "02",
    title: "Designed to be understood",
    desc: "Students shouldn't have to think. Clear flows, obvious CTAs, seamless experience.",
    features: ["Event Discovery", "Team Formation", "Portfolio Builder"],
  },
  {
    id: "03",
    title: "Ready to earn",
    desc: "Monetize your skills through verified campus marketplace opportunities.",
    features: [
      "Verified Freelance Gigs",
      "Skill-Based Matching",
      "Secure Payments",
    ],
  },
  {
    id: "04",
    title: "Built to connect",
    desc: "Merit-based networking that values skills over followers.",
    features: [
      "Skill Endorsements",
      "Project Collaboration",
      "Mentor Matching",
    ],
  },
];

const DYNAMIC_WORDS = ["Develop", "Design", "Elevate"];

const customEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, {once: true, margin: "-100px"});
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!headlineInView) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headlineInView]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[var(--navy-dark)] text-white py-24 md:py-32 lg:py-48 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div
            ref={headlineRef}
            className="lg:w-[38%] lg:sticky lg:top-32 lg:self-start lg:h-fit"
          >
            <h2 className="text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-bold leading-[0.95] tracking-tight">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-white"
                  initial={{y: 60, opacity: 0}}
                  animate={
                    headlineInView ? {y: 0, opacity: 1} : {y: 60, opacity: 0}
                  }
                  transition={{duration: 0.8, ease: customEase}}
                >
                  I&apos;ll Help
                </motion.span>
              </span>
              <span className="block overflow-hidden mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{y: 40, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: -40, opacity: 0}}
                    transition={{duration: 0.5, ease: customEase}}
                    className="block text-[var(--accent-cyan)] italic"
                  >
                    {DYNAMIC_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block overflow-hidden mt-1">
                <motion.span
                  className="block text-white"
                  initial={{y: 60, opacity: 0}}
                  animate={
                    headlineInView ? {y: 0, opacity: 1} : {y: 60, opacity: 0}
                  }
                  transition={{duration: 0.8, delay: 0.15, ease: customEase}}
                >
                  Your
                </motion.span>
              </span>
              <span className="block overflow-hidden mt-1">
                <motion.span
                  className="block text-white"
                  initial={{y: 60, opacity: 0}}
                  animate={
                    headlineInView ? {y: 0, opacity: 1} : {y: 60, opacity: 0}
                  }
                  transition={{duration: 0.8, delay: 0.25, ease: customEase}}
                >
                  Campus.
                </motion.span>
              </span>
            </h2>
          </div>
          <div className="lg:w-[62%] grid grid-cols-1 md:grid-cols-2">
            {SERVICES.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({item}: {item: (typeof SERVICES)[0]}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, {once: true, margin: "-80px"});

  return (
    <div
      ref={cardRef}
      className="group relative p-8 md:p-10 min-h-[340px] md:min-h-[400px] flex flex-col border-t border-l border-white/[0.06] hover:bg-white/[0.02] transition-all duration-500"
    >
      <div className="mb-6 overflow-hidden">
        <motion.span
          initial={{opacity: 0, y: 30}}
          animate={cardInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
          transition={{duration: 0.6, ease: customEase}}
          className="block text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold text-white/[0.06] leading-none select-none tracking-tight"
        >
          {item.id}
        </motion.span>
      </div>
      <div className="overflow-hidden mb-4">
        <motion.h3
          initial={{y: 30, opacity: 0}}
          animate={cardInView ? {y: 0, opacity: 1} : {y: 30, opacity: 0}}
          transition={{duration: 0.7, delay: 0.15, ease: customEase}}
          className="text-xl md:text-2xl font-semibold text-[var(--accent-cyan)]"
        >
          {item.title}
        </motion.h3>
      </div>
      <motion.p
        initial={{opacity: 0, y: 20}}
        animate={cardInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
        transition={{duration: 0.6, delay: 0.25, ease: customEase}}
        className="text-white/50 text-base mb-6 leading-relaxed"
      >
        {item.desc}
      </motion.p>
      <ul className="space-y-3 mt-auto">
        {item.features.map((feature, fi) => (
          <motion.li
            key={fi}
            initial={{opacity: 0, x: -15}}
            animate={cardInView ? {opacity: 1, x: 0} : {opacity: 0, x: -15}}
            transition={{
              duration: 0.5,
              delay: 0.35 + fi * 0.12,
              ease: customEase,
            }}
            className="flex items-center gap-3 text-sm text-white/40"
          >
            <span className="text-[var(--accent-cyan)] font-medium">—</span>
            {feature}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
