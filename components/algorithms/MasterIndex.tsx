import Link from "next/link";

export default function MasterIndex() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-[1280px] px-12">
        <div className="mb-12 flex items-end justify-between">
          <div className="max-w-xl">
            <h3 className="mb-2 font-sans text-2xl font-bold uppercase tracking-tight text-black">
              Master Index
            </h3>
            <p className="font-body text-lg text-on-surface-variant">
              A comprehensive ledger of computational procedures, categorized by operational intent and architectural lineage.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="border border-outline-variant p-2 transition-colors hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">filter_list</span>
            </button>
            <button className="border border-outline-variant p-2 transition-colors hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">download</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-left">
                <th className="border-none px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Algorithm Name
                </th>
                <th className="border-none px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Category
                </th>
                <th className="border-none px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Time Complexity
                </th>
                <th className="border-none px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Space Complexity
                </th>
                <th className="border-none px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Status
                </th>
                <th className="border-none px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Ref
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              <tr className="group border-b border-surface-container-low transition-colors hover:bg-surface-container-lowest">
                <td className="px-6 py-8">
                  <span className="block font-sans text-lg font-bold text-black">
                    A* Search
                  </span>
                  <span className="font-mono text-[10px] uppercase text-slate-400">
                    Pathfinding • Heuristic
                  </span>
                </td>
                <td className="px-6 py-8">
                  <span className="bg-primary-fixed px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
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
                    <div className="h-2 w-2 bg-green-500"></div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter">
                      Code Ready
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <span className="material-symbols-outlined cursor-pointer text-slate-300 group-hover:text-[#002FA7]">
                    arrow_outward
                  </span>
                </td>
              </tr>
              <tr className="group border-b border-surface-container-low transition-colors hover:bg-surface-container-lowest">
                <td className="px-6 py-8">
                  <span className="block font-sans text-lg font-bold text-black">
                    QuickSort (Dual-Pivot)
                  </span>
                  <span className="font-mono text-[10px] uppercase text-slate-400">
                    Divide &amp; Conquer • Sorting
                  </span>
                </td>
                <td className="px-6 py-8">
                  <span className="bg-surface-container-high px-3 py-1 font-mono text-[10px] font-bold uppercase text-slate-600">
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
                    <div className="h-2 w-2 bg-purple-500"></div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter">
                      Simulation
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <Link href="/algorithms/quick-sort">
                    <span className="material-symbols-outlined cursor-pointer text-slate-300 group-hover:text-[#002FA7]">
                      arrow_outward
                    </span>
                  </Link>
                </td>
              </tr>
              <tr className="group border-b border-surface-container-low transition-colors hover:bg-surface-container-lowest">
                <td className="px-6 py-8">
                  <span className="block font-sans text-lg font-bold text-black">
                    Bellman-Ford
                  </span>
                  <span className="font-mono text-[10px] uppercase text-slate-400">
                    Dynamic Programming • Optimization
                  </span>
                </td>
                <td className="px-6 py-8">
                  <span className="bg-primary-fixed px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
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
                    <div className="h-2 w-2 bg-[#002FA7]"></div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter">
                      Researching
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <span className="material-symbols-outlined cursor-pointer text-slate-300 group-hover:text-[#002FA7]">
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
