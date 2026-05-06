import { Algorithm } from "@/types/algorithm";
import Link from "next/link";
import { BrutalistButton, ScientificRenderer } from "@/components/shared";

const MetricRow = ({ label, value, isMath = true }: { label: string; value: any; isMath?: boolean }) => {
  const displayValue = typeof value === "boolean" ? (value ? "YES" : "NO") : (value || "N/A");

  return (
    <div className="group flex items-baseline justify-between border-b border-outline-variant/10 px-1 py-2 transition-colors hover:bg-surface-container-lowest">
      <span className="font-mono text-[10px] uppercase tracking-tighter text-on-surface-variant opacity-70 group-hover:opacity-100">
        {label}
      </span>
      <span className={`font-mono text-sm font-semibold tracking-tight ${isMath ? "text-primary" : "text-on-surface"}`}>
        {isMath && typeof value === 'string' && (value.includes('\\') || value.includes('$')) ? (
          <ScientificRenderer content={value.startsWith('$') ? value : `$${value}$`} />
        ) : (
          displayValue
        )}
      </span>
    </div>
  );
};

interface MetricsSidebarProps {
  algoData: Algorithm;
  onExport?: () => void;
  isExporting?: boolean;
}

export default function MetricsSidebar({ algoData, onExport, isExporting }: MetricsSidebarProps) {
  return (
    <aside className="hidden w-full shrink-0 border-l border-outline-variant/20 bg-surface/50 backdrop-blur-sm lg:block no-export">
      <div className="sticky top-8 flex h-[calc(100vh-2rem)] flex-col overflow-hidden p-5">
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse bg-primary" />
            <h2 className="font-sans text-xs font-black uppercase tracking-[0.2em] text-on-surface">
              COMPUTATIONAL METRICS
            </h2>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest leading-none text-on-surface-variant/60">
            Ref. Node: {algoData.id?.replace('-', '_') || "NODE_01"} // Ver 3.0.0
          </p>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto playground-sidebar-scroll pr-2">
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
              <span className="h-[1px] w-4 bg-primary/30" /> TIME ANALYSIS
            </h3>
            <div className="flex flex-col">
              <MetricRow label="Best Case" value={algoData.complexity.time.best} />
              <MetricRow label="Average Case" value={algoData.complexity.time.average} />
              <MetricRow label="Worst Case" value={algoData.complexity.time.worst} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
              <span className="h-[1px] w-4 bg-primary/30" /> ARCHITECTURE
            </h3>
            <div className="flex flex-col">
              <MetricRow label="Space Complexity" value={algoData.complexity.space.average} />
              <MetricRow label="Stability" value={algoData.metadata.stability} isMath={false} />
              <MetricRow label="In-Place" value={algoData.metadata.tags.includes("In-place")} isMath={false} />
            </div>
          </section>

          {algoData.documentation.pitfalls && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
                <span className="h-[1px] w-4 bg-primary/30" /> CRITICAL PITFALLS
              </h3>
              <ul className="space-y-2">
                {algoData.documentation.pitfalls.map((pitfall, idx) => (
                  <li key={idx} className="font-mono text-[9px] uppercase leading-tight text-on-surface-variant opacity-70">
                    - <ScientificRenderer content={pitfall} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-auto space-y-3 border-t border-outline-variant/30 pt-6">
          <Link
            href="/documentation"
            className="group flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-on-surface-variant transition-all hover:text-primary"
          >
            METHODOLOGY
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_right_alt
            </span>
          </Link>

          <BrutalistButton 
            onClick={onExport}
            isLoading={isExporting}
            loadingText="PROCESSING"
            icon="terminal"
            className="w-full"
          >
            EXPORT ANALYSIS
          </BrutalistButton>
        </div>
      </div>
    </aside>
  );
}
