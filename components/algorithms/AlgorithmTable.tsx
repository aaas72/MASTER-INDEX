import Link from "next/link";
import algorithmsData from "@/data/algorithms.json";
import { Algorithm } from "@/types/algorithm";

export default function AlgorithmTable({ categorySlug }: { categorySlug?: string }) {
  let algorithms = Object.entries(algorithmsData).map(([id, data]) => ({
    id,
    ...data,
  })) as unknown as (Algorithm & { id: string })[];

  if (categorySlug) {
    algorithms = algorithms.filter(
      (algo) => algo.metadata.category.toLowerCase().replace(" ", "-") === categorySlug
    );
  }

  return (
    <section className="col-span-12 lg:col-span-8 border border-outline-variant/10 bg-surface-container-lowest">
      <div className="flex items-center justify-between border-b border-outline-variant/20 p-6">
        <h2 className="font-mono text-xs font-bold uppercase tracking-widest">Master Ledger // Algorithms</h2>
        <span className="font-mono text-[10px] text-outline">UPDATED: RECENT</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-outline-variant/30 bg-surface-container-low">
            <tr>
              <th className="px-6 py-4 font-mono text-[10px] uppercase text-outline">ID</th>
              <th className="px-6 py-4 font-sans text-xs font-bold uppercase">Algorithm Name</th>
              <th className="px-6 py-4 font-mono text-[10px] uppercase text-outline text-center">Complexity</th>
              <th className="px-6 py-4 font-mono text-[10px] uppercase text-outline text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {algorithms.map((algo, index) => (
              <tr key={algo.id} className="group transition-colors hover:bg-surface-container-low">
                <td className="px-6 py-5 font-mono text-xs text-outline">
                  {algo.id.substring(0, 6).toUpperCase()}-{index + 1}
                </td>
                <td className="px-6 py-5 font-sans text-sm font-bold text-black transition-colors group-hover:text-primary-container">
                  <Link href={`/algorithms/${algo.id}`} className="hover:underline">
                    {algo.metadata.title.en}
                  </Link>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="inline-block bg-primary-fixed px-2 py-1 font-mono text-[10px] font-bold text-[#001355]">
                    {algo.complexity.time.average.label}
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-mono text-[10px] font-bold text-primary-container">
                  STABLE
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
