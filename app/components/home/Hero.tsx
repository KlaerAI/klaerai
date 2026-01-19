"use client";

import React, { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[var(--black-primary)] text-[var(--white-primary)]">
            {/* Aurora Background Layer */}
            <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-[var(--accent-cyan)]/[0.1] blur-3xl" />
                <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,var(--accent-cyan),transparent_70%)] opacity-20 blur-[120px] animate-aurora mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,#4F46E5,transparent_70%)] opacity-10 blur-[100px] animate-pulse" />
            </motion.div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-12">
                <div className="max-w-5xl">
                    <h1 className="text-[3.5rem] md:text-[6.5rem] leading-[0.95] font-light tracking-tighter mb-10">
                        One Campus.<br />
                        <span className="font-bold relative inline-block text-[var(--white-primary)]">
                            Infinite Opportunities
                            {/* SVG Ellipse */}
                            <span className="absolute -inset-x-6 -inset-y-4 md:-inset-x-12 md:-inset-y-6">
                                <svg className="w-full h-full" viewBox="0 0 400 120" fill="none" preserveAspectRatio="none">
                                    <motion.path
                                        d="M20,60 Q200,10 380,60 T20,60"
                                        stroke="var(--accent-cyan)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                    />
                                </svg>
                            </span>
                        </span>
                        <span className="text-[var(--accent-cyan)]">.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--gray-text)] max-w-2xl mb-14 font-light leading-relaxed">
                        An all-in-one digital ecosystem that democratizes academic support, events, freelancing, and networking for every college student—powered by AI.
                    </p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <button className="group px-10 py-5 rounded-full bg-[var(--white-primary)] text-[var(--black-primary)] font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                            Explore Ecosystem
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 text-lg text-[var(--white-primary)] border-b border-transparent hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-colors">
                            Partner with Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--black-primary)] to-transparent pointer-events-none z-20" />
        </section>
    );
}
