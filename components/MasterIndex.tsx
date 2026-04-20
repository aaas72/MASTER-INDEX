import Link from "next/link";

export default function MasterIndex() {
  return (
    <section className="py-12">
      <div className="max-w-[1280px] w-full mx-auto px-12">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-black mb-2">
              Master Index
            </h3>
            <p className="text-on-surface-variant font-body text-lg">
              A comprehensive ledger of computational procedures, categorized by
              operational intent and architectural lineage.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span>
            </button>
            <button className="p-2 border border-outline-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-surface-container-low">
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-none">
                  Algorithm Name
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-none">
                  Category
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-none">
                  Time Complexity
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-none">
                  Space Complexity
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-none">
                  Status
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-none">
                  Ref
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {/* Row 1 */}
              <tr className="group hover:bg-surface-container-lowest transition-colors border-b border-surface-container-low">
                <td className="px-6 py-8">
                  <span className="font-sans font-bold text-lg text-black block">
                    A* Search
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    Pathfinding • Heuristic
                  </span>
                </td>
                <td className="px-6 py-8">
                  <span className="px-3 py-1 bg-primary-fixed text-primary text-[10px] font-mono font-bold uppercase">
                    Graph Theory
                  </span>
                </td>
                <td className="px-6 py-8">
                  <code className="font-mono text-sm font-bold text-[#002FA7]">
                    O(E log V)
                  </code>
                </td>
                <td className="px-6 py-8">
                  <code className="font-mono text-sm text-slate-600">O(V)</code>
                </td>
                <td className="px-6 py-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500"></div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter">
                      Code Ready
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#002FA7] cursor-pointer">
                    arrow_outward
                  </span>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-surface-container-lowest transition-colors border-b border-surface-container-low">
                <td className="px-6 py-8">
                  <span className="font-sans font-bold text-lg text-black block">
                    QuickSort (Dual-Pivot)
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    Divide &amp; Conquer • Sorting
                  </span>
                </td>
                <td className="px-6 py-8">
                  <span className="px-3 py-1 bg-surface-container-high text-slate-600 text-[10px] font-mono font-bold uppercase">
                    Base Sorts
                  </span>
                </td>
                <td className="px-6 py-8">
                  <code className="font-mono text-sm font-bold text-[#002FA7]">
                    O(n log n)
                  </code>
                </td>
                <td className="px-6 py-8">
                  <code className="font-mono text-sm text-slate-600">O(log n)</code>
                </td>
                <td className="px-6 py-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500"></div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter">
                      Simulation
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <Link href="/algorithm/quick-sort">
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-[#002FA7] cursor-pointer">
                      arrow_outward
                    </span>
                  </Link>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="group hover:bg-surface-container-lowest transition-colors border-b border-surface-container-low">
                <td className="px-6 py-8">
                  <span className="font-sans font-bold text-lg text-black block">
                    Bellman-Ford
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    Dynamic Programming • Optimization
                  </span>
                </td>
                <td className="px-6 py-8">
                  <span className="px-3 py-1 bg-primary-fixed text-primary text-[10px] font-mono font-bold uppercase">
                    Graph Theory
                  </span>
                </td>
                <td className="px-6 py-8">
                  <code className="font-mono text-sm font-bold text-[#002FA7]">
                    O(VE)
                  </code>
                </td>
                <td className="px-6 py-8">
                  <code className="font-mono text-sm text-slate-600">O(V)</code>
                </td>
                <td className="px-6 py-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#002FA7]"></div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter">
                      Researching
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#002FA7] cursor-pointer">
                    arrow_outward
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
