"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FullWidthLayout } from "@/components/shared";
import {
  VersusAlgorithmSelector,
  VersusHeader,
  VersusCompetitorLeft,
  VersusCompetitorRight,
  VersusCenterRadar,
} from "@/components/versus";
import { DataVisualizer } from "@/components/visualizer";
import algorithmsData from "@/data/algorithms.json";
import { runRealBenchmark, type BenchmarkResult } from "@/utils/benchmark-engine";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronRight, RotateCcw, Terminal, Zap, Share2, Check, FileDown } from "lucide-react";
import { exportToPdf } from "@/utils/export-pdf";
import { versus as t } from "@/locales/en/versus";

import { Algorithm } from "@/types/algorithm";
import { generateSimulation } from "@/lib/engine/simulator";
import { LogicStep } from "@/types/algorithm";

const typedAlgorithmsData = algorithmsData as unknown as Record<string, Algorithm>;

export default function VersusHubPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- Global UI State ---
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || searchParams.get("cat") || "Sorting");
  const [scenario, setScenario] = useState(searchParams.get("sce") || "Random");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isVisualSim, setIsVisualSim] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // --- SYNC STATE TO URL ---
  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    if (newParams.has("category")) newParams.delete("category");
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // --- REFS FOR REAL-TIME CONTROL ---
  const isPausedRef = useRef(false);
  const isManualStepRef = useRef(false);
  const stepResolversRef = useRef<(() => void)[]>([]);

  const [isPaused, setIsPausedState] = useState(false);
  const [isManualStep, setIsManualStepState] = useState(false);
  const [leftStepIdx, setLeftStepIdx] = useState(0);
  const [rightStepIdx, setRightStepIdx] = useState(0);

  // Generated traces
  const [leftTrace, setLeftTrace] = useState<LogicStep[]>([]);
  const [rightTrace, setRightTrace] = useState<LogicStep[]>([]);

  const togglePause = (val?: boolean) => {
    const next = val !== undefined ? val : !isPausedRef.current;
    isPausedRef.current = next;
    setIsPausedState(next);
    if (!next) { isManualStepRef.current = false; setIsManualStepState(false); }
    handleNextStep();
  };

  const handleManualStepTrigger = () => {
    isManualStepRef.current = true;
    setIsManualStepState(true);
    isPausedRef.current = true;
    setIsPausedState(true);
    handleNextStep();
  };

  const handleNextStep = () => {
    const resolvers = [...stepResolversRef.current];
    stepResolversRef.current = [];
    resolvers.forEach(resolve => resolve());
  };

  // --- Visualizer States ---
  const [leftBars, setLeftBars] = useState<number[]>([]);
  const [rightBars, setRightBars] = useState<number[]>([]);
  const [leftMsg, setLeftMsg] = useState("");
  const [rightMsg, setRightMsg] = useState("");
  const [realResults, setRealResults] = useState<{ left: BenchmarkResult | null; right: BenchmarkResult | null; }>({ left: null, right: null });

  const waitStep = async (ms: number) => {
    if (isManualStepRef.current || isPausedRef.current) {
      return new Promise<void>(resolve => {
        stepResolversRef.current.push(resolve);
      });
    }
    await new Promise(resolve => setTimeout(resolve, ms));
  };

  const algorithmEntries = useMemo(() => Object.entries(typedAlgorithmsData).filter(([_, algo]) => algo.metadata.category === activeCategory), [activeCategory]);
  const [leftAlgorithmId, setLeftAlgorithmId] = useState(searchParams.get("l") || "");
  const [rightAlgorithmId, setRightAlgorithmId] = useState(searchParams.get("r") || "");

  useEffect(() => {
    if (algorithmEntries.length > 0 && !leftAlgorithmId) {
      const lid = algorithmEntries[0][0];
      const rid = algorithmEntries[1] ? algorithmEntries[1][0] : lid;
      setLeftAlgorithmId(lid); setRightAlgorithmId(rid);
    }
  }, [algorithmEntries, leftAlgorithmId]);

  useEffect(() => {
    updateURL({ cat: activeCategory, l: leftAlgorithmId, r: rightAlgorithmId, sce: scenario });
    setShowResults(false); setIsAnalysisMode(false);
  }, [activeCategory, leftAlgorithmId, rightAlgorithmId, scenario]);

  // --- UNIFIED EXECUTION: Uses generateSimulation for ALL categories ---
  const handleExecute = async (isAnalysis = false) => {
    if (!leftAlgorithmId || !rightAlgorithmId) return;
    setLeftStepIdx(0); setRightStepIdx(0);

    if (isAnalysis) {
      setIsAnalysisMode(true);
      isPausedRef.current = true; setIsPausedState(true);
      isManualStepRef.current = true; setIsManualStepState(true);
    } else {
      setIsExecuting(true); setShowResults(false);
    }

    // Generate full traces from unified engine
    const lTrace = generateSimulation(leftAlgorithmId);
    const rTrace = generateSimulation(rightAlgorithmId);
    setLeftTrace(lTrace);
    setRightTrace(rTrace);

    // Set initial bars if available
    if (lTrace[0]?.array_state) setLeftBars([...lTrace[0].array_state]);
    if (rTrace[0]?.array_state) setRightBars([...rTrace[0].array_state]);

    // Benchmark
    const benchmarkPromise = isAnalysis ? Promise.resolve([]) : Promise.all([runRealBenchmark(leftAlgorithmId, scenario, 2500), runRealBenchmark(rightAlgorithmId, scenario, 2500)]);

    setIsVisualSim(true);

    // Animate both sides in parallel
    const maxSteps = Math.max(lTrace.length, rTrace.length);
    for (let i = 0; i < maxSteps; i++) {
      if (i < lTrace.length) {
        setLeftStepIdx(i);
        if (lTrace[i].array_state) setLeftBars([...lTrace[i].array_state!]);
        setLeftMsg(lTrace[i].description_en);
      }
      if (i < rTrace.length) {
        setRightStepIdx(i);
        if (rTrace[i].array_state) setRightBars([...rTrace[i].array_state!]);
        setRightMsg(rTrace[i].description_en);
      }
      await waitStep(120);
    }

    const [benchResults] = await Promise.all([benchmarkPromise]);
    if (!isAnalysis && Array.isArray(benchResults) && benchResults.length === 2) {
      setRealResults({ left: benchResults[0], right: benchResults[1] });
      setIsExecuting(false);
    }
    setIsVisualSim(false); setShowResults(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    const fileName = `MasterIndex_Report_${leftAlgorithmId}_vs_${rightAlgorithmId}`;
    await exportToPdf('versus-report-area', fileName);
    setIsExporting(false);
  };

  const getAbbr = (name: string) => {
    if (name.includes("Quick")) return "Quick";
    if (name.includes("Bubble")) return "Bubble";
    if (name.includes("Merge")) return "Merge";
    if (name.includes("Binary")) return "Binary";
    return name.split(' ')[0];
  };

  const options = algorithmEntries.map(([id, algo]) => ({ id, name: algo.metadata.title.en }));
  const totalSteps = Math.max(leftStepIdx, rightStepIdx);
  const speedDeltaPercent = realResults.left ? (Math.abs(realResults.left.execution_time_ms - realResults.right!.execution_time_ms) / Math.max(realResults.left.execution_time_ms, realResults.right!.execution_time_ms)) * 100 : 0;

  const renderVisualizer = (side: 'left' | 'right', height = 200) => {
    const bars = side === 'left' ? leftBars : rightBars;
    const stepIdx = side === 'left' ? leftStepIdx : rightStepIdx;
    const trace = side === 'left' ? leftTrace : rightTrace;
    const step = trace[stepIdx];
    const highlights = step?.highlight_indices || [];

    // If graph/tree data exists, show a status message instead of bars
    if (step?.nodes_state && step.nodes_state.length > 0) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
          <DataVisualizer.Graph nodes={step.nodes_state} edges={step.edges_state || []} width={400} height={height - 40} activeNodeId={step.nodes_state.find((n: any) => n.state === 'active')?.id} statusMessage={step.description_en} />
        </div>
      );
    }

    if (bars.length > 0) {
      return <DataVisualizer.Bars data={bars} activeIndices={highlights} width="100%" height={height} />;
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="font-mono text-[10px] text-primary/60 uppercase">{step?.description_en || 'Awaiting data...'}</p>
      </div>
    );
  };

  return (
    <FullWidthLayout>
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="page-title-sm uppercase">{t.header.title} Calibration</h1>
          <p className="body-copy mt-2">{t.header.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportPdf} disabled={!showResults || isExporting} className={`bg-primary/5 border border-primary/20 p-2 px-4 flex items-center gap-2 hover:bg-primary/10 transition-all ${(!showResults || isExporting) ? 'opacity-30' : 'opacity-100'}`}>
            <FileDown size={14} className={isExporting ? "animate-bounce" : "text-primary"} />
            <span className="font-mono text-[10px] font-black text-primary uppercase">{isExporting ? "GENERATING..." : "EXPORT_REPORT"}</span>
          </button>
          <button onClick={handleShare} className="bg-primary/5 border border-primary/20 p-2 px-4 flex items-center gap-2 hover:bg-primary/10 transition-all">
            {copySuccess ? <Check size={14} className="text-green-600" /> : <Share2 size={14} className="text-primary" />}
            <span className="font-mono text-[10px] font-black text-primary uppercase">{copySuccess ? "LINK_COPIED" : "SHARE_SIMULATION"}</span>
          </button>
        </div>
      </header>

      <VersusHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="mt-6">
        <VersusAlgorithmSelector algorithmOptions={options} leftAlgorithmId={leftAlgorithmId} rightAlgorithmId={rightAlgorithmId} onLeftAlgorithmChange={setLeftAlgorithmId} onRightAlgorithmChange={setRightAlgorithmId} onExecute={() => handleExecute(false)} isExecuting={isExecuting} scenario={scenario} onScenarioChange={setScenario} />
      </div>

      <AnimatePresence>
        {(isVisualSim || isAnalysisMode) && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="fixed bottom-6 right-6 z-[100] w-[320px] bg-white/90 backdrop-blur-md border-2 border-primary shadow-[16px_16px_0px_rgba(30,58,138,0.1)] overflow-hidden">
            <div className="bg-primary text-white p-2 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><Terminal size={14} /><span className="font-mono text-[9px] font-black uppercase tracking-widest">Logic_Core_Log</span></div>
              <div className="flex items-center gap-2"><Zap size={10} className="text-white fill-current animate-pulse" /><span className="font-mono text-[8px] font-bold text-white/80">{totalSteps} STEPS</span></div>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="font-mono text-[8px] text-primary/40 uppercase font-black tracking-widest">Active_Simulation_Vector</span>
              <p className="font-mono text-xs text-primary font-black leading-relaxed">{leftMsg || rightMsg || "System Idle."}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="versus-report-area" className="mt-8 flex-1 flex flex-col gap-6 relative min-h-0 pb-32 bg-white">
        {showResults ? (
          <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-surface-container border-2 border-primary shadow-lg overflow-hidden mb-6">
              <div className="p-4 flex items-center justify-between border-b-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3"><div className="w-8 h-8 bg-primary flex items-center justify-center text-white shadow-sm"><RotateCcw size={16} /></div><div className="flex flex-col"><span className="font-mono text-[10px] font-black text-primary uppercase leading-none">ANALYSIS_LABORATORY</span><span className="font-mono text-[8px] text-primary/60 uppercase font-bold">Deep Logic Reconstruction</span></div></div>
                {!isAnalysisMode ? (<button onClick={() => handleExecute(true)} className="bg-primary text-white px-6 py-2 font-mono text-[10px] uppercase font-bold hover:bg-primary/90 transition-all shadow-[4px_4px_0px_#DCE6FF] flex items-center gap-2"><Play size={12} fill="currentColor" /> ACTIVATE_DEEP_ANALYSIS</button>) : (
                  <div className="flex items-center gap-3 bg-white border-2 border-primary p-1 px-3 shadow-sm">
                    <button onClick={() => togglePause()} className="w-8 h-8 flex items-center justify-center bg-primary text-white hover:scale-105 transition-transform">{isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}</button>
                    <button onClick={handleManualStepTrigger} disabled={!isPaused && !isManualStep} className={`w-8 h-8 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary/5 transition-colors ${(isPaused || isManualStep) ? 'opacity-100' : 'opacity-20'}`}><ChevronRight size={20} strokeWidth={3} /></button>
                    <div className="h-5 w-[1px] bg-primary/20 mx-1" /><button onClick={() => { setIsAnalysisMode(false); togglePause(false); }} className="font-mono text-[9px] text-primary font-black hover:underline uppercase">EXIT_LAB</button>
                  </div>
                )}
              </div>
              {isAnalysisMode && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-b-2 border-primary/10"><div className="grid grid-cols-2 divide-x-2 divide-primary/10 bg-white"><div className="p-4 flex flex-col gap-2"><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">{typedAlgorithmsData[leftAlgorithmId]?.metadata.title.en}</span><span className="font-mono text-[9px] bg-primary/10 text-primary px-2 py-0.5">{leftMsg}</span></div><div className="h-[200px] bg-surface-container-low/20 flex items-center justify-center overflow-hidden border border-primary/5">{renderVisualizer('left', 180)}</div></div><div className="p-4 flex flex-col gap-2"><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">{typedAlgorithmsData[rightAlgorithmId]?.metadata.title.en}</span><span className="font-mono text-[9px] bg-primary/10 text-primary px-2 py-0.5">{rightMsg}</span></div><div className="h-[200px] bg-surface-container-low/20 flex items-center justify-center overflow-hidden border border-primary/5">{renderVisualizer('right', 180)}</div></div></div></motion.div>)}
            </div>
            <div className="grid grid-cols-2 border-2 border-outline-variant/30 bg-surface-container-lowest overflow-hidden shrink-0">
              <VersusCompetitorLeft algorithm={typedAlgorithmsData[leftAlgorithmId]} isWinner={true} visualizer={renderVisualizer('left', 300)} summaryPoints={[`Domain: ${typedAlgorithmsData[leftAlgorithmId]?.metadata.category}`, `Time: ${typedAlgorithmsData[leftAlgorithmId]?.complexity.time.average.label}`, `Space: ${typedAlgorithmsData[leftAlgorithmId]?.complexity.space.label}`]} />
              <VersusCompetitorRight algorithm={typedAlgorithmsData[rightAlgorithmId]} isWinner={true} visualizer={renderVisualizer('right', 300)} summaryPoints={[`Domain: ${typedAlgorithmsData[rightAlgorithmId]?.metadata.category}`, `Time: ${typedAlgorithmsData[rightAlgorithmId]?.complexity.time.average.label}`, `Space: ${typedAlgorithmsData[rightAlgorithmId]?.complexity.space.label}`]} />
            </div>
            <div className="mt-8"><VersusCenterRadar leftName={getAbbr(typedAlgorithmsData[leftAlgorithmId]?.metadata.title.en || '')} rightName={getAbbr(typedAlgorithmsData[rightAlgorithmId]?.metadata.title.en || '')} speedDeltaPercent={speedDeltaPercent} /></div>
          </div>
        ) : isExecuting || isVisualSim ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/20 backdrop-blur-sm min-h-[400px]">
            {isVisualSim && (<div className="w-full h-full grid grid-cols-2 gap-12 p-8"><div className="flex flex-col gap-4"><div className="flex items-center justify-between"><p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em]">{typedAlgorithmsData[leftAlgorithmId]?.metadata.title.en}</p></div><div className="flex-1 border border-outline-variant/20 bg-white h-[300px] flex items-center justify-center">{renderVisualizer('left', 280)}</div></div><div className="flex flex-col gap-4"><div className="flex items-center justify-between"><p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em]">{typedAlgorithmsData[rightAlgorithmId]?.metadata.title.en}</p></div><div className="flex-1 border border-outline-variant/20 bg-white h-[300px] flex items-center justify-center">{renderVisualizer('right', 280)}</div></div></div>)}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/30 border-2 border-outline-variant/5 min-h-[300px]"><p className="font-mono text-[10px] uppercase tracking-[0.6em] text-on-surface-variant/40">System Awaiting Simulation</p></div>
        )}
      </div>
    </FullWidthLayout>
  );
}