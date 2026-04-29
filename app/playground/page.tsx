"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NodePoint = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const ALGORITHM_OPTIONS = [
  "QUICK_SORT_TERMINAL",
  "MERGE_SORT_PIPELINE",
  "GRAPH_BFS_NODEMAP",
];

const DEFAULT_ARRAY = [45, 12, 89, 34, 67, 23, 91, 56];
const DEFAULT_NODES: NodePoint[] = [
  { id: "n1", label: "N1", x: 120, y: 90 },
  { id: "n2", label: "N2", x: 280, y: 140 },
  { id: "n3", label: "N3", x: 440, y: 95 },
  { id: "n4", label: "N4", x: 210, y: 280 },
  { id: "n5", label: "N5", x: 390, y: 300 },
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
  const SIDEBAR_WIDTH = 280;
  const CONSOLE_HEADER_HEIGHT = 48;
  const CONSOLE_BODY_HEIGHT = 176;

  const [algorithm, setAlgorithm] = useState(ALGORITHM_OPTIONS[0]);
  const [speed, setSpeed] = useState(420);
  const [dataSize, setDataSize] = useState(12);
  const [inputValue, setInputValue] = useState("[45, 12, 89, 34, 67, 23, 91, 56]");
  const [bars, setBars] = useState<number[]>(DEFAULT_ARRAY);
  const [nodes, setNodes] = useState<NodePoint[]>(DEFAULT_NODES);
  const [logs, setLogs] = useState<string[]>([
    "LOG: SANDBOX BOOTSTRAP COMPLETE.",
    "LOG: READY FOR CUSTOM INPUT.",
  ]);
  const [iteration, setIteration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [draggedBarIndex, setDraggedBarIndex] = useState<number | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement | null>(null);

  const isGraphMode = useMemo(() => algorithm.includes("GRAPH"), [algorithm]);

  const pushLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 120));
  };

  const regenerateData = () => {
    const nextBars = parseInputArray(inputValue, dataSize);
    setBars(nextBars);
    setNodes(
      DEFAULT_NODES.map((node, index) => ({
        ...node,
        x: 120 + ((index * 140) % 420),
        y: 90 + ((index * 75) % 250),
      })),
    );
    setIteration(0);
    pushLog(`LOG: INPUT MATRIX NORMALIZED TO ${nextBars.length} VALUES.`);
  };

  const resetAll = () => {
    setIsRunning(false);
    setBars(DEFAULT_ARRAY);
    setNodes(DEFAULT_NODES);
    setIteration(0);
    setInputValue("[45, 12, 89, 34, 67, 23, 91, 56]");
    setLogs([
      "LOG: RESET_STEP INVOKED.",
      "LOG: SANDBOX RETURNED TO BASELINE.",
    ]);
  };

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = window.setInterval(() => {
      setIteration((prev) => prev + 1);

      if (isGraphMode) {
        setNodes((prevNodes) => {
          const updated = prevNodes.map((node, idx) => ({
            ...node,
            x: clamp(node.x + (idx % 2 === 0 ? 7 : -6), 40, 600),
            y: clamp(node.y + (idx % 2 === 0 ? -5 : 6), 40, 320),
          }));
          return updated;
        });
        pushLog("LOG: NODE FORCES REBALANCED IN GRAPH FIELD.");
      } else {
        setBars((prevBars) => {
          if (prevBars.length < 2) {
            return prevBars;
          }

          const next = [...prevBars];
          const a = Math.floor(Math.random() * next.length);
          const b = Math.floor(Math.random() * next.length);
          [next[a], next[b]] = [next[b], next[a]];
          pushLog(`LOG: SWAPPING INDEX ${a} <-> ${b}.`);
          return next;
        });
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [isGraphMode, isRunning, speed]);

  const onNodePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingNodeId || !stageRef.current) {
      return;
    }

    const stageRect = stageRef.current.getBoundingClientRect();
    const nextX = clamp(event.clientX - stageRect.left - dragOffset.x, 24, stageRect.width - 24);
    const nextY = clamp(event.clientY - stageRect.top - dragOffset.y, 24, stageRect.height - 24);

    setNodes((prev) =>
      prev.map((node) =>
        node.id === draggingNodeId
          ? {
              ...node,
              x: nextX,
              y: nextY,
            }
          : node,
      ),
    );
  };

  const consoleHeight = isConsoleOpen
    ? CONSOLE_HEADER_HEIGHT + CONSOLE_BODY_HEIGHT
    : CONSOLE_HEADER_HEIGHT;

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-[#F7FAFE] text-left"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(196,197,214,0.55) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <aside
        className="playground-sidebar-scroll fixed bottom-0 left-0 top-16 overflow-y-auto bg-white border-r border-[#C4C5D6] px-4 py-6"
        style={{ width: `${SIDEBAR_WIDTH}px` }}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              Input Panel
            </label>
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="h-24 w-full resize-none border border-[#C4C5D6] bg-[#F7FAFE] px-3 py-2 font-mono text-sm text-black outline-none transition-all hover:border-[#002FA7] hover:shadow-[0_0_0_1px_rgba(0,47,167,0.25)] focus:border-[#002FA7]"
              placeholder="[45, 12, 89, 34]"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              <span>Execution Speed</span>
              <span className="font-bold text-[#002FA7]">{speed}ms</span>
            </div>
            <input
              type="range"
              min={80}
              max={1200}
              step={20}
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="w-full cursor-pointer accent-[#002FA7]"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              <span>Data Size</span>
              <span className="font-bold text-[#002FA7]">n={dataSize}</span>
            </div>
            <input
              type="range"
              min={4}
              max={32}
              step={1}
              value={dataSize}
              onChange={(event) => setDataSize(Number(event.target.value))}
              className="w-full cursor-pointer accent-[#002FA7]"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              Algorithm Selector
            </label>
            <select
              value={algorithm}
              onChange={(event) => setAlgorithm(event.target.value)}
              className="w-full border border-[#C4C5D6] bg-[#0A1022] px-3 py-3 font-mono text-xs tracking-[0.14em] text-[#DBE7FF] outline-none transition-all hover:border-[#002FA7] hover:shadow-[0_0_0_1px_rgba(0,47,167,0.25)] focus:border-[#002FA7]"
            >
              {ALGORITHM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => {
                regenerateData();
                setIsRunning(true);
                pushLog("LOG: RUN_SIMULATION DISPATCHED.");
              }}
              className="w-full border border-[#002FA7] bg-[#002FA7] py-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:border-[#1B55E0] hover:bg-[#0D3DB3] hover:shadow-[0_0_0_1px_rgba(0,47,167,0.35)]"
            >
              RUN_SIMULATION
            </button>
            <button
              onClick={resetAll}
              className="w-full border border-[#C4C5D6] bg-white py-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#002FA7] transition-all hover:border-[#002FA7] hover:shadow-[0_0_0_1px_rgba(0,47,167,0.25)]"
            >
              RESET_STEP
            </button>
          </div>
        </div>
      </aside>

      <main
        className="playground-content-scrollbar-hidden fixed right-0 top-16 overflow-y-auto px-6 py-6"
        style={{
          left: `${SIDEBAR_WIDTH}px`,
          bottom: `${consoleHeight}px`,
        }}
      >
        <div className="mx-auto h-full w-full max-w-5xl space-y-5">
          <header className="px-1 py-1">
            <p className="page-kicker">
              Computational Sandbox
            </p>
            <h1 className="page-title-sm mt-2 uppercase">
              Interactive Algorithm Playground
            </h1>
          </header>

          <section className="relative mx-auto max-w-2xl p-4 sm:p-6">
            <div
              ref={stageRef}
              onPointerMove={onNodePointerMove}
              onPointerUp={() => setDraggingNodeId(null)}
              onPointerLeave={() => setDraggingNodeId(null)}
              className="relative h-[400px] overflow-hidden"
            >
              {!isGraphMode && (
                <div className="absolute inset-x-4 bottom-4 top-4 flex items-end gap-2">
                  {bars.map((value, index) => {
                    const max = Math.max(...bars, 1);
                    const height = `${Math.max((value / max) * 100, 8)}%`;

                    return (
                      <button
                        key={`${value}-${index}`}
                        draggable
                        onDragStart={() => setDraggedBarIndex(index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                          if (draggedBarIndex === null || draggedBarIndex === index) {
                            return;
                          }
                          setBars((prev) => {
                            const copy = [...prev];
                            const [moving] = copy.splice(draggedBarIndex, 1);
                            copy.splice(index, 0, moving);
                            return copy;
                          });
                          pushLog(`LOG: MANUAL BAR REORDER ${draggedBarIndex} -> ${index}.`);
                          setDraggedBarIndex(null);
                        }}
                        className="group relative flex-1 border border-[#C4C5D6] bg-[#DCE6FF] transition-all hover:border-[#002FA7] hover:shadow-[0_0_0_1px_rgba(0,47,167,0.25)]"
                        style={{ height }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-[#002FA7] opacity-0 transition-opacity group-hover:opacity-100">
                          {value}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {isGraphMode && (
                <>
                  <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <line x1={nodes[0]?.x} y1={nodes[0]?.y} x2={nodes[1]?.x} y2={nodes[1]?.y} stroke="#9CB0E6" strokeWidth="1" />
                    <line x1={nodes[1]?.x} y1={nodes[1]?.y} x2={nodes[2]?.x} y2={nodes[2]?.y} stroke="#9CB0E6" strokeWidth="1" />
                    <line x1={nodes[0]?.x} y1={nodes[0]?.y} x2={nodes[3]?.x} y2={nodes[3]?.y} stroke="#9CB0E6" strokeWidth="1" />
                    <line x1={nodes[3]?.x} y1={nodes[3]?.y} x2={nodes[4]?.x} y2={nodes[4]?.y} stroke="#9CB0E6" strokeWidth="1" />
                    <line x1={nodes[2]?.x} y1={nodes[2]?.y} x2={nodes[4]?.x} y2={nodes[4]?.y} stroke="#9CB0E6" strokeWidth="1" />
                  </svg>
                  {nodes.map((node) => (
                    <button
                      key={node.id}
                      onPointerDown={(event) => {
                        const rect = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();
                        setDraggingNodeId(node.id);
                        setDragOffset({
                          x: event.clientX - rect.left,
                          y: event.clientY - rect.top,
                        });
                        pushLog(`LOG: DRAGGING ${node.label}.`);
                      }}
                      className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 border border-[#002FA7] bg-white font-mono text-[11px] font-bold text-[#002FA7] transition-all hover:shadow-[0_0_0_1px_rgba(0,47,167,0.35)]"
                      style={{ left: node.x, top: node.y }}
                    >
                      {node.label}
                    </button>
                  ))}
                </>
              )}

              <div className="absolute right-4 top-4 border border-[#C4C5D6] bg-white/65 px-3 py-2 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  STATUS: {isRunning ? "EXECUTING..." : "IDLE"}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#002FA7]">
                  ITERATION_COUNT: {String(iteration).padStart(4, "0")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <section
        className="fixed bottom-0 right-0 z-20 border-l border-t border-[#C4C5D6] bg-white"
        style={{ left: `${SIDEBAR_WIDTH}px` }}
      >
        <button
          onClick={() => setIsConsoleOpen((prev) => !prev)}
          className="flex h-12 w-full items-center justify-between bg-[#0B1226] px-4 text-left transition-all hover:shadow-[0_0_0_1px_rgba(0,47,167,0.2)]"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D5E2FF]">
            Technical Console
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FA8DF]">
            {isConsoleOpen ? "COLLAPSE" : "EXPAND"}
          </span>
        </button>

        {isConsoleOpen && (
          <div
            className="overflow-y-auto bg-[#0B1226] px-4 py-3 font-mono text-[12px] leading-relaxed text-[#D5E2FF]"
            style={{ height: `${CONSOLE_BODY_HEIGHT}px` }}
          >
            {logs.map((entry, index) => (
              <p key={`${entry}-${index}`} className="whitespace-pre-wrap break-words">
                {entry}
              </p>
            ))}
            <p className="mt-1 animate-pulse text-[#7FA2FF]">_</p>
          </div>
        )}
      </section>
    </div>
  );
}