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
    const sections = ["vision", "problem", "services", "about", "founder"];

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
  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      setExpanded(true);
      pillWidth.set(340);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(160);
      }, 600);
    } // ... existing code ...

    return () => {
      // ...
    };
  }, [hovering, pillWidth]);

  // ... existing code ...

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
                  DC
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
            <span className="text-[var(--accent-cyan)] font-bold">DC</span>
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
