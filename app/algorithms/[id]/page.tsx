"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarsVisualizer, GraphVisualizer, LinkedListVisualizer, MatrixVisualizer, GeometryVisualizer, TreeVisualizer, ArrayVisualizer } from "@/components/algorithms/visualizers";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmToc, MetricsSidebar, CodeVisualizer } from "@/components/algorithms/detail";
import { ScientificRenderer, AcademicLabel } from "@/components/shared";
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
        {/* Unified Header Area: Breadcrumbs + Hero */}
        <header className="mb-24 border-b border-outline-variant/10 pb-12 pt-12 bg-white -mx-6 px-6 lg:-mx-12 lg:px-12 shadow-[0_1px_3px_rgba(0,0,0,0,02)]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-12">
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

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase font-black tracking-[0.4em] text-primary">
              {algoData.metadata.category} // {algoData.metadata.stability?.toUpperCase()}
            </span>
            <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-[0.9] mb-2">
              {algoData.metadata.title}<span className="text-primary">_</span>
            </h1>
            <p className="font-serif text-lg md:text-xl text-on-surface-variant italic leading-relaxed max-w-2xl">
              {algoData.metadata.subtitle}
            </p>
          </div>
        </header>

        {/* Dynamic Layout: Sidebars start here */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Table of Contents */}
          <aside className="hidden lg:block w-44 shrink-0 border-r border-outline-variant/10 pr-10 no-export">
            <AlgorithmToc />
          </aside>

          {/* Center: Main Content */}
          <div className="min-w-0 flex-1">

              {/* Description Section */}
              <section className="mb-24 max-w-3xl">
              <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Abstract // Theoretical Basis</h2>
                <div className="font-serif text-base md:text-lg text-on-surface-variant leading-loose antialiased first-letter:text-4xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                  <ScientificRenderer content={algoData.documentation.description} />
                </div>
              </section>

            <section id="visualization" className="mb-32">
              <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Interactive Simulation</h2>
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
                <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Computational Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-outline-variant/10 bg-surface-container-low p-8">
                    <h3 className="font-mono text-[10px] uppercase font-black text-primary mb-4">Average Time Complexity</h3>
                    <div className="text-base md:text-lg">
                      <ScientificRenderer content={algoData.complexity.time.average} isBlock />
                    </div>
                  </div>
                  {algoData.complexity.recurrence_relation && (
                    <div className="border border-outline-variant/10 bg-surface-container-low p-8">
                      <h3 className="font-mono text-[10px] uppercase font-black text-primary mb-4">Recurrence Relation</h3>
                      <div className="text-base md:text-lg">
                        <ScientificRenderer content={algoData.complexity.recurrence_relation} isBlock />
                      </div>
                    </div>
                  )}
                </div>

                {algoData.complexity.space.notes && (
                  <div className="mt-8 border-l-2 border-primary/30 pl-6">
                    <p className="font-serif text-sm italic text-on-surface-variant leading-relaxed">
                      Note on Space Allocation: <ScientificRenderer content={algoData.complexity.space.notes} />
                    </p>
                  </div>
                )}
              </section>

              <section id="logic" className="mb-32">
              <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Procedural Methodology</h2>
                <div className="space-y-12">
                  {algoData.documentation.how_it_works.map((step, idx) => (
                    <div key={idx} className="flex gap-10 items-start max-w-3xl group">
                      <span className="font-mono text-xl text-primary font-black opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="flex-1 pt-0.5">
                        <p className="font-serif text-base md:text-lg text-on-surface leading-loose">
                          <ScientificRenderer content={step} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="implementation" className="mb-32">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Reference Implementation</h2>
              </div>
                <div className="bg-surface-container-lowest border border-outline-variant/10 shadow-2xl overflow-hidden mb-8">
                  <CodeVisualizer
                    code={algoData.implementations[0].snippet}
                    activeLine={logicStep?.state_snapshot?.activeLine ?? -1}
                  />
                </div>
                <div className="max-w-2xl border-l-2 border-primary/20 pl-6 py-1">
                  <p className="font-serif text-sm italic text-on-surface-variant leading-relaxed">
                    {algoData.implementations[0].explanation}
                  </p>
                </div>
              </section>

            {algoData.documentation.pitfalls && (
              <section id="pitfalls" className="mb-32">
                <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Theoretical Constraints & Pitfalls</h2>
                <div className="space-y-12">
                  {algoData.documentation.pitfalls.map((pitfall, idx) => (
                    <div key={idx} className="flex gap-10 items-start max-w-3xl group">
                      <AcademicLabel prefix="TH-CST" index={idx + 1} className="shrink-0" />
                      <p className="font-serif text-lg md:text-xl text-on-surface-variant leading-loose antialiased italic">
                        <ScientificRenderer content={pitfall} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {algoData.documentation.applications && (
              <section id="applications" className="mb-32">
                <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12">Industrial Domain Applications</h2>
                <div className="grid grid-cols-1 gap-y-12">
                  {algoData.documentation.applications.map((app, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                      <AcademicLabel prefix="APP-DMN" index={idx + 1} className="shrink-0" />
                      <p className="font-serif text-base md:text-lg text-on-surface-variant leading-relaxed antialiased">
                        <ScientificRenderer content={app} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Nomenclature Section */}
            <section className="mb-32 border-t border-outline-variant/10 pt-16">
              <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Technical Nomenclature</h2>
              <div className="grid grid-cols-1 gap-y-10">
                <div className="flex gap-6 items-center">
                  <AcademicLabel prefix="TH-CST" />
                  <p className="font-serif text-base md:text-lg text-on-surface-variant italic leading-relaxed">Theoretical Constraint: Denotes a mathematical or architectural limitation inherent to the algorithm's design.</p>
                </div>
                <div className="flex gap-6 items-center">
                  <AcademicLabel prefix="APP-DMN" />
                  <p className="font-serif text-base md:text-lg text-on-surface-variant italic leading-relaxed">Application Domain: Identifies specific industrial or computational environments where the algorithm is implemented.</p>
                </div>
                <div className="flex gap-6 items-center">
                  <AcademicLabel prefix="CMP-ANL" />
                  <p className="font-serif text-base md:text-lg text-on-surface-variant italic leading-relaxed">Comparative Analysis: Evaluates performance trade-offs between current and alternative algorithmic paradigms.</p>
                </div>
              </div>
            </section>

            {algoData.documentation.comparisons && (
              <section id="comparisons" className="mb-32">
                <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Comparative Analysis</h2>
                <div className="space-y-12">
                  {algoData.documentation.comparisons.map((comp, idx) => (
                    <div key={idx} className="flex gap-10 items-start max-w-3xl group">
                      <AcademicLabel prefix="CMP-ANL" index={idx + 1} className="shrink-0" />
                      <div className="flex-1 pt-0.5">
                        <h4 className="font-sans text-lg font-bold text-black mb-4 flex items-center gap-4">
                          <span className="material-symbols-outlined text-primary text-base">compare_arrows</span>
                          Versus {comp.alternative_to.replace('-', ' ').toUpperCase()}
                        </h4>
                        <p className="font-serif text-base md:text-lg text-on-surface-variant leading-relaxed antialiased">
                          <ScientificRenderer content={comp.reason} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {algoData.citations && algoData.citations.length > 0 && (
              <section id="citations" className="mb-32 border-t border-outline-variant/20 pt-16">
                <h2 className="font-sans text-xl font-black uppercase tracking-widest text-black mb-12 border-r-4 border-primary/20 pr-6 inline-block">Academic Index & Citations</h2>
                  <div className="space-y-10">
                    {algoData.citations.map((cite, idx) => (
                      <div key={idx} className="flex flex-col gap-2 max-w-2xl">
                        <p className="font-serif text-base md:text-lg font-bold text-primary italic">{cite.source_name}</p>
                        <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest leading-loose">
                          Research Authors: {cite.authors}<br />
                          Reference Node: {cite.chapter_or_page}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

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