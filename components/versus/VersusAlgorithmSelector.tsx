type VersusAlgorithmSelectorProps = {
	algorithmOptions: Array<{ id: string; name: string }>;
	leftAlgorithmId: string;
	rightAlgorithmId: string;
	onLeftAlgorithmChange: (id: string) => void;
	onRightAlgorithmChange: (id: string) => void;
};

export default function VersusAlgorithmSelector({
	algorithmOptions,
	leftAlgorithmId,
	rightAlgorithmId,
	onLeftAlgorithmChange,
	onRightAlgorithmChange,
}: VersusAlgorithmSelectorProps) {
	return (
		<section className="mb-6 border-2 border-[#001e73] bg-[#002FA7] text-white shadow-[0_12px_30px_rgba(0,30,115,0.22)]">
			<div className="px-5 md:px-8 py-4 border-b border-white/20 flex items-center justify-between gap-4">
				<div>
					<h2 className="font-sans text-lg md:text-xl font-bold uppercase tracking-wide">
						Algorithm Selection Panel
					</h2>
					<p className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-white/80 mt-1">
						Select two algorithms from here to update the full comparison.
					</p>
				</div>
				<span className="font-mono text-[10px] md:text-xs uppercase tracking-widest bg-white text-[#002FA7] px-3 py-1 font-bold">
					Interactive
				</span>
			</div>

			<div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
				<div className="bg-white/10 border border-white/25 p-4">
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

				<div className="bg-white/10 border border-white/25 p-4">
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
			</div>
		</section>
	);
}
