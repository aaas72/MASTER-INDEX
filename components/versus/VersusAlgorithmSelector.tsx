type VersusAlgorithmSelectorProps = {
	algorithmOptions: Array<{ id: string; name: string }>;
	leftAlgorithmId: string;
	rightAlgorithmId: string;
	onLeftAlgorithmChange: (id: string) => void;
	onRightAlgorithmChange: (id: string) => void;
	onExecute: () => void;
	isExecuting: boolean;
	scenario: string;
	onScenarioChange: (scenario: string) => void;
};

export default function VersusAlgorithmSelector({
	algorithmOptions,
	leftAlgorithmId,
	rightAlgorithmId,
	onLeftAlgorithmChange,
	onRightAlgorithmChange,
	onExecute,
	isExecuting,
	scenario,
	onScenarioChange,
}: VersusAlgorithmSelectorProps) {
	return (
		<section className="mb-6 border-2 border-[#001e73] bg-[#002FA7] text-white shadow-[0_12px_30px_rgba(0,30,115,0.22)]">
			<div className="px-5 md:px-8 py-4 border-b border-white/20 flex items-center justify-between gap-4">
				<div>
					<h2 className="font-sans text-lg md:text-xl font-bold uppercase tracking-wide">
						Algorithm Selection Panel
					</h2>
					<p className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-white/80 mt-1">
						Select algorithms and scenario to update the full comparison.
					</p>
				</div>

			</div>

			<div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
				{/* Challenger A */}
				<div className="bg-white/10 border border-white/25 p-4 flex flex-col h-full">
					<label
						htmlFor="versus-left-algorithm"
						className="block font-mono text-xs uppercase tracking-widest text-white/90 mb-2"
					>
						Challenger A
					</label>
					<select
						id="versus-left-algorithm"
						value={leftAlgorithmId}
						onChange={(event) => onLeftAlgorithmChange(event.target.value)}
						className="w-full bg-white text-[#001e73] border-2 border-white px-3 py-2 font-mono text-sm font-bold focus:outline-none"
					>
						{algorithmOptions.map((option) => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
					</select>
				</div>

				{/* Challenger B */}
				<div className="bg-white/10 border border-white/25 p-4 flex flex-col h-full">
					<label
						htmlFor="versus-right-algorithm"
						className="block font-mono text-xs uppercase tracking-widest text-white/90 mb-2"
					>
						Challenger B
					</label>
					<select
						id="versus-right-algorithm"
						value={rightAlgorithmId}
						onChange={(event) => onRightAlgorithmChange(event.target.value)}
						className="w-full bg-white text-[#001e73] border-2 border-white px-3 py-2 font-mono text-sm font-bold focus:outline-none"
					>
						{algorithmOptions.map((option) => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
					</select>
				</div>

				{/* Scenario */}
				<div className="bg-white/10 border border-white/25 p-4 flex flex-col h-full">
					<label
						htmlFor="versus-scenario"
						className="block font-mono text-xs uppercase tracking-widest text-white/90 mb-2"
					>
						Input_Scenario
					</label>
					<select
						id="versus-scenario"
						value={scenario}
						onChange={(e) => onScenarioChange(e.target.value)}
						className="w-full bg-white text-[#001e73] border-2 border-white px-3 py-2 font-mono text-sm font-bold focus:outline-none"
					>
						<option value="Random">Random [Default]</option>
						<option value="Sorted Asc">Sorted Asc</option>
						<option value="Reverse Desc">Reverse Desc</option>
					</select>
				</div>

				{/* System Action */}
				<div className="bg-white/10 border border-white/25 p-4 flex flex-col h-full">
					<label className="block font-mono text-xs uppercase tracking-widest text-white/90 mb-2">
						System Action
					</label>
					<button
						onClick={onExecute}
						disabled={isExecuting}
						className={`w-full flex-1 flex items-center justify-center gap-3 px-6 py-2 font-mono font-bold uppercase tracking-[0.2em] text-[#002FA7] transition-all bg-white hover:bg-white/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						<span
							className={`material-symbols-outlined text-xl ${isExecuting ? "animate-spin" : ""}`}
							style={{ fontVariationSettings: "'FILL' 1" }}
						>
							{isExecuting ? "sync" : "play_arrow"}
						</span>
						<span className="text-sm">
							{isExecuting ? "Testing..." : "Execute"}
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}
