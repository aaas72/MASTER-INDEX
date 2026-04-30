import { AlgorithmData } from "@/types/algorithm";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface BarVisualizerProps {
  algoData: AlgorithmData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  hasLogicSteps: boolean | null;
}

export default function BarVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
}: BarVisualizerProps) {
  const logicStep = hasLogicSteps ? algoData.content.logic_steps[currentStep] : null;
  const arrayState = logicStep && logicStep.array_state ? logicStep.array_state : [];
  const maxValue = arrayState.length > 0 ? Math.max(...arrayState) : 1;
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const el = document.getElementById(`bar-step-${currentStep}`);
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
          className={`flex-1 flex flex-col relative ${isFullscreen ? 'p-8 md:p-12 lg:p-16' : ''}`}
          style={isFullscreen ? { backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' } : {}}
        >
          {/* Main Visualization Area */}
          <div className={`flex-1 relative flex items-end justify-center gap-1 border-outline-variant/20 pb-2 ${isFullscreen ? 'border-0' : 'h-96 border-b md:border-b-0'}`}>
            {arrayState.map((value, index) => {
              const heightPercentage = (value / maxValue) * 100;
              const isPivot = index === logicStep.pivot_index;
              const inPartition =
                logicStep.partition_range &&
                index >= logicStep.partition_range[0] &&
                index <= logicStep.partition_range[1];

              let bgColor = "bg-surface-container-high text-on-surface";
              if (isPivot) bgColor = "bg-primary-container text-white";
              else if (inPartition) bgColor = "bg-secondary-container text-on-surface";

              return (
                <motion.div
                  layout
                  key={value}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex-1 relative ${bgColor} flex flex-col items-center justify-end pb-6 rounded-t-sm`}
                  style={{ height: `${heightPercentage}%` }}
                >
                  <span className="font-mono text-xs font-bold mix-blend-luminosity">
                    {value}
                  </span>
                  <span className="absolute bottom-2 font-mono text-[8px] opacity-60 mix-blend-luminosity">
                    i:{index}
                  </span>
                </motion.div>
              );
            })}
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
                <span className="material-symbols-outlined text-sm">play_arrow</span>
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
          className={`w-full md:w-96 border-outline-variant/20 flex flex-col overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isFullscreen ? 'h-full bg-surface-container-lowest border-l p-6 md:p-8 shadow-xl z-10' : 'md:border-l md:pl-6 max-h-96'}`}
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
                  id={`bar-step-${idx}`}
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
                    {/* Display the array state inline to match the left side */}
                    <div className="mt-2 font-mono text-[8px] text-outline tracking-tight bg-surface-container-high p-1 rounded-sm overflow-x-auto whitespace-nowrap">
                      [{step.array_state?.join(', ')}]
                    </div>
                    {/* Highlight current partition or pivot info if applicable */}
                    {isCurrent && step.pivot_index !== null && (
                      <div className="mt-2 bg-primary/5 border border-primary/10 p-2 font-mono text-[8px] text-primary">
                        Pivot Index: {step.pivot_index} <br />
                        Range: [{step.partition_range?.join(', ')}]
                      </div>
                    )}
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
