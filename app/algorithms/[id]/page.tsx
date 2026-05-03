"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockMath } from "react-katex";
import { BarVisualizer, GraphVisualizer, LinkedListVisualizer, DpVisualizer, GeometryVisualizer, TreeVisualizer, ArrayVisualizer } from "@/components/algorithms/visualizers";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmToc, MetricsSidebar, CodeVisualizer } from "@/components/algorithms/detail";
import { exportToPdf } from "@/utils/export-pdf";
import { Algorithm } from "@/types/algorithm";
import { detail } from "@/locales/en/detail";
import { common } from "@/locales/en/common";
import { generateSimulation } from "@/lib/engine/simulator";

const t = { ...detail, common };

export default function AlgorithmDetailPage({ params }: { params: { id: string } }) {
  const algorithmId = params.id;
  const algoData = (algorithmsData as Record<string, Algorithm>)[algorithmId];

  if (!algoData) {
    notFound();
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate full trace from unified engine
  const fullTrace = useMemo(() => {
    const steps = generateSimulation(algorithmId);
    return steps.map((s, idx) => ({
      step: idx,
      description: { en: s.description_en },
      state_snapshot: {
        array: s.array_state,
        pointers: s.pointers || {},
        activeLine: s.active_line,
        nodes: s.nodes_state,
        edges: s.edges_state,
        matrix: s.matrix_state,
        linked_list: s.linked_list_state,
        highlight_indices: s.highlight_indices,
        pivot_index: s.pivot_index,
        partition_range: s.partition_range,
      }
    }));
  }, [algorithmId]);

  const hasLogicSteps = fullTrace.length > 0;
  const logicStep = hasLogicSteps ? fullTrace[currentStep] : null;

  const handleNext = useCallback(() => {
    if (!hasLogicSteps) return;
    setCurrentStep((prev) => Math.min(prev + 1, fullTrace.length - 1));
  }, [hasLogicSteps, fullTrace.length]);

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Auto-play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= fullTrace.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 600);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, fullTrace.length]);

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPdf("algorithm-report", `REPORT_${algorithmId.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen" id="algorithm-report">
      <main className="mx-auto flex w-full max-w-[1700px] flex-col px-6 pb-24 pt-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Table of Contents */}
          <div className="hidden lg:block w-44 shrink-0 no-export">
            <AlgorithmToc />
          </div>

          {/* Center: Main Content */}
          <div className="min-w-0 flex-1">
            <header className="mb-12 border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-8">
                <Link className="transition-colors hover:text-primary" href="/">
                  {t.common.index}
                </Link>
                <span className="text-outline">/</span>
                <Link className="transition-colors hover:text-primary" href="/categories/sorting-search">
                  {t.common.algorithms}
                </Link>
                <span className="text-outline">/</span>
                <span className="font-bold text-primary">
                  {algoData.metadata.title.en}
                </span>
              </div>
              <h1 className="page-title mb-6 uppercase">
                {algoData.metadata.title.en}
              </h1>
              <div className="flex flex-col gap-4">
                <div className="body-copy text-sm md:text-base opacity-80 leading-relaxed">
                  <p>{algoData.documentation.description.en}</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-primary text-white px-3 py-1 font-mono text-[9px] uppercase font-black">
                    Category: {algoData.metadata.category}
                  </span>
                  <span className="border border-outline-variant px-3 py-1 font-mono text-[9px] uppercase font-bold text-on-surface-variant">
                    STABLE
                  </span>
                </div>
              </div>
            </header>

            <section id="visualization" className="mb-24">
              <h2 className="section-title text-lg mb-6">{t.sections.visualization}</h2>
              {/* Computational Visualization Wrapper with Fixed Height */}
              <div className="bg-surface-container-lowest border border-outline-variant/10 shadow-sm overflow-hidden h-[500px] flex flex-col">
                {algoData.visualizer_config.type === "graph" ? (
                  <GraphVisualizer
                    algoData={algoData as any}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                ) : algoData.visualizer_config.type === "tree" ? (
                  <TreeVisualizer
                    algoData={algoData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                ) : algoData.visualizer_config.type === "geometry" ? (
                  <GeometryVisualizer
                    algoData={algoData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                  />
                ) : algoData.visualizer_config.type === "matrix" ? (
                  <DpVisualizer
                    algoData={algoData as any}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                ) : algoData.visualizer_config.type === "linkedlist" ? (
                  <LinkedListVisualizer
                    algoData={algoData as any}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                ) : algoData.visualizer_config.type === "array" ? (
                  <ArrayVisualizer
                    algoData={algoData as any}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                ) : (
                  <BarVisualizer
                    algoData={algoData as any}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                )}
              </div>
            </section>

            <section id="proof" className="mb-24">
              <h2 className="section-title text-lg mb-6">{t.sections.math_analysis}</h2>
              <div className="border border-outline-variant/10 bg-surface-container-low p-8 text-center">
                <div className="math-display text-base md:text-lg">
                  <BlockMath math={algoData.complexity.time.average.label} />
                </div>
              </div>
            </section>

            <section id="implementation" className="mb-24">
              <h2 className="section-title text-lg mb-6">{t.sections.implementation}</h2>
              <div className="bg-surface-container-lowest border-2 border-primary/20 shadow-xl overflow-hidden">
                <CodeVisualizer
                  code={algoData.implementations[0].snippet}
                  activeLine={logicStep?.state_snapshot?.activeLine ?? -1}
                />
              </div>
            </section>

            <section id="benchmarks" className="mb-24">
              <h2 className="section-title text-lg mb-6">{t.sections.benchmarks}</h2>
              <div className="border-2 border-outline-variant/10 overflow-hidden">
                <table className="w-full font-mono text-xs">
                  <thead className="bg-primary/5 text-left text-primary">
                    <tr>
                      <th className="p-4 uppercase tracking-widest font-black">{t.table.input_size}</th>
                      <th className="p-4 uppercase tracking-widest font-black">{t.table.execution_time}</th>
                      <th className="p-4 uppercase tracking-widest font-black">{t.table.environment}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {(algoData.benchmarks || []).map((benchmark: any, index: number) => (
                      <tr key={index} className="bg-white hover:bg-primary/5 transition-colors">
                        <td className="p-4">{benchmark.input_size.toLocaleString('en-US')}</td>
                        <td className="p-4 font-bold text-primary">{benchmark.execution_time_ms}</td>
                        <td className="p-4 opacity-50 uppercase text-[9px] tracking-widest">{benchmark.environment_specs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right: Metrics Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <MetricsSidebar
              algoData={algoData}
              onExport={handleExport}
              isExporting={isExporting}
            />
          </div>
        </div>
      </main>
    </div>
  );
}