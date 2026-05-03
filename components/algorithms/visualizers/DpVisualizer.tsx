import { Algorithm } from "@/types/algorithm";
import { InfiniteCanvas } from "@/components/visualizer/InfiniteCanvas";
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

export default function DpVisualizer({
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

      <div className={`flex flex-col gap-4 flex-1 min-h-0 ${isFullscreen ? 'p-8' : 'mt-4'}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2 px-6">
          {logicStep.description.en}
        </p>

        <div className={`flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-px ${isFullscreen ? '' : 'h-[600px]'}`}>
          <section className={`${hasTree ? (isFullscreen ? 'lg:col-span-9' : 'lg:col-span-7') : 'lg:col-span-12'} p-8 flex flex-col relative`}>
            <InfiniteCanvas>
              <div className="flex flex-col items-center p-8">
                <div className="flex justify-between items-center mb-8 w-full">
                  <h2 className="text-sm font-bold font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-container"></span> {hasTree ? 'RECURSION_TREE' : 'DP_TABLE'}
                  </h2>
                </div>
                {matrix.length > 0 && (
                  <div className="overflow-auto bg-white/80 backdrop-blur-sm p-4 shadow-xl border border-primary/10">
                    <table className="w-full border-collapse font-mono text-xs">
                      <tbody>
                        {matrix.map((row, i) => (
                          <tr key={i}>
                            <td className="p-3 bg-surface-container-high font-bold border border-outline-variant/10 text-center w-12">{i}</td>
                            {Array.isArray(row) ? row.map((cell, j) => (
                              <td key={j} className={`p-3 border border-outline-variant/10 text-center transition-colors ${cell !== null && cell !== 0 ? 'bg-primary/10 text-primary font-bold' : 'bg-white text-slate-400'}`}>
                                {cell !== null ? cell : '—'}
                              </td>
                            )) : (
                              <td className="p-3 border border-outline-variant/10 text-center bg-primary/10 text-primary font-bold">{row}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </InfiniteCanvas>
          </section>

          {hasTree && (
            <section className={`${isFullscreen ? 'lg:col-span-3' : 'lg:col-span-5'} p-8 flex flex-col overflow-y-auto border-l border-outline-variant/10 bg-surface-container-lowest`}>
              <h2 className="text-sm font-bold font-mono uppercase tracking-widest flex items-center gap-2 mb-4 text-primary">
                <span className="w-2 h-2 bg-primary"></span> MEMO_REGISTRY
              </h2>
              {matrix.length > 0 && matrix[0] && (
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1 p-3 bg-surface-container-high font-mono text-[10px] font-bold text-slate-500 uppercase">n</div>
                  <div className="col-span-3 p-3 bg-surface-container-high font-mono text-[10px] font-bold text-slate-500 uppercase">Result</div>
                  {(matrix[0] as (number | null)[]).map((val, i) => (
                    <React.Fragment key={i}>
                      <div className="p-3 bg-white font-mono text-xs font-bold border-b border-outline-variant/10 text-primary">{i}</div>
                      <div className="col-span-3 p-3 bg-primary/5 text-primary font-mono text-xs font-bold border-b border-outline-variant/10 flex items-center gap-2">
                        {val !== null ? (
                          <>
                            <span className="material-symbols-outlined scale-75 text-primary">check_circle</span>
                            {val}
                          </>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
