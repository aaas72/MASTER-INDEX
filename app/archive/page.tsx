"use client";

import { useState, useMemo } from "react";
import { ArchiveSidebar } from "@/components/archive";
import { SidebarLayout, BrutalistTable, type TableColumn, ScientificRenderer } from "@/components/shared";
import { archive as t } from "@/locales/en/archive";
import algorithmsData from "@/data/algorithms.json";
import { Algorithm } from "@/types/algorithm";
import Link from "next/link";

const typedAlgorithmsData = algorithmsData as unknown as Record<string, Algorithm>;

type ArchiveAlgo = {
  id: string;
  name: string;
  cat: string;
  avg: string;
  worst: string;
  space: string;
  tags: string[];
};

export default function ArchivePage() {
  const [selectedComplexities, setSelectedComplexities] = useState<string[]>([]);
  const [selectedTaxonomies, setSelectedTaxonomies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Transform real data using correct DNA schema
  const allAlgorithms = useMemo(() => {
    return Object.entries(typedAlgorithmsData).map(([id, algo]) => ({
      id,
      name: algo.metadata.title,
      cat: algo.metadata.category,
      avg: algo.complexity.time.average,
      worst: algo.complexity.time.worst,
      space: algo.complexity.space.average,
      tags: algo.metadata.tags,
    }));
  }, []);

  // Dynamically extract unique options from data
  const filterOptions = useMemo(() => {
    const complexities = Array.from(new Set(allAlgorithms.map(a => a.avg))).sort();
    const taxonomies = Array.from(new Set(allAlgorithms.map(a => a.cat))).sort();
    const tags = Array.from(new Set(allAlgorithms.flatMap(a => a.tags))).sort();
    return { complexities, taxonomies, tags };
  }, [allAlgorithms]);

  // Instant Filter logic
  const filteredAlgorithms = useMemo(() => {
    return allAlgorithms.filter(algo => {
      const matchesComplexity = selectedComplexities.length === 0 || selectedComplexities.includes(algo.avg);
      const matchesTaxonomy = selectedTaxonomies.length === 0 || selectedTaxonomies.includes(algo.cat);
      const matchesTags = selectedTags.length === 0 || selectedTags.every(t => algo.tags.includes(t));
      return matchesComplexity && matchesTaxonomy && matchesTags;
    });
  }, [allAlgorithms, selectedComplexities, selectedTaxonomies, selectedTags]);

  const toggleFilter = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter(i => i !== val) : [...list, val]);
  };

  const handleClear = () => {
    setSelectedComplexities([]);
    setSelectedTaxonomies([]);
    setSelectedTags([]);
  };

  const columns: TableColumn<ArchiveAlgo>[] = [
    { 
      header: t.table.nomenclature, 
      key: "name",
      render: (item) => (
        <Link 
          href={`/algorithms/${item.id}`}
          className="font-sans text-sm font-bold text-black transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
      )
    },
    { 
      header: t.table.taxonomy, 
      key: "cat",
      render: (item) => (
        <span className="bg-primary-fixed px-2 py-1 font-mono text-[10px] font-bold text-[#001355] uppercase">
          {item.cat}
        </span>
      )
    },
    { 
      header: t.table.avg_time, 
      key: "avg", 
      render: (item) => (
        <div className="font-mono text-xs text-on-surface">
          <ScientificRenderer content={item.avg} />
        </div>
      )
    },
    { 
        header: "SPACE", 
        key: "space", 
        render: (item) => (
          <div className="font-mono text-xs text-on-surface">
            <ScientificRenderer content={item.space} />
          </div>
        )
      },
    { 
      header: t.table.status, 
      key: "status", 
      align: "right",
      render: () => (
        <span className="font-mono text-[10px] font-bold text-primary/40 uppercase">
          {t.status_verified}
        </span>
      )
    }
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col lg:flex-row gap-0">
        <main className="flex-1 min-w-0 pr-12">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-outline-variant/10">
            <div>
              <h1 className="font-sans text-3xl font-black text-black uppercase tracking-tight mb-2">
                {t.index_title}
              </h1>
              <p className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                {t.results_found.replace('{count}', filteredAlgorithms.length.toString())}
              </p>
            </div>
          </div>

          <BrutalistTable 
            columns={columns}
            data={filteredAlgorithms}
            className="border-none bg-transparent"
          />
        </main>

        <aside className="hidden lg:block w-80 shrink-0 border-l border-outline-variant/10 pl-10 no-export">
            <ArchiveSidebar 
            complexityOptions={filterOptions.complexities}
            taxonomyOptions={filterOptions.taxonomies}
            tagOptions={filterOptions.tags}
            selectedComplexities={selectedComplexities}
            selectedTaxonomies={selectedTaxonomies}
            selectedTags={selectedTags}
            onToggleComplexity={(v) => toggleFilter(selectedComplexities, setSelectedComplexities, v)}
            onToggleTaxonomy={(v) => toggleFilter(selectedTaxonomies, setSelectedTaxonomies, v)}
            onToggleTag={(v) => toggleFilter(selectedTags, setSelectedTags, v)}
            onApply={handleClear}
            isFiltered={(selectedComplexities.length > 0 || selectedTaxonomies.length > 0 || selectedTags.length > 0)}
            />
        </aside>
      </div>
    </SidebarLayout>
  );
}