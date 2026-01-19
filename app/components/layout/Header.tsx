"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-400 ease-in-out ${isScrolled
                    ? "bg-[var(--glass-bg)] backdrop-blur-md py-4 border-b border-white/5"
                    : "bg-transparent py-6 border-b border-transparent"
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight text-[var(--white-primary)]">
                    Digital Campus
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {/* Navigation Links Placeholder */}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:block px-6 py-2 rounded-full bg-[var(--white-primary)] text-[var(--black-primary)] font-medium hover:scale-105 transition-transform duration-300">
                        Join Campus
                    </button>

                    <button className="text-[var(--white-primary)] p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
