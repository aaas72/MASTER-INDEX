"use client";

// app/archive/page.tsx
import { ArchiveSidebar } from "@/components/archive";
import { SidebarLayout, BrutalistTable, type TableColumn } from "@/components/shared";

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
  // ... more data could be added here
];

export default function ArchivePage() {
  const columns: TableColumn<ArchiveAlgo>[] = [
    { 
      header: "Nomenclature", 
      key: "name",
      render: (item) => (
        <span className="font-sans text-sm font-bold text-black transition-colors group-hover:text-primary-container">
          {item.name}
        </span>
      )
    },
    { 
      header: "Taxonomy", 
      key: "cat",
      render: (item) => (
        <span className="bg-primary-fixed px-2 py-1 font-mono text-[10px] font-bold text-[#001355] uppercase">
          {item.cat}
        </span>
      )
    },
    { 
      header: "Avg Time", 
      key: "avg", 
      align: "right",
      render: (item) => (
        <span className="font-mono text-[10px] font-bold text-on-surface">
          {item.avg}
        </span>
      )
    },
    { 
      header: "Status", 
      key: "status", 
      align: "right",
      render: () => (
        <span className="font-mono text-[10px] font-bold text-primary-container uppercase">
          VERIFIED
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
              <h1 className="page-title-sm">Found 72 Algorithms</h1>
              <p className="body-copy">Displaying cross-referenced results.</p>
            </div>
          </div>

          <BrutalistTable 
            title="ARCHIVAL_INDEX" 
            subtitle="FILTERED: CROSS_REFERENCE"
            columns={columns}
            data={algorithms}
          />
        </main>
        <ArchiveSidebar />
      </div>
    </SidebarLayout>
  );
}