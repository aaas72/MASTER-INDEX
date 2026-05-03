"use client";

import { useState, useMemo } from "react";
import { ArchiveSidebar } from "@/components/archive";
import { SidebarLayout, BrutalistTable, type TableColumn } from "@/components/shared";
import { archive as t } from "@/locales/en/archive";
import algorithmsData from "@/data/algorithms.json";
import { Algorithm } from "@/types/algorithm";
import { Search } from "lucide-react";

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

  // Transform real data
  const allAlgorithms = useMemo(() => {
    return Object.entries(typedAlgorithmsData).map(([id, algo]) => ({
      id,
      name: algo.metadata.title.en,
      cat: algo.metadata.category,
      avg: algo.complexity.time.average.label,
      worst: algo.complexity.time.worst.label,
      space: algo.complexity.space.label,
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
        <span className="font-sans text-sm font-bold text-black transition-colors group-hover:text-primary-container">
          {item.name}
        </span>
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
      align: "right",
      render: (item) => (
        <span className="font-mono text-[10px] font-bold text-on-surface">
          {item.avg}
        </span>
      )
    },
    { 
      header: t.table.status, 
      key: "status", 
      align: "right",
      render: () => (
        <span className="font-mono text-[10px] font-bold text-primary-container uppercase">
          {t.status_verified}
        </span>
      )
    }
  ];

  return (
    <SidebarLayout>
      <div className="flex gap-12">
        <main className="flex-1 min-w-0">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-outline-variant/20">
            <div>
              <h1 className="page-title-sm">
                {t.results_found.replace('{count}', filteredAlgorithms.length.toString())}
              </h1>
              <p className="body-copy">{t.displaying_results}</p>
            </div>
          </div>

          <BrutalistTable 
            title={t.index_title} 
            subtitle={t.index_subtitle}
            columns={columns}
            data={filteredAlgorithms}
          />
        </main>
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
      </div>
    </SidebarLayout>
  );
}