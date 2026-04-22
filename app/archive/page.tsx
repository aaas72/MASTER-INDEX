// app/archive/page.tsx
import ArchiveSidebar from "@/components/ArchiveSidebar";
import Sidebar from "@/components/Sidebar";

const algorithms = [
  { name: "Dijkstra's Algorithm", cat: "Graph Theory", avg: "O(E + V log V)", worst: "O(V²)", space: "O(V)" },
  { name: "A* Search Algorithm", cat: "Pathfinding", avg: "O(E)", worst: "O(b^d)", space: "O(b^d)" },
  // ... بقية البيانات
];

export default function ArchivePage() {
  return (
    <>
      <Sidebar />
      <div className="flex h-screen w-full overflow-hidden font-headline bg-surface pl-60">
        <main className="flex-1 flex flex-col min-w-0 bg-transparent overflow-y-auto">
        {/* Content Area */}
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-outline-variant/20">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Found 72 Algorithms</h1>
              <p className="font-body text-on-surface-variant">Displaying cross-referenced results.</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/50">
                <th className="py-4 px-4 font-label text-xs uppercase text-on-surface-variant">Nomenclature</th>
                <th className="py-4 px-4 font-label text-xs uppercase text-on-surface-variant">Taxonomy</th>
                <th className="py-4 px-4 font-label text-xs uppercase text-on-surface-variant text-right">Avg Time</th>
                <th className="py-4 px-4 font-label text-xs uppercase text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {algorithms.map((algo, i) => (
                <tr key={i} className="hover:bg-surface transition-colors group">
                  <td className="py-5 px-4 font-body text-lg font-medium">{algo.name}</td>
                  <td className="py-5 px-4">
                    <span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-label px-2 py-1 uppercase">{algo.cat}</span>
                  </td>
                  <td className="py-5 px-4 text-right font-label text-sm">{algo.avg}</td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="material-symbols-outlined text-outline hover:text-primary">code</button>
                      <button className="material-symbols-outlined text-outline hover:text-primary">play_arrow</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <ArchiveSidebar />
    </div>
    </>
  );
}