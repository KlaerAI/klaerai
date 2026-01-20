"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EXPECTATIONS = [
  {
    id: "01",
    title: "Intelligent Synthesis",
    desc: "We transform your scattered academic chaos into a streamlined, AI-powered knowledge base. No more lost notes—just pure, accessible intelligence.",
  },
  {
    id: "02",
    title: "Universal Exposure",
    desc: "We break down institutional silos. Your events and achievements deserve a stage that spans every campus, ensuring you are seen by the right people, everywhere.",
  },
  {
    id: "03",
    title: "Merit Over Network",
    desc: "We value what you can do, not who you know. Connect with collaborators who match your drive and skills, building networks rooted in capability, not just proximity.",
  },
  {
    id: "04",
    title: "Skill Monetization",
    desc: "We turn your potential into kinetic energy. Your skills aren't just for grades—they are currency. Access a marketplace designed to validate and reward your craft.",
  },
];

export function Expectations() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="expectations"
      ref={containerRef}
      className="relative bg-white text-black min-h-screen flex items-center py-20 lg:py-0"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24">
        {/* Sticky Header Side */}
        <div className="lg:w-1/2 lg:h-[60vh] flex flex-col justify-center lg:sticky lg:top-[20vh] self-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold leading-[0.9] tracking-tighter mb-8">
              What to <br />
              <span className="text-[var(--accent-cyan)]">Expect</span>.
            </h2>
            <div className="h-[2px] w-32 bg-black/10" />
            <p className="mt-8 text-lg md:text-xl text-black/60 max-w-md font-medium">
              We're building a new standard for student ecosystems. Here's our
              promise to you.
            </p>
          </motion.div>
        </div>

        {/* Scrollable Content Side */}
        <div className="lg:w-1/2 w-full flex flex-col gap-12 md:gap-20 pb-20 lg:pb-0">
          {EXPECTATIONS.map((item, index) => (
            <ExpectationItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpectationItem({
  item,
  index,
}: {
  item: (typeof EXPECTATIONS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="group relative border-l-2 border-dashed border-black/10 pl-8 md:pl-12 py-4"
    >
      {/* Active Indicator Line on Hover/View */}
      <motion.div
        className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-[var(--accent-cyan)]"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <span className="block text-sm font-bold tracking-[0.2em] text-[var(--accent-cyan)] mb-4">
        {item.id}
      </span>
      <h3 className="text-3xl md:text-5xl font-bold mb-6 text-black tracking-tight group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-black/60 text-lg md:text-xl leading-relaxed">
        {item.desc}
      </p>
    </motion.div>
  );
}
