// components/ArchiveSidebar.tsx
export default function ArchiveSidebar() {
  return (
    <aside className="hidden lg:flex flex-col h-screen w-72 bg-surface-container-low border-l border-outline-variant/20 shrink-0 pt-20 px-4">
      <div className="mb-8 px-3">
        <h2 className="font-headline font-bold text-sm tracking-widest uppercase">Index Filters</h2>
        <p className="font-label text-[10px] text-on-surface-variant">V 4.02 ARCHIVE</p>
      </div>
      
      <nav className="flex-1 space-y-6">
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between text-primary-container font-mono text-[11px] uppercase bg-primary-container/10 p-3 font-bold">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sm">data_exploration</span>
              <span>Complexity</span>
            </div>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <div className="pl-9 space-y-1 py-2 font-label text-xs text-on-surface-variant">
            {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'].map(comp => (
              <label key={comp} className="flex items-center gap-2 py-1 hover:text-primary cursor-pointer">
                <input type="checkbox" className="border-outline-variant bg-transparent text-primary focus:ring-0 rounded-none w-3 h-3" />
                {comp}
              </label>
            ))}
          </div>
        </div>
        {/* أضف باقي أقسام الفلترة هنا بنفس النمط */}
      </nav>

      <div className="py-6">
        <button className="w-full bg-primary-container text-white py-3 font-headline text-xs font-bold tracking-wider hover:opacity-90">
          APPLY PARAMETERS
        </button>
      </div>
    </aside>
  );
}