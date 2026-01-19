"use client";

import React, { useState, useEffect, useRef } from "react";

interface LoaderProps {
    onComplete?: () => void;
    minDuration?: number; // in ms
}

export default function Loader({ onComplete, minDuration = 4000 }: LoaderProps) {
    const [progress, setProgress] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [isVisible, setIsVisible] = useState(true);

    // Phase state: 0=init, 1=logo_in, 2=counting, 3=fade_out, 4=done
    const [phase, setPhase] = useState(0);

    const startTimeRef = useRef<number | null>(null);
    const requestRef = useRef<number | null>(null);

    // Easing function: easeInOutCubic
    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    useEffect(() => {
        // Start animation sequence
        const countStart = 1000; // ms
        const countDuration = 2500; // ms (1s to 3.5s)
        const fadeOutStart = 3500; // ms
        const slideDuration = 1000; // ms
        // Ensure total duration includes the full slide transition
        const duration = Math.max(minDuration, fadeOutStart + slideDuration);

        const animate = (time: number) => {
            if (!startTimeRef.current) startTimeRef.current = time;
            const elapsed = time - startTimeRef.current;

            // Phase 1: Logo Enter (0-1s) handled by CSS transitions
            if (elapsed < countStart) {
                setPhase(1);
                setProgress(0);
            }
            // Phase 2: Counting (1s - 3.5s)
            else if (elapsed >= countStart && elapsed < fadeOutStart) {
                setPhase(2);
                const countProgress = (elapsed - countStart) / countDuration;
                const clampedProgress = Math.min(Math.max(countProgress, 0), 1);
                // Linear count as requested "linearly over 3-4 seconds" 
                // (technically user said 0-100% linearly, but general ease requested too. I'll stick to linear for digits to avoid jarring speed changes)
                setProgress(Math.floor(clampedProgress * 100));
            }
            // Phase 3: Transition Out (3.5s - 4.5s)
            else if (elapsed >= fadeOutStart && elapsed < duration) {
                setPhase(3);
                setProgress(100);
            }
            // Phase 4: Done
            else if (elapsed >= duration) {
                setPhase(4);
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
    }, [minDuration, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFFF] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
            style={{
                transform: phase === 3 ? "translateY(-100%)" : "translateY(0%)"
            }}
        >
            {/* Brand Logo Container */}
            {/* Position: ~40% from left, ~45% from top */}
            <div
                className="absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                    left: "40%",
                    top: "45%",
                    opacity: phase === 3 ? 0 : (phase >= 1 ? 1 : 0),
                    transform: phase === 3
                        ? "translateY(-200px)"  // Parallax Exit
                        : (phase >= 1 ? "translateY(0)" : "translateY(10px)")
                }}
            >
                <div className="flex items-center gap-3">
                    <span className="text-[48px] md:text-[64px] font-bold text-[#1a1a1a] tracking-tight leading-none">
                        SAV
                    </span>
                    {/* Animated Square */}
                    <div
                        className="w-3 h-3 md:w-4 md:h-4 bg-[#00BCD4] mt-3"
                        style={{
                            animation: phase >= 1 && phase < 3 ? "pulse-scale 2s infinite ease-in-out" : "none"
                        }}
                    />
                </div>
            </div>

            {/* Loading Counter */}
            <div
                className="absolute bottom-10 right-10 flex items-end gap-2 text-[#1a1a1a] transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                    opacity: phase === 3 ? 0 : (phase >= 2 ? 1 : 0),
                    transform: phase === 3
                        ? "translateY(-100px)" // Moves up significantly at 100%
                        : "translateY(0)"
                }}
            >
                <span className="text-sm md:text-base font-light tracking-widest text-[#666666]">
                    LOADING
                </span>
                <span className="text-4xl md:text-5xl font-light tabular-nums leading-none tracking-tighter">
                    {progress.toString().padStart(3, "0")}%
                </span>
            </div>

            <style jsx global>{`
        @keyframes pulse-scale {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
