"use client";

import React, {useRef, useState, useEffect} from "react";
import {motion, useInView} from "framer-motion";
import Link from "next/link";
import {Send, MessageCircle} from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Platform",
    links: ["AI Tutor", "Events", "Marketplace", "Forum"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "Partners", "Developers"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "Licenses"],
  },
];

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: "-100px"});
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative bg-[var(--black-primary)] text-white pt-24 md:pt-32 pb-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* CTA Section */}
        <motion.div
          initial={{opacity: 0, y: 40}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
          className="text-center mb-20 md:mb-28"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light mb-6 tracking-tight">
            Campus{" "}
            <span className="font-bold text-[var(--accent-cyan)]">
              Reimagined
            </span>
            <span className="text-[var(--accent-cyan)]">.</span>
          </h2>
          <p className="text-[var(--gray-body)] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Ready to transform your college experience? Join thousands of
            students already building their future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.98}}
              className="px-10 md:px-14 py-5 md:py-6 rounded-full bg-white text-black font-bold text-lg md:text-xl tracking-wide flex items-center gap-3 shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.5)] transition-all"
            >
              Join as Student
              <Send className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.98}}
              className="px-10 md:px-12 py-5 md:py-6 rounded-full border-2 border-white/20 text-white font-semibold text-lg flex items-center gap-3 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Partner with Us
            </motion.button>
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{opacity: 0}}
          animate={isInView ? {opacity: 1} : {}}
          transition={{duration: 0.8, delay: 0.3}}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 border-t border-white/10"
        >
          {FOOTER_LINKS.map((column, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href="#"
                      className="text-[var(--gray-body)] hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-[var(--gray-body)]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-bold text-white">Digital</span>
            <span className="text-[var(--accent-cyan)]">Campus</span>
            <span className="ml-4">© 2026 All rights reserved.</span>
          </div>

          {/* Local Time Widget */}
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-wider uppercase opacity-60">
              Local Time
            </span>
            <span className="font-mono text-white tabular-nums">
              {localTime}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
