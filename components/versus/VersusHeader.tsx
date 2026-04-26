export default function VersusHeader() {
	return (
		<header className="sticky top-0 flex h-20 w-full shrink-0 items-center justify-between gap-4 border-b border-outline-variant/20 bg-surface/95 px-8 backdrop-blur-xl">
			<div className="flex items-center gap-8">
				<nav className="hidden gap-6 font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant xl:flex">
					<a className="flex items-center gap-1 text-[#002FA7] transition-colors hover:text-[#002FA7]/80" href="#">
						<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sort_by_alpha</span>
						Sorting
					</a>
					<a className="flex items-center gap-1 transition-colors hover:text-on-surface" href="#">
						<span className="material-symbols-outlined text-sm">search</span>
						Search
					</a>
					<a className="flex items-center gap-1 transition-colors hover:text-on-surface" href="#">
						<span className="material-symbols-outlined text-sm">hub</span>
						Graphs
					</a>
					<a className="flex items-center gap-1 transition-colors hover:text-on-surface" href="#">
						<span className="material-symbols-outlined text-sm">account_tree</span>
						Trees
					</a>
					<a className="flex items-center gap-1 transition-colors hover:text-on-surface" href="#">
						<span className="material-symbols-outlined text-sm">architecture</span>
						Geometry
					</a>
				</nav>
			</div>
			<div className="flex items-center gap-5">
				<div className="hidden items-center gap-2 border-r border-outline-variant/30 pr-4 lg:flex">
					<span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
						Scenario:
					</span>
					<select className="cursor-pointer border-none bg-transparent p-0 font-mono text-sm font-bold text-primary focus:ring-0">
						<option>Random [Default]</option>
						<option>Sorted Asc</option>
						<option>Reverse Desc</option>
					</select>
				</div>
				<button className="bg-primary-container flex items-center gap-2 px-6 py-2 font-mono font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary">
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
