export default function VersusHub() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-[1280px] w-full mx-auto px-12">
        <div className="mb-16 text-left border-l-4 border-[#002FA7] pl-8">
          <h3 className="font-sans font-extrabold text-4xl uppercase tracking-tighter text-black mb-2">
            Versus Hub
          </h3>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            Head-to-head performance benchmarks in varied theoretical constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Dual Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-1 flex flex-col shadow-custom">
            <div className="flex h-64">
              <div className="w-1/2 p-8 border-r border-outline-variant flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase block mb-2">
                    Challenger A
                  </span>
                  <h4 className="font-sans font-bold text-2xl text-black">
                    Merge Sort
                  </h4>
                </div>
                <p className="text-xs font-body italic text-on-surface-variant">
                  Stable sorting with guaranteed logarithmic performance.
                </p>
              </div>
              <div className="w-1/2 p-8 bg-[#002FA7] text-white flex flex-col justify-between relative overflow-hidden">
                <div>
                  <span className="font-mono text-[10px] opacity-60 uppercase block mb-2">
                    Challenger B
                  </span>
                  <h4 className="font-sans font-bold text-2xl">Quick Sort</h4>
                </div>
                <div className="absolute -right-4 -bottom-4 rotate-12 opacity-10">
                  <span className="material-symbols-outlined text-9xl">bolt</span>
                </div>
                <div className="z-10 flex justify-between items-end">
                  <span className="bg-white text-[#002FA7] px-3 py-1 font-mono text-[10px] font-bold uppercase">
                    Winner: Speed
                  </span>
                  <span className="material-symbols-outlined">
                    military_tech
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    Context
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    Random Large Array
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    Latency
                  </span>
                  <span className="font-mono text-xs font-bold text-[#002FA7]">
                    -14.2%
                  </span>
                </div>
              </div>
              <button className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#002FA7] border-b-2 border-[#002FA7]">
                View Breakdown
              </button>
            </div>
          </div>

          {/* Dual Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-1 flex flex-col shadow-custom">
            <div className="flex h-64">
              <div className="w-1/2 p-8 border-r border-outline-variant flex flex-col justify-between bg-surface-container-high">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase block mb-2">
                    Challenger A
                  </span>
                  <h4 className="font-sans font-bold text-2xl text-black">
                    DFS
                  </h4>
                </div>
                <p className="text-xs font-body italic text-on-surface-variant">
                  Recursive traversal optimizing for depth first.
                </p>
              </div>
              <div className="w-1/2 p-8 flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-tertiary-fixed text-tertiary font-mono text-[8px] uppercase font-bold">
                    Recommended
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase block mb-2">
                    Challenger B
                  </span>
                  <h4 className="font-sans font-bold text-2xl text-black">
                    BFS
                  </h4>
                </div>
                <div className="flex justify-between items-end">
                  <span className="bg-[#002FA7] text-white px-3 py-1 font-mono text-[10px] font-bold uppercase">
                    Winner: Shortest Path
                  </span>
                  <span className="material-symbols-outlined text-slate-300">
                    compare_arrows
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    Context
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    Unweighted Graph
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    Reliability
                  </span>
                  <span className="font-mono text-xs font-bold text-green-600">
                    100%
                  </span>
                </div>
              </div>
              <button className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#002FA7] border-b-2 border-[#002FA7]">
                View Breakdown
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
