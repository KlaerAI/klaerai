"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export function Services() {
    return (
        <section className="relative bg-[var(--navy-dark)] text-[var(--white-primary)] py-32 md:py-40">
            {/* Curved Top SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] translate-y-[-98%] z-10">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[80px] md:h-[120px] fill-[var(--navy-dark)]">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-12 relative z-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-24 max-w-2xl leading-tight">
                    A Unified<br />
                    <span className="text-[var(--accent-cyan)]">Digital Campus.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/20">
                    {[
                        { id: "01", title: "AI Academic Support", desc: "Personalized intelligence for every student." },
                        { id: "02", title: "Event Infrastructure", desc: "Hackathons, debates & portfolios." },
                        { id: "03", title: "Freelance Marketplace", desc: "Earn while learning with verified gigs." },
                        { id: "04", title: "Merit Networking", desc: "Connect based on skills, not followers." },
                        { id: "05", title: "Campus Forum", desc: "Open discourse and community building." }
                    ].map((item) => (
                        <div key={item.id} className="group relative p-10 border-r border-b border-white/20 hover:bg-[var(--accent-cyan)]/5 transition-colors duration-500 min-h-[380px] flex flex-col justify-between">
                            <span className="absolute top-6 left-6 text-8xl font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors select-none">
                                {item.id}
                            </span>

                            <div className="relative z-10 flex flex-col justify-end h-full">
                                <h3 className="text-2xl font-bold mb-4 text-[var(--white-primary)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-[var(--gray-text)] mb-8 text-lg group-hover:text-white/90 transition-colors duration-300">
                                    {item.desc}
                                </p>
                                <ul className="space-y-3 text-sm text-[var(--gray-text)] group-hover:text-white/70">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--accent-cyan)]" /> Feature One
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--accent-cyan)]" /> Feature Two
                                    </li>
                                </ul>
                            </div>

                            <div className="absolute top-8 right-8 text-[var(--gray-border)] group-hover:text-[var(--accent-cyan)] transition-all duration-300 transform group-hover:rotate-45 group-hover:scale-110">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
