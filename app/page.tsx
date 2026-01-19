"use client";

import { useState } from "react";
import Loader from "./components/Loader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-cyan-100">
      {/* Loader Component - always mounted initially, unmounts/hides internally or we can conditionally render */}
      {!isLoaded && (
        <Loader onComplete={() => setIsLoaded(true)} />
      )}

      {/* Main Content */}
      <main
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <div className="max-w-4xl w-full space-y-24">
          {/* Header/Nav placeholder */}
          <nav className="flex justify-between items-center w-full py-8 border-b border-gray-100">
            <div className="text-2xl font-bold tracking-tight">SAV</div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
              <span className="hover:text-black cursor-pointer transition-colors">Work</span>
              <span className="hover:text-black cursor-pointer transition-colors">Agency</span>
              <span className="hover:text-black cursor-pointer transition-colors">Contact</span>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="space-y-8">
            <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-[0.9]">
              Digital experiences <br />
              <span className="font-semibold">crafted with precision.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              We build brands that define the future. Minimalist architecture suited for high-performance applications and aesthetic excellence.
            </p>

            <div className="pt-8">
              <button className="px-8 py-4 bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 rounded-sm">
                DISCOVER MORE
              </button>
            </div>
          </section>

          {/* Footer placeholder */}
          <footer className="pt-32 pb-8 flex justify-between text-xs text-gray-400 uppercase tracking-widest border-t border-gray-100">
            <div>© 2026 SAV Inc.</div>
            <div>Scrolled 0%</div>
          </footer>
        </div>
      </main>
    </div>
  );
}
