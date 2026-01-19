"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import {Menu, X} from "lucide-react";

const NAV_LINKS = [
  {href: "#vision", label: "VISION"},
  {href: "#services", label: "SERVICES"},
  {href: "#about", label: "ABOUT"},
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1200px]">
        <nav
          className={`
            relative flex items-center justify-between px-4 md:px-8 py-3 md:py-4
            rounded-full transition-all duration-500
            ${
              isScrolled
                ? "glass cyan-glow-border border border-white/10"
                : "bg-black/40 backdrop-blur-sm border border-white/5"
            }
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-lg md:text-xl font-bold tracking-tight text-white"
          >
            <span>Digital</span>
            <span className="text-[var(--accent-cyan)] ml-1">Campus</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="#contact"
              className="hidden md:flex items-center px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              LET'S TALK
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center
          transition-all duration-500 md:hidden
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-light tracking-wider text-white hover:text-[var(--accent-cyan)] transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-10 py-4 rounded-full bg-white text-black font-bold text-lg tracking-wide hover:scale-105 transition-transform"
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            LET'S TALK
          </Link>
        </nav>
      </div>
    </>
  );
}
