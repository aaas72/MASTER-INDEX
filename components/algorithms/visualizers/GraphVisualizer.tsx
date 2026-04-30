import { AlgorithmData } from "@/types/algorithm";
import { useState, useEffect } from "react";

interface GraphVisualizerProps {
  algoData: AlgorithmData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  hasLogicSteps: boolean | null;
}

export default function GraphVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
}: GraphVisualizerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const logicStep = hasLogicSteps ? algoData.content.logic_steps[currentStep] : null;

  useEffect(() => {
    const el = document.getElementById(`graph-step-${currentStep}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  if (!hasLogicSteps || !logicStep) {
    return (
      <div className="flex h-64 items-center justify-center border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest">
        Graph Visualization pending integration
      </div>
    );
  }

  // Derive dynamic state
  const activeIndex = logicStep.pivot_index ?? 0;
  const nodeValues = logicStep.array_state || [];
  
  const nodes = [
    { id: "A", x: 200, y: 200, label: "A" },
    { id: "B", x: 400, y: 150, label: "B" },
    { id: "C", x: 600, y: 200, label: "C" },
    { id: "D", x: 300, y: 400, label: "D" },
    { id: "E", x: 800, y: 350, label: "E" },
    { id: "F", x: 550, y: 550, label: "F" },
  ];

  const edges = [
    { from: "A", to: "B" },
    { from: "A", to: "D" },
    { from: "B", to: "C" },
    { from: "D", to: "C" },
    { from: "C", to: "E" },
    { from: "D", to: "F" },
  ];

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen bg-surface-container-lowest flex flex-col m-0 p-0' : 'relative w-full border border-outline-variant/20 bg-surface-container-lowest flex flex-col mt-4 overflow-hidden'}>
      {/* Fullscreen Toggle */}
      <button 
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 bg-surface-container-high border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
        title="Toggle Fullscreen"
      >
        <span className="material-symbols-outlined text-[18px]">
          {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
        </span>
      </button>

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden ${isFullscreen ? 'bg-surface' : 'p-6 gap-6'}`}>
        {/* Left Side: Visualization + Controls */}
        <div 
          className={`flex-1 flex flex-col relative min-h-0 ${isFullscreen ? 'p-8 md:p-12 lg:p-16' : ''}`}
          style={isFullscreen ? { backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' } : {}}
        >
          {/* Main Visualization Area */}
          <div className={`flex-1 relative min-h-0 border-outline-variant/20 pb-2 ${isFullscreen ? 'border-0' : 'h-[600px] border-b md:border-b-0'}`}>

        <svg className="w-full h-full" viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g className="edges">
            {edges.map((edge, i) => {
              const fromNodeIndex = nodes.findIndex(n => n.id === edge.from);
              const toNodeIndex = nodes.findIndex(n => n.id === edge.to);
              const fromNode = nodes[fromNodeIndex]!;
              const toNode = nodes[toNodeIndex]!;
              const isChosen = fromNodeIndex <= activeIndex && toNodeIndex <= activeIndex;

              return (
                <line 
                  key={i}
                  x1={fromNode.x} y1={fromNode.y} 
                  x2={toNode.x} y2={toNode.y} 
                  stroke="#002FA7" 
                  strokeWidth={isChosen ? 3 : 1.5} 
                  strokeDasharray={isChosen ? "none" : "6"}
                  opacity={isChosen ? 1 : 0.4}
                  className="transition-all duration-500"
                />
              );
            })}
          </g>
          <g className="nodes">
            {nodes.map((node, i) => {
              const isActive = i === activeIndex;
              const isVisited = i < activeIndex;
              const val = nodeValues[i] !== undefined ? nodeValues[i] : "∞";
              
              let fill = "white";
              if (isActive) fill = "white";
              else if (isVisited) fill = "#dde1ff";
              
              return (
                <g key={node.id} className="transition-all duration-500">
                  <circle 
                    cx={node.x} cy={node.y} 
                    r="54" 
                    fill={fill} 
                    stroke="#002FA7" 
                    strokeWidth={isActive ? "4" : "2"} 
                    filter={isActive ? "url(#glow)" : "none"}
                  />
                  <text className="font-mono text-5xl fill-primary font-bold" textAnchor="middle" x={node.x} y={node.y + 16}>
                    {node.label}
                  </text>
                  <text className="font-mono text-xs fill-slate-500" textAnchor="middle" x={node.x} y={node.y - 64}>
                    i:{i}
                  </text>
                  <rect x={node.x + 24} y={node.y + 24} width="64" height="32" fill="#f1f4f8" stroke="#002FA7" strokeWidth="1.5" rx="8" />
                  <text className="font-mono text-xl fill-primary font-bold" textAnchor="middle" x={node.x + 56} y={node.y + 47}>
                    {val}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Overlay removed per user request */}

          <div className="absolute bottom-4 left-4 font-mono hidden lg:block z-10">
            <div className="flex items-center gap-3 text-[9px] text-zinc-400 tracking-widest">
              <span className="flex items-center gap-1"><span className="w-2 h-2 border border-primary"></span> UNVISITED</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary-fixed"></span> VISITED</span>
            </div>
            <p className="text-[8px] text-primary/40 mt-2 uppercase tracking-tighter">Rendered @ 60fps | Scale: 1:1.00</p>
          </div>
          </div>
          
          {/* Controls */}
          <div className={`flex justify-center flex-shrink-0 ${isFullscreen ? 'mt-8' : 'mt-6 mb-2'}`}>
            <div className="flex items-center bg-white border border-primary/10 p-1 shadow-sm">
              <button onClick={handlePrev} className="flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-colors group">
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">skip_previous</span>
                Prev
              </button>
              <div className="w-px h-6 bg-outline-variant/30 mx-1"></div>
              <button className="flex items-center justify-center w-10 h-10 bg-primary-container text-on-primary font-mono hover:bg-primary transition-all active:scale-95" title="Auto-Play">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
              </button>
              <div className="w-px h-6 bg-outline-variant/30 mx-1"></div>
              <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-colors group">
                Next
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">skip_next</span>
              </button>
            </div>
          </div>
        </div>

        {/* Execution Trace Sidebar */}
        <div 
          className={`w-full md:w-96 border-outline-variant/20 flex flex-col overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isFullscreen ? 'h-full bg-surface-container-lowest border-l p-6 md:p-8 shadow-xl z-10' : 'md:border-l md:pl-6 max-h-[600px]'}`}
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-primary/10 sticky top-0 bg-surface-container-lowest/80 backdrop-blur-sm z-10">
            <span className="font-mono text-[10px] tracking-tighter text-primary font-bold">EXECUTION_TRACE</span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-4">
            {algoData.content.logic_steps.map((step, idx) => {
              const isCurrent = idx === currentStep;
              const isPast = idx < currentStep;
              
              return (
                <div 
                  key={idx} 
                  id={`graph-step-${idx}`}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex gap-3 cursor-pointer transition-all hover:bg-surface-container-low p-2 -mx-2 rounded-md ${isCurrent ? 'opacity-100' : isPast ? 'opacity-60' : 'opacity-30'}`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[8px] text-white ${isCurrent ? 'bg-primary' : isPast ? 'bg-outline' : 'bg-outline-variant/50'}`}>
                      {idx + 1}
                    </div>
                    {idx !== algoData.content.logic_steps.length - 1 && <div className="w-px h-full bg-outline-variant/30 mt-1"></div>}
                  </div>
                  <div className="pb-2">
                    <p className={`font-mono text-[10px] uppercase tracking-widest ${isCurrent ? 'text-primary font-bold' : 'text-slate-500'}`}>
                      Step {idx + 1}
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">
                      {step.description_en}
                    </p>
                    {/* Display the array state/distances inline */}
                    <div className="mt-2 font-mono text-[8px] text-outline tracking-tight bg-surface-container-high p-1 rounded-sm overflow-x-auto whitespace-nowrap">
                      Dist: [{step.array_state?.join(', ')}]
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
