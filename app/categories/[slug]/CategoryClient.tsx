"use client";

import { SidebarLayout, BrutalistTable, type TableColumn } from "@/components/shared";
import Link from "next/link";
import algorithmsData from "@/data/algorithms.json";
import { Algorithm } from "@/types/algorithm";
import { InlineMath } from "react-katex";

type CategoryMetadata = {
  label: string;
  description: string;
  totalAlgorithms: string;
  primaryComplexity: string;
  accentClass: string;
};

const categoryMetadata: Record<string, CategoryMetadata> = {
  "pathfinding-networks": {
    label: "Pathfinding & Networks",
    description: "Algorithms for traversing nodes and finding optimal routes in weighted or unweighted graphs.",
    totalAlgorithms: "14",
    primaryComplexity: "O(V + E)",
    accentClass: "bg-primary-container",
  },
  "searching": {
    label: "Searching",
    description: "Techniques for locating specific data elements within various structures, from arrays to trees.",
    totalAlgorithms: "22",
    primaryComplexity: "O(log N)",
    accentClass: "bg-primary",
  },
  "sorting": {
    label: "Sorting",
    description: "Efficient methods for organizing data into specific orders, essential for optimization and search.",
    totalAlgorithms: "15",
    primaryComplexity: "O(N log N)",
    accentClass: "bg-primary",
  },
  "trees-hierarchies": {
    label: "Trees & Hierarchies",
    description: "Hierarchical data structures and traversal techniques.",
    totalAlgorithms: "12",
    primaryComplexity: "O(log N)",
    accentClass: "bg-tertiary-container",
  },
  "dynamic-programming": {
    label: "Dynamic Programming",
    description: "Optimization techniques that solve complex problems by breaking them down into overlapping subproblems.",
    totalAlgorithms: "31",
    primaryComplexity: "O(N^2)",
    accentClass: "bg-secondary",
  },
};

const formatCategoryTitle = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function CategoryClient({ slug }: { slug: string }) {
  const metadata = categoryMetadata[slug] ?? {
    label: formatCategoryTitle(slug),
    description: "Advanced computational logic indexed within the Hub ecosystem.",
    totalAlgorithms: "--",
    primaryComplexity: "--",
    accentClass: "bg-primary-container",
  };

  const filteredAlgorithms = Object.values(algorithmsData)
    .map((data) => (data as unknown as Algorithm))
    .filter(
      (algo) => {
        const algoCategorySlug = algo.metadata.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, "-");
        return algoCategorySlug === slug || 
                (slug === "sorting-search" && (algo.metadata.category === "Sorting" || algo.metadata.category === "Searching")) ||
                (slug === "graph-theory" && algo.metadata.category === "Pathfinding & Networks") ||
                (slug === "trees-hierarchies" && algo.metadata.category === "Trees & Hierarchies")
      }
    );

  const columns: TableColumn<Algorithm>[] = [
    {
      header: "ID",
      key: "id",
      render: (algo) => <span className="font-mono text-xs text-outline">{(algo.id || "ID_N/A").substring(0, 6).toUpperCase()}</span>,
    },
    {
      header: "Algorithm Name",
      key: "title",
      render: (algo) => (
        <a href={`/algorithms/${algo.id}`} className="font-sans text-sm font-bold text-black hover:text-primary-container hover:underline transition-colors">
          {algo.metadata.title}
        </a>
      ),
    },
    {
      header: "Complexity",
      key: "time",
      align: "right",
      render: (algo) => (
        <span className="bg-primary-fixed px-2 py-1 font-mono text-[10px] font-bold text-[#001355]">
          <InlineMath math={algo.complexity.time.average} />
        </span>
      ),
    },
    {
      header: "Status",
      key: "stability",
      align: "right",
      render: (algo) => (
        <span className="font-mono text-[10px] font-bold text-primary-container uppercase">
          {algo.metadata.stability || "STABLE"}
        </span>
      ),
    },
  ];

  return (
    <SidebarLayout>
      <div className="pt-4">
      {/* Simplified Header: Matching Archive style */}
      <header className="mb-12 border-b border-outline-variant/10 pb-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-6">
          <Link className="transition-colors hover:text-primary" href="/">INDEX</Link>
          <span className="opacity-20">/</span>
          <Link className="transition-colors hover:text-primary" href="/categories">CATEGORIES</Link>
          <span className="opacity-20">/</span>
          <span className="text-primary font-bold uppercase">{metadata.label}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-sans text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none">
            {metadata.label}_
          </h1>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              SYSTEM_CLASSIFICATION // TOTAL {filteredAlgorithms.length} ALGORITHMS
            </p>
            <span className="w-1 h-1 bg-outline-variant rounded-full" />
            <p className="font-serif text-sm text-on-surface-variant italic">
              {metadata.description}
            </p>
          </div>
        </div>
      </header>

        {/* Official Zero-Gap Layout */}
        <div className="flex flex-col lg:flex-row gap-0">
          <main className="flex-1 min-w-0 pr-12">
            <BrutalistTable 
              columns={columns}
              data={filteredAlgorithms}
              className="border-none bg-transparent"
            />
          </main>

          {/* Right Sidebar Stats */}
          <aside className="hidden lg:block w-80 shrink-0 border-l border-outline-variant/10 pl-10 no-export">
            <div className="sticky top-10 space-y-8">
              <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 shadow-sm">
                <h3 className="font-mono font-bold text-xs tracking-widest uppercase mb-8 border-b-2 border-primary-container pb-2 inline-block">
                  Paradigm Snapshot
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-[10px] text-outline uppercase tracking-wider mb-1">
                      Total Indexed
                    </p>
                    <p className="font-sans text-3xl font-black text-on-surface">
                      {filteredAlgorithms.length}
                    </p>
                  </div>
                </div>
                <div className="mt-10 space-y-10">
                  {filteredAlgorithms.length > 0 && (
                    <section>
                      <h4 className="font-mono text-[10px] font-bold tracking-[0.22em] text-outline uppercase mb-4">
                        Primary Entry
                      </h4>
                      <div className="bg-surface-container p-6 border border-outline-variant/15">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-sans text-lg leading-snug font-black text-on-surface truncate">
                              {filteredAlgorithms[0].metadata.title}
                            </p>
                            <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-on-surface-variant">
                              System Hash: {filteredAlgorithms[0].id?.replace('-', '_').toUpperCase()}
                            </p>
                          </div>
                          <Link href={`/algorithms/${filteredAlgorithms[0].id}`} className="shrink-0">
                            <span className="material-symbols-outlined text-primary-container text-xl hover:translate-x-1 hover:-translate-y-1 transition-transform">
                              call_made
                            </span>
                          </Link>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
                <Link 
                  href={`/versus`}
                  className="w-full mt-10 border-2 border-primary-container text-primary-container py-3 font-mono text-[11px] font-bold hover:bg-primary-container hover:text-white transition-all block text-center uppercase"
                >
                  COMPARE LOGIC →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SidebarLayout>
  );
}
