"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "./components/layout/Header";


export default function NotFound() {
    return (
        <div className="relative bg-[var(--black-primary)] min-h-screen text-[var(--white-primary)] font-sans selection:bg-[var(--accent-cyan)] selection:text-black flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6">
                {/* Background Gradients/Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-[var(--accent-cyan)]/10 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Giant 404 with Stroke Effect */}
                        <h1
                            className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-transparent"
                            style={{
                                WebkitTextStroke: "2px rgba(255, 255, 255, 0.1)",
                                fontFamily: "var(--font-playfair), serif",
                            }}
                        >
                            404
                        </h1>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                            Lost in the <span className="text-[var(--accent-cyan)]">Void?</span>
                        </h2>

                        <p className="text-[var(--gray-body)] text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                            The page you are looking for has drifted into the unknown.
                            Let's get you back to familiar territory.
                        </p>

                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-[var(--accent-cyan)] text-black font-semibold rounded-full hover:bg-[var(--white-primary)] transition-colors duration-300"
                            >
                                Return to Surface
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </main>


        </div>
    );
}
