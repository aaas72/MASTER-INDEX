"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import MetricsSidebar from "@/components/MetricsSidebar";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmData } from "@/types/algorithm";
import { BlockMath } from "react-katex";
import AlgorithmToc from "@/components/AlgorithmToc";

type AlgorithmKey = keyof typeof algorithmsData;

const typedAlgorithmsData = algorithmsData as unknown as Record<
  string,
  AlgorithmData
>;

export default function AlgorithmPlayer({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as AlgorithmKey;
  const algoData = typedAlgorithmsData[slug];

  if (!algoData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center font-mono p-8">
        <h1 className="text-2xl font-bold">404 | Algorithm Not Found</h1>
        <p className="text-slate-500 mt-2">
          The requested formal procedure '{params.slug}' is not indexed in the
          archive.
        </p>
      </div>
    );
  }

  const [currentStep, setCurrentStep] = useState(0);
  const logicStep = algoData.content.logic_steps[currentStep];
  const arrayState = logicStep.array_state;
  const maxValue = Math.max(...arrayState);

  const handleNext = () => {
    setCurrentStep((prev) =>
      Math.min(prev + 1, algoData.content.logic_steps.length - 1),
    );
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-surface">
      <div className="relative lg:grid lg:grid-cols-[auto_20rem] min-h-screen">
        {/* Main Content Column */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto flex flex-col pt-8 px-6 lg:px-12 pb-24">
          <div className="flex gap-12">
            {/* Sticky Left Rail: Table of Contents */}
            <AlgorithmToc />

            {/* Center Content */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumbs & Meta */}
              <header className="mb-12 border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-6">
                  <Link
                    className="hover:text-primary-container transition-colors"
                    href="/"
                  >
                    Index
                  </Link>
                  <span className="text-outline">/</span>
                  <span className="hover:text-primary-container transition-colors cursor-pointer">
                    {algoData.category}
                  </span>
                  <span className="text-outline">/</span>
                  <span className="text-primary-container font-bold">
                    {algoData.title.en.replace(/ /g, "_")}
                  </span>
                </div>
                <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter mb-6">
                  {algoData.title.en.replace(/ /g, "_")}_
                </h1>
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                  <div className="max-w-2xl font-body text-lg md:text-xl leading-relaxed text-on-surface-variant">
                    <p>{algoData.content.abstract.en}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-primary-fixed text-on-primary-fixed font-mono text-xs px-3 py-1 uppercase tracking-widest">
                      Category: {algoData.category}
                    </span>
                    <span className="bg-surface-container-high text-on-surface font-mono text-xs px-3 py-1 uppercase tracking-widest">
                      {algoData.difficulty}
                    </span>
                  </div>
                </div>
              </header>

              {/* Section 1: Visualization */}
              <section id="visualization" className="mb-24">
                <h2 className="font-headline text-2xl font-bold mb-2">
                  Dynamic Partitioning Visualization
                </h2>
                <p className="font-body text-on-surface-variant mb-8">
                  {logicStep.description_en}
                </p>
                <div className="bg-surface-container-lowest p-6 border border-outline-variant/20 mb-4 h-96 relative flex items-end justify-center gap-1 group">
                  {arrayState.map((value, index) => {
                    const heightPercentage = (value / maxValue) * 100;
                    const isPivot = index === logicStep.pivot_index;
                    const inPartition =
                      logicStep.partition_range &&
                      index >= logicStep.partition_range[0] &&
                      index <= logicStep.partition_range[1];

                    let bgColor = "bg-surface-container-high";
                    if (isPivot) {
                      bgColor = "bg-primary-container";
                    } else if (inPartition) {
                      bgColor = "bg-secondary-container";
                    }

                    return (
                      <div
                        key={index}
                        className={`flex-1 ${bgColor} transition-all duration-300 ease-in-out flex items-end justify-center`}
                        style={{ height: `${heightPercentage}%` }}
                      >
                        <span className="text-on-surface text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between bg-surface-container-low p-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="px-4 py-2 font-mono text-xs uppercase tracking-widest disabled:opacity-30"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        currentStep === algoData.content.logic_steps.length - 1
                      }
                      className="px-4 py-2 font-mono text-xs uppercase tracking-widest disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                  <p className="font-mono text-xs text-on-surface-variant">
                    Step {currentStep + 1} of{" "}
                    {algoData.content.logic_steps.length}
                  </p>
                </div>
              </section>

              {/* Section 2: Mathematical Proof */}
              <section id="proof" className="mb-24 max-w-[720px]">
                <h2 className="font-headline text-2xl font-bold mb-6">
                  Recurrence Relations
                </h2>
                <p className="font-body text-lg text-on-surface mb-8 leading-relaxed">
                  The performance of the algorithm is described by the following
                  recurrence relation, which can be solved using the Master
                  Theorem.
                </p>
                <div className="bg-surface-container-low p-8 text-center mb-8 flex flex-col gap-6">
                  <div className="font-mono text-lg text-on-surface">
                    <BlockMath math={algoData.content.proof_latex} />
                  </div>
                  <div className="w-16 h-[1px] bg-outline-variant mx-auto"></div>
                  <div className="font-mono text-sm text-on-surface-variant">
                    Solving this yields an average time complexity of:
                    <br />
                    <br />
                    <span className="text-primary-container font-bold text-base">
                      {algoData.complexity.time.average}
                    </span>
                  </div>
                </div>
                <p className="font-body text-lg text-on-surface leading-relaxed">
                  However, in the worst-case scenario, performance degrades to{" "}
                  <span className="font-mono text-sm bg-surface-container-high px-1">
                    {algoData.complexity.time.worst}
                  </span>
                  .
                </p>
              </section>

              {/* Section 3: Implementation */}
              <section id="implementation" className="mb-24">
                <h2 className="font-headline text-2xl font-bold mb-6">
                  Reference Implementation
                </h2>
                <div className="bg-surface-container-low font-mono text-sm p-6 border border-outline-variant/20">
                  <pre>
                    <code>{algoData.code[0].snippet}</code>
                  </pre>
                </div>
                <a
                  href={algoData.code[0].github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-xs text-on-surface-variant hover:text-primary-container transition-colors"
                >
                  View on GitHub &rarr;
                </a>
              </section>

              {/* Section 4: Benchmarks */}
              <section id="benchmarks" className="mb-24">
                <h2 className="font-headline text-2xl font-bold mb-6">
                  Performance Benchmarks
                </h2>
                <div className="border border-outline-variant/20">
                  <table className="w-full font-mono text-sm">
                    <thead className="bg-surface-container-low text-on-surface-variant text-left">
                      <tr>
                        <th className="p-4 uppercase tracking-widest font-medium">
                          Input Size
                        </th>
                        <th className="p-4 uppercase tracking-widest font-medium">
                          Execution Time (ms)
                        </th>
                        <th className="p-4 uppercase tracking-widest font-medium">
                          Environment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {algoData.benchmarks.map((benchmark, index) => (
                        <tr key={index} className="bg-surface">
                          <td className="p-4">
                            {benchmark.input_size.toLocaleString()}
                          </td>
                          <td className="p-4 text-primary-container font-bold">
                            {benchmark.execution_time_ms}
                          </td>
                          <td className="p-4 text-on-surface-variant text-xs">
                            {benchmark.environment_specs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Metrics Sidebar (Right) */}
        <MetricsSidebar algoData={algoData} />
      </div>
      <Footer />
    </div>
  );
}
