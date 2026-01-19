"use client";

import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";

export default function Loader({onComplete}: {onComplete?: () => void}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(true);

  // Refs for odometer strips
  const hundredsRef = useRef<HTMLDivElement>(null);
  const tensRef = useRef<HTMLDivElement>(null);
  const onesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide up animation to reveal content
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
              setIsMounted(false);
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Initial state: Logo hidden, then fades in?
      // User said "exact same". Sav1n starts with black screen, logo appears, counter runs.
      // Usually fast appearance.

      const proxy = {val: 0};

      // 1. Logo Entrance (Fade in / Scale up slightly)
      tl.from(
        ".loader-logo",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );

      // 2. Counter Animation (0 - 100)
      tl.to(
        proxy,
        {
          val: 100,
          duration: 3.5,
          ease: "power2.inOut", // Smooth acceleration/deceleration
          onUpdate: () => {
            const v = Math.floor(proxy.val);
            const hundreds = Math.floor(v / 100);
            const tens = Math.floor((v % 100) / 10);
            const ones = v % 10;

            // Animate strips
            // We move by 'em' units. Since line-height is 1em (relative to font size),
            // we shift -1em * digit.
            if (hundredsRef.current)
              gsap.set(hundredsRef.current, {y: `${-hundreds}em`});
            if (tensRef.current) gsap.set(tensRef.current, {y: `${-tens}em`});
            if (onesRef.current) gsap.set(onesRef.current, {y: `${-ones}em`});
          },
        },
        0.2,
      ); // Start slightly after logo

      // 3. Optional: Color fill for 1N? Or just static?
      // Sav1n '1N' is outlined white transparent.
      // We will keep it static as per observation.
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isMounted) return null;

  // Helper for Number Strip
  // We need digits 0-9.
  // For 'hundreds', we only need 0 and 1.
  // For 'tens', 0-9 (and maybe 0 again for loop?). 0-9 is enough for 3.5s if we don't do crazy looping.
  // The odometer effect usually just slides to the number.
  // If we want "rolling", we'd need multiple sets of 0-9.
  // But standard "odometer" implementation on these sites often just goes 0->1, 0->9 direct.
  // Let's stick to direct 0-9 vertical stack.

  const NumberStrip = React.forwardRef<
    HTMLDivElement,
    {count: number; id: string}
  >(({count, id}, ref) => (
    <div className="h-[1em] overflow-hidden relative inline-block align-bottom">
      <div
        ref={ref}
        className="flex flex-col leading-[1em] will-change-transform"
      >
        {Array.from({length: count}).map((_, i) => (
          <span key={`${id}-${i}`} className="block text-center font-rubik">
            {i % 10}
          </span>
        ))}
      </div>
    </div>
  ));
  NumberStrip.displayName = "NumberStrip";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white cursor-wait font-rubik select-none"
    >
      {/* 
        LOGO CENTER 
        Font: Rubik
        SAV: Bold, White
        1N: Transparent, White Stroke
      */}
      <div className="loader-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[12vw] md:text-[8rem] leading-none tracking-tighter">
        <span className="font-bold text-white">SAV</span>
        <span
          className="font-medium text-transparent ml-[0.05em]"
          style={{WebkitTextStroke: "1px white"}}
        >
          1N
        </span>
      </div>

      {/* 
        BOTTOM RIGHT COUNTER
        Font: Rubik
        "LOADING" text
        Counter digits
      */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 flex items-end gap-3 md:gap-4 text-white">
        <span className="text-xs md:text-sm font-bold italic tracking-widest mb-1.5 md:mb-2 opacity-80">
          LOADING
        </span>

        <div className="flex items-end font-medium text-5xl md:text-8xl leading-[0.9] tracking-tight overflow-hidden h-[0.9em]">
          {/* Hundreds: 0-1 */}
          <NumberStrip ref={hundredsRef} count={2} id="hundreds" />
          {/* Tens: 0-9 */}
          <NumberStrip ref={tensRef} count={10} id="tens" />
          {/* Ones: 0-9 */}
          <NumberStrip ref={onesRef} count={10} id="ones" />

          <span className="block ml-1 text-2xl md:text-5xl self-start mt-2">
            %
          </span>
        </div>
      </div>

      {/* Global styles for font if variable not ensuring it completely or for safety */}
      <style jsx global>{`
        .font-rubik {
          font-family: var(--font-rubik), "Rubik", sans-serif;
        }
      `}</style>
    </div>
  );
}
