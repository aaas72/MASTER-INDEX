"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useDragControls, useMotionValue } from "framer-motion";
import CodePanel from "@/components/playground/CodePanel";
import HistorySlider from "@/components/playground/HistorySlider";
import { DataVisualizer } from "@/components/visualizer";
import algorithmsData from "@/data/algorithms.json";
import { playground as t } from "@/locales/en/playground";
import { Algorithm } from "@/types/algorithm";
import { generateSimulation } from "@/lib/engine/simulator";

type NodePoint = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type Edge = {
  from: string;
  to: string;
  weight?: number;
};

type Snapshot = {
  bars: number[];
  nodes: NodePoint[];
  edges: Edge[];
  opsCount: { comparisons: number; swaps: number; steps: number };
  activeLine: number;
  log: string;
};

const ALGORITHM_OPTIONS = Object.keys(algorithmsData);

const DEFAULT_ARRAY = [45, 12, 89, 34, 67, 23, 91, 56, 78, 10];
const DEFAULT_NODES: NodePoint[] = [
  { id: "n1", label: "N1", x: 1500, y: 1400 },
  { id: "n2", label: "N2", x: 1700, y: 1450 },
  { id: "n3", label: "N3", x: 1900, y: 1420 },
  { id: "n4", label: "N4", x: 1600, y: 1650 },
  { id: "n5", label: "N5", x: 1850, y: 1680 },
];

const DEFAULT_EDGES: Edge[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n1", to: "n4" },
  { from: "n4", to: "n5" },
  { from: "n3", to: "n5" },
];

