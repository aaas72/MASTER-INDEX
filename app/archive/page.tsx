"use client";

import { ArchiveSidebar } from "@/components/archive";
import { SidebarLayout, BrutalistTable, type TableColumn } from "@/components/shared";
import { archive as t } from "@/locales/en/archive";

type ArchiveAlgo = {
  name: string;
  cat: string;
  avg: string;
  worst: string;
  space: string;
};

const algorithms: ArchiveAlgo[] = [
  { name: "Dijkstra's Algorithm", cat: "Graph Theory", avg: "O(E + V log V)", worst: "O(V²)", space: "O(V)" },
  { name: "A* Search Algorithm", cat: "Pathfinding", avg: "O(E)", worst: "O(b^d)", space: "O(b^d)" },
];

export default function ArchivePage() {
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
              <h1 className="page-title-sm">{t.results_found.replace('{count}', '72')}</h1>
              <p className="body-copy">{t.displaying_results}</p>
            </div>
          </div>

          <BrutalistTable 
            title={t.index_title} 
            subtitle={t.index_subtitle}
            columns={columns}
            data={algorithms}
          />
        </main>
        <ArchiveSidebar />
      </div>
    </SidebarLayout>
  );
}