export default function VersusSidebar() {
	return (
		<aside className="bg-[#f1f4f8] dark:bg-slate-900 w-64 flex flex-col border-r-2 border-outline-variant/20 z-40 hidden md:flex shrink-0">
			<div className="px-6 py-6 border-b border-outline-variant/20">
				<h2 className="font-sans font-bold text-sm text-black tracking-widest uppercase">
					INDEX
				</h2>
				<p className="font-mono text-xs text-on-surface-variant mt-1">
					V2.04 ARCHIVE
				</p>
				<button className="w-full mt-6 border border-primary text-primary font-sans font-bold py-2 text-sm hover:bg-primary/5 transition-colors uppercase">
					NEW SIMULATION
				</button>
			</div>
			<nav className="flex-1 py-4 overflow-y-auto font-mono text-xs uppercase">
				<a
					className="bg-[#002FA7] text-white dark:bg-blue-600 px-4 py-3 flex items-center gap-3 hover:bg-[#002FA7]/90 transition-colors"
					href="#"
				>
					<span
						className="material-symbols-outlined text-lg"
						style={{ fontVariationSettings: "'FILL' 1" }}
					>
						sort_by_alpha
					</span>
					Sorting
				</a>
				<a
					className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-[#e0e3e7] dark:hover:bg-slate-800 transition-colors"
					href="#"
				>
					<span className="material-symbols-outlined text-lg">search</span>
					Search
				</a>
				<a
					className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-[#e0e3e7] dark:hover:bg-slate-800 transition-colors"
					href="#"
				>
					<span className="material-symbols-outlined text-lg">hub</span>
					Graphs
				</a>
				<a
					className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-[#e0e3e7] dark:hover:bg-slate-800 transition-colors"
					href="#"
				>
					<span className="material-symbols-outlined text-lg">account_tree</span>
					Trees
				</a>
				<a
					className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-[#e0e3e7] dark:hover:bg-slate-800 transition-colors"
					href="#"
				>
					<span className="material-symbols-outlined text-lg">architecture</span>
					Geometry
				</a>
			</nav>
			<div className="mt-auto border-t border-outline-variant/20 py-4 font-mono text-xs uppercase">
				<a
					className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-[#e0e3e7] dark:hover:bg-slate-800 transition-colors"
					href="#"
				>
					<span className="material-symbols-outlined text-lg">settings</span>
					Settings
				</a>
				<a
					className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-[#e0e3e7] dark:hover:bg-slate-800 transition-colors"
					href="#"
				>
					<span className="material-symbols-outlined text-lg">menu_book</span>
					Documentation
				</a>
			</div>
		</aside>
	);
}
