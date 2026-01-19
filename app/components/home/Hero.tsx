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
        <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[var(--black-primary)]">
            {/* Background Placeholder - 3D Globe would go here */}
            <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
                <div className="absolute top-1/2 right-0 w-[60vw] h-[60vw] bg-radial-gradient from-[var(--accent-cyan)]/20 to-transparent blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                {/* Grid lines or abstract network could be SVG here */}
            </motion.div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 w-full">
                <div className="max-w-4xl">
                    <h1 className="text-[3.5rem] md:text-[5rem] leading-[1.1] font-light tracking-tight mb-8">
                        One Campus.<br />
                        <span className="font-bold text-[var(--accent-cyan)] relative inline-block">
                            Infinite Opportunities.
                            {/* SVG Ellipse Animation Placeholder */}
                            <svg className="absolute -inset-2 w-[110%] h-[120%] pointer-events-none" viewBox="0 0 200 60" fill="none">
                                <path d="M10,30 Q100,5 190,30 T10,30" stroke="var(--accent-cyan)" strokeWidth="2" pathLength="1" className="draw-ellipse" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--gray-text)] max-w-xl mb-12">
                        An all-in-one digital ecosystem that democratizes academic support, events, freelancing, and networking for every college student—powered by AI.
                    </p>

                    <div className="flex items-center gap-6">
                        <button className="group px-8 py-4 rounded-full border border-[var(--white-primary)] text-[var(--white-primary)] font-medium hover:bg-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] hover:text-black transition-all duration-300 flex items-center gap-3">
                            Explore Ecosystem
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                        <button className="text-[var(--white-primary)] border-b border-transparent hover:border-[var(--accent-cyan)] transition-colors">
                            Partner with Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
