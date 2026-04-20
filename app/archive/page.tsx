// app/archive/page.tsx
import ArchiveSidebar from "@/components/ArchiveSidebar";

const algorithms = [
  { name: "Dijkstra's Algorithm", cat: "Graph Theory", avg: "O(E + V log V)", worst: "O(V²)", space: "O(V)" },
  { name: "A* Search Algorithm", cat: "Pathfinding", avg: "O(E)", worst: "O(b^d)", space: "O(b^d)" },
  // ... بقية البيانات
];

export default function ArchivePage() {
  return (
    <div className="flex h-screen w-full overflow-hidden font-headline bg-surface">
      <ArchiveSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-outline-variant/10 sticky top-0 z-20">
          <div className="flex items-center gap-8">
            <div className="text-xl font-black tracking-tighter text-black">ALGORITHM ARCHIVE</div>
            <div className="relative w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-outline">search</span>
              <input 
                className="w-full bg-surface-container pl-10 pr-4 py-2 text-sm font-label border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0" 
                placeholder="Query algorithm..." 
              />
            </div>
          </div>
          <nav className="flex gap-6 font-bold text-sm uppercase">
            <a href="#" className="text-on-surface-variant hover:text-primary">Research</a>
            <a href="#" className="text-primary border-b-2 border-primary">Archive</a>
          </nav>
        </header>

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
    </div>
  );
}