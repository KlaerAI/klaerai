"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {Header} from "../components/layout/Header";

// Target date: 100 days from now
const TARGET_DAYS = 90;

export default function Axiom() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date (April 20, 2026 - 90 days from Jan 20)
    const targetDate = new Date("2026-04-20T00:00:00");

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[var(--black-primary)] min-h-screen text-[var(--white-primary)] font-sans selection:bg-[var(--accent-cyan)] selection:text-black flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-cyan)]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Axiom is coming to{" "}
              <span className="text-[var(--accent-cyan)]">life.</span>
            </h1>

            <p className="text-[var(--gray-body)] text-xl md:text-2xl mb-16 max-w-2xl mx-auto">
              A unified infrastructure for technical and non-technical events
              that bridge the institutional gap.
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            <Link href="/">
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-[var(--accent-cyan)] hover:text-black hover:border-transparent transition-all duration-300 backdrop-blur-sm"
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function TimeUnit({value, label}: {value: number; label: string}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="text-5xl md:text-7xl font-bold font-mono tabular-nums leading-none block">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-50" />
      </div>
      <span className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--gray-body)]">
        {label}
      </span>
    </div>
  );
}
