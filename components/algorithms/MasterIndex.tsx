import Link from "next/link";
import algorithmsData from "@/data/algorithms.json";

export default function MasterIndex() {
  const algorithms = Object.values(algorithmsData);
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
              {algorithms.map((algo) => (
                <tr key={algo.id} className="group border-b border-surface-container-low transition-colors hover:bg-surface-container-lowest">
                  <td className="px-6 py-8">
                    <span className="block font-sans text-lg font-bold text-black">
                      {algo.title.en}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-slate-400">
                      {algo.difficulty} • {algo.category}
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    <span className="bg-primary-fixed px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
                      {algo.category}
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    <code className="font-mono text-sm font-bold text-[#002FA7]">
                      {algo.complexity.time.average}
                    </code>
                  </td>
                  <td className="px-6 py-8">
                    <code className="font-mono text-sm text-slate-600">{algo.complexity.space}</code>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 ${algo.status === 'Code Ready' ? 'bg-green-500' : algo.status === 'Simulation' ? 'bg-purple-500' : 'bg-[#002FA7]'}`}></div>
                      <span className="font-mono text-[10px] uppercase tracking-tighter">
                        {algo.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <Link href={`/algorithms/${algo.id}`}>
                      <span className="material-symbols-outlined cursor-pointer text-slate-300 group-hover:text-[#002FA7]">
                        arrow_outward
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
