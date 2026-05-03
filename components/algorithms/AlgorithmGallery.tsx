"use client";

import React, { useMemo, useState } from "react";
import algorithmsData from "@/data/algorithms.json";
import { Algorithm } from "@/types/algorithm";
import { AlgorithmCard } from "./index";
import { UnifiedFilterBar } from "@/components/shared";
import { getCategoryIcon } from "@/lib/algorithm-utils";
import { home as t } from "@/locales/en/home";

const typedAlgorithmsData = algorithmsData as unknown as Record<string, Algorithm>;

export default function AlgorithmGallery() {
  const [selectedCat, setSelectedCat] = useState("ALL_CATEGORIES");

  // Transform real data
  const allAlgorithms = useMemo(() => {
    return Object.entries(typedAlgorithmsData).map(([id, algo]) => ({
      id,
      name: algo.metadata.title.en,
      cat: algo.metadata.category,
      avg: algo.complexity.time.average.label,
      tags: algo.metadata.tags,
      subtitle: algo.metadata.subtitle.en,
    }));
  }, []);

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const cats = Array.from(new Set(allAlgorithms.map(a => a.cat))).sort();
    return { cats };
  }, [allAlgorithms]);

  // Filtering Logic
  const filteredAlgorithms = useMemo(() => {
    return allAlgorithms.filter(algo => {
      const matchesCat = selectedCat === "ALL_CATEGORIES" || algo.cat === selectedCat;
      return matchesCat;
    });
  }, [allAlgorithms, selectedCat]);

  // Map categories to icons for the UnifiedFilterBar
  const categoryOptions = useMemo(() => {
    return [
      { id: "ALL_CATEGORIES", label: "All Algorithms", icon: "grid_view" },
      ...filterOptions.cats.map(cat => ({
        id: cat,
        label: cat,
        icon: getCategoryIcon(cat)
      }))
    ];
  }, [filterOptions.cats]);

  return (
    <section className="py-12">
      <div className="mb-12 border-b border-outline-variant/20 pb-10">
        <div className="mb-10">
          <h1 className="page-title-sm mb-3">{t.master_index.title}</h1>
          <p className="body-copy max-w-2xl">{t.master_index.description}</p>
        </div>

        {/* Global Filter Bar Layout */}
        <div className="space-y-6">
          {/* Top Row: Global Taxonomy Filter */}
          <UnifiedFilterBar 
            options={categoryOptions}
            activeId={selectedCat}
            onChange={setSelectedCat}
          />
        </div>

        <div className="mt-6 flex justify-between items-center px-1">
          <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredAlgorithms.length} of {allAlgorithms.length} system nodes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredAlgorithms.map((algo) => (
          <AlgorithmCard key={algo.id} algo={algo} />
        ))}
      </div>
    </section>
  );
}
