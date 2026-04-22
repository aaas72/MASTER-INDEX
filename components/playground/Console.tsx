export default function Console() {
  return (
    <div className="fixed bottom-0 right-0 left-80 z-40 bg-surface-dim border-t border-outline-variant">
      <div className="flex items-center justify-between px-6 py-2 bg-on-surface text-white">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-sm">terminal</span>
          <span className="font-mono text-[11px] uppercase tracking-widest">Technical Console</span>
        </div>
        <span className="font-mono text-[9px] text-zinc-400 uppercase">Uptime: 00:04:12</span>
      </div>
      <div className="h-40 bg-on-surface p-4 font-mono text-[12px] text-primary-fixed overflow-y-auto leading-relaxed text-left">
        <p><span className="text-zinc-500">[14:02:11]</span> INIT_CORE: Loading Algorithm...</p>
        <p className="text-white"><span className="text-zinc-500">[14:02:13]</span> LOG: Swapping Index 2 and 5...</p>
        <p className="animate-pulse text-white">_</p>
      </div>
    </div>
  );
}