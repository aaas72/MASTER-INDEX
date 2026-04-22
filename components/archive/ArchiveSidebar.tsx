export default function ArchiveSidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 flex-col border-l border-outline-variant/20 bg-surface-container-low pt-20 px-4 lg:flex">
      <div className="mb-8 px-3">
        <h2 className="font-headline text-sm font-bold tracking-widest uppercase">Index Filters</h2>
        <p className="font-label text-[10px] text-on-surface-variant">V 4.02 ARCHIVE</p>
      </div>

      <nav className="flex-1 space-y-6">
        <div className="space-y-1">
          <button className="flex w-full items-center justify-between bg-primary-container/10 p-3 font-mono text-[11px] font-bold uppercase text-primary-container">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sm">data_exploration</span>
              <span>Complexity</span>
            </div>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <div className="space-y-1 py-2 pl-9 font-label text-xs text-on-surface-variant">
            {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'].map((comp) => (
              <label key={comp} className="flex cursor-pointer items-center gap-2 py-1 hover:text-primary">
                <input type="checkbox" className="h-3 w-3 rounded-none border-outline-variant bg-transparent text-primary focus:ring-0" />
                {comp}
              </label>
            ))}
          </div>
        </div>
      </nav>

      <div className="py-6">
        <button className="w-full bg-primary-container py-3 font-headline text-xs font-bold tracking-wider text-white hover:opacity-90">
          APPLY PARAMETERS
        </button>
      </div>
    </aside>
  );
}
