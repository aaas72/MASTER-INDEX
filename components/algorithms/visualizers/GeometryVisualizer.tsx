import { Algorithm } from "@/types/algorithm";
import { Geometry } from "@/components/visualizer/Geometry";
import { InfiniteCanvas } from "@/components/visualizer/InfiniteCanvas";
import { useState, useEffect } from "react";
import { getInitialState } from "@/utils/simulationDefaults";

interface GeometryVisualizerProps {
  algoData: Algorithm;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  hasLogicSteps: boolean | null;
  fullTrace: any[];
}

export default function GeometryVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
  fullTrace,
}: GeometryVisualizerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const effectiveTrace = fullTrace;

  const logicStep = effectiveTrace[currentStep];

  useEffect(() => {
    const el = document.getElementById(`geo-step-${currentStep}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  if (!hasLogicSteps || !logicStep) {
    return (
      <div className="flex h-64 items-center justify-center border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest">
        Geometry Visualization pending integration
      </div>
    );
  }

  const points = logicStep.state_snapshot.nodes || [];
  const lines = logicStep.state_snapshot.edges || [];

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen bg-surface flex flex-col m-0 p-0' : 'relative w-full flex flex-col mt-4 overflow-hidden border border-outline-variant/20'}>
      {/* Visualizer Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-surface-container-low border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase font-black tracking-widest text-primary">
            Simulation_Env:Active
          </span>
          <div className="h-3 w-px bg-outline-variant/50" />
          <span className="font-mono text-[9px] uppercase text-outline">
            Type: Spatial_Geometry
          </span>
        </div>
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex items-center justify-center w-8 h-8 bg-surface-container-high border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
          title="Toggle Fullscreen"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
          </span>
        </button>
      </div>

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden ${isFullscreen ? 'bg-surface' : 'p-6 gap-6 h-[600px]'}`}>
        {/* Left: Visualization (40%) */}
        <div className={`md:w-[40%] flex flex-col relative min-h-0 ${isFullscreen ? 'p-8 md:p-12 lg:p-16' : ''}`}>
          <div className={`flex-1 relative min-h-0 border-outline-variant/20 pb-2 ${isFullscreen ? 'border-0' : 'h-full border-b md:border-b-0'}`}>
            <InfiniteCanvas>
              <Geometry 
                points={points}
                hullLines={lines}
                width={800}
                height={500}
              />
            </InfiniteCanvas>
          </div>

          {/* Controls Placeholder (Removed in standard view per user request) */}
          {isFullscreen && (
            <div className="flex justify-center flex-shrink-0 mt-8">
              <div className="flex items-center bg-white border border-primary/10 p-1 shadow-sm">
                <button onClick={handlePrev} className="px-4 py-2 font-mono text-[10px] uppercase hover:bg-surface-container-low transition-colors group flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">skip_previous</span>
                  Prev
                </button>
                <div className="w-px h-6 bg-outline-variant/30 mx-1"></div>
                <button className="flex items-center justify-center w-10 h-10 bg-primary-container text-on-primary hover:bg-primary transition-all">
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
                <div className="w-px h-6 bg-outline-variant/30 mx-1"></div>
                <button onClick={handleNext} className="px-4 py-2 font-mono text-[10px] uppercase hover:bg-surface-container-low transition-colors group flex items-center gap-2">
                  Next
                  <span className="material-symbols-outlined text-sm">skip_next</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Execution Trace (60%) */}
        <div className={`w-full md:w-[60%] border-outline-variant/20 flex flex-col overflow-y-auto ${isFullscreen ? 'h-full bg-white border-l p-6' : 'md:border-l md:pl-6 h-full'}`}>
          <span className="font-mono text-[10px] text-primary font-bold mb-4 block">GEOMETRY_TRACE</span>
          <div className="space-y-4">
            {effectiveTrace.map((step, idx) => (
              <div key={idx} id={`geo-step-${idx}`} onClick={() => setCurrentStep(idx)} className={`p-2 cursor-pointer transition-all ${idx === currentStep ? 'bg-primary/5 border-l-2 border-primary' : 'opacity-40'}`}>
                <p className="font-mono text-[10px] uppercase text-primary">Step {idx + 1}</p>
                <p className="text-xs mt-1">{step.description.en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
