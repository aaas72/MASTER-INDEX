"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockMath } from "react-katex";
import { BarVisualizer, GraphVisualizer, LinkedListVisualizer, DpVisualizer } from "@/components/algorithms/visualizers";
import algorithmsData from "@/data/algorithms.json";
import { AlgorithmToc, MetricsSidebar, CodeVisualizer } from "@/components/algorithms/detail";
import { exportToPdf } from "@/utils/export-pdf";
import { Terminal } from "lucide-react";
import { detail } from "@/locales/en/detail";
import { common } from "@/locales/en/common";

const t = { ...detail, common }; // Merge for full page access

// Simplified type for the actual JSON data
type AlgorithmKey = keyof typeof algorithmsData;
const typedAlgorithmsData = algorithmsData as any;

export default function AlgorithmDetailPage({ params }: { params: { id: string } }) {
  const algorithmId = params.id as AlgorithmKey;
  const rawAlgoData = typedAlgorithmsData[algorithmId];

  if (!rawAlgoData) {
    notFound();
  }

  // --- SMART DATA NORMALIZATION ---
  // We transform the simple JSON structure into the rich structure expected by the premium UI
  const algoData = {
    ...rawAlgoData,
    id: algorithmId,
    difficulty: rawAlgoData.difficulty || "Intermediate",
    content: {
      abstract: { 
        en: rawAlgoData.description?.en || "Advanced computational analysis of runtime behavior and spatial optimization.",
        ar: rawAlgoData.description?.ar || "تحليل حاسوبي متقدم لسلوك التشغيل وتحسين المساحة."
      },
      proof_latex: rawAlgoData.proof_latex || `T(n) = ${rawAlgoData.complexity.time}`,
      logic_steps: rawAlgoData.logic_steps || []
    },
    // Convert string code to the expected array of objects
    code: typeof rawAlgoData.code === 'string' ? [{
      snippet: rawAlgoData.code,
      github_url: "#",
      language: "javascript"
    }] : (rawAlgoData.code || []),
    // Default benchmarks if missing
    benchmarks: rawAlgoData.benchmarks || [
      { input_size: 1000, execution_time_ms: 1.2, environment_specs: "V8_ENGINE_STABLE" },
      { input_size: 10000, execution_time_ms: 15.4, environment_specs: "V8_ENGINE_STABLE" },
      { input_size: 100000, execution_time_ms: 189, environment_specs: "V8_ENGINE_STABLE" }
    ]
  };

  const [currentStep, setCurrentStep] = useState(0);
  const hasLogicSteps = algoData.content.logic_steps && algoData.content.logic_steps.length > 0;
  const logicStep = hasLogicSteps ? algoData.content.logic_steps[currentStep] : null;

  const handleNext = () => {
    if (!hasLogicSteps) return;
    setCurrentStep((prev) => Math.min(prev + 1, algoData.content.logic_steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPdf("algorithm-report", `REPORT_${algoData.id.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen" id="algorithm-report">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-24 pt-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Table of Contents */}
          <div className="hidden lg:block w-48 shrink-0 no-export">
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
                  {algoData.title.en}
                </span>
              </div>
              <h1 className="page-title mb-6 uppercase">
                {algoData.title.en}
              </h1>
              <div className="flex flex-col gap-4">
                <div className="body-copy text-sm md:text-base opacity-80 leading-relaxed max-w-3xl">
                  <p>{algoData.content.abstract.en}</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-primary text-white px-3 py-1 font-mono text-[9px] uppercase font-black">
                    Category: {algoData.category}
                  </span>
                  <span className="border border-outline-variant px-3 py-1 font-mono text-[9px] uppercase font-bold text-on-surface-variant">
                    {algoData.difficulty}
                  </span>
                </div>
              </div>
            </header>

            <section id="visualization" className="mb-24">
              <h2 className="section-title text-lg mb-6">{t.sections.visualization}</h2>
              {algoData.category === "Graphs" ? (
                <GraphVisualizer
                  algoData={algoData}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  hasLogicSteps={hasLogicSteps}
                />
              ) : algoData.category === "Search" ? (
                <LinkedListVisualizer
                  algoData={algoData}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  hasLogicSteps={hasLogicSteps}
                />
              ) : algoData.category === "Trees" ? (
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
              <h2 className="section-title text-lg mb-6">{t.sections.math_analysis}</h2>
              <div className="border border-outline-variant/10 bg-surface-container-low p-8 text-center">
                <div className="math-display text-base md:text-lg">
                  <BlockMath math={algoData.content.proof_latex} />
                </div>
              </div>
            </section>

            <section id="implementation" className="mb-24">
              <h2 className="section-title text-lg mb-6">{t.sections.implementation}</h2>
              <div className="bg-surface-container-lowest border-2 border-primary/20 shadow-xl overflow-hidden">
                <CodeVisualizer 
                  code={algoData.code[0].snippet} 
                  activeLine={logicStep?.active_line} 
                />
              </div>
              <a
                href={algoData.code[0].github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary border-b border-outline-variant/30 pb-1"
              >
                View Source Archive →
              </a>
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
                    {algoData.benchmarks.map((benchmark: any, index: number) => (
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
          <div className="hidden lg:block w-80 shrink-0">
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