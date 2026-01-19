"use client";

import React from "react";

const PROBLEMS = [
    { title: "Unequal Access", desc: "Resources scattered by zip code." },
    { title: "Gated Opportunity", desc: "Status over merit." },
    { title: "Discontinuous Events", desc: "No portfolio continuity." },
    { title: "Meritless Networking", desc: "Who you know > What you do." }
];

export function Problem() {
    return (
        <section className="relative bg-[var(--white-primary)] text-[var(--black-primary)] py-32 md:py-40">
            {/* Curved Top SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] translate-y-[-99%]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[80px] md:h-[120px] fill-[var(--white-primary)]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <h2 className="text-5xl md:text-6xl font-bold mb-24 max-w-3xl">The campus experience is fragmented.</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--black-primary)]">
                    {PROBLEMS.map((item, i) => (
                        <div key={i} className="group p-8 border-r border-b border-[var(--black-primary)] hover:bg-[var(--black-primary)] hover:text-[var(--white-primary)] transition-colors duration-300 cursor-default min-h-[300px] flex flex-col justify-between">
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                            <p className="text-lg opacity-60 group-hover:opacity-100">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