const parseInputArray = (rawInput: string, fallbackSize: number) => {
  const values = rawInput
    .replace(/\[|\]/g, "")
    .split(",")
    .map((chunk) => Number(chunk.trim()))
    .filter((num) => Number.isFinite(num) && num > 0);

  if (values.length > 1) {
    return values.slice(0, 32);
  }

  return Array.from({ length: fallbackSize }, (_, index) =>
    Math.max(8, Math.round((Math.sin(index * 1.37) + 1.3) * 34 + ((index * 11) % 26))),
  );
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function PlaygroundPage() {
  const SIDEBAR_WIDTH = 240;
  const CONSOLE_HEADER_HEIGHT = 40;
  const CONSOLE_BODY_HEIGHT = 160;
  
  const CANVAS_WIDTH = 4000;
  const CANVAS_HEIGHT = 4000;

  const [algorithm, setAlgorithm] = useState(ALGORITHM_OPTIONS[0]);
  const [speed, setSpeed] = useState(420);
  const [dataSize, setDataSize] = useState(10);
  const [inputValue, setInputValue] = useState("[45, 12, 89, 34, 67, 23, 91, 56, 78, 10]");
  const [bars, setBars] = useState<number[]>(DEFAULT_ARRAY);
  const [nodes, setNodes] = useState<NodePoint[]>(DEFAULT_NODES);
  const [edges, setEdges] = useState<Edge[]>(DEFAULT_EDGES);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  
  const [opsCount, setOpsCount] = useState({ comparisons: 0, swaps: 0, steps: 0 });
  const [isComplete, setIsComplete] = useState(false);
  
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const [logs, setLogs] = useState<string[]>(["LOG: SYSTEM_READY."]);
  const [isRunning, setIsRunning] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [activeLine, setActiveLine] = useState(-1);
  
  // High-performance MotionValues for cursor and preview lines
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const barsDragControls = useDragControls();
  const [isLongPressingBars, setIsLongPressingBars] = useState(false);
  const barsLongPressTimer = useRef<NodeJS.Timeout | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const currentAlgoConfig = useMemo(() => (algorithmsData as unknown as Record<string, Algorithm>)[algorithm], [algorithm]);
  const isGraphMode = useMemo(() => currentAlgoConfig?.visualizer_config?.type === 'graph', [currentAlgoConfig]);

  const pushLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
    const formattedLog = `[${timestamp}] ${message}`;
    setLogs((prev) => [formattedLog, ...prev].slice(0, 120));
    return formattedLog;
  }, []);

  const takeSnapshot = useCallback((line: number, currentBars: number[], currentNodes: NodePoint[], currentEdges: Edge[], currentOps: { comparisons: number; swaps: number; steps: number }, logMsg?: string) => {
    const log = logMsg ? pushLog(logMsg) : (logs[0] || "");
    const newSnapshot: Snapshot = {
      bars: [...currentBars],
      nodes: JSON.parse(JSON.stringify(currentNodes)),
      edges: JSON.parse(JSON.stringify(currentEdges)),
      opsCount: { ...currentOps },
      activeLine: line,
      log
    };
    setHistory(prev => [...prev, newSnapshot]);
    setCurrentStepIndex(prev => prev + 1);
    setActiveLine(line);
  }, [logs, pushLog]);

  const goToStep = (index: number) => {
    if (index < 0 || index >= history.length) return;
    const snap = history[index];
    setBars(snap.bars);
    setNodes(snap.nodes);
    setEdges(snap.edges);
    setOpsCount(snap.opsCount);
    setActiveLine(snap.activeLine);
    setCurrentStepIndex(index);
  };

  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollLeft = (CANVAS_WIDTH - viewportRef.current.clientWidth) / 2;
        viewportRef.current.scrollTop = (CANVAS_HEIGHT - viewportRef.current.clientHeight) / 2;
    }
  }, []);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        
        const delta = event.deltaY > 0 ? 0.90 : 1.10;
        const currentZoom = zoomRef.current;
        const nextZoom = clamp(currentZoom * delta, 0.4, 4);
        
        if (nextZoom === currentZoom) return;

        const rect = viewport.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // The magic "Zoom to Cursor" math
        const zoomRatio = nextZoom / currentZoom;
        viewport.scrollLeft = (viewport.scrollLeft + mouseX) * zoomRatio - mouseX;
        viewport.scrollTop = (viewport.scrollTop + mouseY) * zoomRatio - mouseY;

        setZoom(nextZoom);
      }
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, []);

  const regenerateData = () => {
    const nextBars = parseInputArray(inputValue, dataSize);
    setBars(nextBars);
    setOpsCount({ comparisons: 0, swaps: 0, steps: 0 });
    setIsComplete(false);
    setHistory([]);
    setCurrentStepIndex(-1);
    setActiveLine(-1);
    pushLog(`LOG: DATA_REGEN.`);
  };

  const resetAll = () => {
    setIsRunning(false);
    setBars(DEFAULT_ARRAY);
    setNodes(DEFAULT_NODES);
    setEdges(DEFAULT_EDGES);
    setZoom(1);
    setOpsCount({ comparisons: 0, swaps: 0, steps: 0 });
    setIsComplete(false);
    setHistory([]);
    setCurrentStepIndex(-1);
    setActiveLine(-1);
    setInputValue("[45, 12, 89, 34, 67, 23, 91, 56, 78, 10]");
    pushLog("LOG: WORKSPACE_RESET.");
  };

  const currentAlgoData = currentAlgoConfig;

  const handleBarsPointerDown = (e: React.PointerEvent) => {
    if (isGraphMode) return;
    
    // Immediate drag on Right Click
    if (e.button === 2) {
      setIsLongPressingBars(true);
      barsDragControls.start(e);
      return;
    }

    barsLongPressTimer.current = setTimeout(() => {
      setIsLongPressingBars(true);
      barsDragControls.start(e);
      pushLog("LOG: SIMULATOR_MOVE_ENABLED.");
    }, 500);
  };

  const handleBarsPointerUp = () => {
    if (barsLongPressTimer.current) clearTimeout(barsLongPressTimer.current);
    setIsLongPressingBars(false);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // UNIFIED ENGINE: All algorithms use generateSimulation
  const runUnifiedSimulation = async () => {
    const inputData = parseInputArray(inputValue, dataSize);
    const trace = generateSimulation(algorithm, inputData);
    let ops = { comparisons: 0, swaps: 0, steps: 0 };

    pushLog(`LOG: ${algorithm.toUpperCase()}_INIT. Steps: ${trace.length}`);

    for (let i = 0; i < trace.length; i++) {
      if (!isRunning) return;
      const step = trace[i];
      ops = { ...ops, steps: ops.steps + 1 };

      if (step.array_state) setBars([...step.array_state]);
      if (step.nodes_state) setNodes(step.nodes_state.map((n: any) => ({ id: n.id, label: n.label, x: n.x, y: n.y })));
      if (step.edges_state) setEdges(step.edges_state.map((e: any) => ({ from: e.from, to: e.to, weight: e.weight })));

      setOpsCount(ops);
      setActiveLine(step.active_line ?? -1);
      takeSnapshot(step.active_line ?? -1, step.array_state || bars, step.nodes_state?.map((n: any) => ({ id: n.id, label: n.label, x: n.x, y: n.y })) || nodes, step.edges_state?.map((e: any) => ({ from: e.from, to: e.to, weight: e.weight })) || edges, ops, step.description_en);

      await sleep(speed);
    }

    if (isRunning) {
      setIsRunning(false);
      setIsComplete(true);
      pushLog(`LOG: ${algorithm.toUpperCase()}_COMPLETE.`);
    }
  };

  useEffect(() => {
    if (isRunning) {
      setIsComplete(false);
      runUnifiedSimulation();
    }
  }, [isRunning]);

  const onStageClick = (event: React.MouseEvent) => {
    if (!isDrawingMode || !canvasRef.current || draggingNodeId) return;
    const target = event.target as HTMLElement;
    if (target.closest('.node-button')) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - canvasRect.left) / zoom;
    const y = (event.clientY - canvasRect.top) / zoom;
    setNodes([...nodes, { id: `n${Date.now()}`, label: `N${nodes.length + 1}`, x, y }]);
  };

  const onNodeClick = (nodeId: string) => {
    if (!isDrawingMode) return;
    if (selectedNodeId === null) setSelectedNodeId(nodeId);
    else if (selectedNodeId === nodeId) setSelectedNodeId(null);
    else {
      const exists = edges.some(e => (e.from === selectedNodeId && e.to === nodeId) || (e.from === nodeId && e.to === selectedNodeId));
      if (!exists) setEdges([...edges, { from: selectedNodeId, to: nodeId }]);
      setSelectedNodeId(null);
    }
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.from !== nodeId && e.to !== nodeId));
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - canvasRect.left) / zoom;
    const y = (event.clientY - canvasRect.top) / zoom;
    
    // Update MotionValues directly (no re-render)
    mouseX.set(x);
    mouseY.set(y);

    if (draggingNodeId && !isDrawingMode) {
      const nextX = x - dragOffset.x;
      const nextY = y - dragOffset.y;
      setNodes((prev) => prev.map((node) => node.id === draggingNodeId ? { ...node, x: nextX, y: nextY } : node));
    }
  };

  const exportToJson = () => {
    const data = { bars, nodes, edges, algorithm };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playground-data-${Date.now()}.json`;
    a.click();
  };

  const consoleHeight = isConsoleOpen ? CONSOLE_HEADER_HEIGHT + CONSOLE_BODY_HEIGHT : CONSOLE_HEADER_HEIGHT;
  const currentSidebarWidth = isSidebarOpen ? SIDEBAR_WIDTH : 0;
  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId]);

  return (
    <div 
      dir="ltr" 
      className="min-h-screen bg-[#F7FAFE] text-left overflow-hidden font-mono"
    >
      <style jsx global>{`
        .custom-slim-scrollbar::-webkit-scrollbar {
          width: 3px;
          height: 3px;
        }
        .custom-slim-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-slim-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 47, 167, 0.2);
          border-radius: 10px;
        }
        .custom-slim-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 47, 167, 0.5);
          border-radius: 10px;
        }
        .custom-slim-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 47, 167, 0.2) transparent;
        }
        .blueprint-grid {
          background-image: radial-gradient(circle, rgba(15, 23, 42, 0.45) 0.8px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
      
      <aside 
        className={`fixed bottom-0 left-0 top-16 bg-white border-r border-[#C4C5D6] shadow-sm z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} 
        style={{ width: `${SIDEBAR_WIDTH}px` }}
      >
        <div className="h-full flex flex-col p-4 space-y-6 overflow-y-auto custom-slim-scrollbar pb-20">
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">{t.header.kicker}</label>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="w-full border border-[#C4C5D6] bg-[#0A1022] px-2 py-2.5 text-[9px] font-bold tracking-widest text-[#DBE7FF] outline-none cursor-pointer rounded-sm">
              {ALGORITHM_OPTIONS.map((id) => (
                <option key={id} value={id}>
                  {(algorithmsData as unknown as Record<string, Algorithm>)[id]?.metadata?.title?.en || id}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">Input_Matrix</label>
            <textarea 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="e.g. [1, 2, 3]"
              className="h-20 w-full resize-none border border-[#C4C5D6] bg-[#F7FAFE] px-2 py-2 text-[10px] text-black outline-none focus:border-[#002FA7] rounded-sm" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">Canvas_Tools</label>
            <button onClick={() => setIsDrawingMode(!isDrawingMode)} className={`w-full py-2.5 text-[9px] border flex items-center justify-center gap-2 transition-all font-bold tracking-widest rounded-sm ${isDrawingMode ? 'bg-[#002FA7] text-white border-[#002FA7]' : 'bg-white text-[#002FA7] border-[#C4C5D6] hover:border-[#002FA7]'}`}>
              <span className="material-symbols-outlined text-[16px]">{isDrawingMode ? 'gesture' : 'edit_square'}</span>
              {isDrawingMode ? 'STOP_DRAWING' : 'START_DRAWING'}
            </button>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-100">
             <div className="space-y-1.5">
               <div className="flex justify-between text-[8px] uppercase text-slate-400 font-bold tracking-widest">
                 <span>Speed_Factor</span>
                 <span className="text-[#002FA7]">{speed}ms</span>
               </div>
               <input type="range" min={40} max={800} step={20} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full h-1 bg-slate-200 appearance-none accent-[#002FA7] cursor-pointer" />
             </div>

             <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-[9px]">
                   <span className="text-slate-400 uppercase tracking-tighter">View_Scale</span>
                   <span className="text-primary font-bold">{Math.round(zoom * 100)}%</span>
                </div>
                <button onClick={() => setZoom(1)} className="w-full py-1.5 border border-slate-200 text-[8px] font-bold uppercase hover:bg-slate-50 transition-colors rounded-sm">Normalize_View</button>
             </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button onClick={() => { regenerateData(); setIsRunning(true); }} className="w-full bg-[#002FA7] py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white hover:bg-[#0D3DB3] shadow-lg shadow-primary/20 transition-all rounded-sm">{t.controls.play}</button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={resetAll} className="border border-[#C4C5D6] py-2 text-[9px] font-bold uppercase text-[#002FA7] hover:bg-slate-50 transition-colors rounded-sm">RESET</button>
              <button onClick={exportToJson} className="border border-[#C4C5D6] py-2 text-[9px] font-bold uppercase text-[#002FA7] hover:bg-slate-50 transition-colors rounded-sm">JSON</button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-1/2 -right-6 -translate-y-1/2 w-6 h-12 bg-white border border-[#C4C5D6] border-l-0 rounded-r-md flex items-center justify-center text-[#002FA7] shadow-sm hover:bg-slate-50 z-50`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isSidebarOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </aside>

      <main 
        ref={viewportRef}
        className="fixed right-0 top-16 overflow-hidden transition-all duration-300 ease-in-out" 
        style={{ left: `${currentSidebarWidth}px`, bottom: `${consoleHeight}px` }}
      >
        <DataVisualizer.InfiniteCanvas gridSize={30} initialZoom={zoom}>
          {isGraphMode ? (
            <DataVisualizer.Graph nodes={nodes} edges={edges} width={1200} height={800} />
          ) : (
            <DataVisualizer.Bars data={bars} activeIndices={[activeLine]} width={800} height={400} />
          )}
        </DataVisualizer.InfiniteCanvas>

        <div className="fixed top-20 right-8 z-30 flex flex-col gap-4 items-end">
            <motion.div drag dragMomentum={false} className="cursor-grab active:cursor-grabbing">
              <div className="bg-[#0A1022] border border-[#002FA7]/40 shadow-2xl backdrop-blur-md select-none min-w-[180px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-primary/20 flex justify-between items-center">
                    <p className="text-[8px] text-[#8FA8DF] uppercase tracking-[0.2em]">Metrics.v2</p>
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-1 bg-[#0A1022]/50">
                    <div>
                        <p className="text-[7px] text-slate-500 uppercase">Cmp</p>
                        <p className="text-lg font-bold text-white tabular-nums">{opsCount.comparisons}</p>
                    </div>
                    <div>
                        <p className="text-[7px] text-slate-500 uppercase">Swp</p>
                        <p className="text-lg font-bold text-primary tabular-nums brightness-125">{opsCount.swaps}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isComplete && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#002FA7] border-t border-white/10">
                          <div className="px-4 py-2 flex items-center gap-2">
                              <span className="material-symbols-outlined text-[14px] text-white">check_circle</span>
                              <span className="text-[8px] font-bold text-white uppercase tracking-wider">Execution Complete</span>
                          </div>
                        </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            </motion.div>

            {currentAlgoData && currentAlgoData.implementations && currentAlgoData.implementations[0] && (
              <div className="w-[320px] h-[360px] shadow-2xl">
                <CodePanel 
                  code={currentAlgoData.implementations[0].snippet} 
                  activeLine={activeLine} 
                  language={currentAlgoData.implementations[0].language}
                />
              </div>
            )}
        </div>

        <div 
          className="fixed z-40 transition-all duration-300 ease-in-out" 
          style={{ 
            left: `${currentSidebarWidth + 24}px`, 
            right: "24px", 
            bottom: `${consoleHeight + 24}px` 
          }}
        >
          <HistorySlider 
            currentStep={currentStepIndex} 
            totalSteps={history.length} 
            onStepChange={goToStep} 
            isRunning={isRunning}
          />
        </div>
      </main>

      <section 
        className={`fixed bottom-0 right-0 z-50 border-l border-[#C4C5D6] bg-[#0B1226] transition-all duration-300 ease-in-out`} 
        style={{ left: `${currentSidebarWidth}px` }}
      >
        <button onClick={() => setIsConsoleOpen((prev) => !prev)} className="flex h-10 w-full items-center justify-between px-4 text-left hover:bg-slate-900 border-t border-[#C4C5D6]/20">
          <div className="flex items-center gap-3">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-[9px] uppercase tracking-[0.2em] text-[#D5E2FF]">TERMINAL_STDOUT</span>
          </div>
          <span className="text-[8px] uppercase text-[#8FA8DF]">{isConsoleOpen ? "COLLAPSE" : "EXPAND"}</span>
        </button>
        {isConsoleOpen && (
          <div className="overflow-y-auto px-4 py-3 text-[10px] leading-relaxed text-[#D5E2FF] custom-slim-scrollbar" style={{ height: `${CONSOLE_BODY_HEIGHT}px` }}>
            {logs.map((entry, index) => <p key={`${entry}-${index}`} className="mb-1 opacity-80 border-l border-primary/20 pl-2">{entry}</p>)}
          </div>
        )}
      </section>
    </div>
  );
}