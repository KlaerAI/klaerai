"use client";

import React, {useRef, useState, useEffect} from "react";
import {motion, useInView} from "framer-motion";
import Link from "next/link";
import {Send, MessageCircle, Github, Mail} from "lucide-react";

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

        {/* Links Grid */}
        <motion.div
          initial={{opacity: 0}}
          animate={isInView ? {opacity: 1} : {}}
          transition={{duration: 0.8, delay: 0.3}}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-t border-white/10"
        >
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-xl font-bold text-white tracking-tight">
              Lumen.<span className="text-[var(--accent-cyan)]">AI</span>
            </h4>
            <p className="text-[var(--gray-body)] leading-relaxed max-w-sm">
              Empowering the next generation of builders, creators, and leaders.
              The future of campus connection is here.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Platform
            </h4>
            <ul className="space-y-3">
              {["AI Tutor", "Events", "Marketplace", "Forum"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[var(--gray-body)] hover:text-[var(--accent-cyan)] transition-colors text-sm font-medium"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Careers", "Blog", "Press"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[var(--gray-body)] hover:text-[var(--accent-cyan)] transition-colors text-sm font-medium"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect with Builders Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Connect with Builders
            </h4>
            <div className="space-y-4">
              {/* Ayush */}
              <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)]/30 hover:bg-[var(--accent-cyan)]/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold text-lg">
                    Ayush Kumar
                  </span>
                  <a
                    href="https://github.com/ayushkumar320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[var(--accent-cyan)] hover:text-black transition-all group-hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-xs font-bold">Follow on GitHub</span>
                  </a>
                </div>
                <a
                  href="mailto:ayushkumar85385@gmail.com"
                  className="text-sm text-[var(--gray-body)] group-hover:text-white transition-colors font-mono break-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-cyan)]" />
                  ayushkumar85385@gmail.com
                </a>
              </div>

              {/* Mobasshir */}
              <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)]/30 hover:bg-[var(--accent-cyan)]/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold text-lg">
                    Md. Mobasshir
                  </span>
                  <a
                    href="https://github.com/mobi2400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[var(--accent-cyan)] hover:text-black transition-all group-hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-xs font-bold">Follow on GitHub</span>
                  </a>
                </div>
                <a
                  href="mailto:mobasshirkhan9931@gmail.com"
                  className="text-sm text-[var(--gray-body)] group-hover:text-white transition-colors font-mono break-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-cyan)]" />
                  mobasshirkhan9931@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-[var(--gray-body)]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-bold text-white">Lumen.</span>
            <span className="text-[var(--accent-cyan)]">AI</span>
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
