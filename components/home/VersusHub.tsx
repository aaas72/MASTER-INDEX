import Link from "next/link";
import { home as t } from "@/locales/en/home";

export default function VersusHub() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto w-full max-w-[1280px] px-12">
        <div className="mb-16 border-l-4 border-[#002FA7] pl-8 text-left">
          <h3 className="mb-2 font-sans text-4xl font-extrabold uppercase tracking-tighter text-black">
            {t.versus.title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            {t.versus.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col border border-outline-variant bg-surface-container-lowest p-1 shadow-custom">
            <div className="flex h-64">
              <div className="flex w-1/2 flex-col justify-between border-r border-outline-variant p-8">
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase text-slate-400">
                    {t.versus.challenger_a}
                  </span>
                  <h4 className="font-sans text-2xl font-bold text-black">
                    Merge Sort
                  </h4>
                </div>
                <p className="font-body text-xs italic text-on-surface-variant">
                  Stable sorting with guaranteed logarithmic performance.
                </p>
              </div>
              <div className="relative flex w-1/2 flex-col justify-between overflow-hidden bg-[#002FA7] p-8 text-white">
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase opacity-60">
                    {t.versus.challenger_b}
                  </span>
                  <h4 className="font-sans text-2xl font-bold">Quick Sort</h4>
                </div>
                <div className="absolute -right-4 -bottom-4 rotate-12 opacity-10">
                  <span className="material-symbols-outlined text-9xl">bolt</span>
                </div>
                <div className="z-10 flex items-end justify-between">
                  <span className="bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#002FA7]">
                    {t.versus.winner_speed}
                  </span>
                  <span className="material-symbols-outlined">
                    military_tech
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant p-6">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    {t.versus.context}
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    Random Large Array
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    {t.versus.latency}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#002FA7]">
                    -14.2%
                  </span>
                </div>
              </div>
              <Link href="/versus" className="border-b-2 border-[#002FA7] font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7]">
                {t.versus.view_breakdown}
              </Link>
            </div>
          </div>

          <div className="flex flex-col border border-outline-variant bg-surface-container-lowest p-1 shadow-custom">
            <div className="flex h-64">
              <div className="flex w-1/2 flex-col justify-between border-r border-outline-variant bg-surface-container-high p-8">
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase text-slate-400">
                    {t.versus.challenger_a}
                  </span>
                  <h4 className="font-sans text-2xl font-bold text-black">
                    DFS
                  </h4>
                </div>
                <p className="font-body text-xs italic text-on-surface-variant">
                  Recursive traversal optimizing for depth first.
                </p>
              </div>
              <div className="relative flex w-1/2 flex-col justify-between p-8">
                <div className="absolute top-4 right-4">
                  <span className="bg-tertiary-fixed px-2 py-1 font-mono text-[8px] font-bold uppercase text-tertiary">
                    {t.versus.recommended}
                  </span>
                </div>
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase text-slate-400">
                    {t.versus.challenger_b}
                  </span>
                  <h4 className="font-sans text-2xl font-bold text-black">
                    BFS
                  </h4>
                </div>
                <div className="flex items-end justify-between">
                  <span className="bg-[#002FA7] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
                    {t.versus.winner_path}
                  </span>
                  <span className="material-symbols-outlined text-slate-300">
                    compare_arrows
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant p-6">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    {t.versus.context}
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    Unweighted Graph
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase text-slate-400">
                    {t.versus.reliability}
                  </span>
                  <span className="font-mono text-xs font-bold text-green-600">
                    100%
                  </span>
                </div>
              </div>
              <Link href="/versus" className="border-b-2 border-[#002FA7] font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7]">
                {t.versus.view_breakdown}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
