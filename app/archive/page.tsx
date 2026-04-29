// app/archive/page.tsx
import { ArchiveSidebar } from "@/components/archive";
import { SidebarLayout } from "@/components/shared";

const algorithms = [
  { name: "Dijkstra's Algorithm", cat: "Graph Theory", avg: "O(E + V log V)", worst: "O(V²)", space: "O(V)" },
  { name: "A* Search Algorithm", cat: "Pathfinding", avg: "O(E)", worst: "O(b^d)", space: "O(b^d)" },
  // ... rest of data
];

export default function ArchivePage() {
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

          <section className="border border-outline-variant/10 bg-surface-container-lowest overflow-hidden">
            <div className="flex items-center justify-between border-b border-outline-variant/20 p-6">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-outline">ARCHIVAL_INDEX // 72 Entries</h2>
              <span className="font-mono text-[10px] text-outline">FILTERED: CROSS_REFERENCE</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-outline-variant/30 bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-4 font-sans text-xs font-bold uppercase">Nomenclature</th>
                    <th className="px-6 py-4 font-mono text-[10px] uppercase text-outline">Taxonomy</th>
                    <th className="px-6 py-4 font-mono text-[10px] uppercase text-outline text-right">Avg Time</th>
                    <th className="px-6 py-4 font-mono text-[10px] uppercase text-outline text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {algorithms.map((algo, i) => (
                    <tr key={i} className="group transition-colors hover:bg-surface-container-low">
                      <td className="px-6 py-5 font-sans text-sm font-bold text-black transition-colors group-hover:text-primary-container">
                        {algo.name}
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-primary-fixed px-2 py-1 font-mono text-[10px] font-bold text-[#001355] uppercase">
                          {algo.cat}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-mono text-[10px] font-bold text-on-surface">
                        {algo.avg}
                      </td>
                      <td className="px-6 py-5 text-right font-mono text-[10px] font-bold text-primary-container">
                        VERIFIED
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <ArchiveSidebar />
      </div>
    </SidebarLayout>
  );
}