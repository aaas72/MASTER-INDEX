export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#f7fafe] z-40 flex flex-col p-0 pt-20 border-r-0">
      <div className="px-6 py-8 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              terminal
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-black uppercase font-sans">
              MASTER INDEX
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
              LIBRARIAN GUIDE
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-grow">
        <a
          className="flex items-center px-6 py-4 bg-[#002FA7] text-white font-mono translate-x-1 transition-transform duration-200"
          href="#"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            category
          </span>
          <span className="text-xs uppercase tracking-widest">Categories</span>
        </a>
        <a
          className="flex items-center px-6 py-4 text-slate-600 font-mono hover:bg-[#e0e3e7] transition-colors duration-150"
          href="#"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            compare_arrows
          </span>
          <span className="text-xs uppercase tracking-widest">Versus Hub</span>
        </a>
        <a
          className="flex items-center px-6 py-4 text-slate-600 font-mono hover:bg-[#e0e3e7] transition-colors duration-150"
          href="#"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            terminal
          </span>
          <span className="text-xs uppercase tracking-widest">Algorithms</span>
        </a>
        <a
          className="flex items-center px-6 py-4 text-slate-600 font-mono hover:bg-[#e0e3e7] transition-colors duration-150"
          href="#"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            inventory_2
          </span>
          <span className="text-xs uppercase tracking-widest">Archives</span>
        </a>
        <a
          className="flex items-center px-6 py-4 text-slate-600 font-mono hover:bg-[#e0e3e7] transition-colors duration-150 mt-auto"
          href="#"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            settings
          </span>
          <span className="text-xs uppercase tracking-widest">Settings</span>
        </a>
      </nav>
      <div className="p-6">
        <button className="w-full border border-[#002FA7] text-[#002FA7] py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#002FA7] hover:text-white transition-all">
          New Entry
        </button>
      </div>
    </aside>
  );
}
