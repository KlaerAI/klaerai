"use client";

import React, {useState} from "react";
import Loader from "./components/Loader";
import {Header} from "./components/layout/Header";
import {Hero} from "./components/home/Hero";
import {Problem} from "./components/home/Problem";
import {Services} from "./components/home/Services";
import {Flywheel} from "./components/home/Flywheel";
import {Founder} from "./components/home/Founder";
import {Footer} from "./components/layout/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />

      <div className="relative bg-[var(--black-primary)] min-h-screen text-[var(--white-primary)] font-sans selection:bg-[var(--accent-cyan)] selection:text-black">
        <Header />

        <main>
          <Hero />
          <Problem />
          <Services />
          <Flywheel />
          <Founder />
        </main>

        <Footer />
      </div>
    </>
  );
}
