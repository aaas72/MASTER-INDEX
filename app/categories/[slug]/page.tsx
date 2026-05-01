"use client";

import { SidebarLayout, BrutalistTable, type TableColumn } from "@/components/shared";
import algorithmsData from "@/data/algorithms.json";
import { categories as t } from "@/locales/en/categories";

type Algorithm = {
  id: string;
  title: { en: string; ar: string };
  category: string;
  complexity: {
    time: string;
    space: string;
  };
  status?: string;
};

type CategoryMetadata = {
  label: string;
  description: string;
  totalAlgorithms: string;
  primaryComplexity: string;
  accentClass: string;
};

const categoryMetadata: Record<string, CategoryMetadata> = {
  "graph-theory": {
    label: t.meta.graph.label,
    description: t.meta.graph.desc,
    totalAlgorithms: "14",
    primaryComplexity: "O(V + E)",
    accentClass: "bg-primary-container",
  },
  "sorting-search": {
    label: t.meta.sorting.label,
    description: t.meta.sorting.desc,
    totalAlgorithms: "22",
    primaryComplexity: "O(N log N)",
    accentClass: "bg-primary",
  },
  "dynamic-programming": {
    label: t.meta.dynamic.label,
    description: t.meta.dynamic.desc,
    totalAlgorithms: "31",
    primaryComplexity: "O(N^2)",
    accentClass: "bg-secondary",
  },
  "computational-geometry": {
    label: t.meta.geometry.label,
    description: t.meta.geometry.desc,
    totalAlgorithms: "8",
    primaryComplexity: "O(N log N)",
    accentClass: "bg-tertiary-container",
  },
};

const formatCategoryTitle = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const metadata = categoryMetadata[params.slug] ?? {
    label: formatCategoryTitle(params.slug),
    description: t.meta.fallback_desc,
    totalAlgorithms: "--",
    primaryComplexity: "--",
    accentClass: "bg-primary-container",
  };

  const filteredAlgorithms = Object.entries(algorithmsData)
    .map(([id, data]) => ({ id, ...data } as Algorithm))
    .filter(
      (algo) => algo.category.toLowerCase().replace(/ /g, "-") === params.slug
    );

  const columns: TableColumn<Algorithm>[] = [
    {
      header: t.table.id,
      key: "id",
      render: (algo) => <span className="font-mono text-xs text-outline">{(algo.id || "ID_N/A").substring(0, 6).toUpperCase()}</span>,
    },
    {
      header: t.table.name,
      key: "title",
      render: (algo) => (
        <a href={`/algorithms/${algo.id}`} className="font-sans text-sm font-bold text-black hover:text-primary-container hover:underline transition-colors">
          {algo.title.en}
        </a>
      ),
    },
    {
      header: t.table.complexity,
      key: "time",
      align: "right",
      render: (algo) => (
        <span className="bg-primary-fixed px-2 py-1 font-mono text-[10px] font-bold text-[#001355]">
          {algo.complexity.time}
        </span>
      ),
    },
    {
      header: t.table.status,
      key: "status",
      align: "right",
      render: (algo) => (
        <span className="font-mono text-[10px] font-bold text-primary-container uppercase">
          {algo.status || "STABLE"}
        </span>
      ),
    },
  ];

  return (
    <SidebarLayout>
      <div className="pt-4">
        {/* Page Header */}
        <header className="mb-16">
          <span className="page-kicker block mb-2">{t.index_kicker}</span>
          <h1 className="page-title mb-4 uppercase">
            {metadata.label}_
          </h1>
          <div className={`h-1 w-24 ${metadata.accentClass}`}></div>
          <p className="body-copy mt-8 max-w-2xl italic">
            {metadata.description}
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8">
            <BrutalistTable 
              title={t.ledger_title} 
              subtitle={t.ledger_subtitle}
              columns={columns}
              data={filteredAlgorithms}
            />
          </div>

          {/* Right Sidebar Stats */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 shadow-sm">
              <h3 className="font-mono font-bold text-xs tracking-widest uppercase mb-8 border-b-2 border-primary-container pb-2 inline-block">
                {t.snapshot_title}
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-mono text-[10px] text-outline uppercase tracking-wider mb-1">
                      {t.total_label}
                    </p>
                    <p className="font-sans text-3xl font-black text-on-surface">
                      {filteredAlgorithms.length || metadata.totalAlgorithms}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 space-y-10">
                <section>
                  <h4 className="font-mono text-[10px] font-bold tracking-[0.22em] text-outline uppercase mb-4">
                    {t.most_accessed}
                  </h4>
                  <div className="bg-surface-container p-6 border border-outline-variant/15">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-sans text-lg leading-snug font-black text-on-surface break-words max-w-[14rem]">
                          A* Pathfinding
                        </p>
                        <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-on-surface-variant">
                          {t.queries_label}: 12.4k
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-primary-container text-xl">
                        call_made
                      </span>
                    </div>
                    <div className="mt-6 border-t border-outline-variant/15 pt-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {t.complexity_label}: {metadata.primaryComplexity}
                    </div>
                  </div>
                </section>
              </div>
              <button className="w-full mt-10 border-2 border-primary-container text-primary-container py-3 font-mono text-[11px] font-bold hover:bg-primary-container hover:text-white transition-all">
                {t.generate_report}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </SidebarLayout>
  );
}