"use client";

import React from "react";

export function Founder() {
    return (
        <section className="relative bg-[var(--white-primary)] text-[var(--black-primary)] py-32">
            {/* Curved Top SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] translate-y-[-99%]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[80px] md:h-[120px] fill-[var(--white-primary)]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-20 items-center">
                <div className="w-full md:w-5/12 aspect-[3/4] bg-gray-200 grayscale contrast-125 relative overflow-hidden">
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Founder Image (B&W)
                    </div>
                </div>

                <div className="w-full md:w-7/12">
                    <blockquote className="text-3xl md:text-4xl font-serif italic leading-relaxed mb-12">
                        "Talent is universal. Opportunity is not. We built this to bridge the gap."
                    </blockquote>
                    <div className="space-y-2">
                        <p className="font-bold text-lg">Founder Name, CEO</p>
                        {/* Signature Placeholder */}
                        <div className="font-script text-4xl opacity-60">Signature</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
