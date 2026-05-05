"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockMath } from "react-katex";
import { BarsVisualizer, GraphVisualizer, LinkedListVisualizer, MatrixVisualizer, GeometryVisualizer, TreeVisualizer, ArrayVisualizer } from "@/components/algorithms/visualizers";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmToc, MetricsSidebar, CodeVisualizer } from "@/components/algorithms/detail";
import { exportToPdf } from "@/utils/export-pdf";
import { Algorithm } from "@/types/algorithm";
import { generateSimulation } from "@/lib/engine/simulator";

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
      description: s.description_en,
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
                  INDEX
                </Link>
                <span className="text-outline">/</span>
                <Link className="transition-colors hover:text-primary" href="/categories/sorting-search">
                  ALGORITHMS
                </Link>
                <span className="text-outline">/</span>
                <span className="font-bold text-primary">
                  {algoData.metadata.title}
                </span>
              </div>
              <h1 className="page-title mb-6 uppercase">
                {algoData.metadata.title}
              </h1>
              <div className="flex flex-col gap-4">
                <div className="body-copy text-sm md:text-base opacity-80 leading-relaxed">
                  <p>{algoData.documentation.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-primary text-white px-3 py-1 font-mono text-[9px] uppercase font-black">
                    Category: {algoData.metadata.category}
                  </span>
                  {algoData.metadata.stability && (
                    <span className="border border-outline-variant px-3 py-1 font-mono text-[9px] uppercase font-bold text-on-surface-variant">
                      {algoData.metadata.stability}
                    </span>
                  )}
                </div>
              </div>
            </header>

            <section id="visualization" className="mb-24">
              <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Visualization</h2>
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
                ) : algoData.visualizer_config.type === "geometry" ? (
                  <GeometryVisualizer
                    algoData={algoData as any}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    hasLogicSteps={hasLogicSteps}
                    fullTrace={fullTrace}
                  />
                ) : algoData.visualizer_config.type === "matrix" ? (
                  <MatrixVisualizer
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
                  <BarsVisualizer
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

            <section id="analysis" className="mb-24">
              <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Computational Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-outline-variant/10 bg-surface-container-low p-8">
                  <h3 className="font-mono text-[10px] uppercase font-black text-primary mb-4">Average Time Complexity</h3>
                  <div className="math-display text-base md:text-lg">
                    <BlockMath math={algoData.complexity.time.average} />
                  </div>
                </div>
                {algoData.complexity.recurrence_relation && (
                  <div className="border border-outline-variant/10 bg-surface-container-low p-8">
                    <h3 className="font-mono text-[10px] uppercase font-black text-primary mb-4">Recurrence Relation</h3>
                    <div className="math-display text-base md:text-lg">
                      <BlockMath math={algoData.complexity.recurrence_relation} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Complexity Notes */}
              {algoData.complexity.space.notes && (
                <div className="mt-6 font-mono text-[10px] text-on-surface-variant opacity-60 uppercase tracking-widest leading-loose max-w-3xl">
                  Note: {algoData.complexity.space.notes}
                </div>
              )}
            </section>

            <section id="logic" className="mb-24">
              <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Procedural Logic</h2>
              <div className="space-y-4">
                {algoData.documentation.how_it_works.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <span className="font-mono text-xs text-primary font-bold opacity-30 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                    <p className="body-copy text-sm italic">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="implementation" className="mb-24">
              <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Implementation</h2>
              <div className="bg-surface-container-lowest border-2 border-primary/20 shadow-xl overflow-hidden mb-6">
                <CodeVisualizer
                  code={algoData.implementations[0].snippet}
                  activeLine={logicStep?.state_snapshot?.activeLine ?? -1}
                />
              </div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest opacity-60">
                {algoData.implementations[0].explanation}
              </p>
            </section>

            {algoData.documentation.applications && (
              <section id="applications" className="mb-24">
                <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Real-world Applications</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {algoData.documentation.applications.map((app, idx) => (
                    <li key={idx} className="bg-surface-container-low p-6 border border-outline-variant/10 hover:border-primary/30 transition-colors">
                      <p className="font-sans text-sm font-bold text-on-surface leading-snug">{app}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {algoData.documentation.comparisons && (
              <section id="comparisons" className="mb-24">
                <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Comparative Analysis</h2>
                <div className="space-y-6">
                  {algoData.documentation.comparisons.map((comp, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-8 py-2">
                      <h4 className="font-mono text-[10px] uppercase font-black text-primary mb-2">Alternative to: {comp.alternative_to.toUpperCase()}</h4>
                      <p className="body-copy text-sm">{comp.reason}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {algoData.citations && algoData.citations.length > 0 && (
              <section id="citations" className="mb-24 border-t border-outline-variant/20 pt-12">
                <h2 className="font-mono text-[10px] mb-8 uppercase tracking-[0.3em] font-black text-on-surface-variant">Academic References</h2>
                <div className="space-y-6">
                  {algoData.citations.map((cite, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <p className="font-sans text-sm font-bold text-black">{cite.source_name}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                        Authors: {cite.authors} // {cite.chapter_or_page}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="benchmarks" className="mb-24">
              <h2 className="section-title text-lg mb-6 uppercase tracking-widest font-black">Benchmarks</h2>
              <div className="border-2 border-outline-variant/10 overflow-hidden">
                <table className="w-full font-mono text-xs">
                  <thead className="bg-primary/5 text-left text-primary">
                    <tr>
                      <th className="p-4 uppercase tracking-widest font-black">Input Size</th>
                      <th className="p-4 uppercase tracking-widest font-black">Execution (ms)</th>
                      <th className="p-4 uppercase tracking-widest font-black">Environment</th>
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