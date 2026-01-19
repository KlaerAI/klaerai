"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export function Services() {
    return (
        <section className="relative bg-[var(--navy-dark)] text-[var(--white-primary)] py-32 md:py-40">
            {/* Curved Top SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] translate-y-[-99%]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[80px] md:h-[120px] fill-[var(--navy-dark)]">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-24">A Unified Digital Campus.</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="group relative p-10 border-r border-b border-white/10 hover:bg-[var(--accent-cyan)]/5 transition-colors duration-300 min-h-[320px]">
                            <span className="absolute top-8 left-8 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors">0{num}</span>

                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent-cyan)] transition-colors">Service Title {num}</h3>
                                <p className="text-[var(--gray-text)] mb-6 group-hover:text-white/80 transition-colors">
                                    Description of service module goes here.
                                </p>
                                <ul className="space-y-2 text-sm text-[var(--gray-text)]">
                                    <li>• Feature One</li>
                                    <li>• Feature Two</li>
                                </ul>
                            </div>

                            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                                <ArrowUpRight className="text-[var(--accent-cyan)] w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
