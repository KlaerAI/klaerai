"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function Flywheel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section className="relative bg-[var(--black-primary)] text-[var(--white-primary)]">
            <div ref={containerRef} className="h-[200vh] relative">
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    {/* Sticky Centered Graphic */}
                    <div className="w-[80vw] md:w-[40vw] aspect-square rounded-full border border-[var(--accent-cyan)]/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 border border-[var(--accent-cyan)] rounded-full border-t-transparent animate-spin-slow" />
                        <h2 className="text-4xl md:text-6xl font-bold text-center">
                            The<br />System
                        </h2>
                    </div>
                </div>

                {/* Scrolling Text Panels Overlay */}
                <div className="absolute inset-0">
                    <div className="h-screen flex items-center justify-end px-12 md:px-32 pointer-events-none">
                        <h3 className="text-5xl font-bold backdrop-blur-sm">Learn</h3>
                    </div>
                    <div className="h-screen flex items-center justify-start px-12 md:px-32 pointer-events-none">
                        <h3 className="text-5xl font-bold backdrop-blur-sm">Build</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
