import { AlgorithmData } from "@/types/algorithm";

interface LinkedListVisualizerProps {
  algoData: AlgorithmData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  hasLogicSteps: boolean | null;
}

export default function LinkedListVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
}: LinkedListVisualizerProps) {
  const logicStep = hasLogicSteps ? algoData.content.logic_steps[currentStep] : null;

  if (!hasLogicSteps || !logicStep) {
    return (
      <div className="flex h-64 items-center justify-center border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest">
        Linked List Visualization pending integration
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center p-12 mb-12 overflow-hidden mt-4">
      <style dangerouslySetInnerHTML={{__html: `
        .blueprint-grid {
            background-image: 
                linear-gradient(to right, rgba(0, 47, 167, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 47, 167, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }
      `}} />
      <div className="absolute inset-0 blueprint-grid pointer-events-none" />

      <p className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest text-slate-500 z-10">
        {logicStep.description_en}
      </p>

      {/* Nodes Container */}
      <div className="flex items-center space-x-0 relative z-10">
        {/* Head Indicator */}
        <div className="absolute -top-16 left-0 flex flex-col items-start">
          <span className="font-mono text-[10px] text-primary uppercase font-bold mb-1 tracking-tighter">PTR_HEAD</span>
          <div className="h-8 w-[2px] bg-primary"></div>
        </div>

        {/* Node 01 */}
        <div className="flex items-center">
          <div className="w-32 h-32 bg-white border border-black flex flex-col items-center justify-center relative shadow-sm">
            <span className="absolute top-2 left-2 font-mono text-[8px] text-outline">0x4F2A</span>
            <span className="absolute bottom-2 left-2 font-mono text-[8px] text-primary">i:0</span>
            <span className="font-sans text-4xl font-bold">12</span>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-surface-container-high border-l border-t border-black flex items-center justify-center">
              <span className="material-symbols-outlined text-xs">link</span>
            </div>
          </div>
          {/* Pointer Arrow */}
          <div className="w-20 h-[1px] bg-black relative flex items-center justify-end">
            <div className="w-2 h-2 border-t border-r border-black rotate-45 transform -translate-y-[0.5px]"></div>
          </div>
        </div>

        {/* Node 02 */}
        <div className="flex items-center">
          <div className="w-32 h-32 bg-white border border-black flex flex-col items-center justify-center relative shadow-sm">
            <span className="absolute top-2 left-2 font-mono text-[8px] text-outline">0x7B9C</span>
            <span className="absolute bottom-2 left-2 font-mono text-[8px] text-primary">i:1</span>
            <span className="font-sans text-4xl font-bold">45</span>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-surface-container-high border-l border-t border-black flex items-center justify-center">
              <span className="material-symbols-outlined text-xs">link</span>
            </div>
          </div>
          {/* Pointer Arrow */}
          <div className="w-20 h-[1px] bg-black relative flex items-center justify-end">
            <div className="w-2 h-2 border-t border-r border-black rotate-45 transform -translate-y-[0.5px]"></div>
          </div>
        </div>

        {/* New Node Insertion Visual (Ghost State) */}
        <div className="flex items-center opacity-30 border-2 border-dashed border-primary">
          <div className="w-32 h-32 bg-white flex flex-col items-center justify-center relative">
            <span className="absolute top-2 left-2 font-mono text-[8px] text-primary">NEW_ALLOC</span>
            <span className="absolute bottom-2 left-2 font-mono text-[8px] text-primary">i:2</span>
            <span className="font-sans text-4xl font-bold text-primary">89</span>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-fixed-dim border-l border-t border-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xs text-primary">add</span>
            </div>
          </div>
          {/* Blueprint Stretched Pointer */}
          <div className="w-20 h-[1px] bg-primary relative flex items-center justify-end">
            <div className="w-2 h-2 border-t border-r border-primary rotate-45 transform -translate-y-[0.5px]"></div>
          </div>
        </div>

        {/* Node 03 (Tail) */}
        <div className="flex items-center">
          <div className="w-32 h-32 bg-white border border-black flex flex-col items-center justify-center relative shadow-sm">
            <span className="absolute top-2 left-2 font-mono text-[8px] text-outline">0x2D1F</span>
            <span className="absolute bottom-2 left-2 font-mono text-[8px] text-primary">i:3</span>
            <span className="font-sans text-4xl font-bold">07</span>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-black flex items-center justify-center">
              <span className="font-mono text-[10px] text-white">NULL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-white border border-primary/10 p-1 shadow-md z-20">
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

      {/* Terminal Info Overlay */}
      <div className="absolute bottom-6 right-8 text-right hidden md:block">
        <p className="font-mono text-[10px] text-outline uppercase">Active_Thread: Visualizer_Core</p>
        <p className="font-mono text-[10px] text-primary uppercase font-bold tracking-tighter">State: AWAITING_EXECUTION</p>
      </div>
    </div>
  );
}
