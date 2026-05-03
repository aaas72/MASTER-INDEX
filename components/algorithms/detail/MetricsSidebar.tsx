import { Algorithm } from "@/types/algorithm";
import Link from "next/link";
import { metrics } from "@/locales/en/metrics";
import { common } from "@/locales/en/common";
import { BrutalistButton } from "@/components/shared";

const t = { ...metrics, common };

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
  algoData: Algorithm;
  onExport?: () => void;
  isExporting?: boolean;
}

export default function MetricsSidebar({ algoData, onExport, isExporting }: MetricsSidebarProps) {
  const getTimeValue = (key: 'best' | 'average' | 'worst') => {
    return algoData.complexity.time[key]?.label || "--";
  };

  return (
    <aside className="hidden w-full shrink-0 border-l border-outline-variant/20 bg-surface/50 backdrop-blur-sm lg:block no-export">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden p-5">
        <div className="mb-10 pt-4">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse bg-primary" />
            <h2 className="font-sans text-xs font-black uppercase tracking-[0.2em] text-on-surface">
              {t.title}
            </h2>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest leading-none text-on-surface-variant/60">
            Ref. Node: {algoData.id?.replace('-', '_') || "NODE_01"} // Ver 1.0.4
          </p>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide">
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
              <span className="h-[1px] w-4 bg-primary/30" /> {t.time_analysis}
            </h3>
            <div className="flex flex-col">
              <MetricRow label={t.best_case} value={getTimeValue('best')} />
              <MetricRow label={t.average} value={getTimeValue('average')} />
              <MetricRow label={t.worst_case} value={getTimeValue('worst')} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold text-primary">
              <span className="h-[1px] w-4 bg-primary/30" /> {t.architecture}
            </h3>
            <div className="flex flex-col">
              <MetricRow label={t.memory} value={algoData.complexity.space.label} />
              <MetricRow label={t.stability} value={algoData.metadata.tags.includes("stable")} isMath={false} />
              <MetricRow label={t.in_place} value={algoData.metadata.tags.includes("in-place")} isMath={false} />
            </div>
          </section>
        </div>

        <div className="mt-auto space-y-3 border-t border-outline-variant/30 pt-6">
          <Link
            href="/documentation"
            className="group flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-on-surface-variant transition-all hover:text-primary"
          >
            {t.read_methodology}
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_right_alt
            </span>
          </Link>

          <BrutalistButton 
            onClick={onExport}
            isLoading={isExporting}
            loadingText={t.common.processing}
            icon="terminal"
            className="w-full"
          >
            {t.export_analysis}
          </BrutalistButton>
        </div>
      </div>
    </aside>
  );
}
