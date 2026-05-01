"use client";

import Link from "next/link";
import algorithmsData from "@/data/algorithms.json";
import { BrutalistTable, type TableColumn } from "@/components/shared";
import { home as t } from "@/locales/en/home";

type Algorithm = {
  id: string;
  title: { ar: string; en: string };
  category: string;
  difficulty: string;
  complexity: {
    time: string;
    space: string;
  };
  status: string;
  description: { ar: string; en: string };
};

export default function MasterIndex() {
  const algorithms = Object.entries(algorithmsData).map(([id, data]) => ({
    id,
    ...(data as any)
  })) as Algorithm[];

  const columns: TableColumn<Algorithm>[] = [
    {
      header: t.master_index.table.name,
      key: "title",
      render: (algo) => (
        <div>
          <span className="block font-sans text-lg font-bold text-black">
            {algo.title.en}
          </span>
          <span className="font-mono text-[10px] uppercase text-slate-400">
            {algo.difficulty || "STABLE"} • {algo.category}
          </span>
        </div>
      )
    },
    {
      header: t.master_index.table.category,
      key: "category",
      render: (algo) => (
        <span className="bg-primary-fixed px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
          {algo.category}
        </span>
      )
    },
    {
      header: t.master_index.table.time,
      key: "time",
      render: (algo) => (
        <code className="font-mono text-sm font-bold text-[#002FA7]">
          {algo.complexity.time}
        </code>
      )
    },
    {
      header: t.master_index.table.space,
      key: "space",
      render: (algo) => (
        <code className="font-mono text-sm text-slate-600">{algo.complexity.space}</code>
      )
    },
    {
      header: t.master_index.table.status,
      key: "status",
      render: (algo) => (
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 ${algo.status === 'Code Ready' ? 'bg-green-500' : algo.status === 'Simulation' ? 'bg-purple-500' : 'bg-[#002FA7]'}`}></div>
          <span className="font-mono text-[10px] uppercase tracking-tighter">
            {algo.status}
          </span>
        </div>
      )
    },
    {
      header: t.master_index.table.ref,
      key: "id",
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
              {t.master_index.title}
            </h3>
            <p className="font-body text-lg text-on-surface-variant">
              {t.master_index.description}
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
