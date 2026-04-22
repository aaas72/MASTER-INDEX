"use client";

import { useState } from "react";
import Link from "next/link";
import { BlockMath } from "react-katex";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmData } from "@/types/algorithm";
import { AlgorithmToc, MetricsSidebar } from "@/components/algorithms/detail";

type AlgorithmKey = keyof typeof algorithmsData;

const typedAlgorithmsData = algorithmsData as unknown as Record<string, AlgorithmData>;

export default function AlgorithmDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const algorithmId = params.id as AlgorithmKey;
  const algoData = typedAlgorithmsData[algorithmId];

  if (!algoData) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center font-mono">
        <div>
          <h1 className="text-2xl font-bold">404 | Algorithm Not Found</h1>
          <p className="mt-2 text-slate-500">
            The requested formal procedure '{params.id}' is not indexed in the archive.
          </p>
        </div>
      </div>
    );
  }

  const [currentStep, setCurrentStep] = useState(0);
  const logicStep = algoData.content.logic_steps[currentStep];
  const arrayState = logicStep.array_state;
  const maxValue = Math.max(...arrayState);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, algoData.content.logic_steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-surface">
      <div className="relative min-h-screen lg:grid lg:grid-cols-[auto_20rem]">
        <main className="flex w-full max-w-[1200px] flex-col px-6 pb-24 pt-8 lg:mx-auto lg:px-12">
          <div className="flex gap-12">
            <AlgorithmToc />

            <div className="min-w-0 flex-1">
              <header className="mb-12 border-b border-outline-variant/30 pb-4">
                <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  <Link className="transition-colors hover:text-primary-container" href="/">
                    Index
                  </Link>
                  <span className="text-outline">/</span>
                  <Link className="transition-colors hover:text-primary-container" href="/algorithms">
                    Algorithms
                  </Link>
                  <span className="text-outline">/</span>
                  <span className="font-bold text-primary-container">
                    {algoData.title.en.replace(/ /g, "_")}
                  </span>
                </div>
                <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-tighter text-on-surface md:text-7xl">
                  {algoData.title.en.replace(/ /g, "_")}_
                </h1>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
                    <p>{algoData.content.abstract.en}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-primary-fixed px-3 py-1 font-mono text-xs uppercase tracking-widest text-on-primary-fixed">
                      Category: {algoData.category}
                    </span>
                    <span className="bg-surface-container-high px-3 py-1 font-mono text-xs uppercase tracking-widest text-on-surface">
                      {algoData.difficulty}
                    </span>
                  </div>
                </div>
              </header>

              <section id="visualization" className="mb-24">
                <h2 className="mb-2 text-2xl font-bold font-headline">Dynamic Partitioning Visualization</h2>
                <p className="mb-8 text-on-surface-variant font-body">{logicStep.description_en}</p>
                <div className="relative mb-4 flex h-96 items-end justify-center gap-1 border border-outline-variant/20 bg-surface-container-lowest p-6">
                  {arrayState.map((value, index) => {
                    const heightPercentage = (value / maxValue) * 100;
                    const isPivot = index === logicStep.pivot_index;
                    const inPartition =
                      logicStep.partition_range &&
                      index >= logicStep.partition_range[0] &&
                      index <= logicStep.partition_range[1];

                    let bgColor = "bg-surface-container-high";
                    if (isPivot) bgColor = "bg-primary-container";
                    else if (inPartition) bgColor = "bg-secondary-container";

                    return (
                      <div
                        key={index}
                        className={`flex-1 ${bgColor} flex items-end justify-center transition-all duration-300 ease-in-out`}
                        style={{ height: `${heightPercentage}%` }}
                      >
                        <span className="font-mono text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <button onClick={handlePrev} className="border border-outline-variant/20 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-primary-container hover:text-primary-container">
                    Prev
                  </button>
                  <button onClick={handleNext} className="border border-outline-variant/20 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-primary-container hover:text-primary-container">
                    Next
                  </button>
                </div>
              </section>

              <section id="proof" className="mb-24">
                <h2 className="mb-6 text-2xl font-bold font-headline">Mathematical Proof</h2>
                <div className="rounded-none border border-outline-variant/20 bg-surface-container-low p-6">
                  <BlockMath math={algoData.content.proof_latex} />
                </div>
              </section>

              <section id="implementation" className="mb-24">
                <h2 className="mb-6 text-2xl font-bold font-headline">Reference Implementation</h2>
                <div className="border border-outline-variant/20 bg-surface-container-low p-6 font-mono text-sm">
                  <pre>
                    <code>{algoData.code[0].snippet}</code>
                  </pre>
                </div>
                <a
                  href={algoData.code[0].github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-xs text-on-surface-variant transition-colors hover:text-primary-container"
                >
                  View on GitHub →
                </a>
              </section>

              <section id="benchmarks" className="mb-24">
                <h2 className="mb-6 text-2xl font-bold font-headline">Performance Benchmarks</h2>
                <div className="border border-outline-variant/20">
                  <table className="w-full font-mono text-sm">
                    <thead className="bg-surface-container-low text-left text-on-surface-variant">
                      <tr>
                        <th className="p-4 uppercase tracking-widest font-medium">Input Size</th>
                        <th className="p-4 uppercase tracking-widest font-medium">Execution Time (ms)</th>
                        <th className="p-4 uppercase tracking-widest font-medium">Environment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {algoData.benchmarks.map((benchmark, index) => (
                        <tr key={index} className="bg-surface">
                          <td className="p-4">{benchmark.input_size.toLocaleString()}</td>
                          <td className="p-4 font-bold text-primary-container">{benchmark.execution_time_ms}</td>
                          <td className="p-4 text-xs text-on-surface-variant">{benchmark.environment_specs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>

        <MetricsSidebar algoData={algoData} />
      </div>
    </div>
  );
}