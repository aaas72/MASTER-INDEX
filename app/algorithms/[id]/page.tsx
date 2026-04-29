"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockMath } from "react-katex";
import { BarVisualizer, GraphVisualizer, LinkedListVisualizer, DpVisualizer } from "@/components/algorithms/visualizers";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmData } from "@/types/algorithm";
import { AlgorithmToc, MetricsSidebar } from "@/components/algorithms/detail";
import { generateSimulation } from "@/lib/engine/simulator";

type AlgorithmKey = keyof typeof algorithmsData;

const typedAlgorithmsData = algorithmsData as unknown as Record<string, AlgorithmData>;

export default function AlgorithmDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const algorithmId = params.id as AlgorithmKey;
  const rawAlgoData = typedAlgorithmsData[algorithmId];

  if (!rawAlgoData) {
    notFound();
  }

  // Intercept and inject dynamic simulation if available
  // Extract initial array state if it exists in the first step of mock data
  const initialData = rawAlgoData.content.logic_steps?.[0]?.array_state;
  const dynamicSteps = generateSimulation(algorithmId, initialData);
  const algoData = {
    ...rawAlgoData,
    content: {
      ...rawAlgoData.content,
      logic_steps: dynamicSteps || rawAlgoData.content.logic_steps
    }
  };

  const [currentStep, setCurrentStep] = useState(0);
  const hasLogicSteps = algoData.content.logic_steps && algoData.content.logic_steps.length > 0;
  const logicStep = hasLogicSteps ? algoData.content.logic_steps[currentStep] : null;
  const arrayState = logicStep && logicStep.array_state ? logicStep.array_state : [];
  const maxValue = arrayState.length > 0 ? Math.max(...arrayState) : 1;

  const handleNext = () => {
    if (!hasLogicSteps) return;
    setCurrentStep((prev) => Math.min(prev + 1, algoData.content.logic_steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-surface">
      <div className="relative min-h-screen">
        <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-24 pt-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Table of Contents */}
            <div className="hidden lg:block w-48 shrink-0">
              <AlgorithmToc />
            </div>

            {/* Center: Main Content */}
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
                    {algoData.title.en}
                  </span>
                </div>
                <h1 className="page-title mb-6">
                  {algoData.title.en}
                </h1>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl body-copy md:text-xl">
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
                <h2 className="section-title mb-6">Computational Visualization</h2>
                {algoData.category === "Graph" ? (
                  <GraphVisualizer
                    algoData={algoData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                  />
                ) : algoData.category === "Searching" ? (
                  <LinkedListVisualizer
                    algoData={algoData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                  />
                ) : algoData.category === "DP" ? (
                  <DpVisualizer
                    algoData={algoData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                  />
                ) : (
                  <BarVisualizer
                    algoData={algoData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                  />
                )}
              </section>

              <section id="proof" className="mb-24">
                <h2 className="section-title mb-6">Mathematical Proof</h2>
                <div className="rounded-none border border-outline-variant/20 bg-surface-container-low p-6">
                  <div className="math-display">
                    <BlockMath math={algoData.content.proof_latex} />
                  </div>
                </div>
              </section>

              <section id="implementation" className="mb-24">
                <h2 className="section-title mb-6">Reference Implementation</h2>
                {algoData.code && algoData.code.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="flex p-6 border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest justify-center items-center h-32">
                    Implementation pending peer review
                  </div>
                )}
              </section>

              <section id="benchmarks" className="mb-24">
                <h2 className="section-title mb-6">Performance Benchmarks</h2>
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
                          <td className="p-4">{benchmark.input_size.toLocaleString('en-US')}</td>
                          <td className="p-4 font-bold text-primary-container">{benchmark.execution_time_ms}</td>
                          <td className="p-4 text-xs text-on-surface-variant">{benchmark.environment_specs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right: Metrics Sidebar */}
            <div className="hidden lg:block w-80 shrink-0">
              <MetricsSidebar algoData={algoData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}