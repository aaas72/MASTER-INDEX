export default function VersusHeader() {
  return (
    <header className="dark:bg-slate-950 flex justify-between items-center w-full px-8 h-20 shrink-0 border-b-2 border-outline-variant/20 sticky top-0 gap-4">
      <div className="flex items-center gap-8">
        <nav className="hidden xl:flex gap-6 font-mono text-xs uppercase font-bold text-slate-500">
          <a className="text-[#002FA7] hover:text-[#002FA7]/80 transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sort_by_alpha</span>
            Sorting
          </a>
          <a className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm">search</span>
            Search
          </a>
          <a className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm">hub</span>
            Graphs
          </a>
          <a className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm">account_tree</span>
            Trees
          </a>
          <a className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm">architecture</span>
            Geometry
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center gap-2 mr-4 border-r border-outline-variant/30 pr-4">
          <span className="font-mono text-xs uppercase text-on-surface-variant">
            Scenario:
          </span>
          <select className="bg-transparent border-none text-sm font-mono text-primary font-bold focus:ring-0 p-0 cursor-pointer">
            <option>Random [Default]</option>
            <option>Sorted Asc</option>
            <option>Reverse Desc</option>
          </select>
        </div>
        <button className="bg-primary-container text-white font-sans font-bold px-6 py-2 hover:bg-primary transition-colors flex items-center gap-2">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
          Execute Test
        </button>
      </div>
    </header>
  );
}