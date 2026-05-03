import { Algorithm } from "@/types/algorithm";
import { ArrayStrip } from "@/components/visualizer/Array";
import { InfiniteCanvas } from "@/components/visualizer/InfiniteCanvas";
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface ArrayVisualizerProps {
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

export default function ArrayVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
  fullTrace,
  isPlaying,
  setIsPlaying,
}: ArrayVisualizerProps) {
  const effectiveTrace = fullTrace;
  const logicStep = effectiveTrace[currentStep];
  const arrayState = logicStep?.state_snapshot?.array || [];
  const highlightIndex = (logicStep?.state_snapshot?.highlight_indices && logicStep?.state_snapshot?.highlight_indices.length > 0) 
    ? logicStep?.state_snapshot?.highlight_indices[0] 
    : -1;
  
  const pointers = logicStep?.state_snapshot?.pointers || {};
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const el = document.getElementById(`array-step-${currentStep}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  if (!hasLogicSteps || !logicStep) {
    return (
      <div className="flex h-64 items-center justify-center border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest">
        Visualization pending integration
      </div>
    );
  }

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen bg-surface flex flex-col m-0 p-0' : 'relative w-full flex flex-col mt-4 overflow-hidden border border-outline-variant/20'}>
      {/* Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-surface-container-low border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase font-black tracking-widest text-primary">
            Simulation_Env:Active
          </span>
          <div className="h-3 w-px bg-outline-variant/50" />
          <span className="font-mono text-[9px] uppercase text-outline">
            Step {currentStep + 1} / {effectiveTrace.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Playback Controls */}
          <div className="flex items-center bg-white border border-primary/10 p-0.5 shadow-sm">
            <button onClick={handlePrev} className="flex items-center justify-center w-7 h-7 hover:bg-surface-container-low transition-colors" title="Previous">
              <SkipBack size={14} className="text-primary" />
            </button>
            <button onClick={() => setIsPlaying?.(!isPlaying)} className="flex items-center justify-center w-7 h-7 bg-primary text-white hover:bg-primary/90 transition-colors" title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button onClick={handleNext} className="flex items-center justify-center w-7 h-7 hover:bg-surface-container-low transition-colors" title="Next">
              <SkipForward size={14} className="text-primary" />
            </button>
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
      </div>

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden ${isFullscreen ? 'bg-surface' : 'p-6 gap-6 h-[600px]'}`}>
        {/* Left: Visualization (60% in normal, flex-1 in fullscreen) */}
        <div className={`${isFullscreen ? 'flex-1' : 'md:w-[60%]'} min-w-0 flex flex-col relative ${isFullscreen ? 'p-8 md:p-12 lg:p-16' : ''}`}>
          <div className={`flex-1 relative flex items-center justify-center pb-2 ${isFullscreen ? 'border-0' : 'h-full border-b md:border-b-0'}`}>
            <InfiniteCanvas>
              <ArrayStrip
                data={arrayState}
                activeIndex={highlightIndex}
                lowIndex={pointers.low ?? pointers.left}
                highIndex={pointers.high ?? pointers.right}
                midIndex={pointers.mid}
                statusMessage={logicStep.description.en}
                width={800}
                height={200}
              />
            </InfiniteCanvas>
          </div>
        </div>

        {/* Right: Execution Trace (40% in normal, fixed 96 in fullscreen) */}
        <div
          className={`w-full ${isFullscreen ? 'md:w-96' : 'md:w-[40%]'} shrink-0 border-outline-variant/20 flex flex-col overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isFullscreen ? 'h-full bg-surface-container-lowest border-l p-6 md:p-8 shadow-xl z-10' : 'md:border-l md:pl-6 h-full'}`}
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-primary/10 sticky top-0 bg-surface-container-lowest/80 backdrop-blur-sm z-10">
            <span className="font-mono text-[10px] tracking-tighter text-primary font-bold">EXECUTION_TRACE</span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-4">
            {(effectiveTrace || []).map((step: any, idx: number) => {
              const isCurrent = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <div
                  key={idx}
                  id={`array-step-${idx}`}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex gap-3 cursor-pointer transition-all hover:bg-surface-container-low p-2 -mx-2 rounded-md ${isCurrent ? 'opacity-100' : isPast ? 'opacity-60' : 'opacity-30'}`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[8px] text-white ${isCurrent ? 'bg-primary' : isPast ? 'bg-outline' : 'bg-outline-variant/50'}`}>
                      {idx + 1}
                    </div>
                    {idx !== (effectiveTrace?.length || 0) - 1 && <div className="w-px h-full bg-outline-variant/30 mt-1"></div>}
                  </div>
                  <div className="pb-2">
                    <p className={`font-mono text-[10px] uppercase tracking-widest ${isCurrent ? 'text-primary font-bold' : 'text-slate-500'}`}>
                      Step {idx + 1}
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">
                      {step.description.en}
                    </p>
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
