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
import { Play, Pause, ChevronRight, RotateCcw, Terminal, Zap, Share2, Check } from "lucide-react";

// --- Types & Interfaces ---
type VersusAlgorithm = {
  id: string;
  title: { ar: string; en: string };
  category: string;
  complexity: { time: any; space: string; stable?: boolean; in_place?: boolean; };
  benchmarks?: { input_size: number; execution_time_ms: number; }[];
};

type SimDetails = {
  low: number;
  mid: number;
  high: number;
  excluded: [number, number][];
  msg: string;
  narrative?: string;
};

const typedAlgorithmsData = algorithmsData as unknown as Record<string, VersusAlgorithm>;

export default function VersusHubPage() {
  // --- Global UI State ---
  const [activeCategory, setActiveCategory] = useState("Sorting");
  const [scenario, setScenario] = useState("Random");
  const [targetValue, setTargetValue] = useState<string>("50");
  const [customData, setCustomData] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isVisualSim, setIsVisualSim] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);

  // --- REFS FOR REAL-TIME CONTROL ---
  const isPausedRef = useRef(false);
  const isManualStepRef = useRef(false);
  const stepResolversRef = useRef<(() => void)[]>([]);

  const [isPaused, setIsPausedState] = useState(false);
  const [isManualStep, setIsManualStepState] = useState(false);

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
  const [leftNodes, setLeftNodes] = useState<any[]>([]);
  const [rightNodes, setRightNodes] = useState<any[]>([]);
  const [leftEdges, setLeftEdges] = useState<any[]>([]);
  const [rightEdges, setRightEdges] = useState<any[]>([]);
  const [leftTree, setLeftTree] = useState<any>(null);
  const [rightTree, setRightTree] = useState<any>(null);
  const [leftPoints, setLeftPoints] = useState<any[]>([]);
  const [rightPoints, setRightPoints] = useState<any[]>([]);
  const [leftHull, setLeftHull] = useState<any[]>([]);
  const [rightHull, setRightHull] = useState<any[]>([]);
  const [leftActiveLine, setLeftActiveLine] = useState(-1);
  const [rightActiveLine, setRightActiveLine] = useState(-1);
  const [leftSimDetails, setLeftSimDetails] = useState<SimDetails>({ low: -1, mid: -1, high: -1, excluded: [], msg: "" });
  const [rightSimDetails, setRightSimDetails] = useState<SimDetails>({ low: -1, mid: -1, high: -1, excluded: [], msg: "" });
  const [realResults, setRealResults] = useState<{ left: BenchmarkResult | null; right: BenchmarkResult | null; }>({ left: null, right: null });

  // --- SYNC GATEWAY HELPER ---
  const waitStep = async (ms: number) => {
    if (isManualStepRef.current || isPausedRef.current) {
      return new Promise<void>(resolve => {
        stepResolversRef.current.push(resolve);
      });
    }
    await new Promise(resolve => setTimeout(resolve, ms));
  };

  // --- STRATEGIC DOMAIN MAP ---
  const ALGO_DOMAINS: Record<string, any> = {
    "Sorting": {
      generateData: (custom: string) => {
        if (custom) return custom.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        return Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
      },
      runSim: async (algoId: string, data: any, setters: any, details: any) => {
        const { setBars, setActiveLine } = setters;
        const arr = [...data];
        if (algoId === "bubble-sort") {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
              setActiveLine(j);
              const needsSwap = arr[j] > arr[j + 1];
              details((prev: SimDetails) => ({ ...prev, msg: `Comp: ${arr[j]} & ${arr[j + 1]}`, narrative: needsSwap ? `Target > Found. Swapping.` : `Validated.` }));
              if (needsSwap) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; setBars([...arr]); }
              await waitStep(200);
            }
          }
        } else if (algoId === "quick-sort") {
          const partition = async (a: number[], low: number, high: number) => {
            const pivot = a[high];
            details((prev: SimDetails) => ({ ...prev, msg: `Pivot: ${pivot}`, narrative: `Establishing partition.` }));
            let i = low - 1;
            for (let j = low; j < high; j++) {
              setActiveLine(j);
              const isSmaller = a[j] < pivot;
              details((prev: SimDetails) => ({ ...prev, msg: `Scan ${a[j]}`, narrative: isSmaller ? `${a[j]} < Pivot. Shifting left.` : `${a[j]} >= Pivot.` }));
              if (isSmaller) { i++;[a[i], a[j]] = [a[j], a[i]]; setBars([...a]); }
              await waitStep(200);
            }
            [a[i + 1], a[high]] = [a[high], a[i + 1]];
            setBars([...a]); await waitStep(200); return i + 1;
          };
          const sort = async (a: number[], low: number, high: number) => {
            if (low < high) { const pi = await partition(a, low, high); await sort(a, low, pi - 1); await sort(a, pi + 1, high); }
          };
          await sort(arr, 0, arr.length - 1);
        } else { for (let i = 0; i < 5; i++) { setActiveLine(i); await waitStep(400); } }
      }
    },
    "Search": {
      generateData: (custom: string, target: string) => {
        const targetNum = parseInt(target) || 50;
        let raw = custom ? custom.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)) : Array.from({ length: 19 }, () => Math.floor(Math.random() * 90) + 10);
        if (!raw.includes(targetNum)) raw.push(targetNum);
        return raw.sort((a, b) => a - b);
      },
      runSim: async (algoId: string, data: any, setters: any, detailsSetter: any, target: string) => {
        const { setActiveLine } = setters;
        const targetNum = parseInt(target);
        if (algoId === "binary-search") {
          let low = 0, high = data.length - 1;
          detailsSetter({ low, high, mid: -1, excluded: [], msg: "Search Init", narrative: "Binary scan started." });
          while (low <= high) {
            let mid = Math.floor((low + high) / 2); setActiveLine(mid);
            detailsSetter((prev: SimDetails) => ({ ...prev, low, high, mid, msg: `Mid: ${data[mid]}`, narrative: `Checking ${data[mid]} vs ${targetNum}.` }));
            await waitStep(1000);
            if (data[mid] === targetNum) { detailsSetter((prev: SimDetails) => ({ ...prev, msg: "FOUND!", narrative: "Match identified." })); break; }
            if (data[mid] < targetNum) {
              const oldLow = low; low = mid + 1;
              detailsSetter((prev: SimDetails) => ({ ...prev, low, excluded: [...prev.excluded, [oldLow, mid]], msg: "Too Low", narrative: "Pruning left half." }));
            } else {
              const oldHigh = high; high = mid - 1;
              detailsSetter((prev: SimDetails) => ({ ...prev, high, excluded: [...prev.excluded, [mid, oldHigh]], msg: "Too High", narrative: "Pruning right half." }));
            }
            await waitStep(800);
          }
        } else {
          detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Linear Scan", narrative: "Sequential search." });
          for (let i = 0; i < data.length; i++) {
            setActiveLine(i); const isMatch = data[i] === targetNum;
            detailsSetter((prev: SimDetails) => ({ ...prev, msg: `Read index ${i}`, narrative: isMatch ? "Match identified!" : "No match here." }));
            await waitStep(600); if (isMatch) break;
          }
        }
      }
    },
    "Trees": {
      generateData: (custom: string) => {
        const buildBST = (arr: number[]): any => {
          if (arr.length === 0) return null;
          const rootVal = arr[0];
          const node: any = { id: `node-${rootVal}`, value: rootVal, state: "default", children: [] };
          const left = buildBST(arr.slice(1).filter(v => v < rootVal));
          const right = buildBST(arr.slice(1).filter(v => v >= rootVal));
          if (left) node.children.push(left);
          if (right) node.children.push(right);
          return node;
        };
        const vals = custom ? custom.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)) : [80, 40, 120, 20, 60, 100, 140];
        return buildBST(vals);
      },
      runSim: async (algoId: string, data: any, setters: any, detailsSetter: any, target: string) => {
        const { setTree } = setters;
        const targetNum = parseInt(target);
        detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Tree Scan", narrative: "Navigating binary tree." });
        const searchNode = async (node: any) => {
          node.state = "active"; setTree({ ...data });
          const nodeVal = parseInt(node.value);
          if (nodeVal === targetNum) {
            detailsSetter((prev: SimDetails) => ({ ...prev, msg: "FOUND!", narrative: "Destination reached." }));
            node.state = "visited"; setTree({ ...data }); await waitStep(1000); return true;
          }
          if (targetNum < nodeVal) {
            detailsSetter((prev: SimDetails) => ({ ...prev, msg: `Left: ${targetNum} < ${nodeVal}`, narrative: "Following left branch." }));
            await waitStep(1000); node.state = "visited"; setTree({ ...data });
            const left = node.children?.find((c: any) => parseInt(c.value) < nodeVal);
            if (left) return await searchNode(left);
          } else {
            detailsSetter((prev: SimDetails) => ({ ...prev, msg: `Right: ${targetNum} > ${nodeVal}`, narrative: "Following right branch." }));
            await waitStep(1000); node.state = "visited"; setTree({ ...data });
            const right = node.children?.find((c: any) => parseInt(c.value) >= nodeVal);
            if (right) return await searchNode(right);
          }
          return false;
        };
        await searchNode(data);
      }
    },
    "Geometry": {
      generateData: (custom: string) => {
        if (custom) {
          const pairs = custom.split(';').map(p => p.trim()).filter(p => p !== "");
          return {
            points: pairs.map((pair, i) => {
              const [x, y] = pair.split(',').map(s => parseInt(s.trim()));
              return { id: `p${i}`, x: isNaN(x) ? 50 : x, y: isNaN(y) ? 50 : y, state: "default" as const };
            })
          };
        }
        return { points: Array.from({ length: 10 }, (_, i) => ({ id: `p${i}`, x: 50 + Math.random() * 350, y: 50 + Math.random() * 180, state: "default" as const })) };
      },
      runSim: async (algoId: string, data: any, setters: any, detailsSetter: any) => {
        const { setPoints, setHull } = setters;
        const pts = [...data.points];
        detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Spatial Analysis", narrative: "Scanning spatial coordinates." });
        const hull: any[] = [];
        for (let i = 0; i < pts.length; i++) {
          pts[i].state = "active"; detailsSetter((prev: SimDetails) => ({ ...prev, msg: `Node ${i}`, narrative: `Processing Point ${i}.` }));
          setPoints([...pts]); await waitStep(600);
          if (i > 0) {
            hull.push({ from: pts[i - 1], to: pts[i] });
            detailsSetter((prev: SimDetails) => ({ ...prev, msg: "Linking", narrative: "Establishing vector." }));
            setHull([...hull]);
          }
          pts[i].state = "highlight"; setPoints([...pts]); await waitStep(400);
        }
      }
    },
    "Graphs": {
      generateData: () => ({
        nodes: Array.from({ length: 8 }, (_, i) => ({ id: `n${i}`, label: `${i}`, x: 60 + (i % 4) * 110, y: 80 + Math.floor(i / 4) * 120, state: "default" as const })),
        edges: [{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }, { from: "n2", to: "n3" }, { from: "n0", to: "n4" }, { from: "n4", to: "n5" }, { from: "n5", to: "n6" }, { from: "n6", to: "n7" }, { from: "n3", to: "n7" }, { from: "n2", to: "n6" }]
      }),
      runSim: async (algoId: string, data: any, setters: any, detailsSetter: any, target: string) => {
        const { setNodes, setActiveLine } = setters;
        const nodes = [...data.nodes];
        detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Graph Scan", narrative: "Discovering topology." });
        for (let i = 0; i < nodes.length; i++) {
          nodes[i] = { ...nodes[i], state: "visited" as const };
          setNodes([...nodes]); setActiveLine(i);
          const isTarget = nodes[i].id === target;
          detailsSetter((prev: SimDetails) => ({ ...prev, msg: `Visit: ${nodes[i].label}`, narrative: isTarget ? "Found!" : `Verifying node ${nodes[i].label}.` }));
          await waitStep(800); if (isTarget) break;
        }
      }
    }
  };

  // --- UI Logics ---
  const algorithmEntries = useMemo(() => Object.entries(typedAlgorithmsData).filter(([_, algo]) => algo.category === activeCategory), [activeCategory]);
  const [leftAlgorithmId, setLeftAlgorithmId] = useState("");
  const [rightAlgorithmId, setRightAlgorithmId] = useState("");

  useEffect(() => {
    if (algorithmEntries.length > 0) {
      setLeftAlgorithmId(algorithmEntries[0][0]);
      setRightAlgorithmId(algorithmEntries[1] ? algorithmEntries[1][0] : algorithmEntries[0][0]);
      setShowResults(false);
    }
  }, [algorithmEntries]);

  useEffect(() => {
    setShowResults(false); setIsAnalysisMode(false);
    setLeftSimDetails({ low: -1, mid: -1, high: -1, excluded: [], msg: "" });
    setRightSimDetails({ low: -1, mid: -1, high: -1, excluded: [], msg: "" });
    setRealResults({ left: null, right: null });
  }, [targetValue, customData, scenario]);

  const handleExecute = async (isAnalysis = false) => {
    if (!leftAlgorithmId || !rightAlgorithmId) return;
    if (isAnalysis) { setIsAnalysisMode(true); isPausedRef.current = true; setIsPausedState(true); isManualStepRef.current = true; setIsManualStepState(true); }
    else { setIsExecuting(true); setShowResults(false); isPausedRef.current = false; setIsPausedState(false); isManualStepRef.current = false; setIsManualStepState(false); }

    stepResolversRef.current = [];
    const domain = ALGO_DOMAINS[activeCategory] || ALGO_DOMAINS["Sorting"];
    const simData = domain.generateData(customData, targetValue);

    if (activeCategory === "Sorting" || activeCategory === "Search") { setLeftBars([...simData]); setRightBars([...simData]); }
    else if (activeCategory === "Trees") { setLeftTree(JSON.parse(JSON.stringify(simData))); setRightTree(JSON.parse(JSON.stringify(simData))); }
    else if (activeCategory === "Geometry") { setLeftPoints([...simData.points]); setRightPoints([...simData.points]); setLeftHull([]); setRightHull([]); }
    else { setLeftNodes([...simData.nodes]); setLeftEdges([...simData.edges]); setRightNodes([...simData.nodes]); setRightEdges([...simData.edges]); }

    const benchmarkPromise = isAnalysis ? Promise.resolve([]) : Promise.all([
      runRealBenchmark(leftAlgorithmId, scenario, activeCategory === "Sorting" ? 2500 : 5000),
      runRealBenchmark(rightAlgorithmId, scenario, activeCategory === "Sorting" ? 2500 : 5000)
    ]);

    setIsVisualSim(true);
    const visualSimPromise = Promise.all([
      domain.runSim(leftAlgorithmId, simData, { setBars: setLeftBars, setActiveLine: setLeftActiveLine, setTree: setLeftTree, setPoints: setLeftPoints, setHull: setLeftHull, setNodes: setLeftNodes }, setLeftSimDetails, targetValue),
      domain.runSim(rightAlgorithmId, simData, { setBars: setRightBars, setActiveLine: setRightActiveLine, setTree: setRightTree, setPoints: setRightPoints, setHull: setRightHull, setNodes: setRightNodes }, setRightSimDetails, targetValue)
    ]);

    const [benchResults] = await Promise.all([benchmarkPromise, visualSimPromise]);
    if (!isAnalysis) { setRealResults({ left: benchResults[0], right: benchResults[1] }); setIsExecuting(false); }
    setIsVisualSim(false); setShowResults(true);
  };

  const options = algorithmEntries.map(([id, algo]) => ({ id, name: algo.title.en }));
  const leftBenchmark = realResults.left || { execution_time_ms: 0, input_size: 0 };
  const rightBenchmark = realResults.right || { execution_time_ms: 0, input_size: 0 };
  const leftIsWinner = leftBenchmark.execution_time_ms <= rightBenchmark.execution_time_ms;
  const rightIsWinner = rightBenchmark.execution_time_ms <= leftBenchmark.execution_time_ms;
  const speedDeltaPercent = Math.max(leftBenchmark.execution_time_ms, rightBenchmark.execution_time_ms) > 0 ? ((Math.abs(leftBenchmark.execution_time_ms - rightBenchmark.execution_time_ms)) / Math.max(leftBenchmark.execution_time_ms, rightBenchmark.execution_time_ms)) * 100 : 0;

  const renderVisualizer = (side: 'left' | 'right', height = 200) => {
    const isLeft = side === 'left';
    const bars = isLeft ? leftBars : rightBars;
    const activeLine = isLeft ? leftActiveLine : rightActiveLine;
    const details = isLeft ? leftSimDetails : rightSimDetails;
    const tree = isLeft ? leftTree : rightTree;
    const points = isLeft ? leftPoints : rightPoints;
    const hull = isLeft ? leftHull : rightHull;
    const nodes = isLeft ? leftNodes : rightNodes;
    const edges = isLeft ? leftEdges : rightEdges;

    if (activeCategory === "Trees") return <DataVisualizer.Tree root={tree} targetNodeId={targetValue} statusMessage={details.msg} width="100%" height={height} />;
    if (activeCategory === "Geometry") return <DataVisualizer.Geometry points={points} hullLines={hull} statusMessage={details.msg} width="100%" height={height} />;
    if (activeCategory === "Search") return <DataVisualizer.Array data={bars} activeIndex={activeLine} targetIndex={bars.indexOf(parseInt(targetValue))} lowIndex={details.low} midIndex={details.mid} highIndex={details.high} excludedRanges={details.excluded} statusMessage={details.msg} width="100%" height={height} />;
    if (activeCategory === "Graphs") return <DataVisualizer.Graph nodes={nodes} edges={edges} activeNodeId={nodes[activeLine]?.id} targetNodeId={targetValue} statusMessage={details.msg} width="100%" height={height} />;
    return <DataVisualizer.Bars data={bars} activeIndices={[activeLine]} width="100%" height={height} />;
  };

  return (
    <FullWidthLayout>
      <header className="mb-8 shrink-0">
        <h1 className="page-title-sm uppercase">VERSUS_HUB Calibration</h1>
        <p className="body-copy mt-2">Configure parameters for comparative analysis.</p>
      </header>

      <VersusHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="mt-6">
        <VersusAlgorithmSelector
          algorithmOptions={options}
          leftAlgorithmId={leftAlgorithmId}
          rightAlgorithmId={rightAlgorithmId}
          onLeftAlgorithmChange={setLeftAlgorithmId}
          onRightAlgorithmChange={setRightAlgorithmId}
          onExecute={() => handleExecute(false)}
          isExecuting={isExecuting}
          scenario={scenario}
          onScenarioChange={setScenario}
        />
      </div>

      {/* --- PERSISTENT OPERATION LOG (BOTTOM RIGHT) --- */}
      <AnimatePresence>
        {(isVisualSim || isAnalysisMode) && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="fixed bottom-6 right-6 z-[100] w-[300px] bg-white/80 backdrop-blur-md border-2 border-primary shadow-[12px_12px_0px_rgba(30,58,138,0.1)] overflow-hidden">
            <div className="bg-primary text-white p-2 px-4 flex items-center gap-2">
              <Terminal size={14} />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">Operation_Log_Stream</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="font-mono text-[8px] text-primary/40 uppercase font-black">Active_Logic_Vector</span>
              <p className="font-mono text-xs text-primary font-black leading-relaxed">
                {leftSimDetails.narrative || rightSimDetails.narrative || "System Idle."}
              </p>
            </div>
            <div className="bg-primary/5 p-2 px-4 border-t border-primary/10 flex justify-between items-center">
              <span className="font-mono text-[8px] text-primary/60 font-bold uppercase">Status_Normal</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-primary/40 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex-1 flex flex-col gap-6 relative min-h-0 pb-32">
        {showResults ? (
          <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-300">

            <div className="bg-surface-container border-2 border-primary shadow-lg overflow-hidden mb-6">
              <div className="p-4 flex items-center justify-between border-b-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center text-white shadow-sm">
                    <RotateCcw size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-black text-primary uppercase leading-none">ANALYSIS_LABORATORY</span>
                    <span className="font-mono text-[8px] text-primary/60 uppercase font-bold">Inspection Scope Active</span>
                  </div>
                </div>
                {!isAnalysisMode ? (
                  <button onClick={() => handleExecute(true)} className="bg-primary text-white px-6 py-2 font-mono text-[10px] uppercase font-bold hover:bg-primary/90 transition-all shadow-[4px_4px_0px_#DCE6FF] flex items-center gap-2">
                    <Play size={12} fill="currentColor" /> ACTIVATE_ANALYSIS
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-white border-2 border-primary p-1 px-3 shadow-sm">
                    <button onClick={() => togglePause()} className="w-8 h-8 flex items-center justify-center bg-primary text-white hover:scale-105 transition-transform">
                      {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                    </button>
                    <button onClick={handleManualStepTrigger} disabled={!isPaused && !isManualStep} className={`w-8 h-8 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary/5 transition-colors ${(isPaused || isManualStep) ? 'opacity-100' : 'opacity-20'}`}>
                      <ChevronRight size={20} strokeWidth={3} />
                    </button>
                    <div className="h-5 w-[1px] bg-primary/20 mx-1" />
                    <button onClick={() => { setIsAnalysisMode(false); togglePause(false); }} className="font-mono text-[9px] text-primary font-black hover:underline uppercase">EXIT_LAB</button>
                  </div>
                )}
              </div>

              {isAnalysisMode && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-b-2 border-primary/10">
                  <div className="grid grid-cols-2 divide-x-2 divide-primary/10 bg-white">
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">{typedAlgorithmsData[leftAlgorithmId].title.en}</span>
                        <span className="font-mono text-[9px] bg-primary/10 text-primary px-2 py-0.5">{leftSimDetails.msg}</span>
                      </div>
                      <div className="h-[180px] bg-surface-container-low/20 flex items-center justify-center overflow-hidden border border-primary/5">
                        {renderVisualizer('left', 160)}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">{typedAlgorithmsData[rightAlgorithmId].title.en}</span>
                        <span className="font-mono text-[9px] bg-primary/10 text-primary px-2 py-0.5">{rightSimDetails.msg}</span>
                      </div>
                      <div className="h-[180px] bg-surface-container-low/20 flex items-center justify-center overflow-hidden border border-primary/5">
                        {renderVisualizer('right', 160)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-2 border-2 border-outline-variant/30 bg-surface-container-lowest overflow-hidden shrink-0">
              <VersusCompetitorLeft algorithm={typedAlgorithmsData[leftAlgorithmId]} isWinner={leftIsWinner} visualizer={renderVisualizer('left', 300)} summaryPoints={[`Domain: ${typedAlgorithmsData[leftAlgorithmId].category}`, `Time: ${typedAlgorithmsData[leftAlgorithmId].complexity.time}`, `Space: ${typedAlgorithmsData[leftAlgorithmId].complexity.space}`]} />
              <VersusCompetitorRight algorithm={typedAlgorithmsData[rightAlgorithmId]} isWinner={rightIsWinner} visualizer={renderVisualizer('right', 300)} summaryPoints={[`Domain: ${typedAlgorithmsData[rightAlgorithmId].category}`, `Time: ${typedAlgorithmsData[rightAlgorithmId].complexity.time}`, `Space: ${typedAlgorithmsData[rightAlgorithmId].complexity.space}`]} />
            </div>

            <div className="mt-8">
              <VersusCenterRadar leftName={typedAlgorithmsData[leftAlgorithmId].title.en} rightName={typedAlgorithmsData[rightAlgorithmId].title.en} speedDeltaPercent={speedDeltaPercent} />
            </div>
          </div>
        ) : isExecuting || isVisualSim ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/20 backdrop-blur-sm relative overflow-hidden min-h-[400px]">
            {isVisualSim && (
              <div className="w-full h-full grid grid-cols-2 gap-12 p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em]">{typedAlgorithmsData[leftAlgorithmId].title.en}</p>
                    <span className="font-mono text-[9px] bg-primary text-white px-2 py-0.5">{leftSimDetails.msg}</span>
                  </div>
                  <div className="flex-1 border border-outline-variant/20 bg-white relative overflow-hidden h-[300px] flex items-center justify-center">
                    {renderVisualizer('left', 280)}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em]">{typedAlgorithmsData[rightAlgorithmId].title.en}</p>
                    <span className="font-mono text-[9px] bg-primary text-white px-2 py-0.5">{rightSimDetails.msg}</span>
                  </div>
                  <div className="flex-1 border border-outline-variant/20 bg-white relative overflow-hidden h-[300px] flex items-center justify-center">
                    {renderVisualizer('right', 280)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/30 border-2 border-outline-variant/5 min-h-[300px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-on-surface-variant/40">Awaiting Simulation Trigger</p>
          </div>
        )}
      </div>
    </FullWidthLayout>
  );
}