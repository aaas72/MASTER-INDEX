"use client";

import Link from "next/link";
import algorithmsData from "@/data/algorithms.json";
import { BrutalistTable, type TableColumn } from "@/components/shared";
import { Algorithm } from "@/types/algorithm";
import { InlineMath } from "react-katex";

export default function MasterIndex() {
  const algorithms = Object.values(algorithmsData)
    .map((data) => (data as unknown as Algorithm));

  const columns: TableColumn<Algorithm>[] = [
    {
      header: "Algorithm Name",
      key: "title",
      render: (algo) => (
        <div>
          <span className="block font-sans text-lg font-bold text-black">
            {algo.metadata.title}
          </span>
          <span className="font-mono text-[10px] uppercase text-slate-400">
            {algo.metadata.category} • {algo.metadata.tags[0]}
          </span>
        </div>
      )
    },
    {
      header: "Category",
      key: "category",
      render: (algo) => (
        <span className="bg-primary-fixed px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
          {algo.metadata.category}
        </span>
      )
    },
    {
      header: "Avg. Time",
      key: "time",
      render: (algo) => (
        <code className="font-mono text-sm font-bold text-[#002FA7]">
          <InlineMath math={algo.complexity.time.average} />
        </code>
      )
    },
    {
      header: "Avg. Space",
      key: "space",
      render: (algo) => (
        <code className="font-mono text-sm text-slate-600">
          <InlineMath math={algo.complexity.space.average} />
        </code>
      )
    },
    {
      header: "Integrity",
      key: "integrity",
      render: (algo) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500"></div>
          <span className="font-mono text-[10px] uppercase tracking-tighter">
            {algo.metadata.stability || "STABLE"}
          </span>
        </div>
      )
    },
    {
      header: "Reference",
      key: "reference",
      render: (algo) => (
        <Link href={`/algorithms/${algo.id}`}>
          <span className="material-symbols-outlined cursor-pointer text-slate-300 group-hover:text-[#002FA7]">
            arrow_outward
          </span>
        </Link>
      )
    }
  ];

  return (
    <section className="py-12">
      <div className="w-full">
        <div className="mb-12 flex items-end justify-between">
          <div className="max-w-xl">
            <h3 className="mb-2 font-sans text-2xl font-bold uppercase tracking-tight text-black">
              MASTER ALGORITHM INDEX
            </h3>
            <p className="font-body text-lg text-on-surface-variant">
              Central repository of computational logic, verified by the Hub Simulation Engine.
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

        <BrutalistTable 
          columns={columns}
          data={algorithms}
        />
      </div>
    </section>
  );
}
