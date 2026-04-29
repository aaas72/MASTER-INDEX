"use client";

import { SidebarLayout } from "@/components/shared";
import Link from "next/link";
import { useState } from "react";
import algorithmsData from "@/data/algorithms.json";

export default function CategoriesPage() {
  const [sortBy, setSortBy] = useState<"Alpha" | "Pop" | "Cmplx">("Alpha");
  
  const algorithms = Object.values(algorithmsData);
  const categoriesMap = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = { count: 0, algorithms: [] };
    }
    acc[algo.category].count++;
    acc[algo.category].algorithms.push(algo);
    return acc;
  }, {} as Record<string, { count: number; algorithms: any[] }>);

  let categories = Object.entries(categoriesMap).map(([name, data]) => {
    const slug = name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    return { name, slug, count: data.count, algorithms: data.algorithms };
  });

  // Apply Sorting Logic
  if (sortBy === "Alpha") {
    categories.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Pop") {
    categories.sort((a, b) => b.count - a.count);
  } else if (sortBy === "Cmplx") {
    // Sort by approximate complexity weight
    const weightMap: Record<string, number> = { "Sorting": 3, "Searching": 1, "Graph": 5, "DP": 10 };
    categories.sort((a, b) => (weightMap[b.name] || 0) - (weightMap[a.name] || 0));
  }

  return (
    <SidebarLayout>
      <div className="pt-8 w-full flex flex-col gap-10">
        <section className="flex flex-col gap-6 w-full mt-2">
          <div className="w-full border-b border-outline-variant/20 pb-8 flex flex-col gap-8">
            <div className="w-full">
              <span className="page-kicker">
                TAXONOMIC CLASSIFICATION
              </span>
              <h1 className="page-title uppercase block">
                Browse by Paradigm
              </h1>
            </div>
            
            <div className="w-full">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">
                  Sort By:
                </span>
                <div className="flex bg-surface-container-low border border-outline-variant/20 p-1">
                  <button 
                    onClick={() => setSortBy("Alpha")}
                    className={`px-4 py-1.5 font-mono text-xs tracking-wider border transition-all ${sortBy === "Alpha" ? "bg-surface-container-lowest text-primary border-outline-variant/20" : "text-on-surface-variant border-transparent hover:bg-surface-container-lowest/50"}`}
                  >
                    Alpha
                  </button>
                  <button 
                    onClick={() => setSortBy("Pop")}
                    className={`px-4 py-1.5 font-mono text-xs tracking-wider border transition-all ${sortBy === "Pop" ? "bg-surface-container-lowest text-primary border-outline-variant/20" : "text-on-surface-variant border-transparent hover:bg-surface-container-lowest/50"}`}
                  >
                    Pop
                  </button>
                  <button 
                    onClick={() => setSortBy("Cmplx")}
                    className={`px-4 py-1.5 font-mono text-xs tracking-wider border transition-all ${sortBy === "Cmplx" ? "bg-surface-container-lowest text-primary border-outline-variant/20" : "text-on-surface-variant border-transparent hover:bg-surface-container-lowest/50"}`}
                  >
                    Cmplx
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {categories.map((cat, idx) => (
            <Link
              key={cat.slug}
              className="group flex flex-col h-80 bg-surface-container-lowest border border-outline-variant/20 hover:bg-primary-container transition-colors duration-300 relative overflow-hidden"
              href={`/categories/${cat.slug}`}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary group-hover:bg-white transition-colors duration-300"></div>
              <div className="flex justify-between p-4 border-b border-outline-variant/20 group-hover:border-white/20 transition-colors duration-300">
                <span className="font-mono text-xs text-on-surface-variant group-hover:text-white/70">
                  CAT_0{idx + 1}
                </span>
                <span className="material-symbols-outlined text-primary group-hover:text-white text-sm">
                  arrow_outward
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
                <div className="w-16 h-16 border-2 border-primary group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors duration-300">
                    category
                  </span>
                </div>
                <h3 className="font-sans font-bold text-xl text-center text-black group-hover:text-white uppercase tracking-tight">
                  {cat.name}
                </h3>
              </div>
              <div className="p-4 bg-surface-container-low group-hover:bg-primary/50 transition-colors duration-300 flex flex-col gap-1 border-t border-outline-variant/20 group-hover:border-white/20">
                <span className="font-mono text-[10px] text-on-surface-variant group-hover:text-white/70 uppercase tracking-widest">
                  [Count: {cat.count.toString().padStart(2, '0')} Algorithms]
                </span>
                <span className="font-mono text-[10px] text-primary group-hover:text-white/90 uppercase tracking-widest">
                  [System Indexed]
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </SidebarLayout>
  );
}