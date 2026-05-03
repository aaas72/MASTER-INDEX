import { DataVisualizer } from "@/components/visualizer";
import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface DpVisualizerProps {
  algoData: Algorithm;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  hasLogicSteps: boolean | null;
  fullTrace: any[];
  isPlaying?: boolean;
  setIsPlaying?: (v: boolean) => void;
}

export default function MatrixVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
  fullTrace,
  isPlaying,
  setIsPlaying,
}: DpVisualizerProps) {
  const effectiveTrace = fullTrace;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const logicStep = effectiveTrace[currentStep];

  if (!hasLogicSteps || !logicStep) {
    return (
      <div className="flex h-64 items-center justify-center border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest">
        DP Visualization pending integration
      </div>
    );
  }

  const matrix: (number | null)[][] = logicStep.state_snapshot.matrix || [];
  const nodes = logicStep.state_snapshot.nodes || [];
  const edges = logicStep.state_snapshot.edges || [];
  const hasTree = nodes.length > 0;

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen bg-surface flex flex-col m-0 p-0' : 'relative w-full flex flex-col mt-4 overflow-hidden border border-outline-variant/20'}>
      <div className="flex justify-between items-center px-4 py-2 bg-surface-container-low border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase font-black tracking-widest text-primary">Simulation_Env:Active</span>
          <div className="h-3 w-px bg-outline-variant/50" />
          <span className="font-mono text-[9px] uppercase text-outline">Step {currentStep + 1} / {effectiveTrace.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-primary/10 p-0.5 shadow-sm">
            <button onClick={handlePrev} className="flex items-center justify-center w-7 h-7 hover:bg-surface-container-low transition-colors"><SkipBack size={14} className="text-primary" /></button>
            <button onClick={() => setIsPlaying?.(!isPlaying)} className="flex items-center justify-center w-7 h-7 bg-primary text-white hover:bg-primary/90 transition-colors">{isPlaying ? <Pause size={14} /> : <Play size={14} />}</button>
            <button onClick={handleNext} className="flex items-center justify-center w-7 h-7 hover:bg-surface-container-low transition-colors"><SkipForward size={14} className="text-primary" /></button>
          </div>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="flex items-center justify-center w-8 h-8 bg-surface-container-high border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
          </button>
        </div>
      </div>

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden ${isFullscreen ? 'bg-surface' : 'p-6 gap-6 h-[600px]'}`}>
        {/* Left: Visualization (60% in normal, flex-1 in fullscreen) */}
        <div className={`${isFullscreen ? 'flex-1' : 'md:w-[60%]'} flex flex-col relative min-h-0 ${isFullscreen ? 'p-8 md:p-12 lg:p-16' : ''}`}>
          <div className={`flex-1 relative min-h-0 border-outline-variant/20 pb-2 ${isFullscreen ? 'border-0' : 'h-full border-b md:border-b-0'}`}>
            <DataVisualizer.InfiniteCanvas>
              <div className="flex flex-col items-center p-8">
                <div className="flex justify-between items-center mb-8 w-full">
                  <h2 className="text-sm font-bold font-mono uppercase tracking-widest flex items-center gap-2 text-primary">
                    <span className="w-2 h-2 bg-primary"></span> {hasTree ? 'RECURSION_TREE_ANALYSIS' : 'DYNAMIC_PROGRAMMING_MATRIX'}
                  </h2>
                </div>
                {matrix.length > 0 && (
                  <DataVisualizer.Matrix data={matrix} className="w-full max-w-4xl shadow-2xl" />
                )}
              </div>
            </DataVisualizer.InfiniteCanvas>
          </div>
        </div>

        {/* Right: Execution Trace (40% in normal, fixed 80/96 in fullscreen) */}
        <div className={`w-full ${isFullscreen ? 'md:w-96' : 'md:w-[40%]'} border-outline-variant/20 flex flex-col overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isFullscreen ? 'h-full bg-surface-container-lowest border-l p-6 md:p-8 shadow-xl z-10' : 'md:border-l md:pl-6 h-full'}`}>
          
          {/* Memo Registry (Optional, for DP) */}
          {hasTree && matrix.length > 0 && matrix[0] && (
            <div className="mb-8">
              <h2 className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] flex items-center gap-2 mb-4 text-primary bg-primary/5 p-2 border-l-2 border-primary">
                MEMO_REGISTRY_SNAPSHOT
              </h2>
              <div className="grid grid-cols-4 gap-1 border border-outline-variant/10 p-1 bg-surface-container-low">
                <div className="col-span-1 p-2 bg-white font-mono text-[8px] font-black text-slate-400 uppercase text-center">N</div>
                <div className="col-span-3 p-2 bg-white font-mono text-[8px] font-black text-slate-400 uppercase text-center">RESULT</div>
                {(matrix[0] as (number | null)[]).map((val, i) => (
                  <React.Fragment key={i}>
                    <div className="p-2 bg-white font-mono text-[10px] font-black text-primary text-center border-t border-outline-variant/5">{i}</div>
                    <div className="col-span-3 p-2 bg-white text-primary font-mono text-[10px] font-bold flex items-center justify-center gap-2 border-t border-outline-variant/5">
                      {val !== null ? val : <span className="text-slate-200">WAIT</span>}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Standard Trace */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-primary/10 sticky top-0 bg-surface-container-lowest/80 backdrop-blur-sm z-10">
            <span className="font-mono text-[10px] tracking-tighter text-primary font-bold uppercase">Logic_Execution_Trace</span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </div>

          <div className="space-y-4">
            {effectiveTrace.map((step: any, idx: number) => (
              <div 
                key={idx} 
                id={`matrix-step-${idx}`} 
                onClick={() => setCurrentStep(idx)} 
                className={`group p-3 cursor-pointer transition-all border-l-2 ${idx === currentStep ? 'bg-primary/5 border-primary shadow-sm' : 'border-transparent opacity-40 hover:opacity-100 hover:bg-surface-container-low'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-mono text-[9px] uppercase font-black ${idx === currentStep ? 'text-primary' : 'text-slate-400'}`}>Step {idx + 1}</p>
                  {idx === currentStep && <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>}
                </div>
                <p className={`text-xs leading-relaxed ${idx === currentStep ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                  {step.description.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
