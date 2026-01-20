"use client";

import React, {useRef, useState} from "react";
import dynamic from "next/dynamic";
import {ArrowDown, X, Copy, Check, Mail} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// Dynamic import to avoid SSR issues with Three.js
const ParticleBackground = dynamic(
  () => import("../three/ParticleBackground"),
  {ssr: false},
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Use springs for smoother scroll-linked animations (prevents jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Smooth opacity and scale for background
  const bgOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  // Content animations
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, 100]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <section
      id="vision"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[var(--black-primary)] text-[var(--white-primary)]"
    >
      {/* 3D Particle Background - uses GPU-accelerated transform */}
      <motion.div
        style={{opacity: bgOpacity}}
        className="absolute inset-0 md:left-[30%] z-0 will-change-transform"
      >
        <ParticleBackground />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{opacity: contentOpacity, y: contentY}}
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full will-change-transform"
      >
        <div className="max-w-5xl">
          {/* Main Headline */}
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] font-light tracking-[-0.03em] mb-8 md:mb-12">
            <span className="block text-white">Lumen.AI</span>
            <span className="font-bold text-white">Infinite </span>
            <span className="font-bold text-white">Opportunities</span>
            <span className="text-[var(--accent-cyan)]">.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-[var(--gray-body)] max-w-2xl mb-12 md:mb-16 font-light leading-relaxed">
            An all-in-one digital ecosystem that levels the playing field with academic support, events, freelancing, and networking for every college student—powered by AI.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6">
            {/* Primary CTA - Outlined Pill */}
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.98}}
              onClick={scrollToServices}
              className="group px-8 md:px-10 py-4 md:py-5 rounded-full border-2 border-white text-white font-semibold text-base md:text-lg tracking-wide flex items-center gap-3 hover:bg-white hover:text-black transition-all duration-300"
            >
              Know our services!
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>

            {/* Secondary CTA - Text Link */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-3 text-base md:text-lg text-white/80 font-medium relative group"
            >
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

      {/* Partner Modal */}
      <AnimatePresence>
        {isModalOpen && <PartnerModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

function PartnerModal({onClose}: {onClose: () => void}) {
  const emails = ["ayushkumar85385@gmail.com", "mobasshirkhan9931@gmail.com"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{scale: 0.95, opacity: 0, y: 20}}
        animate={{scale: 1, opacity: 1, y: 0}}
        exit={{scale: 0.95, opacity: 0, y: 20}}
        className="relative bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-cyan)]/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-[var(--accent-cyan)]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Partner with Us
          </h3>
          <p className="text-white/60 leading-relaxed">
            We're always looking for visionary partners. Reach out to discuss
            how we can build the future of student growth together.
          </p>
        </div>

        <div className="space-y-3">
          {emails.map((email) => (
            <EmailRow key={email} email={email} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EmailRow({email}: {email: string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between border border-white/5 group hover:border-white/10 transition-colors">
      <div className="flex flex-col min-w-0 pr-2">
        <span className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
          Email
        </span>
        <code className="text-[var(--accent-cyan)] font-mono text-xs sm:text-sm break-all">
          {email}
        </code>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors relative text-white/40 hover:text-white"
          title="Copy email"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <a
          href={`mailto:${email}`}
          className="p-2 hover:bg-[var(--accent-cyan)] hover:text-black rounded-lg transition-colors text-white/40"
          title="Open mail client"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
