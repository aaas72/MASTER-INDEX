"use client";

import { useMemo, useState, useEffect } from "react";
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
};

const typedAlgorithmsData = algorithmsData as unknown as Record<string, VersusAlgorithm>;

// --- Helper: Sleep ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- STRATEGIC DOMAIN MAP ---
// This centralizes the specific logic for each algorithm category
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
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              setBars([...arr]);
              await sleep(50);
            }
          }
        }
      } else if (algoId === "quick-sort") {
        const partition = async (a: number[], low: number, high: number) => {
          const pivot = a[high];
          let i = low - 1;
          for (let j = low; j < high; j++) {
            setActiveLine(j);
            if (a[j] < pivot) {
              i++;
              [a[i], a[j]] = [a[j], a[i]];
              setBars([...a]);
              await sleep(50);
            }
          }
          [a[i + 1], a[high]] = [a[high], a[i + 1]];
          setBars([...a]);
          await sleep(50);
          return i + 1;
        };
        const sort = async (a: number[], low: number, high: number) => {
          if (low < high) {
            const pi = await partition(a, low, high);
            await sort(a, low, pi - 1);
            await sort(a, pi + 1, high);
          }
        };
        await sort(arr, 0, arr.length - 1);
      } else {
        // Fallback for others
        for (let i = 0; i < 5; i++) { setActiveLine(i); await sleep(200); }
      }
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
        detailsSetter({ low, high, mid: -1, excluded: [], msg: "Initializing Sorted Search..." });
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          setActiveLine(mid);
          detailsSetter((prev: any) => ({ ...prev, low, high, mid, msg: `Inspecting Midpoint ${mid}: ${data[mid]}` }));
          await sleep(800);
          if (data[mid] === targetNum) {
            detailsSetter((prev: any) => ({ ...prev, msg: "TARGET_FOUND: OPTIMAL_MATCH" }));
            break;
          }
          if (data[mid] < targetNum) {
            const oldLow = low; low = mid + 1;
            detailsSetter((prev: any) => ({ ...prev, low, excluded: [...prev.excluded, [oldLow, mid]], msg: `Target > ${data[mid]}: Pruning Left Half` }));
          } else {
            const oldHigh = high; high = mid - 1;
            detailsSetter((prev: any) => ({ ...prev, high, excluded: [...prev.excluded, [mid, oldHigh]], msg: `Target < ${data[mid]}: Pruning Right Half` }));
          }
          await sleep(600);
        }
      } else {
        detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Starting Linear Scan..." });
        for (let i = 0; i < data.length; i++) {
          setActiveLine(i);
          detailsSetter((prev: any) => ({ ...prev, msg: `Checking Index ${i}: ${data[i]}` }));
          await sleep(400);
          if (data[i] === targetNum) {
            detailsSetter((prev: any) => ({ ...prev, msg: "TARGET_FOUND: MATCH!" }));
            break;
          }
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
      detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Starting BST Search Navigation..." });
      const searchNode = async (node: any) => {
        node.state = "active"; setTree({ ...data });
        const nodeVal = parseInt(node.value);
        if (nodeVal === targetNum) {
          detailsSetter((prev: any) => ({ ...prev, msg: `TARGET_FOUND: Node ${nodeVal} matches!` }));
          node.state = "visited"; setTree({ ...data });
          await sleep(800); return true;
        }
        if (targetNum < nodeVal) {
          detailsSetter((prev: any) => ({ ...prev, msg: `Target ${targetNum} < ${nodeVal}: Moving LEFT` }));
          await sleep(800); node.state = "visited"; setTree({ ...data });
          const left = node.children?.find((c: any) => parseInt(c.value) < nodeVal);
          if (left) return await searchNode(left);
        } else {
          detailsSetter((prev: any) => ({ ...prev, msg: `Target ${targetNum} > ${nodeVal}: Moving RIGHT` }));
          await sleep(800); node.state = "visited"; setTree({ ...data });
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
      return {
        points: Array.from({ length: 10 }, (_, i) => ({ id: `p${i}`, x: 50 + Math.random() * 350, y: 50 + Math.random() * 180, state: "default" as const }))
      };
    },
    runSim: async (algoId: string, data: any, setters: any, detailsSetter: any) => {
      const { setPoints, setHull } = setters;
      const pts = [...data.points];
      detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Calculating Geometric Hull..." });
      const hull: any[] = [];
      for (let i = 0; i < pts.length; i++) {
        pts[i].state = "active"; detailsSetter((prev: any) => ({ ...prev, msg: `Analyzing Point P[${i}]` }));
        setPoints([...pts]); await sleep(400);
        if (i > 0) {
          hull.push({ from: pts[i-1], to: pts[i] });
          detailsSetter((prev: any) => ({ ...prev, msg: `Vector Connection: P[${i-1}] → P[${i}]` }));
          setHull([...hull]);
        }
        pts[i].state = "highlight"; setPoints([...pts]); await sleep(200);
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
      detailsSetter({ low: -1, mid: -1, high: -1, excluded: [], msg: "Exploring Topology Scan..." });
      for (let i = 0; i < nodes.length; i++) {
        nodes[i] = { ...nodes[i], state: "visited" as const };
        setNodes([...nodes]); setActiveLine(i);
        detailsSetter((prev: any) => ({ ...prev, msg: `Exploring Node: ${nodes[i].label}` }));
        if (nodes[i].id === target) {
          detailsSetter((prev: any) => ({ ...prev, msg: "TARGET_FOUND: REACHED" }));
          break;
        }
        await sleep(600);
      }
    }
  }
};

export default function VersusHubPage() {
  // --- Global UI State ---
  const [activeCategory, setActiveCategory] = useState("Sorting");
  const [scenario, setScenario] = useState("Random");
  const [targetValue, setTargetValue] = useState<string>("50");
  const [customData, setCustomData] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isVisualSim, setIsVisualSim] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

  // --- Algorithm Selection Logic ---
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
    setShowResults(false);
    setLeftSimDetails({ low: -1, mid: -1, high: -1, excluded: [], msg: "" });
    setRightSimDetails({ low: -1, mid: -1, high: -1, excluded: [], msg: "" });
    setRealResults({ left: null, right: null });
  }, [targetValue, customData, scenario]);

  // --- STRATEGIC EXECUTION ENGINE ---
  const handleExecute = async () => {
    if (!leftAlgorithmId || !rightAlgorithmId) return;

    setIsExecuting(true);
    setShowResults(false);

    // 1. Domain Discovery
    const domain = ALGO_DOMAINS[activeCategory] || ALGO_DOMAINS["Sorting"];
    const simData = domain.generateData(customData, targetValue);

    // 2. State Initialization
    if (activeCategory === "Sorting" || activeCategory === "Search") {
      setLeftBars([...simData]); setRightBars([...simData]);
    } else if (activeCategory === "Trees") {
      setLeftTree(JSON.parse(JSON.stringify(simData))); setRightTree(JSON.parse(JSON.stringify(simData)));
    } else if (activeCategory === "Geometry") {
      setLeftPoints([...simData.points]); setRightPoints([...simData.points]);
      setLeftHull([]); setRightHull([]);
    } else {
      setLeftNodes([...simData.nodes]); setLeftEdges([...simData.edges]);
      setRightNodes([...simData.nodes]); setRightEdges([...simData.edges]);
    }

    // 3. Parallel Execution (Benchmark + Visual Sim)
    const benchmarkPromise = Promise.all([
      runRealBenchmark(leftAlgorithmId, scenario, activeCategory === "Sorting" ? 2500 : 5000),
      runRealBenchmark(rightAlgorithmId, scenario, activeCategory === "Sorting" ? 2500 : 5000)
    ]);

    setIsVisualSim(true);
    const visualSimPromise = Promise.all([
      domain.runSim(leftAlgorithmId, simData, { setBars: setLeftBars, setActiveLine: setLeftActiveLine, setTree: setLeftTree, setPoints: setLeftPoints, setHull: setLeftHull, setNodes: setLeftNodes }, setLeftSimDetails, targetValue),
      domain.runSim(rightAlgorithmId, simData, { setBars: setRightBars, setActiveLine: setRightActiveLine, setTree: setRightTree, setPoints: setRightPoints, setHull: setRightHull, setNodes: setRightNodes }, setRightSimDetails, targetValue)
    ]);

    const [benchResults] = await Promise.all([benchmarkPromise, visualSimPromise]);

    setRealResults({ left: benchResults[0], right: benchResults[1] });
    setIsVisualSim(false);
    setIsExecuting(false);
    setShowResults(true);
  };

  const leftBenchmark = realResults.left || { execution_time_ms: 0, input_size: 0 };
  const rightBenchmark = realResults.right || { execution_time_ms: 0, input_size: 0 };
  const leftIsWinner = leftBenchmark.execution_time_ms <= rightBenchmark.execution_time_ms;
  const rightIsWinner = rightBenchmark.execution_time_ms <= leftBenchmark.execution_time_ms;
  const slowerTime = Math.max(leftBenchmark.execution_time_ms, rightBenchmark.execution_time_ms);
  const fasterTime = Math.min(leftBenchmark.execution_time_ms, rightBenchmark.execution_time_ms);
  const speedDeltaPercent = slowerTime > 0 ? ((slowerTime - fasterTime) / slowerTime) * 100 : 0;

  const getAlgorithmSummary = (id: string): string[] => {
    const typedData = typedAlgorithmsData[id];
    if (!typedData) return ["Strategy finalized.", "Parameters validated.", "Benchmark complete."];
    return [
      `Algorithmic Domain: ${typedData.category}`,
      `Time Complexity: ${typedData.complexity.time}`,
      `Space Complexity: ${typedData.complexity.space}`
    ];
  };

  const options = algorithmEntries.map(([id, algo]) => ({ id, name: algo.title.en }));

  return (
    <FullWidthLayout>
      <header className="mb-8 shrink-0">
        <h1 className="page-title-sm uppercase">VERSUS_HUB Calibration</h1>
        <p className="body-copy mt-2">Configure your comparative analysis parameters below.</p>
      </header>

      <VersusHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="mt-6">
        <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 block">
          [Selection_Matrix] Select Competitors & Scenario
        </label>
        <VersusAlgorithmSelector
          algorithmOptions={options}
          leftAlgorithmId={leftAlgorithmId}
          rightAlgorithmId={rightAlgorithmId}
          onLeftAlgorithmChange={setLeftAlgorithmId}
          onRightAlgorithmChange={setRightAlgorithmId}
          onExecute={handleExecute}
          isExecuting={isExecuting}
          scenario={scenario}
          onScenarioChange={setScenario}
        />
      </div>

      {(activeCategory === "Search" || activeCategory === "Graphs" || activeCategory === "Trees" || activeCategory === "Sorting" || activeCategory === "Geometry") && !isExecuting && (
        <div className="mt-6">
            <div className="bg-surface-container-low border border-outline-variant/30 p-4 flex flex-col gap-4 shadow-sm z-10 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Target_Val:</span>
                  <input 
                    type="text" value={targetValue} onChange={(e) => setTargetValue(e.target.value)}
                    placeholder={activeCategory === "Graphs" ? "Node ID (A, B...)" : "Value (e.g. 50)"}
                    className="bg-white border border-outline-variant px-3 py-1 font-mono text-sm focus:outline-none focus:border-primary transition-colors w-32"
                  />
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Custom_Data:</span>
                  <input 
                    type="text" value={customData} onChange={(e) => setCustomData(e.target.value)}
                    placeholder={
                      activeCategory === "Trees" ? "Tree Nodes (e.g. 80, 40, 120)" : 
                      activeCategory === "Geometry" ? "Points (e.g. 50,50 ; 100,150)" :
                      "Custom Array (e.g. 10, 25, 40, 99)"
                    }
                    className="bg-white border border-outline-variant px-3 py-1 font-mono text-sm focus:outline-none focus:border-primary transition-colors flex-1"
                  />
                </div>
              </div>
              <p className="font-mono text-[9px] text-secondary/60">
                {activeCategory === "Sorting" ? "Enter a custom array of numbers to observe sorting performance." : 
                 activeCategory === "Search" ? "Enter numbers separated by commas for a custom search array." : 
                 activeCategory === "Trees" ? "Enter a comma-separated list of numbers to build a custom BST." :
                 activeCategory === "Geometry" ? "Enter coordinate pairs separated by semicolons (e.g., 100,50 ; 200,150)." :
                 "Specify the destination node ID for pathfinding and topology traversal analysis."}
              </p>
            </div>
        </div>
      )}

      <div className="mt-8 flex-1 flex flex-col gap-6 relative min-h-0 transition-all duration-500">
        {!typedAlgorithmsData[leftAlgorithmId] || !typedAlgorithmsData[rightAlgorithmId] ? (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-outline-variant/30 font-mono text-on-surface-variant uppercase tracking-widest text-sm bg-surface-container-low/50 min-h-[300px]">
            Insufficient data for comparison in this category
          </div>
        ) : !showResults && !isExecuting ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/30 border-2 border-outline-variant/5 min-h-[300px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-on-surface-variant/40">Awaiting Simulation Trigger</p>
          </div>
        ) : isExecuting || isVisualSim ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/20 backdrop-blur-sm relative overflow-hidden min-h-[400px]">
             {isVisualSim && (
               <div className="w-full h-full grid grid-cols-2 gap-12 p-8">
                  <div className="flex flex-col gap-4">
                     <p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] mb-2">{typedAlgorithmsData[leftAlgorithmId].title.en} Execution</p>
                     <div className="flex-1 border border-outline-variant/20 bg-white relative overflow-hidden h-[300px]">
                        <div className="flex items-center justify-center h-full w-full px-4">
                           {activeCategory === "Trees" ? <DataVisualizer.Tree root={leftTree} targetNodeId={targetValue} statusMessage={leftSimDetails.msg} width={450} height={280} /> :
                            activeCategory === "Geometry" ? <DataVisualizer.Geometry points={leftPoints} hullLines={leftHull} statusMessage={leftSimDetails.msg} width={450} height={280} /> :
                            activeCategory === "Search" ? <DataVisualizer.Array data={leftBars} activeIndex={leftActiveLine} targetIndex={leftBars.indexOf(parseInt(targetValue))} lowIndex={leftSimDetails.low} midIndex={leftSimDetails.mid} highIndex={leftSimDetails.high} excludedRanges={leftSimDetails.excluded} statusMessage={leftSimDetails.msg} width="100%" height={200} /> :
                            activeCategory === "Graphs" ? <DataVisualizer.Graph nodes={leftNodes} edges={leftEdges} activeNodeId={leftNodes[leftActiveLine]?.id} targetNodeId={targetValue} statusMessage={leftSimDetails.msg} width="100%" height={200} /> :
                            <DataVisualizer.Bars data={leftBars} activeIndices={[leftActiveLine]} width={450} height={280} />}
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-4">
                     <p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] mb-2">{typedAlgorithmsData[rightAlgorithmId].title.en} Execution</p>
                     <div className="flex-1 border border-outline-variant/20 bg-white relative overflow-hidden h-[300px]">
                        <div className="flex items-center justify-center h-full w-full px-4">
                           {activeCategory === "Trees" ? <DataVisualizer.Tree root={rightTree} targetNodeId={targetValue} statusMessage={rightSimDetails.msg} width={450} height={280} /> :
                            activeCategory === "Geometry" ? <DataVisualizer.Geometry points={rightPoints} hullLines={rightHull} statusMessage={rightSimDetails.msg} width={450} height={280} /> :
                            activeCategory === "Search" ? <DataVisualizer.Array data={rightBars} activeIndex={rightActiveLine} targetIndex={rightBars.indexOf(parseInt(targetValue))} lowIndex={rightSimDetails.low} midIndex={rightSimDetails.mid} highIndex={rightSimDetails.high} excludedRanges={rightSimDetails.excluded} statusMessage={rightSimDetails.msg} width="100%" height={200} /> :
                            activeCategory === "Graphs" ? <DataVisualizer.Graph nodes={rightNodes} edges={rightEdges} activeNodeId={rightNodes[rightActiveLine]?.id} targetNodeId={targetValue} statusMessage={rightSimDetails.msg} width="100%" height={200} /> :
                            <DataVisualizer.Bars data={rightBars} activeIndices={[rightActiveLine]} width={450} height={280} />}
                        </div>
                     </div>
                  </div>
               </div>
             )}
             {!isVisualSim && (
               <div className="flex flex-col items-center">
                 <div className="flex items-center gap-4 mb-6">
                   {[0, 1, 2, 3, 4].map((i) => <div key={i} className="w-3 h-3 bg-primary animate-[pulse_1.5s_infinite_ease-in-out]" style={{ animationDelay: `${i * 0.15}s`, opacity: 1 - (i * 0.15) }} />)}
                 </div>
                 <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-on-surface-variant animate-pulse">Processing_Benchmark_Data...</p>
               </div>
             )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-2 border-2 border-outline-variant/30 bg-surface-container-lowest overflow-hidden shrink-0">
              <VersusCompetitorLeft 
                algorithm={typedAlgorithmsData[leftAlgorithmId]} isWinner={leftIsWinner} 
                visualizer={
                  activeCategory === "Trees" ? <DataVisualizer.Tree root={leftTree} targetNodeId={targetValue} statusMessage={leftSimDetails.msg} width="100%" height={300} /> :
                  activeCategory === "Geometry" ? <DataVisualizer.Geometry points={leftPoints} hullLines={leftHull} statusMessage={leftSimDetails.msg} width="100%" height={300} /> :
                  activeCategory === "Search" ? <DataVisualizer.Array data={leftBars} activeIndex={leftActiveLine} targetIndex={leftBars.indexOf(parseInt(targetValue))} lowIndex={leftSimDetails.low} midIndex={leftSimDetails.mid} highIndex={leftSimDetails.high} excludedRanges={leftSimDetails.excluded} statusMessage={leftSimDetails.msg} width="100%" height={200} /> :
                  activeCategory === "Graphs" ? <DataVisualizer.Graph nodes={leftNodes} edges={leftEdges} activeNodeId={leftNodes[leftActiveLine]?.id} targetNodeId={targetValue} statusMessage={leftSimDetails.msg} width="100%" height={200} /> :
                  <DataVisualizer.Bars data={leftBars} activeIndices={[leftActiveLine]} width="100%" height={300} />
                }
                summaryPoints={getAlgorithmSummary(leftAlgorithmId)}
              />
              <VersusCompetitorRight 
                algorithm={typedAlgorithmsData[rightAlgorithmId]} isWinner={rightIsWinner} 
                visualizer={
                  activeCategory === "Trees" ? <DataVisualizer.Tree root={rightTree} targetNodeId={targetValue} statusMessage={rightSimDetails.msg} width="100%" height={300} /> :
                  activeCategory === "Geometry" ? <DataVisualizer.Geometry points={rightPoints} hullLines={rightHull} statusMessage={rightSimDetails.msg} width="100%" height={300} /> :
                  activeCategory === "Search" ? <DataVisualizer.Array data={rightBars} activeIndex={rightActiveLine} targetIndex={rightBars.indexOf(parseInt(targetValue))} lowIndex={rightSimDetails.low} midIndex={rightSimDetails.mid} highIndex={rightSimDetails.high} excludedRanges={rightSimDetails.excluded} statusMessage={rightSimDetails.msg} width="100%" height={200} /> :
                  activeCategory === "Graphs" ? <DataVisualizer.Graph nodes={rightNodes} edges={rightEdges} activeNodeId={rightNodes[rightActiveLine]?.id} targetNodeId={targetValue} statusMessage={rightSimDetails.msg} width="100%" height={200} /> :
                  <DataVisualizer.Bars data={rightBars} activeIndices={[rightActiveLine]} width="100%" height={300} />
                }
                summaryPoints={getAlgorithmSummary(rightAlgorithmId)}
              />
            </div>
            <VersusCenterRadar leftName={typedAlgorithmsData[leftAlgorithmId].title.en} rightName={typedAlgorithmsData[rightAlgorithmId].title.en} speedDeltaPercent={speedDeltaPercent} />
            <div className="shrink-0 flex justify-between font-mono text-xs text-on-surface-variant uppercase border-t border-outline-variant/20 pt-6 pb-4">
              <div className="space-y-1">
                <p>Data Source: Local Runtime Environment</p>
                <p className="text-primary font-bold">ΔPerformance Velocity: {speedDeltaPercent.toFixed(1)}%</p>
              </div>
              <div className="text-right space-y-1">
                <p>Sample Complexity: N={Math.max(leftBenchmark.input_size, rightBenchmark.input_size).toLocaleString('en-US')}</p>
                <p>Status: Analysis Complete</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </FullWidthLayout>
  );
}