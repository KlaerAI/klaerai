"use client";

import React, {useRef} from "react";
import {motion, useInView} from "framer-motion";
import {ArrowUpRight} from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "AI Academic Support",
    desc: "Personalized intelligence for every student.",
    features: ["24/7 AI Tutoring", "Smart Study Plans", "Exam Prep Assistant"],
  },
  {
    id: "02",
    title: "Event Infrastructure",
    desc: "Hackathons, debates & portfolios.",
    features: ["Event Discovery", "Team Formation", "Portfolio Builder"],
  },
  {
    id: "03",
    title: "Student Marketplace",
    desc: "Earn while learning with verified gigs.",
    features: [
      "Verified Freelance Gigs",
      "Skill-Based Matching",
      "Secure Payments",
    ],
  },
  {
    id: "04",
    title: "Merit Networking",
    desc: "Connect based on skills, not followers.",
    features: [
      "Skill Endorsements",
      "Project Collaboration",
      "Mentor Matching",
    ],
  },
  {
    id: "05",
    title: "Campus Forum",
    desc: "Open discourse and community building.",
    features: ["Discussion Threads", "Anonymous Support", "Knowledge Sharing"],
  },
  {
    id: "06",
    title: "Career Launchpad",
    desc: "From campus to career, seamlessly.",
    features: ["Resume Builder", "Interview Prep", "Job Matching"],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: "-100px"});

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[var(--navy-dark)] text-white py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-20">
        {/* Section Title */}
        <motion.h2
          initial={{opacity: 0, y: 40}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-24 max-w-3xl leading-tight tracking-tight"
        >
          A Unified
          <br />
          <span className="text-[var(--accent-cyan)]">Digital Campus.</span>
        </motion.h2>

        {/* Services Grid - 2 Column SAV1N Style */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {SERVICES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{opacity: 0, y: 40}}
              animate={isInView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 * i,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="group relative p-8 md:p-12 min-h-[360px] md:min-h-[420px] flex flex-col justify-between border-t border-l border-white/10 hover:bg-[var(--accent-cyan)]/5 transition-all duration-500"
            >
              {/* Huge Index Number */}
              <span className="absolute top-6 left-6 text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 leading-none select-none pointer-events-none">
                {item.id}
              </span>

              {/* Arrow Icon */}
              <div className="absolute top-8 right-8 text-white/20 group-hover:text-[var(--accent-cyan)] transition-all duration-300 transform group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight
                  className="w-7 h-7 md:w-8 md:h-8"
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full pt-20">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[var(--gray-body)] text-lg mb-6 group-hover:text-white/80 transition-colors duration-300">
                  {item.desc}
                </p>

                {/* Feature List */}
                <ul className="space-y-2">
                  {item.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-center gap-3 text-sm text-[var(--gray-body)] group-hover:text-white/70 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
