"use client";

import React, {useState, useEffect, useRef} from "react";
import {motion, useSpring, AnimatePresence} from "framer-motion";
import {Menu, X} from "lucide-react";

interface NavItem {
  label: string;
  id: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  {label: "Vision", id: "vision", href: "#vision"},
  {label: "Problem", id: "problem", href: "#problem"},
  {label: "Services", id: "services", href: "#services"},
  {label: "Expectations", id: "expectations", href: "#expectations"},
  {label: "About", id: "about", href: "#about"},
];

export function Header() {
  const [activeSection, setActiveSection] = useState("vision");
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Spring animations for smooth motion
  const pillWidth = useSpring(160, {stiffness: 220, damping: 25, mass: 1});

  // Scroll spy to detect which section is in view
  useEffect(() => {
    const sections = [
      "vision",
      "problem",
      "services",
      "expectations",
      "about",
      "founder",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const {offsetTop, offsetHeight} = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hover expansion
  // Handle hover expansion
  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      pillWidth.set(380);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(160);
      }, 600);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [hovering, pillWidth]);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setHovering(false);
  };

  // Get display label for active section
  const getActiveLabel = () => {
    const item = NAV_ITEMS.find((item) => item.id === activeSection);
    if (item) return item.label;
    // Handle sections not in nav
    if (activeSection === "founder") return "About";

    return "Vision";
  };

  return (
    <>
      {/* Desktop Navigation - Centered 3D Pill */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.nav
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-full"
          style={{
            width: pillWidth,
            height: "56px",
            background: `linear-gradient(135deg, 
              rgba(10, 10, 10, 0.95) 0%, 
              rgba(20, 20, 20, 0.9) 50%, 
              rgba(15, 15, 15, 0.95) 100%
            )`,
            backdropFilter: "blur(20px)",
            boxShadow: expanded
              ? `
                0 4px 20px rgba(0, 188, 212, 0.15),
                0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `
              : `
                0 4px 16px rgba(0, 0, 0, 0.3),
                0 2px 8px rgba(0, 188, 212, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.08),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
            transition: "box-shadow 0.3s ease-out",
          }}
        >
          {/* Top edge highlight */}
          <div
            className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)",
            }}
          />

          {/* Cyan accent glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(0, 188, 212, 0.15) 0%, transparent 60%)",
            }}
          />

          {/* Navigation content */}
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            {/* Collapsed state */}
            {!expanded && (
              <div className="flex items-center gap-3">
                <a
                  href="#vision"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#vision")
                      ?.scrollIntoView({behavior: "smooth"});
                    setActiveSection("vision");
                  }}
                  className="text-[var(--accent-cyan)] font-bold text-sm"
                >
                  Lumen
                </a>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSection}
                    initial={{opacity: 0, y: 8}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -8}}
                    transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
                    className="text-white font-medium text-sm tracking-wide"
                  >
                    {getActiveLabel()}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}

            {/* Expanded state */}
            {expanded && (
              <div className="flex items-center gap-3 w-full justify-start pl-2">
                <a
                  href="#vision"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#vision")
                      ?.scrollIntoView({behavior: "smooth"});
                    setActiveSection("vision");
                  }}
                  className="text-[var(--accent-cyan)] font-bold text-sm mr-4"
                >
                  Lumen
                </a>
                <div className="flex items-center gap-1">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = item.id === activeSection;
                    return (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector(item.href);
                          if (element) {
                            element.scrollIntoView({behavior: "smooth"});
                            setActiveSection(item.id);
                          }
                        }}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          isActive
                            ? "text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.nav>
      </header>

      {/* Mobile Navigation */}
      <header className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/10">
          <a href="#vision" className="flex items-center gap-2">
            <span className="text-[var(--accent-cyan)] font-bold">Lumen</span>
            <span className="text-white font-medium text-sm">
              {getActiveLabel()}
            </span>
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: index * 0.1}}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-3xl font-light text-white hover:text-[var(--accent-cyan)] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
