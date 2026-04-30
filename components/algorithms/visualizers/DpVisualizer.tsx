import { AlgorithmData } from "@/types/algorithm";

interface DpVisualizerProps {
  algoData: AlgorithmData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  hasLogicSteps: boolean | null;
}

export default function DpVisualizer({
  algoData,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  hasLogicSteps,
}: DpVisualizerProps) {
  const logicStep = hasLogicSteps ? algoData.content.logic_steps[currentStep] : null;

  if (!hasLogicSteps || !logicStep) {
    return (
      <div className="flex h-64 items-center justify-center border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant font-mono text-sm uppercase tracking-widest">
        DP/Tree Visualization pending integration
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col gap-4 mt-4">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
        {logicStep.description_en}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-outline-variant/20 border border-outline-variant/30 shadow-sm">
        {/* Left: Recursion Tree */}
        <section className="lg:col-span-7 bg-surface-container-lowest p-8 min-h-[500px] flex flex-col relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-container"></span> RECURSION_TREE_EXPANSION
            </h2>
            <span className="text-[10px] font-mono text-outline">STATUS: PROCESSING</span>
          </div>
          <div className="flex-1 relative border border-outline-variant/10 bg-surface-container-lowest p-6 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full max-h-[400px]" viewBox="0 0 400 300">
              <style dangerouslySetInnerHTML={{__html: `
                .node-line { stroke: #c4c5d6; stroke-width: 1.5; }
              `}} />
              {/* Connecting Lines */}
              <line className="node-line" x1="200" x2="120" y1="40" y2="100"></line>
              <line className="node-line" x1="200" x2="280" y1="40" y2="100"></line>
              <line className="node-line" x1="120" x2="80" y1="100" y2="160"></line>
              <line className="node-line" x1="120" x2="160" y1="100" y2="160"></line>
              {/* Root Node */}
              <g transform="translate(200,40)">
                <rect className="fill-primary-container" height="40" width="40" x="-20" y="-20"></rect>
                <text className="font-mono text-[12px] fill-white font-bold" dy=".3em" textAnchor="middle">F(6)</text>
                <text className="font-mono text-[8px] fill-outline" dy="3.5em" textAnchor="middle">i:0</text>
              </g>
              {/* Active Branch (F5) */}
              <g transform="translate(120,100)">
                <rect className="fill-primary-container" height="40" width="40" x="-20" y="-20"></rect>
                <text className="font-mono text-[12px] fill-white font-bold" dy=".3em" textAnchor="middle">F(5)</text>
                <text className="font-mono text-[8px] fill-outline" dy="3.5em" textAnchor="middle">i:1</text>
              </g>
              {/* Cached Branch (F4) */}
              <g transform="translate(280,100)">
                <rect className="fill-secondary-container stroke-primary-container/20 stroke-2" height="40" width="40" x="-20" y="-20"></rect>
                <text className="font-mono text-[12px] fill-primary-fixed-dim font-bold" dy=".3em" textAnchor="middle">F(4)</text>
                <text className="font-mono text-[8px] fill-outline" dy="3.5em" textAnchor="middle">i:2</text>
              </g>
              {/* Deep Leaf */}
              <g transform="translate(80,160)">
                <rect className="fill-primary-container" height="40" width="40" x="-20" y="-20"></rect>
                <text className="font-mono text-[12px] fill-white font-bold" dy=".3em" textAnchor="middle">F(4)</text>
                <text className="font-mono text-[8px] fill-outline" dy="3.5em" textAnchor="middle">i:3</text>
              </g>
              <g transform="translate(160,160)">
                <rect className="fill-surface-container-high" height="40" width="40" x="-20" y="-20"></rect>
                <text className="font-mono text-[12px] fill-outline font-bold" dy=".3em" textAnchor="middle">F(3)</text>
                <text className="font-mono text-[8px] fill-outline" dy="3.5em" textAnchor="middle">i:4</text>
              </g>
            </svg>
            {/* Overlay Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-container"></div>
                <span className="text-[10px] font-mono uppercase">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary-container"></div>
                <span className="text-[10px] font-mono uppercase">Memoized</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Memoization Table */}
        <section className="lg:col-span-5 bg-surface-container-low p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary"></span> MEMO_REGISTRY_INDEX
            </h2>
            <span className="text-[10px] font-mono text-outline">CAPACITY: 1024_SLOTS</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Table Headings */}
            <div className="col-span-1 p-3 bg-surface-container-high font-mono text-[10px] font-bold text-slate-500 uppercase">Input (n)</div>
            <div className="col-span-3 p-3 bg-surface-container-high font-mono text-[10px] font-bold text-slate-500 uppercase">Stored Result</div>
            {/* Row 0 */}
            <div className="p-4 bg-white font-mono text-xs font-bold border-b border-outline-variant/10">0</div>
            <div className="col-span-3 p-4 bg-secondary-fixed/30 text-primary-container font-mono text-xs font-bold border-b border-outline-variant/10 flex items-center gap-2">
              <span className="material-symbols-outlined scale-75">check_circle</span> 0
            </div>
            {/* Row 1 */}
            <div className="p-4 bg-white font-mono text-xs font-bold border-b border-outline-variant/10">1</div>
            <div className="col-span-3 p-4 bg-secondary-fixed/30 text-primary-container font-mono text-xs font-bold border-b border-outline-variant/10 flex items-center gap-2">
              <span className="material-symbols-outlined scale-75">check_circle</span> 1
            </div>
            {/* Row 2 */}
            <div className="p-4 bg-white font-mono text-xs font-bold border-b border-outline-variant/10">2</div>
            <div className="col-span-3 p-4 bg-secondary-fixed/30 text-primary-container font-mono text-xs font-bold border-b border-outline-variant/10 flex items-center gap-2">
              <span className="material-symbols-outlined scale-75">check_circle</span> 1
            </div>
            {/* Row 3 */}
            <div className="p-4 bg-white font-mono text-xs font-bold border-b border-outline-variant/10">3</div>
            <div className="col-span-3 p-4 bg-secondary-fixed/30 text-primary-container font-mono text-xs font-bold border-b border-outline-variant/10 flex items-center gap-2">
              <span className="material-symbols-outlined scale-75">check_circle</span> 2
            </div>
            {/* Row 4 (Current Active) */}
            <div className="p-4 bg-primary-container text-white font-mono text-xs font-bold border-b border-outline-variant/10">4</div>
            <div className="col-span-3 p-4 bg-primary-container text-white font-mono text-xs font-bold border-b border-outline-variant/10 flex items-center justify-between">
              <span className="animate-pulse">CALCULATING...</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5">MEMO_MISS</span>
            </div>
            {/* Future Rows */}
            <div className="p-4 bg-white/50 font-mono text-xs text-outline italic border-b border-outline-variant/5">5</div>
            <div className="col-span-3 p-4 bg-white/50 font-mono text-xs text-outline italic border-b border-outline-variant/5">---</div>
          </div>
          {/* Callout Card */}
          <div className="mt-auto pt-12">
            <div className="p-6 bg-primary-container text-white">
              <span className="text-[10px] font-mono uppercase opacity-70 block mb-2">Complexity Note</span>
              <p className="font-body text-sm leading-snug italic">
                "By utilizing O(n) space for the memoization table, we successfully reduce the time complexity from O(2ⁿ) to O(n)."
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-center mt-2 mb-8">
        <div className="flex items-center bg-white border border-primary/10 p-1 shadow-md z-20">
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
  );
}
