"use client";

import React, { useState, useEffect, useRef } from "react";

interface LoaderProps {
    onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Phases: 
    // 0: Init
    // 1: Entry (0 - 600ms)
    // 2: Counting/Main (600ms - 3600ms)
    // 3: Exit/Transition (3600ms - 4600ms)
    const [phase, setPhase] = useState(0);
    const [showOneStroke, setShowOneStroke] = useState(false);

    const startTimeRef = useRef<number | null>(null);
    const requestRef = useRef<number | null>(null);

    // Easing Functions
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number): number =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    useEffect(() => {
        const TIMELINE = {
            ENTRY_DURATION: 600,
            COUNT_START: 400,
            EXIT_START: 3600,
            TOTAL_DURATION: 4600,
        };

        const animate = (time: number) => {
            if (!startTimeRef.current) startTimeRef.current = time;
            const elapsed = time - startTimeRef.current;

            // Phase 1: Entry (0 - 600ms)
            if (elapsed < TIMELINE.ENTRY_DURATION) {
                if (phase !== 1) setPhase(1);
                // "1N" stroke starts at 50ms
                if (elapsed > 50 && !showOneStroke) setShowOneStroke(true);
            }
            // Phase 2: Main Loading (600ms - 3600ms)
            else if (elapsed >= TIMELINE.ENTRY_DURATION && elapsed < TIMELINE.EXIT_START) {
                if (phase !== 2) setPhase(2);

                // Progress Counter (0-100)
                const countDuration = 3200; // 400 to 3600 basically
                const countElapsed = Math.max(0, elapsed - TIMELINE.COUNT_START);
                const rawProgress = Math.min(countElapsed / countDuration, 1);
                const easedProgress = easeInOutCubic(rawProgress);
                setProgress(Math.floor(easedProgress * 100));
            }
            // Phase 3: Exit (3600ms+)
            else if (elapsed >= TIMELINE.EXIT_START && elapsed < TIMELINE.TOTAL_DURATION) {
                if (phase !== 3) {
                    setPhase(3);
                    setProgress(100); // Ensure it's 100% before exit
                }
            }
            // Done
            else if (elapsed >= TIMELINE.TOTAL_DURATION) {
                setIsVisible(false);
                if (onComplete) onComplete();
                return;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [onComplete, phase, showOneStroke]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-[#FFFFFF] overflow-hidden"
        >
            {/* 
              SECTION 2: RIGHT EDGE VERTICAL PROGRESS BAR 
              - Starts at right edge, moves to center at end
              - Height grows 0 -> 100%
            */}
            <div
                className="absolute top-0 w-[3px] bg-[#00BCD4] transition-all will-change-transform"
                style={{
                    right: 0,
                    height: phase >= 3 ? "100%" : `${progress}%`, // Grows with progress, full at end
                    transform: phase === 3 ? "translateX(-50vw)" : "translateX(0)", // Moves to center on exit
                    transition: phase === 3
                        ? "transform 1000ms cubic-bezier(0.76, 0, 0.24, 1), height 400ms ease"
                        : "height 100ms linear", // Smooth growth
                }}
            />

            {/*  
               Curtain for Exit (New approach: Slide content out or slide White UP?)
               The spec says "Bar Slides from edge toward center". This usually implies a split reveal or a cover.
               But the "Sav1n" site typically lifts the white curtain.
               Combining: The bar slides to center, THEN the curtain lifts/splits.
               Let's keep the main container static white, and lift the *content* or lift the container.
               Wait, if the bar slides to center, it should be visible OVER the white.
               Let's make the container slide up at end?
            */}
            <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] w-full h-full"
                style={{
                    transform: phase === 3 ? "translateY(-100%)" : "translateY(0%)"
                }}
            >
                {/* 
                   SECTION 1: "SAV" TEXT + "1" STROKE
                   Center Left Position
                */}
                <div
                    className="absolute left-1/2 top-[45%] flex items-center"
                    style={{
                        marginLeft: "-60px",
                        transform: `
                            translateX(-50%) 
                            ${phase < 1 ? "translateY(30px) scale(0.85)" : "translateY(0) scale(1)"}
                            ${phase === 3 ? "translateY(-100px)" : ""} 
                        `, // Parallax exit (move up slightly)
                        opacity: phase === 0 ? 0 : 1,
                        transition: "transform 600ms cubic-bezier(0.215, 0.610, 0.355, 1.000), opacity 400ms ease-out"
                    }}
                >
                    <span className="text-[64px] font-bold text-[#1a1a1a] tracking-tight leading-none font-sans">
                        SAV
                    </span>

                    {/* The "1" Outline Stroke Element */}
                    <div className="relative w-[30px] h-[64px] ml-2">
                        <svg
                            width="24"
                            height="48"
                            viewBox="0 0 24 48"
                            fill="none"
                            style={{
                                marginTop: "10px",
                                opacity: showOneStroke ? 1 : 0,
                                transform: showOneStroke ? "scale(1)" : "scale(0.9) translateY(10px)",
                                transition: "all 0.6s ease-out"
                            }}
                        >
                            {/* Simple "1" shape outline */}
                            <path
                                d="M8 12 L12 8 V40"
                                stroke="#1a1a1a"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="draw-stroke"
                            />
                        </svg>
                    </div>
                </div>

                {/* 
                   SECTION 3: COUNTER 
                   Bottom Right
                */}
                <div
                    className="absolute bottom-[40px] right-[40px] flex items-baseline gap-3 text-[#666666] font-sans"
                    style={{
                        opacity: phase === 3 ? 0 : (phase >= 2 ? 0.95 : 0.6),
                        transform: phase === 3 ? "translateY(-50px)" : "translateY(0)",
                        transition: "all 0.5s ease"
                    }}
                >
                    <span className="text-[13px] tracking-widest font-medium uppercase">
                        LOADING
                    </span>
                    <span className="text-[13px] tabular-nums font-medium tracking-wide">
                        {progress.toString().padStart(4, "0")}%
                    </span>
                </div>
            </div>

            <style jsx>{`
                .draw-stroke {
                    stroke-dasharray: 40;
                    stroke-dashoffset: ${showOneStroke ? 0 : 40};
                    transition: stroke-dashoffset 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}
