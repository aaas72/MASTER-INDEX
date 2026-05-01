"use client";

import { useEffect, useRef } from "react";
import algorithmsData from "@/data/algorithms.json";
import { home as t } from "@/locales/en/home";

export default function Hero() {
  const streamsRef = useRef<HTMLDivElement[]>([]);
  const totalAlgorithms = Object.keys(algorithmsData).length;
  const totalCategories = new Set(Object.values(algorithmsData).map(a => a.category)).size;

  useEffect(() => {
    const interval = setInterval(() => {
      streamsRef.current.forEach((stream) => {
        if (stream && Math.random() > 0.7) {
          let text = stream.innerText;
          if (text.includes("0") || text.includes("1")) {
            stream.innerText = text
              .split("")
              .map((char) =>
                char === "0" || char === "1"
                  ? Math.random() > 0.5
                    ? "1"
                    : "0"
                  : char,
              )
              .join("");
          }
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col border-b border-surface-container bg-surface-container-lowest py-32 overflow-hidden">
      <div className="hero-canvas-container">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1000 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="tree-container">
            <circle className="tree-node" cx="500" cy="100" fill="#002FA7" r="6" />
            <path className="tree-edge" d="M500,100 L300,200" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M500,100 L700,200" fill="none" stroke="#002FA7" strokeWidth="1" />
            <circle className="tree-node" cx="300" cy="200" fill="#002FA7" r="4" style={{ animationDelay: "-1s" }} />
            <circle className="tree-node" cx="700" cy="200" fill="#002FA7" r="4" style={{ animationDelay: "-1.5s" }} />
            <path className="tree-edge" d="M300,200 L150,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M300,200 L450,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M700,200 L600,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M700,200 L850,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <circle className="tree-node" cx="150" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-2s" }} />
            <circle className="tree-node" cx="450" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-2.5s" }} />
            <circle className="tree-node" cx="600" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-3s" }} />
            <circle className="tree-node" cx="850" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-3.5s" }} />
            <path className="tree-edge" d="M150,350 L80,500" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M150,350 L220,500" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M450,350 L400,500" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M600,350 L650,500" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M850,350 L920,500" fill="none" stroke="#002FA7" strokeWidth="1" />
            <circle className="tree-node" cx="80" cy="500" fill="#002FA7" r="2" style={{ animationDelay: "-4s" }} />
            <circle className="tree-node" cx="220" cy="500" fill="#002FA7" r="2" style={{ animationDelay: "-4.5s" }} />
            <circle className="tree-node" cx="400" cy="500" fill="#002FA7" r="2" style={{ animationDelay: "-5s" }} />
            <circle className="tree-node" cx="650" cy="500" fill="#002FA7" r="2" style={{ animationDelay: "-5.5s" }} />
            <circle className="tree-node" cx="920" cy="500" fill="#002FA7" r="2" style={{ animationDelay: "-6s" }} />
          </g>
        </svg>

        <div className="data-stream" style={{ top: "10%", left: "5%" }} ref={(el) => { if (el) streamsRef.current[0] = el; }}>
          01011001 11001010 01110101
        </div>
        <div className="data-stream" style={{ top: "15%", right: "10%" }} ref={(el) => { if (el) streamsRef.current[1] = el; }}>
          {t.hero.streams.traversal}
        </div>
        <div className="data-stream" style={{ bottom: "20%", left: "8%" }} ref={(el) => { if (el) streamsRef.current[2] = el; }}>
          {t.hero.streams.expansion}
        </div>
        <div className="data-stream" style={{ bottom: "10%", right: "15%" }} ref={(el) => { if (el) streamsRef.current[3] = el; }}>
          {t.hero.streams.memory}
        </div>
      </div>

      <div className="w-full">
        <div className="relative z-10 w-full max-w-3xl text-left">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-[#002FA7]">
            {t.hero.kicker}
          </span>
          <h2 className="mb-12 font-sans text-5xl font-extrabold leading-[0.95] tracking-tighter text-black md:text-7xl">
            {t.hero.title}
          </h2>
          <div className="group relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center">
              <span className="material-symbols-outlined text-primary-container text-2xl">
                manage_search
              </span>
            </div>
            <input
              className="w-full border-none border-b-2 border-outline-variant bg-white/90 px-16 py-8 text-xl font-body italic outline-none backdrop-blur-sm transition-all focus:border-primary-container focus:ring-0 placeholder:text-slate-400 shadow-custom"
              placeholder={t.hero.placeholder}
              type="text"
            />
            <div className="absolute inset-y-0 right-6 flex items-center space-x-2">
              <kbd className="hidden md:inline-flex items-center border border-outline-variant bg-white px-2 py-1 font-mono text-[10px] text-slate-400">
                ⌘
              </kbd>
              <kbd className="hidden md:inline-flex items-center border border-outline-variant bg-white px-2 py-1 font-mono text-[10px] text-slate-400">
                K
              </kbd>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
              {t.hero.stats.replace('[{totalAlgorithms}]', `[${totalAlgorithms}]`).replace('[{totalCategories}]', `[${totalCategories}]`)}
            </p>
            <div className="flex gap-4">
              <span className="bg-surface-container-high px-3 py-1 font-mono text-[10px] uppercase text-primary">
                {t.hero.trending}
              </span>
              <span className="bg-surface-container-high px-3 py-1 font-mono text-[10px] uppercase text-primary">
                {t.hero.new}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
