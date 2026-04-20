"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const streamsRef = useRef<HTMLDivElement[]>([]);

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
                  : char
              )
              .join("");
          }
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-surface-container-lowest py-32 flex flex-col border-b border-surface-container relative overflow-hidden">
      {/* New Prominent Background Animation */}
      <div className="hero-canvas-container">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1000 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="tree-container">
            {/* Level 0: Root */}
            <circle className="tree-node" cx="500" cy="100" fill="#002FA7" r="6" />
            {/* Level 1 */}
            <path className="tree-edge" d="M500,100 L300,200" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M500,100 L700,200" fill="none" stroke="#002FA7" strokeWidth="1" />
            <circle className="tree-node" cx="300" cy="200" fill="#002FA7" r="4" style={{ animationDelay: "-1s" }} />
            <circle className="tree-node" cx="700" cy="200" fill="#002FA7" r="4" style={{ animationDelay: "-1.5s" }} />
            {/* Level 2 */}
            <path className="tree-edge" d="M300,200 L150,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M300,200 L450,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M700,200 L600,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <path className="tree-edge" d="M700,200 L850,350" fill="none" stroke="#002FA7" strokeWidth="1" />
            <circle className="tree-node" cx="150" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-2s" }} />
            <circle className="tree-node" cx="450" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-2.5s" }} />
            <circle className="tree-node" cx="600" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-3s" }} />
            <circle className="tree-node" cx="850" cy="350" fill="#002FA7" r="3" style={{ animationDelay: "-3.5s" }} />
            {/* Level 3: Expanding Leaves */}
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

        {/* Shifting Data Columns */}
        <div
          className="data-stream"
          style={{ top: "10%", left: "5%" }}
          ref={(el) => {
            if (el) streamsRef.current[0] = el;
          }}
        >
          01011001 11001010 01110101
        </div>
        <div
          className="data-stream"
          style={{ top: "15%", right: "10%" }}
          ref={(el) => {
            if (el) streamsRef.current[1] = el;
          }}
        >
          TREE_TRAVERSAL_RUNNING
        </div>
        <div
          className="data-stream"
          style={{ bottom: "20%", left: "8%" }}
          ref={(el) => {
            if (el) streamsRef.current[2] = el;
          }}
        >
          NODE_EXPANSION_STABLE
        </div>
        <div
          className="data-stream"
          style={{ bottom: "10%", right: "15%" }}
          ref={(el) => {
            if (el) streamsRef.current[3] = el;
          }}
        >
          MEMORY_GRAPH_INIT_v4.2
        </div>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-12">
        <div className="max-w-3xl w-full relative z-10 text-left">
          <span className="text-[#002FA7] font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            The Librarian Guide
          </span>
          <h2 className="text-5xl md:text-7xl font-sans font-extrabold text-black tracking-tighter leading-[0.95] mb-12">
            Search the Global Algorithm Repository.
          </h2>
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary-container text-2xl">
                manage_search
              </span>
            </div>
            <input
              className="w-full bg-white/90 backdrop-blur-sm border-none border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 px-16 py-8 text-xl font-body italic placeholder:text-slate-400 shadow-custom transition-all outline-none"
              placeholder="Type an algorithm, complexity, or category..."
              type="text"
            />
            <div className="absolute inset-y-0 right-6 flex items-center space-x-2">
              <kbd className="hidden md:inline-flex items-center px-2 py-1 font-mono text-[10px] text-slate-400 bg-white border border-outline-variant">
                ⌘
              </kbd>
              <kbd className="hidden md:inline-flex items-center px-2 py-1 font-mono text-[10px] text-slate-400 bg-white border border-outline-variant">
                K
              </kbd>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              Showing <span className="text-[#002FA7] font-bold">[72]</span>{" "}
              Algorithms across{" "}
              <span className="text-[#002FA7] font-bold">[8]</span> Categories
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-surface-container-high font-mono text-[10px] text-primary uppercase">
                Trending: Dijkstra
              </span>
              <span className="px-3 py-1 bg-surface-container-high font-mono text-[10px] text-primary uppercase">
                New: Bloom Filters
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
