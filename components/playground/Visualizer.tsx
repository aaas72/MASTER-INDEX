export default function Visualizer() {
  return (
    <div className="relative z-10 p-12 max-w-5xl mx-auto w-full">
      <header className="mb-12 text-left">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[11px] bg-primary-fixed px-3 py-1 text-on-primary-fixed uppercase">Visualizer_A0</span>
          <span className="font-mono text-[11px] text-outline">Ref: ALGO_INDEX_77B</span>
        </div>
        <h1 className="text-6xl font-black font-sans tracking-tighter text-black uppercase">ALGO_INDEX</h1>
      </header>

      {/* Bars Container */}
      <div className="relative aspect-video bg-white border border-outline-variant/20 shadow-sm flex items-end justify-between p-12 gap-2 overflow-hidden">
        {/* سيتم استبدال هذه ببيانات ديناميكية لاحقاً */}
        {[40, 65, 25, 85, 55, 45, 30, 95, 20, 60, 10, 75, 35, 50].map((height, i) => (
          <div 
            key={i}
            style={{ height: `${height}%` }}
            className={`flex-1 transition-all duration-300 ${i % 2 === 0 ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
          />
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="mt-8 grid grid-cols-3 gap-8">
        <MetricCard label="Space Complexity" value="O(log n)" />
        <MetricCard label="Pivot Strategy" value="Median-of-3" />
        <MetricCard label="Stability" value="False" />
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-6 bg-surface-container-low border-l-4 border-primary text-left">
      <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-2">{label}</p>
      <p className="font-mono text-2xl font-bold">{value}</p>
    </div>
  );
}