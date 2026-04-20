import { AlgorithmData } from "@/types/algorithm";
import Link from "next/link";

// مكون القيمة التقنية - يركز على الخطوط والرموز
const MetricRow = ({ label, value, isMath = true }: { label: string, value: string | boolean, isMath?: boolean }) => {
  const displayValue = typeof value === 'boolean' ? (value ? 'YES' : 'NO') : value;
  
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-outline-variant/10 group hover:bg-surface-container-lowest transition-colors px-1">
      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter italic opacity-70 group-hover:opacity-100">
        {label}
      </span>
      <span className={`font-mono text-sm ${isMath ? 'text-primary' : 'text-on-surface'} font-semibold tracking-tight`}>
        {isMath && typeof value !== 'boolean' ? `$ ${displayValue} $` : displayValue}
      </span>
    </div>
  );
};

export default function MetricsSidebar({ algoData }: { algoData: AlgorithmData }) {
  return (
    <aside className="hidden lg:block w-80 shrink-0 border-l border-outline-variant/20 bg-surface/50 backdrop-blur-sm">
      <div className="sticky top-0 h-screen flex flex-col p-5 overflow-hidden">
        
        {/* Header - Minimalist & Sharp */}
        <div className="mb-10 pt-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-primary animate-pulse" />
            <h2 className="text-on-surface font-black font-sans text-xs tracking-[0.2em] uppercase">
              Operational Metrics
            </h2>
          </div>
          <p className="font-mono text-[9px] text-on-surface-variant/60 uppercase tracking-widest leading-none">
            Ref. Node: {algoData.id.replace('-', '_')} // Ver 1.0.4
          </p>
        </div>

        {/* Content - Organized like a datasheet */}
        <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
          
          {/* Time Complexity Section */}
          <section>
            <h3 className="text-[10px] font-bold text-primary mb-3 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-primary/30" /> TIME_ANALYSIS
            </h3>
            <div className="flex flex-col">
              <MetricRow label="Best Case" value={algoData.complexity.time.best} />
              <MetricRow label="Average" value={algoData.complexity.time.average} />
              <MetricRow label="Worst Case" value={algoData.complexity.time.worst} />
            </div>
          </section>

          {/* Space & Attributes */}
          <section>
            <h3 className="text-[10px] font-bold text-primary mb-3 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-primary/30" /> ARCHITECTURE
            </h3>
            <div className="flex flex-col">
              <MetricRow label="Memory" value={algoData.complexity.space} />
              <MetricRow label="Stability" value={algoData.complexity.stable} isMath={false} />
              <MetricRow label="In-Place" value={algoData.complexity.in_place} isMath={false} />
            </div>
          </section>

        </div>

        {/* Footer Actions - High Contrast */}
        <div className="mt-auto space-y-3 pt-6 border-t border-outline-variant/30">
          <Link
            href="/documentation"
            className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all group"
          >
            Read Methodology 
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </Link>
          
          <button className="group relative w-full bg-on-surface text-surface py-3 px-4 overflow-hidden transition-all hover:bg-primary">
            <span className="relative z-10 flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest">
              Export Analysis
              <span className="material-symbols-outlined text-sm">terminal</span>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>
        </div>

      </div>
    </aside>
  );
}