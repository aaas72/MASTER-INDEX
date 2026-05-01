import { AlgorithmData } from "@/types/algorithm";
import Link from "next/link";

const MetricRow = ({ label, value, isMath = true }: { label: string; value: any; isMath?: boolean }) => {
  const displayValue = typeof value === "boolean" ? (value ? "YES" : "NO") : (value || "N/A");

  return (
    <div className="group flex items-baseline justify-between border-b border-outline-variant/10 px-1 py-2 transition-colors hover:bg-surface-container-lowest">
      <span className="font-mono text-[10px] uppercase tracking-tighter text-on-surface-variant opacity-70 group-hover:opacity-100">
        {label}
      </span>
      <span className={`font-mono text-sm font-semibold tracking-tight ${isMath ? "text-primary" : "text-on-surface"}`}>
        {displayValue}
      </span>
    </div>
  );
};

interface MetricsSidebarProps {
  algoData: any;
  onExport?: () => void;
  isExporting?: boolean;
}

export default function MetricsSidebar({ algoData, onExport, isExporting }: MetricsSidebarProps) {
  const getTimeValue = (key: 'best' | 'average' | 'worst') => {
    if (typeof algoData.complexity.time === 'string') {
      return key === 'average' ? algoData.complexity.time : "--";
    }
    return algoData.complexity.time?.[key] || "--";
  };

  return (
    <aside className="hidden w-full shrink-0 border-l border-outline-variant/20 bg-surface/50 backdrop-blur-sm lg:block no-export">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden p-5">
        <div className="mb-10 pt-4">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse bg-primary" />
            <h2 className="font-sans text-xs font-black uppercase tracking-[0.2em] text-on-surface">
              Operational Metrics
            </h2>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest leading-none text-on-surface-variant/60">
            Ref. Node: {algoData.id?.replace('-', '_') || "NODE_01"} // Ver 1.0.4
          </p>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide">
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
              <span className="h-[1px] w-4 bg-primary/30" /> TIME_ANALYSIS
            </h3>
            <div className="flex flex-col">
              <MetricRow label="Best Case" value={getTimeValue('best')} />
              <MetricRow label="Average" value={getTimeValue('average')} />
              <MetricRow label="Worst Case" value={getTimeValue('worst')} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
              <span className="h-[1px] w-4 bg-primary/30" /> ARCHITECTURE
            </h3>
            <div className="flex flex-col">
              <MetricRow label="Memory" value={algoData.complexity.space} />
              <MetricRow label="Stability" value={algoData.complexity.stable} isMath={false} />
              <MetricRow label="In-Place" value={algoData.complexity.in_place} isMath={false} />
            </div>
          </section>
        </div>

        <div className="mt-auto space-y-3 border-t border-outline-variant/30 pt-6">
          <Link
            href="/documentation"
            className="group flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-on-surface-variant transition-all hover:text-primary"
          >
            Read Methodology
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_right_alt
            </span>
          </Link>

          <button 
            onClick={onExport}
            disabled={isExporting}
            className={`group relative w-full overflow-hidden py-3 px-4 transition-all shadow-lg active:scale-95 ${
              isExporting ? 'bg-primary cursor-wait' : 'bg-on-surface hover:bg-primary'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-surface">
              {isExporting ? (
                <div className="flex items-center gap-2">
                  <span>PROCESSING</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-white animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-white animate-bounce" />
                  </div>
                </div>
              ) : (
                <>
                  Export Analysis
                  <span className="material-symbols-outlined text-sm">terminal</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0" />
          </button>
        </div>
      </div>
    </aside>
  );
}
